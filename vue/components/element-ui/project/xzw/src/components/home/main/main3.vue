<template>
  <div class="container">
    <!-- 搜索板块 -->
    <el-row class="search-block">
      <el-col :span="24">
        <el-form :model="form" label-width="80px" size="small" :inline="true">
          <el-form-item label="订单编号">
            <el-input v-model="form.orderNo" placeholder="请输入订单编号" clearable></el-input>
          </el-form-item>
          <el-form-item label="网点名称">
            <el-input v-model="form.branchName" placeholder="请输入网点名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="买家名称">
            <el-input v-model="form.buyerName" placeholder="请输入买家名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="买家电话">
            <el-input v-model="form.buyerPhone" placeholder="请输入买家电话" clearable></el-input>
          </el-form-item>

          <el-form-item label="下单时间">
            <el-date-picker v-model="form.createOrderDay" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="订单价格">
            <el-input v-model="form.botPrice" placeholder="最低价格" style="width: 150px;"></el-input>
            -
            <el-input v-model="form.topPrice" placeholder="最高价格" style="width: 150px;"></el-input>
          </el-form-item>

          <el-form-item label="订单状态">
            <el-select v-model="form.orderStatus" placeholder="选择分类" clearable>
              <el-option v-for="item in optionsStatus" :key="item.id" :label="item.name" :value="item.id"></el-option>
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

          <el-table-column label="订单编号" prop="orderNo"></el-table-column>
          <el-table-column label="订单状态" prop="orderStatus">
            <template slot-scope="scope">
              {{orderStatus[scope.row.orderStatus]}}
            </template>
          </el-table-column>
          <el-table-column label="买家姓名" prop="buyerNickname"></el-table-column>
          <el-table-column label="买家电话" prop="buyerMobile"></el-table-column>
          <el-table-column label="买家地址">
            <template slot-scope="scope">
              {{scope.row.buyerProvince + scope.row.buyerCity + scope.row.buyerDistrict +scope.row.buyerAddress}}
            </template>
          </el-table-column>
          <!-- <el-table-column label="服务网点" prop="branchName"></el-table-column> -->
          <el-table-column label="下单时间" prop="createAt"></el-table-column>
          <el-table-column label="订单金额" prop="totalPrice"></el-table-column>

          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button v-if="scope.row.orderStatus == 0" size="mini" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button v-if="scope.row.orderStatus == 0" size="mini" type="primary" @click="onCancelOrder(scope.$index,scope.row)">取消订单</el-button>
              <el-button v-if="scope.row.orderStatus == 1" size="mini" type="primary" @click="onConfirmOrder(scope.$index,scope.row)">确认发货</el-button>
              <el-button v-if="scope.row.orderStatus == 5" size="mini" type="danger" @click="onConfirm(scope.$index,scope.row)">确认退货</el-button>
              <span v-if="scope.row.orderStatus == 2 || scope.row.orderStatus == 3 || scope.row.orderStatus == 4 || scope.row.orderStatus == 6">无操作</span>
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

    <!-- 弹窗 -->
    <el-dialog title="编辑" :visible.sync="isShowDialog" center width="950px">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="11">
            <el-form ref="form" :model="orderForm" label-width="90px" label-position="left">
              <el-form-item label="订单编号：">{{orderForm.orderNo}}</el-form-item>
              <el-form-item label="支付状态：">{{orderStatus[orderForm.orderStatus]}}</el-form-item>
              <el-form-item label="买家姓名：">{{name}}</el-form-item>
              <el-form-item label="买家电话：">{{phone}}</el-form-item>
              <el-form-item label="买家地址：">
                <el-select v-model="addressId" placeholder="请选择" style="width:100%" @change="onSelect">
                  <el-option v-for="item in userAddress" :key="item.id" :label="item.province + item.city + item.district + item.address" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="服务网点：">{{orderForm.servicePointName ? orderForm.servicePointName: '默认网点'}}</el-form-item> -->
              <el-form-item label="默认金额：">
                <el-input v-model="orderForm.totalPrice" placeholder="默认金额（选填）"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="11">
            <template v-for="order in orderForm.orderItemList">
              <el-row v-if="order.product" class="item" :key="order.id" type="flex" align="middle">
                <el-col style="width: 165px;margin-right: 10px;">
                  <img :src="order.product.image" alt="" style="width: 100%;">
                </el-col>
                <el-col :span="24">
                  <el-row style="margin-bottom: 10px;">
                    <el-col :span="24">
                      <div>商品名称：{{order.product.name}}</div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom: 10px;">
                    <el-col :span="24">
                      <!-- 规格选择 -->
                      <el-select v-model="order.sku.id" placeholder="请选择规格" size="mini" style="width:100%">
                        <el-option v-for="item in order.product.skuList" :key="item.id" :label="item.attr1" :value="item.id"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row type="flex" align="middle">
                    <el-col style="width: 150px">商品数量：</el-col>
                    <el-col :span="24">
                      <el-input v-model="order.amount" placeholder="请输入商品数量（必填）" size="mini"></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-col>
        </el-row>
      </div>
      <div slot="footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>

import { publicMixin } from '@/mixins/public-mixin.js';
import OrderModel from '@/models/order-model.js';
const orderModel = new OrderModel();

export default {
  name: "component_name",
  mixins: [publicMixin],
  data () {
    return {
      form: { //搜索条件
        botPrice: '', // 最低价
        branchName: '', // 网点名称
        buyerName: '', // 买家姓名
        buyerPhone: '', // 买家电话
        createOrderDay: '', // 下单时间
        orderNo: '', // 订单编号
        orderStatus: '', // 订单状态
        topPrice: '', // 最高价
      },

      optionsStatus: [ //订单状态下拉框数据
        { id: 0, name: '待付款' },
        { id: 1, name: '待发货' },
        { id: 2, name: '待收货' },
        { id: 3, name: '已完成' },
        { id: 4, name: '已取消' },
        { id: 5, name: '退货中' },
        { id: 6, name: '已退货' },
      ],

      orderStatus: ['待付款', '待发货', '待收货', '已完成', '已取消', '退货中', '已退货'],

      tableData: [],
      tableStyle: {
        'text-align': 'center'
      },

      isShowDialog: false,

      orderForm: {},
      name: '',
      phone: '',
      addressId: '',
      userAddress: [], //买家地址

    };
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 获取全部数据
    getData () {
      this.pageSize = 15
      const form = this._dealSearchList(this.form)
      const _form = Object.assign(form, { pageSize: this.pageSize, pageNum: this.pageNum })

      orderModel.searchOrderData(_form).then((result) => {
        this.total = result.data.total
        this.tableData = result.data.list
      }).catch((err) => {
        console.log(err);
      });
    },
    // 获取单条数据
    getOneData (id) {
      orderModel.getOneOrder(id).then((result) => {
        const orderList = result.data.order
        const addressList = result.data.userAddress

        this.orderForm = orderList
        this.userAddress = addressList

        this.name = this.orderForm.address.name
        this.phone = this.orderForm.address.phone
        this.addressId = this.orderForm.address.id

        this.isShowDialog = true
      }).catch((err) => {

      });
    },
    // 搜索
    onSearch () {
      this.pageNum = 1
      this.getData()
    },
    // 编辑
    onEdit (index, row) {
      const orderStatus = row.orderStatus
      const id = row.id
      this.getOneData(id)
    },
    // 地址选择
    onSelect (value) {
      (this.userAddress).forEach(element => {
        if (value == element.id) {
          this.name = element.name
          this.phone = element.phone
        }
      });
    },
    // 退货按钮
    onConfirm (index, row) {
      const orderId = row.id

      orderModel.returnedGood({ orderId }).then((result) => {
        this.$message('退货成功！')
        this.getData()
      }).catch((err) => {
        console.log(err);
      });
    },
    // 取消订单按钮
    onCancelOrder (index, row) {
      const orderId = row.id

      orderModel.updateOrderStatus({
        orderId,
        orderStatus: 4
      }).then((result) => {
        this.$message('取消成功！')
        this.getData()
      }).catch((err) => {

      });
    },
    // 确认发货按钮
    onConfirmOrder (index, row) {
      const orderId = row.id

      orderModel.updateOrderStatus({
        orderId,
        orderStatus: 2
      }).then((result) => {
        this.$message('发货成功！')
        this.getData()
      }).catch((err) => {

      });
    },

    // 弹窗关闭
    onClose () {
      this.isShowDialog = false
    },
    // 弹窗确定
    onSure () {
      orderModel.upDataOneOrder({
        id: this.orderForm.id,
        addressId: this.addressId,
        orderPrice: this.orderForm.totalPrice ? this.orderForm.totalPrice : 0,
        orderItemList: this.orderForm.orderItemList,
      }).then((result) => {
        this.$message('订单修改成功！')
        this.getData()
        this.isShowDialog = false
      }).catch((err) => {
        console.log(err);
      });
    },
    // 翻页
    onCurrentChange (value) {
      this.pageNum = value
      this.getData()
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

   .content {
    height: 450px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 10px;
    .item {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 20px;
      box-sizing: border-box;
    }
}
}
</style>