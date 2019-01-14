<template>
    <section class="main_cont">
        <!-- 表单 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item>
                            <el-button type="primary" @click="addSingleRedeemCode" v-on:click="addSingleRedeemCodeVisible = true">添加单个兑换码</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addMoreRedeemCode" v-on:click="addMoreRedeemCodeVisible = true">添加单个兑换码</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <!-- 兑换码列表 -->
        <el-row>
            <el-table class="redeem_code_list" :data="redeem_code_info" border highlight-current-row v-loading="listLoading">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" width="60" align="center"></el-table-column>
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

                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
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

        <!-- 添加兑换码 -->
        <el-dialog title="添加兑换码" @keyup.enter.native="addSingleRedeemCodeSubmit('addSingleRedeemCodeForm')" :close-on-click-modal="false" :visible.sync="addSingleRedeemCodeVisible" :before-close="handleClose">

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
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 10, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
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
                addSingleRedeemCodeVisible: false,  // 显示隐藏添加新的项目界面
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
                this.getRedeemCodeList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getRedeemCodeList();  // 加载分页数据
            },

            /**
             *  api
             *  获取兑换码信息
             */
            getRedeemCodeList () {
                //接口参数
                let param = {
                    pageSize: this.page_arg.page_size,  //每页条数
                    pageNum: this.page_arg.page_index,  //当前页码
                };

                findRedeemCodeList(qs.stringify(param)).then(res => {
                    // console.log(res.data.data);

                    this.redeem_code_info = res.data.data.list;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;
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
            addSingleRedeemCode () {
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
    .redeem_code_list{
        height: calc(100vh - 250px);
        overflow: auto;
    }

    .toolbar {
        padding-bottom: 0;
    }

    .pagination{
        margin-bottom: 16px;
    }
</style>