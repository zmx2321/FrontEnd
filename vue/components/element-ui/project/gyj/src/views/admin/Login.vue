<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">{{ $t('main.title') }}</span>
            </div>
            <el-form :model="loginUser" @keyup.enter.native="submitForm('loginForm')" status-icon :rules="rules" ref="loginForm" class="loginForm" label-width="80px">
                <!--{{ $t('identity.user') }}-->
                <el-form-item :label="$t('identity.user')" prop="username">
                    <el-input v-model="loginUser.username" :placeholder="$t('identity.input.user')" clearable></el-input>
                </el-form-item>
                <el-form-item :label="$t('identity.pas')" prop="password">
                    <el-input autocomplete="new-password" type="password" v-model="loginUser.password" :placeholder="$t('identity.input.pas')" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">{{ $t('btn.login') }}</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
    import {
        Login  // 登陆
    } from "../../api/api"

    export default {
        name: "login",

        data() {
            return {
                loginUser: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [
                        { required: true, message: "用户名不能为空", trigger: "blur" },
                        { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
                    ],
                    password: [
                        { required: true, message: "密码不能为空", trigger: "blur" },
                        { min: 5, message: "长度不小于 5 个字符", trigger: "blur" }
                    ]
                }
            };
        },

        methods: {
            // 提交表单
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        //验证通过，密码进行md5加密
                        this.loginUser.password = this.md5(this.loginUser.password);

                        Login(this.qs.stringify(this.loginUser)).then(res => {
                            // console.log(res.data);

                            if (res.data.code == 1){
                                this.$message({
                                    message: "用户名或密码错误",
                                    type: "error"
                                });
                            } else {
                                // 登陆状态记录
                                localStorage.setItem('code', this.md5((res.data.code).toString()));

                                this.$message({
                                    message: this.$t('message.success.login'),
                                    type: "success"
                                });

                                this.$router.push("/consultation");
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    } else {
                        this.$message.warning("error submit!!");
                        // console.log("error submit!!");
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

<style lang="less" scoped>
    /* Less */
    @fontColor: #fff;

    .login {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../assets/images/bg.jpg) no-repeat center center;
        background-size: 100% 100%;

        .form_container {
            position: absolute;
            top: 20%;
            left: 34%;
            width: 370px;
            padding: 25px;
            text-align: center;
            border-radius: 5px;
        }

        .manage_tip {
            .title {
                font-weight: bold;
                font-size: 26px;
                color: @fontColor;
            }
        }

        .loginForm {
            margin-top: 20px;
            background-color: #fff;
            padding: 20px 40px 20px 20px;
            border-radius: 5px;
            box-shadow: 0 5px 10px #cccc;

            .submit_btn {
                width: 100%;
            }
        }
    }
</style>


