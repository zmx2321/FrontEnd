<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">借了么后台管理系统</span>
            </div>
            <el-form :model="loginUser" @keyup.enter.native="submitForm('loginForm')" status-icon :rules="rules" ref="loginForm" class="loginForm" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginUser.username" placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginUser.password" placeholder="请输入密码" type="password" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登  录</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
import { Login } from "../api/api"

export default {
  name: "login",

  data() {
    return {
      loginUser: {
          username: "admin",
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
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    //验证通过，密码进行md5加密
                    this.loginUser.password = this.md5(this.loginUser.password);

                    Login(qs.stringify(this.loginUser)).then(res => {
                        if (res.data.code == 1){
                            this.$message({
                                message: "用户名或密码错误",
                                type: "error"
                            });
                        } else {
                            // 登陆状态记录
                            localStorage.setItem('code', this.md5((res.data.code).toString()));

                            this.$message({
                                message: "登录成功！",
                                type: "success"
                            });

                            this.$router.push("/index");
                        }
                    }).catch({});
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
    created: function(){
        // console.log(this.md5("-1"));
    },
};
</script>

<style scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../assets/images/bg.jpg) no-repeat center center;
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

.tiparea p a {
  color: #409eff;
}
</style>


