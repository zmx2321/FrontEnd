<template>
    <section>
        <!-- 按钮操作 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar" :span="24">
                    <el-col :span="2" class="mantit">设备</el-col>
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
                    <el-button @click="viewDeviceStatus" v-on:click="viewDeviceStatusForm = true" type="text" size="small">查看设备状态</el-button>
                    <el-button @click="viewDeviceCommunicationStatus" v-on:click="viewDeviceCommunicationStatusForm = true" type="text" size="small">查看设备通信状态</el-button>
                    <el-button @click="viewDeviceCabinetStatus" v-on:click="viewDeviceCabinetStatusForm = true" type="text" size="small">查看设备柜口状态</el-button>
                    <el-button @click="showQRCode" v-on:click="showQRCodeForm = true" type="text" size="small">显示设备的存取餐二维码</el-button>
                    <el-button @click="editPositionInfo" v-on:click="editPositionInfoForm = true" type="text" size="small">编辑位置信息</el-button>
                    <el-button @click="RemoteOpenCabinet" v-on:click="viewDeviceStatusForm = true" type="text" size="small">远程开柜</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加新的设备 -->
        <el-dialog title="添加新的设备" :close-on-click-modal="false" :visible.sync="addDeviceForm" :before-close="handleClose">

        </el-dialog>

        <!-- 查看设备状态 -->
        <el-dialog title="查看设备状态" :close-on-click-modal="false" :visible.sync="viewDeviceStatusForm">

        </el-dialog>

        <!-- 查看设备通信状态 -->
        <el-dialog title="查看设备通信状态" :close-on-click-modal="false" :visible.sync="viewDeviceCommunicationStatusForm">

        </el-dialog>

        <!-- 查看设备柜口状态 -->
        <el-dialog title="查看设备柜口状态" :close-on-click-modal="false" :visible.sync="viewDeviceCabinetStatusForm">

        </el-dialog>

        <!-- 显示设备的存取餐二维码 -->
        <el-dialog title="显示设备的存取餐二维码" :close-on-click-modal="false" :visible.sync="showQRCodeForm">

        </el-dialog>

        <!-- 编辑位置信息 -->
        <el-dialog title="编辑位置信息" :close-on-click-modal="false" :visible.sync="editPositionInfoForm" :before-close="handleClose">

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

                dialogVisible: false,  //关闭提示

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
                console.log("查看设备状态");
            },
            //查看设备通信状态
            viewDeviceCommunicationStatus () {
                console.log("查看设备通信状态");
            },
            //查看设备柜口状态
            viewDeviceCabinetStatus () {
                console.log("查看设备柜口状态");
            },
            //显示设备的存取餐二维码
            showQRCode () {
                console.log("显示设备的存取餐二维码");
            },
            //编辑位置信息
            editPositionInfo () {
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