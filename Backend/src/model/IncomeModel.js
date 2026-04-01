const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
    {
        income_source: {
            type: String,
            required: [true, "source is required"]
        },
        income_amount: {
            type: Number,
            required: [true, "amount is required"]
        },
        income_method: {
            type: String,
            enum: ["Cash", "UPI", "Net Banking", "Debit Card", "Credit Card"],
            default: "Cash",
            required: [true, "method is required"]
        },
        income_date: {
            type: Date,
            required: [true, "Date is required"]
        },
        income_time: {
            type: String,
            required: [true, "Time is required"]
        },
        fk_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
        collection: 'incomeData'
    }
);

incomeSchema.virtual('income_id').get(function () {
    return this._id.toString();
});

const schemaTransform = (_, ret) => {
    delete ret._id;
    return ret;
};

incomeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: schemaTransform
});

incomeSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: schemaTransform
});

module.exports = mongoose.model("Income", incomeSchema);
