<template>
    <section class="main_cont">
        <!-- 记录管理 -->
        <el-row class="toolbar bdr_radiu">
            <el-col :span="24" class="title">
                <i class="el-icon-info"></i>
                <span>记录管理</span>
            </el-col>

            <dg-table
                :data='recordData'
                :selection="true"
                :column-config="config"
                @filter-change='getFilter'
                @select-change="getselect"
                @page-change="getpage"></dg-table>
            <!-- 记录列表 -->
            <!--<el-table class="record_list" :data="recordData" border highlight-current-row v-loading="listLoading" @selection-change="recordSelsChange" height="220">-->
                <!--<el-table-column type="selection" width="35"></el-table-column>-->
                <!--<el-table-column type="index" width="35"></el-table-column>-->
                <!--<el-table-column prop="device" label="设备名称" width="100"></el-table-column>-->
                <!--<el-table-column prop="data" label="日期" width="100"></el-table-column>-->
                <!--<el-table-column prop="save_phone" label="存件人手机号" width="130"></el-table-column>-->
                <!--<el-table-column prop="taken_phone" label="取件人手机号" width="130"></el-table-column>-->
                <!--<el-table-column prop="time" label="时间" width="100"></el-table-column>-->
                <!--<el-table-column prop="cabinet_num" label="柜号" width="100"></el-table-column>-->
                <!--<el-table-column prop="phone_num" label="尾号" width="100"></el-table-column>-->
            <!--</el-table>-->
            <!-- 底部工具条 -->
            <!--<el-col :span="24" class="toolbar bottip">-->
                <!--<el-button type="danger" @click="adminBatchRemove" :disabled="this.recordSels.length===0">批量删除</el-button>-->
            <!--</el-col>-->
        </el-row>

        <!-- 账号管理 -->
        <el-row class="toolbar bdr_radiu">
            <el-col :span="24" class="title">
                <i class="el-icon-info"></i>
                <span>账号管理</span>
            </el-col>

            <el-form :inline="true">
                <el-col :span="22">
                    <el-form-item>
                        <el-input placeholder="请输入手机号码" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">根据手机号查找相关用户</el-button>
                    </el-form-item>
                </el-col>
            </el-form>



            <!--对客服认为异常的账号进行封禁，并发送通知信息给被封禁用户-->
            <!--解禁账号-->

            <!--用户账号会出现何种异常？有何种解决方法？-->

            <!-- 账号列表 -->
            <el-table class="user_list" :data="userData" border highlight-current-row v-loading="listLoading" @selection-change="userSelsChange" height="220">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column type="index" width="35"></el-table-column>
                <el-table-column prop="name" label="账号名称" width="600"></el-table-column>
                <el-table-column prop="type" label="账号类型" width="500"></el-table-column>

                <el-table-column fixed="right" label="操作" width="500">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" v-on:click="viewUserForm = true" @click="viewUser">查看</el-button>
                        <el-button type="text" size="small" @click="prohibition">封禁并通知</el-button>
                        <el-button type="text" size="small" @click="lifted">解禁</el-button>
                        <el-button type="text" size="small" v-on:click="checkUserForm = true" @click="checkUser">审核</el-button>
                        <el-button type="text" size="small" @click="delUser">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 底部工具条 -->
            <el-col :span="24" class="toolbar bottip">
                <el-button type="danger" @click="userBatchRemove" :disabled="this.userSels.length===0">批量删除</el-button>
            </el-col>
        </el-row>

        <!-- 查看记录 -->
        <!--<el-dialog title="查看记录" :close-on-click-modal="false" :visible.sync="viewDataForm">-->
            <!--记录管理-->
            <!--查看所有订单数据-->
            <!--记录状态-->
            <!--待取-->
            <!--已取出：用何种方式取出（& 被谁取出）-->
            <!--可以在记录页面直接开启记录相关的柜门-->
        <!--</el-dialog>-->

        <!-- 查看账号 -->
        <el-dialog title="查看账号" :close-on-click-modal="false" :visible.sync="viewUserForm">
            <!--查看骑手账号的操作记录-->
        </el-dialog>

        <!-- 审核账号 -->
        <el-dialog title="审核账号" :close-on-click-modal="false" :visible.sync="checkUserForm" :before-close="handleClose">

        </el-dialog>
    </section>
</template>

<script>
    import {
        searchdata,
    } from '../../filter/js/filter.js'

    export default {
        name: "data_manage",

        data() {
            return {
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示

                //filters
                config: [{
                        prop: 'device',
                        label: '设备名称',
                        width: '100',
                        filterConfig: {
                            ftn: '设备名称',
                            type: 'search',
                            key: 'device_id',
                            placeholder: '输入设备名称',
                            listinfo: {
                                handler: searchdata,
                                searchkey: 'name', // 用于搜索api对应的key
                                showkey: 'name' // 在列表中要显示的字段
                            }
                        }
                    }, {
                        prop: 'data',
                        label: '日期',
                        width: '100',
                        filterConfig: {
                            ftn: '日期',
                            hidebg: true,
                            type: 'date',
                            key: 'data'
                        }
                    }, {
                        prop: 'save_phone',
                        label: '存件人手机号',
                        width: '130',
                        filterConfig: {
                            ftn: '存件人手机号',
                            type: 'search',
                            key: 'save_phone_id',
                            placeholder: '输入存件人手机号',
                            listinfo: {
                                handler: searchdata,
                                searchkey: 'name', // 用于搜索api对应的key
                                showkey: 'name' // 在列表中要显示的字段
                            }
                        }
                    }, {
                        prop: 'taken_phone',
                        label: '取件人手机号',
                        width: '130',
                        filterConfig: {
                            ftn: '取件人手机号',
                            type: 'search',
                            key: 'taken_phone_id',
                            placeholder: '输入取件人手机号',
                            listinfo: {
                                handler: searchdata,
                                searchkey: 'name', // 用于搜索api对应的key
                                showkey: 'name' // 在列表中要显示的字段
                            }
                        }
                    }, {
                        prop: 'cabinet_num',
                        label: '柜号',
                        width: '100',
                        filterConfig: {
                            ftn: '柜号',
                            type: 'search',
                            key: 'cabinet_num_id',
                            placeholder: '柜号',
                            listinfo: {
                                handler: searchdata,
                                searchkey: 'name', // 用于搜索api对应的key
                                showkey: 'name' // 在列表中要显示的字段
                            }
                        }
                    }, {
                        prop: 'phone_num',
                        label: '尾号',
                        width: '100',
                        filterConfig: {
                            ftn: '尾号',
                            type: 'search',
                            key: 'phone_num_id',
                            placeholder: '尾号',
                            listinfo: {
                                handler: searchdata,
                                searchkey: 'name', // 用于搜索api对应的key
                                showkey: 'name' // 在列表中要显示的字段
                            }
                        }
                    }],

                // recordSels: [],  //记录列表选中列
                // viewDataForm: false,  //查看

                userSels: [],  //账号列表选中列
                viewUserForm: false,  //查看账号
                checkUserForm: false,  //审核账号

                //数据
                recordData: [{
                    device: '设备1',
                    data: '2001.1.1',
                    save_phone: '123456',
                    taken_phone: '456321',
                    time: '10:30',
                    cabinet_num: '398',
                    phone_num: '2561'
                }, {
                    device: '设备2',
                    data: '2002.2.2',
                    save_phone: '123456',
                    taken_phone: '456321',
                    time: '10:30',
                    cabinet_num: '398',
                    phone_num: '2561'
                }, {
                    device: '设备3',
                    data: '2003.3.3',
                    save_phone: '123456',
                    taken_phone: '456321',
                    time: '10:30',
                    cabinet_num: '398',
                    phone_num: '2561'
                }, {
                    device: '设备4',
                    data: '2004.4.4',
                    save_phone: '123456',
                    taken_phone: '456321',
                    time: '10:30',
                    cabinet_num: '398',
                    phone_num: '2561'
                }],

                userData: [{
                    date: '2016-05-02',
                    name: '账号1',
                    type: '用户账号',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '账号2',
                    type: '骑手账号',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '账号3',
                    type: '用户账号',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '账号4',
                    type: '骑手账号',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
            }
        },
        methods: {
            //关闭提示
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },

            //Filter
            getpage (page) {
                this.curpage = page;
                let allfilter = {
                    filters: this.filters,
                    page
                };
                let res = dofilter(allfilter);
                this.data = res.data
            },
            getFilter (val) {
                console.log(val);
                // let allfilter = {
                //     filters: val,
                //     page: 1
                // };
                // this.filters = val;
                // let res = dofilter(allfilter);
                // this.data = res.data;
                // this.pagenum = res.pagenum
            },
            getselect (val) {
                console.log(val)
            },

            //记录列表是否选中
            /*recordSelsChange (recordSels) {
                this.recordSels = recordSels;
            },*/
            //查看记录
            /*viewData () {
                console.log("查看记录");
            },*/
            //删除记录
            /*delRecord () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("删除记录");
                }).catch(() => {

                });
            },*/
            //记录批量删除
            /*adminBatchRemove: function () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("记录批量删除");
                }).catch(() => {

                });
            },*/

            //账号列表是否选中
            userSelsChange (userSels) {
                this.userSels = userSels;
            },
            //查看账号
            viewUser () {
                console.log("查看账号");
            },
            //封禁并通知
            prohibition () {
                console.log("封禁并通知");
            },
            //解禁账号
            lifted () {
                console.log("解禁账号");
            },
            //审核账号
            checkUser () {
                //账号审核（未来需求）
                console.log("审核账号");
            },
            //删除账号
            delUser () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("删除角色");
                }).catch(() => {

                });
            },
            //账号批量删除
            userBatchRemove: function () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("账号批量删除");
                }).catch(() => {

                });
            },
        }
    }
</script>

<style scoped>
    .title{
        margin-bottom: 10px;
    }
</style>