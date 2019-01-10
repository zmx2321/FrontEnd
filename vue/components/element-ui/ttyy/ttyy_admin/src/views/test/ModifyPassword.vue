<template>
    <div class="modify">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">天天影院后台管理系统</span>
            </div>
            <el-form :model="modifyUser" @keyup.enter.native="submitForm('modifyForm')" status-icon :rules="rules" ref="modifyForm" class="loginForm" label-width="80px">
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input v-model="modifyUser.oldPassword" placeholder="请输入旧密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="modifyUser.newPassword" placeholder="请输入新密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword2">
                    <el-input v-model="modifyUser.newPassword2" placeholder="请输入新密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('modifyForm')" @keyup.enter.native="submitForm('modifyForm')" class="submit_btn">修改密码</el-button>
                </el-form-item>
                <div class="tiparea">
                    <router-link to='/index'>返回</router-link>
                </div>
            </el-form>
        </section>
    </div>
</template>

<script>
    import { ModifyPassword } from "../../api/api"

    export default {
        name: "modify_password",

        data() {
            //自定义验证规则
            const validatePass2 = (rule, value, callback) => {
                if (value !== this.modifyUser.newPassword) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };

            return {
                modifyUser: {
                    oldPassword: "",  //旧密码
                    newPassword: "",  //新密码
                    newPassword2: ""  //重复新密码
                },
                rules: {
                    oldPassword: [
                        { required: true, message: "密码不能为空", trigger: "blur" },
                        { min: 5, message: "长度不小于 5 个字符", trigger: "blur" }
                    ],
                    newPassword: [
                        { required: true, message: "密码不能为空", trigger: "blur" },
                        { min: 5, message: "长度不小于 5 个字符", trigger: "blur" }
                    ],
                    newPassword2: [
                        { required: true, message: "确认密码不能为空", trigger: "blur" },
                        { min: 5, message: "长度不小于 5 个字符", trigger: "blur" },
                        //使用自定义验证规则，在失去焦点触发
                        { validator: validatePass2, trigger: "blur" }
                    ]
                }
            };
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    //验证通过，密码进行md5加密
                    this.modifyUser.oldPassword = this.md5(this.modifyUser.oldPassword);
                    this.modifyUser.newPassword = this.md5(this.modifyUser.newPassword);
                    this.modifyUser.newPassword2 = this.md5(this.modifyUser.newPassword2);

                    if (valid) {
                        ModifyPassword(qs.stringify(this.modifyUser)).then(res => {
                            // console.log(res);

                            this.$message({
                                message: "密码修改成功！",
                                type: "success"
                            });

                            this.$router.push("/login");
                        }).catch({});
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
        },
        //预处理数据
        created: function(){
            //console.log($('body'));
        },
    };
</script>

<style scoped>
    .modify {
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
        top: 20%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }
    .form_container .manage_tip .title {
        /*font-family: "Microsoft YaHei";*/
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