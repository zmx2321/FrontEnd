<template>
    <section class="main_cont">
        <!-- 按钮 -->
        <el-row class="toolbar bdr_radiu f-cb" v-if="userType == 0">
            <el-col class="f-cb btn_wrap">
                <el-upload
                        class="f-fl upload_btn"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        ref='upload'
                        multiple
                        :before-upload="beforeUpload"
                        :on-change="excelUploadFile"
                        :before-remove="beforeRemove"
                        :limit="upload_arg.limit"
                        :on-exceed="handleExceed"
                        accept=".xlsx"
                        :file-list="upload_arg.fileList">
                    <el-button size="small" type="primary">导入用户</el-button>
                </el-upload>
                <a class="f-fl mod" href="http://hk-admin.fanxy7.cn/template/template.xlsx">下载模板</a>
            </el-col>
        </el-row>

        <!-- 用户列表 -->
        <el-row>
            <el-table class="user_list" :data="user_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 226px)">
                <el-table-column type="index" width="60" align="center"></el-table-column>
                <!--<el-table-column prop="id" label="用户编号" width="80" align="center"></el-table-column>-->

                <el-table-column prop="mobile" label="手机号码" width="auto" align="center"></el-table-column>
                <el-table-column prop="realName" label="姓名" width="auto" align="center"></el-table-column>
                <el-table-column prop="identity" label="身份证" width="320" align="center"></el-table-column>
                <el-table-column prop="area" label="地址" width="auto" align="center"></el-table-column>
                <el-table-column prop="zhimafen" label="芝麻分" width="90" align="center"></el-table-column>
                <el-table-column prop="memo" label="备注" width="auto" align="center"></el-table-column>

                <el-table-column label="是否联系" width="auto" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.contacted === 0 ? "未联系" : "已联系" }}
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="tagUser(scope.row)" v-on:click="tagUserVisible = true">标记</el-button>
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

        <!-- 充值 -->
        <el-dialog title="充值" @keyup.enter.native="tagUserSubmit('tagUserForm')" :close-on-click-modal="false" :visible.sync="tagUserVisible" :before-close="handleClose">
            <el-form :model="tagUserData" status-icon :rules="tagUserRules" ref="tagUserForm" label-width="160px">
                <!--<el-form-item label="用户编号" prop="userId">
                    <el-input v-model="tagUserData.userId" disabled></el-input>
                </el-form-item>-->
                <el-form-item label="姓名" prop="realName">
                    <el-input v-model="tagUserData.realName" disabled></el-input>
                </el-form-item>

                <el-form-item label="是否已经联系" prop="contacted">
                    <el-select v-model="tagUserData.contacted">
                        <el-option label="未联系" value="0"></el-option>
                        <el-option label="已联系" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注" prop="memo">
                    <el-input type="textarea" v-model="tagUserData.memo" placeholder="请输入备注" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="tagUserSubmit('tagUserForm')">提交</el-button>
                    <el-button @click="resetForm('tagUserForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        excelUpload,  // 上传文件
        getUser,  // 获取用户列表
        tagUser,  // 标记用户
    } from '../../api/api.js';

    export default {
        name: 'account_manager',

        data() {
            return {
                /**
                 * common
                 */
                listLoading: false,  // lodding动画
                dialogVisible: false,  //

                // 用户类型
                userType: 0,

                // 分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 20, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                // 上传文件参数
                upload_arg: {
                    limit:1,
                    file: [],
                    fileList: []
                },

                /**
                 * 用户
                 */
                // 用户列表
                user_info: [],  // 存放用户信息列表数据

                /**
                 * 标记用户
                 */
                // 标记用户数据
                tagUserData: {
                    realName: "",  // 姓名
                    userId: "",  // (被标记用户的ID)
                    contacted: "1",  // contacted 是否已经联系（1-已联系，0-未联系；前端提供下拉选择）
                    memo: "",  // memo 备注，512个字符限制
                },

                // 验证标记用户数据
                tagUserRules: {
                    memo: [
                        { max: 512, message: "长度不大于 512 个字符", trigger: "blur" }
                    ],
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                tagUserVisible: false,  // 标记用户界面
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
            //获取文件后缀名
            getFileType(fileName){
                let fileLength = fileName.length,  //文件名总长度
                    beforeFileLength = fileName.lastIndexOf('.');  //文件名长度

                //截取字符串，获取文件后缀名
                let suffix = fileName.substring(beforeFileLength+1, fileLength);

                return suffix;
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getUserList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getUserList();  // 加载分页数据
            },

            /**
             * el-upload common
             */
            // 文件上传之前
            beforeUpload (file) {
                this.upload_arg.file = [];
            },
            // 文件超出个数限制时的钩子
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 ${this.upload_arg.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);


            },
            // 删除文件之前的钩子
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },

            /**
             *  api getUser
             *  获取用户信息
             */
            // 获取用户列表
            getUserList () {
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                };

                // loading
                this.listLoading = true;

                // 请求接口
                getUser(param).then(res => {
                    // console.log(res.data.code);

                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        this.user_info = res.data.data.set;

                        // 返回分页总数
                        this.page_arg.total = res.data.data.pager.total;
                    }

                    this.listLoading = false;
                }).catch({});
            },

            /**
             * api excelUpload
             * 上传文件
             */
            excelUploadFile (file) {
                this.upload_arg.file = [];
                this.upload_arg.fileList = [];

                this.upload_arg.file.push(file.raw);

                let formData = new FormData();

                formData.append('file', this.upload_arg.file[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };

                const isFile = this.getFileType(file.name) === 'xlsx';

                if (!isFile) {
                    this.$message.error('上传文件只能是*.xlsx格式!');
                } else {
                    excelUpload(formData, config).then(res => {
                        // console.log(res);

                        if (res.data.code == 1) {
                            this.$message.warning(res.data.msg);
                            this.upload_arg.fileList = [];

                            return false;
                        }

                        if (res.data.code == 0) {
                            this.$message.success("导入成功！");
                            this.getUserList();
                        }
                    });
                }
            },

            /**
             * api tagUser
             * 标记用户
             */
            // 点击标记
            tagUser (row) {
                // 浅拷贝 Object.assign({}, row)
                this.tagUserData.userId = row.id;
                this.tagUserData.realName = row.realName;
            },

            // 提交标记用户表单
            tagUserSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        let params = {
                            userId: this.tagUserData.userId,
                            contacted: this.tagUserData.contacted,
                            memo: this.tagUserData.memo,
                        }

                        tagUser(qs.stringify(params)).then(res => {
                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("标记成功！");
                                this.getUserList();
                            }

                            this.tagUserVisible = false;
                        }).catch({});
                    } else {  //验证失败跳出
                        this.$message.error("表单填写错误");
                    }
                });
            },
        },
        // 预处理
        created () {
            this.getUserList();

            this.userType = localStorage.userType;
        }
    }
</script>

<style lang="less" scoped>
    a.mod {
        color: #409EFF;
        font-size: 12px;
        margin: 23px 15px 0 0;
        transition: 0.2s linear;
    }

    a.mod:hover {
        color: #333;
        transition: 0.3s linear;
    }
    
    /deep/ .upload_btn {
        /*width: 85%;*/
        width: 110px;
        margin-left: 15px;

        .el-upload {
            float: left;

            button {
                padding: 12px 20px;
            }
        }

        ul {
            float: left;
            width: 50%;
            margin-left: 15px;
            display: none;

            li {
                a {

                }
            }
        }
    }
</style>