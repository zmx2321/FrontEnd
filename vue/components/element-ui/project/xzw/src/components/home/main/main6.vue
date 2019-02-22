<template>
  <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">

      <el-tab-pane label="用户管理" name="first">

        <!-- 搜索板块 -->
        <el-row class="search-block">
          <el-col :span="24">
            <el-form :model="form" label-width="80px" size="small" :inline="true">
              <el-form-item label="用户名">
                <el-input v-model="form.userName" placeholder="请输入用户名" clearable></el-input>
              </el-form-item>
              <el-form-item label="员工姓名">
                <el-input v-model="form.realname" placeholder="请输入员工姓名" clearable></el-input>
              </el-form-item>
              <el-form-item label="权限角色">
                <el-select v-model="form.roleId" placeholder="选择角色" clearable>
                  <el-option v-for="item in roleOptions" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="margin-left: 12px;">
                <el-button type="primary" @click="onSearch">点击搜索</el-button>
                <el-button type="primary" size="small" @click="onAddUesr">新增用户</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <!-- 表格板块 -->
        <el-row class="table-block">
          <el-col :span="24">
            <el-table :data="tableData" border :header-cell-style="tableStyle" :cell-style="tableStyle" size="medium" style="width: 100%">
              <el-table-column label="用户名" prop="username"></el-table-column>
              <el-table-column label="姓名" prop="realname"></el-table-column>
              <el-table-column label="电话" prop="phone"></el-table-column>
              <el-table-column label="角色" prop="roleName"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

        <!-- 分页板块 -->
        <el-row class="pagination-block">
          <el-col :span="24">
            <el-pagination :total="total" :current-page.sync="pageNum" :page-size.sync="pageSize" @current-change="onCurrentChange" layout="prev, pager, next" background></el-pagination>
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- 角色页面 -->
      <el-tab-pane label="权限管理" name="second">
        <!-- 搜索板块 -->
        <el-row class="search-block">
          <el-col :span="24">
            <el-form :model="roleSearchForm" label-width="80px" size="small" :inline="true">
              <el-form-item label="角色名">
                <el-input v-model="roleSearchForm.roleName" placeholder="请输入角色名" clearable></el-input>
              </el-form-item>
              <el-form-item style="margin-left: 12px;">
                <el-button type="primary" @click="onSearchRole">点击搜索</el-button>
                <el-button type="primary" size="small" @click="onAddRole">新增角色</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <!-- 表格板块 -->
        <el-row class="table-block">
          <el-col :span="24">
            <el-table :data="roleTableData" border :header-cell-style="tableStyle" :cell-style="tableStyle" size="medium" max-height="520" style="width: 100%">
              <el-table-column label="角色名" prop="roleName"></el-table-column>
              <el-table-column label="权限" prop="adminMenuList">
                <template slot-scope="scope">
                  <span v-for="item in (scope.row.adminMenuList)" :key="item.id">
                    {{ item.menuName + ' '}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="roleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" type="primary" @click="roleDelete(scope.$index, scope.row)">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

        <!-- 分页板块 -->
        <el-row class="pagination-block">
          <el-col :span="24">
            <!-- <el-pagination :total="total"
                           :current-page.sync="pageNum"
                           :page-size.sync="pageSize"
                           @current-change="onCurrentChange"
                           layout="prev, pager, next"
                           background></el-pagination> -->
          </el-col>
        </el-row>

      </el-tab-pane>

    </el-tabs>

    <!-- 用户弹窗板块 -->
    <el-row>
      <el-col :span="24">
        <el-dialog :title="userDialogTitle" :visible.sync="isShowDialog">
          <div class="content">
            <!-- <img src="" alt=""> -->
            <el-form ref="form" :model="userForm" label-width="90px" label-position="left">
              <el-form-item label="姓名" required>
                <el-input v-model="userForm.realname" placeholder="请输入用户真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="电话" required>
                <el-input v-model="userForm.phone" placeholder="请输入联系电话"></el-input>
              </el-form-item>
              <el-form-item label="用户名" required>
                <el-input v-model="userForm.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="userForm.password" placeholder="新增用户密码必填，更新用户选填"></el-input>
              </el-form-item>
              <el-form-item label="角色" required>
                <el-select v-model="userForm.roleId" placeholder="选择角色">
                  <el-option v-for="item in roleOptions" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onSure">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>

    <!-- 权限弹窗板块 -->
    <el-row>
      <el-col :span="24">
        <el-dialog :title="roleDialogTitle" :visible.sync="isShowRoleDialog">
          <div class="content">
            <el-form ref="form" :model="roleForm" label-width="90px" label-position="left">
              <el-form-item label="角色名" required>
                <el-input v-model="roleForm.roleName" placeholder="请输入角色名称"></el-input>
              </el-form-item>
              <el-form-item label="权限" required>
                <el-checkbox-group v-model="roleCheckList">
                  <el-checkbox v-for="item in roleCheckOptions" :checked="item.checked" :label="item.id" :key="item.id">{{item.menuName}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer">
            <el-button @click="onRoleCancel">取 消</el-button>
            <el-button type="primary" @click="onRoleSure">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>
  
<script>
import { publicMixin } from '@/mixins/public-mixin.js';
import UserModel from '@/models/user-model.js';
const userModel = new UserModel();

export default {
  name: "main6",
  mixins: [publicMixin],
  data () {
    return {
      activeName: 'first', //选项卡默认
      userDialogTitle: '新增用户', //用户弹窗标题

      isShowDialog: false,
      isAddUser: false,

      form: { //搜索数据
        userName: '',
        realname: '',
        roleId: '',
      },


      userForm: { //更新用户数据
        realname: '',
        phone: '',
        username: '',
        password: '',
        roleId: '',
        userId: '',
      },
      roleOptions: [], //角色数据

      tableData: [], //用户表格
      tableStyle: { //表格样式
        'text-align': 'center'
      },

      // *******************************************************

      roleSearchForm: { //角色搜索
        roleName: '',
      },
      roleForm: { //角色弹窗项
        id: '',
        ids: [],
        roleName: '',
      },

      roleCheckList: [],
      roleCheckOptions: [], //所有权限的菜单项


      roleTableData: [],
      roleDialogTitle: '新增角色',
      isShowRoleDialog: false,

      isAddRole: false, //是否新增角色

    };
  },
  watch: {
    roleCheckOptions: function (newValue, oldValue) {
      let arr = []
      if (oldValue.length !== 0) {
        (this.roleCheckOptions).forEach(element => {
          if (element.checked) {
            arr.push(element.id)
          }
        });
        this.roleCheckList = arr
      } else {
        this.roleCheckList = []
      }

    }
  },
  mounted () {
    this.getUserData()
    this.getRoleData()
  },
  methods: {
    // 获取用户数据
    getUserData (params = { pageSize: this.pageSize, pageNum: this.pageNum }) {
      userModel.getAllUser(params).then((result) => {
        const data = result.data
        this.total = data.total
        this.tableData = data.list
      }).catch((err) => {
        this.$message(err.msg)
      });
    },

    // 获取角色数据
    getRoleData (params = { pageSize: 1000, pageNum: this.pageNum }) {
      userModel.getAllRole(params).then((result) => {
        const data = result.data
        this.roleOptions = data.list
        this.roleTableData = data.list
      }).catch((err) => {

      });
    },

    // 获取所有菜单项
    getMenuData () {
      userModel.getAllMenu({
        pageNum: 1,
        pageSize: 1000,
      }).then((result) => {
        const data = result.data.list
        this.roleCheckOptions = data
      }).catch((err) => {

      });
    },


    // ******************************************

    // 用户搜索
    onSearch () {
      this.pageNum = 1
      this._dealSearchData(this.form)
    },

    // 新增用户
    onAddUesr () {
      this.isAddUser = true
      this.userDialogTitle = '新增用户'
      this.isShowDialog = true
      this._clearUserInfo(this.userForm)
    },

    // 编辑用户
    handleEdit (index, rows) {
      this.userDialogTitle = '编辑用户'
      this.isAddUser = false
      this._clearUserInfo(this.userForm)

      const id = rows.id
      userModel.getOneUser({ id }).then((result) => {
        const data = result.data
        this.userForm.realname = data.realname
        this.userForm.phone = data.phone
        this.userForm.username = data.username
        this.userForm.roleId = data.roleId
        this.userForm.userId = data.id

        this.isShowDialog = true
      }).catch((err) => {
        this.$message(err.msg)
      });
    },

    // 删除用户
    handleDelete (index, rows) {
      const id = rows.id
      userModel.deleteOneUser({ id }).then((result) => {
        this.$message('删除成功！')
        this.getUserData()
      }).catch((err) => {

      });
    },

    // 关闭弹窗
    onCancel () {
      this.isShowDialog = false
    },

    // 确定弹窗--用户修改确定
    onSure () {

      if (this.isAddUser) { // 新增用户
        let params = Object.assign({}, this.userForm)
        delete params.userId

        if (this._hasNull(params)) {
          params.password = this.$utils.md5(params.password)
        }

        userModel.addOneUser(params).then((result) => {
          this.isShowDialog = false
          this.$message('新增用户成功！')
          this.getUserData()
        }).catch((err) => {
          this.$message(err.msg)
        });
      }


      if (!this.isAddUser) { // 更新用户
        let params = Object.assign({}, this.userForm)

        if (params.password == '') {
          delete params.password
        }

        userModel.updateOneUser(params).then((result) => {
          this.isShowDialog = false
          this.$message('更新成功！')
          this.getUserData()
        }).catch((err) => {
          this.$message(err.msg)
        });

      }


    },

    // 翻页
    onCurrentChange (value) {
      this.pageNum = value
      this._dealSearchData(this.form)
    },

    // 处理翻页和搜索
    _dealSearchData (params, value) {
      const form = this._dealSearchList(params)
      const newForm = Object.assign(form, { pageSize: this.pageSize, pageNum: this.pageNum })

      this.getUserData(newForm)

    },

    // 更新员工数据校验
    _checkUpdataUser (params) {
      let obj = params

      if (obj.password == '') {
        delete obj.password
      }

      if (this._hasNull(obj)) {
        return obj
      } else {
        return false
      }

    },

    // 清空弹窗数据
    _clearUserInfo (object) {
      for (let key in object) {
        object[key] = ''
      }
    },

    handleClick (tab, event) { },

    // ********************************** 权限管理 *************************************

    // 搜索角色
    onSearchRole () {
      this.pageNum = 1
      this.getRoleData({
        roleName: this.roleSearchForm.roleName,
        pageSize: 1000,
        pageNum: 1
      })
    },

    // 新增角色
    onAddRole () {
      this.isShowRoleDialog = true
      this.roleDialogTitle = '新增角色'

      this.getMenuData()


    },

    // 重置弹窗
    resetRoleForm () {
      this.roleForm.id = ''
      this.roleForm.roleName = ''
      this.roleCheckList = []
    },

    // TODO:编辑角色
    roleEdit (index, row) {

      const id = row.id
      this.roleForm.id = id
      this.roleDialogTitle = '编辑'
      this.isShowRoleDialog = true

      userModel.getOneRole({ id }).then((result) => {
        const data = result.data
        this.roleForm.roleName = data.roleName
        this.roleCheckOptions = data.adminMenuVoList
      }).catch((err) => {
        console.log(err);
      });
    },

    // 角色弹窗取消
    onRoleCancel () {
      this.isShowRoleDialog = false
      this.resetRoleForm()
    },

    // 角色弹窗确定
    onRoleSure () {
      this.isShowRoleDialog = false

      if (this.roleDialogTitle == '新增角色') {
        userModel.addOneRole({
          roleName: this.roleForm.roleName,
          ids: this.roleCheckList,
        }).then((result) => {
          this.$message('新增角色成功')
          this.getRoleData()
          this.resetRoleForm()
        }).catch((err) => {
          this.$message(err.msg)
        });
      }

      if (this.roleDialogTitle == '编辑') {
        userModel.changeOneRole({
          id: this.roleForm.id,
          roleName: this.roleForm.roleName,
          ids: this.roleCheckList,
        }).then((result) => {
          this.$message('修改角色成功')
          this.getRoleData()
          this.resetRoleForm()
        }).catch((err) => {
          this.$message(err.msg)
        });
      }
    },

    // 删除角色
    roleDelete (index, row) {
      const id = row.id
      userModel.deleteOneRole({ id }).then((result) => {
        this.$message('删除角色成功！')
        this.getRoleData()
      }).catch((err) => {
        this.$message(err.msg)
      });
    },
  }
}
</script>
  
<style lang="scss" scoped>
.container {
  .search-block {
    padding: 30px 20px 10px 0;
    box-sizing: border-box;
    background: #fff;
    margin-bottom: 20px;
  }
  .pagination-block {
    padding-top: 40px;
    padding-bottom: 20px;
    text-align: center;
  }
}
</style>