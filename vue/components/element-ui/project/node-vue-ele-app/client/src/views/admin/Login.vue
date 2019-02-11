<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">{{ mainData.title }}</span>
            </div>
            <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" @keyup.enter.native="submitForm('loginForm')" label-width="60px">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">登  录</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                </div>
            </el-form>
        </section>
    </div>
</template>

<script>
    import {
        Login,  // 登录
    } from "../../api/api"

    import jwt_decode from "jwt-decode";

    export default {
        name: "login",

        data() {
            return {
                mainData: {
                    title: title
                },

                loginUser: {
                    email: "aa@aa.com",
                    password: "aaaaaa"
                },
                rules: {
                    email: [
                        {
                            type: "email",
                            required: true,
                            message: "邮箱格式不正确",
                            trigger: "change"
                        }
                    ],
                    password: [
                        { required: true, message: "密码不能为空", trigger: "blur" },
                        { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
                    ]
                }
            };
        },

        methods: {
            /**
             * common
             */
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            },

            // 提交表单
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Login(this.loginUser).then(res => {
                            // console.log(res);

                            // 登录成功
                            this.$message({
                                message: "登录成功！",
                                type: "success"
                            });

                            const { token } = res.data;
                            localStorage.setItem("eleToken", token);

                            // 解析token
                            const decode = jwt_decode(token);

                            // console.log(decode);

                            // 存储数据（token存储到vuex中）（异步actions）
                            this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
                            this.$store.dispatch("setUser", decode);

                            // 页面跳转
                            this.$router.push("/index");
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
        },
        // 预处理
        created: function(){
            // console.log(this.md5("admin"));
        },
    };
</script>

<style scoped>
    .login {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../assets/images/bg.jpg) no-repeat center center;
        background-size: 100% 100%;
    }

    .form_container {
        position: absolute;
        top: 20%;
        left: 34%;
        width: 370px;
        padding: 25px;
        text-align: center;
        border-radius: 5px;
    }

    .form_container .manage_tip .title {
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }

    .loginForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 10px #cccc;
    }

    .submit_btn {
        width: 100%;
    }

    .tiparea {
        text-align: right;
        font-size: 12px;
        color: #333;
    }
    .tiparea p a {
        color: #409eff;
    }
</style>


