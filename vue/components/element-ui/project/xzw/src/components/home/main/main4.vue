<template>
  <div class="container">
    <!-- 搜索板块 -->
    <el-row class="search-block">
      <el-col :span="24">
        <el-form :model="form" label-width="80px" size="small" :inline="true">
          <el-form-item label="新闻标题">
            <el-input v-model="form.title" placeholder="请输入新闻标题" clearable></el-input>
          </el-form-item>
          <el-form-item label="新闻类型">
            <el-select v-model="form.genre" placeholder="选择分类" clearable @change="onSelect">
              <el-option v-for="item in newsOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 12px;">
            <el-button type="primary" @click="onSearch">点击搜索</el-button>
            <el-button type="primary" @click="onAddNews">新增新闻</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>

    <!-- 数据显示板块 -->
    <el-row class="table-block">
      <el-col :span="24">
        <el-table :data="tableData" :header-cell-style="tableStyle" :cell-style="tableStyle" border  size="medium" max-height="650" style="width: 100%">
          <el-table-column label="新闻标题" prop="title"></el-table-column>
          <el-table-column label="分类" prop="genreName"></el-table-column>
          <el-table-column label="新闻描述" prop="describe"></el-table-column>
          <el-table-column label="发布时间" prop="createAt"></el-table-column>
          <el-table-column label="更新时间" prop="updateAt"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="primary" @click="onDelete(scope.$index, scope.row)">
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
        <el-pagination :total="total" :current-page.sync="pageNum" :page-size.sync="pageSize" @current-change="onCurrentChange" layout="prev, pager, next" background></el-pagination>
      </el-col>
    </el-row>

  </div>
</template>
  
<script>
import { publicMixin } from '@/mixins/public-mixin.js';
import News from '@/models/news-model.js';
const newsModel = new News();

export default {
  name: "main4",
  mixins: [publicMixin],
  data () {
    return {
      form: {
        title: '',
        genre: '',
      },

      newsOptions: [],

      tableData: [],
      tableStyle: {
        'text-align': 'center'
      },
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData (params) {
      const obj = params ? params : {}
      const newParams = Object.assign(obj, {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      })

      await newsModel.searchNews(newParams).then((result) => { //获取新闻
        const data = result.data
        this.total = data.total
        this.tempData = data.list //临时数据
      }).catch((err) => {
        console.log(err);
      });

      await newsModel.getNewsType().then((result) => { //获取分类
        const data = result.data
        this.newsOptions = data.list
      }).catch((err) => {
        console.log(err);
      });

      await newsModel._dealData(this.tempData, this.newsOptions) //处理临时数据
      this.tableData = this.tempData
    },
    // 筛选
    onSelect (value) {
      const genre = value
      this.form.genre = genre
    },
    // 翻页
    onCurrentChange (value) {
      this._dealSearchData(value)
    },
    // 搜索
    onSearch () {
      this._dealSearchData()
    },
    // 新增
    onAddNews () {
      this.$router.push('/home/news-detail')
    },
    // 删除
    onDelete (index, rows) {
      const id = rows.id
      newsModel.deleteNews({
        id
      }).then((result) => {
        this.$message('新闻删除成功！')
        this.getData()
      }).catch((err) => {
        console.log(err);
      });
    },
    // 编辑
    onEdit (index, rows) {
      const id = rows.id
      this.$router.push({ path: "/home/news-detail", query: { id } })
    },
    // 处理搜索&&翻页
    _dealSearchData (value) {
      this.pageNum = value ? value : 1
      const form = this._dealSearchList(this.form) //过滤搜索字段
      this.getData(form)
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