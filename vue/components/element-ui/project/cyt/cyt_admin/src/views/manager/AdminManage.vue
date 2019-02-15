<template>
    <section class="main_cont">
        <!-- 表单 -->
        <el-row class="toolbar bdr_radiu">
            <el-button type="primary" @click="addAdminVisible = true">添加管理员</el-button>
        </el-row>

        <el-row>
            <!-- 管理员列表 -->
            <el-table class="rider_list" :data="admin_info" border highlight-current-row v-loading="listLoading">
                <el-table-column type="index" width="60" label="序号" align="center"></el-table-column>
                <!--<el-table-column prop="id" label="id" width="60" align="center"></el-table-column>-->
                <el-table-column prop="username" label="账号" width="auto" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" width="auto" align="center"></el-table-column>

                <el-table-column label="角色" width="auto" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.role == 0 ? "超级管理员" : "管理员" }}
                    </template>
                </el-table-column>

                <el-table-column prop="mobile" label="手机" width="auto" align="center"></el-table-column>
                <!--<el-table-column prop="disable" label="封禁状态" width="auto" align="center"></el-table-column>-->

                <el-table-column label="封禁状态" width="100" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.disable === 0 ? "未封禁" : "封禁" }}
                    </template>
                </el-table-column>

                <el-table-column prop="guiAdmin" label="柜端权限" width="auto" align="center"></el-table-column>

                <el-table-column prop="createAt" label="创建时间" width="110" align="center"></el-table-column>
                <!--<el-table-column prop="guiNos" label="格口编号" width="120" align="center"></el-table-column>-->
                <el-table-column prop="weChatName" label="微信名" width="auto" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="320">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="updateAdmin(scope.row)" v-on:click="updateAdminVisible = true">编辑</el-button>
                        <el-button type="text" size="small" @click="delUser">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <!-- 添加管理员 -->
        <el-dialog title="添加管理员" @keyup.enter.native="addAdminSubmit('addAdminForm')" :close-on-click-modal="false" :visible.sync="addAdminVisible" :before-close="handleClose">
            <el-form :model="addAdminData" status-icon :rules="addAdminRules" ref="addAdminForm" label-width="120px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addAdminData.username"  placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addAdminData.name"  placeholder="请输入姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="addAdminData.mobile"  placeholder="请输入手机号" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addAdminSubmit('addAdminForm')">提交</el-button>
                    <el-button @click="resetForm('addAdminForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑管理员 -->
        <el-dialog title="编辑管理员" @keyup.enter.native="updateAdminSubmit('updateAdminForm')" :close-on-click-modal="false" :visible.sync="updateAdminVisible" :before-close="handleClose">
            <el-form :model="updateAdminData" status-icon :rules="updateAdminRules" ref="updateAdminForm" label-width="120px">
                <el-form-item label="编号" prop="id">
                    <el-input v-model="updateAdminData.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="updateAdminData.username"  placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="updateAdminData.name"  placeholder="请输入姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="updateAdminData.mobile"  placeholder="请输入手机号" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="updateAdminSubmit('updateAdminForm')">提交</el-button>
                    <el-button @click="resetForm('updateAdminForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        getAdminList,  // 获取管理员列表
        addAdmin,  // 添加管理员
        updateAdmin,  // 编辑管理员
    } from '../../api/api.js';

    export default {
        name: "admin_manage",

        data() {
            return {
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示

                // 管理员信息
                admin_info: [],

                /**
                 * 添加管理员
                 */
                // 添加管理员数据
                addAdminData: {
                    username: "",  // 用户名
                    name: "",  // 姓名
                    mobile: "",  // 手机号
                },

                // 验证添加管理员界面数据
                addAdminRules: {
                    username: [
                        { required: true, message: '用户名不能为空！', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '姓名不能为空！', trigger: 'blur' },
                    ],
                    mobile: [
                        { required: true, message: '手机号不能为空！', trigger: 'blur' },
                    ],
                },

                /**
                 * 编辑管理员
                 */
                // 编辑管理员数据
                updateAdminData: {
                    id: "",  // id
                    username: "",  // 用户名
                    name: "",  // 姓名
                    mobile: "",  // 手机号
                },

                // 验证编辑管理员界面数据
                updateAdminRules: {
                    username: [
                        { required: true, message: '用户名不能为空！', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '姓名不能为空！', trigger: 'blur' },
                    ],
                    mobile: [
                        { required: true, message: '手机号不能为空！', trigger: 'blur' },
                    ],
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addAdminVisible: false,  // 添加新的管理员界面
                updateAdminVisible: false,  // 编辑管理员界面
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
                    .catch(() => {});
            },

            /**
             * api
             * 获取管理员信息
             */
            getAdminList(){
                getAdminList().then(res => {
                    this.admin_info = res.data.data;
                    console.log(res);
                });
            },

            /**
             * api
             * 添加管理员
             */
            // 提交添加管理员表单
            addAdminSubmit (formName) {
                this.listLoading = true;  //点击提交开始加载loading

                //验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        addAdmin(qs.stringify(this.addAdminData)).then(() => {
                            this.$message({
                                message: "添加成功！",
                                type: "success"
                            });

                            // 隐藏添加banner信息界面
                            this.addAdminVisible = false;

                            // 请求成功停止加载loading
                            this.listLoading = false;

                            // 刷新列表数据
                            this.getAdminList();
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                    }
                });
            },

            /**
             * api
             * 编辑管理员
             */
            // 编辑管理员(浅拷贝列表数据到表单)
            updateAdmin (row) {
                this.updateAdminData = Object.assign({}, row);
            },

            // 提交编辑管理员表单
            updateAdminSubmit (formName) {
                this.listLoading = true;  //点击提交开始加载loading

                //验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        let params = {
                            adminId: this.updateAdminData.id,
                            username: this.updateAdminData.username,
                            name: this.updateAdminData.name,
                            mobile: this.updateAdminData.mobile,
                        };

                        updateAdmin(qs.stringify(params)).then(() => {
                            this.$message({
                                message: "编辑成功！",
                                type: "success"
                            });

                            // 隐藏添加banner信息界面
                            this.updateAdminVisible = false;

                            // 请求成功停止加载loading
                            this.listLoading = false;

                            // 刷新列表数据
                            this.getAdminList();
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                    }
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