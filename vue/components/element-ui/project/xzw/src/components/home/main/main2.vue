<template>
  <div class="container">
    <!-- 搜索板块 -->
    <el-row class="search-block">
      <el-col :span="24">
        <el-form :model="form" label-width="80px" size="small" :inline="true">
          <el-form-item label="分销名称">
            <el-input v-model="form.username" placeholder="请输入分销商名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="form.realname" placeholder="请输入客户姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.mobile" placeholder="请输入客户联系电话" clearable></el-input>
          </el-form-item>
          <el-form-item label="客户类型">
            <el-select v-model="form.serverPoint" placeholder="选择分类" clearable @change="onStatusChange">
              <el-option v-for="item in statusOptions" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户状态">
            <el-select v-model="form.disable" placeholder="选择分类" clearable @change="onTypeChange">
              <el-option v-for="item in typeOptions" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 12px;">
            <el-button type="primary" @click="onSearch">点击搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 数据显示板块 -->
    <el-row class="table-block">
      <el-col :span="24">
        <el-table :data="tableData" :header-cell-style="tableStyle" :cell-style="tableStyle" border  size="medium" max-height="600" style="width: 100%">
          <el-table-column label="分销商名称" prop="nickname"></el-table-column>
          <el-table-column label="等级" prop="agentLevel"></el-table-column>
          <el-table-column label="类型" prop="serverPoint">
            <template slot-scope="scope">
              {{scope.row.serverPoint == 0 ? '分销商' : '网点'}}
            </template>
          </el-table-column>
          <el-table-column label="分销商地址" prop="city">
            <template slot-scope="scope">
              {{scope.row.province + scope.row.city + scope.row.district + scope.row.address ? scope.row.province + scope.row.city + scope.row.district + scope.row.address : ''}}
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="realname"></el-table-column>
          <el-table-column label="电话" prop="mobile"></el-table-column>
          <!-- <el-table-column label="注册时间" prop="createAt" width="180"></el-table-column> -->
          <el-table-column label="客户状态" prop="disable">
            <template slot-scope="scope">
              {{scope.row.disable == 0 ? '正常' : '冻结'}}
            </template>
          </el-table-column>

          <el-table-column label="累计盈利" prop="allSumBills"></el-table-column>
          <el-table-column label="本月盈利" prop="monthSumBills"></el-table-column>
          <el-table-column label="最后返现时间">
            <template slot-scope="scope">
              <span>{{scope.row.lastCashbackDate | filterTime}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="返现状态" prop="isCashback">
            <template slot-scope="scope">
              {{scope.row.isCashback == 0 ? '未返现' : '已返现'}}
            </template>
          </el-table-column> -->

          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="onSumBills(scope.$index, scope.row)">返佣</el-button>
              <el-button size="mini" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" :type="scope.row.disable == 0 ? 'primary' : 'info'" @click="onFrozen(scope.$index, scope.row)">
                {{scope.row.disable == 0 ? '冻结' : '解封'}}
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

    <!-- 编辑弹窗板块 -->
    <el-row>
      <el-col :span="24">
        <el-dialog title="编辑" :visible.sync="isShowDialog">
          <div class="content">
            <!-- <img src="" alt=""> -->
            <el-form ref="form" :model="userForm" label-width="90px" label-position="left">
              <el-form-item label="分销商名称">
                <el-input v-model="userForm.username"></el-input>
              </el-form-item>
              <el-form-item label="客户名称">
                <el-input v-model="userForm.realname"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="userForm.mobile"></el-input>
              </el-form-item>
              <el-form-item label="客户地址">
                {{address}}
              </el-form-item>
              <el-form-item label="注册时间">
                {{createAt}}
              </el-form-item>
              <el-form-item label="客户类型">
                <el-radio-group v-model="userForm.serverPoint">
                  <el-radio label="0">分销商</el-radio>
                  <el-radio label="1">网点</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onSure">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>


    <!-- 返佣弹窗板块 -->
    <el-row class="bills-block">
      <el-col :span="24">
        <el-dialog title="返佣审批" :visible.sync="isShowSumBills" @close="onCancelSumBills">
          <div class="content">
            <div class="info-user">
              <h4>个人信息</h4>
              <template v-if="bankData">
                <div>
                  <p>银行卡号：{{bankData.cardNum}}</p> 
                  <p>银行户名：{{bankData.holdName}}</p> 
                  <p>开户银行：{{bankData.name}}</p>
                  <p>联系方式：{{userInfoData.mobile}}</p> 
                </div>
              </template>
              <template v-else>
                <div>暂无数据</div>
              </template>
            </div>
            <div class="info-list">
              <h4>历史记录</h4>
              <template v-if="userData">
                <div>
                  <el-table :data="userData.list" :header-cell-style="tableStyle" :cell-style="tableStyle" border  size="mini" max-height="250" style="width: 100%">
                    <el-table-column label="时间">
                      <template slot-scope="scope">
                        <span>{{scope.row.month | filterTime}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="月度盈利" prop="total"></el-table-column>
                    <el-table-column label="状态">
                      <template slot-scope="scope">
                        <el-button v-if="scope.row.status == 0 && (scope.row.month.slice(6,7) != month)" size="mini" @click="onDialogSumBills(scope.$index, scope.row)">确认返现</el-button>
                        <p v-if="scope.row.status == 0 && (scope.row.month.slice(6,7) == month)" size="mini">待结算</p>
                        <p v-if="scope.row.status != 0">已返现</p>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="info-list__pagination">
                    <el-pagination :total="info_total" :current-page.sync="info_pageNum" :page-size.sync="info_pageSize" @current-change="info_onCurrentChange" layout="prev, pager, next"></el-pagination>
                  </div>
                </div>
              </template>

            </div>
          </div>
          <!-- <div slot="footer">
            <el-button @click="onCancelSumBills">取 消</el-button>
            <el-button type="primary" @click="onSureSumBills">确 定</el-button>
          </div> -->
        </el-dialog>
      </el-col>
    </el-row>

  </div>
</template>
  
<script>
import { publicMixin } from '@/mixins/public-mixin.js';
import DistributorModel from '@/models/distributor-model.js';
const distModel = new DistributorModel();

export default {
  name: "main2",
  mixins: [publicMixin],
  data () {
    return {
      
      info_total: 1,
      info_pageNum: 1,
      info_pageSize: 100,
      info_userId: null,
      
      isShowSumBills: false, // 返佣弹窗

      form: {
        username: '', //分销商名称
        realname: '', //客户名称
        mobile: '', //电话
        serverPoint: '', // 客户类型
        disable: '', //客户状态
      },

      userForm: { //单条信息
        userId: '',
        username: '',
        realname: '',
        mobile: '',
        serverPoint: '0',
      },
      address: '',
      createAt: '',

      typeOptions: [ //disable： 0--正常；1--封禁
        { id: '0', label: '正常' },
        { id: '1', label: '冻结' },
      ],

      statusOptions: [ //serverPoint: 0--分销商；1--网点
        { id: '0', label: '分销商' },
        { id: '1', label: '网点' },
      ],

      tableData: [],
      tableStyle: {
        'text-align': 'center'
      },

      isShowDialog: false,

      userData: null,
      bankData: null,
      userInfoData: null,
    };
  },
  mounted () {
    this.getData()
    let month = new Date().getMonth() + 1
    if(month > 12){
      month = 1
    }
    this.month = month
  },
  filters: {
    filterTime(value){
      return value ? value.slice(0,7) : value
    },
  },
  methods: {
    info_onCurrentChange(val){
      this.info_pageNum = val
      this._findBillsLogByUserId(this.info_userId, this.info_pageNum)
    },

    onDialogSumBills(index, rows){
      this.$confirm('确定返现, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '返现成功!'
          });
          
          distModel.setReturnBills({
            userId: rows.userId,
            month: rows.month.slice(0,7)
          }).then((result) => {
            this._findBillsLogByUserId(rows.userId)
          }).catch((err) => {
            console.log(err);
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消返现'
          });          
        });
    },

    _findBillsLogByUserId(id, pageNum){
      // 获取返现列表
      distModel.findBillsLogByUserId({
        userId: id,
        pageNum: pageNum || 1,
        pageSize: this.info_pageSize,
      }).then((result) => {
        const data = result.data
        this.userData = data
        this.info_total = data.total
      }).catch((err) => {
        console.log(err);
      });
    },

    _getBankinfo(id, rows){
      // 获取银行个人信息
      distModel.getBankinfo({
        userId: id
      }).then((result) => {
        const data = result.data
        this.bankData = data
        this.userInfoData = rows
        this.info_userId = rows.id
      }).catch((err) => {
        console.log(err);
      });
    },



    // 返佣按钮
    onSumBills(index, rows){
      this.isShowSumBills = true
      const id = rows.id
      this._findBillsLogByUserId(id)
      this._getBankinfo(id, rows)
    },

    onCancelSumBills(){
      this.isShowSumBills = false
      this.info_pageNum = 1
      this.getData()
    },



    // 获取当页数据
    getData (params = {
      pageSize: this.pageSize,
      pageNum: this.pageNum
    }) {
      distModel.getData(params).then((result) => {
        const data = result.data
        this.tableData = data.list
        this.total = data.total
      }).catch((err) => {

      });
    },

    // 客户类型
    onTypeChange (value) {
      const serverPoint = value
    },

    // 客户状态
    onStatusChange (value) {
      const disable = value
    },

    // 编辑
    onEdit (index, rows) {
      this.isShowDialog = true
      const id = rows.id
      distModel.getOneInfo({ id }).then((result) => {

        let data = result.data

        if(!data){
          data = {}
        }

        this.userForm.userId = data.id || ''
        this.userForm.username = data.nickname || ''
        this.userForm.realname = data.realname || ''
        this.userForm.mobile = data.mobile || ''
        this.userForm.serverPoint = (data.serverPoint + '')  || ''
        this.address = (data.province + data.city + data.district + data.address)  || ''
        this.createAt = data.createAt || ''

      }).catch((err) => {

      });
    },

    // 冻结
    onFrozen (index, rows) {
      const userId = rows.id
      const disable = rows.disable == 0 ? 1 : 0

      distModel.changeUserStatus({
        userId,
        disable
      }).then((result) => {
        this.getData({ pageSize: this.pageSize, pageNum: this.pageNum }) //刷新数据
      }).catch((err) => {
        console.log(err);
      });
    },

    // 翻页
    onCurrentChange (currentPage) {
      this._dealSearchData(currentPage)
    },

    // 点击搜索
    onSearch () {
      this.pageNum = 1
      const form = this._dealSearchList(this.form) //过滤搜索字段
      const newForm = Object.assign(form, { pageSize: this.pageSize }, { pageNum: this.pageNum })
      this.getData(newForm)

    },

    // 点击取消
    onCancel () {
      this.isShowDialog = false
    },

    // 点击确定
    onSure () {
      if (this._checkNull(this.userForm)) { //校验是否存在空值
        distModel.updataOneInfo(this.userForm).then((result) => {
          this.isShowDialog = false
          this.getData()
        }).catch((err) => {
          console.log(err);
        });
      }
    },

    // 处理翻页和搜索
    _dealSearchData (value) {
      this.pageNum = value
      const form = this._dealSearchList(this.form) //过滤搜索字段
      const newForm = Object.assign(form, { pageSize: this.pageSize }, { pageNum: this.pageNum })
      this.getData(newForm)
    },

    // 校验是否空值
    _checkNull (object) {
      for (const key in object) {
        if (object[key] == '') {
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

  .bills-block{
    .content{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      h4{
        margin-bottom: 20px;
        font-weight: bold;
      }

      .info-user{
        min-width: 250px;
        margin-right: 20px;
        p{
          line-height: 2;
        }
      }

      .info-list{
        flex: 1;

        .info-list__pagination{
          text-align: center;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>