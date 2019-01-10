<template>
    <section class="main_cont">
        <!-- 表单 -->
        <el-row>
            <el-form :inline="true">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item label="">
                            <el-input placeholder="请输入项目标题" v-model="search_list_arg.title" @keyup.enter.native="findProjectList" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input placeholder="请输入项目类型" v-model="search_list_arg.type" @keyup.enter.native="findProjectList" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input placeholder="请输入项目描述关键字" v-model="search_list_arg.desc" @keyup.enter.native="findProjectList" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="findProjectList">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addProject" v-on:click="addProjectVisible = true">添加项目</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col class="tip">项目类型(只允许输入0-2){[0:快速微额贷][1:热门极速贷][2:大额贷款]}</el-col>
                    <!--<el-col :span="22">-->
                        <!--<el-form-item label="根据id查询">-->
                            <!--<el-input placeholder="请输入项目id" @keyup.enter.native="findProject" v-model="project_id" clearable></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item>-->
                            <!--<el-button type="primary" @click="findProject">查询</el-button>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item>-->
                            <!--<el-button type="primary" @click="addProject" v-on:click="addProjectVisible = true">添加项目</el-button>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                </el-col>
            </el-form>
        </el-row>

        <!-- 项目列表 -->
        <el-row>
            <el-table class="project_list" :data="project_info" border highlight-current-row v-loading="listLoading">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>
                <el-table-column prop="sort" label="序号" width="60" align="center"></el-table-column>
                <el-table-column prop="title" label="项目标题" width="150" align="center"></el-table-column>
                <el-table-column label="项目logo" width="150" align="center">
            	<template slot-scope="scope">
            		<img :src="scope.row.logoUrl" class="tabimg" />
            	</template>
                </el-table-column>
                <el-table-column prop="amount" label="申请人数" width="80" align="center"></el-table-column>
                <el-table-column prop="type" label="项目类型" width="80" align="center"></el-table-column>

                <el-table-column label="访问链接" width="100" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a :href="scope.row.targetUrl" target="_blank" class="buttonText">链接</a>
                    </template>
                </el-table-column>

                <el-table-column prop="desc" label="项目描述" width="auto"></el-table-column>

                <el-table-column fixed="right" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button @click="updateProject(scope.row)" v-on:click="updateProjectVisible = true" type="text" size="small">更新项目</el-button>
                        <el-button @click="updateProjectSort(scope.row)" v-on:click="updateProjectSortVisible = true" type="text" size="small">编辑序号</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-col :span="24" class="toolbar f-cb">
                <el-pagination class="f-fr" layout="prev, pager, next, total"  @current-change="handleCurrentChange" :total="page_arg.total"></el-pagination>
            </el-col>
        </el-row>

        <!-- 添加新的设备 -->
        <el-dialog title="添加新的项目" @keyup.enter.native="addProjectSubmit('addProjectForm')" :close-on-click-modal="false" :visible.sync="addProjectVisible" :before-close="handleClose">
            <el-col class="tip mgt toolbar bdr_radiu">
                <el-col class="mgt">项目类型(只允许输入0-2)</el-col>
                <el-col class="mgt">0：快速微额贷</el-col>
                <el-col class="mgt">1：热门极速贷</el-col>
                <el-col class="mgt">2：大额贷款</el-col>
            </el-col>

            <el-form :model="addProjectData" status-icon :rules="addProjectRules" ref="addProjectForm" label-width="150px">
                <el-form-item label="项目标题" prop="title">
                    <el-input v-model="addProjectData.title" placeholder="请输入项目标题" clearable></el-input>
                </el-form-item>
                <el-form-item label="项目跳转目的URL" prop="targetUrl">
                    <el-input v-model="addProjectData.targetUrl" placeholder="请输入跳转目的URL" clearable></el-input>
                </el-form-item>
                <el-form-item label="上传项目logo">
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
                        <!--<div slot="tip" class="el-upload__tip">只能上传图片格式文件</div>-->
                    </el-upload>
                </el-form-item>
                <el-form-item label="项目logo" prop="logoUrl">
                    <el-input v-model="addProjectData.logoUrl" placeholder="请输入项目logo" clearable></el-input>
                </el-form-item>
                <el-form-item label="项目申请人数" prop="amount">
                    <el-input v-model="addProjectData.amount" placeholder="请输入项目申请人数" clearable></el-input>
                </el-form-item>
                <el-form-item label="项目类型" prop="type">
                    <el-input v-model="addProjectData.type" placeholder="请输入项目类型" clearable></el-input>
                </el-form-item>
                <el-form-item label="序号" prop="sort">
                    <el-input v-model="addProjectData.sort" placeholder="请输入序号(非必填)" clearable></el-input>
                </el-form-item>
                <el-form-item label="项目描述" prop="desc">
                    <el-input class="textarea" type="textarea" v-model="addProjectData.desc" placeholder="请输入desc项目描述" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addProjectSubmit('addProjectForm')">提交</el-button>
                    <el-button @click="resetForm('addProjectForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑项目信息 -->
        <el-dialog title="更新项目" :close-on-click-modal="false" @keyup.enter.native="updateProjectSubmit('updateProjectForm')" :visible.sync="updateProjectVisible" :before-close="handleClose">
            <el-col class="tip mgt toolbar bdr_radiu">
                <el-col class="mgt">项目类型(只允许输入0-2)</el-col>
                <el-col class="mgt">0：快速微额贷</el-col>
                <el-col class="mgt">1：热门极速贷</el-col>
                <el-col class="mgt">2：大额贷款</el-col>
            </el-col>

            <el-form :model="updateProjectData" status-icon :rules="updateProjectRules" ref="updateProjectForm" label-width="150px">
                <el-form-item label="项目id" prop="id">
                    <el-input v-model="updateProjectData.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="项目标题" prop="title">
                    <el-input v-model="updateProjectData.title" placeholder="请输入项目序号" clearable></el-input>
                </el-form-item>
                <el-form-item label="项目跳转目的URL" prop="targetUrl">
                    <el-input v-model="updateProjectData.targetUrl" placeholder="请输入跳转目的URL" clearable></el-input>
                </el-form-item>

                <el-form-item label="上传项目logo">
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
                        <!--<div slot="tip" class="el-upload__tip">只能上传图片格式文件</div>-->
                    </el-upload>
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
                    <el-input type="textarea" v-model="updateProjectData.desc" placeholder="请输入desc项目描述" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="updateProjectSubmit('updateProjectForm')">提交</el-button>
                    <el-button @click="resetForm('updateProjectForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑序号 -->
        <el-dialog title="编辑序号" :close-on-click-modal="false" @keyup.enter.native="updateProjectSortSubmit('updateProjectSortForm')" :visible.sync="updateProjectSortVisible" :before-close="handleClose">
            <el-form :model="updateProjectSortData" status-icon :rules="updateProjectSortRules" ref="updateProjectSortForm" label-width="130px">
                <el-form-item label="项目id" prop="id">
                    <el-input v-model="updateProjectSortData.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="项目序号" prop="sort">
                    <el-input v-model="updateProjectSortData.sort" placeholder="请输入项目序号" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="updateProjectSortSubmit('updateProjectSortForm')">提交</el-button>
                    <el-button @click="resetForm('updateProjectSortForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        getProjectList,  //获取项目列表
        findOne,  //根据id查询项目
        getLogoUrl,  //获取logo url
        updateProject,  //修改项目
        updateProjectSort,  //编辑序号
        addProject  //添加项目
    } from '../../api/api.js';

    export default {
        name: 'project_manage',

        data() {
            //项目类型验证
            let validateType = (rule, value, callback) => {
                let reg = /^[0-2]$/;

                if (!reg.test(value)) {
                    return callback(new Error('项目类型只能输入0-2！'));
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
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示

                project_id: "",  //项目id

                //查询参数
                search_list_arg: {
                    desc: "",
                    title: "",
                    type: ""
                },

                //分页参数
                page_arg: {
                    pagesize: "10",  // 初始一页条数
                    currentPage: "1",  // 当前第几页
                    total: 0,  // 用于table的 :total
                },

                /**
                 * 项目列表
                 */
                project_info: [],  //存放项目信息列表数据

                /**
                 * 添加项目
                 */
                //添加项目数据
                addProjectData: {
                    type: "",
                    amount: "",
                    title: "",
                    desc: "",
                    logoUrl: "",
                    targetUrl: "http://"
                },

                //上传图片参数
                upload_arg: {
                    limit:1,
                    logoFile: [],
                    fileList: []
                },

                //验证添加项目界面数据
                addProjectRules: {
                    type: [
                        { required: true, message: '项目类型不能为空', trigger: 'blur' },
                        { validator: validateType, trigger: 'blur' },
                    ],
                    amount: [
                        { required: true, message: '项目申请人数不能为空！', trigger: 'blur' },
                    ],
                    title: [
                        { required: true, message: '项目标题不能为空！', trigger: 'blur' },
                    ],
                    desc: [
                        { required: true, message: '项目描述不能为空！', trigger: 'blur' },
                    ],
                    logoUrl: [
                        { required: true, message: '项目logo不能为空！', trigger: 'blur' },
                    ],
                    targetUrl: [
                        { required: true, message: '跳转目的URL不能为空！', trigger: 'blur' },
                        { validator: validateUrl, trigger: 'blur' },
                    ]
                },

                /**
                 *  更新项目
                 */
                //更新项目数据
                updateProjectData: {
                    id: "",
                    type: "",
                    amount: "",
                    title: "",
                    desc: "",
                    logoUrl: "",
                    targetUrl: ""
                },
                //验证更新项目界面数据
                updateProjectRules: {
                    type: [
                        { required: true, message: '项目类型不能为空！', trigger: 'blur' },
                        { validator: validateType, trigger: 'blur' },
                    ],
                    amount: [
                        { required: true, message: '项目申请人数不能为空！', trigger: 'blur' },
                    ],
                    title: [
                        { required: true, message: '项目标题不能为空！', trigger: 'blur' },
                    ],
                    desc: [
                        { required: true, message: '项目描述不能为空！', trigger: 'blur' },
                    ],
                    logoUrl: [
                        { required: true, message: '项目logo不能为空！', trigger: 'blur' },
                    ],
                    targetUrl: [
                        { required: true, message: '跳转目的URL不能为空！', trigger: 'blur' },
                        { validator: validateUrl, trigger: 'blur' },
                    ]
                },

                /**
                 * 编辑序号
                 */
                //编辑序号数据
                updateProjectSortData: {
                    id: "",
                    sort: ""
                },
                //验证编辑序号界面数据
                updateProjectSortRules: {
                    sort: [
                        { required: true, message: '序号不能为空！', trigger: 'blur' },
                    ],
                },

                /**
                 *  弹出表单界面
                 */
                addProjectVisible: false,  //显示隐藏添加新的项目界面
                updateProjectVisible: false,  //显示隐藏更新项目界面
                updateProjectSortVisible: false,  //显示隐藏编辑序号界面
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
                let suffix = fileName.substring(beforeFileLength+1, fileLength);

                return suffix;
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
                this.addProjectData.logoUrl = "";
                this.updateProjectData.logoUrl = "";
                return this.$confirm(`确定移除 ${ file.name }？`);
            },

            /**
             *  分页
             */
            // 控制每页的数量--分页
            handleCurrentChange(val) {
                this.page_arg.currentPage = val;
                this.getProjectList();
            },

            /**
             *  api
             *  获取项目信息
             */
            getProjectList () {
                //接口参数
                let param = {
                    pageSize: this.page_arg.pagesize,
                    pageNum: this.page_arg.currentPage,
                };

                getProjectList(JSON.stringify(param)).then(res => {
                    // console.log(res.data.data);

                    this.page_arg.total = res.data.data.total;
                    this.project_info = res.data.data.list;
                }).catch({});
            },

            /**
             *  api
             *  查找单个项目
             */
            findProject () {
                //接口参数
                let param = {
                    id: this.project_id
                };

                //请求
                findOne(param).then(res => {
                    this.$message({
                        message: "查询成功！",
                        type: "success"
                    });

                    this.project_info = [];
                    this.project_info.push(res.data.data);
                }).catch({});
            },

            /**
             *  api
             *  查找项目列表
             */
            findProjectList () {
                this.listLoading = true;

                getProjectList(JSON.stringify(this.search_list_arg)).then(res => {
                    this.listLoading = false;

                    this.page_arg.total = res.data.data.total;
                    this.project_info = res.data.data.list;
                }).catch({});
            },

            /**
             *  api
             *  添加项目
             */
            //点击添加项目
            addProject () {
                this.upload_arg.fileList = [];  //清空上传logo file
            },
            //el-upload
            // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            addHandleChange(file){
                // console.log("文件状态改变时的钩子");

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.logoFile.push(file.raw);

                //上传图片
                this.addUpload();
            },

            // 获取logo url
            addUpload(){
                let formData = new FormData();

                formData.append('logoFile', this.upload_arg.logoFile[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                getLogoUrl(formData, config).then(res=>{
                    this.addProjectData.logoUrl = res.data.data.logoUrl;
                });
            },

            //提交添加项目表单
            addProjectSubmit (formName) {
                this.listLoading = true;  //点击提交开始加载loading

                //验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        addProject(qs.stringify(this.addProjectData)).then(() => {
                            this.$message({
                                message: "添加成功！",
                                type: "success"
                            });

                            this.addProjectVisible = false;  //隐藏编辑位置信息界面
                            this.listLoading = false;  //请求成功停止加载loading
                            this.getProjectList();  //刷新列表数据
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /**
             *  api
             *  更新项目
             */
            // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            updateHandleChange(file){
                //上传文件变化时将文件对象push进files数组
                this.upload_arg.logoFile.push(file.raw);

                //上传图片
                this.updateUpload();
            },
            // 获取logo url
            updateUpload(){
                let formData = new FormData();

                formData.append('logoFile', this.upload_arg.logoFile[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                getLogoUrl(formData, config).then(res=>{
                    this.updateProjectData.logoUrl = res.data.data.logoUrl;
                })
            },
            //浅拷贝列表数据到表单
            updateProject (row) {
                this.upload_arg.fileList = [];  //清空上传logo file
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
            },

            /**
             *  api
             *  编辑序号
             */
            //浅拷贝列表数据到表单
            updateProjectSort (row) {
                this.updateProjectSortData.id = Object.assign({}, row).id;
                this.updateProjectSortData.sort = Object.assign({}, row).sort;
            },
            //提交编辑序号表单
            updateProjectSortSubmit(formName) {
                this.listLoading = true;  //点击提交开始加载loading

                //验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        updateProjectSort(qs.stringify(this.updateProjectSortData)).then(() => {
                            this.updateProjectSortVisible = false;  //隐藏编辑位置信息界面

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
            },

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

    .tip{
        font-size: 12px;
        color: #717171;
    }

    .mgt{
        margin-bottom: 15px;
    }
</style>