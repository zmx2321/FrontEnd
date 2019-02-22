<template>
  <div class="container">
    <!-- 标题分类板块 -->
    <el-row class="good-block">
      <el-col :span="24">
        <el-form :model="goodForm" ref="ruleForm" :rules="rules" size="medium" label-position="left" label-width="100px">

          <!-- 商品信息 -->
          <el-form-item label="商品名称：" prop="name">
            <el-input v-model="goodForm.name" placeholder="" size="small" style="width: 217px;"></el-input>
          </el-form-item>
          <el-form-item label="商品分类：" required>
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="item in checkOptions" :checked="item.checked" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <!-- 商品主图 -->
          <el-form-item label="商品主图：" required>
            <div class="upload-container">
              <div class="pic-content" v-for="(item,index) in fileList" :key="item.id">
                <img class="pic" :src="item.url" alt="" :key="index">
                <i class="mock"></i>
                <i class="el-icon-delete" @click="onDeletePic(index)"></i>
              </div>
              <el-upload action="" class="el-my-upload" multiple with-credentials :show-file-list="false" :limit="5" :file-list="fileList" :on-change="onChange" :on-remove="onRemove" :on-exceed="onExceed" :http-request="onUpload">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>

          <!-- SKU部分 -->
          <el-form-item label="商品规格:" required>
            <el-button type="" class="add-sku" @click="addSku">新增规格</el-button>

            <el-table v-if="skuList.length" :data="skuList" :span-method="arraySpanMethod" border :header-cell-style="tableStyle" :cell-style="tableStyle" size="mini" max-height="300">

              <el-table-column label="规格名称">
                <el-table-column label="规格1">
                  <template slot-scope="scope">
                    <el-input v-show="scope.row.archive == 0" v-model="scope.row.attr1" placeholder="请输入规格1名称"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="规格2">
                  <template slot-scope="scope">
                    <el-input v-show="scope.row.archive == 0" v-model="scope.row.attr2" placeholder="请输入规格2名称"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column label="规格库存">
                <template slot-scope="scope">
                  <el-input v-show="scope.row.archive == 0" v-model="scope.row.amount" placeholder="请输入规格库存"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="规格价格">
                <template slot-scope="scope">
                  <el-input v-show="scope.row.archive == 0" v-model="scope.row.price" placeholder="请输入规格价格"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="" v-show="scope.row.archive == 0" @click="deleteSku(scope.$index, scope.row, skuList)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 没数据时候的展示 -->
            <el-table v-else :data="skuList" border :header-cell-style="tableStyle" :cell-style="tableStyle" size="mini" height="300">
              <el-table-column label="规格名称">
                <el-table-column label="规格1">
                </el-table-column>
                <el-table-column label="规格2">
                </el-table-column>
              </el-table-column>
              <el-table-column label="规格库存"></el-table-column>
              <el-table-column label="规格价格"></el-table-column>
              <el-table-column label="操作"></el-table-column>
            </el-table>
          </el-form-item>

          <!-- 编辑器 -->
          <el-form-item label="商品详情：" required>
            <v-editor :editorContent.sync="editorContent"></v-editor>
          </el-form-item>

          <!-- 提交按钮 -->
          <el-form-item class="foot">
            <el-button @click="onClose('ruleForm')" style="width: 100px">取消</el-button>
            <el-button v-if="!id" type="primary" style="width: 100px" @click="onPush('ruleForm')">发布</el-button>
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
import Goods from '@/models/goods-model.js';
const newsModel = new News();
const goodsModel = new Goods();


export default {
  name: 'newsEditor',
  components: {
    "v-editor": wangeditor
  },
  data () {
    return {
      id: null,

      goodForm: {
        images: '',
        name: '',
      },

      checkList: [], // 分类勾选项
      checkOptions: [], // 分类总项

      images: '', //实际上传的商品主图列表
      fileList: [], // 接口获取的商品主图列表

      editorContent: '', // 编辑器内容

      skuList: [], //前端渲染的SKU数据
      tempSkuList: null, //真正上传的SKU数据
      tableStyle: {
        'text-align': 'center'
      },

      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        genre: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        shopId: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        image: [
          { required: true, message: '请上传商品主图', trigger: 'change' }
        ],
      },

    }
  },
  mounted () {
    if (this.$route.query.id) {
      const id = this.$route.query.id
      this.id = id
      this.getInfo(this.id)
    } else {
      this.getType()
    }
  },
  methods: {
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      // if (rowIndex % 2 === 0) {
      //   if (columnIndex === 0) {
      //     return [1, 2];
      //   } else if (columnIndex === 1) {
      //     return [0, 0];
      //   }
      // }
    },

    // 更新图片
    onChange (file, fileList) {
      this.images = this._dealFileImages(fileList)
    },
    // 删除图片
    onRemove (file, fileList) {
      this.images = this._dealFileImages(fileList)
    },

    // 图片数组转字符串
    _dealFileImages (array) {
      let arr = []
      array.forEach(element => {
        arr.push(element.url)
      });
      return arr.join()
    },
    onExceed () {
      this.$message('图片最多只能上传5张')
    },

    // 上传图片
    onUpload (params) {
      const formdata = new FormData()
      const file = params.file

      formdata.append('file', file)
      newsModel.uploadImages(formdata).then((result) => {
        const img = result.data
        this.fileList.push({ url: img })
      }).catch((err) => {
        this.$message(err.msg)
      });
    },

    onDeletePic (index) {
      this.fileList.splice(index, 1)
    },

    // 获取商品分类
    getType () {
      goodsModel.getGoodsType().then((result) => {
        this.checkOptions = result.data.list
      }).catch((err) => {

      });
    },
    // 新增SKU
    addSku () {
      this.skuList.push({
        productId: this.id,
        archive: 0,
      })
      console.log(this.skuList);
    },
    // 删除SKU
    deleteSku (index, row, skuList) {
      const element = skuList[index]
      const id = row.id
      if (id) {
        element.archive = 1
      } else {
        skuList.splice(index, 1)
      }
    },
    // 获取单条商品
    getInfo (id) {
      goodsModel.getOneGood({ id: id }).then((result) => {
        const data = result.data
        this.goodForm = data
        this.skuList = data.skuList
        this.checkOptions = data.categories
        this.editorContent = data.desc


        this.fileList = this._dealImageList(data.imageList) //图片数组URL处理
        // this.images = this._dealFileImages(this.fileList) //数组图片URL 转 字符串
      }).catch((err) => {
        this.$message('111')
      });
    },

    // 处理获取的图片数组
    _dealImageList (arr) {
      const _arr = arr.map((item) => {
        let obj = {}
        obj.url = item
        return obj
      })
      return _arr.slice(0, 5)
    },

    // 取消
    onClose (ruleForm) {
      this.$router.back()
    },
    // 发布
    onPush (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          goodsModel.addGood({
            shopId: 0,
            name: this.goodForm.name,
            images: this._dealFileList(this.fileList),
            categoryId: this.checkList.join(','),
            desc: this.editorContent,
            skuList: this.skuList,
          }).then((result) => {
            this.$message('发布成功!')
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
          goodsModel.modifyGoodInfo({
            id: this.id,
            categoryId: this.checkList.join(','),
            desc: this.editorContent,
            images: this._dealFileList(this.fileList),
            name: this.goodForm.name,
            skuList: this.skuList,
          }).then((result) => {
            this.$message('修改成功!')
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

    _dealFileList (array) {
      const arr = array.map((element) => {
        return element.url
      })
      return arr.join(',')
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 30px 50px;
  box-sizing: border-box;

  .good-block {
    padding: 50px 110px 30px 30px;
    background: #fff;
    box-sizing: border-box;

    .goodSku-icon {
      min-width: 180px;
    }

    .add-sku {
      margin-bottom: 20px;
    }

    .foot {
      margin-top: 50px;
      text-align: center;
    }
  }
}

.container /deep/ {
  .upload-container {
    display: flex;
    align-items: center;
    font-size: 0;
  }

  .pic-content {
    width: 110px;
    height: 110px;
    overflow: hidden;
    position: relative;
    margin-right: 10px;

    &:hover .el-icon-delete,
    &:hover .mock {
      display: block;
    }

    .pic {
      width: 110px;
      height: 110px;
      overflow: hidden;
      border-radius: 6px;
      cursor: pointer;
    }

    .mock {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      display: none;
    }

    .el-icon-delete {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      color: #f5f5f5;
      cursor: pointer;
      display: none;
      z-index: 999;
    }
  }
  .el-my-upload {
    width: 110px;
    height: 110px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;

    .el-upload {
      width: 110px;
      height: 110px;
    }

    .el-icon-plus {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      color: #666;
    }
  }
  .el-my-upload:hover {
    border-color: #409eff;
  }
}
</style>

