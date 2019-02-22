<template>
  <div id="login">
    <div class="container">
      <v-login class="v-login"></v-login>
    </div>
  </div>
</template>
  
<script>
import VLogin from '@/components/login/index';
import LoginModel from '@/models/login-model';
const loginModel = new LoginModel();

export default {
  name: "login",
  components: {
    "v-login": VLogin
  },
  data () {
    return {
      form: {
        username: '',
        password: '',
      },
    };
  },
  mounted () {
    localStorage.clear()
  },
}
</script>
  
<style lang="scss" scoped>
#login {
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/images/bg-image.png");
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;

  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: auto;
    background-color: rgba(119, 118, 118, 0.1);

    .v-login{
      width: 365px;
      background-color: rgba(0,0,0,0);
      position: relative;
      top: -35px;
    }
  }
}
</style>