const { DataTypes } = require("sequelize");
const sequelize = require("../config/sqliteDB");

const Expense = sequelize.define(
    'Expense',
    {
        ex_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ex_source: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "source is required"
                }
            }
        },
        ex_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: "amount is required" },
                isFloat: { msg: "amount must be number" }
            }
        },
        ex_method: {
            type: DataTypes.ENUM("Cash",
                "UPI",
                "Net Banking",
                "Debit Card",
                "Credit Card"),
            allowNull: false,
            defaultValue: "Cash",
            validate: {
                notEmpty: { msg: "method is required" }
            }
        },
        ex_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ex_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: { msg: "Date is required" },
                isDate: { msg: "Invalid date" }
            }
        },

        ex_time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notNull: { msg: "Time is required" },
                notEmpty: { msg: "Time is required" }
            }
        },
        fkex_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        tableName:"expenseData",
        timestamps:true
    }
)

Expense.sync()

module.exports = Expense;