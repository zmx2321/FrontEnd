<template>
    <section class="main_cont">
        <!-- 表单 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item>
                            <el-button type="primary" @click="addRedeemCode" v-on:click="addRedeemCodeVisible = true">添加banner</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <!-- 兑换码列表 -->
        <el-row>
            <el-table class="redeem_code_list" :data="redeem_code_info" border highlight-current-row v-loading="listLoading" height="720">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <el-table-column prop="id" label="兑换码id" width="80" align="center"></el-table-column>
                <el-table-column prop="userId" label="用户id" width="80" align="center"></el-table-column>
                <el-table-column prop="code" label="兑换码" width="120" align="center"></el-table-column>
                <el-table-column prop="createAt" label="创建时间" width="110" align="center"></el-table-column>
                <el-table-column prop="usedAt" label="使用时间" width="110" align="center"></el-table-column>

                <el-table-column label="状态" width="110" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.isUsed === 1 ? "未使用" : "已使用" }}
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-col :span="24" class="toolbar f-cb">
                <el-pagination class="f-fr" layout="prev, pager, next, total"  @current-change="handleCurrentChange" :total="page_arg.total"></el-pagination>
            </el-col>
        </el-row>

        <!-- 添加兑换码 -->
        <el-dialog title="添加兑换码" @keyup.enter.native="addRedeemCodeSubmit('addRedeemCodeForm')" :close-on-click-modal="false" :visible.sync="addRedeemCodeVisible" :before-close="handleClose">

        </el-dialog>
    </section>
</template>

<script>
    import {
        findRedeemCodeList,  // 获取兑换码列表
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
                listLoading: false,  // lodding动画
                dialogVisible: false,  // 关闭提示

                //分页参数
                page_arg: {
                    pagesize: "10",  // 初始一页条数
                    currentPage: "1",  // 当前第几页
                    total: 0,  // 用于table的 :total
                },

                /**
                 * 兑换码列表
                 */
                redeem_code_info: [],  // 存放兑换码信息列表数据

                /**
                 * 添加兑换码
                 */
                // 添加兑换码数据
                addRedeemCodeData: {
                },

                // 验证添加用户界面数据
                addRedeemCodeRules: {
                },


                /**
                 *  弹出表单界面
                 */
                addRedeemCodeVisible: false,  // 显示隐藏添加新的项目界面
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
                this.getRedeemCodeList();
            },

            /**
             *  api
             *  获取banner信息
             */
            getRedeemCodeList () {
                //接口参数
                let param = {
                    pageSize: this.page_arg.pagesize,
                    pageNum: this.page_arg.currentPage,
                };

                findRedeemCodeList(qs.stringify(param)).then(res => {
                    console.log(res.data.data);

                    this.page_arg.total = res.data.data.total;
                    this.redeem_code_info = res.data.data.list;
                }).catch({});
            },
            formatType (row) {
                switch (row.type) {
                    case 0:
                        return "视频";
                        break;
                    case 1:
                        return "平台";
                        break;
                    case 2:
                        return "null";
                        break;
                    default :
                        return "null";
                        break;
                }
            },

            /**
             *  api
             *  添加用户
             */
            // 点击添加项目
            addRedeemCode () {
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
            this.getRedeemCodeList();
        }
    }
</script>

<style scoped>
    .toolbar {
        padding-bottom: 0;
    }

    .tabimg{
        display: block;
        width: 40px;
        height: 40px;
        margin: 0 auto;
    }
</style>