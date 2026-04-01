const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        ex_source: {
            type: String,
            required: [true, "source is required"]
        },
        ex_amount: {
            type: Number,
            required: [true, "amount is required"]
        },
        ex_method: {
            type: String,
            enum: ["Cash", "UPI", "Net Banking", "Debit Card", "Credit Card"],
            default: "Cash",
            required: [true, "method is required"]
        },
        ex_date: {
            type: Date,
            required: [true, "Date is required"]
        },
        ex_time: {
            type: String,
            required: [true, "Time is required"]
        },
        fkex_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
        collection: 'expenseData'
    }
);

expenseSchema.virtual('ex_id').get(function () {
    return this._id.toString();
});

const schemaTransform = (_, ret) => {
    delete ret._id;
    return ret;
};

expenseSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: schemaTransform
});

expenseSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: schemaTransform
});

module.exports = mongoose.model("Expense", expenseSchema);
