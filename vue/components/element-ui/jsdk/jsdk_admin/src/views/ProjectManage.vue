<template>
    <section class="main_cont">
        <!-- 表单 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item>
                            <el-input placeholder="请输入项目id" @keyup.enter.native="findProject" v-model="project_id" clearable></el-input>
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

        <!-- 项目列表 -->
        <el-row>
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
        <el-dialog title="添加新的项目" @keyup.enter.native="addProjectSubmit('addProjectForm')" :close-on-click-modal="false" :visible.sync="addProjectVisible" :before-close="handleClose">
            <el-form :model="addProjectData" status-icon :rules="addProjectRules" ref="addProjectForm" label-width="130px">
                <el-form-item label="项目标题" prop="title">
                    <el-input v-model="addProjectData.title" placeholder="请输入项目标题" clearable></el-input>
                </el-form-item>
                <el-form-item label="上传项目logo">
                    <el-upload
                            class="upload-demo"
                            action="http://api8084.ximuok.com/admin/item/add"
                            ref='upload'
                            :on-preview="handlePreview"
                            :before-upload="handleBeforeUpload"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :on-change="handleChange"
                            multiple
                            :limit="upload_arg.limit"
                            :on-exceed="handleExceed"
                            :file-list="upload_arg.fileList"
                            :auto-upload='false'>
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过500kb</div>
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
        <el-dialog title="更新项目" :close-on-click-modal="false" @keyup.enter.native="updateProjectSubmit('updateProjectForm')" :visible.sync="updateProjectVisible" :before-close="handleClose">
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

                project_id: "",  //项目id

                /**
                 * 项目列表
                 */
                project_info: [],  //存放项目信息列表数据

                /**
                 * 添加项目
                 */
                //添加项目数据
                addProjectData: {
                    type: 1,
                    amount: 1000,
                    title: "qq",
                    desc: "11qqqqq",
                    // ?title=qq&desc=11qqqqq&amount=1000&type=1
                },

                //上传图片参数
                upload_arg: {
                    limit:1,
                    logoFile: [],
                    fileList: [],
                },

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
                },

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
            //获取文件后缀名
            getFileType(fileName){
                let fileLength = fileName.length,  //文件名总长度
                    beforeFileLength = fileName.lastIndexOf('.');  //文件名长度

                //截取字符串，获取文件后缀名
                let suffix = fileName.substring(beforeFileLength+1, fileLength)

                return suffix;
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
            addProject () {
                // console.log("添加项目");
            },
            //el-upload
            // 上传文件之前的钩子
            handleBeforeUpload(file) {
                // console.log('上传文件之前的钩子');

                // console.log(file);
            },
            // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            handleChange(file, fileList){
                // console.log("文件状态改变时的钩子");

                //获取文件类型
                let fileType = this.getFileType(file.name);

                //判断文件类型是否符合条件
                if(!(fileType == "jpg" || fileType == "jpeg")){
                    this.$message.warning({
                        title: '警告',
                        message: '请上传格式为image/jpg, image/jpeg的图片'
                    })
                    this.upload_arg.fileList = [];
                } else {
                    //上传文件变化时将文件对象push进files数组
                    this.upload_arg.logoFile.push(file.raw);
                }
            },
            // 文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                // console.log("文件列表移除文件时的钩子");
                // console.log(file, fileList);
            },
            // 点击文件列表中已上传的文件时的钩子
            handlePreview(file) {
                // console.log("点击文件列表中已上传的文件时的钩子");
                // console.log(file);
            },
            // 文件超出个数限制时的钩子
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 ${this.upload_arg.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            // 删除文件之前的钩子
            beforeRemove(file) {
                // console.log("删除文件之前的钩子");
                // console.log(fileList);
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //提交添加项目表单
            addProjectSubmit (formName) {
                this.listLoading = true;  //点击提交开始加载loading

                //验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        let formData = new FormData();

                        formData.append('logoFile', this.upload_arg.logoFile[0]);

                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        };

                        // ?title=qq&desc=11qqqqq&amount=1000&type=1
                        // qs.stringify(this.addProjectData) ,
                        addProject(formData, config).then((res) => {
                            // console.log(res);

                            this.$message({
                                message: "添加成功！",
                                type: "success"
                            });

                            this.addProjectVisible = false;  //隐藏编辑位置信息界面
                            this.listLoading = false;  //请求成功停止加载loading
                            this.getProjectList();  //刷新列表数据
                            this.upload_arg.fileList = [];  //清空上传图片
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
            console.log(this.md5("admin"));
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