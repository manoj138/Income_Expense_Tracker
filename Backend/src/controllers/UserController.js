const { hashPassword, comparePassword, generateToken } = require("../helper/authHelper");
const { formatError } = require("../helper/mongoError");
const { handle401, handle404 } = require("../helper/errorHandler");
const { handle201, handle200 } = require("../helper/successHandler");
const User = require("../model/UserModel");

const sanitizeUser = (user) => {
    if (!user) return null;
    return typeof user.toJSON === "function" ? user.toJSON() : user;
};

const register = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.create(data);
        handle201(res, sanitizeUser(user), "User registered successfully");
    } catch (error) {
        console.log("🚀 ~ register ~ error:", error);
        return formatError(res, error);
    }
}

const login = async (req, res) => {
    try {
        const data = req.body;
        const findUser = await User.findOne({ email: data.email });

        if (!findUser) {
            return handle401(res, "Invalid Credential")
        }
        const matchpass = await comparePassword(data.password, findUser.password);
        if (!matchpass) {
            return handle401(res, "Invalid Credential");
        }
        const payload = {
            id: findUser._id,
            email: findUser.email,
            status: findUser.status
        }
        const token = await generateToken(payload);
        handle200(res, { token, findUser: sanitizeUser(findUser) }, "Logine Successfully")
    } catch (error) {
        return formatError(res, error);
    }
}

const index = async (req, res) => {
    try {
        if (req.user.status !== 'admin') {
            return handle401(res, "Unauthorized: Admin access required");
        }
        const users = await User.find();
        handle200(res, users, "User List")
    } catch (error) {
        return formatError(res, error);
    }
}

const find = async (req, res) => {
    try {
        if (req.user.id !== req.params.id && req.user.status !== 'admin') {
            return handle401(res, "Unauthorized access");
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return handle404(res, "User Not Found");
        }

        return handle200(res, user, "User Details")
    } catch (error) {
        return formatError(res, error);
    }
}

const update = async (req, res) => {
    const data = { ...req.body };
    try {
        if (req.user.id !== req.params.id && req.user.status !== 'admin') {
            return handle401(res, "Unauthorized access");
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return handle404(res, "User Not Found");
        }

        if (data.password) {
            data.password = await hashPassword(data.password);
        } else {
            delete data.password;
        }

        if (req.user.status !== 'admin') {
            delete data.status;
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });

        return handle200(res, updatedUser, "Profile update successfully");
    } catch (error) {
        return formatError(res, error);
    }
}

const deleteU = async (req, res) => {
    try {
        if (req.user.id !== req.params.id && req.user.status !== 'admin') {
            return handle401(res, "Unauthorized access");
        }

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return handle404(res, "User Not Found");
        }
        handle200(res, null, "User deleted successfully");
    } catch (error) {
        console.log(error)
        return formatError(res, error);
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
