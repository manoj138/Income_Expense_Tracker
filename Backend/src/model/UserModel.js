const mongoose = require("mongoose");
const { hashPassword } = require("../helper/authHelper");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        user_name: {
            type: String,
            required: [true, "User Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"]
        },
        status: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        }
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

userSchema.virtual('user_id').get(function () {
    return this._id.toString();
});

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    this.password = await hashPassword(this.password);
});

const schemaTransform = (_, ret) => {
    delete ret._id;
    delete ret.password;
    return ret;
};

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: schemaTransform
});

userSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: schemaTransform
});

module.exports = mongoose.model("User", userSchema);

