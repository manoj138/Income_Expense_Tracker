const { where } = require("sequelize");
const { deleteUploadedFiles } = require("../helper/deleteUploadedFiles");
const { formatSequelizeError, handle404 } = require("../helper/errorHandler");
const { saveRAMFiles } = require("../helper/memoryUpload");
const { getPagination, getPagingData } = require("../helper/paginationHelper");
const { handle200 } = require("../helper/successHandler");
const Expense = require("../model/ExpenseModel");
const { Op } = require("sequelize");


const index = async (req, res) => {
    try {
        const { page, size, search, startDate, endDate, status } = req.query;

        const { limit, offset } = getPagination(page, size);

        let where = {
            fkex_id: req.user.id, // ✅ current user
        };

        // 🔍 Search filter
        if (search) {
            where[Op.or] = [
                { ex_source: { [Op.like]: `%${search}%` } },

            ];
        }

        // 📅 Date filter
        if (startDate && endDate) {
            where.ex_date = {
                [Op.between]: [startDate, endDate],
            };
        }

        // ✅ Status filter
        if (status !== undefined && status !== "") {
            where.status = status;
            // ex: "active" / "inactive" OR 1 / 0 (तुझ्या DB वर depend)
        }

        const expense = await Expense.findAndCountAll({
            where: where,
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        })

        const totalAmount = await Expense.sum("ex_amount", {
            where: { fkex_id: req.user.id }
        });

        const response = getPagingData(expense, page, limit)
        return handle200(res, {
            ...response,
            totalAmount
        }, "user list");

    } catch (error) {
        return formatSequelizeError(res, error)

    }
}

const store = async (req, res) => {
    const data = req.body;
    try {
        const userId = req.user?.id;
        const expenseData = await Expense.create({
            ...data,
            fkex_id: userId
        })
        if (req.tempFiles && req.tempFiles.length > 0) {
            await saveRAMFiles(req.tempFiles);
        }
        return handle200(res, expenseData, "Expense added sucessfully");
    } catch (error) {
        return formatSequelizeError(res, error);
    }
}

const find = async (req, res) => {
    try {
        const expense = await Expense.findByPk(req.params.id)
        if (!expense) {
            return handle404(res, "Expense Not Found")
        }
        return handle200(res, expense, "expense fetch Successfully")

    } catch (error) {
        return formatSequelizeError(res, error);

    }
}

const update = async (req, res) => {
    const data = req.body
    try {
        const expense = await Expense.findByPk(req.params.id);
        if (!expense) {
            return handle404(res, "income Not Found");
        }

        if (req.tempFiles && req.tempFiles.length > 0) {

            deleteUploadedFiles(expense);
            await saveRAMFiles(req.tempFiles);
        }
        await expense.update(data)

        return handle200(res, expense, "income update successfully");

    } catch (error) {

        return formatSequelizeError(res, error);
    }
}

const deleteE = async (req, res) => {
    try {
        const expense = await Expense.findByPk(req.params.id);
        if (!expense) {
            return handle404(res, "Expense Not Found")
        }
        deleteUploadedFiles({ file: expense.ex_image });
        await expense.destroy();
        return handle200(res, expense, "expense deleted Successfully")
    } catch (error) {
        return formatSequelizeError(res, error);
    }
}

module.exports = {
    index,
    store,
    find,
    update,
    deleteE
}