<template>
  <section class="main_cont">
    <!-- 按钮 -->
    <el-row class="toolbar bdr_radiu f-cb">
      <el-col class="f-fl btn_wrap">
        <el-button type="primary" @click="addVoteVisible = true">添加投票</el-button>
      </el-col>
    </el-row>

    <!-- 投票列表 -->
    <el-row>
      <el-table class="consultation_list" :data="vote_info" border highlight-current-row v-loading="listLoading" @expand-change="showVoteOptionList" height="calc(100vh - 200px)">
        <!-- 子列表 -->
        <el-table-column type="expand" prop="children">
          <template slot-scope="scope">
            <el-button @click="addVoteOptionVisible = true" v-on:click="addVoteOption" class="child_btn">添加候选人</el-button>

            <el-table :data="voteOption" v-loading="childlistLoading">
              <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
              <el-table-column prop="id" label="候选项编号" width="100" align="center"></el-table-column>
              <el-table-column prop="viId" label="投票编号" width="100" align="center"></el-table-column>

              <el-table-column prop="title" label="得票数" width="80" align="center"></el-table-column>

              <el-table-column prop="num" label="得票数" width="80" align="center"></el-table-column>

              <el-table-column prop="imgs" label="候选项图片" width="auto">
                  <template slot-scope="scope">
              	<img :src="scope.row.imgs" class="tabimg" />
              </template>
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="600">
                <template slot-scope="scope">
                  <el-button type="text" size="small" v-on:click="editVoteOptionVisible = true" @click="editVoteOption(scope.row)">{{ $t('btn.edit') }}</el-button>
                  <el-button type="text" size="small" @click="delVoteOption(scope.row)">{{ $t('btn.del') }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column prop="id" label="投票编号" width="auto" align="center"></el-table-column>
        <el-table-column prop="title" label="投票标题" width="auto" align="center"></el-table-column>
        <el-table-column prop="num" label="可投票数" width="280" align="center"></el-table-column>
        <el-table-column prop="totalUser" label="投票人数" width="280" align="center"></el-table-column>
        <el-table-column prop="updateAt" label="最后修改时间" width="280" align="center"></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-on:click="editVoteVisible = true" @click="editVote(scope.row)">{{ $t('btn.edit') }}</el-button>
            <el-button type="text" size="small" @click="delVote(scope.row)">{{ $t('btn.del') }}</el-button>
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

    <!-- 新增投票 -->
    <el-dialog title="新增投票" @keyup.enter.native="addVoteSubmit('addVoteForm')" :close-on-click-modal="false" :visible.sync="addVoteVisible" :before-close="handleClose">
      <el-form :model="addVoteData" status-icon :rules="addVoteRules" ref="addVoteForm" label-width="160px">
        <el-form-item label="投票标题" prop="title">
          <el-input v-model="addVoteData.title"  placeholder="请输入投票标题" clearable></el-input>
        </el-form-item>
        <el-form-item label="可投票数" prop="num">
          <el-input v-model="addVoteData.num"  placeholder="请输入可投票数" clearable></el-input>
        </el-form-item>
        <el-form-item label="投票內容" prop="content">
          <el-input v-model="addVoteData.content"  placeholder="请输入投票內容" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addVoteSubmit('addVoteForm')">提交</el-button>
          <el-button @click="resetForm('addVoteForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑投票 -->
    <el-dialog title="编辑投票" @keyup.enter.native="editVoteSubmit('editVoteForm')" :close-on-click-modal="false" :visible.sync="editVoteVisible" :before-close="handleClose">
      <el-form :model="editVoteData" status-icon :rules="editVoteRules" ref="editVoteForm" label-width="160px">
        <el-form-item label="投票编号" prop="id">
          <el-input v-model="editVoteData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="投票标题" prop="title">
          <el-input v-model="editVoteData.title"  placeholder="请输入投票标题" clearable></el-input>
        </el-form-item>
        <el-form-item label="可投票数" prop="num">
          <el-input v-model="editVoteData.num"  placeholder="请输入可投票数" clearable></el-input>
        </el-form-item>
        <el-form-item label="投票內容" prop="content">
          <el-input v-model="editVoteData.content"  placeholder="请输入投票內容" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editVoteSubmit('editVoteForm')">提交</el-button>
          <el-button @click="resetForm('editVoteForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 新增投票候选项 -->
    <el-dialog title="新增投票候选项" @keyup.enter.native="addVoteOptionSubmit('addVoteOptionForm')" :close-on-click-modal="false" :visible.sync="addVoteOptionVisible" :before-close="handleClose">
      <el-form :model="addVoteOptionData" status-icon :rules="addVoteOptionRules" ref="addVoteOptionForm" label-width="160px">
        <el-form-item label="投票编号" prop="viId">
          <el-input v-model="addVoteOptionData.viId" disabled></el-input>
        </el-form-item>
        <el-form-item label="候选标题" prop="name">
          <el-input v-model="addVoteOptionData.name" clearable></el-input>
        </el-form-item>

        <el-form-item label="上传候选投票图片">
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

        <el-form-item label="候选投票图片" prop="imgs">
          <el-input v-model="addVoteOptionData.imgs" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addVoteOptionSubmit('addVoteOptionForm')">提交</el-button>
          <el-button @click="resetForm('addVoteOptionForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑投票候选项 -->
    <el-dialog title="编辑投票候选项" @keyup.enter.native="editVoteOptionSubmit('editVoteOptionForm')" :close-on-click-modal="false" :visible.sync="editVoteOptionVisible" :before-close="handleClose">
      <el-form :model="editVoteOptionData" status-icon :rules="editVoteOptionRules" ref="editVoteOptionForm" label-width="160px">
        <el-form-item label="投票候选项编号" prop="id">
          <el-input v-model="editVoteOptionData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="投票编号" prop="viId">
          <el-input v-model="editVoteOptionData.viId" clearable></el-input>
        </el-form-item>
        <el-form-item label="候选标题" prop="name">
          <el-input v-model="editVoteOptionData.name" clearable></el-input>
        </el-form-item>

        <el-form-item label="上传banner图">
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

        <el-form-item label="候选投票图片" prop="imgs">
          <el-input v-model="editVoteOptionData.imgs" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editVoteOptionSubmit('editVoteOptionForm')">提交</el-button>
          <el-button @click="resetForm('editVoteOptionForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
    import {
        getVote,  // 获取投票列表
        addVote,  // 添加投票
        editVote, // 编辑投票
        delVote,  // 删除投票
        getImgURI,  // 上传图片
        getVoteOptionList,  // 获取投票候选项列表
        addVoteOption,  // 添加投票候选项
        editVoteOption,  // 编辑投票候选项
        delVoteOption  // 删除投票候选项
    } from '../../api/api.js';

    export default {
        name: 'vote',

        data() {
            // 数字验证
            let validateNumber = (rule, value, callback) => {
                let reg = /^[1-9]\d*$/;

                if (!reg.test(value)) {
                    return callback(new Error('数量为必须大于0的整数！'));
                }

                callback();
            };

            // url验证
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
                childlistLoading: false,  // 子列表lodding动画
                dialogVisible: false,  // 关闭提示

                // 分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 50, // 1页显示多少条
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
                 * 投票
                 */
                // 投票列表
                vote_info: [],  // 存放兑换码信息列表数据

                // 候选项列表
                voteOption: [],

                // 投票编号
                viId: "",

                /**
                 * 添加投票
                 */
                // 添加投票数据
                addVoteData: {
                    title: "trest",  // 投票標題
                    num: "5",  // 可投票数
                    content: "tttdsdtttst",  // 投票內容
                },

                // 验证添加投票数据
                addVoteRules: {
                    title: [
                        { required: true, message: '投票标题不能为空！', trigger: 'blur' },
                    ],
                    num: [
                        { required: true, message: '可投票数不能为空！', trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '投票內容不能为空！', trigger: 'blur' },
                    ]
                },

                /**
                 * 编辑投票
                 */
                // 编辑投票数据
                editVoteData: {
                    id: "",  // 投票编号
                    title: "trest",  // 投票標題
                    num: "5",  // 可投票数
                    content: "tttdsdtttst",  // 投票內容
                },

                // 验证编辑资讯数据
                editVoteRules: {
                    title: [
                        { required: true, message: '投票标题不能为空！', trigger: 'blur' },
                    ],
                    num: [
                        { required: true, message: '可投票数不能为空！', trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '投票內容不能为空！', trigger: 'blur' },
                    ]
                },

                /**
                 * 新增投票候选项
                 */
                // 新增投票候选项数据
                addVoteOptionData: {
                    viId: "",  // 投票编号
                    name: "",  // 候选标题
                    imgs: "",  // 候选投票图片
                },

                // 验证新增投票候选项数据
                addVoteOptionRules: {
                    imgs: [
                        { validator: validateUrl, trigger: 'blur' }
                    ]
                },

                /**
                 * 编辑投票候选项
                 */
                // 编辑投票候选项数据
                editVoteOptionData: {
                    id: "",  // 投票候选项编号
                    viId: "",  // 投票编号
                    name: "",  // 候选标题
                    imgs: "",  // 候选投票图片
                },

                // 验证编辑投票候选项数据
                editVoteOptionRules: {
                    imgs: [
                        // { validator: validateUrl, trigger: 'blur' }
                    ]
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addVoteVisible: false,  // 添加投票界面
                editVoteVisible: false,  // 编辑投票界面
                addVoteOptionVisible: false,  // 新增投票候选项界面
                editVoteOptionVisible: false,  // 编辑投票候选项界面
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
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getVoteList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getVoteList();  // 加载分页数据
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
                this.addVoteOptionData.imgs = "";
                this.editVoteOptionData.imgs = "";
                return this.$confirm(`确定移除 ${ file.name }？`);
            },

            /**
             *  api
             *  获取投票信息
             */
            // 获取投票列表
            getVoteList () {
                this.listLoading = true;

                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                };

                // 请求接口
                getVote(param).then(res => {
                    // console.log(res.data.data.list);

                    this.listLoading = false;

                    this.vote_info = res.data.data.list;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;
                }).catch({});
            },

            /**
             * api
             * 获取候选项信息
             */
            // 候选项列表
            getVoteOptionList (viId) {
                let params = {
                    viId: viId
                }

                this.childlistLoading = true;

                getVoteOptionList(params).then(res => {
                    // console.log(res.data.data.list);

                    this.childlistLoading = false;

                    this.voteOption = res.data.data.list
                }).catch({});
            },
            // 点击加载子菜单
            showVoteOptionList (row) {
                this.viId = Object.assign({}, row).id;

                this.getVoteOptionList(this.viId);
            },

            /**
             * api
             * 添加投票
             */
            // 提交添加投票表单
            addVoteSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        let params = {
                            title: this.addVoteData.title,
                            num: this.addVoteData.num,
                            content: this.addVoteData.content
                        }

                        addVote(params).then(() => {
                            // console.log(res);

                            this.addVoteVisible = false;

                            this.getVoteList();

                            this.$message.success("投票添加成功");
                        }).catch({});
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             * api
             * 编辑投票
             */
            // 点击编辑
            editVote (row) {
                this.editVoteData = Object.assign({}, row);

                // console.log(this.editVoteData);
            },
            // 提交编辑投票表单
            editVoteSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        let params = {
                            id: this.editVoteData.id,
                            title: this.editVoteData.title,
                            num: this.editVoteData.num,
                            content: this.editVoteData.content
                        }

                        editVote(params).then(() => {
                            // console.log(res);

                            this.editVoteVisible = false;

                            this.getVoteList();

                            this.$message.success("投票编辑成功");
                        }).catch({});
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             *  api
             *  删除投票
             */
            delVote (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let param = {
                        id: Object.assign({}, row).id
                    }

                    delVote(param).then(() => {
                        this.getVoteList();

                        this.$message.success("投票删除成功");
                    }).catch({});
                }).catch(() => {});
            },

            /**
             * api
             * 添加投票候选项
             */
            // 点击添加投票候选项
            addVoteOption () {
                this.addVoteOptionData.viId = this.viId;

                this.upload_arg.fileList = [];  //清空上传img file
            },
            // 点击上传
            addHandleChange(file){
                // console.log("文件状态改变时的钩子");

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.imgFile.push(file.raw);

                // console.log(this.upload_arg.imgFile);

                let formData = new FormData();

                formData.append('file', this.upload_arg.imgFile[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };

                getImgURI(formData, config).then(res => {
                    // console.log(res);

                    this.addVoteOptionData.imgs = res.data.data;
                });
            },
            // 提交添加投票表单
            addVoteOptionSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        let params = {
                            viId: this.addVoteOptionData.viId,
                            name: this.addVoteOptionData.name,
                            imgs: this.addVoteOptionData.imgs,
                        }

                        addVoteOption(params).then(res => {
                            // console.log(res);

                            this.addVoteOptionVisible = false;

                            // console.log(params.viId)

                            this.childlistLoading = true;

                            this.$message.success("投票候选项添加成功");

                            // 加载
                            this.getVoteOptionList(params.viId);
                        }).catch({});
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             * api
             * 编辑投票候选项
             */
            // 点击编辑投票候选项
            editVoteOption (row) {
                this.editVoteOptionData.id = Object.assign({}, row).id;
                this.editVoteOptionData.viId = this.viId;
                this.editVoteOptionData.name = Object.assign({}, row).name;
                this.editVoteOptionData.imgs = Object.assign({}, row).imgs;
            },
            // 点击上传
            updateHandleChange(file){
                // console.log("文件状态改变时的钩子");

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.imgFile.push(file.raw);

                // console.log(this.upload_arg.imgFile);

                let formData = new FormData();

                formData.append('file', this.upload_arg.imgFile[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };

                getImgURI(formData, config).then(res => {
                    // console.log(res);

                    this.editVoteOptionData.imgs = res.data.data;
                });
            },
            // 提交编辑投票表单
            editVoteOptionSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        let params = {
                            viId: this.editVoteOptionData.viId,
                            id: this.editVoteOptionData.id,
                            name: this.editVoteOptionData.name,
                            imgs: this.editVoteOptionData.imgs
                        }

                        // console.log(params);

                        editVoteOption(params).then(() => {
                            this.editVoteOptionVisible = false;

                            this.getVoteOptionList(params.viId);

                            this.$message.success("投票候选项编辑成功");
                        }).catch({});
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             *  api
             *  删除投票候选项
             */
            delVoteOption (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let params = {
                        viId: this.viId,  // 投票id
                        id: Object.assign({}, row).id,  // 投票候选项id
                    }

                    delVoteOption(params).then(() => {
                        this.getVoteOptionList(params.viId);

                        this.$message.success("投票候选项删除成功");
                    }).catch({});
                }).catch(() => {});
            },
        },
        // 预处理
        created () {
            this.getVoteList();
        }
    }
</script>

<style lang="less" scoped>
  .tabimg{
    width: 75px;
  }
</style>