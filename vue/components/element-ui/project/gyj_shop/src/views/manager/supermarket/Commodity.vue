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

                    <!-- 父菜单 -->
                    <el-form-item label="父菜单" class="intxt inline_third">
                        <el-select v-model="filterData.categoryId" placeholder="请选择父菜单" class="dialog_sel">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="(item,index) in categoryInfo" :label="item.name" :value="item.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- 状态 -->
                    <el-form-item label="状态" class="intxt inline_third">
                        <el-select v-model="filterData.status" placeholder="请选择状态" class="dialog_sel">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="上架" value="0"></el-option>
                            <el-option label="下架" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- 按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="filterFormSubmit('filterForm')">查询</el-button>
                        <el-button type="primary" @click="addProduct" v-on:click="addProductVisible = true">新增商品</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>

        <!-- 商品列表 -->
        <el-row>
            <el-table :data="productInfo" border highlight-current-row v-loading="listLoading" height="calc(100vh - 220px)">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <!--<el-table-column prop="id" label="id" width="80" align="center"></el-table-column>-->

                <el-table-column label="图片" width="100" align="center">
                    <template slot-scope="scope">
                    <img :src="scope.row.image" class="tabimg" />
                </template>
                </el-table-column>

                <el-table-column prop="name" label="名称" width="auto" align="center"></el-table-column>
                <el-table-column prop="amount" label="数量" width="auto" align="center"></el-table-column>
                <el-table-column prop="categoryName" label="父类" width="auto" align="center"></el-table-column>
                <el-table-column prop="desc" label="描述" width="auto" align="center"></el-table-column>
                <el-table-column prop="attr1" label="规格" width="auto" align="center"></el-table-column>
                <el-table-column prop="price" label="原价" width="auto" align="center"></el-table-column>
                <el-table-column prop="sales" label="现价" width="auto" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" v-on:click="editProductVisible = true" @click="editProduct(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="delProduct(scope.row)">删除</el-button>
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

        <!-- 新增商品 -->
        <el-dialog title="新增商品" :close-on-click-modal="false" :visible.sync="addProductVisible" :before-close="handleClose">
            <el-form :model="addProductData" status-icon :rules="addProductRules" ref="addProductForm" label-width="160px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addProductData.name" placeholder="请输入名称" clearable></el-input>
                </el-form-item>

                <el-form-item label="父菜单" class="intxt inline_third">
                    <el-select v-model="addProductData.categoryId" placeholder="请选择父菜单" class="dialog_sel">
                        <el-option v-for="(item,index) in categoryInfo" :label="item.name" :value="item.id" :key="index"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="状态" class="intxt inline_third">
                    <el-select v-model="addProductData.status" placeholder="请选择状态" class="dialog_sel">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="上架" value="0"></el-option>
                        <el-option label="下架" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="排序" prop="sort">
                    <el-input v-model="addProductData.sort" placeholder="请输入sort" clearable></el-input>
                </el-form-item>

                <el-form-item label="上传图片">
                    <el-upload
                            :action="requestUrl"
                            ref='uploadVideo'
                            :before-remove="beforeRemove"
                            :on-change="addProductImg"
                            multiple
                            :limit="upload_arg.limit"
                            :on-exceed="handleExceed"
                            :file-list="upload_arg.fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item label="商品图片" prop="image">
                    <el-input v-model="addProductData.images" placeholder="请输入商品图片" clearable></el-input>
                </el-form-item>

                <!--<el-form-item label="数量" prop="amount">
                    <el-input v-model="addProductData.skuList.amount" placeholder="请输入数量" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品原价" prop="price">
                    <el-input v-model="addProductData.price" placeholder="请输入商品原价" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品现价" prop="sales">
                    <el-input v-model="addProductData.sales" placeholder="请输入商品现价" clearable></el-input>
                </el-form-item>

                <el-form-item label="规格" prop="attr1">
                    <el-input type="textarea" v-model="addProductData.attr1" placeholder="请输入规格" clearable></el-input>
                </el-form-item>

                <el-form-item label="商品描述" prop="desc">
                    <el-input type="textarea" v-model="addProductData.desc" placeholder="请输入商品描述" clearable></el-input>
                </el-form-item>-->

                <el-form-item>
                    <el-button type="primary" @click="addProductSubmit('addProductForm')">提交</el-button>
                    <el-button @click="resetForm('addProductForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑商品 -->
        <el-dialog title="编辑商品" :close-on-click-modal="false" :visible.sync="editProductVisible" :before-close="handleClose">
            <el-form :model="editProductData" status-icon :rules="editProductRules" ref="editProductForm" label-width="160px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="editProductData.name" placeholder="请输入名称" clearable></el-input>
                </el-form-item>

                <el-form-item label="父菜单" class="intxt inline_third">
                    <el-select v-model="editProductData.categoryId" placeholder="请选择父菜单" class="dialog_sel">
                        <el-option v-for="(item,index) in categoryInfo" :label="item.name" :value="item.id" :key="index"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="状态" class="intxt inline_third">
                    <el-select v-model="editProductData.status" placeholder="请选择状态" class="dialog_sel">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="上架" value="0"></el-option>
                        <el-option label="下架" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="排序" prop="sort">
                    <el-input v-model="editProductData.sort" placeholder="请输入sort" clearable></el-input>
                </el-form-item>

                <el-form-item label="上传图片">
                    <el-upload
                            :action="requestUrl"
                            ref='uploadVideo'
                            :before-remove="beforeRemove"
                            :on-change="editProductImg"
                            multiple
                            :limit="upload_arg.limit"
                            :on-exceed="handleExceed"
                            :file-list="upload_arg.fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item label="商品图片" prop="image">
                    <el-input v-model="editProductData.images" placeholder="请输入商品图片" clearable></el-input>
                </el-form-item>

                <!--<el-form-item label="数量" prop="amount">
                    <el-input v-model="editProductData.skuList.amount" placeholder="请输入数量" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品原价" prop="price">
                    <el-input v-model="editProductData.price" placeholder="请输入商品原价" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品现价" prop="sales">
                    <el-input v-model="editProductData.sales" placeholder="请输入商品现价" clearable></el-input>
                </el-form-item>

                <el-form-item label="规格" prop="attr1">
                    <el-input type="textarea" v-model="editProductData.attr1" placeholder="请输入规格" clearable></el-input>
                </el-form-item>

                <el-form-item label="商品描述" prop="desc">
                    <el-input type="textarea" v-model="editProductData.desc" placeholder="请输入商品描述" clearable></el-input>
                </el-form-item>-->

                <el-form-item>
                    <el-button type="primary" @click="editProductSubmit('editProductForm')">提交</el-button>
                    <el-button @click="resetForm('editProductForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        getCategoryList,  // 获取分类列表
        getProductList,  // 获取商品列表
        getImgURI,  // 上传图片
        addProduct,  // 添加商品
        updateProduct,  // 编辑商品
        delProduct,  // 删除商品
    } from '../../../api/api.js';

    export default {
        name: 'commodity',

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
                    limit: 1,
                    addProductImg: [],  // 新增商品资源
                    editProductImg: [],  // 编辑商品资源
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
                 * 商品分类数据
                 */
                // 商品分类列表
                categoryInfo: [],

                /**
                 * 商品数据
                 */
                // 商品列表
                productInfo: [],

                /**
                 * 筛选数据
                 */
                filterData: {
                    name: "",  // 名称
                    categoryId: "",  // 父类id
                    status: "",  //上下架状态(0:上架/1:下架)
                },

                /**
                 * 新增商品
                 */
                // 新增商品数据
                addProductData: {
                    categoryId: 9,  // 父菜单id
                    desc: "test",  // 描述
                    dividerPercent: 0,  // 默认0
                    images: undefined,  // 图片
                    name: "test",  // 名称
                    /*skuList: [
                        {
                            amount: 50,  //数量
                            attr1: "颜色:红色,尺寸:25寸,大小:中",  // 规格1
                            attr: "",  // 规格2
                            name: "cs",  // 规格名称
                            originalPrice: 25.0,  // 原价
                            price: 30.0,  // 现价
                            sales: 50  // 销量
                        }
                    ],*/
                    sort: 1,  // 排序
                    status: 0,  // 状态（0上架，1下架）
                    storeId: 0  // 默认0，不显示
                },

                // 验证新增商品数据
                addProductRules: {
                    name: [
                        { required: true, message: '商品名称不能为空！', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '描述名称不能为空！', trigger: 'blur' }
                    ],
                },

                /**
                 * 编辑商品
                 */
                // 编辑商品数据
                editProductData: {
                    categoryId: 9,  // 父菜单id
                    desc: "test",  // 描述
                    dividerPercent: 0,  // 默认0
                    images: undefined,  // 图片
                    name: "test",  // 名称
                    /*skuList: [
                        {
                            amount: 50,  //数量
                            attr1: "颜色:红色,尺寸:25寸,大小:中",  // 规格1
                            attr: "",  // 规格2
                            name: "cs",  // 规格名称
                            originalPrice: 25.0,  // 原价
                            price: 30.0,  // 现价
                            sales: 50  // 销量
                        }
                    ],*/
                    sort: 1,  // 排序
                    status: 0,  // 状态（0上架，1下架）
                    storeId: 0  // 默认0，不显示
                },

                // 验证编辑商品数据
                editProductRules: {
                    name: [
                        { required: true, message: '商品名称不能为空！', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '描述名称不能为空！', trigger: 'blur' }
                    ],
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addProductVisible: false,  // 新增商品界面
                editProductVisible: false,  // 编辑商品界面
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
                    this.addProductData.icon = "";
                }).catch(() => {});
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getProduct();
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                this.page_arg.page_size = page_size;

                this.getProduct();
            },

            /**
             *  api getCategoryList
             *  获取商品分类信息
             */
            // 获取商品分类列表
            getCategory () {
                // 请求接口
                getCategoryList().then(res => {
                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        this.categoryInfo = res.data.data.list;
                    }
                }).catch({});
            },

            /**
             *  api getProductList
             *  获取商品信息
             */
            // 获取商品列表
            getProduct () {
                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                    name: this.filterData.name == "" ? undefined : this.filterData.name,  // 名称
                    categoryId: this.filterData.categoryId == "" ? undefined : this.filterData.categoryId,  // 名称
                    status: this.filterData.status == "" ? undefined : this.filterData.status,  // 名称
                };

                this.listloading = true;

                // 请求接口
                getProductList(param).then(res => {
                    // console.log(res.data.data.list);

                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        // categoryId
                        let datas = res.data.data.list;

                        for (let i=0; i<datas.length; i++) {
                            for (let j=0; j<this.categoryInfo.length; j++) {
                                if (datas[i].categoryId = this.categoryInfo.id) {
                                    datas.categoryName = this.categoryInfo.name;
                                }
                            }
                        }

                        this.productInfo = datas;

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
                        this.getProduct();
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             * api addProduct
             * 新增商品
             */
            // 点击新增商品
            addProduct () {
                this.addProductData.parentId = this.filterData.parentId;
            },
            // 上传商品icon  getImgURI
            addProductImg (file) {
                //上传文件变化时将文件对象push进files数组
                this.upload_arg.addProductImg.push(file.raw);

                let formData = new FormData();
                formData.append('file', this.upload_arg.addProductImg[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                getImgURI(formData, config).then(res => {
                    // console.log(res.data.data);

                    this.addProductData.images = res.data.data;
                });
            },
            // 提交新增商品表单
            addProductSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        // console.log(this.addProductData);

                        this.listloading = true;

                        console.log(this.addProductData);

                        if (this.addProductData.categoryId == undefined) {
                            this.$message.warning("请选择所属菜单");
                        } else if (this.addProductData.images == undefined) {
                            this.$message.warning("必须先选择图片");
                        }
                        else {
                            addProduct(this.addProductData).then(res => {
                                // console.log(res.data);

                                if (res.data.code == 1) {
                                    this.$message.warning(res.data.msg);
                                }

                                if (res.data.code == 0) {
                                    this.$message.success("添加成功");
                                }

                                this.addProductVisible = false;
                                this.listloading = false;
                                this.getProduct();
                            }).catch({});
                        }
                    } else {  //验证失败跳出
                        this.$message.error("表单填写错误");
                    }
                });
            },

            /**
             * api updateProduct
             * 编辑商品
             */
            // 点击编辑
            editProduct (row) {
                this.upload_arg.fileList = [];

                // this.editProductData = Object.assign({}, row);

                // this.editProductData.categoryId = row.categoryId.toString();
            },
            // 上传商品icon  getImgURI
            editProductImg (file) {
                // this.upload_arg.fileList = [];  //清空上传img file

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.editProductIcon.push(file.raw);

                //上传icon
                let formData = new FormData();
                formData.append('file', this.upload_arg.editProductIcon[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                getImgURI(formData, config).then(res => {
                    // console.log(res);

                    this.editProductData.icon = res.data.data;
                });
            },
            // 提交编辑商品表单
            editProductSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        // console.log(this.editProductData);

                        this.listloading = true;

                        updateProduct(qs.stringify(this.editProductData)).then(res => {
                            // console.log(res.data.data.list);

                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("编辑成功");
                            }

                            this.editProductVisible = false;
                            this.listloading = false;
                            this.getProduct();
                        }).catch({});
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             *  api delProduct
             *  删除商品
             */
            delProduct (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let params = {
                        id: row.id,
                    }

                    this.listloading = true;

                    delProduct(qs.stringify(params)).then(res => {
                        // console.log(res);

                        if (res.data.code == 1) {
                            this.$message.warning(res.data.msg);
                        }

                        if (res.data.code == 0) {
                            this.$message.success("删除成功");
                        }

                        this.listloading = false;
                        this.getProduct();
                    }).catch({});
                }).catch(() => {});
            },
        },
        // 预处理
        created () {
            this.getCategory();  // 分类
            this.getProduct();  // 商品
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