/**
 *  @ login & register
 */
// 引入express
const express = require("express");

// 实例化router
// (需要中间件来使用)
const router = express.Router();

//bcrypt跨平台加密
const bcrypt = require("bcrypt");
const gravatar = require('gravatar');

// 引入数据模型
const User = require("../../models/User");

// 路由
//  @route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: 'login works' });
});

// @route  POST api/users/register
// @desc   返回的请求的json数据
// @access public
// 使用post必须使用body-parser(中间件)
router.post('/register', (req, res) => {
    // 查询数据库中是否拥有邮箱
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json('邮箱已被注册!');
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
                identity: req.body.identity
            });

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;

                    newUser.password = hash;

                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

//对外提供一个接口
module.exports = router;