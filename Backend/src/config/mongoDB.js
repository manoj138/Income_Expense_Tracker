const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error('MONGODB_URI is not configured');
    }

    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('MongoDB connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the MongoDB database:', error.message);
        throw error;
    }
};

module.exports = connectDB;
