<template>
  <section class="main_cont">
    <!-- 按钮 -->
    <!--<el-row class="toolbar bdr_radiu f-cb">
      <el-col class="f-fl btn_wrap">
        <el-button type="primary" @click="addSingleRedeemCodeVisible = true">添加单个兑换码</el-button>
      </el-col>
      <el-col class="f-fl btn_wrap">
        <el-button type="primary" @click="addMoreRedeemCodeVisible = true">添加多个兑换码</el-button>
      </el-col>
      <el-col class="f-fl btn_wrap">
        <el-tooltip effect="dark" content="Excel只允许下载一次" placement="top">
          <el-button type="primary" @click="downloadExcel" :disabled="this.downloadExcelData.excelURI===''">下载Excel</el-button>
        </el-tooltip>
      </el-col>
      <el-col class="f-fl btn_wrap del_more">
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0" class="f-fr">批量删除</el-button>
      </el-col>
      <el-col class="tip">
        <p><i class="fa fa-info-circle"></i>生成多条兑换码可生成Excel，且Excel只允许下载一次</p>
      </el-col>
    </el-row>-->

    <!-- 资讯列表 -->
    <el-row>
      <el-table class="consultation_list" :data="consultation_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 240px)">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
        <!--<el-table-column prop="id" label="资讯编号" width="80" align="center"></el-table-column>-->
        <el-table-column prop="title" label="资讯标题" width="350"></el-table-column>
        <!--<el-table-column prop="typeName" label="资讯类目" width="auto" align="center" :formatter="formatType"></el-table-column>-->
        <el-table-column prop="category" label="资讯类目" width="100" align="center"></el-table-column>
        <el-table-column prop="typeName" label="类型" width="80" align="center"></el-table-column>
        <el-table-column prop="readNum" label="浏览量" width="80" align="center"></el-table-column>
        <el-table-column prop="likeNum" label="点赞量" width="80" align="center"></el-table-column>
        <el-table-column prop="forwardNum" label="转发量" width="80" align="center"></el-table-column>
        <el-table-column label="状态" width="80" align="center">
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

    <!-- 编辑资讯 -->
    <el-dialog title="编辑资讯" @keyup.enter.native="editConsultationSubmit('editConsultationForm')" :close-on-click-modal="false" :visible.sync="editConsultationVisible" :before-close="handleClose">
      <el-form :model="editConsultationData" status-icon :rules="editConsultationRules" ref="editConsultationForm" label-width="160px">
        <!--<el-form-item label="兑换码月份(默认一月)" prop="month">
          <el-input v-model="editConsultationData.month"  placeholder="请输入兑换码月份" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="addRedeemCodeData.memo" placeholder="请输入备注" clearable></el-input>
        </el-form-item>-->

        <el-form-item>
          <el-button type="primary" @click="editConsultationSubmit('editConsultationForm')">提交</el-button>
          <el-button @click="resetForm('editConsultationForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
    import {
        getConsultation,  // 获取资讯列表
    } from '../../api/api.js';

    export default {
        name: 'consultation',

        data() {
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
                    page_size: 10, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                /**
                 * 资讯
                 */
                // 资讯列表
                consultation_info: [],  // 存放兑换码信息列表数据

                // 筛选数据
                filterData: {
                    title: "",  // 资讯标题
                    ctId: "",  // 资讯分类id
                    type: "",  // 內容分類(0:文字,1:图文,2:视频,3:投票)
                    originName: ""  // 资讯来源名称
                },

                /**
                 * 编辑资讯
                 */
                // 编辑资讯数据
                editConsultationData: {
                },

                // 验证编辑资讯数据
                editConsultationRules: {
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                editConsultationVisible: false,  // 编辑资讯界面
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
                this.getConsultationList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getConsultationList();  // 加载分页数据
            },

            /**
             *  api
             *  获取资讯信息
             */
            // 获取资讯列表
            getConsultationList () {
                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                };

                // 请求接口
                getConsultation(qs.stringify(param)).then(res => {
                    console.log(res.data.data.list);

                    this.consultation_info = res.data.data.list;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;
                }).catch({});
            },

            /**
             * api
             * 编辑资讯
             */
            // 点击编辑
            editConsultation (row) {
                console.log(Object.assign({}, row));
            },
            // 提交编辑资讯表单
            editConsultationSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        console.log("submit!!")
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /**
             *  api
             *  删除资讯
             */
            delConsultation (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log(Object.assign({}, row));
                }).catch(() => {});
            },
        },
        // 预处理
        created () {
            this.getConsultationList();
        }
    }
</script>

<style lang="less" scoped>

</style>