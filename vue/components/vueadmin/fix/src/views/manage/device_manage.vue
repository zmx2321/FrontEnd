<template>
    <section>
        <!-- 按钮操作 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar" :span="24">
                    <el-col :span="2" class="mantit">设备</el-col>
                    <el-col :span="22">
                        <el-form-item>
                            <el-input placeholder="请输入设备名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getDevices">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addDevice">添加新的设备</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="restartDevice">重启设备</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col class="toolbar" :span="24">
                    <el-col :span="2" class="mantit">柜口</el-col>
                    <el-col :span="22">
                        <el-form-item>
                            <el-input placeholder="请输入单个特定柜口ID"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="openCabinet">开启</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="openAllCabinet">一键开启所有柜口</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <!-- 设备列表 -->
        <el-table class="device_list" :data="tableData" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" height="600">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column prop="name" label="设备名称" width="950"></el-table-column>

            <el-table-column fixed="right" label="操作" width="750">
                <template slot-scope="scope">
                    <el-button @click="viewDeviceStatus" type="text" size="small">查看设备状态</el-button>
                    <el-button @click="viewDeviceCommunicationStatus" type="text" size="small">查看设备通信状态</el-button>
                    <el-button @click="viewDeviceCabinetStatus" type="text" size="small">查看设备柜口状态</el-button>
                    <el-button @click="showQRCode" type="text" size="small">显示设备的存取餐二维码</el-button>
                    <el-button @click="editPositionInfo" type="text" size="small">编辑位置信息</el-button>
                    <el-button @click="RemoteOpenCabinet" type="text" size="small">远程开柜</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加新的设备 -->
        <el-dialog title="添加新的设备" v-model="addDeviceForm" :close-on-click-modal="false">

        </el-dialog>

        <!-- 查看设备状态 -->
        <el-dialog title="查看设备状态" v-model="viewDeviceStatusForm" :close-on-click-modal="false">

        </el-dialog>

        <!-- 查看设备通信状态 -->
        <el-dialog title="查看设备通信状态" v-model="viewDeviceCommunicationStatusForm" :close-on-click-modal="false">

        </el-dialog>

        <!-- 查看设备柜口状态 -->
        <el-dialog title="查看设备柜口状态" v-model="viewDeviceCabinetStatusForm" :close-on-click-modal="false">

        </el-dialog>

        <!-- 显示设备的存取餐二维码 -->
        <el-dialog title="显示设备的存取餐二维码" v-model="showQRCodeForm" :close-on-click-modal="false">

        </el-dialog>

        <!-- 编辑位置信息 -->
        <el-dialog title="编辑位置信息" v-model="editPositionInfoForm" :close-on-click-modal="false">

        </el-dialog>

        <!-- 底部工具条 -->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
        </el-col>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                listLoading: false,  //lodding动画
                sels: [],  //列表选中列

                //添加新的设备
                addDeviceForm: false,

                //数据
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],

                //查看设备状态
                viewDeviceStatusForm: false,

                //查看设备通信状态
                viewDeviceCommunicationStatusForm: false,

                //查看设备柜口状态
                viewDeviceCabinetStatusForm: false,

                //显示设备的存取餐二维码
                showQRCodeForm: false,

                //编辑位置信息
                editPositionInfoForm: false,
            }
        },
        methods: {
            //查询设备信息
            getDevices (){
                console.log("查询设备信息");
            },
            //显示添加设备界面
            addDevice () {
                console.log("添加设备");
                this.addDeviceForm = true;
            },
            //重启设备
            restartDevice () {
                console.log("重启设备");
            },

            //开启柜口
            openCabinet () {
                console.log("开启柜口");
            },
            //一键开启所有柜口
            openAllCabinet () {
                console.log("开启所有柜口");
            },

            //查看设备状态
            viewDeviceStatus () {
                this.viewDeviceStatusForm = true;
                console.log("查看设备状态");
            },
            //查看设备通信状态
            viewDeviceCommunicationStatus () {
                this.viewDeviceCommunicationStatusForm = true;
                console.log("查看设备通信状态");
            },
            //查看设备柜口状态
            viewDeviceCabinetStatus () {
                this.viewDeviceCabinetStatusForm = true;
                console.log("查看设备柜口状态");
            },
            //显示设备的存取餐二维码
            showQRCode () {
                this.showQRCodeForm = true;
                console.log("显示设备的存取餐二维码");
            },
            //编辑位置信息
            editPositionInfo () {
                this.editPositionInfoForm = true;
                console.log("编辑位置信息");
            },
            //远程开柜
            RemoteOpenCabinet () {
                console.log("远程开柜");
            },

            //选中批量删除按钮可以点击
            selsChange (sels) {
                this.sels = sels;
            },
            
            //批量删除
            batchRemove: function () {
                console.log("批量删除");
            }
        },
    }

</script>

<style scoped>
    .toolbar{
        margin: 10px 0px;
    }

    .mantit{
        color: #5d5656;
        line-height: 35px;
        text-align: center;
    }

    .device_list{
        width: 100%;
    }
</style>