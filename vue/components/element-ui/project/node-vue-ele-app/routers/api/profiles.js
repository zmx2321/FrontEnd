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
    })

    /**
     *  @route  POST api/profiles/add
     *  @desc   创建信息接口
     *  @access private(需要验证token接口)
     */
    .post('/add', passwort.authenticate("jwt", {session: false}), (req, res) => {
        const profileFields = {};

        if (req.body.type) profileFields.type = req.body.type;
        if (req.body.describe) profileFields.describe = req.body.describe;
        if (req.body.income) profileFields.income = req.body.income;
        if (req.body.expend) profileFields.expend = req.body.expend;
        if (req.body.cash) profileFields.cash = req.body.cash;
        if (req.body.remark) profileFields.remark = req.body.remark;

        // 如果存储成功
        new Profile(profileFields).save().then(profile => {
            res.json(profile);
        });
    })

    /**
     *  @route  GET api/profiles
     *  @desc   获取所有信息
     *  @access private(需要验证token接口)
     */
    .get('/', passwort.authenticate("jwt", {session: false}), (req, res) => {
        // 查询所有信息
        Profile.find().then(profile => {
            if (!profile) {
                return res.status(404).json('没有任何内容！');
            }

            res.json(profile);
        }).catch(err => res.status(404).json(err));
    })

    /**
     *  @route  GET api/profiles/:id
     *  @desc   获取单个信息
     *  @access private(需要验证token接口)
     */
    .get('/:id', passwort.authenticate("jwt", {session: false}), (req, res) => {
        // 查询所有信息
        Profile.findOne({ _id: req.params.id }).then(profile => {
            if (!profile) {
                return res.status(404).json('没有任何内容！');
            }

            res.json(profile);
        }).catch(err => res.status(404).json(err));
    })

    /**
     *  @route  POST api/profiles/edit/:id
     *  @desc   编辑信息接口
     *  @access private(需要验证token接口)
     */
    .post('/edit/:id', passwort.authenticate("jwt", {session: false}), (req, res) => {
        const profileFields = {};

        if (req.body.type) profileFields.type = req.body.type;
        if (req.body.describe) profileFields.describe = req.body.describe;
        if (req.body.income) profileFields.income = req.body.income;
        if (req.body.expend) profileFields.expend = req.body.expend;
        if (req.body.cash) profileFields.cash = req.body.cash;
        if (req.body.remark) profileFields.remark = req.body.remark;

        Profile.findOneAndUpdate(
            { _id: req.params.id },
            { $set: profileFields },
            { new: true }
        ).then(profile => {
            res.json(profile);
        }).catch(err => {
            res.status(404).json(err);
        });
    })

    /**
     *  @route  delete api/profiles/delete/:id
     *  @desc   删除信息接口
     *  @access private(需要验证token接口)
     */
    .delete('/delete/:id', passwort.authenticate("jwt", {session: false}), (req, res) => {
        Profile.findOneAndDelete({ _id: req.params.id }).then(profile => {
            profile.save().then(profile => res.json(profile));
        }).catch(() => {
            res.status(404).json("删除失败！");
        });
    });

//对外提供一个接口
module.exports = router;