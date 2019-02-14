<template>
    <section class="main_cont">
        <!-- 按钮 -->
        <el-row class="toolbar bdr_radiu f-cb">
            <el-form :model="filterData" status-icon ref="filterUserForm" label-width="100px">
                <el-form-item label="用户手机号" prop="customerMobile" class="intxt">
                    <el-input v-model="filterData.mobile" placeholder="请输入用户手机号" clearable></el-input>
                </el-form-item>

                <el-form-item label="日期" prop="date" class="intxt">
                    <el-date-picker
                            v-model="filterData.date"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            value-format=" yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            @change="changeDate"
                            :picker-options="pickerOptionsDate">
                    </el-date-picker>
                </el-form-item>

                <el-form-item class="intxt">
                    <el-button type="primary" @click="filterUserFormSubmit('filterUserForm')">查询</el-button>
                    <el-button @click="resetForm('filterUserForm')">重置</el-button>
                    <el-button type="primary" @click="downloadUserList">下载</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <!-- 用户列表 -->
            <el-table class="user_list" :data="user_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 255px)">
                <!--<el-table-column type="selection" width="35"></el-table-column>-->
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="lxCode" label="领鲜号"></el-table-column>
                <el-table-column prop="mobile" label="手机号码"></el-table-column>
                <el-table-column prop="createAt" label="注册时间"></el-table-column>
                <!--<el-table-column prop="openId" label="微信标志"></el-table-column>-->
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
        geUserList,  // 获取用户信息
        downloadUserList  // 用户数据下载
    } from '../../../api/api.js';

    export default {
        name: "user_manage",

        data() {
            return {
                /**
                 * common
                 */
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示

                // 分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 5, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                /**
                 *  用户信息列表
                 */
                user_info: [],

                /**
                 * 骑手信息筛选数据
                 */
                // 日期筛选器
                pickerOptionsDate: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                // 筛选器数据
                filterData: {
                    // date: this.formatDate(new Date()),  // 日期 | 默认选择今天，但可以选择其他日期
                    date: "2018/12/25",  // 日期 | 默认选择今天，但可以选择其他日期
                    mobile: "",  // 手机号
                },
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
            // 时间戳
            formatDate (now) {
                let year = now.getFullYear();
                var month = now.getMonth() + 1;
                var date = now.getDate();

                return `${year}-${month}-${date}`;
            },

            /**
             * 日期筛选器
             */
            changeDate (val) {
                // 当date改变，重新赋值
                this.filterData.date = val;
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.geUserList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.geUserList();  // 加载分页数据
            },

            /**
             *  api
             *  获取用户信息
             */
            geUserList(){
                let para = {
                    date: this.filterData.date,
                    mobile: this.filterData.mobile,
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size  // 每页数量
                };

                geUserList(qs.stringify(para)).then(res => {
                    this.user_info = res.data.data.list;
                    // console.log(this.user_info);

                    this.listLoading = false;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.count;
                });
            },
            // 筛选
            filterUserFormSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    // 如果验证成功，请求接口数据
                    if (valid) {
                        // 加载分页数据
                        this.geUserList();
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                    }
                });
            },
            /**
             * api
             * 用户数据下载
             */
            downloadUserList () {
                let para = {
                    date: this.filterData.date,
                    mobile: this.filterData.mobile,
                };

                // console.log(para);

                downloadUserList(para).then(res => {
                    console.log(res);
                });
            }
        },
        created () {
            this.geUserList();
        }
    }
</script>

<style scoped>
    .user_list{
        width: 100%;
    }

    .intxt{
        display: inline-block;
        margin-right: 16px;
        margin-bottom: 2px;
        width: 345px;
    }
</style>