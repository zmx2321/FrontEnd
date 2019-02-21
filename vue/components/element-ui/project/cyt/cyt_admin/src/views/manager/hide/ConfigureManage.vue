<template>
    <section class="main_cont">
        <!-- 表单 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item label="筛选" class="intxt">
                            <el-select v-model="ConfigureType" placeholder="请选择配置类型" @change="currentSel">
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

                        <el-form-item>
                            <el-button type="primary" @click="addConfigure" v-on:click="addConfigureVisible = true">添加配置</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="setSpeed" v-on:click="setSpeedVisible = true">轮播速度</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <!-- 配置列表 -->
        <el-row>
            <el-table class="configure_list" :data="configure_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 176px)">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column type="index" width="60" align="center" label="序号"></el-table-column>
                <!--<el-table-column prop="id" label="configure_id" width="100" align="center"></el-table-column>-->

                <!--<el-table-column label="文件" width="100" align="center" :formatter="formatterColumn">-->
                <el-table-column label="文件" width="100" align="center">
                    <!--<template slot-scope="scope">
                        &lt;!&ndash;{{ scope.row.path.slice(59).substring((scope.row.path.slice(59).lastIndexOf('.'))+1), scope.row.path.slice(59).length }}&ndash;&gt;
                        {{ scope.row.path.slice(59).substring((scope.row.path.slice(59).lastIndexOf('.'))+1), scope.row.path.slice(59).length }}
                   <img :src="scope.row.path" class="tabimg" v-show="scope.row.path.slice(59).substring((scope.row.path.slice(59).lastIndexOf('.'))+1), scope.row.path.slice(59).length == 'jpg'" />
                        <video :src="scope.row.path" class="tabimg" />
               </template>-->
                    <template slot-scope="scope">
                   <img :src="scope.row.path" class="tabimg" />
               </template>
                </el-table-column>

                <el-table-column label="类型" width="130" align="center" :formatter="formatType"></el-table-column>

                <!--<el-table-column prop="createAt" label="创建时间" width="110" align="center"></el-table-column>
                <el-table-column prop="updateAt" label="更新时间" width="110" align="center"></el-table-column>-->

                <el-table-column prop="content" label="描述" width="auto"></el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="updateConfigure(scope.row)" v-on:click="updateConfigureVisible = true">编辑</el-button>
                        <el-button type="text" size="small" @click="delConfigure(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <!-- 添加配置 -->
        <el-dialog title="添加配置" @keyup.enter.native="addConfigureSubmit('addConfigureForm')" :close-on-click-modal="false" :visible.sync="addConfigureVisible" :before-close="handleClose">
            <el-form :model="addConfigureData" status-icon :rules="addConfigureRules" ref="addConfigureForm" label-width="120px">
                <el-form-item label="柜号" prop="guiNos">
                    <el-input v-model="addConfigureData.guiNos" disabled></el-input>
                </el-form-item>

                <el-form-item label="上传文件">
                    <!--action= "http://10.10.10.199:8080/"-->
                    <el-upload
                            action = "http://postapi.lxstation.com/"
                            ref='upload'
                            :before-remove="beforeRemove"
                            :on-change="addHandleChange"
                            multiple
                            :limit="upload_arg.limit"
                            :on-exceed="handleExceed"
                            :file-list="upload_arg.fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item label="配置类型" class="intxt">
                    <el-select v-model="addConfigureData.type" placeholder="请选择配置类型">
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
                    <el-input type="textarea" v-model="addConfigureData.content" placeholder="请输入配置说明" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addConfigureSubmit('addConfigureForm')">提交</el-button>
                    <el-button @click="resetForm('addConfigureForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 轮播速度 -->
        <el-dialog title="轮播速度" @keyup.enter.native="setSpeedSubmit('setSpeedForm')" :close-on-click-modal="false" :visible.sync="setSpeedVisible" :before-close="handleClose">
            <el-form :model="setSpeedData" status-icon :rules="setSpeedRules" ref="setSpeedForm" label-width="120px">
                <el-form-item label="柜号" prop="guiNos">
                    <el-input v-model="setSpeedData.guiNo" disabled></el-input>
                </el-form-item>

                <el-form-item label="速度数值(秒)" prop="speed">
                    <el-input v-model="setSpeedData.speed" placeholder="请输入速度数值" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="setSpeedSubmit('setSpeedForm')">提交</el-button>
                    <el-button @click="resetForm('setSpeedForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑配置 -->
        <el-dialog title="编辑配置" @keyup.enter.native="updateConfigureSubmit('updateConfigureForm')" :close-on-click-modal="false" :visible.sync="updateConfigureVisible" :before-close="handleClose">
            <el-form :model="updateConfigureData" status-icon ref="updateConfigureForm" label-width="110px">
                <el-form-item label="柜号" prop="guiNo">
                    <el-input v-model="updateConfigureData.guiNo" disabled></el-input>
                </el-form-item>

                <el-form-item label="配置Id" prop="configureId">
                    <el-input v-model="updateConfigureData.configureId" disabled></el-input>
                </el-form-item>

                <el-form-item label="上传文件">
                    <!--action="http://10.10.10.199:8080/"-->
                    <el-upload
                            action = "http://postapi.lxstation.com/"
                            ref='upload'
                            :before-remove="beforeRemove"
                            :on-change="updateHandleChange"
                            multiple
                            :limit="upload_arg.limit"
                            :on-exceed="handleExceed"
                            :file-list="upload_arg.fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="updateConfigureSubmit('updateConfigureForm')">提交</el-button>
                    <el-button @click="resetForm('updateConfigureForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        findConfigureList,  // 获取配置列表
        addConfigure,  // 添加配置
        setSpeed,  // 轮播速度
        updateConfigure,  // 修改配置
        conType,  // 配置类型
        delCon  // 删除配置
    } from '../../../api/api.js';

    export default {
        name: 'configure',

        data() {
            /*// 配置类型验证
            let validateType = (rule, value, callback) => {
                let reg = /^[1-8]$/;

                if (!reg.test(value)) {
                    return callback(new Error('配置类型只能输入1-8！'));
                }

                callback();
            };*/

            return {
                /**
                 * common
                 */
                listLoading: false,  // lodding动画
                dialogVisible: false,  // 关闭提示

                guiNo: this.$route.params.guiNo,  // 当前柜端编号（this.$route.params.guiNo;）
                // guiNo: "TA104",  // 当前柜端编号（this.$route.params.guiNo;）

                ConfigureType: "",

                // 分页参数
                /*page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 10, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },*/

                // 上传图片参数
                upload_arg: {
                    limit:1,
                    fileFile: [],
                    fileList: []
                },

                /**
                 * 配置列表
                 */
                configure_info: [],  // 存放项目信息列表数据

                /**
                 * 添加配置
                 */
                // 添加配置数据
                addConfigureData: {
                    guiNos: this.$route.params.guiNo,
                    type: "",  // 类型 1 存件语音 2 取件语音 3 取件成功语音 4 banner 5 锁屏广告 6 存件页面底图 7 取件页面底图 8 广告视频
                    content: "",  // 描述文字
                },

                // 验证添加用户界面数据
                addConfigureRules: {
                    /*type: [
                        { validator: validateType, trigger: 'blur' }
                    ],*/
                    content: [
                        { required: true, message: '描述文字不能为空！', trigger: 'blur' }
                    ]
                },

                /**
                 *  轮播速度
                 */
                // 轮播速度数据
                setSpeedData: {
                    guiNo: this.$route.params.guiNo,
                    // guiNo: "TA104",
                    speed: "",  // 速度值
                },

                // 验证轮播速度界面数据
                setSpeedRules: {
                    speed: [
                        { required: true, message: '速度数值不能为空！', trigger: 'blur' }
                    ]
                },

                /**
                 * 编辑配置
                 */
                // 编辑配置数据
                updateConfigureData: {
                    guiNo: this.$route.params.guiNo,
                    configureId: "",  // 配置id
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addConfigureVisible: false,  // 添加配置界面
                setSpeedVisible: false,  // 轮播速度界面
                updateConfigureVisible: false,  // 编辑配置界面
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
            isImg (str) {
                if(str!="bmp"&&str!="png"&&str!="gif"&&str!="jpg"&&str!="jpeg"){
                    return false;
                }

                return true;
            },
            //获取文件后缀名
            getFileType(fileName){
                let fileLength = fileName.length,  //文件名总长度
                    beforeFileLength = fileName.lastIndexOf('.');  //文件名长度

                //截取字符串，获取文件后缀名
                let suffix = fileName.substring(beforeFileLength+1, fileLength);

                return suffix;
            },
            // 获取pathname参数
            getUrlPathname (str) {
                let reg = /^(https?:)\/\/([^\/]+)(\/[^\?]*)?(\?[^#]*)?(#.*)?$/;
                let arr = str.match(reg);

                let pathname = arr[3].slice(11);
                /*console.log(this.getFileType(pathname));*/

                return pathname;
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getConfigureList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                // 切换size
                this.page_arg.page_size = page_size;

                // 获取接口数据
                this.getConfigureList();
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
             *  api
             *  获取配置信息
             */
            getConfigureList () {
                //接口参数
                let param = {
                    guiNo: this.guiNo,  // 柜端编号
                };

                // 获取接口数据
                findConfigureList(qs.stringify(param)).then(res => {
                    // console.log(res.data.data);

                    if (!res.data.data){
                        this.$message({
                            message: "查不到格口编号，请在设备管理列表中选择具体设备修改配置信息！",
                            type: "warning"
                        });

                        this.$router.push("device_manage");
                    }

                    this.configure_info = res.data.data;
                }).catch({});
            },
            // 配置类型
            formatType (row) {
                // 1 存件语音 2 取件语音 3 取件成功语音 4 banner 5 锁屏广告 6 存件页面底图 7 取件页面底图 8 广告视频
                switch (row.type) {
                    case 1:
                        return "存件语音";
                        break;
                    case 2:
                        return "取件语音";
                        break;
                    case 3:
                        return "取件成功语音";
                        break;
                    case 4:
                        return "banner";
                        break;
                    case 5:
                        return "锁屏广告";
                        break;
                    case 6:
                        return "存件页面底图";
                        break;
                    case 7:
                        return "取件页面底图";
                        break;
                    case 8:
                        return "广告视频";
                        break;
                    default :
                        return "";
                        break;
                }
            },
            // 文件类型
            formatterColumn(row) {
                this.getUrlPathname(row.path);

                let pathname = this.getUrlPathname(row.path);

                console.log(pathname);
                console.log(this.getFileType(pathname));

                console.log(this.isImg(this.getFileType(pathname)));

                if (this.isImg(this.getFileType(this.getUrlPathname(row.path)))){
                    // return <img :src=\"scope.row.path\" class=\"tabimg\" />
                }
                // console.log(this.isImage(this.getFileType(pathname)));



                // console.log(row.id + "---" + row.path);
                // switch (row.path){}
            },

            /**
             * api
             * 筛选
             */
            // 状态下拉框
            currentSel(val){
                // console.log(val)

                let params = {
                    guiNo : this.guiNo,
                    type: val
                };

                // console.log(params)
                this.listLoading = true;  //点击提交开始加载loading

                conType(params).then(res => {
                    this.configure_info = res.data.data;

                    this.listLoading = false;
                });
            },

            /**
             *  api
             *  添加配置
             */
            // 上传文件
            /*uploadUrl:function(){
                return "requsetUrl";
            },*/
            //点击添加配置
            addConfigure () {
                // console.log("添加配置");

                this.upload_arg.fileList = [];  //清空上传img file
                this.upload_arg.fileFile = [];
            },
            //el-upload
            // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            addHandleChange(file){
                // console.log("文件状态改变时的钩子");

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.fileFile.push(file.raw);
                console.log(this.upload_arg.fileFile);
            },
            // 提交添加配置信息表单
            addConfigureSubmit (formName) {
                // 点击提交开始加载loading
                this.listLoading = true;

                // 验证表单
                this.$refs[formName].validate((valid) => {
                    // 如果验证成功，请求接口数据
                    if (valid) {
                        // console.log(this.addConfigureData)

                        let formData = new FormData();;

                        formData.append('file', this.upload_arg.fileFile[0]);
                        // formData.append('guiNos', this.$route.params.guiNo);
                        formData.append('guiNos', this.addConfigureData.guiNos);
                        formData.append('type', this.addConfigureData.type);
                        formData.append('content', this.addConfigureData.content);
                        // console.log(this.upload_arg.fileFile[0]);

                        console.log(this.addConfigureData.type);

                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        };

                        addConfigure(formData, config).then(() => {
                            this.$message({
                                message: "添加成功！",
                                type: "success"
                            });

                            this.listLoading = false;

                            this.addConfigureVisible = false;

                            this.getConfigureList();
                        });
                    } else {  // 验证失败跳出
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /**
             * api
             * 轮播速度
             */
            setSpeed() {
                // console.log("点击轮播速度");
            },
            // 提交添加配置表单
            setSpeedSubmit (formName) {
                // 点击提交开始加载loading
                this.listLoading = true;

                // 验证表单
                this.$refs[formName].validate((valid) => {
                    // 如果验证成功，请求接口数据
                    if (valid) {
                        setSpeed(this.setSpeedData).then(() => {
                            this.$message({
                                message: "轮播速度设置成功！",
                                type: "success"
                            });

                            this.setSpeedVisible = false;

                            this.listLoading = false;
                        });

                    } else {  // 验证失败跳出
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /**
             *  api
             *  编辑配置
             */
            //el-upload
            // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            updateHandleChange(file){
                // console.log("文件状态改变时的钩子");

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.fileFile.push(file.raw);

                // console.log(this.upload_arg.fileFile)
            },
            // 编辑配置(浅拷贝列表数据到表单)
            updateConfigure (row) {
                // console.log("编辑配置");

                this.upload_arg.fileList = [];  // 清空上传img file

                this.updateConfigureData.configureId = Object.assign({}, row).configure_id;
            },

            // 提交编辑配置表单
            updateConfigureSubmit (formName) {
                this.listLoading = true;  //点击提交开始加载loading

                // 验证表单
                this.$refs[formName].validate((valid) => {
                    if (valid) {  // 如果验证成功，请求接口数据
                        let formData = new FormData();;

                        formData.append('file', this.upload_arg.fileFile[0]);
                        // formData.append('guiNos', this.$route.params.guiNo);
                        formData.append('guiNo', this.updateConfigureData.guiNo);
                        formData.append('configureId', this.updateConfigureData.configureId);
                        // console.log(this.upload_arg.fileFile[0]);

                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        };

                        updateConfigure(formData, config).then(() => {
                            this.$message({
                                message: "编辑成功！",
                                type: "success"
                            });

                            this.listLoading = false;

                            this.updateConfigureVisible = false;

                            this.getConfigureList();
                        });
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /**
             *  api
             *  删除配置
             */
            // 单个配置信息删除
            delConfigure (row) {
                // console.log(Object.assign({}, row).configure_id)

                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let id = Object.assign({}, row).id;

                    let params = {
                        id: id
                    };

                    // console.log(params);

                    delCon(params).then(() => {
                        this.$message({
                            message: "删除成功！",
                            type: "success"
                        });

                        this.getConfigureList();  // 加载分页数据
                    }).catch({});
                }).catch(() => {});
            },
        },
        // 预处理
        created () {
            this.getConfigureList();
        }
    }
</script>

<style scoped>
    .toolbar {
        padding-bottom: 0;
    }

    .tip{
        height: 22px;
        line-height: 22px;
    }

    .tip li{
        display: inline-block;
        font-size: 12px;
        color: #4ba8cc;
        margin-right: 28px;
    }

    .tabimg{
        /*width: 75px;*/
    }
</style>