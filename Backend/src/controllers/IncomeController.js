const { deleteUploadedFiles } = require("../helper/deleteUploadedFiles")
const { formatSequelizeError, handle404 } = require("../helper/errorHandler")
const { saveRAMFiles } = require("../helper/memoryUpload")
const { getPagination, getPagingData } = require("../helper/paginationHelper")
const { handle200, handle201 } = require("../helper/successHandler")
const Income = require("../model/IncomeModel");
const { Op } = require("sequelize");

const index = async (req, res) => {
    try { 
        const { page, size, search, startDate, endDate, status } = req.query;

        const { limit, offset } = getPagination(page, size)


    let where = {
      fk_id: req.user.id, // ✅ current user
    };

    // 🔍 Search filter
    if (search) {
      where[Op.or] = [
        { income_source: { [Op.like]: `%${search}%`}},
       
      ];
    }

    // 📅 Date filter
    if (startDate && endDate) {
      where.income_date = {
        [Op.between]: [startDate, endDate],
      };
    }

  
        const inData = await Income.findAndCountAll({
            where:where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],

        });
         
        const totalAmount = await Income.sum("income_amount", {
            where: { fk_id: req.user.id }
        });

        const response = getPagingData(inData, page, limit);
        return handle200(res, {...response,
            totalAmount
        }, "Get Inncome Successfully");

    } catch (error) {
        return formatSequelizeError(res, error)
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
        if (req.tempFiles && req.tempFiles.length > 0) {
            await saveRAMFiles(req.tempFiles);
        }
        return handle201(res, incomeData, "income added sucessfully")
    } catch (error) {
        return formatSequelizeError(res, error);

    }
}

const find = async (req, res) => {
    try {
        const income = await Income.findByPk(req.params.id);
      
        if (!income) {
            return handle404(res, "Income Not Found");
        }
        return handle200(res, income, "income fetch sucessfully")

    } catch (error) {
        return formatSequelizeError(res, error);

    }
}

const update = async (req, res) => {
    const data = req.body
    try {
        const income = await Income.findByPk(req.params.id);
        if (!income) {
            return handle404(res, "income Not Found");
        }

        if (req.tempFiles && req.tempFiles.length > 0) {

            deleteUploadedFiles(income);
            await saveRAMFiles(req.tempFiles);
        }
        await income.update(data)

        return handle200(res, income, "income update successfully");

    } catch (error) {

        return formatSequelizeError(res, error);
    }
}


const deleteI = async (req, res) => {
    try {

        const income = await Income.findByPk(req.params.id)
        if (!income) {
            return handle404(res, "Incomme Not Found");
        }
        deleteUploadedFiles({ file: income.income_image });
        await income.destroy();
        return handle200(res, income, "income deleted successfully");
    } catch (error) {
        return formatSequelizeError(res, error);
    }
}

module.exports = {
    index,
    store,
    find,
    update,
    deleteI
}