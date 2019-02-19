<template>
    <section class="main_cont">
        <!-- 表单 -->
        <el-row>
            <el-form :model="cabinet_arg" :inline="true" status-icon :rules="rules">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item>
                            <el-input v-model="cabinet_arg.boxNo" placeholder="请输入单个特定格口ID" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="openSpecificCabinets">开启</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="openAllCabinet">一键开启所有格口</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="22">
                        <el-form-item>
                            <el-input placeholder="请输入设备编号" v-model="cabinet_arg.guiNo" clearable></el-input>
                        </el-form-item>
                        <!--{{ guiNos }}-->
                        <!--<el-dropdown>
                            <el-button type="primary">
                                {{ guicur }}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in guiNos" @click.native="drop(item)" :key="item.index">{{ item }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>-->
                        <!--<el-form-item label="筛选" class="intxt">
                            <el-select v-model="guicur" placeholder="请选择配置类型">
                                &lt;!&ndash;<option :selected="isSelect" value="默认值">默认值</option>&ndash;&gt;
                                <el-option v-for="guicur in guiNos" value="0" :key="guicur.index">{{ guicur }}</el-option>
                            </el-select>
                        </el-form-item>-->
                        <el-form-item>
                            <el-button type="primary" @click="searchDevCab">查询设备所属格口</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <el-row>
            <!-- 格口列表 -->
            <el-table class="cabinet_list" :data="cabinet_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 255px)">
                <el-table-column prop="boxNo" label="格口编号" width="auto" align="center"></el-table-column>

                <el-table-column prop="status" label="格口状态" width="auto" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.status == 0 ? "待取" : "已取" }}
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="320">
                    <template slot-scope="scope">
                        <el-button @click="openCabinet(scope.row)" type="text" size="small" v-if="scope.row.status == 0">开启</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <!-- 查看设备格口状态 -->
        <el-dialog title="查看设备格口状态" :close-on-click-modal="true" :visible.sync="viewDeviceCabinetStatusVisible">
            <!--{{ boxStatusInfo }}-->
            {{ boxStatusInfo.code }}
            {{ boxStatusInfo.msg }}
            {{ boxStatusInfo.data }}
            <!--<el-form :model="boxStatusInfo" label-width="100px">-->
                <!--<el-form-item label="状态" prop="code">-->
                    <!--<span v-model="boxStatusInfo.code"></span>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="数据" prop="data">-->
                    <!--<el-input v-model="boxStatusInfo.data" placeholder="请输入柜端新地址" clearable></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="提示" prop="msg">-->
                    <!--<el-input v-model="boxStatusInfo.msg" placeholder="请输入柜端新地址" clearable></el-input>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        </el-dialog>
    </section>
</template>

<script>
    import {
        getDeviceList, // 设备列表
        getCabinetList, //获取格口信息
        openBoxNo,  // 开启单个特定格口
        openBoxAll,  //开启所有格口
        getBoxStatus,  //查看设备格口状态
    } from '../../../api/api.js';

    export default {
        name: "cabinet_manage",

        data() {
            return {
                /**
                 *  common
                 */
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示
                sels: [],  //列表选中列

                // 设备列表
                guiNos: [],

                guicur: "1",

                /**
                 */
                cabinet_info: [],  //存放格口信息列表数据

                // 格口参数
                cabinet_arg: {
                    // guiNo: undefined ? "TA104" : this.$route.params.guiNo,
                    guiNo: this.$route.params.guiNo,  //柜端编号（this.$route.params.guiNo;）
                    boxNo: "",  //格口编号
                },

                //格口状态信息
                boxStatusInfo: [],

                /**
                 *  弹出表单界面
                 */
                viewDeviceCabinetStatusVisible: false,  //查看设备格口状态

                rules: {
                    boxNo: [
                        { required: true, message: "格口编号不能为空", trigger: "blur" },
                    ]
                }
            }
        },
        methods: {
            /**
             * common
             */
            //关闭提示
            handleClose(done) {
                this.$confirm('确认关闭？').then(() => {
                    done();
                }).catch(err => {
                    throw err;
                });
            },
            //设备列表是否选中
            selsChange (sels) {
                this.sels = sels;
            },
            //表单重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            drop(item) {
                console.log(item)
                this.guicur = item;
            },

            /**
             * api
             */
            //获取设备信息
            getDeviceList(){
                getDeviceList().then(res => {  //请求成功
                    let datalist = res.data.data;

                    for (let i=0; i<datalist.length; i++){
                        this.guiNos.push(datalist[i].guiNo);
                    }

                    console.log(this.guiNos);
                }).catch({});
            },

            /**
             * api
             */
            //获取格口信息
            getCabinetList(){
                /*if (this.cabinet_arg.guiNo === undefined) {
                    this.cabinet_arg.guiNo = "180921002";
                }*/

                let para = {
                    guiNo: this.cabinet_arg.guiNo
                };
                getCabinetList(qs.stringify(para)).then(res => {
                    // console.log(res);

                    if (!res.data.data){
                        this.$message({
                            message: "查不到格口编号，请在设备管理列表中选择具体设备查看格口状态！",
                            type: "warning"
                        });

                        this.$router.push("device_manage");
                    }

                    this.cabinet_info = res.data.data;
                }).catch({});
            },
            //开启单个格口
            openSpecificCabinets () {
                this.listLoading = true;  //加载loading

                let para = {
                    guiNo: this.cabinet_arg.guiNo,
                    boxNo: this.cabinet_arg.boxNo
                };
                openBoxNo(qs.stringify(para)).then(() => {
                    this.listLoading = false;  //停止加载loading

                    //成功提示
                    this.$message({
                        message: para.guiNo + "设备" + para.boxNo + "格口" + "  开启成功",
                        type: 'success'
                    });
                }).catch({});
            },
            //开启格口
            openCabinet (row) {
                this.listLoading = true;  //加载loading

                let para = {
                    guiNo: this.cabinet_arg.guiNo,
                    boxNo: this.cabinet_arg.boxNo
                };
                openBoxNo(qs.stringify(para)).then(() => {
                    this.listLoading = false;  //停止加载loading

                    //获取当前记录格口编号
                    let boxNo = Object.assign({}, row).boxNo;

                    //成功提示
                    this.$message({
                        message: boxNo + " " + '开启成功',
                        type: 'success'
                    });
                }).catch({});
            },
            //一键开启所有格口
            openAllCabinet () {
                this.listLoading = true;  //加载loading

                let para = {
                    guiNo: this.cabinet_arg.guiNo
                };
                openBoxAll(qs.stringify(para)).then(() => {
                    //成功提示
                    this.$message({
                        message: para.guiNo + " " + '开启成功',
                        type: 'success'
                    });

                    this.listLoading = false;  //停止加载loading
                }).catch({});
            },
            //查询设备所属格口
            searchDevCab () {
                console.log("查询设备所属格口");
                let para = {
                    guiNo: this.cabinet_arg.guiNo
                };
                getCabinetList(qs.stringify(para)).then(res => {
                    this.cabinet_info = res.data.data;
                }).catch({});
            },
            //查看设备格口状态
            viewDeviceCabinetStatus () {
                this.listLoading = true;  //加载loading

                let para = {
                    guiNo: this.cabinet_arg.guiNo,
                    boxNo: this.cabinet_arg.boxNo
                };
                getBoxStatus(qs.stringify(para)).then((res) => {
                    //console.log(res);
                    this.boxStatusInfo = res.data;

                    console.log(this.boxStatusInfo);

                    this.listLoading = false;  //停止加载loading
                }).catch({});
            },
            //删除格口
            delCabinet () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("删除格口");
                }).catch(() => {

                });
            },
            //批量删除格口
            cabinetBatchRemove: function () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("格口批量删除");
                }).catch(() => {

                });
            }
        },
        created () {
            this.getCabinetList();
            // this.getDeviceList();
        }
    }
</script>

<style scoped>
    .toolbar{
        padding: 10px 10px 0 10px;
        margin: 10px 0;
    }
</style>