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

                    <!--父菜单-->
                    <el-form-item label="父菜单" class="intxt inline_third">
                        <el-select v-model="filterData.parentId" placeholder="请选择父菜单" class="dialog_sel">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="(item,index) in categoryInfo" :label="item.name" :value="item.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- 按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="filterFormSubmit('filterForm')">查询</el-button>
                        <el-button type="primary" @click="addCategory" v-on:click="addCategoryVisible = true">新增类目</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>

        <!-- 商品分类列表 -->
        <el-row>
            <el-table :data="categoryInfo" border highlight-current-row v-loading="listLoading" height="calc(100vh - 220px)">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <!--<el-table-column prop="id" label="id" width="80" align="center"></el-table-column>-->

                <el-table-column label="icon" width="100" align="center">
                    <template slot-scope="scope">
                    <img :src="scope.row.icon" class="tabimg" />
                </template>
                </el-table-column>

                <el-table-column prop="name" label="分类名称" width="auto" align="center"></el-table-column>
                <el-table-column prop="sort" label="排序" width="300" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" v-on:click="editCategoryVisible = true" @click="editCategory(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="delCategory(scope.row)">删除</el-button>
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

        <!-- 新增商品分类 -->
        <el-dialog title="新增商品分类" :close-on-click-modal="false" :visible.sync="addCategoryVisible" :before-close="handleClose">
            <el-form :model="addCategoryData" status-icon :rules="addCategoryRules" ref="addCategoryForm" label-width="160px">
                <el-form-item label="商品分类名称" prop="name">
                    <el-input v-model="addCategoryData.name" placeholder="请输入商品分类名称" clearable></el-input>
                </el-form-item>

                <!--伪类目(0:真实类目,1:伪类目)-->
                <el-form-item label="伪类目">
                    <el-select v-model="addCategoryData.fake">
                        <el-option label="" value=""></el-option>
                        <el-option label="真实类目" value="0"></el-option>
                        <el-option label="伪类目" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <!--父菜单-->
                <el-form-item label="父菜单" class="intxt inline_third">
                    <el-select v-model="addCategoryData.parentId" placeholder="请选择父菜单" class="dialog_sel">
                        <el-option label="" value=""></el-option>
                        <el-option v-for="(item,index) in categoryInfo" :label="item.name" :value="item.id" :key="index"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="排序" prop="sort">
                    <el-input v-model="addCategoryData.sort" placeholder="请输入排序" clearable></el-input>
                </el-form-item>

                <el-form-item label="上传分类icon">
                    <el-upload
                            :action="requestUrl"
                            ref='uploadVideo'
                            :before-remove="beforeRemove"
                            :on-change="addCategoryIconImg"
                            multiple
                            :limit="upload_arg.limit"
                            :on-exceed="handleExceed"
                            :file-list="upload_arg.fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item label="商品分类icon" prop="icon">
                    <el-input v-model="addCategoryData.icon" placeholder="请输入商品分类icon" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addCategorySubmit('addCategoryForm')">提交</el-button>
                    <el-button @click="resetForm('addCategoryForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑商品分类 -->
        <el-dialog title="编辑商品分类" :close-on-click-modal="false" :visible.sync="editCategoryVisible" :before-close="handleClose">
            <el-form :model="editCategoryData" status-icon :rules="editCategoryRules" ref="editCategoryForm" label-width="160px">
                <el-form-item label="商品分类名称" prop="name">
                    <el-input v-model="editCategoryData.name" placeholder="请输入商品分类名称" clearable></el-input>
                </el-form-item>

                <!--伪类目(0:真实类目,1:伪类目)-->
                <el-form-item label="伪类目">
                    <el-select v-model="editCategoryData.fake">
                        <el-option label="" value=""></el-option>
                        <el-option label="真实类目" value="0"></el-option>
                        <el-option label="伪类目" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <!--父菜单-->
                <el-form-item label="父菜单" class="intxt inline_third">
                    <el-select v-model="editCategoryData.parentId" placeholder="请选择父菜单" class="dialog_sel">
                        <el-option v-for="(item,index) in categoryInfo" :label="item.name" :value="item.id" :key="index"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="排序" prop="sort">
                    <el-input v-model="editCategoryData.sort" placeholder="请输入排序" clearable></el-input>
                </el-form-item>

                <el-form-item label="上传分类icon">
                    <el-upload
                            :action="requestUrl"
                            ref='uploadVideo'
                            :before-remove="beforeRemove"
                            :on-change="editCategoryIconImg"
                            multiple
                            :limit="upload_arg.limit"
                            :on-exceed="handleExceed"
                            :file-list="upload_arg.fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item label="商品分类icon" prop="icon">
                    <el-input v-model="editCategoryData.icon" placeholder="请输入商品分类icon" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="editCategorySubmit('editCategoryForm')">提交</el-button>
                    <el-button @click="resetForm('editCategoryForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        getCategoryList,  // 获取分类列表
        getImgURI,  // 上传图片
        addCategory,  // 添加分类
        updateCategory,  // 编辑分类
        delCategory,  // 删除分类
    } from '../../../api/api.js';

    export default {
        name: 'commodity_classification',

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
                    addCategoryIcon: [],  // 新增商品分类icon资源
                    editCategoryIcon: [],  // 编辑商品分类icon资源
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
                 * 筛选数据
                 */
                filterData: {
                    name: "",  // 类目名称
                    parentId: "",  // 父菜单id
                },

                /**
                 * 新增商品分类
                 */
                // 新增商品分类数据
                addCategoryData: {
                    name: "",  // 类目名称
                    fake: "0",  // 伪类目(0:真实类目,1:伪类目)
                    parentId: "",  // 父菜单id
                    sort: "",  // 排序
                    icon: "",  // 图标
                },

                // 验证新增商品分类数据
                addCategoryRules: {
                    name: [
                        { required: true, message: '商品分类名称不能为空！', trigger: 'blur' }
                    ],
                    /*storeName: [
                        { required: true, message: '商品分类名称不能为空！', trigger: 'blur' }
                        // { validator: validateUrl, trigger: 'blur' }
                    ],*/
                },

                /**
                 * 编辑商品分类
                 */
                // 编辑商品分类数据
                editCategoryData: {
                    id: "",
                    name: "",  // 类目名称
                    fake: "",  // 伪类目(0:真实类目,1:伪类目)
                    parentId: "",  // 父菜单id
                    sort: "",  // 排序
                    icon: "",  // 图标
                },

                // 验证编辑商品分类数据
                editCategoryRules: {
                    name: [
                        { required: true, message: '商品分类名称不能为空！', trigger: 'blur' }
                    ],
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addCategoryVisible: false,  // 新增商品分类界面
                editCategoryVisible: false,  // 编辑商品分类界面
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
                    this.addCategoryData.icon = "";
                }).catch(() => {});
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getCategory();
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                this.page_arg.page_size = page_size;

                this.getCategory();
            },

            /**
             *  api getCategoryList
             *  获取商品分类信息
             */
            // 获取商品分类列表
            getCategory () {
                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                    name: this.filterData.name == "" ? undefined : this.filterData.name,  // 名称
                    parentId: this.filterData.parentId == "" ? undefined : parseInt(this.filterData.parentId),  // 分类
                };

                this.listloading = true;

                // 请求接口
                getCategoryList(param).then(res => {
                    // console.log(res.data.data.list);

                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        this.categoryInfo = res.data.data.list;

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
                        this.getCategory();
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             * api addCategory
             * 新增商品分类
             */
            // 点击新增商品分类
            addCategory () {
                this.addCategoryData.parentId = this.filterData.parentId;
            },
            // 上传商品分类icon  getImgURI
            addCategoryIconImg (file) {
                // this.upload_arg.fileList = [];  //清空上传img file

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.addCategoryIcon.push(file.raw);

                //上传icon
                let formData = new FormData();
                formData.append('file', this.upload_arg.addCategoryIcon[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                getImgURI(formData, config).then(res => {
                    // console.log(res);

                    this.addCategoryData.icon = res.data.data;
                });
            },
            // 提交新增商品分类表单
            addCategorySubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        // console.log(this.addCategoryData);

                        this.listloading = true;

                        console.log(this.addCategoryData);

                        addCategory(qs.stringify(this.addCategoryData)).then(res => {
                            // console.log(res.data);

                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("添加成功");
                            }

                            this.addCategoryVisible = false;
                            this.listloading = false;
                            this.getCategory();
                        }).catch({});
                    } else {  //验证失败跳出
                        this.$message.error("表单填写错误");
                    }
                });
            },

            /**
             * api updateCategory
             * 编辑商品分类
             */
            // 点击编辑
            editCategory (row) {
                this.upload_arg.fileList = [];

                // console.log(this.categoryInfo);

                this.editCategoryData.parentId = this.filterData.parentId;

                this.editCategoryData.id = row.id;
                this.editCategoryData.name = row.name;
                this.editCategoryData.fake = row.fake.toString();
                // this.editCategoryData.parentId = row.parentId.toString();
                this.editCategoryData.sort = row.sort;
                this.editCategoryData.icon = row.icon;
            },
            // 上传商品分类icon  getImgURI
            editCategoryIconImg (file) {
                // this.upload_arg.fileList = [];  //清空上传img file

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.editCategoryIcon.push(file.raw);

                //上传icon
                let formData = new FormData();
                formData.append('file', this.upload_arg.editCategoryIcon[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                getImgURI(formData, config).then(res => {
                    // console.log(res);

                    this.editCategoryData.icon = res.data.data;
                });
            },
            // 提交编辑商品分类表单
            editCategorySubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        // console.log(this.editCategoryData);

                        this.listloading = true;

                        updateCategory(qs.stringify(this.editCategoryData)).then(res => {
                            // console.log(res.data.data.list);

                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("编辑成功");
                            }

                            this.editCategoryVisible = false;
                            this.listloading = false;
                            this.getCategory();
                        }).catch({});
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             *  api delCategory
             *  删除商品分类
             */
            delCategory (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let params = {
                        id: Object.assign({}, row).id,
                    }

                    this.listloading = true;

                    delCategory(qs.stringify(params)).then(res => {
                        if (res.data.code == 1) {
                            this.$message.warning(res.data.msg);
                        }

                        if (res.data.code == 0) {
                            this.$message.success("删除成功");
                        }

                        this.listloading = false;
                        this.getCategory();
                    }).catch({});
                }).catch(() => {});
            },
        },
        // 预处理
        created () {
            this.getCategory();  // 商品分类
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