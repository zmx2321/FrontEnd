<template>
    <section>
        <!-- 管理员 -->
        <el-row class="toolbar bdr_radiu">
            <el-col :span="24" class="title">
                <i class="el-icon-info"></i>
                <span>管理员设置</span>
            </el-col>

            <!-- 添加管理员 -->
            <el-col :span="22" class="btn_wrap">
                <el-button type="primary" @click="addAdmin" v-on:click="addAdminForm = true">添加管理员</el-button>
            </el-col>

            <!-- 管理员列表 -->
            <el-table class="admin_list" :data="adminData" border highlight-current-row v-loading="listLoading" @selection-change="adminSelsChange" height="220">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column type="index" width="35"></el-table-column>
                <el-table-column prop="name" label="管理员名称" width="1300"></el-table-column>

                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button @click="fixAdmin" v-on:click="fixAdminForm = true" type="text" size="small">修改</el-button>
                        <el-button @click="delAdmin" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 底部工具条 -->
            <el-col :span="24" class="toolbar bottip">
                <el-button type="danger" @click="adminBatchRemove" :disabled="this.adminSels.length===0">批量删除</el-button>
            </el-col>
        </el-row>

        <!-- 角色 -->
        <el-row class="toolbar bdr_radiu">
            <el-col :span="24" class="title">
                <i class="el-icon-info"></i>
                <span>角色设置</span>
            </el-col>

            <!-- 添加角色 -->
            <el-col :span="22" class="btn_wrap">
                <el-button type="primary" @click="addUser" v-on:click="addUserForm = true">添加角色</el-button>
            </el-col>

            <!-- 角色列表 -->
            <el-table class="user_list" :data="userData" border highlight-current-row v-loading="listLoading" @selection-change="userSelsChange" height="220">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column type="index" width="35"></el-table-column>
                <el-table-column prop="name" label="角色名称" width="900"></el-table-column>

                <el-table-column fixed="right" label="操作" width="600">
                    <template slot-scope="scope">
                        <el-button @click="editUserPower" v-on:click="editUserPowerForm = true" type="text" size="small">编辑角色权限</el-button>
                        <el-button @click="addChildAdmin" v-on:click="addChildAdminForm = true" type="text" size="small">添加子管理员</el-button>
                        <el-button @click="powerManage" v-on:click="powerManageForm = true" type="text" size="small">权限管理</el-button>
                        <el-button @click="delUser" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 底部工具条 -->
            <el-col :span="24" class="toolbar bottip">
                <el-button type="danger" @click="userBatchRemove" :disabled="this.userSels.length===0">批量删除</el-button>
            </el-col>
        </el-row>

        <!-- 添加管理员 -->
        <el-dialog title="添加管理员" :close-on-click-modal="false" :visible.sync="addAdminForm" :before-close="handleClose">
            <!--姓名、账号、密码、网点等-->
        </el-dialog>

        <!-- 修改管理员 -->
        <el-dialog title="修改管理员" :close-on-click-modal="false" :visible.sync="fixAdminForm" :before-close="handleClose">
            <!--姓名、账号、密码、网点等-->
        </el-dialog>

        <!-- 添加角色 -->
        <el-dialog title="添加角色" :close-on-click-modal="false" :visible.sync="addUserForm" :before-close="handleClose">

        </el-dialog>

        <!-- 编辑角色权限 -->
        <el-dialog title="编辑角色权限" :close-on-click-modal="false" :visible.sync="editUserPowerForm" :before-close="handleClose">

        </el-dialog>

        <!-- 添加子管理员 -->
        <el-dialog title="添加子管理员" :close-on-click-modal="false" :visible.sync="addChildAdminForm" :before-close="handleClose">

        </el-dialog>

        <!-- 权限管理(以角色为单位的权限管理) -->
        <el-dialog title="权限管理" :close-on-click-modal="false" :visible.sync="powerManageForm" :before-close="handleClose">
            <!--以角色为单位的权限管理-->
        </el-dialog>
    </section>
</template>

<script>
    export default {
        name: "account_manage",

        data() {
          return {
              listLoading: false,  //lodding动画
              dialogVisible: false,  //关闭提示

              adminSels: [],  //管理员列表选中列
              addAdminForm: false,  //添加管理员
              fixAdminForm: false,  //修改管理员

              userSels: [],  //角色列表选中列
              addUserForm: false,  //添加角色
              editUserPowerForm: false,  //编辑角色权限
              addChildAdminForm: false,  //添加子管理员
              powerManageForm: false,  //权限管理

              //数据
              adminData: [{
                  date: '2016-05-02',
                  name: '管理员1',
                  address: '上海市普陀区金沙江路 1518 弄'
              }, {
                  date: '2016-05-04',
                  name: '管理员2',
                  address: '上海市普陀区金沙江路 1517 弄'
              }, {
                  date: '2016-05-01',
                  name: '管理员3',
                  address: '上海市普陀区金沙江路 1519 弄'
              }, {
                  date: '2016-05-03',
                  name: '管理员4',
                  address: '上海市普陀区金沙江路 1516 弄'
              }],

              userData: [{
                  date: '2016-05-02',
                  name: '用户1',
                  address: '上海市普陀区金沙江路 1518 弄'
              }, {
                  date: '2016-05-04',
                  name: '用户2',
                  address: '上海市普陀区金沙江路 1517 弄'
              }, {
                  date: '2016-05-01',
                  name: '用户3',
                  address: '上海市普陀区金沙江路 1519 弄'
              }, {
                  date: '2016-05-03',
                  name: '用户4',
                  address: '上海市普陀区金沙江路 1516 弄'
              }],
          }
        },
        methods: {
            //关闭提示
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },

            //管理员列表是否选中
            adminSelsChange (adminSels) {
                this.adminSels = adminSels;
            },
            //添加管理员
            addAdmin () {
                console.log("添加管理员");
            },
            //修改管理员
            fixAdmin () {
                console.log("修改管理员");
            },
            //删除管理员
            delAdmin () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("删除管理员");
                }).catch(() => {

                });
            },
            //管理员批量删除
            adminBatchRemove: function () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("管理员批量删除");
                }).catch(() => {

                });
            },

            //角色列表是否选中
            userSelsChange (userSels) {
                this.userSels = userSels;
            },
            //添加角色
            addUser () {
                console.log("添加角色");
            },
            //编辑角色权限
            editUserPower () {
                console.log("编辑角色权限");
            },
            //添加子管理员
            addChildAdmin () {
                console.log("添加子管理员");
            },
            //权限管理
            powerManage () {
                console.log("权限管理");
            },
            //删除角色
            delUser () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("删除角色");
                }).catch(() => {

                });
            },
            //角色批量删除
            userBatchRemove: function () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("角色批量删除");
                }).catch(() => {

                });
            },
        }
    }
</script>

<style scoped>


    .btn_wrap{
        margin: 15px 0;
    }
</style>