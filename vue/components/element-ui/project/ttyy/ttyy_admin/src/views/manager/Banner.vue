<template>
    <section class="main_cont">
        <!-- 表单 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item>
                            <el-button type="primary" @click="addBanner" v-on:click="addBannerVisible = true">添加banner</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <!-- banner列表 -->
        <el-row>
            <el-table class="banner_list" :data="banner_info" border highlight-current-row v-loading="listLoading">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <el-table-column prop="id" label="banner_id" width="100" align="center"></el-table-column>
                <el-table-column prop="title" label="名称" width="100" align="center"></el-table-column>

                <el-table-column label="banner图" width="100" align="center">
                    <template slot-scope="scope">
            		<img :src="scope.row.img" class="tabimg" />
            	</template>
                </el-table-column>

                <el-table-column label="类型" width="100" align="center" :formatter="formatType"></el-table-column>

                <el-table-column label="访问链接" width="100" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a :href="scope.row.target" target="_blank" class="buttonText">链接</a>
                    </template>
                </el-table-column>

                <el-table-column prop="desc" label="描述" width="auto"></el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="updateBanner(scope.row)" v-on:click="updateBannerVisible = true">编辑</el-button>
                        <el-button type="text" size="small" @click="delBanner(scope.row)">删除</el-button>
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

        <!-- 添加banner -->
        <el-dialog title="添加banner" @keyup.enter.native="addBannerSubmit('addBannerForm')" :close-on-click-modal="false" :visible.sync="addBannerVisible" :before-close="handleClose">
            <el-form :model="addBannerData" status-icon :rules="addBannerRules" ref="addBannerForm" label-width="100px">
                <el-form-item label="跳转目标" prop="target">
                    <el-input v-model="addBannerData.target"  placeholder="请输入跳转目标" clearable></el-input>
                </el-form-item>
                <el-form-item label="banner标题" prop="title">
                    <el-input v-model="addBannerData.title" placeholder="请输入banner标题" clearable></el-input>
                </el-form-item>
                <el-form-item label="banner类型" prop="type">
                    <el-input v-model="addBannerData.type" placeholder="请输入banner类型" clearable></el-input>
                </el-form-item>
                <el-form-item label="banner路径" prop="img">
                    <el-input v-model="addBannerData.img" placeholder="请输入banner路径" clearable></el-input>
                </el-form-item>
                <el-form-item label="banner描述" prop="desc">
                    <el-input type="textarea" v-model="addBannerData.desc" placeholder="请输入banner描述" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addBannerSubmit('addBannerForm')">提交</el-button>
                    <el-button @click="resetForm('addBannerForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑banner -->
        <el-dialog title="编辑banner" @keyup.enter.native="updateBannerSubmit('updateBannerForm')" :close-on-click-modal="false" :visible.sync="updateBannerVisible" :before-close="handleClose">
            <el-form :model="updateBannerData" status-icon :rules="updateBannerRules" ref="updateBannerForm" label-width="100px">
                <el-form-item label="bannerId" prop="id">
                    <el-input v-model="updateBannerData.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="跳转目标" prop="target">
                    <el-input v-model="updateBannerData.target"  placeholder="请输入跳转目标" clearable></el-input>
                </el-form-item>
                <el-form-item label="banner标题" prop="title">
                    <el-input v-model="updateBannerData.title" placeholder="请输入banner标题" clearable></el-input>
                </el-form-item>
                <el-form-item label="banner类型" prop="type">
                    <el-input v-model="updateBannerData.type" placeholder="请输入banner类型" clearable></el-input>
                </el-form-item>
                <el-form-item label="banner路径" prop="img">
                    <el-input v-model="updateBannerData.img" placeholder="请输入banner路径" clearable></el-input>
                </el-form-item>
                <el-form-item label="banner描述" prop="desc">
                    <el-input type="textarea" v-model="updateBannerData.desc" placeholder="请输入banner描述" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="updateBannerSubmit('updateBannerForm')">提交</el-button>
                    <el-button @click="resetForm('updateBannerForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        findBannerList,  // 获取管理员和员工列表
        addBanner,  // 添加banner
        updateBanner,  // 编辑banner
        delBanner  // 删除banner
    } from '../../api/api.js';

    export default {
        name: 'banner',

        data() {
            // banner类型验证
            let validateType = (rule, value, callback) => {
                let reg = /^[0-3]$/;

                if (!reg.test(value)) {
                    return callback(new Error('banner类型只能输入0-3！'));
                }

                callback();
            };

            //url验证
            let validateUrl = (rule, value, callback) => {
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

                //分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 10, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                /**
                 * banner列表
                 */
                banner_info: [],  // 存放项目信息列表数据

                /**
                 * 添加banner
                 */
                // 添加banner数据
                addBannerData: {
                    target: "http://www.baidu.com",  // 目标
                    type: "0",  // 类型 0：视频，1：平台, 2: URL, 为 NULL 前端不跳转
                    title: "无敌破坏王",  // 标题
                    img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543572159322&di=583e210fadd6501a474809b5f6d991a9&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170710%2F609db0fc0bfa4c7fae6a3c4f58b8d932_th.png",  // 图片
                    desc: "无敌破坏王无敌破坏王无敌破坏王无敌破坏王无敌破坏王",  // 描述文字
                },

                // 验证添加用户界面数据
                addBannerRules: {
                    target: [
                        { required: true, message: '跳转目标不能为空！', trigger: 'blur' },
                        { validator: validateUrl, trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '类型不能为空！', trigger: 'blur' },
                        { validator: validateType, trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '标题不能为空！', trigger: 'blur' }
                    ],
                    img: [
                        { required: true, message: '图片路径不能为空！', trigger: 'blur' },
                        { validator: validateUrl, trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '描述文字不能为空！', trigger: 'blur' }
                    ]
                },

                /**
                 * 编辑banner
                 */
                // 编辑banner数据
                updateBannerData: {
                    id: "",
                    bannerId: "",
                    target: "http://",  // 目标
                    type: "",  // 类型 0：视频，1：平台, 2: URL, 为 NULL 前端不跳转
                    title: "",  // 标题
                    img: "https://",  // 图片
                    desc: "",  // 描述文字
                },

                // 验证添加用户界面数据
                updateBannerRules: {
                    target: [
                        { required: true, message: '跳转目标不能为空！', trigger: 'blur' },
                        { validator: validateUrl, trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '类型不能为空！', trigger: 'blur' },
                        { validator: validateType, trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '标题不能为空！', trigger: 'blur' }
                    ],
                    img: [
                        { required: true, message: '图片路径不能为空！', trigger: 'blur' },
                        { validator: validateUrl, trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '描述文字不能为空！', trigger: 'blur' }
                    ]
                },

                /**
                 *  弹出表单界面
                 */
                addBannerVisible: false,  // 显示隐藏添加新的项目界面
                updateBannerVisible: false,  // 显示隐藏添加新的项目界面
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
                }).catch(() => {});
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
                this.getRedeemCodeList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getBannerList();  // 加载分页数据
            },

            /**
             *  api
             *  获取banner信息
             */
            getBannerList () {
                //接口参数
                let param = {
                    pageSize: this.page_arg.pagesize,
                    pageNum: this.page_arg.currentPage,
                };

                findBannerList(JSON.stringify(param)).then(res => {
                    // console.log(res.data.data);

                    this.banner_info = res.data.data.list;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;
                }).catch({});
            },
            formatType (row) {
                switch (row.type) {
                    case 0:
                        return "视频";
                        break;
                    case 1:
                        return "平台";
                        break;
                    case 2:
                        return "null";
                        break;
                    default :
                        return "null";
                        break;
                }
            },

            /**
             *  api
             *  添加banner
             */
            // 点击添加项目
            addBanner () {
                // console.log("添加banner");
            },

            // 提交添加用户表单
            addBannerSubmit (formName) {
                this.listLoading = true;  //点击提交开始加载loading

                // 验证表单
                this.$refs[formName].validate((valid) => {
                    if (valid) {  // 如果验证成功，请求接口数据
                        addBanner(qs.stringify(this.addBannerData)).then(() => {
                            this.$message({
                                message: "添加成功！",
                                type: "success"
                            });

                            this.addBannerVisible = false;  //隐藏添加banner信息界面

                            this.listLoading = false;  //请求成功停止加载loading

                            this.getBannerList();  //刷新列表数据
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /**
             *  api
             *  编辑banner
             */
            // 编辑banner(浅拷贝列表数据到表单)
            updateBanner (row) {
                // console.log("编辑banner");

                this.updateBannerData = Object.assign({}, row);

                this.updateBanner.bannerId = this.updateBannerData.id
                console.log(this.updateBanner.bannerId);
            },

            // 提交编辑banner表单
            updateBannerSubmit (formName) {
                this.listLoading = true;  //点击提交开始加载loading

                // 验证表单
                this.$refs[formName].validate((valid) => {
                    if (valid) {  // 如果验证成功，请求接口数据
                        updateBanner(qs.stringify(this.updateBannerData)).then(() => {
                            this.$message({
                                message: "添加成功！",
                                type: "success"
                            });

                            this.addBannerVisible = false;  //隐藏编辑banner界面

                            this.listLoading = false;  //请求成功停止加载loading

                            this.getBannerList();  //刷新列表数据
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /**
             *  api
             *  删除banner
             */
            // 单个兑换码删除
            delBanner (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let id = Object.assign({}, row).id;

                    let params = {
                        id: id
                    }

                    // console.log(params);

                    delBanner(qs.stringify(params)).then(() => {
                        this.$message({
                            message: "删除成功！",
                            type: "success"
                        });

                        this.getBannerList();  // 加载分页数据
                    }).catch({});
                }).catch(() => {});
            },
        },
        // 预处理
        created () {
            this.getBannerList();
        }
    }
</script>

<style scoped>
    .toolbar {
        padding-bottom: 0;
    }

    .tabimg{
        display: block;
        width: 40px;
        height: 40px;
        margin: 0 auto;
    }
</style>