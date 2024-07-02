const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tempUserSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
}, {timestamps: {createdAt: 'createdAt' , updatedAt: "updatedAt" }})

const TempUserModel = mongoose.model('TempUser',tempUserSchema)
module.exports = TempUserModel;