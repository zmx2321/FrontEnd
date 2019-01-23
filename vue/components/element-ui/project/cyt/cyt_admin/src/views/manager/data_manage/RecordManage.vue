<template>
    <section class="main_cont">
        <!-- 记录管理 -->
        <el-row>
            <!--<el-col :span="24" class="title">
                <i class="el-icon-info"></i>
                <span>记录管理</span>
            </el-col>-->

            <!-- 筛选 -->
            <el-row>
                <el-form :model="filterData" :inline="true" ref="filterRecordForm" label-width="100px">
                    <el-col class="toolbar bdr_radiu" :span="24">
                        <el-col :span="22">
                            <el-form-item label="柜端编号" prop="guiNo">
                                <el-input v-model="filterData.guiNo" placeholder="请输入柜端编号" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="存件人手机号" prop="postmanMobile">
                                <el-input v-model="filterData.postmanMobile" placeholder="请输入存件人手机号" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="取件人手机号" prop="customerMobile">
                                <el-input v-model="filterData.customerMobile" placeholder="请输入取件人手机号" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="日期" prop="date">
                                <el-input v-model="filterData.date" placeholder="请输入日期" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="开始时间" prop="startTime">
                                <el-input v-model="filterData.startTime" placeholder="请输入开始时间" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="结束时间" prop="endTime">
                                <el-input v-model="filterData.endTime" placeholder="请输入结束时间" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="柜号" prop="boxNo">
                                <el-input v-model="filterData.boxNo" placeholder="请输入柜号" clearable></el-input>
                            </el-form-item>
                            <!--<el-form-item label="记录状态" prop="status">
                                <el-input v-model="filterData.status" placeholder="请输入记录状态" clearable></el-input>
                            </el-form-item>-->

                            <el-form-item label="记录状态">
                                <el-select v-model="filterData.status" placeholder="请输入记录状态" @change="currentSel">
                                    <el-option label="未取" value="0"></el-option>
                                    <el-option label="已取" value="1"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="取出状态" prop="takeoutBy" v-if="isTakeOut">
                                <el-input v-model="filterData.takeoutBy" placeholder="请输入已取出：用何种方式取出（& 被谁取出）" clearable></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="filterRecordSubmit('filterRecordForm')">查询</el-button>
                                <el-button @click="resetForm('filterRecordForm')">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-form>
            </el-row>

            <!-- 记录列表 -->
            <el-table class="record_list" :data="record_info" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" height="calc(100vh - 370px)">
                <!--<el-table-column type="selection" width="35"></el-table-column>-->
                <!--<el-table-column type="index" width="35" align="center"></el-table-column>-->
                <!--<el-table-column prop="id" label="id" width="60" align="center"></el-table-column>-->
                <el-table-column prop="packageNo" label="单号" width="220" align="center"></el-table-column>
                <el-table-column prop="guiNo" label="柜端编号" width="100" align="center"></el-table-column>
                <el-table-column prop="boxNo" label="柜口编号" width="100" align="center"></el-table-column>
                <el-table-column prop="postmanMobile" label="骑手手机号" width="120" align="center"></el-table-column>
                <el-table-column prop="storeinAt" label="存餐时间" width="110" align="center"></el-table-column>
                <el-table-column prop="takeoutBy" label="存餐时间" width="110" align="center"></el-table-column>
                <el-table-column prop="customerMobile" label="取餐手机" width="80" align="center"></el-table-column>
                <el-table-column prop="openBoxKey" label="开柜密码" width="100"></el-table-column>

                <el-table-column label="订单状态" width="auto">
                    <template slot-scope="scope">
                        {{ scope.row.status === 0 ? "待取" : "已取" }}
                    </template>
                </el-table-column>
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
    import { getRecordInfo } from '../../../api/api.js';

    export default {
        name: "record_manage",

        data() {
            return {
                /**
                 * common
                 */
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示

                sels: [],  //账号列表选中列

                // 分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 5, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                /**
                 *  记录信息列表
                 */
                //记录信息
                record_info: [],

                /**
                 * 记录信息筛选数据
                 */
                // 筛选器数据
                filterData: {
                    guiNo: undefined,  // 柜端编号
                    postmanMobile: "15857191954",  // 存件人手机号
                    customerMobile: "1234",  // 取件人手机号
                    date: "2018-12-18",  // 日期 | 默认选择今天，但可以选择其他日期
                    startTime: undefined,  // 时间 | 以半小时为最小调整单位
                    endTime: undefined,  // 时间 | 以半小时为最小调整单位
                    boxNo: undefined,  // 柜号（非空）
                    status: "0",  // 记录状态 0/待取 1/已取
                    takeoutBy: undefined,  // 已取出：用何种方式取出（& 被谁取出）
                },

                isTakeOut: false,
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
            // 列表是否选中
            selsChange (sels) {
                // console.log(sels);

                this.sels = sels;
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getRecordInfo();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getRecordInfo();  // 加载分页数据
            },

            /**
             *  api
             *  获取记录信息
             */
            getRecordInfo () {
                this.listLoading = true;

                let para = {
                    guiNo: this.filterData.guiNo,  // 柜端编号
                    postmanMobile: this.filterData.postmanMobile,  // 存件人手机号
                    customerMobile: this.filterData.customerMobile,  // 取件人手机号
                    date: this.filterData.date,  // 日期
                    startTime: this.filterData.startTime,  // 开始时间
                    endTime: this.filterData.endTime,  // 结束时间
                    boxNo: this.filterData.boxNo,  // 柜号
                    status: this.filterData.status,  // 记录状态
                    takeoutBy: this.filterData.takeoutBy,  // 取出方式
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size  // 每页数量
                };

                console.log(para);

                getRecordInfo(qs.stringify(para)).then(res => {
                    console.log(res.data.data);

                    this.record_info = res.data.data.list;

                    this.listLoading = false;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.count;
                });
            },
            // 筛选
            filterRecordSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    // 如果验证成功，请求接口数据
                    if (valid) {
                        // 加载分页数据
                        this.getRecordInfo();
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                    }
                });
            },

            currentSel(selVal){
                switch (selVal) {
                    case "0":
                        this.isTakeOut = false;
                        break;
                    case "1":
                        this.isTakeOut = true;
                        break;
                }
            }
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