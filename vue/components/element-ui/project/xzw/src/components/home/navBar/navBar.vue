<template>
  <div class="container">

    <!-- 顶部导航栏 -->
    <el-row>
      <el-col class="navbar-row__col" :span="12">
        <div class="logo">
          <img src="../../../assets/images/logo.png" alt="">
          <span class="logo__title">Subfactor管理后台</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="regist">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              你好 , 欢迎登录!<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="onSigbOut">退出登录</el-dropdown-item>
              <el-dropdown-item @click.native="onChangePwd" v-if="isSuperAdmin">修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
  
<script>
export default {
  name: "v-navbar",
  data () {
    return {
      isSuperAdmin: null
    };
  },
  mounted() {
    this.isSuperAdmin = localStorage.isSuperAdmin
  },
  methods: {
    // 退出登录
    onSigbOut () {
      this.$emit('onSigbOut')
    },
    // 修改密码
    onChangePwd () {
      this.Bus.$emit("onChangePwd", true)
    },
  }
}
</script>
  
<style lang="scss" scoped>
.container {
  background: #444;
  padding: 0 50px;
  .el-row {
    .el-col {
      height: 60px;
      line-height: 60px;
      vertical-align: top;
      .logo {
        img {
          float: left;
          height: 60px;
          width: 60px;
        }
        &__title{
          margin-left: 10px;
          color: #999;
        }
      }
      .regist {
        text-align: right;
        .el-dropdown-link {
          cursor: pointer;
        }
      }
    }
  }
}
</style>