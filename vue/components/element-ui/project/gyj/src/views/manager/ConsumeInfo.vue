<template>
  <section class="main_cont">
    <!-- 按钮 -->
    <el-row class="toolbar bdr_radiu f-cb">
      <el-col class="f-fl btn_wrap">
        <el-button type="primary" @click="addVoteVisible = true">添加投票</el-button>
      </el-col>
    </el-row>

    <!-- 资讯列表 -->
    <el-row>
      <el-table class="consultation_list" :data="vote_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 240px)">
        <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
        <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
        <el-table-column prop="id" label="资讯编号" width="80" align="center"></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-on:click="editVoteVisible = true" @click="editVote(scope.row)">{{ $t('btn.edit') }}</el-button>
            <el-button type="text" size="small" @click="delVote(scope.row)">{{ $t('btn.del') }}</el-button>
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

    <!-- 新增投票 -->
    <el-dialog title="新增投票" @keyup.enter.native="addVote('editVoteForm')" :close-on-click-modal="false" :visible.sync="addVoteVisible" :before-close="handleClose">
      <el-form :model="addVoteData" status-icon :rules="addVoteRules" ref="editVoteForm" label-width="160px">
        <!--<el-form-item label="兑换码月份(默认一月)" prop="month">
          <el-input v-model="editConsultationData.month"  placeholder="请输入兑换码月份" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="addRedeemCodeData.memo" placeholder="请输入备注" clearable></el-input>
        </el-form-item>-->

        <el-form-item>
          <el-button type="primary" @click="addVoteSubmit('addVoteForm')">提交</el-button>
          <el-button @click="resetForm('addVoteForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑投票 -->
    <el-dialog title="编辑投票" @keyup.enter.native="editVote('editVoteForm')" :close-on-click-modal="false" :visible.sync="editVoteVisible" :before-close="handleClose">
      <el-form :model="editVoteData" status-icon :rules="editVoteRules" ref="editVoteForm" label-width="160px">
        <!--<el-form-item label="兑换码月份(默认一月)" prop="month">
          <el-input v-model="editConsultationData.month"  placeholder="请输入兑换码月份" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="addRedeemCodeData.memo" placeholder="请输入备注" clearable></el-input>
        </el-form-item>-->

        <el-form-item>
          <el-button type="primary" @click="editVoteSubmit('editVoteForm')">提交</el-button>
          <el-button @click="resetForm('editVoteForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
    import {
        getVote,  // 获取投票列表
    } from '../../api/api.js';

    export default {
        name: 'vote',

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
                 * 投票
                 */
                // 投票列表
                vote_info: [],  // 存放兑换码信息列表数据

                /**
                 * 编辑投票
                 */
                // 编辑投票数据
                addVoteData: {
                },

                // 验证编辑投票数据
                addVoteRules: {
                },

                /**
                 * 编辑投票
                 */
                // 编辑投票数据
                editVoteData: {
                },

                // 验证编辑资讯数据
                editVoteRules: {
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addVoteVisible: false,  // 编辑资讯界面
                editVoteVisible: false,  // 编辑资讯界面
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
                // this.getConsultationList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                // this.getConsultationList();  // 加载分页数据
            },

            /**
             *  api
             *  获取投票信息
             */
            // 获取投票列表
            getVoteList () {
                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                };

                // 请求接口
                getVote(this.qs.stringify(param)).then(res => {
                    // console.log(res.data.data.list);

                    this.vote_info = res.data.data.list;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;
                }).catch({});
            },

            /**
             * api
             * 添加投票
             */
            // 提交添加投票表单
            addVoteSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        console.log("submit!!")
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             * api
             * 编辑投票
             */
            // 点击编辑
            editVote (row) {
                console.log(Object.assign({}, row));
            },
            // 提交编辑投票表单
            editVoteSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        console.log("submit!!")
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             *  api
             *  删除投票
             */
            delVote (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log(Object.assign({}, row));
                }).catch(() => {});
            },
        },
        // 预处理
        created () {
            this.getVoteList();
        }
    }
</script>

<style lang="less" scoped>

</style>