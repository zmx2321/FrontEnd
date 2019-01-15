/**
 *  @description ProfileSchema
 */
// 引入创建Schema重要组件
const mongoose = require("mongoose"),  // 引入mongoose
    Schema = mongoose.Schema;  // 引入Schema

// Create Schema
const ProfileSchema = new Schema({
    type: {
        type: String
    },
    describe: {
        type: String
    },
    income: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: true
    },
    remark: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);