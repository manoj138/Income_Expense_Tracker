const { hashPassword, comparePassword, generateToken } = require("../helper/authHelper");
const { deleteUploadedFiles } = require("../helper/deleteUploadedFiles");
const { formatSequelizeError, handle401, handle404, handle422 } = require("../helper/errorHandler");
const { saveRAMFiles } = require("../helper/memoryUpload");
const { handle201, handle200 } = require("../helper/successHandler");
const User = require("../model/UserModel");

const register = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.create(data);
        handle201(res, user, "User registered successfully");
    } catch (error) {
        console.log("🚀 ~ register ~ error:", error);
        return formatSequelizeError(res, error);
    }
}

const login = async (req, res) => {
    try {
        const data = req.body;
        const findUser = await User.findOne({
            where: {
                email: data.email
            }
        })

        if (!findUser) {
            return handle401(res, "Invalid Credential")
        }
        const matchpass = await comparePassword(data.password, findUser.password);
        if (!matchpass) {
            return handle401(res, "Invalid Credential");
        }
        const payload = {
            id: findUser.id,
            email: findUser.email,

        }
        const token = await generateToken(payload);
        handle200(res, { token, findUser }, "logine Successfully")
    } catch (error) {
        return formatSequelizeError(res, error);
    }
}


const index = async (req, res) => {
    try {
        const users = await User.findAll()
        handle200(res, users, "user List")

    } catch (error) {
        return formatSequelizeError(res, error);
    }
}


const find = async (req, res) => {
    try {
        const users = await User.findByPk(req.params.id);
        if (!users) {
            return handle404(res, "User Not Found");
        }

        return handle200(res, users, "user Details")
    } catch (error) {

        return formatSequelizeError(res, error);
    }
}


const update = async (req, res) => {
    const data = req.body
    try {
        const users = await User.findByPk(req.params.id);
        if (!users) {
            return handle404(res, "User Not Found");
        }

        if (req.tempFiles && req.tempFiles.length > 0) {

            deleteUploadedFiles(users);
            await saveRAMFiles(req.tempFiles);
        }
        await users.update(data)

        return handle200(res, users, "profile update successfully");

    } catch (error) {

        return formatSequelizeError(res, error);
    }
}


const deleteU = async (req, res) => {
    try {
        const users = await User.findByPk(req.params.id);
        if (!users) {
            return handle404(res, "User Not Found");
        }
        deleteUploadedFiles({ file: users.user_image });
        await users.destroy();
        return handle404(res, "User Not Found");

    } catch (error) {
        console.log(error)
        return formatSequelizeError(res, error);

    }
}

module.exports = {
    register,
    login,
    index,
    find,
    update,
    deleteU
}