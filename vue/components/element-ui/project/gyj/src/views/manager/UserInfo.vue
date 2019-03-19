<template>
  <section class="main_cont">
    <!-- 筛选 -->
    <el-row class="toolbar bdr_radiu filter_wrap">
      <el-col :span="24">
        <el-form :model="filterData" status-icon :rules="filterDataRules" ref="filterDataForm" label-width="100px">
          <el-form-item label="用户昵称" prop="nickname" class="intxt">
            <el-input v-model="filterData.nickname" placeholder="请输入用户昵称" clearable></el-input>
          </el-form-item>

          <el-form-item label="地址" class="intxt">
            <el-cascader
                    placeholder="请选择地址"
                    expand-trigger="click"
                    :options="selectCity.cityInfo"
                    v-model="selectCity.selectedOptions"
                    @visible-change="getAddress"
                    change-on-select
                    filterable
                    @change="handleChange">
            </el-cascader>
          </el-form-item>

          <el-form-item label="认证状态" class="intxt">
            <el-select v-model="filterData.status" placeholder="全部">
              <el-option label="全部" value=""></el-option>
              <el-option label="待认证" value="0"></el-option>
              <el-option label="认证通过" value="1"></el-option>
              <el-option label="认证失败" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="年龄下限" prop="lowerAge" class="intxt">
            <el-input v-model="filterData.lowerAge" placeholder="请输入最低年龄" clearable></el-input>
          </el-form-item>
          <el-form-item label="年龄上限" prop="topAge" class="intxt">
            <el-input v-model="filterData.topAge" placeholder="请输入最大年龄" clearable></el-input>
          </el-form-item>
          <el-form-item label="薪资下限" prop="lowerSalary" class="intxt">
            <el-input v-model="filterData.lowerSalary" placeholder="请输入最低薪资" clearable></el-input>
          </el-form-item>
          <el-form-item label="薪资上限" prop="topSalary" class="intxt">
            <el-input v-model="filterData.topSalary" placeholder="请输入最高薪资" clearable></el-input>
          </el-form-item>

          <el-form-item class="intxt btn_wrap">
            <el-button type="primary" @click="filterDataSubmit('filterDataForm')">筛选</el-button>
            <el-button @click="resetForm('filterDataForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 用户列表 -->
    <el-row>
      <el-table class="user_list" :data="user_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 286px)">
        <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
        <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->

        <el-table-column prop="id" label="用户编号" width="auto" align="center"></el-table-column>
        <el-table-column prop="nickname" label="用户昵称" width="auto" align="center"></el-table-column>
        <el-table-column prop="realname" label="真实姓名" width="auto" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号码" width="auto" align="center"></el-table-column>
        <el-table-column prop="salary" label="薪资" width="auto" align="center"></el-table-column>
        <el-table-column prop="addressCity" label="地区" width="auto" align="center"></el-table-column>
        <el-table-column prop="age" label="年龄" width="auto" align="center"></el-table-column>

        <el-table-column label="状态" width="auto" align="center">
          <template slot-scope="scope">
            {{ scope.row.status === 0 ? "需要认证" : "" }}
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-on:click="reviewUserVisible = true" @click="reviewUser(scope.row)">{{ $t('btn.review') }}</el-button>
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

    <!-- 用户审核 -->
    <el-dialog title="用户审核" class="review_user" :close-on-click-modal="true" :visible.sync="reviewUserVisible">
      <!-- 基本信息 -->
      <div class="part1 f-cb">
        <div class="portrait f-fl f-oh">
          <img :src="reviewUserData.icon" alt="icon">
        </div>
        <div class="user_info f-fl">
          <ul>
            <li class="nickname">{{ reviewUserData.nickname }}</li>
            <li>
              <dl>
                <dd>电话：</dd>
                <dd>{{ reviewUserData.phone }}</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dd>工种：</dd>
                <dd>{{ reviewUserData.ckName }}</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dd>地区：</dd>
                <dd>{{ reviewUserData.addressCity }}</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dd>工资：</dd>
                <dd>{{ reviewUserData.salary }}</dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>

      <!-- 真实信息/实名认证审核 1 -->
      <div class="part2 f-oh" v-if="realReavierInfo.length != 0">
        <div class="p2_top f-cb">
          <div class="id_front f-fl f-oh">
            <img :src="realReavierInfo.imgFront" alt="imgFront">
          </div>
          <div class="id_back f-fr f-oh">
            <img :src="realReavierInfo.imgBack" alt="imgBack">
          </div>
        </div>
        <div class="p2_bottom">
          <div class="p2_bm_realname">
            <p>{{ realReavierInfo.realname }}({{ realReavierInfo.idCode }})</p>
          </div>

          <div class="p2_bm_btn" v-if="realReavierInfo.status == 0">
            <ul>
              <li>
                <el-button type="primary" @click="realReviewPass">通过认证</el-button>
              </li>
              <li>
                <el-button type="primary" @click="realReviewFail">认证失败</el-button>
              </li>
            </ul>
          </div>

          <div class="review_status_wrap">
            <div class="review_status review_success" v-if="realReavierInfo.status == 1">
              <span>认证成功</span>
            </div>

            <div class="review_status review_success" v-if="realReavierInfo.status == 2">
              <span>认证失败</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 工种认证审核 0 -->
      <div class="part3 f-oh" v-if="identiyReviewInfo.length != 0">
        <div class="p3_wrap">
          <div class="p3_wrap_auto">
            <div class="work" v-for="item in identiyReviewInfo">
              <ul>
                <li class="work_img">
                  <img :src="item.careerCertificate" alt="work_img">
                </li>
                <li class="work_type">
                  {{ item.ckName }}
                  <!--{{ item.status }}-->
                </li>
                <li class="work_btn">
                  <dl v-if="item.status == 0">
                    <dd>
                      <el-button type="primary" @click="identiyReviewPass(item)">通过认证</el-button>
                    </dd>
                    <dd>
                      <el-button type="primary" @click="identiyReviewFail(item)">认证失败</el-button>
                    </dd>
                  </dl>

                  <dl class="work_review" v-if="item.status == 1">
                    <dd>
                      <span>认证成功</span>
                    </dd>
                  </dl>

                  <dl class="work_review" v-if="item.status == 2">
                    <dd>
                      <span>认证失败</span>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

  </section>
</template>

<script>
    import {
        getUserInfoList,  // 获取用户列表
        getAddress,  // 获取地址
        getUserInfoById,  // 根据用户id获取用户
        reviewUser,  // 资质认证审核
    } from '../../api/api.js';

    export default {
        name: 'vote',

        data() {
            // 年龄验证
            const validateAge = (rule, value, callback) => {
                let reg = /^[1-9]\d*$/;

                if (!reg.test(value) && value != undefined && value != "") {
                    return callback(new Error('年龄必须为大于0的正整数！'));
                }

                callback();
            };

            // 薪资验证
            const validateSalary = (rule, value, callback) => {
                let reg = /^(-)|([1-9]\d*)((\.\d+)?)$/;

                if (!reg.test(value) && value != undefined && value != "") {
                    return callback(new Error('薪资必须为自然数！'));
                }

                callback();
            };

            return {
                /**
                 * common
                 */
                listLoading: false,  // lodding动画
                dialogVisible: false,  // 关闭提示

                type: 0,  // 认证审核
                isreal: "",  // 判断是否为实名认证
                iscrea: "",  // 判断是否为资质认证

                txt_info: "",  // 提示
                isReview: false,  // 是否进行认证

                /**
                 * 选择城市
                 */
                selectCity: {
                    cityInfo: [], // 格式转换地址
                    selectedOptions: [],  // 选择
                },

                // 分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 50, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                /**
                 * 用户
                 */
                // 用户列表
                user_info: [],  // 存放用户信息列表数据

                /**
                 * 筛选
                 */
                // 筛选数据
                filterData: {
                    nickname: undefined,  // 昵称
                    lowerAge: undefined,  // 年龄下限
                    topAge: undefined,  // 年龄上限
                    lowerSalary: undefined,  // 薪资下限
                    topSalary: undefined,  // 薪资上限
                    province: undefined,  // 省份
                    city: undefined,  // 城市
                    status: undefined,  // 认证状态(0:待认证,1:认证通过,2:认证失败)
                },

                // 筛选数据验证
                filterDataRules: {
                    lowerAge: [
                        { validator: validateAge, trigger: 'blur' },
                        // { validator: validateAge2, trigger: 'blur' }
                    ],
                    topAge: [
                        { validator: validateAge, trigger: 'blur' }
                    ],
                    lowerSalary: [
                        { validator: validateSalary, trigger: 'blur' },
                        // { validator: validateSalary2, trigger: 'blur' }
                    ],
                    topSalary: [
                        { validator: validateSalary, trigger: 'blur' }
                    ],
                },

                /**
                 * 审核用户
                 */
                // 审核用户数据
                reviewUserData: {
                    id: "",  // 用户编号
                    icon: "",  // 头像
                    nickname: "",  // 昵称
                    phone: "",  // 手机
                },

                // 实名认证用户列表
                realReavierInfo: {},

                // 工种认证用户列表
                identiyReviewInfo: [],

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                reviewUserVisible: false,  // 审核用户界面
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
                this.getUserList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getUserList();  // 加载分页数据
            },

            /**
             *  api
             *  获取用户信息
             */
            // 获取用户列表
            getUserList () {
                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                    nickname: this.filterData.nickname,  // 用户昵称
                    lowerAge: this.filterData.lowerAge,  // 年龄下限
                    topAge: this.filterData.topAge,  // 年龄上限
                    lowerSalary: this.filterData.lowerSalary,  // 薪资下限
                    topSalary: this.filterData.topSalary,  // 薪资上限
                    province: this.filterData.province,  // 省份
                    city: this.filterData.city,  // 城市
                    status: this.filterData.status,  // 认证状态
                };

                if (this.filterData.lowerAge > this.filterData.topAge) {
                    this.$message({
                        message: "年龄下限应该小于年龄上限！",
                        type: "warning"
                    });
                } else if (this.filterData.lowerSalary > this.filterData.topSalary) {
                    this.$message({
                        message: "薪资下限应该小于年龄上限！",
                        type: "warning"
                    });
                } else {
                    // 请求接口
                    getUserInfoList(param).then(res => {
                        // console.log(res.data.data.list);

                        let datas = res.data.data.list;

                        let year = (new Date).getFullYear();  // 当前年份
                        // console.log(year)

                        let obj;  // 定义一个初始对象

                        // 遍历data
                        for (let i=0; i<datas.length; i++){
                            // console.log(datas[i]);

                            obj = {};  // 对象初始化

                            obj.status = "--";

                            // 最外层数组
                            obj.id = datas[i].id;  // 用户编号
                            obj.nickname = datas[i].nickname;  // 用户编号
                            obj.phone = datas[i].phone;  // 用户手机号
                            obj.status = datas[i].status;  // 状态

                            // 对象数组中的数组
                            obj.realname = "--";  // 真实姓名
                            obj.salary = "--";  // 薪资
                            obj.addressCity = "--";  // 地区
                            obj.age = "--";  // 年龄

                            // console.log(datas[i]);

                            // 遍历identificationInfos
                            for (let j=0; j<datas[i].identificationInfos.length; j++){
                                // console.log(datas[i].identificationInfos[j]);

                                if (datas[i].identificationInfos[j].type == 0) {
                                    obj.realname = datas[i].identificationInfos[j].realname;
                                }
                            }

                            // careerInfo
                            if (datas[i].careerInfo != null) {
                                obj.salary = datas[i].careerInfo.salary;  // 薪资
                                obj.addressCity = datas[i].careerInfo.addressCity;  // 地区
                            }

                            // bornDate
                            if (datas[i].bornDate != null) {
                                // console.log(datas[i].bornDate[0]);

                                obj.age = year - datas[i].bornDate[0];  // 年龄
                            }

                            this.user_info.push(obj);
                        }

                        // console.log(this.user_info);

                        // 返回分页总数
                        this.page_arg.total = res.data.data.total;
                    }).catch({});
                }
            },
            // 获取地址信息并做格式转换
            getAddress (val) {
                if (val == true && this.selectCity.cityInfo.length == 0){
                    this.selectCity.cityInfo.push({
                        value: undefined,
                        label: '全部'
                    });

                    getAddress().then(res => {
                        // console.log(res.data.data.list);

                        let datas = res.data.data.list;

                        // console.log(datas);

                        for (let i=0; i<datas.length; i++) {
                            // console.log(datas[i].provinceAreas);

                            let provinceAreas = new Array();

                            for (let j=0; j<datas[i].provinceAreas.length; j++){
                                let obj = {};
                                obj.label = datas[i].provinceAreas[j].netName
                                obj.value = datas[i].provinceAreas[j].netName

                                provinceAreas.push(obj);
                            }

                            this.selectCity.cityInfo.push({
                                label: datas[i].netName,
                                value: datas[i].netName,
                                children: provinceAreas,
                            });
                        }
                    }).catch({});
                }
            },
            handleChange(value) {
                // console.log(value);

                this.filterData.province = value[0];
                this.filterData.city = value[1];
            },
            // 筛选
            filterDataSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    // 如果验证成功，请求接口数据
                    if (valid) {
                        this.user_info = [];

                        // 加载分页数据
                        this.getUserList();
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
             * 根据id获取信息
             */
            getUserInfoById (id) {
                let param = {
                    id: id,
                }

                getUserInfoById(param).then(() => {

                }).catch({});
            },

            /**
             * api
             * 审核用户
             */
            // 点击审核
            reviewUser (row) {
                // console.log(Object.assign({}, row))

                let param = {
                    id: Object.assign({}, row).id
                }

                getUserInfoById(param).then(res => {
                    /**
                     * identificationInfos => 遍历数组，分别根据type，形成两组数据
                     * type: 0 => 需要实名认证 => 只有一条数据，返回status状态（0：未认证，1认证成功，2认证失败）
                     * type: 1 => 需要资质认证 => 有多条数据，遍历每条数据，返回每条数据的status状态（0：未认证，1认证成功，2认证失败）
                     */
                    // console.log(res.data.data);

                    let datas = res.data.data;

                    // console.log(datas);

                    // 初始化数组
                    this.realReavierInfo = [];
                    this.identiyReviewInfo = [];

                    // 用户基础信息
                    this.reviewUserData.id = datas.id;  // 用户编号
                    this.reviewUserData.icon = datas.icon;  // 头像
                    this.reviewUserData.nickname = datas.nickname;  // 昵称
                    this.reviewUserData.phone = datas.phone;  // 手机

                    // careerInfo
                    if (datas.careerInfo == null) {
                        this.reviewUserData.addressCity = "";
                        this.reviewUserData.salary = "";
                    } else {
                        this.reviewUserData.addressCity = datas.careerInfo.addressCity;  // 地区
                        this.reviewUserData.salary = datas.careerInfo.salary;  // 薪资
                    }

                    this.reviewUserData.ckName = "";  // 工种名称初始化

                    // 遍历
                    for (let i=0; i<datas.identificationInfos.length; i++){
                        // console.log(datas.identificationInfos[i]);

                        // 实名认证
                        if (datas.identificationInfos[i].type == 0) {
                            // console.log(datas.identificationInfos[i]);

                            this.realReavierInfo = datas.identificationInfos[i];
                        }

                        // 工种认证
                        if (datas.identificationInfos[i].type == 1) {
                            // console.log(datas.identificationInfos[i]);

                            this.identiyReviewInfo.push(datas.identificationInfos[i]);

                            this.reviewUserData.ckName += datas.identificationInfos[i].ckName + "、";
                        }
                    }

                    // 工种名称输出处理
                    this.reviewUserData.ckName = this.reviewUserData.ckName.slice(0, -1);

                    // console.log("用户基本信息", this.reviewUserData);
                    // console.log("实名认证数据列表", this.realReavierInfo);
                    // console.log("工种认证数据列表", this.identiyReviewInfo);
                }).catch({});
            },
            // 实名认证成功
            realReviewPass () {
                let param = {
                    id: this.realReavierInfo.id,
                    status: 1
                }

                reviewUser(param).then(() => {
                    // console.log(res);

                    this.$message.success("认证成功");

                    // this.getUserInfoById(this.reviewUserData.id);
                    this.reviewUserVisible = false;
                }).catch({});
            },
            // 实名认证失败
            realReviewFail () {
                let param = {
                    id: this.realReavierInfo.id,
                    status: 2
                }

                reviewUser(param).then(() => {
                    // console.log(res);

                    this.$message.success("认证失败");

                    // this.getUserInfoById(this.reviewUserData.id);

                    this.reviewUserVisible = false;
                }).catch({});
            },
            // 工种认证成功
            identiyReviewPass (item) {
                // console.log(item);

                let param = {
                    id: item.id,
                    status: 1
                }

                // console.log(param);

                reviewUser(param).then(() => {
                    // console.log(res);

                    this.$message.success("认证成功");

                    // this.getUserInfoById(this.reviewUserData.id);

                    this.reviewUserVisible = false;
                }).catch({});
            },
            // 工种认证失败
            identiyReviewFail (item) {
                let param = {
                    id: item.id,
                    status: 2
                }

                // console.log(param);

                reviewUser(param).then(() => {
                    // console.log(res);

                    this.$message.success("认证失败");

                    // this.getUserInfoById(this.reviewUserData.id);
                    this.reviewUserVisible = false;
                }).catch({});
            }
        },
        // 预处理
        created () {
            this.getUserList();
        }
    }
</script>

<style lang="less" scoped>
  .filter_wrap {
    .intxt {
      margin-bottom: 22px;
    }
  }

  .review_user {
    .part1 {
      margin-bottom: 15px;

      .portrait {
        width: 195px;
        height: 195px;
        background: #FDC;

        img {
          width: 100%;
        }
      }

      .user_info {
        margin-left: 12px;

        .nickname{
          margin-bottom: 48px !important;
        }

        li:not(:last-child){
          margin-bottom: 25px;
        }

        li{
          dd {
            display: inline-block;
          }
        }
      }
    }

    .part2, .part3 {
      width: 100%;
      min-height: 100px;
      border: solid 1px #000;
      border-radius: 6px;
    }

    .part2 {
      margin-bottom: 15px;

      .p2_top {
        width: 90%;
        margin: 10px auto;

        .id_front, .id_back {
          background: #efecec;
          width: 46%;
          height: 200px;
        }

        .id_front img .id_back img{
          width: 100%;
          height: 100%;
        }

        .id_front {

        }

        .id_back {

        }
      }

      .p2_bottom{
        width: 90%;
        margin: 0 auto 10px;

        .p2_bm_realname {
          margin: 10px auto;
          text-align: center;
        }

        .p2_bm_btn {
          text-align: center;

          li:first-child {
            margin-right: 10px;
          }

          li {
            display: inline-block;
          }
        }

      }
    }

    .part3 {
      .p3_wrap{
        width: 90%;
        margin: 18px auto;
        overflow-x: auto;
        overflow-y: hidden;

        .p3_wrap_auto {
          width: 10000px;

          .work:last-child{
            margin-right: 0;
          }

          .work {
            display: inline-block;
            width: 350px;
            height: 278px;
            margin-right: 10px;
            overflow: hidden;

            .work_img {
              width: 260px;
              height: 188px;
              margin: 0 auto;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .work_type {
              margin: 10px auto;
              text-align: center;
            }

            .work_btn {
              text-align: center;

              dd:first-child{
                margin-right: 0.6rem;
              }

              dd {
                display: inline-block;
              }
            }

            .work_review{
              margin-top: 26px;
            }
          }
        }
      }
    }
  }

  .review_status_wrap {


    .review_status {
      text-align: center;
    }
  }
</style>