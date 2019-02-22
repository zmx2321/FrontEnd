<template>
  <div class="container">
    <!-- 登录改密 -->
    <el-dropdown class="el-dropdown" @command="handleCommand">
      <span class="el-dropdown-link">
        {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="b"><i class="el-icon-setting"></i> 修改密码</el-dropdown-item>
        <el-dropdown-item command="a" divided><i class="el-icon-more"></i> 退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- 弹框 -->

        <el-dialog title="修改密码"
                   :visible.sync="dialogVisible"
                   width="30%">
          <div class="content">
            <el-row>
              <el-col :span="24">
                <el-input v-model="password"
                          placeholder="请输入您的新密码"
                          type="password"></el-input>
              </el-col>
            </el-row>
          </div>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary"
                       @click="onConfirm">确 定</el-button>
          </div>
        </el-dialog>

  </div>
</template>
  
<script>
import Slide from '@/models/slideBar-model';
const slideModel = new Slide()

export default {
  name: "v-slidebar",
  data () {
    return {
      dialogVisible: false, //弹窗控制
      password: '', // 密码
      username: '',
    };
  },
  created() {
    this.username = localStorage.username
  },
  methods: {
    handleCommand(command) {
      if(command == 'a'){
        this.onLoginOut()
      }

      if(command == 'b'){
        this.dialogVisible = true
      }
    },
    // 退出登录
    onLoginOut () {
      slideModel.loginOut().then((result) => {
        localStorage.clear() //清空储存数据
        this.$router.push('/login')
      }).catch((err) => {
        this.$message(err.msg)
      });
    },


    // 弹窗--取消
    onCancel () {
      this.dialogVisible = false
    },

    // 弹窗--确定
    onConfirm () {
      if (!slideModel._checkPassword(this.password)) { //密码修改有误
        this.$message('请输入正确密码！')
        return
      }

      slideModel.changePassword({
        id: localStorage.id,
        roleId: localStorage.roleId,
        userName: localStorage.userName,
        password: this.$utils.md5(this.password)
      }).then((result) => {
        this.$message('密码修改成功！')
        this.dialogVisible = false
        this.password = ''
      }).catch((err) => {
        this.$message(err.msg)
        this.dialogVisible = false
        this.password = ''
      });
    }
  }
}
</script>
  
<style lang="scss" scoped>
.container{
  width: 100%;
  height: 65px;
  line-height: 65px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background: #fff;
  padding: 0 30px;
  box-sizing: border-box;


  .el-dropdown{
    .el-dropdown-link{
      display: inline-block;
    }
    float: right;
    cursor: pointer;
    padding: 0 10px;
    transition: all .3s;
    color: rgba(0, 0, 0, 0.65);

    &:hover{
      background: #f8f8f8;
    }
  }
}
</style>