<template>
    <section class="main_cont">
        <!-- 表单 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item>
                            <el-button type="primary" @click="addProductVisible = true">添加商品</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <!-- 商品列表 -->
        <el-row>
            <el-table class="product_list" :data="product_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 245px)">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->

                <el-table-column label="商品图片" width="120" align="center">
                    <template slot-scope="scope">
            		<img :src="scope.row.img" class="tabimg" />
            	</template>
                </el-table-column>

                <el-table-column prop="id" label="商品id" width="80" align="center"></el-table-column>
                <el-table-column prop="title" label="商品名称" width="120" align="center"></el-table-column>
                <el-table-column prop="createAt" label="创建时间" width="110" align="center"></el-table-column>
                <el-table-column prop="month" label="商品周期(月)" width="120" align="center"></el-table-column>
                <el-table-column prop="originalPrice" label="原价" width="120" align="center"></el-table-column>
                <el-table-column prop="currentPrice" label="现价" width="120" align="center"></el-table-column>
                <el-table-column prop="desc" label="商品详情" width="auto"></el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="updateProduct(scope.row)" v-on:click="updateProductVisible = true">编辑</el-button>
                        <el-button type="text" size="small" @click="delProduct(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-col :span="24" class="toolbar f-cb">
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

        <!-- 添加商品 -->
        <el-dialog title="添加商品" @keyup.enter.native="addProductSubmit('addProductForm')" :close-on-click-modal="false" :visible.sync="addProductVisible" :before-close="handleClose">
            <el-form :model="addProductData" status-icon :rules="addProductRules" ref="addProductForm" label-width="120px">
                <el-form-item label="商品名称" prop="title">
                    <el-input v-model="addProductData.title"  placeholder="请输入商品名称" clearable></el-input>
                </el-form-item>

                <el-form-item label="上传商品图">
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
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

                <el-form-item label="商品图片" prop="img">
                    <el-input v-model="addProductData.img" placeholder="请输入商品图片" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品时间(月)" prop="month">
                    <el-input v-model="addProductData.month" placeholder="请输入商品时间(月)" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品原价" prop="originalPrice">
                    <el-input v-model="addProductData.originalPrice" placeholder="请输入商品原价" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品现价" prop="currentPrice">
                    <el-input v-model="addProductData.currentPrice" placeholder="请输入商品现价" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品描述" prop="desc">
                    <el-input v-model="addProductData.desc" placeholder="请输入商品描述" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addProduct" v-on:click="addProductSubmit('addProductForm')">提交</el-button>
                    <el-button @click="resetForm('addProductForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 更新商品 -->
        <el-dialog title="添加商品" @keyup.enter.native="updateProductSubmit('updateProductForm')" :close-on-click-modal="false" :visible.sync="updateProductVisible" :before-close="handleClose">
            <el-form :model="updateProductData" status-icon :rules="updateProductRules" ref="updateProductForm" label-width="120px">
                <el-form-item label="bannerId" prop="id">
                    <el-input v-model="updateProductData.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="title">
                    <el-input v-model="updateProductData.title"  placeholder="请输入商品名称" clearable></el-input>
                </el-form-item>

                <el-form-item label="上传商品图">
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
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

                <el-form-item label="商品图片" prop="img">
                    <el-input v-model="updateProductData.img" placeholder="请输入商品图片" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品时间(月)" prop="month">
                    <el-input v-model="updateProductData.month" placeholder="请输入商品时间(月)" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品原价" prop="originalPrice">
                    <el-input v-model="updateProductData.originalPrice" placeholder="请输入商品原价" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品现价" prop="currentPrice">
                    <el-input v-model="updateProductData.currentPrice" placeholder="请输入商品现价" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品描述" prop="desc">
                    <el-input v-model="updateProductData.desc" placeholder="请输入商品描述" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="updateProductSubmit('updateProductForm')">提交</el-button>
                    <el-button @click="resetForm('updateProductForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        findProductList,  // 获取商品列表
        getImgURI,  // 上传图片
        addProduct,  // 添加商品
        updateProduct,  // 更新商品
        delProduct  // 删除商品
    } from '../../api/api.js';

    export default {
        name: 'commodity',

        data() {
            // url验证
            let validateUrl = (rule, value, callback) => {
                let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;

                if (!reg.test(value)) {
                    return callback(new Error('url输入不正确！'));
                }

                callback();
            };

            // 月份验证
            let validateMonth = (rule, value, callback) => {
                let reg = /^(0?[1-9]|1[0-2])$/;

                if (!reg.test(value)) {
                    return callback(new Error('月份在1-12之间！'));
                }

                callback();
            };

            // 价格验证
            let validatePrice = (rule, value, callback) => {
                let reg = /^(-)|([1-9]\d*)((\.\d+)?)$/;

                if (!reg.test(value)) {
                    return callback(new Error('价格必须是整数或者小数且前缀不能为0！'));
                }

                callback();
            };

            return {
                /**
                 * common
                 */
                listLoading: false,  // lodding动画
                dialogVisible: false,  // 关闭提示

                //分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 10, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                // 上传图片参数
                upload_arg: {
                    limit:1,
                    imgFile: [],
                    fileList: []
                },

                /**
                 * 商品列表
                 */
                product_info: [],  // 存放商品信息列表数据

                /**
                 * 添加商品
                 */
                // 添加商品数据
                addProductData: {
                    title: "aaa",  // 商品名称
                    img: "https://nei.netease.com/res/images/interface.png?47c471ba67e19d5c5923ce2e9629d000",  // 商品图片
                    month: "3",  // 商品时间(月)
                    originalPrice: "12.5",  // 商品原价
                    currentPrice: "5",  // 商品现价
                    desc: "促销促销促销"  // 商品描述
                },

                // 验证添加商品界面数据
                addProductRules: {
                    title: [
                        { required: true, message: '商品名称不能为空！', trigger: 'blur' }
                    ],
                    img: [
                        { required: true, message: '商品图片不能为空！', trigger: 'blur' },
                        { validator: validateUrl, trigger: 'blur' }
                    ],
                    month: [
                        { required: true, message: '商品时间(月)不能为空！', trigger: 'blur' },
                        { validator: validateMonth, trigger: 'blur' }
                    ],
                    originalPrice: [
                        { required: true, message: '商品原价不能为空！', trigger: 'blur' },
                        { validator: validatePrice, trigger: 'blur' }
                    ],
                    currentPrice: [
                        { required: true, message: '商品现价不能为空！', trigger: 'blur' },
                        { validator: validatePrice, trigger: 'blur' },
                    ],
                    desc: [
                        { required: true, message: '商品描述不能为空！', trigger: 'blur' }
                    ]
                },

                /**
                 * 编辑商品
                 */
                // 添加商品数据
                updateProductData: {
                    id: "",
                    title: "",  // 商品名称
                    img: "",  // 商品图片
                    month: "",  // 商品时间(月)
                    originalPrice: "",  // 商品原价
                    currentPrice: "",  // 商品现价
                    desc: ""  // 商品描述
                },

                // 验证添加商品界面数据
                updateProductRules: {
                    title: [
                        { required: true, message: '商品名称不能为空！', trigger: 'blur' }
                    ],
                    img: [
                        { required: true, message: '商品图片不能为空！', trigger: 'blur' },
                        { validator: validateUrl, trigger: 'blur' }
                    ],
                    month: [
                        { required: true, message: '商品时间(月)不能为空！', trigger: 'blur' },
                        { validator: validateMonth, trigger: 'blur' }
                    ],
                    originalPrice: [
                        { required: true, message: '商品原价不能为空！', trigger: 'blur' },
                        { validator: validatePrice, trigger: 'blur' }
                    ],
                    currentPrice: [
                        { required: true, message: '商品现价不能为空！', trigger: 'blur' },
                        { validator: validatePrice, trigger: 'blur' },
                    ],
                    desc: [
                        { required: true, message: '商品描述不能为空！', trigger: 'blur' }
                    ]
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addProductVisible: false,  // 添加新的商品界面
                updateProductVisible: false,  // 更新商品界面
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
            //表单重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getProductList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getProductList();  // 加载分页数据
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
                this.addProductData.img = "";
                this.updateProductData.img = "";
                return this.$confirm(`确定移除 ${ file.name }？`);
            },

            /**
             *  api
             *  获取商品信息
             */
            getProductList () {
                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                };

                // 获取接口数据
                findProductList(param).then(res => {
                    // console.log(res.data.data);

                    this.product_info = res.data.data.list;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;
                }).catch({});
            },

            /**
             *  api
             *  添加商品
             */
            //点击添加商品
            addProduct () {
                console.log("添加商品");

                this.upload_arg.fileList = [];  //清空上传img file
            },
            //el-upload
            // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            addHandleChange(file){
                // console.log("文件状态改变时的钩子");

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.imgFile.push(file.raw);

                console.log(this.upload_arg.imgFile);

                //上传图片
                this.addUpload();
            },

            // 获取img url
            addUpload(){
                let formData = new FormData();

                formData.append('logoFile', this.upload_arg.imgFile[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                getImgURI(formData, config).then(res => {
                    // console.log(res);

                    this.addProductData.img = res.data.data.imgUrl;
                });
            },
            // 提添加商品表单
            addProductSubmit (formName) {
                this.listLoading = true;  //点击提交开始加载loading

                //验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        addProduct(qs.stringify(this.addProductData)).then(() => {
                            this.$message({
                                message: "添加成功！",
                                type: "success"
                            });

                            // 隐藏添加banner信息界面
                            this.addProductVisible = false;

                            // 请求成功停止加载loading
                            this.listLoading = false;

                            // 刷新列表数据
                            this.getProductList();
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                    }
                });
            },

            /**
             *  api
             *  更新商品
             */
            //el-upload
            // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            updateHandleChange(file){
                // console.log("文件状态改变时的钩子");

                // this.upload_arg.fileList = [];  // 清空上传img file

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.imgFile.push(file.raw);

                // console.log(this.upload_arg.imgFile);

                // 上传图片
                this.updateUpload();
            },

            // 获取img url
            updateUpload (){
                let formData = new FormData();

                formData.append('logoFile', this.upload_arg.imgFile[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                getImgURI(formData, config).then(res => {
                    // console.log(res);

                    this.updateProductData.img = res.data.data.imgUrl;
                    // console.log(this.updateBannerData.img);
                });
            },
            // 更新商品(浅拷贝列表数据到表单)
            updateProduct (row) {
                // console.log("更新商品");

                this.upload_arg.fileList = [];  // 清空上传img file

                this.updateProductData = Object.assign({}, row);

                this.updateProduct.id = this.updateProductData.id;
                // console.log(this.updateProduct.id);
            },

            // 提交更新商品表单
            updateProductSubmit (formName) {
                //点击提交开始加载loading
                this.listLoading = true;

                // 验证表单
                this.$refs[formName].validate((valid) => {
                    // 如果验证成功，请求接口数据
                    if (valid) {
                        updateProduct(qs.stringify(this.updateProductData)).then(() => {
                            this.$message({
                                message: "编辑成功！",
                                type: "success"
                            });

                            // 隐藏编辑banner界面
                            this.updateProductVisible = false;

                            // 请求成功停止加载loading
                            this.listLoading = false;

                            // 刷新列表数据
                            this.getProductList();
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                    }
                });
            },

            /**
             *  api
             *  删除商品
             */
            delProduct (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let id = Object.assign({}, row).id;

                    let params = {
                        id: id
                    }

                    // 请求接口数据
                    delProduct(qs.stringify(params)).then(() => {
                        this.$message({
                            message: "删除成功！",
                            type: "success"
                        });

                        // 刷新列表数据
                        this.getProductList();
                    }).catch({});
                });
            },
        },
        // 预处理
        created () {
            this.getProductList();
        }
    }
</script>

<style scoped>
    .toolbar {
        padding-bottom: 0;
    }
</style>