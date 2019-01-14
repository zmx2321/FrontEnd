<template>
    <section class="header_nav f-oh">
        <el-row class="header_nav f-cb">
            <el-col class="header_left f-oh">
                <el-row>
                    <el-col :span="4" class="logo f-oh">
                        <img src="../assets/logo.png" alt="">
                    </el-col>
                    <el-col :span="18" class="title f-oh">
                        <span>天天影院后台管理系统</span>
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
                            <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command='modify_password'>修改密码</el-dropdown-item>
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
            user_info: {},
        }
    },
    computed: {
        user() {
            // return this.$store.getters.user;
        }
    },
    methods: {
        getUser () {
            // this.axios.post('/api/admin/user/login', qs.stringify({phone:15988831425,password:123456})).then((res) => {
            //     this.user_info = res.data.data;
            //     console.log(this.user_info)
            // }).catch((err) => {
            //
            // });
        },
        setDialogInfo(cmditem) {
          // if (!cmditem) {
          //   console.log("test");
          //   this.$message("菜单选项缺少command属性");
          //   return;
          // }
          switch (cmditem) {
            case "modify_password":
              this.showModifyPassword();
              break;
            case "logout":
              this.logout();
              break;
          }
        },
        // 修改密码
        showModifyPassword() {
          this.$router.push("/modify_password");
        },
        // 退出
        logout() {
          // 清除token
          localStorage.removeItem("code");
          // this.$store.dispatch("clearCurrentState");

          // 页面跳转
          this.$router.push("/login");
        }
    },
    created (){
        this.getUser();
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

    .welcome span{
        display: block;
        height: 55px;
        line-height: 55px;
    }
</style>
