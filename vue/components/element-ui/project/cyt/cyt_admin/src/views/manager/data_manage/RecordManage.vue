<template>
    <section class="main_cont">
        <el-row>
            <!-- 筛选 -->
            <el-row>
                <el-form :model="filterData" status-icon :rules="filterDataRules" ref="filterRecordForm" label-width="100px">
                    <el-col class="toolbar bdr_radiu" :span="24">
                        <el-col :span="22">
                            <el-form-item label="柜端编号" prop="guiNo" class="intxt">
                                <el-input v-model="filterData.guiNo" placeholder="请输入柜端编号" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="存件人手机号" prop="postmanMobile" class="intxt">
                                <el-input v-model="filterData.postmanMobile" placeholder="请输入存件人手机号" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="取件人手机号" prop="customerMobile" class="intxt">
                                <el-input v-model="filterData.customerMobile" placeholder="请输入取件人手机号" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="格口编号" prop="boxNo" class="intxt">
                                <el-input v-model="filterData.boxNo" placeholder="请输入格口编号" clearable></el-input>
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

                            <el-form-item label="时间范围" prop="endTime" class="intxt time_section" v-if="time.showTime">
                                <el-time-select
                                    placeholder="起始时间"
                                    @change="changeStartTime"
                                    v-model="time.startTime"
                                    :picker-options="{
                                        start: '00:00',
                                        step: '00:30',
                                        end: '24:00'
                                }">
                                </el-time-select>
                                <el-time-select
                                    placeholder="结束时间"
                                    @change="changeEndTime"
                                    v-model="time.endTime"
                                    :picker-options="{
                                        start: '00:00',
                                        step: '00:30',
                                        end: '24:00',
                                        minTime: time.startTime
                                    }">
                                </el-time-select>
                            </el-form-item>

                            <el-form-item label="记录状态" class="intxt">
                                <el-select v-model="filterData.status" placeholder="全部" @change="currentSel">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="未取" value="0"></el-option>
                                    <el-option label="已取" value="1"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="取出状态" prop="takeoutBy" v-if="isTakeOut" class="intxt">
                                <el-input v-model="filterData.takeoutBy" placeholder="请输入已取出：用何种方式取出（& 被谁取出）" clearable></el-input>
                            </el-form-item>

                            <el-form-item class="intxt">
                                <el-button type="primary" @click="filterRecordSubmit('filterRecordForm')">查询</el-button>
                                <el-button @click="resetForm('filterRecordForm')">重置</el-button>
                                <el-button type="primary" @click="downloadPackageList">下载</el-button>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-form>
            </el-row>

            <!-- 记录列表 -->
            <el-table class="record_list" :data="record_info" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" height="calc(100vh - 396px)">
                <!--<el-table-column type="selection" width="35"></el-table-column>-->
                <!--<el-table-column type="index" width="35" align="center"></el-table-column>-->
                <!--<el-table-column prop="id" label="id" width="60" align="center"></el-table-column>-->
                <el-table-column prop="packageNo" label="单号" width="220px" align="center"></el-table-column>
                <el-table-column prop="guiNo" label="柜端编号" width="auto" align="center"></el-table-column>
                <el-table-column prop="boxNo" label="格口编号" width="auto" align="center"></el-table-column>
                <el-table-column prop="postmanMobile" label="骑手手机号" width="auto" align="center"></el-table-column>
                <el-table-column prop="storeinAt" label="存餐时间" width="200px" align="center"></el-table-column>
                <el-table-column prop="takeoutBy" label="取餐人" width="auto" align="center"></el-table-column>
                <el-table-column prop="customerMobile" label="取餐手机" width="auto" align="center"></el-table-column>
                <el-table-column prop="openBoxKey" label="开柜密码" width="auto"></el-table-column>

                <el-table-column label="订单状态" width="auto">
                    <template slot-scope="scope">
                        {{ scope.row.status === 0 ? "待取" : "已取" }}
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="210">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="openSpecificCabinets(scope.row)" v-if="scope.row.status == 0">开柜</el-button>
                        <el-button type="text" size="small" @click="resetStatus(scope.row)">重置订单状态</el-button>
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

        <!-- 重置订单状态 -->
        <!--<el-dialog title="重置订单状态" @keyup.enter.native="resetStatusSubmit('resetStatusForm')" :close-on-click-modal="false" :visible.sync="resetStatusVisible" :before-close="handleClose">
            <el-form :model="resetStatusData" status-icon :rules="resetStatusRules" ref="resetStatusForm" label-width="120px">
                <el-form-item label="记录编号" prop="id">
                    <el-input v-model="resetStatusData.id" disabled></el-input>
                </el-form-item>

                <el-form-item label="订单状态">
                    <el-select v-model="resetStatusData.status" placeholder="订单状态" @change="statuCurrentSel">
                        <el-option label="已取" value="1"></el-option>
                        <el-option label="待取" value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="resetStatusSubmit('resetStatusForm')">提交</el-button>
                    <el-button @click="resetForm('resetStatusForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>-->
    </section>
</template>

<script>
    import {
        getRecordInfo,  // 获取记录信息
        openBoxNo,  // 开启单个特定格口
        resetStatus,  // 重置状态
        // downloadPackageList,  // 记录数据下载
    } from '../../../api/api.js';

    export default {
        name: "record_manage",

        data() {
            // 手机类型验证
            /*let validatePhone = (rule, value, callback) => {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/

                if (!reg.test(value)) {
                    return callback(new Error('价格必须是整数或者小数且前缀不能为0！'));
                }

                callback();
            };*/

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
                    page_size: 10, // 1页显示多少条
                    page_sizes: [10, 15, 20, 50], //每页显示多少条
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

                /**
                 * 时间筛选器
                 */
                time: {
                    showTime: true,
                    startTime: '',
                    endTime: ''
                },

                // 筛选器数据
                filterData: {
                    guiNo: undefined,  // 柜端编号
                    postmanMobile: undefined,  // 存件人手机号
                    customerMobile: undefined,  // 取件人手机号
                    date: this.formatDate(new Date()),  // 日期 | 默认选择今天，但可以选择其他日期
                    // date: "2018-12-18",  // 日期 | 默认选择今天，但可以选择其他日期
                    startTime: undefined,  // 时间 | 以半小时为最小调整单位
                    endTime: undefined,  // 时间 | 以半小时为最小调整单位
                    boxNo: undefined,  // 柜号（非空）
                    status: undefined,  // 记录状态 0/待取 1/已取
                    takeoutBy: undefined,  // 已取出：用何种方式取出（& 被谁取出）
                },

                filterDataRules: {
                    /*postmanMobile: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],*/
                    date: [
                        // { required: true, message: '日期不能为空！', trigger: 'blur' }
                    ]
                },

                isTakeOut: false,

                // 重置订单状态数据
                resetStatusData: {
                    id: "",  // 记录编号
                    status: ""  // 状态
                },

                // 验证添加用户界面数据
                resetStatusRules: {
                    /*id: [
                        { required: true, message: 'id不能为空！', trigger: 'blur' }
                    ],*/
                    status: [
                        { required: true, message: '订单状态不能为空！', trigger: 'blur' }
                    ],
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                resetStatusVisible: false,  // 重置订单状态界面
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

                // 如果日期存在，显示时间
                if (!val){
                    this.time.showTime = false;
                } else {
                    this.time.showTime = true;
                }
            },

            /**
             *  时间筛选器
             */
            // 改变开始时间
            changeStartTime (val) {
                // 开始时间重新赋值
                this.filterData.startTime = `${this.filterData.date} ${val}`;
            },

            // 改变结束时间
            changeEndTime (val) {
                // 结束时间重新赋值
                this.filterData.endTime = `${this.filterData.date} ${val}`;
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

                // console.log(para);

                getRecordInfo(qs.stringify(para)).then(res => {
                    // console.log(res.data.data);

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
            // 状态下拉框
            currentSel(selVal){
                switch (selVal) {
                    case "":
                        this.filterData.status = undefined;
                        break;
                    case "0":
                        this.isTakeOut = false;
                        break;
                    case "1":
                        this.isTakeOut = true;
                        break;
                }
            },
            /**
             * api
             * 记录数据下载
             */
            downloadPackageList () {
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
                };

                let _guiNo, _postmanMobile, _customerMobile, _date, _startTime, _endTime, _boxNo, _status, _takeoutBy;

                if (para.guiNo == undefined){
                    _guiNo = "";
                } else {
                    _guiNo = "&guiNo=" + para.guiNo;
                }

                if (para.postmanMobile == undefined){
                    _postmanMobile = "";
                } else {
                    _postmanMobile = "&postmanMobile=" + para.postmanMobile;
                }

                if (para.customerMobile == undefined){
                    _customerMobile = "";
                } else {
                    _customerMobile = "&customerMobile=" + para.customerMobile;
                }

                if (para.date == undefined){
                    _date = "";
                } else {
                    _date = "&date=" + para.date;
                }

                if (para.startTime == undefined){
                    _startTime = "";
                } else {
                    _startTime = "&startTime=" + para.startTime;
                }

                if (para.endTime == undefined){
                    _endTime = "";
                } else {
                    _endTime = "&endTime=" + para.endTime;
                }

                if (para.boxNo == undefined){
                    _boxNo = "";
                } else {
                    _boxNo = "&boxNo=" + para.boxNo;
                }

                if (para.status == undefined){
                    _status = "";
                } else {
                    _status = "&status=" + para.status;
                }

                if (para.takeoutBy == undefined){
                    _takeoutBy = "";
                } else {
                    _takeoutBy = "&takeoutBy=" + para.takeoutBy;
                }

                let url = requsetUrl + "downloadPackageList?" +
                        _guiNo + _postmanMobile + _customerMobile +
                        _date + _startTime + _endTime + _boxNo +
                        _status + _takeoutBy

                // console.log(url);

                window.location.href = url;
            },

            /**
             * api
             * 开启单个格口
             */
            openSpecificCabinets (row) {
                this.listLoading = true;  // 加载loading

                // console.log(Object.assign({}, row));

                let para = {
                    guiNo: Object.assign({}, row).guiNo,  // 柜端编号
                    mobile: Object.assign({}, row).postmanMobile,
                    // postmanMobile: this.filterData.postmanMobile,  // 存件人手机号
                    // customerMobile: this.filterData.customerMobile,  // 取件人手机号
                    boxNo: Object.assign({}, row).boxNo,  // 柜号
                };

                // console.log(para);

                openBoxNo(para).then(() => {
                    // console.log(res)
                    this.listLoading = false;  //停止加载loading

                    //成功提示
                    this.$message({
                        message: para.guiNo + "设备" + para.boxNo + "格口" + "  开启成功",
                        type: 'success'
                    });
                }).catch({});
            },

            /**
             * 订单状态
             */
            // 订单状态选择
            /*statuCurrentSel (val) {
                console.log(val);

                this.resetStatusData.status = val;
            },*/
            // 重置订单状态
            resetStatus (row) {
                this.$confirm('确认重置？').then(() => {
                    this.listLoading = true;

                    let param = {
                        packageNo: Object.assign({}, row).packageNo
                    }

                    // 重置接口
                    resetStatus(param).then(res => {
                        // console.log(res);

                        this.$message({
                            message: "重置成功！",
                            type: "success"
                        });

                        this.listLoading = false;

                        this.resetStatusVisible = false;

                        this.getRecordInfo();  // 加载分页数据
                    });
                }).catch(() => {});
            },
            /*resetStatusSubmit(formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    // 如果验证成功，请求接口数据
                    if (valid) {
                        console.log("success!!");

                        this.listLoading = true;

                        /!*let params = {
                            id: this.resetStatusData.id,
                            status: this.resetStatusData.status,
                        }*!/

                        /!*resetStatus(qs.stringify(this.resetStatusData)).then(res => {
                            console.log(res);

                            this.listLoading = false;

                            this.resetStatusVisible = false;

                            this.getRecordInfo();  // 加载分页数据
                        });*!/
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                    }
                });
            }*/
        },
        created () {
            // console.log($);
            this.getRecordInfo();
        }
    }
</script>

<style scoped>
    .toolbar{
        padding: 10px 10px 0 10px;
        margin: 10px 0;
    }

    .intxt{
        display: inline-block;
        margin-right: 16px;
        margin-bottom: 22px;
        width: 345px;
    }

    .record_list{
        width: 100%;
    }

    .time_section{
        width: 575px;
        margin-right: 0;
    }
</style>