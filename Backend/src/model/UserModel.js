const { DataTypes } = require("sequelize");
const sequelize = require("../config/sqliteDB");
const { hashPassword } = require("../helper/authHelper");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Name is required"
                }
            }
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "User Name is required"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Email is already exist"
            },
            validate: {
                notEmpty: {
                    msg: "Email is required"
                },
                isEmail: {
                    msg: "Please enter a valid email address"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                customValidator(value) {
                    if (this.isNewRecord) {
                        if (!value) {
                            throw new Error("Password is required");
                        }
                        if (value.length < 6) {
                            throw new Error("Password must be at least 6 characters long");
                        }
                    } else {
                        if (value && value.length < 6) {
                            throw new Error("Password must be at least 6 characters long");
                        }
                    }
                },
            },
        },
        status: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user'
        },
        user_image: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await hashPassword(user.password);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await hashPassword(user.password);
            }
        }
    }
}
)
User.sync();

module.exports = User; 

