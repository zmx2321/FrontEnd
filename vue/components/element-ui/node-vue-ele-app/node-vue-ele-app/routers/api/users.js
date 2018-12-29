/**
 *  @login & register
 */
// 引入express
const express = require("express");

// 实例化router
// (需要中间件来使用)
const router = express.Router();

// 路由
//  @route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: 'login works' });
});

//对外提供一个接口
module.exports = router;