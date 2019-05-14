<template>
    <section class="header_nav f-oh">
        <el-row class="header_nav f-cb">
            <el-col class="header_left f-oh f-pr">
                <el-row>
                    <el-col :span="2" class="logo f-oh">
                        <img src="../assets/logo.png" alt="">
                    </el-col>
                    <el-col :span="6" class="title f-oh">
                        <span>{{ this.$store.state.title }}</span>
                    </el-col>
                    <el-col :span="18" class="cen_tip" v-if="userType == 1">
                        <span>余额（元）：{{ profile.balance }}</span>
                    </el-col>
                </el-row>
            </el-col>
            <el-col class="header_right f-oh">
                <el-row el-row type="flex">
                    <el-col :span="8" class="avatar f-oh">
                        <img src="../assets/images/portrait.png" alt="">
                    </el-col>
                    <el-col :span="11" class="welcome f-oh">
                        <span>欢迎使用</span>
                    </el-col>
                    <el-col :span="4" class="title f-oh">
                        <el-dropdown trigger="click" @command='setDialogInfo'>
                            <span class="el-dropdown-link f-csp">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command='modify_password'>修改密码</el-dropdown-item>
                                <el-dropdown-item  command='logout'>注销</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import {
    getProfile,  // 获取自己信息
    LogOut,  // 注销
} from "../api/api"

export default {
    name: "head-nav",

    data () {
        return {
            // 用户类型
            userType: 0,

            profile: {},
        }
    },
    methods: {
        /**
         * api getProfile
         * 获取自己信息
         */
        getProfile () {
            getProfile().then(res => {
                // console.log(res.data.data);
                this.profile = res.data.data
            }).catch({});
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
          this.$router.push("/modify_password");
        },

        // 注销
        logout() {
            LogOut().then(res => {
                // console.log(res.data.code);

                if (res.data.code == 1) {
                    this.$message.warning(res.msg);
                }

                if (res.data.code == 0) {
                    localStorage.removeItem("code");
                    localStorage.removeItem("userType");

                    this.$message.success("注销成功");
                    this.$router.push("/login");
                }
            }).catch({});
        }
    },
    created (){
        this.getProfile();

        this.userType = localStorage.userType;
    }
};
</script>

<style scoped>
    .header_nav{
        min-width: 390px;
        height: 100%;
    }

    .header_nav span{
        color: #fff;
    }

    .header_left {
         width: 500px;
     }

    .header_right {
        width: initial;
        min-width: 140px;
        float: right;
    }

    .cen_tip {
        position: absolute;
        right: 0;
        top: 18px;
        text-align: right;
    }

    .logo{
        margin: 0 -3px 0 10px;
    }

    .logo img{
        height: 40px;
        width: 40px;
        margin-top: 10px;
    }

    .logo + .title {
        margin-left: 20px;
    }

    .title span{
        display: block;
        height: 55px;
        line-height: 55px;
    }

    .avatar img {
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
</style>
