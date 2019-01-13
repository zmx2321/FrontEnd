<template>
    <section class="main_cont">
        <!-- 记录管理 -->
        <el-row>
            <el-col :span="24" class="title">
                <i class="el-icon-info"></i>
                <span>记录管理</span>
            </el-col>

            <dg-table
                :data='record_info'
                :selection="true"
                :column-config="config"
                @filter-change='getFilter'
                @select-change="getselect"
                @page-change="getpage"></dg-table>
        </el-row>
    </section>
</template>

<script>
    import { getRecordInfo } from '../../../api/api.js';

    import {
        searchdata,
    } from '../../filter/js/filter.js'

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
                    pageNum: 1,
                    pageSize: 10
                },

                //记录信息
                record_info: [],

                //filters
                config: [/*{
                    prop: 'id',
                    label: 'id',
                    width: '60',
                }, */{
                    prop: 'packageNo',
                    label: '单号',
                    width: '220',
                }, {
                    prop: 'guiNo',
                    label: '设备编号',
                    width: '100',
                    listinfo: {
                        handler: searchdata,
                        searchkey: 'name', // 用于搜索api对应的key
                        showkey: 'name' // 在列表中要显示的字段
                    }
                }, {
                    prop: 'boxNo',
                    label: '柜口编号',
                    width: '100',
                }, {
                    prop: 'postmanMobile',
                    label: '骑手手机号',
                    width: '100',
                    listinfo: {
                        handler: searchdata,
                        searchkey: 'name', // 用于搜索api对应的key
                        showkey: 'name' // 在列表中要显示的字段
                    }
                }, {
                    prop: 'storeinAt',
                    label: '存餐时间',
                    width: '100',
                    filterConfig: {
                        ftn: '存餐时间',
                        hidebg: true,
                        type: 'date',
                        key: 'data'
                    }
                }, {
                    prop: 'takeoutBy',
                    label: '取餐人',
                    width: '100',
                }, {
                    prop: 'takeoutAt',
                    label: '取餐时间',
                    width: '100',
                    filterConfig: {
                        ftn: '取餐时间',
                        hidebg: true,
                        type: 'date',
                        key: 'data'
                    }
                }, {
                    prop: 'customerMobile',
                    label: '取餐手机',
                    width: '130',
                    filterConfig: {
                        ftn: '取餐手机',
                        type: 'search',
                        key: 'save_phone_id',
                        placeholder: '输入取餐手机号',
                        listinfo: {
                            handler: searchdata,
                            searchkey: 'name', // 用于搜索api对应的key
                            showkey: 'name' // 在列表中要显示的字段
                        }
                    }
                }, {
                    prop: 'openBoxKey',
                    label: '开柜密码',
                    width: '100'
                }, {
                    prop: 'status',
                    label: '订单状态',
                    width: '100',
                }],
            }
        },
        methods: {
            //获取记录信息
            getRecordInfo () {
                console.log("123");

                this.listLoading = true;

                let para = {
                    date: this.record_arg.date,
                    pageNum: this.record_arg.pageNum,
                    pageSize: this.record_arg.pageSize
                };

                console.log(para);

                getRecordInfo(qs.stringify(para)).then(res => {
                    this.record_info = res.data.data.list;
                    console.log(this.record_info);
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
        },
        created () {
            this.getRecordInfo();
        }
    }
</script>

<style scoped>
    .title{
        margin-bottom: 10px;
    }
</style>