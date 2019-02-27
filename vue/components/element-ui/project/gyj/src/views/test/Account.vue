<template>
    <section class="main_cont">
        <!-- 按钮 -->
        <el-row>
            <el-col class="toolbar bdr_radiu" :span="24">
                <el-col :span="22">
                    <el-button type="primary" @click="addAccountVisible = true">添加员工账号</el-button>
                </el-col>
            </el-col>
        </el-row>

        <!-- 员工账号列表 -->
        <el-row>
            <el-table class="Account_list" :data="Account_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 240px)">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <el-table-column prop="id" label="账号id" width="80" align="center"></el-table-column>
                <el-table-column prop="username" label="昵称" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="账号昵称" width="100" align="center"></el-table-column>
                <el-table-column label="账号角色" width="100" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.isSuperAdmin === 0 ? "超级管理员" : "普通员工" }}
                    </template>
                </el-table-column>

                <el-table-column prop="createAt" label="创建时间" width="200" align="center"></el-table-column>
                <el-table-column prop="updateAt" label="更新时间" width="auto"></el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="delAccount(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-col :span="24" class="toolbar f-cb">
                <el-pagination class="f-fr pagination"
                   :current-page.sync='page_arg.page_index'
                   :page-sizes="page_arg.page_sizes"
                   :page-size="page_arg.page_size"
                   :layout="page_arg.layout"
                   :total="page_arg.total"
                   @current-change='handleCurrentChange'
                   @size-change='handleSizeChange'>
                </el-pagination>
            </el-col>
        </el-row>

        <!-- 添加员工账号 -->
        <el-dialog title="添加员工账号" @keyup.enter.native="addAccountSubmit('addAccountForm')" :close-on-click-modal="false" :visible.sync="addAccountVisible" :before-close="handleClose">
            <el-form :model="addAccountData" status-icon :rules="addAccountRules" ref="addAccountForm" label-width="100px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addAccountData.name"  placeholder="请输入姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="username">
                    <el-input v-model="addAccountData.username"  placeholder="请输入昵称" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="addAccountData.password" placeholder="请输入密码" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addAccountSubmit('addAccountForm')">提交</el-button>
                    <el-button @click="resetForm('addAccountForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        findAccountList,  // 获取管理员和员工列表
        addAccount,  // 添加员工
        delAccount  // 删除员工
    } from '../../api/api.js';

    export default {
        name: 'admin',

        data() {
            return {
                /**
                 * common
                 */
                listLoading: false,  // lodding动画
                dialogVisible: false,  // 关闭提示

                // 分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 10, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                /**
                 * 员工账号列表
                 */
                Account_info: [],  // 存放员工账号信息列表数据

                /**
                 * 添加员工账号
                 */
                // 添加员工账号数据
                addAccountData: {
                    name: "",  // 姓名
                    username: "",  // 昵称
                    password: "",  // 密码
                },

                // 验证添加员工账号界面数据
                addAccountRules: {
                    name: [
                        { required: true, message: '姓名不能为空！', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '昵称不能为空！', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空！', trigger: 'blur' }
                    ]
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addAccountVisible: false,  // 添加添加员工账号界面
            }
        },
        methods: {
            /**
             * common
             */
            //关闭提示
            handleClose(done) {
                this.$confirm('确认关闭？').then(() => {
                    done();
                }).catch(err => {
                    throw err;
                });
            },
            //表单重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getAccountList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getAccountList();  // 加载分页数据
            },

            /**
             *  api
             *  获取员工账号信息
             */
            getAccountList () {
                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                };

                findAccountList(qs.stringify(param)).then(res => {
                    // console.log(res.data.data);

                    this.Account_info = res.data.data.list;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;
                }).catch({});
            },

            /**
             *  api
             *  添加员工账号
             */
            // 提交添加员工账号表单
            addAccountSubmit (formName) {
                // 点击提交开始加载loading
                this.listLoading = true;

                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //验证通过，密码进行md5加密
                    this.addAccountData.password = this.md5(this.addAccountData.password);

                    //如果验证成功，请求接口数据
                    if (valid) {
                        addAccount(qs.stringify(this.addAccountData)).then(res => {
                            // console.log(res.data);

                            this.$message({
                                message: res.data.msg,
                                type: "success"
                            });

                            // 隐藏添加员工账号界面
                            this.addAccountVisible = false;

                            // 请求成功停止加载loading
                            this.listLoading = false;

                            // 刷新列表数据
                            this.getAccountList();
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /**
             *  api
             *  删除账号
             */
            delAccount (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let id = Object.assign({}, row).id;

                    sessionStorage.setItem('params', id);

                    delAccount().then(() => {
                        this.$message({
                            message: "删除成功！",
                            type: "success"
                        });

                        sessionStorage.removeItem("params");

                        // 刷新列表数据
                        this.getAccountList();
                    }).catch({});
                }).catch(() => {});
            },
        },
        // 预处理
        created () {
            // 获取列表数据
            this.getAccountList();
        }
    }
</script>

<style scoped>

</style>