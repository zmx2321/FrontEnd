<template>
    <!--

    记录管理
        查看所有订单数据
        使用筛选器筛选数据

        需要可以通过以下一些数据来筛选记录
            设备名称
            存件人手机号
            取件人手机号
            日期 | 默认选择今天，但可以选择其他日期（导出相关的excel文件）
                (是否可以按字段导出记录？)(是否可以将数据库服务器关联到类似Tableau的数据可视化软件？)
            时间 | 以半小时为最小调整单位
            柜号
            尾号

    记录状态
        待取
        已取出：用何种方式取出（& 被谁取出）
        可以在记录页面直接开启记录相关的柜门



    账号管理
        根据手机号查找相关用户
        骑手用户
        查看骑手账号的操作记录
        对客服认为异常的账号进行封禁，并发送通知信息给被封禁用户
        解禁账号
        账号审核（未来需求）
        用户账号会出现何种异常？有何种解决方法？
-->

    <section class="main_cont">
        <!-- 记录管理 -->
        <el-row class="toolbar bdr_radiu">
            <el-col :span="24" class="title">
                <i class="el-icon-info"></i>
                <span>记录管理</span>
            </el-col>

            <el-row :gutter="10">
                <el-col :span="6" class="title">
                    <i class="el-icon-search"></i>
                    <span>筛选条件</span>
                </el-col>
                <el-col :span="6">11</el-col>
                <el-col :span="6">11</el-col>
                <el-col :span="6">11</el-col>
                <el-col :span="6">1</el-col>
                <el-col :span="6">1</el-col>
                <el-col :span="6">1</el-col>
                <el-col :span="6">1</el-col>
            </el-row>

            <!-- 管理员列表 -->
            <el-table class="admin_list" :data="adminData" border highlight-current-row v-loading="listLoading" @selection-change="adminSelsChange" height="220">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column type="index" width="35"></el-table-column>
                <el-table-column prop="name" label="管理员名称" width="1300"></el-table-column>

                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 底部工具条 -->
            <el-col :span="24" class="toolbar bottip">
                <el-button type="danger" @click="adminBatchRemove" :disabled="this.adminSels.length===0">批量删除</el-button>
            </el-col>
        </el-row>

        <!-- 账号管理 -->
        <el-row class="toolbar bdr_radiu">
            <el-col :span="24" class="title">
                <i class="el-icon-info"></i>
                <span>账号管理</span>
            </el-col>

            <!-- 账号列表 -->
            <el-table class="user_list" :data="userData" border highlight-current-row v-loading="listLoading" @selection-change="userSelsChange" height="220">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column type="index" width="35"></el-table-column>
                <el-table-column prop="name" label="账号名称" width="1300"></el-table-column>

                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 底部工具条 -->
            <el-col :span="24" class="toolbar bottip">
                <el-button type="danger" @click="userBatchRemove" :disabled="this.userSels.length===0">批量删除</el-button>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    export default {
        name: "data_manage",

        data() {
          return {
              listLoading: false,  //lodding动画
              dialogVisible: false,  //关闭提示

              adminSels: [],  //管理员列表选中列

              userSels: [],  //角色列表选中列

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

            //管理员批量删除
            adminBatchRemove: function () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("管理员批量删除");
                }).catch(() => {

                });
            },

            //账号列表是否选中
            userSelsChange (userSels) {
                this.userSels = userSels;
            },
            //删除账号
            delUser () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("删除角色");
                }).catch(() => {

                });
            },
            //账号批量删除
            userBatchRemove: function () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("账号批量删除");
                }).catch(() => {

                });
            },
        }
    }
</script>

<style scoped>
    .title{
        margin-bottom: 10px;
    }

    .title i{
        margin-right: 10px;
    }
</style>