<template>
    <section class="main_cont">
        <!-- 骑手管理 -->
        <el-row>
            <!--<el-col :span="24" class="title">-->
            <!--<i class="el-icon-info"></i>-->
            <!--<span>骑手管理</span>-->
            <!--</el-col>-->

            <!-- 管理员列表 -->
            <el-table class="rider_list" :data="admin_info" border highlight-current-row v-loading="listLoading">
                <el-table-column type="index" width="35"></el-table-column>
                <el-table-column prop="id" label="id" width="60"></el-table-column>
                <el-table-column prop="username" label="账号" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="300"></el-table-column>
                <el-table-column prop="role" label="角色" width="200"></el-table-column>
                <el-table-column prop="mobile" label="手机" width="100"></el-table-column>
                <el-table-column prop="disable" label="封禁状态" width="60"></el-table-column>
                <el-table-column prop="guiAdmin" label="是否能进入柜端后台" width="120"></el-table-column>
                <el-table-column prop="createAt" label="创建时间" width="120"></el-table-column>
                <el-table-column prop="guiNos" label="格口编号" width="120"></el-table-column>
                <el-table-column prop="weChatName" label="微信名" width="120"></el-table-column>

                <el-table-column fixed="right" label="操作" width="320">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small" @click="delUser">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 底部工具条 -->
            <!--<el-col :span="24" class="toolbar bottip">-->
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <!--</el-col>-->
        </el-row>

        <!-- 查看账号 -->
        <!--<el-dialog title="查看账号" :close-on-click-modal="false" :visible.sync="viewUserForm">
            &lt;!&ndash;查看骑手账号的操作记录&ndash;&gt;
        </el-dialog>-->
    </section>
</template>

<script>
    import {
        getAdminList,  //获取管理员列表
    } from '../../api/api.js';

    export default {
        name: "admin_manage",

        data() {
            return {
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示

                // 管理员信息
                admin_info: [],
            }
        },
        methods: {
            /**
             * common
             */
            // 关闭提示
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(_ => {});
            },

            // 获取用户信息
            getAdminList(){
                getAdminList().then(res => {
                    this.admin_info = res.data.data;
                    console.log(res);
                });
            },

            // 删除设备
            delUser () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("删除设备");
                }).catch(err => {
                    throw err;
                });
            },
        },
        created () {
            this.getAdminList();
        }
    }
</script>

<style scoped>
    .rider_list{
        width: 100%;
    }
</style>