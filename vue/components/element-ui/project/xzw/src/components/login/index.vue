<template>
  <div class="container"
       @keyup.enter="onLogin">
    <div class="logo">
      <img class="logo-img"
           src="./images/logo.png"
           alt="">
      <span>禧智屋</span>
    </div>
    <!-- <div class="tip">XZW Backstage 管理平台</div> -->
    <el-input v-model="form.username"
              type="text"
              prefix-icon="iconfont icon-yonghu"
              placeholder="请输入您的账号"></el-input>
    <el-input v-model="form.password"
              type="password"
              prefix-icon="iconfont icon-mima"
              placeholder="请输入您的密码"></el-input>
    <el-button type="primary"
               @click="onLogin">立即登录</el-button>
  </div>
</template>
  
<script>
import LoginModel from '@/models/login-model';
const loginModel = new LoginModel();

export default {
  name: "v-login",
  data () {
    return {
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    // 点击登录
    onLogin (params) {
      if (this._checkForm(this.form)) {
        loginModel.login({
          username: this.form.username,
          password: this.$utils.md5(this.form.password)
        }).then((res) => { // 验证成功
          let id = res.data.id
          let roleId = res.data.roleId
          let username = res.data.username
          let menuIds = res.data.adminRole.ids

          localStorage.id = id
          localStorage.roleId = roleId
          localStorage.username = username

          localStorage.menuIds = JSON.stringify(menuIds)

          this.$router.push('/home')
        }).catch((err) => { // 验证失败
          this.$message(err.msg)
        })
      }
    },
    // 账号密码校验是否输入
    _checkForm (object) {
      for (const key in object) {
        if (object[key] === '') {
          this.$message('请输入完整账号密码后，重新登录！')
          return false
        }
      }
      return true
    }
  }
}
</script>
  
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .logo {
    height: 65px;
    line-height: 65px;
    font-size: 33px;
    color: rgba(0, 0, 0, 0.85);
    box-sizing: border-box;
    font-weight: bold;

    display: flex;
    align-items: center;

    .logo-img {
      margin-right: 5px;
      width: 42px;
    }
  }

  .tip {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 12px;
    margin-bottom: 40px;
  }

  .el-input{
    margin-bottom: 20px;

    &:last-of-type{
      margin-bottom: 40px;
    }
  }

  .el-button{
    width: 100%;
  }
}
</style>