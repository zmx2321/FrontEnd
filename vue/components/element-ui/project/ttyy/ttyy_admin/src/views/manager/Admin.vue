<template>
    <section class="main_cont">
        <!-- 表单 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item>
                            <el-button type="primary" @click="addUser" v-on:click="addUserVisible = true">添加用户</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <!-- 用户列表 -->
        <el-row>
            <el-table class="user_list" :data="user_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 240px)">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <el-table-column prop="id" label="用户id" width="80" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="用户昵称" width="100" align="center"></el-table-column>
                <el-table-column label="用户角色" width="100" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.isSuperAdmin === 0 ? "超级管理员" : "普通员工" }}
                    </template>
                </el-table-column>

                <el-table-column prop="createAt" label="创建时间" width="200" align="center"></el-table-column>
                <el-table-column prop="updateAt" label="更新时间" width="auto"></el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small">删除</el-button>
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

        <!-- 添加用户 -->
        <el-dialog title="添加用户" @keyup.enter.native="addUserSubmit('addUserForm')" :close-on-click-modal="false" :visible.sync="addUserVisible" :before-close="handleClose">
            <el-form :model="addUserData" status-icon :rules="addUserRules" ref="addUserForm" label-width="100px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addUserData.name"  placeholder="请输入姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addUserData.username"  placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="addUserData.password" placeholder="请输入密码" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addUserSubmit('addUserForm')">提交</el-button>
                    <el-button @click="resetForm('addUserForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        findAccountList,  // 获取管理员和员工列表
    } from '../../api/api.js';

    export default {
        name: 'admin',

        data() {
            //项目类型验证
            // let validateType = (rule, value, callback) => {
            //     let reg = /^[0-2]$/;
            //
            //     if (!reg.test(value)) {
            //         return callback(new Error('项目类型只能输入0-2！'));
            //     }
            //
            //     callback();
            // };

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
                 * 用户列表
                 */
                user_info: [],  // 存放用户信息列表数据

                /**
                 * 添加用户
                 */
                // 添加用户数据
                addUserData: {
                    name: "",  // 姓名
                    username: "",  // 用户名
                    password: "",  // 密码
                },

                // 验证添加用户界面数据
                addUserRules: {
                    name: [
                        { required: true, message: '姓名不能为空！', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '用户名不能为空！', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空！', trigger: 'blur' }
                    ]
                },

                /**
                 *  弹出表单界面
                 */
                addUserVisible: false,  // 显示隐藏添加新的项目界面
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
                this.getUserList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getUserList();  // 加载分页数据
            },

            /**
             *  api
             *  获取用户信息
             */
            getUserList () {
                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                };

                findAccountList(param).then(res => {
                    console.log(res.data.data);

                    this.user_info = res.data.data.list;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;
                }).catch({});
            },

            /**
             *  api
             *  添加用户
             */
            // 点击添加项目
            addUser () {
                console.log("添加用户");
            },

            // 提交添加用户表单
            addUserSubmit (formName) {
                this.listLoading = true;  //点击提交开始加载loading

                //验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        // addProject(qs.stringify(this.addProjectData)).then(() => {
                        //     this.$message({
                        //         message: "添加成功！",
                        //         type: "success"
                        //     });
                        //
                        //     this.addProjectVisible = false;  //隐藏编辑位置信息界面
                        //     this.listLoading = false;  //请求成功停止加载loading
                        //     this.getProjectList();  //刷新列表数据
                        // }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        // 预处理
        created () {
            this.getUserList();
        }
    }
</script>

<style scoped>
    .toolbar {
        padding-bottom: 0;
    }
</style>