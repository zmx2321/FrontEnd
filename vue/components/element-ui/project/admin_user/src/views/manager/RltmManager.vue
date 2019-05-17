<template>
    <section class="main_cont">
        <!-- 筛选 -->
        <el-row class="toolbar bdr_radiu f-cb">
            <el-form :model="filterData" status-icon ref="filterForm" :inline="true">
                <el-col :span="24">
                    <el-form-item label="查询关键词">
                        <el-input v-model="filterData.keyword" placeholder="请输入关键词" clearable></el-input>
                    </el-form-item>

                    <!--日期，格式行如：2019-04-12-->
                    <!--<el-form-item label="日期">
                        <el-date-picker
                                v-model="filterData.timeArray"
                                type="daterange"
                                align="right"
                                unFlow-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy-MM-dd"
                                @change="getSTime"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>-->

                    <!-- 按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="filterFormSubmit('filterForm')">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>

        <!-- 统计列表 -->
        <el-row>
            <el-table class="flow_list" :data="flow_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 218px)">
                <el-table-column type="index" width="60" align="center"></el-table-column>

                <el-table-column prop="url" label="url" width="auto" align="center"></el-table-column>
                <el-table-column prop="pv" label="pv" width="auto" align="center"></el-table-column>
                <el-table-column prop="uv" label="uv" width="auto" align="center"></el-table-column>
                <el-table-column prop="registerNum" label="registerNum" width="auto" align="center"></el-table-column>
                <el-table-column prop="passNum" label="passNum" width="auto" align="center"></el-table-column>
                <el-table-column prop="createAt" label="createAt" width="auto" align="center"></el-table-column>
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
        getReal,  // 获取统计列表
    } from '../../api/api.js';

    export default {
        name: 'rltm_manager',

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
                 * 筛选器
                 */
                // 时间筛选器
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },

                // 筛选数据
                filterData: {
                    timeArray: "",
                    keyword: "",  // keyword（查询关键词，模糊匹配 url 和 memo字段）
                    dateBegin: "",  // 日期，格式行如：2019-04-12
                    dateEnd: "",  // 日期，格式行如：2019-04-12
                },

                /**
                 * 统计
                 */
                // 统计列表
                flow_info: [],  // 存放用户信息列表数据

                /**
                 * 编辑统计
                 */
                editFlowData: {
                    flowId: "",  // flowId， 一条统计数据的ID
                    pv: "",  // PV值
                    uv: "",  // UV值
                    activeUv: "",  // active UV值, 这个字段 先不用
                    registerNum: "",  // registerNum, 注册数量，CPA数量
                    passNum: "",  // passNum，通过数量，CPS数量
                },

                editFlowRules: {
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addFlowVisible: false,  // 新增统计
                editFlowVisible: false,  // 编辑统计
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
            // 时间戳 2019-04-23
            formatDate (now) {
                now = new Date(now);
                let year = now.getFullYear();
                let month = now.getMonth() + 1;
                let date = now.getDate();

                return `${year}-${month}-${date}`;
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getFlowList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getFlowList();  // 加载分页数据
            },

            /**
             *  api getReal
             *  获取统计信息
             */
            // 点击日期控制器
            getSTime(val) {
                if(val){
                    // 为起止时间赋值
                    this.filterData.dateBegin = this.formatDate(val[0]);
                    this.filterData.dateEnd = this.formatDate(val[1]);
                } else {
                    this.filterData.dateBegin = "";
                    this.filterData.dateEnd = "";
                }

                return false;
            },
            // 获取统计列表
            getFlowList () {
                //接口参数
                let params = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                    keyword: this.filterData.keyword == "" ? undefined : this.filterData.keyword,  // keyword（查询关键词，模糊匹配 url 和 memo字段）
                    /*dateBegin: this.filterData.dateBegin == "" ? undefined : this.filterData.dateBegin,  // 日期，格式行如：2019-04-12
                    dateEnd: this.filterData.dateEnd == "" ? undefined : this.filterData.dateEnd,  // 日期，格式行如：2019-04-12*/
                };

                // loading
                this.listLoading = true;

                // 请求接口
                getReal(params).then(res => {
                    // console.log(res.data.data.set);

                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        let datas = res.data.data.set;

                        for (let i=0; i<datas.length; i++) {
                            datas[i].createAt = this.formatDate(datas[i].createAt);
                        }

                        this.flow_info = datas;

                        // 返回分页总数
                        this.page_arg.total = res.data.data.pager.total;
                    }

                    this.listLoading = false;
                }).catch({});
            },
            // 筛选
            filterFormSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        this.getFlowList();
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },
        },
        // 预处理
        created () {
            this.getFlowList();
        }
    }
</script>

<style lang="less" scoped>
    .toolbar .el-form-item {
        margin-bottom: 3px;
    }
</style>