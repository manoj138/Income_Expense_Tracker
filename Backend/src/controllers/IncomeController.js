const { formatError } = require("../helper/mongoError")
const { handle404 } = require("../helper/errorHandler")
const { getPagination, getPagingData } = require("../helper/paginationHelper")
const { handle200, handle201 } = require("../helper/successHandler")
const Income = require("../model/IncomeModel");
const mongoose = require("mongoose");

const buildIncomeQuery = (req, id = null) => {
    const query = {
        fk_id: req.user.id
    };

    if (id) {
        query._id = id;
    }

    return query;
};

const index = async (req, res) => {
    try {
        const { page, size, search, startDate, endDate } = req.query;
        const { limit, offset } = getPagination(page, size)

        let query = {
            fk_id: req.user.id
        };

        // 🔍 Search filter
        if (search) {
            query.income_source = { $regex: search, $options: 'i' };
        }

        // 📅 Date filter
        if (startDate && endDate) {
            query.income_date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const count = await Income.countDocuments(query);
        const rows = await Income.find(query)
            .limit(limit)
            .skip(offset)
            .sort({ createdAt: -1 });

        const totalAmountResult = await Income.aggregate([
            { $match: { fk_id: new mongoose.Types.ObjectId(req.user.id) } },
            { $group: { _id: null, total: { $sum: "$income_amount" } } }
        ]);
        const totalAmount = totalAmountResult.length > 0 ? totalAmountResult[0].total : 0;

        const response = getPagingData({ count, rows }, page, limit);
        return handle200(res, {
            ...response,
            totalAmount
        }, "Get Income Successfully");

    } catch (error) {
        return formatError(res, error)
    }
}

const store = async (req, res) => {
    const data = req.body;
    try {
        const userId = req.user?.id;
        const incomeData = await Income.create({
            ...data,
            fk_id: userId
        })
        return handle201(res, incomeData, "Income added successfully")
    } catch (error) {
        return formatError(res, error);
    }
}

const find = async (req, res) => {
    try {
        const income = await Income.findOne(buildIncomeQuery(req, req.params.id));
        if (!income) {
            return handle404(res, "Income Not Found");
        }
        return handle200(res, income, "Income fetch successfully")
    } catch (error) {
        return formatError(res, error);
    }
}

const update = async (req, res) => {
    const data = req.body
    try {
        const income = await Income.findOneAndUpdate(buildIncomeQuery(req, req.params.id), data, { new: true, runValidators: true });
        if (!income) {
            return handle404(res, "Income Not Found");
        }
        return handle200(res, income, "Income update successfully");
    } catch (error) {
        return formatError(res, error);
    }
}

const deleteI = async (req, res) => {
    try {
        const income = await Income.findOneAndDelete(buildIncomeQuery(req, req.params.id));
        if (!income) {
            return handle404(res, "Income Not Found");
        }
        return handle200(res, income, "Income deleted successfully");
    } catch (error) {
        return formatError(res, error);
    }
}

module.exports = {
    index,
    store,
    find,
    update,
    deleteI
}
