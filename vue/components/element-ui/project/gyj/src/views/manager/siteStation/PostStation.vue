<template>
    <section class="main_cont">
        <!-- 筛选 -->
        <el-row class="toolbar bdr_radiu f-cb">
            <el-form :model="filterData" status-icon ref="filterForm" :inline="true">
                <el-col :span="24">
                    <!-- 名称搜索 -->
                    <el-form-item label="名称">
                        <el-input v-model="filterData.name" placeholder="请输入名称" clearable></el-input>
                    </el-form-item>

                    <!-- 按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="filterFormSubmit('filterForm')">查询</el-button>
                        <el-button type="primary" @click="addPostStation" v-on:click="addPostStationVisible = true">新增驿站</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>

        <!-- 驿站列表 -->
        <el-row>
            <el-table :data="postStationInfo" border highlight-current-row v-loading="listLoading" height="calc(100vh - 240px)">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <!--<el-table-column prop="id" label="驿站编号" width="80" align="center"></el-table-column>-->

                <el-table-column prop="storeName" label="驿站名称" width="200" align="center"></el-table-column>

                <el-table-column label="icon" width="100" align="center">
                    <template slot-scope="scope">
                <img :src="scope.row.icon" class="tabimg" />
               </template>
                </el-table-column>

                <el-table-column prop="userName" label="驿站管理员" width="auto" align="center"></el-table-column>
                <el-table-column prop="phone" label="驿站管理员手机" width="auto" align="center"></el-table-column>
                <el-table-column prop="cardNo" label="驿站管理员银行卡号" width="auto" align="center"></el-table-column>
                <el-table-column prop="mobile" label="驿站座机" width="auto" align="center"></el-table-column>
                <el-table-column prop="address" label="驿站地址" width="auto" align="center"></el-table-column>
                <el-table-column prop="description" label="驿站简介" width="auto" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" v-on:click="editPostStationVisible = true" @click="editPostStation(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="delVote(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-row :span="24" class="toolbar f-cb">
                <!-- 分页 -->
                <el-col>
                    <el-pagination class="f-fr pagination"
                           :current-page.sync='page_arg.page_index'
                           :page-sizes="page_arg.page_sizes"
                           :page-size="page_arg.page_size"
                           :layout="page_arg.layout"
                           :total="page_arg.total"
                           @current-change='handleCurrentChange'
                           @size-change='handleSizeChange'>
                    </el-pagination>
                </el-col>
            </el-row>
        </el-row>

        <!-- 新增驿站 -->
        <el-dialog title="新增驿站" :close-on-click-modal="false" :visible.sync="addPostStationVisible" :before-close="handleClose">
            <el-form :model="addPostStationData" status-icon :rules="addPostStationRules" ref="addPostStationForm" label-width="160px">
                <el-form-item label="驿站名称" prop="storeName">
                    <el-input v-model="addPostStationData.storeName" placeholder="请输入驿站名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="驿站地址" prop="address">
                    <el-input v-model="addPostStationData.address" placeholder="请输入驿站地址" clearable></el-input>
                </el-form-item>

                <el-form-item label="上传驿站icon">
                    <el-upload
                            :action="requestUrl"
                            ref='uploadVideo'
                            :before-remove="beforeRemove"
                            :on-change="addPostIconImg"
                            multiple
                            :limit="upload_arg.limit"
                            :on-exceed="handleExceed"
                            :file-list="upload_arg.fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item label="驿站icon" prop="icon">
                    <el-input v-model="addPostStationData.icon" placeholder="请输入驿站icon" clearable></el-input>
                </el-form-item>

                <el-form-item label="工地名称">
                    <el-select v-model="addPostStationData.cpId" placeholder="请选择工地名称">
                        <el-option v-for="(item,index) in siteInfo" :label="item.name" :value="item.id" :key="index"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="驿站管理员手机" prop="phone">
                    <el-input v-model="addPostStationData.phone" placeholder="请输入驿站管理员手机" clearable></el-input>
                </el-form-item>
                <el-form-item label="驿站座机" prop="mobile">
                    <el-input v-model="addPostStationData.mobile" placeholder="请输入驿站座机" clearable></el-input>
                </el-form-item>
                <el-form-item label="驿站管理员银行卡号" prop="cardNo">
                    <el-input v-model="addPostStationData.cardNo" placeholder="请输入驿站管理员银行卡号" clearable></el-input>
                </el-form-item>
                <el-form-item label="驿站简介" prop="description">
                    <el-input type="textarea" v-model="addPostStationData.description" placeholder="驿站简介" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addPostStationSubmit('addPostStationForm')">提交</el-button>
                    <el-button @click="resetForm('addPostStationForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑驿站 -->
        <el-dialog title="编辑驿站" :close-on-click-modal="false" :visible.sync="editPostStationVisible" :before-close="handleClose">
            <el-form :model="editPostStationData" status-icon :rules="editPostStationRules" ref="editPostStationForm" label-width="160px">
                <el-form-item label="驿站名称" prop="storeName">
                    <el-input v-model="editPostStationData.storeName" placeholder="请输入驿站名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="驿站地址" prop="address">
                    <el-input v-model="editPostStationData.address" placeholder="请输入驿站地址" clearable></el-input>
                </el-form-item>

                <el-form-item label="上传驿站icon">
                    <el-upload
                            :action="requestUrl"
                            ref='uploadVideo'
                            :before-remove="beforeRemove"
                            :on-change="editPostIconImg"
                            multiple
                            :limit="upload_arg.limit"
                            :on-exceed="handleExceed"
                            :file-list="upload_arg.fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item label="驿站icon" prop="icon">
                    <el-input v-model="editPostStationData.icon" placeholder="请输入驿站icon" clearable></el-input>
                </el-form-item>

                <el-form-item label="工地名称">
                    <el-select v-model="editPostStationData.cpId" placeholder="请选择工地名称">
                        <el-option v-for="(item,index) in siteInfo" :label="item.name" :value="item.id" :key="index"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="驿站管理员手机" prop="phone">
                    <el-input v-model="editPostStationData.phone" placeholder="请输入驿站管理员手机" clearable></el-input>
                </el-form-item>
                <el-form-item label="驿站座机" prop="mobile">
                    <el-input v-model="editPostStationData.mobile" placeholder="请输入驿站座机" clearable></el-input>
                </el-form-item>
                <el-form-item label="驿站管理员银行卡号" prop="cardNo">
                    <el-input v-model="editPostStationData.cardNo" placeholder="请输入驿站管理员银行卡号" clearable></el-input>
                </el-form-item>
                <el-form-item label="驿站简介" prop="description">
                    <el-input type="textarea" v-model="editPostStationData.description" placeholder="驿站简介" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="editPostStationSubmit('editPostStationForm')">提交</el-button>
                    <el-button @click="resetForm('editPostStationForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        getSite,  // 获取工地列表
        getImgURI,  // 上传图片
        getPostStation,  // 获取驿站列表
        addPostStation,  // 新增驿站
        updatePostStation,  // 编辑驿站
        delPostStation,  // 删除驿站
    } from '../../../api/api.js';

    export default {
        name: 'post_station',

        data() {
            // url验证
            const validateUrl = (rule, value, callback) => {
                let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;

                if (!reg.test(value)) {
                    return callback(new Error('url输入不正确！'));
                }

                callback();
            };

            return {
                /**
                 * common
                 */
                listLoading: false,  // lodding动画
                dialogVisible: false,  // 关闭提示

                // 域名
                requestUrl: "https://jsonplaceholder.typicode.com/posts/",

                // 上传文件参数
                upload_arg: {
                    limit:1,
                    addPostIcon: [],  // 新增驿站icon资源
                    editPostIcon: [],  // 编辑驿站icon资源
                    fileList: []
                },

                // 分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 10, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                /**
                 * 工地数据
                 */
                // 工地列表
                siteInfo: [],

                /**
                 * 驿站数据
                 */
                // 驿站列表
                postStationInfo: [],

                /**
                 * 筛选数据
                 */
                filterData: {
                    name: "",  // 名称
                },

                /**
                 * 新增驿站
                 */
                // 新增驿站数据
                addPostStationData: {
                    storeName: "aaa",  // 驿站名称
                    address: "zzz",  // 驿站地址
                    icon: "",  // 驿站icon
                    phone: "15843",  // 驿站管理员手机
                    mobile: "456789",  // 驿站座机
                    cardNo: "123456789",  // 驿站管理员银行卡号
                    userName: "ss",  // 驿站管理员
                    cpId: "",  // 工地id
                    description: "bfd",  // 驿站简介
                },

                // 验证新增驿站数据
                addPostStationRules: {
                    storeName: [
                        { required: true, message: '驿站名称不能为空！', trigger: 'blur' }
                        // { validator: validateUrl, trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '驿站地址不能为空！', trigger: 'blur' }
                    ],
                    icon: [
                        { required: true, message: '驿站icon不能为空！', trigger: 'blur' },
                        { validator: validateUrl, trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '驿站管理员手机不能为空！', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '驿站座机不能为空！', trigger: 'blur' }
                    ],
                    cardNo: [
                        { required: true, message: '驿站管理员银行卡号不能为空！', trigger: 'blur' }
                    ],
                    userName: [
                        { required: true, message: '驿站管理员不能为空！', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '驿站简介不能为空！', trigger: 'blur' }
                    ],
                },

                /**
                 * 编辑驿站
                 */
                // 编辑驿站数据
                editPostStationData: {
                    id: "",
                    storeName: "",  // 驿站名称
                    address: "",  // 驿站地址
                    icon: "",  // 驿站icon
                    phone: "",  // 驿站管理员手机
                    mobile: "",  // 驿站座机
                    cardNo: "",  // 驿站管理员银行卡号
                    userName: "",  // 驿站管理员
                    cpId: "",  // 工地id
                    description: "",  // 驿站简介
                },

                // 验证编辑驿站数据
                editPostStationRules: {
                    storeName: [
                        { required: true, message: '驿站名称不能为空！', trigger: 'blur' }
                        // { validator: validateUrl, trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '驿站地址不能为空！', trigger: 'blur' }
                    ],
                    icon: [
                        { required: true, message: '驿站icon不能为空！', trigger: 'blur' },
                        { validator: validateUrl, trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '驿站管理员手机不能为空！', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '驿站座机不能为空！', trigger: 'blur' }
                    ],
                    cardNo: [
                        { required: true, message: '驿站管理员银行卡号不能为空！', trigger: 'blur' }
                    ],
                    userName: [
                        { required: true, message: '驿站管理员不能为空！', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '驿站简介不能为空！', trigger: 'blur' }
                    ],
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addPostStationVisible: false,  // 新增驿站界面
                editPostStationVisible: false,  // 编辑驿站界面
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

            /**
             * el-upload common
             */
            // 文件超出个数限制时的钩子
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 ${this.upload_arg.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            // 删除文件之前的钩子
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`).then(() => {
                    this.addPostStationData.icon = "";
                }).catch(() => {});
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getPostStation();
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                this.page_arg.page_size = page_size;

                this.getPostStation();
            },


            /**
             *  api getSite
             *  获取工地信息
             */
            // 获取工地列表
            getSiteList () {
                getSite().then(res => {
                    // console.log(res.data.code);

                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        let datas = res.data.data.list;

                        this.siteInfo = datas;
                    }
                }).catch({});
            },

            /**
             *  api getPostStation
             *  获取驿站信息
             */
            // 获取投票列表
            getPostStationList () {
                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                    name: this.filterData.name,  // 名称
                };

                this.listloading = true;

                // 请求接口
                getPostStation(param).then(res => {
                    // console.log(res.data.data.list);

                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        this.postStationInfo = res.data.data.list;

                        // 返回分页总数
                        this.page_arg.total = res.data.data.total;
                    }

                    this.listloading = false;
                }).catch({});
            },
            // 筛选
            filterFormSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        this.getPostStationList();
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             * api addPostStation
             * 新增驿站
             */
            // 点击新增驿站
            addPostStation () {
                this.addPostStationData.cpId = 26;
            },
            // 上传驿站icon  getImgURI
            addPostIconImg (file) {
                // this.upload_arg.fileList = [];  //清空上传img file

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.addPostIcon.push(file.raw);

                //上传icon
                let formData = new FormData();
                formData.append('file', this.upload_arg.addPostIcon[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                getImgURI(formData, config).then(res => {
                    // console.log(res);

                    this.addPostStationData.icon = res.data.data;
                });
            },
            // 提交新增驿站表单
            addPostStationSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        // console.log(this.addPostStationData);

                        this.listloading = true;

                        addPostStation(this.qs.stringify(this.addPostStationData)).then(res => {
                            // console.log(res.data.data.list);

                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("添加成功");
                            }

                            this.addPostStationVisible = false;
                            this.listloading = false;
                            this.getPostStationList();
                        }).catch({});
                    } else {  //验证失败跳出
                        this.$message.error("表单填写错误");
                    }
                });
            },

            /**
             * api updatePostStation
             * 编辑驿站
             */
            // 点击编辑
            editPostStation (row) {
                // console.log(Object.assign({}, row));

                this.fileList = [];

                this.editPostStationData.id = row.id;
                this.editPostStationData.storeName = row.storeName;
                this.editPostStationData.address = row.address;
                this.editPostStationData.icon = row.icon
                this.editPostStationData.phone = row.phone;
                this.editPostStationData.mobile = row.mobile;
                this.editPostStationData.cardNo = row.cardNo;
                this.editPostStationData.userName = row.userName;
                this.editPostStationData.cpId = row.cpId;
                this.editPostStationData.description = row.description;
            },
            // 上传驿站icon  getImgURI
            editPostIconImg (file) {
                // this.upload_arg.fileList = [];  //清空上传img file

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.addPostIcon.push(file.raw);

                //上传icon
                let formData = new FormData();
                formData.append('file', this.upload_arg.editPostIcon[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                getImgURI(formData, config).then(res => {
                    // console.log(res);

                    this.editPostStationData.icon = res.data.data;
                });
            },
            // 提交编辑驿站表单
            editPostStationSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        // console.log(this.editPostStationData);

                        this.listloading = true;

                        updatePostStation(this.qs.stringify(this.editPostStationData)).then(res => {
                            // console.log(res.data.data.list);

                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("编辑成功");
                            }

                            this.editPostStationVisible = false;
                            this.listloading = false;
                            this.getPostStationList();
                        }).catch({});
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             *  api delPostStation
             *  删除驿站
             */
            delVote (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let params = {
                        id: Object.assign({}, row).id,
                    }

                    this.listloading = true;

                    delPostStation(this.qs.stringify(params)).then(res => {
                        if (res.data.code == 1) {
                            this.$message.warning(res.data.msg);
                        }

                        if (res.data.code == 0) {
                            this.$message.success("删除成功");
                        }

                        this.listloading = false;
                        this.getPostStationList();
                    }).catch({});
                }).catch(() => {});
            },
        },
        // 预处理
        created () {
            this.getSiteList();  // 工地
            this.getPostStationList();  // 驿站
        }
    }
</script>

<style lang="less" scoped>
    .toolbar {
        .el-form-item {
            margin-bottom: 0;
        }
    }
</style>