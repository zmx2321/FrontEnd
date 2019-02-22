<template>
  <div class="container">
    <!-- 搜索板块 -->
    <el-row class="search-block">
      <el-col :span="24">
        <el-form :model="form" label-width="80px" size="small" :inline="true">
          <el-form-item label="商品名称">
            <el-input v-model="form.name" placeholder="请输入商品名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.minPrice" placeholder="最低价格" style="width: 150px;"></el-input>
            -
            <el-input v-model="form.maxPrice" placeholder="最高价格" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="form.categoryId" placeholder="选择分类" clearable @change="onTypeChange">
              <el-option v-for="item in typeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="库存总数">
            <el-input v-model="form.amount" placeholder="请输入库存数量" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-select v-model="form.status" placeholder="选择分类" clearable @change="onStatusChange">
              <el-option v-for="item in statusOptions" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 12px;">
            <el-button type="primary" @click="onSearch">点击搜索</el-button>
            <el-button type="primary" size="small" @click="onAddGood">新增商品</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 数据显示板块 -->
    <el-row class="table-block">
      <el-col :span="24">
        <el-table :data="tableData" :header-cell-style="tableStyle" border :cell-style="tableStyle" size="medium" max-height="600" style="width: 100%">
          <el-table-column label="商品头图">
            <template slot-scope="scope">
              <div v-if="scope.row.imageList">
                <img class="good-img" :src="scope.row.imageList[0]" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="价格">
            <template slot-scope="scope">
              {{scope.row.minPrice}} - {{scope.row.maxPrice}}
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              {{scope.row.status == 0 ? '已上架' : '已下架'}}
            </template>
          </el-table-column>
          <el-table-column label="销量" prop="sales"></el-table-column>
          <el-table-column label="销售额" prop="totalPrice"></el-table-column>
          <el-table-column label="总库存" prop="amount"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" :type="scope.row.status == 0 ? 'info' : 'primary'" @click="handleStatus(scope.$index, scope.row)">
                {{scope.row.status == 0 ? '下架' : '上架'}}
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- 分页板块 -->
    <el-row class="pagination-block">
      <el-col :span="24">
        <el-pagination :total="total" :current-page.sync="pageNum" :page-size.sync="pageSize" @current-change="onCurrentChange" layout="prev, pager, next" background></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
  
<script>
import { publicMixin } from '@/mixins/public-mixin.js';
import GoodsModel from '@/models/goods-model.js';
const goodsModel = new GoodsModel();

export default {
  name: "main1",
  mixins: [publicMixin],
  data () {
    return {
      form: {
        name: '', // 名称
        minPrice: '', // 最低价
        maxPrice: '', // 最高价
        amount: '', // 库存
        categoryId: '', // 商品类型
        status: '', // 商品状态
      },

      typeOptions: [],

      statusOptions: [
        { id: '0', label: '已上架' },
        { id: '1', label: '已下架' },
      ],

      tableData: [],
      tableStyle: {
        'text-align': 'center'
      },

    };
  },
  mounted () {
    this.getType()
    this.getData({
      pageSize: this.pageSize,
      pageNum: this.pageNum
    })
  },
  methods: {
    // 获取数据
    getData (params) {
      goodsModel.getGoodsList(params)
        .then((result) => {
          let tableData = result.data.list
          this.tableData = tableData
          this.total = result.data.total
        }).catch((err) => {

        });
    },

    // 获取分类
    getType () {
      goodsModel.getGoodsType().then((result) => {
        let options = result.data.list
        this.typeOptions = options
      }).catch((err) => {

      });
    },

    // 商品分类
    onTypeChange (value) {
      console.log(value);
    },

    // 商品状态
    onStatusChange (value) {
      console.log(value);
    },


    onAddGood () {
      this.$router.push('/home/goods-detail')
    },
    // 编辑
    handleEdit (index, rows) {
      const id = rows.id
      this.$router.push({ path: '/home/goods-detail', query: { id } })
    },

    handleDelete (index, rows) {
      const id = rows.id

      goodsModel.deleteGood({ id }).then((result) => {
        this.$message('删除商品成功！')
        this.onSearch()
      }).catch((err) => {

      });
    },

    // 上下架
    handleStatus (index, rows) {
      console.log(index, rows);
      const id = rows.id
      const status = rows.status
      const _status = status == 0 ? 1 : 0

      goodsModel.modifyGoodStatus({ id, status: _status }).then((result) => {
        this.onSearch()
      }).catch((err) => {

      });
    },

    // 翻页
    onCurrentChange (currentPage) {
      this._dealSearchData(currentPage)
    },

    // 搜索
    onSearch () {
      this.pageNum = 1
      this._dealSearchData(this.pageNum)
    },

    // 处理翻页和搜索
    _dealSearchData (value) {
      const form = this._dealSearchList(this.form)
      const newForm = Object.assign(form, { pageSize: this.pageSize }, { pageNum: value })
      this.getData(newForm)
    },
  }
}
</script>
  
<style lang="scss" scoped>
.container {
  .search-block {
    padding: 30px 20px 10px 20px;
    box-sizing: border-box;
    background: #fff;
    margin-bottom: 20px;
    color: rgba(0, 0, 0, 0.65);
  }
  .table-block {
    margin-bottom: 30px;
    padding: 30px;
    background: #fff;
    box-sizing: border-box;
    .good-img {
      width: 60px;
      height: 60px;
    }
  }
  .pagination-block {
    text-align: center;
  }
}
</style>