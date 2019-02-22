<template>
  <div class="container">
    <!-- 主体板块 -->
    <el-tabs v-model="defaultName"
             type="border-card"
             tab-position="top">

      <el-tab-pane label="商品分类"
                   name="first">
        <el-row>
          <el-col :span="24">
            <!-- 新增按钮 -->
            <el-row class="shop-block">
              <el-col :span="24">
                <el-button type="primary"
                           size="small"
                           @click="addType(true)">新增商品分类</el-button>
              </el-col>
            </el-row>

            <!-- 商品分类数据 -->
            <el-row class="table-block">
              <el-col :span="24">
                <el-table :data="shopData"
                          border
                          size="medium"
                          style="width: 100%"
                          :cell-style="cellStyle"
                          :header-cell-style="cellStyle">
                  <el-table-column label="分类名称"
                                   prop="name"></el-table-column>
                  <el-table-column label="操作"
                                   width="200"
                                   class="edit-col">
                    <template slot-scope="scope">
                      <el-button size="mini"
                                 @click="onEdit(scope.$index, scope.row, true)">编辑</el-button>
                      <el-button size="mini"
                                 type="primary"
                                 @click="onDelete(scope.$index, scope.row, true)">
                        删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <!-- 分页板块 -->
            <el-row class="pagination-block">
              <el-col :span="24">
                <el-pagination :total="totalShop"
                               :current-page.sync="pageNumShop"
                               :page-size.sync="pageSizeShop"
                               @current-change="onCurrent($event,true)"
                               layout="prev, pager, next"
                               background></el-pagination>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="新闻分类"
                   name="second">
        <el-row>
          <el-col :span="24">
            <el-row class="news-block">
              <el-col :span="24">
                <el-button type="primary"
                           size="small"
                           @click="addType(false)">新增新闻分类</el-button>
              </el-col>
            </el-row>

            <!-- 新闻分类数据 -->
            <el-row>
              <el-col :span="24">
                <el-table :data="newsData"
                          :cell-style="cellStyle"
                          :header-cell-style="cellStyle"
                          border
                          size="medium"
                          style="width: 100%">
                  <el-table-column label="分类名称"
                                   prop="name"></el-table-column>
                  <el-table-column label="操作"
                                   width="200">
                    <template slot-scope="scope">
                      <el-button size="mini"
                                 @click="onEdit(scope.$index, scope.row, false)">编辑</el-button>
                      <el-button size="mini"
                                 type="primary"
                                 @click="onDelete(scope.$index, scope.row, false)">
                        删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <!-- 分页板块 -->
            <el-row class="pagination-block">
              <el-col :span="24">
                <el-pagination :total="totalNews"
                               :current-page.sync="pageNumNews"
                               :page-size.sync="pageSizeNews"
                               @current-change="onCurrent($event,false)"
                               layout="prev, pager, next"
                               background></el-pagination>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-tab-pane>

    </el-tabs>

    <!-- 弹窗板块 -->
    <el-row>
      <el-col :span="24">
        <el-dialog :title="formTitle"
                   :visible.sync="isShowDialog">
          <div class="content">
            <el-form ref="form"
                     :model="form"
                     label-width="90px"
                     label-position="left">
              <el-form-item label="分类名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="分类排序">
                <el-input v-model="form.sort"
                          placeholder="请输入分类的排序数值，根据数值展现分类排序"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary"
                       @click="onSure">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>

  </div>
</template>
  
<script>
import { publicMixin } from '@/mixins/public-mixin.js';
import Types from '@/models/type-model.js';
const typesModel = new Types();


export default {
  name: "main5",
  mixins: [publicMixin],
  data () {
    return {
      defaultName: 'first',

      shopData: [],
      newsData: [],
      tableStyle: {
        'text-align': 'center'
      },

      isShop: null, //判断
      isUpdataShopShop: false,
      isShowDialog: false,

      form: {
        sort: '',
        name: '',
      },
      typeId: '',
      formTitle: '新增分类'
    };
  },
  mounted () {
    this.getShops()
    this.getNews()
  },
  methods: {
    // 设置表格列样式
    cellStyle ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 1) { //指定坐标
        return 'text-align:center'
      } else {
        return ''
      }
    },
    // 全部商品分类
    getShops (params) {
      const obj = params ? params : {}
      const newParams = Object.assign(obj, {
        pageSize: this.pageSizeShop,
        pageNum: this.pageNumShop
      })

      typesModel.getShopType(newParams).then((result) => {
        const data = result.data
        this.shopData = data.list
        this.totalShop = data.total
      }).catch((err) => {

      });
    },
    // 全部新闻分类
    getNews (params) {
      const obj = params ? params : {}
      const newParams = Object.assign(obj, {
        pageSize: this.pageSizeNews,
        pageNum: this.pageNumNews
      })

      typesModel.getNewsType(newParams).then((result) => {
        const data = result.data
        this.newsData = data.list
        this.totalNews = data.total
      }).catch((err) => {

      });
    },
    addType (value) {
      const isShop = value
      const isUpdataShop = false

      this.isShop = isShop
      this.isUpdataShop = isUpdataShop
      this.formTitle = '新增分类'

      this._clearData()
      this.isShowDialog = true
    },
    // 商品分类编辑
    onEdit (index, rows, value) {
      const id = rows.id
      const isShop = value
      const isUpdataShop = true

      this.typeId = id
      this.isShop = isShop
      this.isUpdataShop = isUpdataShop
      this.formTitle = '编辑分类'

      this.form.name = rows.name
      this.form.sort = rows.sort
      this.isShowDialog = true
    },
    // 分类删除
    onDelete (index, rows, value) {
      const id = rows.id
      const isShop = value
      this.isShop = isShop

      if (this.isShop) {
        typesModel.deleteOneShopType({ id }).then((result) => {
          this.$message('删除商品分类成功！')
          this.getShops()
        }).catch((err) => {
          console.log(err);
        });
      } else {
        typesModel.deleteOneNewsType({ id }).then((result) => {
          this.$message('删除新闻分类成功！')
          this.getNews()
        }).catch((err) => {
          console.log(err);
        });
      }

    },
    // 分页
    onCurrent (event, value) {
      const isShop = value
      this.isShop = isShop

      if (this.isShop) {
        this.pageNumShop = event
        this.getShops()
      } else {
        this.pageNumNews = event
        this.getNews()
      }
    },
    // 取消
    onCancel () {
      this.isShowDialog = false
      this._clearData()
    },
    // 确定
    onSure () {
      const addWay = this.isShop ? 'addShopType' : 'addNewsType'

      const updata = this.isUpdataShop ? 'updataOneShopType' : 'updataOneNewsType'

      if (this._checkNull(this.form) && !this.isUpdataShop) {
        typesModel[addWay](this.form).then((result) => {
          this.isShowDialog = false
          this.$message('新增分类成功！')
          this._clearData()

          switch (addWay) {
            case 'addShopType':
              this.getShops()
              break;
            default:
              this.getNews()
              break;
          }
        }).catch((err) => {
          console.log(err);
        });
      }

      if (this._checkNull(this.form) && this.isUpdataShop) {
        typesModel[updata]({
          id: this.typeId,
          name: this.form.name,
          sort: this.form.sort,
        }).then((result) => {
          this.isShowDialog = false
          this.$message('修改成功！')
          this._clearData()

          switch (updata) {
            case 'updataOneShopType':
              this.getShops()
              break;
            default:
              this.getNews()
              break;
          }
        }).catch((err) => {
          console.log(err);
        });
      }


    },

    // 清空弹窗
    _clearData () {
      this.form.name = ''
      this.form.sort = ''
    },

    // 校验空值
    _checkNull (object) {
      for (const key in object) {
        if (object[key] === '') {
          this.$message('请输入完整信息后提交！')
          return false
        }
      }
      return true
    },
  }
}
</script>
  
<style lang="scss" scoped>
.container {
  .shop-block, .news-block{
    text-align: right;
    padding: 20px 35px 30px 0;
  }
  .pagination-block {
    padding-top: 40px;
    padding-bottom: 20px;
    text-align: center;
  }
}

.edit-col {
  color: red;
}
</style>