<template>
    <section class="main_cont">
        <!-- 按钮 -->
        <el-row class="toolbar bdr_radiu f-cb">
            <el-form :inline="true">
                <el-form-item label="管理员ID(组长id)" prop="target">
                    <el-input v-model="adminId" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="getOneIncome">查询</el-button>
                    <!--<el-button type="primary" @click="addIncomeVisible = true">充值</el-button>-->
                </el-form-item>
            </el-form>
        </el-row>

        <!-- 充值列表 -->
        <el-row>
            <el-table class="income_list" :data="income_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 218px)">
                <el-table-column type="index" width="60" align="center" label="序号"></el-table-column>
                <!--<el-table-column prop="adminId" label="管理员编号" width="100" align="center"></el-table-column>-->
                <el-table-column prop="mobile" label="手机号" width="auto" align="center"></el-table-column>
                <el-table-column prop="realName" label="姓名" width="auto" align="center"></el-table-column>
                <el-table-column prop="totalPrice" label="充值金额" width="auto" align="center"></el-table-column>
                <el-table-column prop="crtattim" label="创建日期" width="auto" align="center"></el-table-column>
            </el-table>

            <el-row :span="24" class="toolbar f-cb">
                <!-- 分页 -->
                <el-col>
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
        </el-row>
    </section>
</template>

<script>
    import {
        getIncome,  // 获取充值列表
    } from '../../api/api.js';

    export default {
        name: 'account_manager',

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
                    page_size: 20, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                /**
                 * 充值
                 */
                // 充值列表
                income_info: [],  // 存放用户信息列表数据

                adminId: "",  // 管理员ID(准确的说是组长的ID)
            }
        },
        methods: {
            /**
             * common
             */
            // 关闭提示
            handleClose(done) {
                this.$confirm('确认关闭？').then(() => {
                    done();
                }).catch(() => {});
            },
            // 表单重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getIncomeList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getIncomeList();  // 加载分页数据
            },

            /**
             *  api getIncome
             *  获取用户账号信息
             */
            // 获取充值列表
            getIncomeList () {
                //接口参数
                let param = {
                    adminId: this.adminId,  // 管理员ID(准确的说是组长的ID)
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                };

                // loading
                this.listLoading = true;

                // 请求接口
                getIncome(param).then(res => {
                    // console.log(res.data.data.set);

                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        let datas = res.data.data.set;

                        for (let i=0; i<datas.length; i++) {
                            datas[i].crtattim = datas[i].createAt.slice(2, -3)
                        }

                        this.income_info = datas;

                        // 返回分页总数
                        this.page_arg.total = res.data.data.pager.total;
                    }

                    this.listLoading = false;
                }).catch({});
            },
            // 查询
            getOneIncome () {
                this.getIncomeList();
            },
        },
        // 预处理
        created () {
            this.getIncomeList();
        }
    }
</script>

<style lang="less" scoped>
    .toolbar .el-form-item {
        margin-bottom: 3px;
    }
</style>