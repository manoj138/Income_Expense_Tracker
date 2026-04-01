const { formatError } = require("../helper/mongoError");
const { handle404 } = require("../helper/errorHandler");
const { getPagination, getPagingData } = require("../helper/paginationHelper");
const { handle200 } = require("../helper/successHandler");
const Expense = require("../model/ExpenseModel");
const mongoose = require("mongoose");

const buildExpenseQuery = (req, id = null) => {
    const query = {
        fkex_id: req.user.id
    };

    if (id) {
        query._id = id;
    }

    return query;
};

const index = async (req, res) => {
    try {
        const { page, size, search, startDate, endDate } = req.query;
        const { limit, offset } = getPagination(page, size);

        let query = {
            fkex_id: req.user.id
        };

        // 🔍 Search filter
        if (search) {
            query.ex_source = { $regex: search, $options: 'i' };
        }

        // 📅 Date filter
        if (startDate && endDate) {
            query.ex_date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const count = await Expense.countDocuments(query);
        const rows = await Expense.find(query)
            .limit(limit)
            .skip(offset)
            .sort({ createdAt: -1 });

        const totalAmountResult = await Expense.aggregate([
            { $match: { fkex_id: new mongoose.Types.ObjectId(req.user.id) } },
            { $group: { _id: null, total: { $sum: "$ex_amount" } } }
        ]);
        const totalAmount = totalAmountResult.length > 0 ? totalAmountResult[0].total : 0;

        const response = getPagingData({ count, rows }, page, limit)
        return handle200(res, {
            ...response,
            totalAmount
        }, "Get Expenses Successfully");

    } catch (error) {
        return formatError(res, error)
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
        return handle200(res, expenseData, "Expense added successfully");
    } catch (error) {
        return formatError(res, error);
    }
}

const find = async (req, res) => {
    try {
        const expense = await Expense.findOne(buildExpenseQuery(req, req.params.id))
        if (!expense) {
            return handle404(res, "Expense Not Found")
        }
        return handle200(res, expense, "Expense fetch Successfully")
    } catch (error) {
        return formatError(res, error);
    }
}

const update = async (req, res) => {
    const data = req.body
    try {
        const expense = await Expense.findOneAndUpdate(buildExpenseQuery(req, req.params.id), data, { new: true, runValidators: true });
        if (!expense) {
            return handle404(res, "Expense Not Found");
        }
        return handle200(res, expense, "Expense update successfully");
    } catch (error) {
        return formatError(res, error);
    }
}

const deleteE = async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete(buildExpenseQuery(req, req.params.id));
        if (!expense) {
            return handle404(res, "Expense Not Found")
        }
        return handle200(res, expense, "Expense deleted Successfully")
    } catch (error) {
        return formatError(res, error);
    }
}

module.exports = {
    index,
    store,
    find,
    update,
    deleteE
}
