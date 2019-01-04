<template>
    <section class="main_cont">
        <!-- 表单 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item>
                            <el-input placeholder="请输入项目id" v-model="project_id" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="findProject">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addProject" v-on:click="addProjectVisible = true">添加项目</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <el-row>
            <!-- 项目列表 -->
            <el-table class="project_list" :data="project_info" border highlight-current-row v-loading="listLoading" height="600">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>
                <el-table-column prop="title" label="项目标题" width="150" align="center"></el-table-column>
                <el-table-column prop="logo" label="项目logo" width="150" align="center">
            	<template slot-scope="scope">
            		<img :src="scope.row.logoUrl" class="tabimg" />
            	</template>
                </el-table-column>
                <el-table-column prop="amount" label="申请人数" width="80" align="center"></el-table-column>
                <el-table-column prop="type" label="项目类型" width="80" align="center"></el-table-column>
                <el-table-column prop="desc" label="项目描述" width="auto"></el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="updateProject(scope.row)" v-on:click="updateProjectVisible = true" type="text" size="small">更新项目</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <!-- 添加新的设备 -->
        <el-dialog title="添加新的项目" :close-on-click-modal="false" :visible.sync="addProjectVisible" :before-close="handleClose">
            <el-form :model="addProjectData" status-icon :rules="addProjectRules" ref="addProjectForm" label-width="130px">
                <el-form-item label="项目标题" prop="title">
                    <el-input v-model="addProjectData.title" placeholder="请输入项目标题" clearable></el-input>
                </el-form-item>
                <!--<el-form-item label="项目logo" prop="logoUrl">-->
                    <!--<el-input v-model="addProjectData.logoUrl" placeholder="请输入项目logo" clearable></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="上传项目logo">
                    <el-upload
                            class="upload-demo"
                            action="http://10.10.10.238:8090/admin/item/add"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="项目申请人数" prop="amount">
                    <el-input v-model="addProjectData.amount" placeholder="请输入项目申请人数" clearable></el-input>
                </el-form-item>
                <el-form-item label="项目类型" prop="type">
                    <el-input v-model="addProjectData.type" placeholder="请输入项目类型" clearable></el-input>
                </el-form-item>
                <el-form-item label="项目描述" prop="desc">
                    <el-input v-model="addProjectData.desc" placeholder="请输入desc项目描述" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addProjectSubmit('addProjectForm')">提交</el-button>
                    <el-button @click="resetForm('addProjectForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑项目信息 -->
        <el-dialog title="更新项目" :close-on-click-modal="false" :visible.sync="updateProjectVisible" :before-close="handleClose">
            <el-form :model="updateProjectData" status-icon :rules="updateProjectRules" ref="updateProjectForm" label-width="130px">
                <el-form-item label="项目id" prop="id">
                    <el-input v-model="updateProjectData.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="项目标题" prop="title">
                    <el-input v-model="updateProjectData.title" placeholder="请输入项目标题" clearable></el-input>
                </el-form-item>
                <el-form-item label="项目logo" prop="logoUrl">
                    <el-input v-model="updateProjectData.logoUrl" placeholder="请输入项目logo" clearable></el-input>
                </el-form-item>
                <el-form-item label="项目申请人数" prop="amount">
                    <el-input v-model="updateProjectData.amount" placeholder="请输入项目申请人数" clearable></el-input>
                </el-form-item>
                <el-form-item label="项目类型" prop="type">
                    <el-input v-model="updateProjectData.type" placeholder="请输入项目类型" clearable></el-input>
                </el-form-item>
                <el-form-item label="项目描述" prop="desc">
                    <el-input v-model="updateProjectData.desc" placeholder="请输入desc项目描述" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateProjectSubmit('updateProjectForm')">提交</el-button>
                    <el-button @click="resetForm('updateProjectForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>
<script>
    import {
        getProjectList,  //获取项目列表
        findOne,  //根据id查询项目
        updateProject,  //修改项目
        addProject  //添加项目
    } from '../api/api.js';

    export default {
        name: 'project_manage',

        data() {
            return {
                /**
                 * common
                 */
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示
                sels: [],  //列表选中列

                project_id: 3,  //项目id

                /**
                 * 项目列表
                 */
                project_info: [],  //存放项目信息列表数据

                /**
                 * 添加项目
                 */
                //添加项目数据
                addProjectData: {
                    type: 0,
                    amount: 0,
                    title: "123",
                    desc: "456",
                },

                param:"",//表单要提交的参数
                src:"https://afp.alicdn.com/afp-creative/creative/u124884735/14945f2171400c10764ab8f3468470e4.jpg", //展示图片的地址

                // form: {
                //     logoFile: ''
                // },
                fileList: [],

                //验证添加项目界面数据
                addProjectRules: {
                    type: [
                        { required: true, message: '项目类型不能为空', trigger: 'blur' },
                    ],
                    amount: [
                        { required: true, message: '项目申请人数不能为空', trigger: 'blur' },
                    ],
                    title: [
                        { required: true, message: '项目标题不能为空', trigger: 'blur' },
                    ],
                    desc: [
                        { required: true, message: '项目描述不能为空', trigger: 'blur' },
                    ],
                    logoUrl: [
                        { required: true, message: '项目logo不能为空', trigger: 'blur' },
                    ]
                },

                // fileList: [],

                /**
                 *  更新项目
                 */
                //更新项目数据
                updateProjectData: {
                    id: 1,
                    type: 0,
                    amount: 0,
                    title: "",
                    desc: "",
                    logoUrl: "",
                },
                //验证更新项目界面数据
                updateProjectRules: {
                    type: [
                        { required: true, message: '项目类型不能为空', trigger: 'blur' },
                    ],
                    amount: [
                        { required: true, message: '项目申请人数不能为空', trigger: 'blur' },
                    ],
                    title: [
                        { required: true, message: '项目标题不能为空', trigger: 'blur' },
                    ],
                    desc: [
                        { required: true, message: '项目描述不能为空', trigger: 'blur' },
                    ],
                    logoUrl: [
                        { required: true, message: '项目logo不能为空', trigger: 'blur' },
                    ]
                },

                /**
                 *  弹出表单界面
                 */
                addProjectVisible: false,  //显示隐藏添加新的项目界面
                updateProjectVisible: false,  //显示隐藏更新项目界面
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
             * api
             */
            //获取项目信息
            getProjectList () {
                //接口参数
                let param = {
                    type: 0
                };

                getProjectList(JSON.stringify(param)).then(res => {
                    this.project_info = res.data.data;
                }).catch({});
            },
            //查找项目
            findProject () {
                //接口参数
                let param = {
                    id: this.project_id
                };

                //请求
                findOne(param).then(res => {
                    this.project_info = [];
                    this.project_info.push(res.data.data);
                }).catch({});
            },

            /**
             * 添加项目
             */
            //显示添加项目界面
            // handleRemove(file, fileList) {
            //     console.log(file, fileList);
            // },
            // handlePreview(file) {
            //     console.log(file);
            // },
            // handleExceed(files, fileList) {
            //     this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            // },
            // beforeRemove(file, fileList) {
            //     return this.$confirm(`确定移除 ${ file.name }？`);
            // },
            // fileChange(file, fileList) {
            //     console.log('change')
            //     console.log(file)
            //     this.form.loginFile = file.raw
            //     console.log(this.form.file)
            //     console.log(fileList)
            // },
            // // 文件上传成功时的钩子
            // handleSuccess(res, file, fileList) {
            //     this.$notify.success({
            //         title: '成功',
            //         message: `文件上传成功`
            //     });
            // },
            // // 文件上传失败时的钩子
            // handleError(err, file, fileList) {
            //     this.$notify.error({
            //         title: '错误',
            //         message: `文件上传失败`
            //     });
            // },
            // 文件超出个数限制时的钩子
            exceedFile(files, fileList) {
                this.$notify.warning({
                    title: '警告',
                    message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`
                });
            },
            // 文件状态改变时的钩子
            fileChange(file, fileList) {
                // console.log('change')
                // console.log(file)
                // this.form.logoFile = file.raw
                // console.log(this.form.logoFile)
                // console.log(fileList)
            },
            // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
            beforeUploadFile(file) {
                console.log(file);
                //创建临时的路径来展示图片
                var windowURL = window.URL || window.webkitURL;

                this.src=windowURL.createObjectURL(file);
                //重新写一个表单上传的方法
                this.param = new FormData();
                this.param.append('logoFile', file, file.name);
                return false;
                // console.log('before upload')
                // console.log(file)
                // let extension = file.name.substring(file.name.lastIndexOf('.')+1)
                // let size = file.size / 1024 / 1024
                // if(extension !== 'xlsx') {
                //     this.$notify.warning({
                //         title: '警告',
                //         message: `只能上传Excel2017（即后缀是.xlsx）的文件`
                //     });
                // }
                // if(size > 10) {
                //     this.$notify.warning({
                //         title: '警告',
                //         message: `文件大小不得超过10M`
                //     });
                // }
            },
            // 文件上传成功时的钩子
            handleSuccess(res, file, fileList) {
                this.src = file.url;
                this.formData.files.push(file.raw);

                this.$notify.success({
                    title: '成功',
                    message: `文件上传成功`
                });
            },
            // 文件上传失败时的钩子
            handleError(err, file, fileList) {
                this.$notify.error({
                    title: '错误',
                    message: `文件上传失败`
                });
            },
            addProject () {
                console.log("添加项目");
            },
            //提交添加项目表单
            addProjectSubmit (formName) {
                this.listLoading = true;  //点击提交开始加载loading

                //验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        let formData = new FormData();

                        formData.append("logoFile", this.form.logoFile);

                        console.log(this.fileList);

                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }

                        addProject(formData, config).then((res) => {
                            console.log(res);
                            // this.addProjectVisible = false;  //隐藏编辑位置信息界面
                            // this.listLoading = false;  //请求成功停止加载loading
                            // this.getProjectList();  //刷新列表数据
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /**
             * 更新项目
             */
            //显示更新项目界面
            updateProject (row) {
                this.updateProjectData = Object.assign({}, row);
            },
            //提交更新项目表单
            updateProjectSubmit(formName) {
                this.listLoading = true;  //点击提交开始加载loading

                //验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        updateProject(this.updateProjectData).then(() => {
                            this.updateProjectVisible = false;  //隐藏编辑位置信息界面

                            this.$message({
                                message: "更新成功！",
                                type: "success"
                            });

                            this.listLoading = false;  //请求成功停止加载loading
                            this.getProjectList();  //刷新列表数据
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        created () {
            this.getProjectList();
        }
    }
</script>

<style scoped>
    .tabimg{
        display: block;
        width: 40px;
        height: 40px;
        margin: 0 auto;
    }
</style>