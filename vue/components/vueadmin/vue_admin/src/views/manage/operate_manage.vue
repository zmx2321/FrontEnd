<template>
    <section class="main_cont">
        <el-row>
            <!-- 记录列表 -->
            <el-table class="device_list" :data="deviceData" border highlight-current-row v-loading="listLoading" @selection-change="deviceSelsChange" height="800">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column type="index" width="35"></el-table-column>
                <el-table-column prop="name" label="设备名称" width="200"></el-table-column>
                <el-table-column prop="user" label="用户" width="300"></el-table-column>
                <el-table-column prop="address" label="地址" width="600"></el-table-column>

                <el-table-column fixed="right" label="操作" width="600">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="deviceBannerSet" v-on:click="deviceBannerForm = true">设置banner图</el-button>
                        <el-button type="text" size="small" @click="deviceInfoSet" v-on:click="deviceInfoForm = true">设置模板通知</el-button>
                        <el-button type="text" size="small" @click="delDevice">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 底部工具条 -->
            <el-col :span="24" class="toolbar bottip">
                <el-button type="danger" @click="deviceBatchRemove" :disabled="this.deviceSels.length===0">批量删除</el-button>
                <el-button type="danger" @click="bannerBatchSet" :disabled="this.deviceSels.length===0" v-on:click="bannerBatchForm = true">批量设置banner</el-button>
                <el-button type="danger" @click="infoBatchSet" :disabled="this.deviceSels.length===0" v-on:click="infoBatchForm = true">批量设置模板通知消息</el-button>
            </el-col>
        </el-row>

        <!-- 设置banner图 -->
        <el-dialog title="设置banner图" :close-on-click-modal="true" :visible.sync="deviceBannerForm" :before-close="handleClose">
            <!--查看banner图-->
            <!--可以更改广告轮播页面的图片和轮播速度，可以上传各种规格的图片，形成图片库，banner图片根据规格自动展示图片库的图片，一次改动所有位置，需要有方式可以清晰的展示所修改的图片的位置，可以预览效果-->
        </el-dialog>

        <!-- 设置模板通知 -->
        <el-dialog title="设置模板通知" :close-on-click-modal="true" :visible.sync="deviceInfoForm" :before-close="handleClose">
            <!--编辑公众号的模板通知消息-->
        </el-dialog>

        <!-- 批量设置banner -->
        <el-dialog title="批量设置banner" :close-on-click-modal="true" :visible.sync="bannerBatchForm" :before-close="handleClose">
            <!--是否可以根据区域设置不同的banner？-->
        </el-dialog>

        <!-- 批量设置模板通知 -->
        <el-dialog title="批量设置模板通知" :close-on-click-modal="true" :visible.sync="infoBatchForm" :before-close="handleClose">
            <!--是否可以针对不同的地区或用户标签设置不同的模板通知消息？-->
        </el-dialog>
    </section>
</template>

<script>
    export default {
        name: "operate_manage",

        data() {
            return {
                listLoading: false,  //lodding动画
                deviceSels: [],  //列表选中列

                dialogVisible: false,  //关闭提示

                deviceBannerForm: false,  //设置banner图
                bannerBatchForm: false,  //批量设置banner

                deviceInfoForm: false,  //设置模板通知
                infoBatchForm: false,  //批量设置模板通知消息

                //数据
                deviceData: [{
                    name: '设备1',
                    user: '用户1',
                    address: '地址1',
                }, {
                    name: '设备2',
                    user: '用户2',
                    address: '地址2',
                }, {
                    name: '设备3',
                    user: '用户3',
                    address: '地址3',
                }, {
                    name: '设备4',
                    user: '用户4',
                    address: '地址4',
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

            //设备列表是否选中
            deviceSelsChange (deviceSels) {
                this.deviceSels = deviceSels;
            },

            //设置banner图
            deviceBannerSet () {
                console.log("设置banner图");
            },
            //设置模板通知
            deviceInfoSet () {
                console.log("设置模板通知");
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

            //批量设置banner
            bannerBatchSet () {
                console.log("批量设置banner");
            },
            //批量设置模板通知
            infoBatchSet () {
                console.log("批量设置模板通知");
            },
            //批量删除设备
            deviceBatchRemove: function () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("批量删除设备");
                }).catch(() => {

                });
            }
        },
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

    .device_list{
        width: 100%;
    }

    .bottip{
        padding: 10px;
    }
</style>