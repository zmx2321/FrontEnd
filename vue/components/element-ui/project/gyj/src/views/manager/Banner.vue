<template>
  <section class="main_cont">
    <!-- 按钮 -->
    <el-row class="toolbar bdr_radiu f-cb">
      <el-col class="f-fl btn_wrap">
        <el-button type="primary" @click="addBannerVisible = true" v-on:click="addBanner">添加Banner</el-button>
      </el-col>
    </el-row>

    <!-- Banner列表 -->
    <el-row>
      <el-table class="consultation_list" :data="banner_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 206px)">
        <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
        <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
        <!--<el-table-column prop="id" label="banner编号" width="100" align="center"></el-table-column>-->
        <el-table-column prop="sort" label="序号" width="100" align="center"></el-table-column>

        <el-table-column label="banner图片" width="100">
          <template slot-scope="scope">
        <img :src="scope.row.img" class="tabimg" />
       </template>
        </el-table-column>

        <el-table-column prop="createAt" label="创建时间" width="200" align="center"></el-table-column>

        <el-table-column prop="title" label="标题" width=""></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-on:click="editBannerVisible = true" @click="editBanner(scope.row)">{{ $t('btn.edit') }}</el-button>
            <el-button type="text" size="small" @click="delBanner(scope.row)">{{ $t('btn.del') }}</el-button>
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

    <!-- 新增Banner -->
    <el-dialog title="新增Banner" @keyup.enter.native="addBannerSubmit('addBannerForm')" :close-on-click-modal="false" :visible.sync="addBannerVisible" :before-close="handleClose">
      <el-form :model="addBannerData" status-icon :rules="addBannerRules" ref="addBannerForm" label-width="160px">
        <!--<el-form-item label="资讯id" prop="cId">
          <el-input v-model="addBannerData.cId" placeholder="请输入资讯id" clearable></el-input>
        </el-form-item>-->

        <el-form-item label="资讯">
          <el-select v-model="addBannerData.cId" placeholder="请选择资讯" class="dialog_sel">
            <el-option v-for="(item,index) in consultation_info" :label="item.title" :value="item.id" :key="index">{{ item.title }}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传候选投票图片">
          <el-upload
                  :action=requestUrl
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

        <el-form-item label="图片地址" prop="img">
          <el-input v-model="addBannerData.img" placeholder="请输入图片地址" disabled></el-input>
        </el-form-item>

        <el-form-item label="排列序号" prop="sort">
          <el-input v-model="addBannerData.sort" placeholder="请输入排列序号" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addBannerSubmit('addBannerForm')">提交</el-button>
          <el-button @click="resetForm('addBannerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑Banner -->
    <el-dialog title="编辑Banner" @keyup.enter.native="editBanner('editBannerForm')" :close-on-click-modal="false" :visible.sync="editBannerVisible" :before-close="handleClose">
      <el-form :model="editBannerData" status-icon :rules="editBannerRules" ref="editBannerForm" label-width="160px">
        <el-form-item label="Banner id" prop="id">
          <el-input v-model="editBannerData.id" disabled></el-input>
        </el-form-item>

        <el-form-item label="资讯">
          <el-select v-model="editBannerData.cId" placeholder="请选择资讯" class="dialog_sel">
            <el-option v-for="(item,index) in consultation_info" :label="item.title" :value="item.id" :key="index">{{ item.title }}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传候选投票图片">
          <el-upload
                  :action=requestUrl
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

        <el-form-item label="图片地址" prop="img">
          <el-input v-model="editBannerData.img" placeholder="请输入图片地址" disabled></el-input>
        </el-form-item>

        <el-form-item label="排列序号" prop="sort">
          <el-input v-model="editBannerData.sort" placeholder="请输入排列序号" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editBannerSubmit('editBannerForm')">提交</el-button>
          <el-button @click="resetForm('editBannerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
    import {
        getBannerList,  // 获取Banner列表
        addBanner,  // 添加banner
        editBanner,  // 修改banner
        delBanner,  // 删除banner

        getConsultation,  // 获取资讯列表
        getImgURI,  // 上传图片
    } from '../../api/api.js';

    export default {
        name: 'banner',

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
                dialogVisible: false,  // 关闭提示

                // 分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 50, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                consultation_info: [],  // 存放资讯列表数据

                requestUrl: requestUrl,

                // 上传图片参数
                upload_arg: {
                    limit:1,
                    imgFile: [],
                    fileList: []
                },

                /**
                 * Banner
                 */
                // Banner列表
                banner_info: [],  // 存放兑换码信息列表数据

                /**
                 * 添加Banner
                 */
                // 添加Banner数据
                addBannerData: {
                    img: "",  // 图片地址
                    cId: "",  // 资讯编号
                    sort: "",  // 排列序号
                },

                // 验证添加Banner数据
                addBannerRules: {
                    img: [
                        { required: true, message: '图片地址不能为空！', trigger: 'blur' },
                        { validator: validateUrl, trigger: 'blur' }
                    ],
                    cId: [
                        { required: true, message: '资讯编号不能为空！', trigger: 'blur' },
                    ],
                    sort: [
                        { validator: validateNumber, trigger: 'blur' }
                    ]
                },

                /**
                 * 编辑Banner
                 */
                // 编辑Banner数据
                editBannerData: {
                    id: "",  // banner编号
                    img: "",  // 图片地址
                    cId: "",  // 资讯编号
                    sort: "",  // 排列序号
                },

                // 验证编辑资讯数据
                editBannerRules: {
                    img: [
                        { required: true, message: '图片地址不能为空！', trigger: 'blur' },
                        { validator: validateUrl, trigger: 'blur' }
                    ],
                    cId: [
                        { required: true, message: '资讯编号不能为空！', trigger: 'blur' },
                    ],
                    sort: [
                        { validator: validateNumber, trigger: 'blur' }
                    ]
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addBannerVisible: false,  // 编辑资讯界面
                editBannerVisible: false,  // 编辑资讯界面
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
                    this.addBannerData.img = "";
                    this.editBannerData.img = "";
                });
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getBannerList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getBannerList();  // 加载分页数据
            },

            /**
             * api
             * 获取资讯信息
             */
            getConsultation () {
                getConsultation().then(res => {
                    // console.log(res.data.data.list);

                    this.consultation_info = res.data.data.list;
                }).catch({});
            },

            /**
             *  api
             *  获取Banner信息
             */
            // 获取Banner列表
            getBannerList () {
                this.listLoading = true;

                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                };

                // 请求接口
                getBannerList(param).then(res => {
                    // console.log(res.data.data.list);

                    this.listLoading = false;

                    this.banner_info = res.data.data.list;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;
                }).catch({});
            },

            /**
             * api
             * 添加Banner
             */
            // 点击添加banner
            addBanner () {
               this.getConsultation();

                this.addBannerData.img = "";
                this.editBannerData.img = "";

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

                    this.addBannerData.img = res.data.data;
                });
            },
            // 提交添加Banner表单
            addBannerSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        let params = {
                            cId: this.addBannerData.cId,
                            img: this.addBannerData.img,
                            sort: this.addBannerData.sort
                        }

                        // console.log(params);
                        
                        if (this.addBannerData.cId == ""){
                            this.$message.error("请先选择资讯分类");
                        } else {
                            addBanner(params).then(() => {
                                this.$message.success("添加成功");

                                this.addBannerVisible = false;

                                this.getBannerList();
                            }).catch({});
                        }
                    } else {  //验证失败跳出
                        this.$message.error("表单填写错误");
                        // console.log("aa")
                    }
                });
            },

            /**
             * api
             * 编辑Banner
             */
            // 点击编辑
            editBanner (row) {
                this.editBannerData.id = Object.assign({}, row).id;
                this.editBannerData.cId = Object.assign({}, row).cId;
                this.editBannerData.img = Object.assign({}, row).img;
                this.editBannerData.sort = Object.assign({}, row).sort;

                this.getConsultation();

                this.upload_arg.fileList = [];  //清空上传img file
            },
            // 点击上传
            updateHandleChange(file){
                // console.log("文件状态改变时的钩子");
                this.upload_arg.imgFile = [];

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.imgFile.push(file.raw);

                let formData = new FormData();

                formData.append('file', this.upload_arg.imgFile[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };

                getImgURI(formData, config).then(res => {
                    // console.log(res.data.data);

                    this.editBannerData.img = res.data.data;
                    // console.log(this.editBannerData.img);
                });
            },
            // 提交编辑Banner表单
            editBannerSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        // console.log(this.editBannerData);

                        editBanner(this.editBannerData).then(() => {
                            // console.log(res);

                            this.$message.success("banner编辑成功");

                            this.editBannerVisible = false;

                            this.getBannerList();
                        }).catch({});
                    } else {  //验证失败跳出
                        this.$message.error("表单填写错误");
                    }
                });
            },

            /**
             *  api
             *  删除Banner
             */
            delBanner (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let params = {
                        id: Object.assign({}, row).id
                    }

                    delBanner(params).then(() => {
                        this.$message.success("Banner删除成功");

                        this.getBannerList();
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

<style lang="less" scoped>
  .tabimg{
    width: 75px;
  }

  /* el-dialog */
  .dialog_sel {
    width: 60%;
  }
</style>