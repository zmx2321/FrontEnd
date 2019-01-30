<template>
    <section class="main_cont">
        <!-- 骑手管理 -->
        <el-row>
            <!--<el-col :span="24" class="title">-->
                <!--<i class="el-icon-info"></i>-->
                <!--<span>骑手管理</span>-->
            <!--</el-col>-->

            <!-- 账号列表 -->
            <el-table class="rider_list" :data="rider_info" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" height="600">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column type="index" width="35"></el-table-column>
                <el-table-column prop="id" label="id" width="60"></el-table-column>
                <el-table-column prop="createAt" label="注册时间" width="180"></el-table-column>
                <el-table-column prop="openId" label="微信标志" width="300"></el-table-column>
                <el-table-column prop="mobile" label="手机号码" width="200"></el-table-column>
                <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                <el-table-column prop="disable" label="封禁状态" width="60"></el-table-column>
                <el-table-column prop="guiNo" label="注册设备" width="120"></el-table-column>

                <el-table-column fixed="right" label="操作" width="320">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" v-on:click="viewUserForm = true" @click="viewUser">查看</el-button>
                        <el-button type="text" size="small" @click="prohibition">封禁并通知</el-button>
                        <el-button type="text" size="small" @click="lifted">解禁</el-button>
                        <el-button type="text" size="small" v-on:click="checkUserForm = true" @click="checkUser">审核</el-button>
                        <!--<el-button type="text" size="small" @click="delUser">删除</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <!-- 底部工具条 -->
            <!--<el-col :span="24" class="toolbar bottip">-->
                <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <!--</el-col>-->
        </el-row>

        <!-- 查看账号 -->
        <el-dialog title="查看账号" :close-on-click-modal="false" :visible.sync="viewUserForm">
            <!--查看骑手账号的操作记录-->
        </el-dialog>

        <!-- 审核账号 -->
        <el-dialog title="审核账号" :close-on-click-modal="false" :visible.sync="checkUserForm" :before-close="handleClose">

        </el-dialog>
    </section>
</template>

<script>
    import { getRiderList } from '../../../api/api.js';

    export default {
        name: "rider_manage",

        data() {
            return {
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示

                sels: [],  //账号列表选中列
                viewUserForm: false,  //查看账号
                checkUserForm: false,  //审核账号

                //骑手信息参数
                rider_arg: {
                    date: "2018/12/25",
                },

                //记录信息
                rider_info: [],
            }
        },
        methods: {
            //获取用户信息
            getRiderList(){
                let para = {
                    date: this.rider_arg.date,
                };

                getRiderList(qs.stringify(para)).then(res => {
                    this.rider_info = res.data.data.list;
                    // console.log(this.user_info);
                });
            },

            //关闭提示
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(_ => {});
            },

            //列表是否选中
            selsChange (sels) {
                this.sels = sels;
            },
            //查看账号
            viewUser () {
                console.log("查看账号");
            },
            //封禁并通知
            prohibition () {
                console.log("封禁并通知");
            },
            //解禁账号
            lifted () {
                console.log("解禁账号");
            },
            //审核账号
            checkUser () {
                //账号审核（未来需求）
                console.log("审核账号");
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
            batchRemove: function () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("账号批量删除");
                }).catch(() => {

                });
            },
        },
        created () {
            this.getRiderList();
        }
    }
</script>

<style scoped>
    .title{
        margin-bottom: 10px;
    }

    .rider_list{
        width: 100%;
    }
</style>