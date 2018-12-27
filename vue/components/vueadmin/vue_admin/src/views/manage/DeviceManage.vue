<template>
    <section class="main_cont">
        <!-- 按钮操作 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item>
                            <el-input placeholder="请输入设备名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getDevices">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="addDeviceForm = true" @click="addDevice">添加新的设备</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="restartDevice">重启设备</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <el-row>
            <!-- 设备列表 -->
            <el-table class="device_list" :data="device_info" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" height="600">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" width="60" align="center"></el-table-column>
                <el-table-column prop="guiNo" label="设备编号" width="150"></el-table-column>
                <el-table-column prop="guiName" label="设备名称" width="150"></el-table-column>
                <el-table-column prop="manufacturer" label="设备生产厂商" width="200"></el-table-column>
                <el-table-column prop="location" label="设备地址" width="350"></el-table-column>

                <el-table-column fixed="right" label="操作" width="500">
                    <template slot-scope="scope">
                        <el-button @click="viewDeviceStatus" v-on:click="viewDeviceStatusForm = true" type="text" size="small">查看设备状态</el-button>
                        <!--<el-button @click="viewDeviceCommunicationStatus" v-on:click="viewDeviceCommunicationStatusForm = true" type="text" size="small">查看设备通信状态</el-button>-->
                        <el-button @click="showQRCode" v-on:click="showQRCodeForm = true" type="text" size="small">显示设备的存取餐二维码</el-button>
                        <el-button @click="editPositionInfo" v-on:click="editPositionInfoForm = true" type="text" size="small">编辑位置信息</el-button>
                        <!--<el-button @click="delDevice" type="text" size="small">删除设备</el-button>-->
                    </template>
                </el-table-column>
            </el-table>

            <!-- 底部工具条 -->
            <!--<el-col :span="24" class="toolbar bottip">-->
                <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <!--</el-col>-->
        </el-row>

        <!-- 添加新的设备 -->
        <el-dialog title="添加新的设备" :close-on-click-modal="false" :visible.sync="addDeviceForm" :before-close="handleClose">

        </el-dialog>

        <!-- 查看设备状态 -->
        <el-dialog title="查看设备状态" :close-on-click-modal="true" :visible.sync="viewDeviceStatusForm">

        </el-dialog>

        <!-- 查看设备通信状态 -->
        <el-dialog title="查看设备通信状态" :close-on-click-modal="true" :visible.sync="viewDeviceCommunicationStatusForm">

        </el-dialog>

        <!-- 显示设备的存取餐二维码 -->
        <el-dialog title="显示设备的存取餐二维码" :close-on-click-modal="true" :visible.sync="showQRCodeForm">

        </el-dialog>

        <!-- 编辑位置信息 -->
        <el-dialog title="编辑位置信息" :close-on-click-modal="false" :visible.sync="editPositionInfoForm" :before-close="handleClose">

        </el-dialog>
    </section>
</template>

<script>
    import { getDeviceList } from '../../api/api.js';

    export default {
        name: "device_manage",

        data() {
            return {
                listLoading: false,  //lodding动画
                sels: [],  //列表选中列

                //设备信息
                device_info: [],

                dialogVisible: false,  //关闭提示

                //添加新的设备
                addDeviceForm: false,

                //查看设备状态
                viewDeviceStatusForm: false,

                //查看设备通信状态
                viewDeviceCommunicationStatusForm: false,

                //显示设备的存取餐二维码
                showQRCodeForm: false,

                //编辑位置信息
                editPositionInfoForm: false,
            }
        },
        methods: {
            //获取设备信息
            getDeviceList(){
                getDeviceList().then(res => {
                    this.device_info = res.data.data;
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
            //查询设备信息
            getDevices (){
                console.log("查询设备信息");
            },
            //显示添加设备界面
            addDevice () {
                console.log("添加设备");
            },
            //重启设备
            restartDevice () {
                console.log("重启设备");
            },

            //查看设备状态
            viewDeviceStatus () {
                console.log("查看设备状态");
            },
            //查看设备通信状态
            viewDeviceCommunicationStatus () {
                console.log("查看设备通信状态");
            },
            //显示设备的存取餐二维码
            showQRCode () {
                console.log("显示设备的存取餐二维码");
            },
            //编辑位置信息
            editPositionInfo () {
                console.log("编辑位置信息");
            },

            //设备列表是否选中
            selsChange (sels) {
                this.sels = sels;
            },
            //删除设备
            delDevice () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("删除设备");
                }).catch(() => {

                });
            },
            //批量删除设备
            batchRemove: function () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("设备批量删除");
                }).catch(() => {

                });
            }
        },
        created () {
            this.getDeviceList();
        }
    }
</script>

<style scoped>
    .toolbar{
        padding: 10px 10px 0 10px;
        margin: 10px 0;
    }

    .device_list{
        width: 100%;
    }
</style>