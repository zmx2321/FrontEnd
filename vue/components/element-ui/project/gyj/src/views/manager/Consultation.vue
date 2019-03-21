<template>
  <section class="main_cont">
    <!-- 筛选 -->
    <el-row class="toolbar bdr_radiu filter_wrap">
      <el-col :span="24">
        <el-form :model="filterData" status-icon :rules="filterDataRules" ref="filterDataForm" label-width="100px">
          <el-form-item label="资讯标题" prop="title" class="intxt">
            <el-input v-model="filterData.title" placeholder="请输入资讯标题" clearable></el-input>
          </el-form-item>

          <el-form-item label="资讯分类" class="intxt">
            <el-select v-model="filterData.ctId" placeholder="全部">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item,index) in consultation_type" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="內容分类" class="intxt">
            <el-select v-model="filterData.type" placeholder="全部">
              <el-option label="全部" value=""></el-option>
              <el-option label="文字" value="0"></el-option>
              <el-option label="图文" value="1"></el-option>
              <el-option label="视频" value="2"></el-option>
              <el-option label="投票" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="资讯来源名称" prop="originName" class="intxt">
            <el-input v-model="filterData.originName" placeholder="请输入资讯来源名称" clearable></el-input>
          </el-form-item>

          <el-form-item class="intxt btn_wrap">
            <el-button type="primary" @click="filterDataSubmit('filterDataForm')">筛选</el-button>
            <el-button @click="resetForm('filterDataForm')">重置</el-button>
            <el-button type="primary" @click="addConsultation" v-on:click="addConsultationVisible = true">添加资讯</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 资讯列表 -->
    <el-row>
      <el-table class="consultation_list" :data="consultation_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 275px)">
        <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
        <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
        <!--<el-table-column prop="id" label="资讯编号" width="80" align="center"></el-table-column>-->
        <el-table-column prop="title" label="资讯标题" width="350"></el-table-column>
        <!--<el-table-column prop="typeName" label="资讯类目" width="auto" align="center" :formatter="formatType"></el-table-column>-->
        <el-table-column prop="category" label="资讯类目" width="100" align="center"></el-table-column>
        <el-table-column prop="typeName" label="类型" width="80" align="center"></el-table-column>
        <el-table-column prop="readNum" label="浏览量" width="80" align="center"></el-table-column>
        <el-table-column prop="likeNum" label="点赞量" width="80" align="center"></el-table-column>
        <el-table-column prop="forwardNum" label="转发量" width="80" align="center"></el-table-column>
        <el-table-column label="状态" width="auto" align="left">
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? "推荐" : "" }}
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-on:click="editConsultationVisible = true" @click="editConsultation(scope.row)">{{ $t('btn.edit') }}</el-button>
            <el-button type="text" size="small" @click="delConsultation(scope.row)">{{ $t('btn.del') }}</el-button>
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

    <!-- 添加资讯 -->
    <el-dialog title="添加资讯"
               :close-on-click-modal="false"
               class="dialog_wrap"
               top="0"
               :visible.sync="addConsultationVisible"
               :before-close="handleClose">
      <el-form :model="addConsultationData" status-icon :rules="addConsultationRules" ref="addConsultationForm" label-width="160px" class="f-cb">
        <el-form-item label="资讯标题" prop="title">
          <el-input v-model="addConsultationData.title"  placeholder="请输入资讯标题" clearable></el-input>
        </el-form-item>
        <!--<el-form-item label="资讯来源图标" prop="originIcon">
          <el-input v-model="addConsultationData.originIcon"  placeholder="请输入资讯来源图标" clearable></el-input>
        </el-form-item>-->

        <el-form-item label="资讯来源名称" prop="originName">
          <el-input v-model="addConsultationData.originName"  placeholder="请输入资讯来源名称" clearable></el-input>
        </el-form-item>
        <!--<el-form-item label="资讯列表图片显示" prop="imgs">
          <el-input v-model="addConsultationData.imgs"  placeholder="请输入资讯列表图片显示" clearable></el-input>
        </el-form-item>-->

        <el-form-item label="资讯分类">
          <el-select v-model="addConsultationData.ctId" placeholder="请选择资讯分类" class="dialog_sel">
            <el-option v-for="(item,index) in consultation_type" :label="item.name" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <!--<el-form-item label="资讯视频地址" prop="videoUrl">
          <el-input v-model="addConsultationData.videoUrl"  placeholder="请输入资讯视频地址" clearable></el-input>
        </el-form-item>-->
        <el-form-item label="资讯阅读所获积分" prop="points">
          <el-input v-model="addConsultationData.points"  placeholder="请输入资讯阅读所获积分" clearable></el-input>
        </el-form-item>

        <el-form-item label="內容分类">
          <el-select v-model="addConsultationData.type" placeholder="请选择內容分类" class="dialog_sel">
            <el-option label="文字" value="0"></el-option>
            <el-option label="图文" value="1"></el-option>
            <el-option label="视频" value="2"></el-option>
            <el-option label="投票" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资讯投票" class="viId">
          <el-select v-model="addConsultationData.viId" placeholder="请选择资讯投票" class="dialog_sel">
            <el-option label="" value=""></el-option>
            <el-option v-for="(item,index) in vote_info" :label="item.title" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传资讯视频">
          <el-upload
                  :action="requestUrl"
                  ref='uploadVideo'
                  :before-remove="beforeRemove"
                  :on-change="addHandleChange"
                  multiple
                  :limit="upload_arg.limit"
                  :on-exceed="handleExceed"
                  :file-list="upload_arg.fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="资讯视频" prop="videoUrl">
          <el-input v-model="addConsultationData.videoUrl"  disabled></el-input>
        </el-form-item>

        <el-form-item label="资讯内容" prop="content">
          <!-- 图片上传组件辅助-->
          <el-upload
                  class="avatar-uploader"
                  :action="serverUrl"
                  name="img"
                  :headers="header"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  :before-upload="beforeUpload">
          </el-upload>
          <!--富文本编辑器组件-->
          <el-row v-loading="quillUpdateImg">
            <quill-editor
                    v-model="addConsultationData.content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @ready="onEditorReady($event)"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
            </quill-editor>
          </el-row>
        </el-form-item>

        <el-form-item class="digbtn f-fr">
          <el-button type="primary" @click="addConsultationSubmit('addConsultationForm')">提交</el-button>
          <el-button @click="resetForm('addConsultationForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑资讯 -->
    <el-dialog title="编辑资讯"
               :close-on-click-modal="false"
               class="dialog_wrap"
               :visible.sync="editConsultationVisible"
               top="0"
               :before-close="handleClose">

      <el-form :model="editConsultationData" status-icon :rules="editConsultationRules" ref="editConsultationForm" label-width="160px">
        <el-form-item label="资讯编号" prop="id">
          <el-input v-model="editConsultationData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="资讯标题" prop="title" class="consulte_title f-fl">
          <el-input v-model="editConsultationData.title"  placeholder="请输入资讯标题" clearable></el-input>
        </el-form-item>

        <el-form-item label="资讯阅读所获积分" prop="points"  class="consulte_points f-fl">
          <el-input v-model="editConsultationData.points"  placeholder="请输入资讯阅读所获积分" clearable></el-input>
        </el-form-item>

        <!--<el-form-item label="资讯来源图标" prop="originIcon">
          <el-input v-model="editConsultationData.originIcon"  placeholder="请输入资讯来源图标" clearable></el-input>
        </el-form-item>-->
        <el-form-item label="资讯来源名称" prop="originName">
          <el-input v-model="editConsultationData.originName"  placeholder="请输入资讯来源名称" clearable></el-input>
        </el-form-item>
        <!--<el-form-item label="资讯列表图片显示" prop="imgs">
          <el-input v-model="addConsultationData.imgs"  placeholder="请输入资讯列表图片显示" clearable></el-input>
        </el-form-item>-->

        <el-form-item label="资讯分类" class="intxt f-fl">
          <el-select v-model="editConsultationData.ctId" placeholder="请选择资讯分类" class="dialog_sel sel_short">
            <el-option v-for="(item,index) in consultation_type" :label="item.name" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <!--<el-form-item label="资讯视频地址" prop="videoUrl">
          <el-input v-model="editConsultationData.videoUrl"  placeholder="请输入资讯视频地址" clearable></el-input>
        </el-form-item>-->

        <el-form-item label="內容分类" class="intxt f-fl">
          <el-select v-model="editConsultationData.type" placeholder="请选择內容分类" class="dialog_sel sel_short">
            <el-option label="文字" value="0"></el-option>
            <el-option label="图文" value="1"></el-option>
            <el-option label="视频" value="2"></el-option>
            <el-option label="投票" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资讯状态" class="intxt f-fl">
          <el-select v-model="editConsultationData.status" placeholder="资讯状态" class="dialog_sel sel_short">
            <el-option label="不推荐" value="0"></el-option>
            <el-option label="推荐" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资讯投票" class="viId">
          <el-select v-model="editConsultationData.viId" placeholder="请选择资讯投票" class="dialog_sel">
            <el-option label="" value=""></el-option>
            <el-option v-for="(item,index) in vote_info" :label="item.title" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传资讯视频">
          <el-upload
                  :action="requestUrl"
                  ref='uploadVideo'
                  :before-remove="beforeRemove"
                  :on-change="editHandleChange"
                  multiple
                  :limit="upload_arg.limit"
                  :on-exceed="handleExceed"
                  :file-list="upload_arg.fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="资讯视频" prop="videoUrl">
          <el-input v-model="editConsultationData.videoUrl"  disabled></el-input>
        </el-form-item>

        <!--<el-form-item label="资讯内容" prop="content">
          <el-input type="textarea" v-model="editConsultationData.content"  placeholder="请输入资讯内容" clearable></el-input>
        </el-form-item>-->

        <el-form-item label="资讯内容" prop="content">
          <!-- 图片上传组件辅助-->
          <el-upload
                  class="avatar-uploader"
                  :action="serverUrl"
                  name="img"
                  :headers="header"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  :before-upload="beforeUpload">
          </el-upload>
          <!--富文本编辑器组件-->
          <el-row v-loading="quillUpdateImg">
            <quill-editor
                    v-model="editConsultationData.content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @ready="onEditorReady($event)"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
            </quill-editor>
          </el-row>
        </el-form-item>

        <el-form-item class="digbtn f-fr">
          <el-button type="primary" @click="editConsultationSubmit('editConsultationForm')">提交</el-button>
          <el-button @click="resetForm('editConsultationForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
    // 工具栏配置
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        //加粗，斜体，下划线，删除线
        ['blockquote', 'code-block'],         //引用，代码块


        [{ 'header': 1 }, { 'header': 2 }],               // 标题，键值对的形式；1、2表示字体大小
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],          //列表
        [{ 'script': 'sub'}, { 'script': 'super' }],      // 上下标
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
        [{ 'direction': 'rtl' }],                         // 文本方向


        // [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],         //几级标题


        [{ 'color': [] }, { 'background': [] }],          // 字体颜色，字体背景颜色
        [{ 'font': [] }],         //字体
        [{ 'align': [] }],        //对齐方式


        ['clean'],        //清除字体样式
        ['image',/*'video'*/],        //上传图片、上传视频
    ]

    import {
        getConsultation,  // 获取资讯列表
        getConsultationType,  // 获取资讯分类列表
        addConsultation,  // 添加资讯
        getVote,  // 获取投票列表
        getConsultationById,  // 根据id获取资讯
        editConsultation,  // 编辑资讯
        delConsultation,  // 删除资讯
        getImgURI,  // 上传图片
        getVideoURI,  // 上传视频
    } from '../../api/api.js';

    export default {
        name: 'consultation',

        data() {
            // url验证
            /*const validateUrl = (rule, value, callback) => {
                let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;

                if (!reg.test(value)) {
                    return callback(new Error('url输入不正确！'));
                }

                callback();
            };*/

            return {
                /**
                 * common
                 */
                listLoading: false,  // lodding动画
                dialogVisible: false,  // 关闭提示

                // 上传视频参数
                upload_arg: {
                    limit:1,
                    videoFile: [],
                    fileList: []
                },

                // 分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 50, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                // 投票列表
                vote_info: [],

                // 富文本图片集合
                richImg: [],

                // 域名
                requestUrl: requestUrl,

                /**
                 * 富文本数据
                 */
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                // serverUrl: 'https://jsonplaceholder.typicode.com/posts/',  // 这里写你要上传的图片服务器地址
                serverUrl: requestUrl,  // 这里写你要上传的图片服务器地址
                header: {
                    // cookieName: document.cookie.indexOf("JSESSIONID" + "=")
                    // token: sessionStorage.token
                },  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
                detailContent: '', // 富文本内容
                editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        // console.log("上传图片", value);
                                        // 触发input框选择图片文件
                                        document.querySelector('.avatar-uploader input').click();
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                },

                /**
                 * 资讯
                 */
                // 资讯列表
                consultation_info: [],  // 存放资讯列表数据
                consultation_type: [],  // 存放资讯类型数据

                // 筛选数据
                filterData: {
                    title: undefined,  // 资讯标题
                    ctId: undefined,  // 资讯分类id
                    type: undefined,  // 內容分類(0:文字,1:图文,2:视频,3:投票)
                    originName: undefined  // 资讯来源名称
                },

                filterDataRules: {
                    /*postmanMobile: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],*/
                    date: [
                        // { required: true, message: '日期不能为空！', trigger: 'blur' }
                    ]
                },

                /**
                 * 添加资讯
                 */
                // 添加资讯数据
                addConsultationData: {
                    title: "",  // 资讯标题
                    // originIcon: "https://",  // 资讯来源图标
                    // originIcon: "https://img.colabug.com/2019/02/59.jpg",  // 资讯来源图标
                    content: "",  // 资讯内容
                    originName: "",  // 资讯来源名称
                    imgs: "",  // 资讯列表图片显示
                    ctId: "",  // 资讯分类id
                    videoUrl: "",  // 视频地址
                    // videoUrl: "https://img.colabug.com/2019/02/190212214052479.jpg",  // 视频地址
                    points: "",  // 咨询阅读所获积分
                    type: "",  // 內容分類(0:文字,1:图文,2:视频,3:投票)
                    viId: ""  // 资讯投票id
                },

                // 验证添加资讯数据
                addConsultationRules: {
                    title: [
                        { required: true, message: '资讯标题不能为空！', trigger: 'blur' }
                    ],
                    /*originIcon: [
                        { validator: validateUrl, trigger: 'blur' }
                    ],*/
                    ctId: [
                        { required: true, message: '资讯分类不能为空！', trigger: 'blur' }
                    ],
                    /*videoUrl: [
                        { validator: validateUrl, trigger: 'blur' }
                    ],*/
                },

                /**
                 * 编辑资讯
                 */
                // 编辑资讯数据
                editConsultationData: {
                    id: "",  // 资讯id
                    title: "",  // 资讯标题
                    // originIcon: "",  // 资讯来源图标
                    content: "",  // 资讯内容
                    originName: "",  // 资讯来源名称
                    imgs: "",  // 资讯列表图片显示(暂时不填)
                    ctId: "",  // 资讯分类id
                    // videoUrl: "",  // 视频地址
                    points: "",  // 咨询阅读所获积分
                    type: "",  // 內容分類(0:文字,1:图文,2:视频,3:投票)
                    viId: "",  // 资讯投票id
                    status: "",  // 0:不推荐,1:推荐
                },

                // 验证编辑资讯数据
                editConsultationRules: {
                    title: [
                        { required: true, message: '资讯标题不能为空！', trigger: 'blur' }
                    ],
                    /*originIcon: [
                        { validator: validateUrl, trigger: 'blur' }
                    ],*/
                    ctId: [
                        { required: true, message: '资讯分类不能为空！', trigger: 'blur' }
                    ],
                    /*videoUrl: [
                        { validator: validateUrl, trigger: 'blur' }
                    ],*/
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addConsultationVisible: false,  // 添加资讯界面
                editConsultationVisible: false,  // 编辑资讯界面
            }
        },

        methods: {
            /**
             * common
             */
            // 关闭提示
            handleClose (done) {
                this.$confirm('确认关闭？').then(() => {
                    done();
                }).catch(() => {});
            },
            // 表单重置
            resetForm (formName) {
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
                    this.addConsultationData.videoUrl = "";
                    this.editConsultationData.videoUrl = "";
                }).catch(() => {});
            },

            /**
             * 富文本
             */
            // 富文本图片上传前
            beforeUpload() {
                // 显示loading动画
                this.quillUpdateImg = true
            },

            // 富文本内容处理
            richContentHandle (content) {
                // 富文本处理
                return `
                  <div class="ql-editor">
                    <div class=" ql-snow">
                      <div class="ql-editor">
                        ${content}
                      </div>
                    </div>
                  </div>
                `;
            },

            // 富文本图片上传成功
            uploadSuccess(res, file) {
                // console.log(file);

                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill

                let formData = new FormData();
                formData.append('file', file.raw);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                getImgURI(formData, config).then(res => {
                    // console.log(res);

                    if (res.status == "200"){
                        // 获取光标所在位置
                        let length = quill.getSelection().index;
                        // 插入图片  res.info为服务器返回的图片地址
                        quill.insertEmbed(length, 'image', res.data.data)
                        // 调整光标到最后
                        quill.setSelection(length + 1);

                        this.richImg.push(res.data.data);
                    } else {
                        this.$message.error('图片插入失败');
                    }
                });

                // loading动画消失
                this.quillUpdateImg = false
            },

            // 富文本图片上传失败
            uploadError() {
                // loading动画消失
                this.quillUpdateImg = false
                this.$message.error('图片插入失败')
            },

            // 准备编辑器
            // editor
            onEditorReady() {
                // console.log("准备编辑器");
            },
            // 失去焦点事件
            onEditorBlur(){
                // console.log("失去焦点事件");
            },

            // 获得焦点事件
            onEditorFocus(){
                // console.log("获得焦点事件");
            },

            // 内容改变事件
            onEditorChange(){
                // console.log("内容改变事件");
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getConsultationList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getConsultationList();  // 加载分页数据
            },

            /**
             * api
             * 资讯分类
             */
            // 获取资讯分类列表
            getConsultationType () {
                //接口参数
                let parama = {
                    /*pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数*/
                };

                // console.log(parama);

                // 请求接口
                getConsultationType(parama).then(res => {
                    // console.log(res.data.data.list);

                    // 实例化一个map集合
                    // const contpeMap = new Map();

                    let datas = res.data.data.list;

                    for (let i=0; i<datas.length; i++){
                        // 将数据存入map
                        // contpeMap.set(datas[i].id, datas[i].name);

                        this.consultation_type.push({
                            id: datas[i].id,
                            name: datas[i].name
                        });
                    }
                }).catch({});
            },

            /**
             *  api
             *  资讯
             */
            // 获取资讯列表
            getConsultationList () {
                //接口参数
                let parama = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                    title: this.filterData.title,  // 资讯标题
                    ctId: this.filterData.ctId,  // 资讯分类id
                    type: this.filterData.type,  // 內容分類(0:文字,1:图文,2:视频,3:投票)
                    originName: this.filterData.originName  // 资讯来源名称
                };

                // console.log(parama);

                // 请求接口
                getConsultation(parama).then(res => {
                    // console.log(res.data.data.list);

                    let datas = res.data.data.list;

                    // 给资讯类目赋值
                    for (let i=0; i<datas.length; i++){
                        for (let j=0; j<this.consultation_type.length; j++){
                            if (this.consultation_type[j].id == datas[i].ctId){
                                datas[i].category = this.consultation_type[j].name;
                            }
                        }
                    }

                    // 渲染列表
                    this.consultation_info = datas;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;

                    // 初始化分页数据
                    /*this.page_arg.page_index = 1;
                    this.page_arg.page_size = 10;*/
                }).catch({});
            },
            // 筛选
            filterDataSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    // 如果验证成功，请求接口数据
                    if (valid) {
                        // 加载分页数据
                        this.getConsultationList();
                    } else {  //验证失败跳出
                        // 警告
                        this.$message({
                            message: this.$t('message.warning.formeditwarn'),
                            type: 'warning'
                        });
                    }
                });
            },

            /**
             * api
             * 添加资讯
             */
            // 点击添加资讯
            addConsultation () {
                this.vote_info = [];

                this.upload_arg.fileList = [];  //清空上传img file

                this.upload_arg.videoFile = [];

                this.addConsultationData.videoUrl = "";

                // 获取投票列表接口
                getVote().then(res => {
                    // console.log(res.data.data.list);

                    let datas = res.data.data.list;

                    for (let i=0; i<datas.length; i++){
                        this.vote_info.push({
                            id: datas[i].id,
                            title: datas[i].title
                        });
                    }
                }).catch({});
            },
            //el-upload
            // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            addHandleChange(file){
                // console.log("文件状态改变时的钩子");

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.videoFile.push(file.raw);

                // console.log(this.upload_arg.videoFile);

                //上传视频
                this.addUpload();
            },
            // 获取video url
            addUpload(){
                let formData = new FormData();

                formData.append('file', this.upload_arg.videoFile[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                getVideoURI(formData, config).then(res => {
                    // console.log(res);

                    this.addConsultationData.videoUrl = res.data.data;
                });
            },
            // 提交添加资讯表单
            addConsultationSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        // 点击提交开始加载loading
                        this.listLoading = true;

                        if (this.addConsultationData.ctId == "") {
                            this.$message({
                                message: "请先选择资讯分类",
                                type: "error"
                            });

                            // 取消loading
                            this.listLoading = false;
                        } else if (this.addConsultationData.type == "") {
                            this.$message({
                                message: "请先选择资讯内容分类",
                                type: "error"
                            });

                            // 取消loading
                            this.listLoading = false;
                        } else {
                            for (let i=0; i<this.richImg.length; i++){
                                if (i<this.richImg.length - 1) {
                                    this.addConsultationData.imgs += this.richImg[i] + ",";
                                } else {
                                    this.addConsultationData.imgs += this.richImg[i];
                                }
                            }

                            // console.log(this.addConsultationData.imgs);

                            addConsultation(this.addConsultationData).then(() => {
                                // console.log(res);

                                // console.log(this.richImg);

                                // 隐藏弹框
                                this.addConsultationVisible = false;

                                // 数据请求成功，取消loading
                                this.listLoading = false;

                                // 重新渲染分页数据
                                this.getConsultationList();
                            }).catch({});
                        }
                    } else {  //验证失败跳出
                        this.$message.error("表单填写错误！！");
                    }
                });
            },

            /**
             * api
             * 编辑资讯
             */
            // 点击编辑
            editConsultation (row) {
                let params = {
                    id: Object.assign({}, row).id
                }

                getConsultationById(params).then(res => {
                    // console.log(res);

                    this.editConsultationData = res.data.data;

                    this.editConsultationData.type = Object.assign({}, row).type.toString();
                    this.editConsultationData.status = Object.assign({}, row).status.toString();
                    // this.editConsultationData.title = Object.assign({}, row).title;
                }).catch({});

                this.upload_arg.fileList = [];  //清空上传img file

                this.upload_arg.videoFile = [];

                this.vote_info = [];

                // 获取投票列表接口
                getVote().then(res => {
                    // console.log(res.data.data.list);

                    let datas = res.data.data.list;

                    for (let i=0; i<datas.length; i++){
                        this.vote_info.push({
                            id: datas[i].id,
                            title: datas[i].title
                        });
                    }
                }).catch({});
            },
            //el-upload
            // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            editHandleChange(file){
                // console.log("文件状态改变时的钩子");

                //上传文件变化时将文件对象push进files数组
                this.upload_arg.videoFile.push(file.raw);

                // console.log(this.upload_arg.videoFile);

                //上传视频
                this.editUpload();
            },
            // 获取video url
            editUpload(){
                let formData = new FormData();

                formData.append('file', this.upload_arg.videoFile[0]);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                getVideoURI(formData, config).then(res => {
                    // console.log(res);

                    this.editConsultationData.videoUrl = res.data.data;
                });
            },
            // 提交编辑资讯表单
            editConsultationSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        // 点击提交开始加载loading
                        this.listLoading = true;

                        // 参数
                        let params = {
                            id: this.editConsultationData.id,
                            title: this.editConsultationData.title,
                            originIcon: this.editConsultationData.originIcon,
                            // imgs: this.editConsultationData.imgs,
                            type: parseInt(this.editConsultationData.type),
                            content: this.editConsultationData.content,
                            // content: this.richContentHandle(this.editConsultationData.content),
                            points: this.editConsultationData.points,
                            originName: this.editConsultationData.originName,
                            videoUrl: this.editConsultationData.videoUrl,
                            status: parseInt(this.editConsultationData.status),
                            ctId: this.editConsultationData.ctId,
                            viId: this.editConsultationData.viId,
                        }

                        // console.log(params.type);

                        if (this.editConsultationData.ctId == "") {
                            this.$message({
                                message: "请先选择资讯分类",
                                type: "error"
                            });

                            // 取消loading
                            this.listLoading = false;
                        } else if (this.editConsultationData.type == "") {
                            this.$message({
                                message: "请先选择资讯内容分类",
                                type: "error"
                            });

                            // 取消loading
                            this.listLoading = false;
                        } else {
                            editConsultation(params).then(() => {
                                // console.log(res);

                                // 隐藏弹框
                                this.editConsultationVisible = false;

                                // 数据请求成功，取消loading
                                this.listLoading = false;

                                // 重新渲染分页数据
                                this.getConsultationList();
                            }).catch({});
                        }
                    } else {  //验证失败跳出
                        this.$message.error("表单填写错误！！");
                    }
                });
            },

            /**
             *  api
             *  删除资讯
             */
            // 点击删除
            delConsultation (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    // 加载loading
                    this.listLoading = true;

                    let params = {
                        id: Object.assign({}, row).id
                    }

                    // console.log(params);

                    delConsultation(params).then(res => {
                        // console.log(res);

                        // 数据请求成功，取消loading
                        this.listLoading = false;

                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });

                        // 重新渲染分页数据
                        this.getConsultationList();
                    }).catch({});
                }).catch(() => {});
            },
        },
        // 预处理
        created () {
            this.getConsultationType();  // 获取资讯分类列表
            this.getConsultationList();  // 获取资讯列表
        }
    }
</script>

<style lang="less">
  /* less */

  /* el-dialog */


  .dialog_wrap  /deep/ .el-dialog {
    width: 55%;
    margin: 0 auto;
    padding-bottom: 22px;
    height: 85%;
    overflow: auto;
    top: 50%;
    transform: translateY(-50%);

    .el-dialog__header {
      padding: 10px 10px 22px;
    }

    .el-dialog__body{
      margin: 0;
      padding: 0 20px 10px;

      .digbtn{
        margin: 0;
      }

      .el-form-item__content{
        position: initial;
      }

      .consulte_title{
        width: 60%;
      }

      .consulte_points{
        width: 40%;
      }

      .dialog_sel {
        width: 60%;
      }

      .intxt{
        width: 33%;

        .sel_short{
          width: 100%;
        }
      }
    }
  }

  .filter_wrap {
    .intxt{
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 16px;
      width: 345px;
    }

    .btn_wrap {
      margin-bottom: 10px;
      width: initial;
    }
  }

  .ql-snow .ql-picker {
    height: initial;
  }
</style>