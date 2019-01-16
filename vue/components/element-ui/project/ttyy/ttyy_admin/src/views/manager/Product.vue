<template>
    <section class="main_cont">
        <!-- 表单 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item>
                            <el-button type="primary" @click="addProduct" v-on:click="addProductVisible = true">添加商品</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <!-- 商品列表 -->
        <el-row>
            <el-table class="product_list" :data="product_info" border highlight-current-row v-loading="listLoading">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <el-table-column prop="id" label="商品id" width="80" align="center"></el-table-column>
                <!--<el-table-column prop="Productname" label="商品名" width="100" align="center"></el-table-column>-->
                <!--<el-table-column prop="name" label="商品昵称" width="100" align="center"></el-table-column>-->
                <!--<el-table-column label="商品角色" width="80" align="center">-->
                    <!--<template slot-scope="scope">-->
                        <!--{{ scope.row.isSuperAdmin === 1 ? "超级管理员" : "普通员工" }}-->
                    <!--</template>-->
                <!--</el-table-column>-->

                <!--<el-table-column prop="createAt" label="创建时间" width="200" align="center"></el-table-column>-->
                <!--<el-table-column prop="updateAt" label="更新时间" width="200" align="center"></el-table-column>-->

                <!--<el-table-column fixed="right" label="操作" width="100">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button type="text" size="small">编辑</el-button>-->
                        <!--<el-button type="text" size="small">删除</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
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

        </el-dialog>
    </section>
</template>

<script>
    import {
        findProductList,  // 获取商品列表
    } from '../../api/api.js';

    export default {
        name: 'commodity',

        data() {
            //项目类型验证
            // let validateType = (rule, value, callback) => {
            //     let reg = /^[0-2]$/;
            //
            //     if (!reg.test(value)) {
            //         return callback(new Error('项目类型只能输入0-2！'));
            //     }
            //
            //     callback();
            // };

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

                /**
                 * 商品列表
                 */
                product_info: [],  // 存放商品信息列表数据

                /**
                 * 添加商品
                 */
                // 添加商品数据
                addProductData: {
                },

                // 验证添加商品界面数据
                addProductRules: {
                },


                /**
                 *  弹出表单界面
                 */
                addProductVisible: false,  // 显示隐藏添加新的项目界面
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
                this.getOrderList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getOrderList();  // 加载分页数据
            },

            /**
             *  api
             *  获取商品信息
             */
            getProductList () {
                //接口参数
                let param = {
                    pageSize: this.page_arg.pagesize,
                    pageNum: this.page_arg.currentPage,
                };

                findProductList(JSON.stringify(param)).then(res => {
                    // console.log(res.data.data);

                    this.page_arg.total = res.data.data.total;
                    this.product_info = res.data.data.list;
                }).catch({});
            },

            /**
             *  api
             *  添加商品
             */
            // 点击添加项目
            addProduct () {
                console.log("添加商品");
            },

            // 提交添加商品表单
            addProductSubmit (formName) {
                this.listLoading = true;  //点击提交开始加载loading

                //验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        // addProject(qs.stringify(this.addProjectData)).then(() => {
                        //     this.$message({
                        //         message: "添加成功！",
                        //         type: "success"
                        //     });
                        //
                        //     this.addProjectVisible = false;  //隐藏编辑位置信息界面
                        //     this.listLoading = false;  //请求成功停止加载loading
                        //     this.getProjectList();  //刷新列表数据
                        // }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                        return false;
                    }
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