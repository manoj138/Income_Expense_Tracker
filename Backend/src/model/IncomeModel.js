const { DataTypes } = require("sequelize");
const sequelize = require("../config/sqliteDB");

const Income = sequelize.define(
    'Income',
    {
        income_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        income_source: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "source is required"
                }
            }
        },
        income_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
             validate: {
    notNull: { msg: "amount is required" },
    isFloat: { msg: "amount must be number" }
  }
        },
        income_method: {
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
        income_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        income_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: { msg: "Date is required" },
                isDate: { msg: "Invalid date" }
            }
        },

        income_time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
        notNull: { msg: "Time is required" },
        notEmpty: { msg: "Time is required" } 
      }
        },
        fk_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
    tableName: "incomeData",
    timestamps: true
}
)
Income.sync();

module.exports = Income;