/**
 *  @description profiles
 */
// 引入express
const express = require("express");

// 实例化router
const router = express.Router();

// 引入passport
const passwort = require("passport");

// 引入数据模型
const Profile = require("../../models/Profile");

// 路由
router
    /**
     *  @route  GET api/profiles/test
     *  @desc   返回的请求的json数据
     *  @access public
     */
    .get('/test', (req, res) => {
        res.json({ msg: 'profile works' });
    });


//对外提供一个接口
module.exports = router;