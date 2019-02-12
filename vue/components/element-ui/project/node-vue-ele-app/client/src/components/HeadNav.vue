<template>
    <section class="header_nav f-oh">
        <el-row class="header_nav f-cb">
            <el-col class="header_left f-oh">
                <el-row>
                    <el-col :span="4" class="logo f-oh">
                        <img src="../assets/logo.png" alt="">
                    </el-col>
                    <el-col :span="18" class="title f-oh">
                        <span>{{ mainData.title }}</span>
                    </el-col>
                </el-row>
            </el-col>
            <el-col class="header_right f-oh">
                <el-row el-row type="flex">
                    <el-col :span="8" class="avatar f-oh">
                        <!--<img src="../assets/images/portrait.png" alt="">-->
                        <img :src="user.avatar" class='avatar' alt="avatar">
                    </el-col>
                    <el-col :span="11" class="welcome f-oh">
                        <span>欢迎</span>
                        <span class="f-toe">{{ user.name }}</span>
                    </el-col>
                    <el-col :span="4" class="title f-oh">
                        <el-dropdown trigger="click" @command='setDialogInfo'>
                            <span class="el-dropdown-link f-csp">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                                <el-dropdown-item  command='logout'>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </section>
</template>

<script>
export default {
    name: "head-nav",

    data () {
        return {
            mainData: {
                title: title
            }
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    methods: {
        // 下拉框属性
        setDialogInfo(cmditem) {
            if (!cmditem) {
                console.log("test");
                this.$message("菜单选项缺少command属性");
                return;
            }

            switch (cmditem) {
                case "info":
                    this.showInfoList();

                    break;
                case "logout":
                    this.logout();

                    break;
            }
        },
        // 个人信息
        showInfoList() {
            this.$router.push("/infoshow");
        },
        // 退出
        logout() {
            // 清除token
            localStorage.removeItem("eleToken");
            this.$store.dispatch("clearCurrentState");

            // 页面跳转
            this.$router.push("/login");
        }
    },
    created (){
        // console.log(aa);
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
         width: 250px;
     }

    .header_right {
        width: initial;
        min-width: 140px;
        float: right;
    }

    .logo{
        margin: 0 8px 0 10px;
    }

    .logo img{
        height: 40px;
        width: 40px;
        margin-top: 10px;
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

    .welcome{
        margin-top: 9px;
        height: 45px;
    }

    .welcome span{
        display: block;
        text-align: center;
        font-size: 14px;
    }

    .welcome span:last-child{
        margin-top: 8px;
        max-width: 65px;
        font-size: 12px;
     }
</style>
