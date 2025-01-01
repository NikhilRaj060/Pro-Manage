const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.error("Db connected Sucessfully")
    } catch (error) {
        console.error(`Db failed to connect ${error}`)
    }
}

module.exports = connectDB;