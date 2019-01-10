<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">天天影院后台管理系统</span>
            </div>
            <!-- ref获取表单内容 -->
            <el-form :model="registerUser" @keyup.enter.native="submitForm('registerForm')" status-icon :rules="rules" class="registerForm" ref="registerForm" label-width="80px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="registerUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input v-model="registerUser.password2" placeholder="请确认密码" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btn_wrap">
                    <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')" @keyup.enter.native="submitForm('registerForm')">注 册</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
    export default {
        name: "register",

        data() {
            //自定义验证规则
            const validatePass2 = (rule, value, callback) => {
                if (value !== this.registerUser.password) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                registerUser: {
                    name: "",
                    password: "",
                    password2: ""
                },
                rules: {
                    name: [
                        { required: true, message: "用户名不能为空", trigger: "blur" },
                        { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
                    ],
                    password: [
                        { required: true, message: "密码不能为空", trigger: "blur" },
                        { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
                    ],
                    password2: [
                        { required: true, message: "确认密码不能为空", trigger: "blur" },
                        { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" },
                        //使用自定义验证规则，在失去焦点触发
                        { validator: validatePass2, trigger: "blur" }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                //是否验证通过
                this.$refs[formName].validate(valid => {
                    //提交
                    if (valid) {
                        this.$axios
                            .get("/api/form", this.registerUser)
                            .then(res => {
                                console.log(res);

                                // 注册成功
                                this.$message({
                                    message: "注册成功！",
                                    type: "success"
                                });
                                this.$router.push("/login");
                            });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    };
</script>


<style scoped>
    .register {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../assets/images/bg.jpg) no-repeat center center;
        background-size: 100% 100%;
    }

    .form_container {
        width: 370px;
        height: 210px;
        position: absolute;
        top: 10%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }

    .form_container .manage_tip .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }

    .registerForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }

    .submit_btn {
        width: 100%;
    }
</style>