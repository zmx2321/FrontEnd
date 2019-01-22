<template>
    <section class="main_cont">
        <!-- 记录管理 -->
        <el-row>
            <el-col :span="24" class="title">
                <i class="el-icon-info"></i>
                <span>记录管理</span>
            </el-col>

            <!-- 表单 -->
            <el-row>
                <el-form :inline="true">
                    <el-col class="toolbar bdr_radiu" :span="24">
                        <el-col :span="22">
                            <el-form-item>
                                <el-input placeholder="请输入柜端编号" clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="请输入存件人手机号" clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="请输入取件人手机号" clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="请输入日期" clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="请输入开始时间" clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="请输入结束时间" clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="请输入柜号" clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="请输入记录状态" clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="请输入已取出：用何种方式取出（& 被谁取出）" clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary">筛选</el-button>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-form>
            </el-row>

            <!-- 记录列表 -->
            <el-table class="record_list" :data="record_info" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" height="600">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column type="index" width="35" align="center"></el-table-column>
                <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>
                <el-table-column prop="packageNo" label="单号" width="220" align="center"></el-table-column>
                <el-table-column prop="guiNo" label="设备编号"></el-table-column>
                <el-table-column prop="boxNo" label="柜口编号"></el-table-column>
                <el-table-column prop="postmanMobile" label="骑手手机号"></el-table-column>
                <el-table-column prop="storeinAt" label="存餐时间"></el-table-column>
                <el-table-column prop="takeoutBy" label="存餐时间"></el-table-column>
                <el-table-column prop="customerMobile" label="取餐手机"></el-table-column>
                <el-table-column prop="openBoxKey" label="开柜密码"></el-table-column>
                <el-table-column prop="status" label="订单状态"></el-table-column>
            </el-table>
            <!-- 底部工具条 -->
            <el-col :span="24" class="toolbar bottip">
                <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
                <!--<el-pagination-->
                        <!--@size-change="handleSizeChange"-->
                        <!--@current-change="handleCurrentChange"-->
                        <!--:current-page="currentPage4"-->
                        <!--:page-sizes="[100, 200, 300, 400]"-->
                        <!--:page-size="100"-->
                        <!--layout="total, sizes, prev, pager, next, jumper"-->
                        <!--:total="400">-->
                <!--</el-pagination>-->
                <el-pagination
                        :page-sizes="paginations.page_sizes"
                        :page-size="paginations.page_size"
                        :layout="paginations.layout"
                        :total="paginations.total"
                        :current-page.sync='paginations.page_index'
                        @current-change='handleCurrentChange'
                        @size-change='handleSizeChange'>
                </el-pagination>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import { getRecordInfo } from '../../../api/api.js';

    export default {
        name: "record_manage",

        data() {
            return {
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示

                sels: [],  //账号列表选中列

                //记录信息参数
                record_arg: {
                    date: "2018/12/18",
                    pageNum: 2,
                    pageSize: 10
                },

                //记录信息
                record_info: [],

                //需要给分页组件传的信息
                paginations: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 5, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },
            }
        },
        methods: {
            //获取记录信息
            getRecordInfo () {
                this.listLoading = true;

                let para = {
                    date: this.record_arg.date,
                    pageNum: this.record_arg.pageNum,
                    pageSize: this.record_arg.pageSize
                };

                console.log(para);

                getRecordInfo(qs.stringify(para)).then(res => {
                    console.log(this.record_info);

                    this.record_info = res.data.data.list;

                    this.listLoading = false;
                });
            },

            //关闭提示
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            //设备列表是否选中
            selsChange (sels) {
                this.sels = sels;
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

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            //Filter
            // getpage (page) {
            //     this.curpage = page;
            //     let allfilter = {
            //         filters: this.filters,
            //         page
            //     };
            //     let res = dofilter(allfilter);
            //     this.data = res.data
            // },
            // getFilter (val) {
            //     console.log(val);
            //     // let allfilter = {
            //     //     filters: val,
            //     //     page: 1
            //     // };
            //     // this.filters = val;
            //     // let res = dofilter(allfilter);
            //     // this.data = res.data;
            //     // this.pagenum = res.pagenum
            // },
            // getselect (val) {
            //     console.log(val)
            // },
        },
        created () {
            this.getRecordInfo();
        }
    }
</script>

<style scoped>
    .toolbar{
        padding: 10px 10px 0 10px;
        margin: 10px 0;
    }

    .title{
        margin-bottom: 10px;
    }

    .record_list{
        width: 100%;
    }
</style>