const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("Db connected Sucessfully")
    } catch (error) {
        console.log(`Db failed to connect ${error}`)
    }
}

module.exports = connectDB;