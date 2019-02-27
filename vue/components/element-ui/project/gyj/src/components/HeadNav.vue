<template>
    <section class="header_nav f-oh">
        <el-row class="header_nav f-cb">
            <el-col class="header_left f-oh">
                <el-row>
                    <el-col :span="4" class="logo f-oh">
                        <img src="../assets/logo.png" alt="">
                    </el-col>
                    <el-col :span="18" class="title f-oh">
                        <span>{{ $t('main.title') }}</span>
                    </el-col>
                </el-row>
            </el-col>
            <el-col class="header_right f-oh">
                <el-row el-row type="flex">
                    <el-col :span="8" class="avatar f-oh">
                        <img src="../assets/images/portrait.png" alt="">
                    </el-col>
                    <el-col :span="11" class="welcome f-oh">
                        <span>{{ $t('message.welcome') }}</span>
                    </el-col>
                    <el-col :span="4" class="title f-oh">
                        <el-dropdown trigger="click" @command='setDialogInfo'>
                            <span class="el-dropdown-link f-csp">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <!--<el-dropdown-item command='modify_password'>修改密码</el-dropdown-item>-->
                                <el-dropdown-item  command='logout'>{{ $t('btn.logout') }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <!-- 修改密码 -->
        <el-dialog title="修改密码" :close-on-click-modal="false" :visible.sync="modifyUserVisible" :before-close="handleClose">
            <el-form :model="modifyUser" @keyup.enter.native="submitForm('modifyForm')" status-icon :rules="rules" ref="modifyForm" class="loginForm" label-width="100px">
                <el-form-item label="旧密码" prop="oldPwd">
                    <el-input v-model="modifyUser.oldPwd" placeholder="请输入旧密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input v-model="modifyUser.newPwd" placeholder="请输入新密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="重复新密码" prop="newPwd2">
                    <el-input v-model="modifyUser.newPwd2" placeholder="请输入新密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('modifyForm')" @keyup.enter.native="submitForm('modifyForm')" class="submit_btn">修改密码</el-button>
                    <el-button @click="resetForm('modifyForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
import {
    Logout,  // 登出
} from "../api/api"

export default {
    name: "head-nav",

    data () {
        // 校验重复密码
        const validatePass2 = (rule, value, callback) => {
            if (value !== this.modifyUser.newPwd) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };

        return {
            modifyUserVisible: false,

            modifyUser: {
                oldPwd: "",  //旧密码
                newPwd: "",  //新密码
                newPwd2: ""  //重复新密码
            },
            rules: {
                oldPwd: [
                    { required: true, message: "密码不能为空", trigger: "blur" },
                    { min: 5, message: "长度不小于 5 个字符", trigger: "blur" }
                ],
                newPwd: [
                    { required: true, message: "密码不能为空", trigger: "blur" },
                    { min: 5, message: "长度不小于 5 个字符", trigger: "blur" }
                ],
                newPwd2: [
                    { required: true, message: "确认密码不能为空", trigger: "blur" },
                    { min: 5, message: "长度不小于 5 个字符", trigger: "blur" },
                    //使用自定义验证规则，在失去焦点触发
                    { validator: validatePass2, trigger: "blur" }
                ]
            },
        }
    },
    methods: {
        /**
         * common
         */
        //关闭提示
        handleClose(done) {
            this.$confirm('确认关闭？').then(() => {
                done();
                this.resetForm('modifyForm');
            }).catch(err => {
                throw err;
            });
        },
        //表单重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // 下拉框属性
        setDialogInfo(cmditem) {
            if (!cmditem) {
                console.log("test");
                this.$message("菜单选项缺少command属性");
                return;
            }

            switch (cmditem) {
                case "modify_password":
                    this.modifyPassword();
                    break;
                case "logout":
                    this.logout();
                    break;
            }
        },
        // 修改密码
        modifyPassword() {
            // this.$router.push("/modify_password");
            this.modifyUserVisible = true;
        },

        // 提交表单
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    //验证通过，密码进行md5加密
                    this.modifyUser.oldPwd = this.md5(this.modifyUser.oldPwd);
                    this.modifyUser.newPwd = this.md5(this.modifyUser.newPwd);
                    this.modifyUser.newPwd2 = this.md5(this.modifyUser.newPwd2);

                    ModifyPassword(this.modifyUser).then(res => {
                        // console.log(res);

                        if (res.data.msg != "success"){
                            this.$message({
                                message: res.data.msg,
                                type: "warning"
                            });

                            this.modifyUser.oldPwd = "";
                            this.modifyUser.newPwd = "";
                            this.modifyUser.newPwd2 = "";
                        } else {
                            this.$message({
                                message: "密码修改成功",
                                type: "success"
                            });

                            this.modifyUserVisible = false;

                            this.modifyUser.oldPwd = "";
                            this.modifyUser.newPwd = "";
                            this.modifyUser.newPwd2 = "";
                        }
                    }).catch({});
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },

        // 登出
        logout() {
            Logout().then(() => {
                this.$message({
                    message: this.$t('message.logoutSuccess'),
                    type: "success"
                });

                localStorage.removeItem("code");
                this.$router.push("/login");
            }).catch({});
        },
    },
    created (){

    }
};
</script>

<style lang="less" scoped>
    /* less */
    @fontColor: #fff;

    /* header_nav */
    .header_nav{
        min-width: 390px;
        height: 100%;

        span {
            color: @fontColor;
        }

        .title span{
            display: block;
            height: 55px;
            line-height: 55px;
        }

        /* header_left */
        .header_left {
            width: 250px;

            .logo{
                margin: 0 8px 0 10px;

                img{
                    height: 40px;
                    width: 40px;
                    margin-top: 10px;
                }
            }
        }

        /* header_left */
        .header_right {
            width: initial;
            min-width: 140px;
            float: right;

            .avatar img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-top: 10px;
            }

            .welcome span{
                display: block;
                height: 55px;
                line-height: 55px;
            }
        }
    }
</style>
