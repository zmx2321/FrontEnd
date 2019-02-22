<template>
  <div class="container">
    <!-- 标题分类板块 -->
    <el-row class="news-block">
      <el-col :span="24">
        <el-form :model="newsForm" ref="ruleForm" :rules="rules" label-position="left" label-width="80px" size="medium">
          <el-form-item label="标题" prop="title">
            <el-input v-model="newsForm.title" placeholder="请输入标题,建议15字以内"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="describe">
            <el-input v-model="newsForm.describe" placeholder="请输入描述文字，建议25个字以内"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="genre">
            <el-select v-model="newsForm.genre" placeholder="选择分类" clearable @change="onSelect">
              <el-option v-for="item in newsOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主图" prop="image">
            <div class="upload-centent">
              <el-upload class="avatar-uploader" action="" list-type="picture-card" :show-file-list="false" :http-request="uploadImage">
                <img v-if="newsForm.image" :src="newsForm.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <i v-if="newsForm.image" class="el-icon-delete avatar-delete-icon" @click="removeImage"></i>
            </div>
          </el-form-item>
          <el-form-item>
            <!-- 编辑器 -->
            <v-editor :editorContent.sync="editorContent"></v-editor>
          </el-form-item>
          <el-form-item class="foot">
            <el-button @click="onClose('ruleForm')" style="width: 100px">取消</el-button>
            <el-button v-if="!id" type="primary" style="width: 100px" @click="onSave('ruleForm')">发布</el-button>
            <el-button v-else type="primary" style="width: 100px" @click="onModify('ruleForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import wangeditor from '@/components/wangeditor/wangeditor';
import News from '@/models/news-model.js';
const newsModel = new News();


export default {
  name: 'newsEditor',
  components: {
    "v-editor": wangeditor
  },
  data () {
    return {
      id: null,

      newsForm: {
        title: '',
        describe: '',
        genre: '',
        image: '',
        content: '',
      },

      rules: {
        title: [
          { required: true, message: '请输入新闻标题', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入新闻标题', trigger: 'blur' }
        ],
        genre: [
          { required: true, message: '请选择新闻类型', trigger: 'change' }
        ],
        image: [
          { required: true, message: '请上传新闻主图', trigger: 'change' }
        ],
      },

      newsOptions: [],
      editorContent: '',
    }
  },
  mounted () {
    if (this.$route.query) {
      const id = this.$route.query.id
      this.id = id
      this.getNewsInfo(this.id)
    }
    this.initNewsOption()
  },
  methods: {
    getNewsInfo (id) {
      newsModel.getNews({ id: id }).then((result) => {
        const data = result.data
        this.newsForm.title = data.title
        this.newsForm.describe = data.describe
        this.newsForm.genre = data.genre
        this.newsForm.image = data.image
        this.editorContent = data.content
      }).catch((err) => {
        console.log(err);
      });
    },
    // 下拉框
    onSelect (value) {
      console.log(value);
    },
    // 初始化分类下拉框
    initNewsOption () {
      newsModel.getNewsType().then((result) => { //获取分类
        const data = result.data
        this.newsOptions = data.list
      }).catch((err) => {
        console.log(err);
      });
    },
    // 取消
    onClose (ruleForm) {
      // this.$refs[ruleForm].resetFields();
      this.$router.back()
    },
    removeImage () {
      this.newsForm.image = ''
    },
    uploadImage (params) {
      const formdata = new FormData()
      const file = params.file

      formdata.append('file', file)

      newsModel.uploadImages(formdata).then((result) => {
        // console.log(result.data);
        const image = result.data
        this.newsForm.image = image
      }).catch((err) => {
        console.log(err);
      });
    },
    // 发布
    onSave (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 验证校验通过--发布
          newsModel.addNews({
            title: this.newsForm.title,
            describe: this.newsForm.describe,
            genre: this.newsForm.genre,
            image: this.newsForm.image,
            content: this.editorContent,
          }).then((result) => {
            this.$message('新闻发布成功！')
            this.$router.back()
          }).catch((err) => {
            this.$message(err.msg)
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 修改
    onModify (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 验证校验通过--发布
          newsModel.editNews({
            id: this.id,
            title: this.newsForm.title,
            describe: this.newsForm.describe,
            genre: this.newsForm.genre,
            image: this.newsForm.image,
            content: this.editorContent,
          }).then((result) => {
            this.$message('新闻修改成功！')
            this.$router.back()
          }).catch((err) => {
            this.$message(err.msg)
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 30px 50px;
  box-sizing: border-box;

  .news-block{
    padding: 50px 110px 30px 30px;
    background: #fff;
    box-sizing: border-box;

    .el-input{
      width: 300px;
    }

    .foot {
      margin-top: 50px;
      text-align: center;
    }
  }

  
}

.container /deep/ {
  .upload-centent {
    position: relative;
    display: inline-block;

    &:hover .avatar-delete-icon {
      display: block;
    }

    .avatar-delete-icon {
      position: absolute;
      font-size: 28px;
      color: #8c939d;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: none;
      cursor: pointer;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      position: absolute;
      font-size: 28px;
      color: #8c939d;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>

