const { handle200 } = require("../helper/successHandler");
const { formatSequelizeError } = require("../helper/errorHandler");
const Income = require("../model/IncomeModel");
const sequelize = require("../config/sqliteDB");
const Expense = require("../model/ExpenseModel");

const dashBoard = async (req, res) => {
  try {

    const userId = req.user.id
    const totalAmountex = await Expense.sum("ex_amount", {
      where: { fkex_id: userId },
    }) || 0;

    const totalAmountin = await Income.sum("income_amount", {
      where: { fk_id: userId },
    }) || 0;

    const netBalance = totalAmountin - totalAmountex; 


    const income = await Income.findAll({
        attributes:[
            'income_date',
            [sequelize.fn("SUM", sequelize.col("income_amount")), "amount"]
        ],
        where:{fk_id : userId},
        group:['income_date'],
    });

     const expense = await Expense.findAll({
        attributes:[
            'ex_date',
            [sequelize.fn("SUM", sequelize.col("ex_amount")), "amount"]
        ],
        where:{fkex_id : userId},
        group:['ex_date'],
    });

    const chartData = [];

    income.forEach((i)=>{
        chartData.push({
            date: i.income_date,
            income: Number(i.dataValues.amount),
            expense:0
        })
    })

    expense.forEach((e)=>{
        const found = chartData.find((d)=>d.date === e.ex_date)

        if(found){
            found.expense = Number(e.dataValues.amount);
        }else{
            chartData.push({
                date:e.ex_date,
                income:0,
                expense: Number(e.dataValues.amount)
            })
        }
    })

    return handle200(res, {
      income: totalAmountin,
      expense: totalAmountex,
      netBalance,
      chartData
    }, "Dashboard data fetched");

  } catch (error) {
    return formatSequelizeError(res, error);
  }
};

module.exports = {dashBoard};