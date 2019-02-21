<template>
    <section class="main_cont">
        <!-- 表单 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item>
                            <el-input v-model="guiNo" placeholder="请输入设备编号或名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getDevices">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addConfigureAllVisible = true">一键配置</el-button>
                        </el-form-item>
                        <!--<el-form-item>-->
                            <!--<el-button type="primary" @click="addDevice" v-on:click="addDeviceVisible = true">添加新的设备</el-button>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item>
                            <el-button type="primary" @click="restartDevice">重启设备</el-button>
                        </el-form-item>-->
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <el-row>
            <!-- 设备列表 -->
            <el-table class="device_list" :data="device_info" border highlight-current-row v-loading="listLoading" @selection-change="selsChange">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <!--<el-table-column prop="id" label="id" width="100"></el-table-column>-->
                <el-table-column prop="guiNo" label="设备编号" width="100" align="center"></el-table-column>

                <el-table-column prop="guiName" label="设备名称" width="120" align="center"></el-table-column>

                <el-table-column prop="location" label="设备地址" width="auto"></el-table-column>

                <!--<el-table-column prop="manufacturer" label="设备生产厂商" width="220" align="center"></el-table-column>-->

                <el-table-column label="设备生产厂商" width="auto" align="center" :formatter="formatType"></el-table-column>

                <el-table-column prop="tcpStatus" label="设备状态" width="auto" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="520">
                    <template slot-scope="scope">
                        <el-button @click="viewBanner(scope.row)" type="text" size="small">修改配置</el-button>
                        <el-button @click="viewDeviceCabinet(scope.row)" type="text" size="small">查看设备格口</el-button>
                        <!--<el-button @click="viewDeviceStatus" v-on:click="viewDeviceStatusVisible = true" type="text" size="small">查看设备状态</el-button>-->
                        <!--<el-button @click="viewDeviceCommunicationStatus" v-on:click="viewDeviceCommunicationStatusVisible = true" type="text" size="small">查看设备通信状态</el-button>-->
                        <el-button @click="showQRCode(scope.row)" v-on:click="showQRCodeVisible = true" type="text" size="small">显示设备的存取餐二维码</el-button>
                        <el-button @click="editPositionInfo(scope.row)" v-on:click="editPositionVisible = true" type="text" size="small">编辑位置信息</el-button>
                        <el-button type="text" size="small" @click="editGuiName(scope.row)" v-on:click="editGuiNameVisible = true">修改设备名称</el-button>
                        <!--<el-button type="text" size="small" @click="refreshBox(scope.row)">刷新柜口列表</el-button>-->
                        <!--<el-button @click="delDevice" type="text" size="small">删除设备</el-button>-->
                    </template>
                </el-table-column>
            </el-table>

            <!-- 底部工具条 -->
            <!--<el-col :span="24" class="toolbar bottip">-->
                <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <!--</el-col>-->
        </el-row>

        <!-- 一键配置 -->
        <el-dialog title="一键配置" @keyup.enter.native="addConfigureAllSubmit('addConfigureAllForm')" :close-on-click-modal="false" :visible.sync="addConfigureAllVisible" :before-close="handleClose">
            <el-form :model="addConfigureAllData" status-icon :rules="addConfigureAllRules" ref="addConfigureAllForm" label-width="120px">
                <el-form-item label="上传文件">
                    <!--action= "http://10.10.10.199:8080/"-->
                    <!--action = "http://postapi.lxstation.com/"-->
                    <el-upload
                            action = "http://postapi.lxstation.com/"
                            ref='upload'
                            :before-remove="beforeRemove"
                            :on-change="addConfigureAllChange"
                            multiple
                            :limit="upload_arg.limit"
                            :on-exceed="handleExceed"
                            :file-list="upload_arg.fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item label="配置类型" class="intxt">
                    <el-select v-model="addConfigureAllData.type" placeholder="请选择配置类型">
                        <el-option label="存件语音" value="1"></el-option>
                        <el-option label="取件语音" value="2"></el-option>
                        <el-option label="取件成功语音" value="3"></el-option>
                        <el-option label="banner" value="4"></el-option>
                        <el-option label="锁屏广告" value="5"></el-option>
                        <el-option label="存件页面底图" value="6"></el-option>
                        <el-option label="取件页面底图" value="7"></el-option>
                        <el-option label="广告视频" value="8"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="说明" prop="content">
                    <el-input type="textarea" v-model="addConfigureAllData.content" placeholder="请输入配置说明" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addConfigureAllSubmit('addConfigureAllForm')">提交</el-button>
                    <el-button @click="resetForm('addConfigureAllForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


        <!-- 显示设备的存取餐二维码 -->
        <el-dialog title="显示设备的存取餐二维码" :close-on-click-modal="true" :visible.sync="showQRCodeVisible">
            <el-row :span="24">
                <el-col :span="12" class="show_QRcode f-oh">
                    <h2>存餐二维码</h2>
                    <div class="QRcode_img">
                        <iframe :src="iframeData.save_src" ref="save_iframe" scrolling="no"></iframe>
                    </div>
                </el-col>
                <el-col :span="12" class="show_QRcode f-oh">
                    <h2>取餐二维码</h2>
                    <div class="QRcode_img">
                        <iframe :src="iframeData.take_src" ref="take_iframe" scrolling="no"></iframe>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>

        <!-- 编辑位置信息 -->
        <el-dialog title="编辑位置信息" @keyup.enter.native="editPositionSubmit('editPositionForm')" :close-on-click-modal="false" :visible.sync="editPositionVisible" :before-close="handleClose">
            <el-form :model="editPosition" status-icon :rules="editPositionRules" ref="editPositionForm" label-width="100px">
                <el-form-item label="柜端编号" prop="guiNo">
                    <el-input v-model="editPosition.guiNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="柜端新地址" prop="location">
                    <el-input v-model="editPosition.location" placeholder="请输入柜端新地址" clearable class="address_input"></el-input>
                    <el-button @click="getLocation">查询</el-button>
                </el-form-item>
                <el-form-item label="经度" prop="latitude">
                    <el-input v-model="editPosition.latitude" placeholder="请输入经度" clearable></el-input>
                </el-form-item>
                <el-form-item label="纬度" prop="longitude">
                    <el-input v-model="editPosition.longitude" placeholder="请输入经度" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editPositionSubmit('editPositionForm')">提交</el-button>
                    <el-button @click="resetForm('editPositionForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <div id="atlas"></div>
        </el-dialog>

        <!-- 修改设备名称 -->
        <el-dialog title="修改设备名称" :close-on-click-modal="false" :visible.sync="editGuiNameVisible" :before-close="handleClose">
            <el-form :model="editGuiNameData" status-icon :rules="editGuiNameRules" ref="editGuiNameForm" label-width="100px">
                <el-form-item label="柜端编号" prop="guiNo">
                    <el-input v-model="editGuiNameData.guiNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="柜端新名称" prop="location">
                    <el-input v-model="editGuiNameData.name" placeholder="请输入柜端新名称" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="editGuiNameSubmit('editGuiNameForm')">提交</el-button>
                    <el-button @click="resetForm('editGuiNameForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    /**
     * 获取接口地址
     */
    import {
        getDeviceList, // 设备列表
        addConfigure,  // 添加配置
        refreshBox,  // 刷新柜口列表
        updateLocation, // 修改设备地址
        updateName,  // 修改设备名称
        getQRCode,   // 设备存取餐二维码
        getDevice,  // 查询设备
    } from '../../api/api.js';

    import { TMap } from '../../api/parking'

    export default {
        name: "device_manage",

        data() {
            // 数字验证
            let getLocation = (rule, value, callback) => {
                this.getLocation();

                callback();
            };

            return {
                /**
                 * common
                 */
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示
                sels: [],  //列表选中列

                guiNo: '',  //柜端编号

                iframeData: {
                    save_src: '',
                    take_src: '',
                },

                /**
                 * 设备列表
                 */
                device_info: [],  //存放设备信息列表数据

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addDeviceVisible: false,  // 添加新的设备界面
                viewDeviceStatusVisible: false,  // 查看设备状态界面
                viewDeviceCommunicationStatusVisible: false,  // 查看设备通信状态界面
                showQRCodeVisible: false,  // 设备的存取餐二维码界面
                editPositionVisible: false,  // 编辑设备位置信息界面
                addConfigureAllVisible: false,  // 一键配置界面
                editGuiNameVisible: false,  // 修改设备名称

                /**
                 * 二维码
                 */
                // QRCodeInfo: {
                //     guiNo: '',  //柜端编号
                //     type: 0  //状态
                // },

                // 上传图片参数
                upload_arg: {
                    limit:1,
                    fileFile: [],
                    fileList: []
                },

                /**
                 * 一键配置
                 */
                // 一键配置数据
                addConfigureAllData: {
                    guiNos: "",
                    type: "",  // 类型 1 存件语音 2 取件语音 3 取件成功语音 4 banner 5 锁屏广告 6 存件页面底图 7 取件页面底图 8 广告视频
                    content: "",  // 描述文字
                },

                // 验证添加用户界面数据
                addConfigureAllRules: {
                    content: [
                        { required: true, message: '描述文字不能为空！', trigger: 'blur' }
                    ]
                },

                /**
                 *  编辑设备位置信息
                 */
                //编辑位置信息界面数据
                editPosition: {
                    guiNo: '',  //柜端编号
                    location: '',  //柜端新地址
                    longitude: "",  // 经度
                    latitude: ""  // 纬度
                },
                //验证编辑位置信息界面数据
                editPositionRules: {
                    location: [
                        { required: true, message: '柜端新地址不能为空', trigger: 'blur' },
                        { min: 2, message: "长度在大于2个字符", trigger: "blur" },
                        { validator: getLocation, trigger: 'blur' }
                    ]
                },

                /**
                 *  编辑设备名称
                 */
                // 编辑设备名称界面数据
                editGuiNameData: {
                    guiNo: '',  // 设备编号
                    name: '',  // 设备名称
                },
                // 验证编辑设备名称界面数据
                editGuiNameRules: {
                    name: [
                        { required: true, message: '设备名称不能为空', trigger: 'blur' },
                    ]
                },
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

            /**
             * el-upload common
             */
            // 文件超出个数限制时的钩子
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 ${this.upload_arg.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            // 删除文件之前的钩子
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },

            /**
             *  获取地址经纬度
             */
            getLocation () {
                // console.log("获取地址经纬度");

                TMap().then(qq => {
                    // Geocoder
                    let geo = new qq.maps.Geocoder();

                    // 地址
                    geo.getLocation(this.editPosition.location);

                    // console.log(geo);

                    geo.setComplete(res => {
                        // 经纬度
                        // console.log(res.detail.location);

                        this.editPosition.latitude = res.detail.location.lng;
                        this.editPosition.longitude = res.detail.location.lat;

                        let map = new qq.maps.Map(document.getElementById('atlas'),{
                            center: res.detail.location,//将经纬度加到center属性上
                            zoom: 16,//缩放
                            draggable: true,//是否可拖拽
                            scrollwheel: true,//是否可滚动缩放
                            disableDoubleClickZoom: false
                        });

                        new qq.maps.Marker({
                            position: res.detail.location,//标记的经纬度
                            animation: qq.maps.MarkerAnimation.BOUNCE,//标记的动画
                            map: map//标记的地图
                        })
                    });
                });
            },

            /**
             * map
             */
            map () {
                let that = this;

                TMap().then(qq => {
                    // 获取接口经纬度
                    let center = new qq.maps.LatLng(that.editPosition.longitude, that.editPosition.latitude);

                     // 绘制地图
                    var map = new qq.maps.Map(document.getElementById('atlas'), {
                        //这里经纬度代理表进入地图显示的中心区域
                        center: center,
                        zoom: 13
                    });

                    // 坐标点添加标记
                    new qq.maps.Marker({
                        position: center,
                        animation: qq.maps.MarkerAnimation.DOWN,  // 标记的动画(一次：qq.maps.MarkerAnimation.DOWN，持续：qq.maps.MarkerAnimation.BOUNCE)
                        map: map
                    });

                    //添加点击事件
                    qq.maps.event.addListener(map,'click', event => {
                        // console.log(event.latLng);
                    });
                });
            },

            /**
             * api
             */
            //获取设备信息
            getDeviceList(){
                this.listLoading = true;

                getDeviceList().then(res => {  //请求成功
                    // console.log(res);

                    this.listLoading = false;
                    this.device_info = res.data.data;  //接口数据赋值页面数据进行双向绑定
                }).catch({});
            },

            // 跳转查看设备格口
            viewDeviceCabinet (row) {
                //跳转cabinet_manage组件并传递设备编号
                let guiNo = Object.assign({}, row).guiNo;  //获取当前记录(行)设备编号

                if (guiNo) {  //如果设备编号存在跳转
                    this.$router.push({
                        name: "cabinet_manage",
                        params: {
                            guiNo: Object.assign({}, row).guiNo
                        }
                    });
                } else {
                    this.$message({
                        message: '无设备编号',
                        type: 'warning'
                    });
                }
            },

            // 跳转修改配置
            viewBanner (row) {
                //跳转operate_manage组件并传递设备编号
                let guiNo = Object.assign({}, row).guiNo;  //获取当前记录(行)设备编号

                if (guiNo) {  //如果设备编号存在跳转
                    this.$router.push({
                        name: "configure_manage",
                        params: {
                            guiNo: Object.assign({}, row).guiNo
                        }
                    });

                    // console.log(guiNo);
                } else {
                    this.$message({
                        message: '无设备编号',
                        type: 'warning'
                    });
                }
            },
            //查询设备信息
            getDevices (){
                this.listLoading = true;

                let para = {
                    guiNo: this.guiNo,
                };

                getDevice(para).then(res => {
                    // console.log(para);
                    this.listLoading = false;
                    this.device_info = res.data.data;  //渲染查询列表
                    // console.log(this.device_info);
                }).catch({});
            },

            /**
             *  api
             *  一键配置
             */
            // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            addConfigureAllChange(file){
                // console.log("文件状态改变时的钩子");

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.fileFile.push(file.raw);
                console.log(this.upload_arg.fileFile);
            },
            // 提交添加配置信息表单
            addConfigureAllSubmit (formName) {
                // 点击提交开始加载loading
                this.listLoading = true;

                // 验证表单
                this.$refs[formName].validate((valid) => {
                    // 如果验证成功，请求接口数据
                    if (valid) {
                        let str = "";

                        // 获取设备编号
                        for (let i=0; i<this.device_info.length; i++){
                            str += this.device_info[i].guiNo + ",";
                        }
                        if (str.length > 0) {
                            this.addConfigureAllData.guiNos = str.substr(0, str.length - 1);
                        }

                        let formData = new FormData();;

                        formData.append('file', this.upload_arg.fileFile[0]);
                        // formData.append('guiNos', this.$route.params.guiNo);
                        formData.append('guiNos', this.addConfigureAllData.guiNos);
                        formData.append('type', this.addConfigureAllData.type);
                        formData.append('content', this.addConfigureAllData.content);

                        // console.log(formData);

                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        };

                        addConfigure(formData, config).then(() => {
                            this.$message({
                                message: "配置成功！",
                                type: "success"
                            });

                            this.listLoading = false;

                            this.addConfigureAllVisible = false;
                        });
                    } else {  // 验证失败跳出
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 生产商
            formatType (row) {
                switch (row.manufacturer) {
                    case "dcdz":
                        return "东城电子";
                        break;
                    case "py":
                        return "品元";
                        break;
                }
            },

            // 显示设备的存取餐二维码
            showQRCode (row) {
                // 获取当前记录(行)设备编号
                let guiNo = Object.assign({}, row).guiNo;

                // console.log(wxQrCodeImgUrl);

                /**
                 * 存取餐
                 * (0存1取)
                 */
                this.iframeData.save_src = `${wxQrCodeImgUrl}?guiNo=${guiNo}&type=0`;  // 存餐链接[0]
                this.iframeData.take_src = `${wxQrCodeImgUrl}?guiNo=${guiNo}&type=1`;  // 取餐链接[1]
            },

            /**
             *  编辑设备位置信息方法
             */
            //点击编辑位置信息(浅拷贝)
            editPositionInfo (row) {
                //将表格中的值根据editPosition对象中的键传入表单
                this.editPosition = Object.assign({}, row);

                // console.log(this.editPosition);

                this.map();  // 加载地图
            },
            // 提交编辑设备地址表单
            editPositionSubmit(formName) {
                this.listLoading = true;  //点击提交开始加载loading

                //接口参数
                let para = {
                    guiNo: this.editPosition.guiNo,  //柜端编号
                    location: this.editPosition.location,  //柜端新地址
                    lon: this.editPosition.longitude,  //经度
                    lat: this.editPosition.latitude  //纬度
                };

                // console.log(para);

                //验证表单
                this.$refs[formName].validate((valid) => {
                    if (valid) {  //如果验证成功，请求接口数据
                        updateLocation(qs.stringify(para)).then(() => {
                            this.editPositionVisible = false;  //隐藏编辑位置信息界面
                            this.listLoading = false;  //请求成功停止加载loading
                            this.getDeviceList();  //刷新列表数据
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 修改设备名称
            editGuiName(row){
                // console.log(Object.assign({}, row));
                this.editGuiNameData.guiNo = Object.assign({}, row).guiNo;
                this.editGuiNameData.name = Object.assign({}, row).guiName;
                // updateName
            },
            // 提交修改设备名称
            editGuiNameSubmit(formName){
                // this.listLoading = true;  //点击提交开始加载loading

                //接口参数
                let para = {
                    guiNo: this.editGuiNameData.guiNo,  // 柜端编号
                    name: this.editGuiNameData.name,  // 柜端新名称
                };

                // console.log(para);

                // 验证表单
                this.$refs[formName].validate((valid) => {
                    if (valid) {  //如果验证成功，请求接口数据
                        updateName(para).then(() => {
                            this.editGuiNameVisible = false;  //隐藏编辑位置信息界面

                            this.listLoading = false;  //请求成功停止加载loading

                            this.getDeviceList();  //刷新列表数据
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                    }
                });
            },

            // 刷新柜口列表
            refreshBox (row) {
                // console.log(Object.assign({}, row))

                let para = {
                    guiNo: Object.assign({}, row).guiNo
                }

                refreshBox(para).then(() => {
                    // console.log(res);
                    this.$message({
                        message: "刷新成功！",
                        type: "success"
                    });
                }).catch({});
            },

            //删除设备
            delDevice () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("删除设备");
                }).catch(err => {
                    throw err;
                });
            }
        },
        created () {
            this.getDeviceList();
        },
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

    .show_QRcode h2{
        display: block;
        width: 100%;
        font-size: 18px;
        text-align: center;
        margin-bottom: 15px;
    }

    .show_QRcode .QRcode_img{
        width: 100%;
        margin: 0 auto;
    }

    .QRcode_img iframe{
        width: 100%;
        margin: 0 auto;
        height: 435px;
    }

    iframe img{
        width: 100px;
    }

    .show_QRcode:first-child{
        border-right: solid 1px #acaeaf;
    }

    #atlas{
        min-width: 600px;
        min-height: 300px;
    }

    .address_input{
        width: 500px;
        margin-right: 30px;
    }
</style>