const mongoose = require("mongoose");
const colors = require('colors')

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    console.log(`MongoDB Connected : ${conn.connection.host}`.white.bold.underline)
}

module.exports = connectDB;
