const { handle200 } = require("../helper/successHandler");
const { formatError } = require("../helper/mongoError");
const Income = require("../model/IncomeModel");
const Expense = require("../model/ExpenseModel");
const mongoose = require('mongoose');

const dashBoard = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

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

    return handle200(res, {
      income: totalAmountin,
      expense: totalAmountex,
      netBalance,
      chartData
    }, "Dashboard data fetched");

  } catch (error) {
    return formatError(res, error);
  }
};

module.exports = { dashBoard };