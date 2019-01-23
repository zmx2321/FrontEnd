/**
 *  @ login & register
 */
// 引入express
const express = require("express");

// 实例化router
const router = express.Router();

// bcrypt跨平台加密
const bcrypt = require("bcrypt");

// 引入jsonwebtoken
const jwt = require('jsonwebtoken');

// 全球公认的头像
const gravatar = require('gravatar');

// 引入key.js[secretOrKey(加密名字)]
const keys = require("../../config/keys");

// 引入passport
const passwort = require("passport");

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
        res.json({ msg: 'test' });
    })

    /**
     *  @route  POST api/users/register
     *  @desc   返回的请求的json数据
     *  @access public
     *
     *  使用post必须使用body-parser(中间件)
     */
    .post('/register', (req, res) => {
        // console.log(req.body);

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
                    identity: req.body.identity,
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

                // console.log("register success");
            }
        });
    })

    /**
     *  @route  POST api/users/login
     *  @desc   返回的请求的json数据
     *  @access public
     */
    .post('/login', (req, res) => {
        const email = req.body.email,  //邮箱
            password = req.body.password;  //密码

        // 查询数据库
        User.findOne({email}).then(user => {
            if (!user){
                return res.status(404).json("用户不存在!");
            }

            // 如果email在数据库中存在，则进行密码匹配
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // res.json({msg: "登陆成功!"});

                    // 登录成功返回token
                    // jwt.sign("规则", "加密名字", "过期时间", "回调");  // 签名
                    const rule = {  //加密规则，使用id+昵称
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        identity: user.identity
                    };
                    jwt.sign(rule, keys.secretOrKey, {
                        expiresIn: 3600  // 有效时间在3600s,60分钟
                    }, (err, token) => {
                        if (err) throw err;

                        res.json({
                            success: true,
                            token: "Bearer " + token  // 前缀名必须是Bearer加空格
                        });
                    });
                } else {
                    return res.status(400).json('密码错误!');
                }
            });
        });
    })

    /**
     *  @route  GET api/users/current
     *  @desc   返回的请求的json数据(验证token,passport-jwt)
     *  ('/current', '验证token', (req, res))
     *  @access private
     */
    .get('/current', passwort.authenticate("jwt", {session: false}), (req, res) => {
        // res.json({msg: "success"});

        // 返回用户信息(passport中return了user)
        // res.json(req.user);
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            identity: req.user.identity
        });
    })

//对外提供一个接口
module.exports = router;