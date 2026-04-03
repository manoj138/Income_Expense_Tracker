const { handle200 } = require("../helper/successHandler");
const { formatError } = require("../helper/mongoError");
const Income = require("../model/IncomeModel");
const Expense = require("../model/ExpenseModel");
const mongoose = require('mongoose');

const getMonthRange = (date = new Date()) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  return { start, end };
};

const getPreviousMonthRange = (date = new Date()) => {
  const start = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const end = new Date(date.getFullYear(), date.getMonth(), 1);
  return { start, end };
};

const sumAmounts = (items, key) => items.reduce((total, item) => total + Number(item[key] || 0), 0);

const getPercentageChange = (current, previous) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }

  return Number((((current - previous) / previous) * 100).toFixed(1));
};

const dashBoard = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const now = new Date();
    const currentMonth = getMonthRange(now);
    const previousMonth = getPreviousMonthRange(now);

    const totalAmountexResult = await Expense.aggregate([
      { $match: { fkex_id: userId } },
      { $group: { _id: null, total: { $sum: "$ex_amount" } } }
    ]);
    const totalAmountex = totalAmountexResult.length > 0 ? totalAmountexResult[0].total : 0;

    const totalAmountinResult = await Income.aggregate([
      { $match: { fk_id: userId } },
      { $group: { _id: null, total: { $sum: "$income_amount" } } }
    ]);
    const totalAmountin = totalAmountinResult.length > 0 ? totalAmountinResult[0].total : 0;

    const netBalance = totalAmountin - totalAmountex;

    const incomeByDate = await Income.aggregate([
      { $match: { fk_id: userId } },
      { $group: { _id: "$income_date", amount: { $sum: "$income_amount" } } },
      { $sort: { _id: 1 } }
    ]);

    const expenseByDate = await Expense.aggregate([
      { $match: { fkex_id: userId } },
      { $group: { _id: "$ex_date", amount: { $sum: "$ex_amount" } } },
      { $sort: { _id: 1 } }
    ]);

    const chartData = [];

    incomeByDate.forEach((i) => {
      chartData.push({
        date: i._id,
        income: i.amount,
        expense: 0
      });
    });

    expenseByDate.forEach((e) => {
      const found = chartData.find((d) => d.date.toString() === e._id.toString());
      if (found) {
        found.expense = e.amount;
      } else {
        chartData.push({
          date: e._id,
          income: 0,
          expense: e.amount
        });
      }
    });

    // Sort chartData by date
    chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const [
      currentMonthIncome,
      previousMonthIncome,
      currentMonthExpense,
      previousMonthExpense,
      recentIncomes,
      recentExpenses,
      incomeMethods,
      expenseMethods
    ] = await Promise.all([
      Income.find({
        fk_id: userId,
        income_date: { $gte: currentMonth.start, $lt: currentMonth.end }
      }).lean(),
      Income.find({
        fk_id: userId,
        income_date: { $gte: previousMonth.start, $lt: previousMonth.end }
      }).lean(),
      Expense.find({
        fkex_id: userId,
        ex_date: { $gte: currentMonth.start, $lt: currentMonth.end }
      }).lean(),
      Expense.find({
        fkex_id: userId,
        ex_date: { $gte: previousMonth.start, $lt: previousMonth.end }
      }).lean(),
      Income.find({ fk_id: userId })
        .sort({ income_date: -1, createdAt: -1 })
        .limit(5)
        .lean(),
      Expense.find({ fkex_id: userId })
        .sort({ ex_date: -1, createdAt: -1 })
        .limit(5)
        .lean(),
      Income.aggregate([
        { $match: { fk_id: userId } },
        { $group: { _id: "$income_method", total: { $sum: "$income_amount" } } },
        { $sort: { total: -1 } }
      ]),
      Expense.aggregate([
        { $match: { fkex_id: userId } },
        { $group: { _id: "$ex_method", total: { $sum: "$ex_amount" } } },
        { $sort: { total: -1 } }
      ])
    ]);

    const currentMonthIncomeTotal = sumAmounts(currentMonthIncome, "income_amount");
    const previousMonthIncomeTotal = sumAmounts(previousMonthIncome, "income_amount");
    const currentMonthExpenseTotal = sumAmounts(currentMonthExpense, "ex_amount");
    const previousMonthExpenseTotal = sumAmounts(previousMonthExpense, "ex_amount");
    const savingsRate = totalAmountin > 0 ? Number(((netBalance / totalAmountin) * 100).toFixed(1)) : 0;

    const recentTransactions = [
      ...recentIncomes.map((item) => ({
        id: item._id.toString(),
        type: "income",
        title: item.income_source,
        amount: item.income_amount,
        method: item.income_method,
        date: item.income_date,
        time: item.income_time
      })),
      ...recentExpenses.map((item) => ({
        id: item._id.toString(),
        type: "expense",
        title: item.ex_source,
        amount: item.ex_amount,
        method: item.ex_method,
        date: item.ex_date,
        time: item.ex_time
      }))
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);

    return handle200(res, {
      income: totalAmountin,
      expense: totalAmountex,
      netBalance,
      chartData,
      savingsRate,
      monthlyStats: {
        income: {
          current: currentMonthIncomeTotal,
          previous: previousMonthIncomeTotal,
          change: getPercentageChange(currentMonthIncomeTotal, previousMonthIncomeTotal)
        },
        expense: {
          current: currentMonthExpenseTotal,
          previous: previousMonthExpenseTotal,
          change: getPercentageChange(currentMonthExpenseTotal, previousMonthExpenseTotal)
        }
      },
      paymentMethods: {
        income: incomeMethods.map((item) => ({
          method: item._id,
          total: item.total
        })),
        expense: expenseMethods.map((item) => ({
          method: item._id,
          total: item.total
        }))
      },
      recentTransactions
    }, "Dashboard data fetched");

  } catch (error) {
    return formatError(res, error);
  }
};

module.exports = { dashBoard };
