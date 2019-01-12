/**
 *  @ login & register
 */
// 引入express
const express = require("express");

// 实例化router
const router = express.Router();

// bcrypt跨平台加密
const bcrypt = require("bcrypt");

// 全球公认的头像
const gravatar = require('gravatar');

// 引入数据模型
const User = require("../../models/User");

// 路由
router
    /**
     *  @route  GET api/users/test
     *  @desc   返回的请求的json数据
     *  @access public
     */
    .get('/test', (req, res) => {
        res.json({ msg: 'login works' });
    })

    /**
     *  @route  POST api/users/register
     *  @desc   返回的请求的json数据
     *  @access public
     *
     *  使用post必须使用body-parser(中间件)
     */
    .post('/register', (req, res) => {
        console.log(req.body);

        // 查询数据库中是否拥有邮箱
        // (如果没有数据库则新建再新增数据，如果没有数据则新增数据)
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                return res.status(400).json('邮箱已被注册!');
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',  //size
                    r: 'pg',  // reading（图片格式）
                    d: 'mm'  //default(邮箱默认头像)
                });

                // 新增一条数据
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                });

                // 加密
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;

                        newUser
                            .save()  // 存储
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });

                console.log("register success")
            }
        });
    })

    /**
     *  @route  GET api/users/login
     *  @desc   返回的请求的json数据
     *  @access public
     */
    .post('/login', (req, res) => {
        const email = req.body.email,  //邮箱
            password = req.body.password;  //密码

        // 查询数据库
        User.findOne({email}).then(user => {
            if (!user){
                return res.status(404).json({email: "用户不存在!"});
            }

            // 如果email在数据库中存在，则进行密码匹配
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    res.json({msg: "登陆成功!"});
                } else {
                    return res.status(400).json('密码错误!');
                }
            });
        });
    });

//对外提供一个接口
module.exports = router;