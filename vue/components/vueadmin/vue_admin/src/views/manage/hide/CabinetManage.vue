<template>
    <section class="main_cont">
        <!-- 按钮操作 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item>
                            <el-input placeholder="请输入单个特定柜口ID" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="openCabinet">开启</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="openAllCabinet">一键开启所有柜口</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item>
                            <el-input placeholder="请输入设备编号" v-model="guiNo" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="searchDevCab">查询设备所属柜口</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <el-row>
            <!-- 柜口列表 -->
            <el-table class="cabinet_list centertab" :data="cabinet_info" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" height="600">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" width="60"></el-table-column>
                <el-table-column prop="boxNo" label="柜口编号" width="100"></el-table-column>
                <el-table-column prop="status" label="柜口状态" width="100"></el-table-column>

                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button @click="openCabinet" type="text" size="small">开启</el-button>
                        <el-button @click="viewDeviceCabinetStatus" v-on:click="viewDeviceCabinetStatusForm = true" type="text" size="small">查看设备柜口状态</el-button>
                        <el-button @click="delCabinet" type="text" size="small">删除柜口</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 底部工具条 -->
            <el-col :span="24" class="toolbar bottip">
                <el-button type="danger" @click="cabinetBatchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            </el-col>
        </el-row>

        <!-- 查看设备柜口状态 -->
        <el-dialog title="查看设备柜口状态" :close-on-click-modal="true" :visible.sync="viewDeviceCabinetStatusForm">

        </el-dialog>
    </section>
</template>

<script>
    import { getCabinetList } from '../../../api/api.js';

    export default {
        name: "cabinet_manage",

        data() {
            return {
                listLoading: false,  //lodding动画
                sels: [],  //列表选中列

                cabinet_info: [],  //柜口信息
                guiNo: "",  //柜口id

                dialogVisible: false,  //关闭提示

                viewDeviceCabinetStatusForm: false,  //查看设备柜口状态
            }
        },
        methods: {
            //获取柜口信息
            getCabinetList(){
                let para = {
                    guiNo: this.guiNo
                };
                getCabinetList(qs.stringify(para)).then(res => {
                    console.log(res);
                    this.cabinet_info = res.data.data;
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
            //开启柜口
            openCabinet () {
                console.log("开启柜口");
            },
            //一键开启所有柜口
            openAllCabinet () {
                console.log("开启所有柜口");
            },
            //查询设备所属柜口
            searchDevCab () {
                console.log("查询设备所属柜口");
                let para = {
                    guiNo: this.guiNo
                };
                getCabinetList(qs.stringify(para)).then(res => {
                    console.log(res);
                    this.cabinet_info = res.data.data;
                });
            },

            //查看设备柜口状态
            viewDeviceCabinetStatus () {
                console.log("查看设备柜口状态");
            },

            //设备列表是否选中
            selsChange (sels) {
                this.sels = sels;
            },
            //删除柜口
            delCabinet () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("删除柜口");
                }).catch(() => {

                });
            },
            //批量删除柜口
            cabinetBatchRemove: function () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("柜口批量删除");
                }).catch(() => {

                });
            }
        },
        created () {
            this.getCabinetList();
        }
    }
</script>

<style scoped>
    .toolbar{
        padding: 10px 10px 0 10px;
        margin: 10px 0;
    }

    .bottip{
        padding: 10px;
    }
</style>