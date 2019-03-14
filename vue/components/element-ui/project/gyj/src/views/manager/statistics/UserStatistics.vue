<template>
    <section class="main_cont">
        <!-- 按钮 -->
        <!--<el-row class="toolbar bdr_radiu f-cb">
            <el-col class="f-fl btn_wrap">
                <el-button type="primary" @click="addVoteVisible = true">添加投票</el-button>
            </el-col>
        </el-row>-->

        <!-- 统计列表 -->
        <el-row>
            <el-table class="statistic_list" :data="statistic_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 135px)">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <!--<el-table-column prop="id" label="编号" width="80" align="center"></el-table-column>-->

                <el-table-column prop="dateString" label="日期" width="auto" align="center"></el-table-column>
                <el-table-column prop="newNum" label="新增用户" width="auto" align="center"></el-table-column>
                <el-table-column prop="activeNum" label="活跃用户" width="auto" align="center"></el-table-column>
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
        getUserStatistics,  // 用户数据统计
    } from '../../../api/api.js';

    export default {
        name: 'vote',

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
                 * 统计
                 */
                // 统计列表
                statistic_info: [],
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
                this.getStatistic();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getStatistic();  // 加载分页数据
            },

            /**
             *  api
             *  获取统计信息
             */
            // 获取统计列表
            getStatistic () {
                this.listLoading = true;

                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                };

                // 请求接口
                getUserStatistics(param).then(res => {
                    // console.log(res.data.data.list);

                    this.statistic_info = res.data.data.list;

                    this.listLoading = false;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;
                }).catch({});
            },
        },
        // 预处理
        created () {
            this.getStatistic();
        }
    }
</script>

<style lang="less" scoped>

</style>