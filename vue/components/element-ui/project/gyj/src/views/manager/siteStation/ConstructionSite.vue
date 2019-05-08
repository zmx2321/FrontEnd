<template>
    <section class="main_cont">
        <!-- 筛选 -->
        <el-row class="toolbar bdr_radiu f-cb">
            <el-form :model="filterData" status-icon ref="filterForm" :inline="true">
                <el-col :span="24">
                    <!-- 名称搜索 -->
                    <el-form-item label="名称">
                        <el-input v-model="filterData.name" placeholder="请输入名称" clearable></el-input>
                    </el-form-item>

                    <!-- 地址选择 -->
                    <el-form-item label="选择地址">
                        <el-cascader
                            placeholder="请选择地址"
                            expand-trigger="click"
                            :options="selectCity.filterSiteCityInfo"
                            @visible-change="filterSiteAddress"
                            change-on-select
                            filterable
                            @change="filterSiteChange">
                        </el-cascader>
                    </el-form-item>

                    <!-- 按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="filterFormSubmit('filterForm')">查询</el-button>
                        <el-button type="primary" @click="addSiteVisible = true">新增工地</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>

        <!-- 工地列表 -->
        <el-row>
            <el-table :data="siteInfo" border highlight-current-row v-loading="listLoading" height="calc(100vh - 240px)">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <!--<el-table-column prop="id" label="工地编号" width="80" align="center"></el-table-column>-->

                <el-table-column prop="name" label="工地名称" width="auto" align="center"></el-table-column>
                <el-table-column prop="area" label="面积" width="auto" align="center"></el-table-column>
                <el-table-column prop="province" label="省份" width="auto" align="center"></el-table-column>
                <el-table-column prop="city" label="城市" width="auto" align="center"></el-table-column>
                <el-table-column prop="zone" label="区域" width="auto" align="center"></el-table-column>
                <el-table-column prop="periodTime" label="工期" width="period" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" v-on:click="editSiteVisible = true" @click="editSite(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="delSite(scope.row)">删除</el-button>
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

        <!-- 新增工地 -->
        <el-dialog title="新增工地" @keyup.enter.native="addSiteSubmit('addSiteForm')" :close-on-click-modal="false" :visible.sync="addSiteVisible" :before-close="handleClose">
            <el-form :model="addSiteData" status-icon :rules="addSiteRules" ref="addSiteForm" label-width="160px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addSiteData.name"  placeholder="请输入名称" clearable></el-input>
                </el-form-item>

                <el-form-item label="选择地址">
                    <el-cascader
                            placeholder="请选择地址"
                            expand-trigger="click"
                            :options="selectCity.cityInfo"
                            @visible-change="addSiteAddress"
                            change-on-select
                            filterable
                            @change="addSiteChange">
                    </el-cascader>
                </el-form-item>

                <el-form-item label="详细地址" prop="address">
                    <el-input v-model="addSiteData.address"  placeholder="请输入详细地址" clearable></el-input>
                </el-form-item>

                <el-form-item label="面积" prop="area">
                    <el-input v-model="addSiteData.area"  placeholder="请输入面积" clearable></el-input>
                </el-form-item>

                <!-- @change="addSiteDate" -->
                <el-form-item label="工地周期" prop="period">
                    <el-date-picker
                            v-model="addSiteData.period"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            value-format=" yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            :picker-options="pickerOptionsDate">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addSiteSubmit('addSiteForm')">提交</el-button>
                    <el-button @click="resetForm('addSiteForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑工地 -->
        <el-dialog title="编辑工地" @keyup.enter.native="editSiteSubmit('editSiteForm')" :close-on-click-modal="false" :visible.sync="editSiteVisible" :before-close="handleClose">
            <el-form :model="editSiteData" status-icon :rules="editSiteRules" ref="editSiteForm" label-width="160px">
                <!--<el-form-item label="兑换码月份(默认一月)" prop="month">
                  <el-input v-model="editConsultationData.month"  placeholder="请输入兑换码月份" clearable></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                  <el-input v-model="addRedeemCodeData.memo" placeholder="请输入备注" clearable></el-input>
                </el-form-item>-->

                <el-form-item>
                    <el-button type="primary" @click="editSiteSubmit('editSiteForm')">提交</el-button>
                    <el-button @click="resetForm('editSiteForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        getAddress,  // 地址
        getSite,  // 获取工地列表
        getSiteById,  // 根据id获取工地
        addSite,  // 添加工地
        updateSite,  // 修改工地
        delSite,  // 删除工地
    } from '../../../api/api.js';

    export default {
        name: 'construction_site',

        data() {
            // 单价，组长必填这个字段(type[1])
            /*const validateArea = (rule, value, callback) => {
                let reg = /^(-)|([1-9]\d*)((\.\d+)?)$/;

                if (!reg.test(value)) {
                    return callback(new Error('价格必须是整数或者小数且前缀不能为0！'));
                }
            };*/

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
                 * 工地数据
                 */
                // 工地列表
                siteInfo: [],

                /**
                 * 选择城市
                 * 格式转换地址
                 */
                selectCity: {
                    cityInfo: [], // main
                    filterSiteCityInfo: [],  // 筛选
                    addSiteCityInfo: [],  // 添加
                },

                /**
                 * 筛选数据
                 */
                filterData: {
                    name: "",  // 名称
                    province: undefined,  // 省份
                    city: undefined,  // 城市
                    zone: undefined,  // 区域
                    selectedOptions: [],  // 选择
                },

                /**
                 * 新增工地
                 */
                // 新增工地数据
                addSiteData: {
                    name: "",  // 名称
                    province: "",  // 省份
                    city: "",  // 城市
                    zone: "",  // 区域
                    area: "",  // 面积
                    address: "",  // 详细地址
                    period: "",  // 工地周期(2019-05-24)
                },

                // 验证新增工地数据
                addSiteRules: {
                    /*id: [
                        { required: true, message: 'id不能为空！', trigger: 'blur' }
                        { validator: validatePhone, trigger: "blur" }
                    ],*/
                },

                /**
                 * 编辑工地
                 */
                // 编辑工地数据
                editSiteData: {
                },

                // 验证编辑工地数据
                editSiteRules: {
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addSiteVisible: false,  // 新增工地界面
                editSiteVisible: false,  // 编辑工地界面
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
                now = new Date();
                let year = now.getFullYear();
                var month = now.getMonth() + 1;
                var date = now.getDate();

                return `${year}-${month}-${date}`;
            },

            /**
             * 获取地址信息
             */
            // 获取地址信息并做格式转换
            getAddress (val) {
                if (val == true && this.selectCity.cityInfo.length == 0){
                    this.selectCity.cityInfo.push({
                        value: undefined,
                        label: '全部'
                    });

                    getAddress().then(res => {
                        // console.log(res.data.data.list);

                        let datas = res.data.data.list;

                        // console.log(datas);

                        for (let i=0; i<datas.length; i++) {
                            // console.log(datas[i].provinceAreas);

                            let provinceAreas = new Array();

                            for (let j=0; j<datas[i].provinceAreas.length; j++){
                                let obj = {};
                                obj.label = datas[i].provinceAreas[j].netName
                                obj.value = datas[i].provinceAreas[j].netName

                                provinceAreas.push(obj);
                            }

                            this.selectCity.cityInfo.push({
                                label: datas[i].netName,
                                value: datas[i].netName,
                                children: provinceAreas,
                            });
                        }
                    }).catch({});
                }
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getSiteList();
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                this.page_arg.page_size = page_size;

                this.getSiteList();
            },

            /**
             *  api getSite
             *  获取工地信息
             */
            // 获取投票列表
            getSiteList () {
                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                    name: this.filterData.name == "" ? undefined : this.filterData.name,  // 名称
                    province: this.filterData.province,  // 省份
                    city: this.filterData.city,  // 城市
                };

                this.listloading = true;

                // 请求接口
                getSite(param).then(res => {
                    // console.log(res.data.code);

                    if (res.data.code == 1) {
                        this.$message.warning(res.msg);
                    }

                    if (res.data.code == 0) {
                        let datas = res.data.data.list;

                        for (let i=0; i<datas.length; i++) {
                            if (datas[i].period != null) {
                                datas[i].periodTime = `${datas[i].period[0]}-${datas[i].period[1]}-${datas[i].period[2]}`;
                            } else {
                                datas[i].periodTime = null;
                            }
                        }

                        this.siteInfo = datas;

                        // 返回分页总数
                        this.page_arg.total = res.data.data.total;
                    }

                    this.listloading = false;

                }).catch({});
            },
            // 筛选
            filterFormSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        this.getSiteList();
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },
            // 获取地址信息
            filterSiteAddress (val) {
                this.getAddress(val);

                this.selectCity.filterSiteCityInfo = this.selectCity.cityInfo;
            },
            // 点击选择城市
            filterSiteChange(value) {
                // console.log(value);

                this.filterData.province = value[0];
                this.filterData.city = value[1];
            },

            /**
             * api addSite
             * 新增工地
             */
            /*addSiteDate (val) {
                console.log(val);
            },*/
            // 获取地址信息
            addSiteAddress (val) {
                this.getAddress(val);

                this.selectCity.addSiteCityInfo = this.selectCity.cityInfo;
            },
            // 点击选择城市
            addSiteChange(value) {
                // console.log(value);

                this.addSiteData.province = value[0];
                this.addSiteData.city = value[1];
            },
            // 提交新增工地表单
            addSiteSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        this.listloading = true;

                        this.addSiteData.period = this.formatDate(this.addSiteData.period);

                        addSite(this.qs.stringify(this.addSiteData)).then(res => {
                            // console.log(res.data.code);

                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("添加成功");
                            }

                            this.addSiteVisible = false;
                            this.listloading = false;
                            this.getSiteList();
                        }).catch({});
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             * api
             * 编辑工地
             */
            // 点击编辑
            editSite (row) {
                // console.log(Object.assign({}, row));
            },
            // 提交编辑工地表单
            editSiteSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        console.log("submit!!")
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             *  api
             *  删除工地
             */
            delSite (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log(Object.assign({}, row));
                }).catch(() => {});
            },
        },
        // 预处理
        created () {
            this.getSiteList();
        }
    }
</script>

<style lang="less" scoped>
    .toolbar {
        .el-form-item {
            margin-bottom: 0;
        }
    }
</style>