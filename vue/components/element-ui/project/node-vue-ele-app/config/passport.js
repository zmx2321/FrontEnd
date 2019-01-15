// 在官网上拷贝passport-jwt的使用方法(两个jwt方法)
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// 引入数据模型
const mongoose = require("mongoose");
const User = mongoose.model("users");

// 引入key.js[secretOrKey(加密名字)]
const keys = require("../config/keys");

// jwt操作
const opts = {};  // 对应的配置信息
// 用当前的配置信息调用jwt请求，来验证对应的token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;  // 将token令牌赋值给jwt

// 接收passport
module.exports = passport => {
    // 使用passport，首先实例化JwtStrategy,方法在api中有介绍
    // https://www.npmjs.com/package/passport-jwt
    // 拿到当前token, 回调
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload);  // 打印当前令牌的用户属性

        // 根据id查用户(使用jwt_payload)
        User.findById(jwt_payload.id).then(user => {
            if (user) {
                return done(null, user);
            }

            return done(null, false);
        }).catch(err => {
            if (err) throw err;
        });
    }));
}