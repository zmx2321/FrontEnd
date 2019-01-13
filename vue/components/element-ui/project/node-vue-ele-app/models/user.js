/**
 *  @description UserSchema
 */
// 引入创建Schema重要组件
const mongoose = require("mongoose"),  // 引入mongoose
    Schema = mongoose.Schema;  // 引入Schema

//创建Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);