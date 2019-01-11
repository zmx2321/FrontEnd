<template>
    <section class="main_cont">
        <!-- 表单 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item label="">
                            <el-input placeholder="请输入项目标题" @keyup.enter.native="findProjectList" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addProject" v-on:click="addProjectVisible = true">添加项目</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <!-- 项目列表 -->
        <el-row>
            <el-table class="project_list" :data="project_info" border highlight-current-row v-loading="listLoading">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">更新项目</el-button>
                        <el-button type="text" size="small">编辑序号</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-col :span="24" class="toolbar f-cb">
                <el-pagination class="f-fr" layout="prev, pager, next, total"  @current-change="handleCurrentChange" :total="page_arg.total"></el-pagination>
            </el-col>
        </el-row>

        <!-- 添加新的设备 -->
        <el-dialog title="添加新的项目" @keyup.enter.native="addProjectSubmit('addProjectForm')" :close-on-click-modal="false" :visible.sync="addProjectVisible" :before-close="handleClose">

        </el-dialog>
    </section>
</template>

<script>
    import {

    } from '../../api/api.js';

    export default {
        name: 'redeem_code',

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
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示

                //分页参数
                page_arg: {
                    pagesize: "10",  // 初始一页条数
                    currentPage: "1",  // 当前第几页
                    total: 0,  // 用于table的 :total
                },

                /**
                 * 项目列表
                 */
                project_info: [],  //存放项目信息列表数据

                /**
                 * 添加项目
                 */
                //添加项目数据
                addProjectData: {
                },

                //验证添加项目界面数据
                addProjectRules: {
                },


                /**
                 *  弹出表单界面
                 */
                addProjectVisible: false,  //显示隐藏添加新的项目界面
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
            // 控制每页的数量--分页
            handleCurrentChange(val) {
                this.page_arg.currentPage = val;
                this.getProjectList();
            },

            /**
             *  api
             *  获取项目信息
             */
            getProjectList () {
                //接口参数
                // let param = {
                //     pageSize: this.page_arg.pagesize,
                //     pageNum: this.page_arg.currentPage,
                // };

                // getProjectList(JSON.stringify(param)).then(res => {
                //     // console.log(res.data.data);
                //
                //     this.page_arg.total = res.data.data.total;
                //     this.project_info = res.data.data.list;
                // }).catch({});
            },

            /**
             *  api
             *  查找单个项目
             */
            findProject () {
            },

            /**
             *  api
             *  添加项目
             */
            //点击添加项目
            addProject () {
            },

            //提交添加项目表单
            addProjectSubmit (formName) {
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
        //load
        created () {
            this.getProjectList();
        }
    }
</script>

<style scoped>

</style>