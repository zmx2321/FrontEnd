<template>
    <section class="main_cont">
        <!-- 按钮 -->
        <el-row class="toolbar bdr_radiu f-cb">
            <el-col class="f-fl btn_wrap">
                <el-button type="primary" @click="addSingleRedeemCode" v-on:click="addSingleRedeemCodeVisible = true">添加单个兑换码</el-button>
            </el-col>
            <el-col class="f-fl btn_wrap">
                <el-button type="primary" @click="addMoreRedeemCode" v-on:click="addMoreRedeemCodeVisible = true">添加多个兑换码</el-button>
            </el-col>
            <el-col class="f-fl btn_wrap del_more">
                <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0" class="f-fr">批量删除</el-button>
            </el-col>
        </el-row>

        <!-- 兑换码列表 -->
        <el-row>
            <el-table class="redeem_code_list" :data="redeem_code_info" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" height="calc(100vh - 311px)">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" width="60" align="center"></el-table-column>
                <!--<el-table-column prop="id" label="兑换码id" width="80" align="center"></el-table-column>-->
                <el-table-column prop="userMobile" label="用户手机" width="150" align="center"></el-table-column>
                <el-table-column prop="code" label="兑换码" width="300" align="center"></el-table-column>
                <el-table-column prop="createAt" label="创建时间" width="110" align="center"></el-table-column>
                <el-table-column prop="usedAt" label="使用时间" width="110" align="center"></el-table-column>

                <el-table-column label="状态" width="95" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.isUsed === 1 ? "已使用" : "未使用" }}
                    </template>
                </el-table-column>

                <el-table-column prop="memo" label="备注" width="auto"></el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="delRedeemCode(scope.row)">删除</el-button>
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

        <!-- 添加单条兑换码 -->
        <el-dialog title="添加单条兑换码" @keyup.enter.native="addSingleRedeemCodeSubmit('addSingleRedeemCodeForm')" :close-on-click-modal="false" :visible.sync="addSingleRedeemCodeVisible" :before-close="handleClose">
            <el-form :model="addRedeemCodeData" status-icon :rules="addMoreRedeemCodeRule" ref="addSingleRedeemCodeForm" label-width="160px">
                <el-form-item label="兑换码月份(默认一月)" prop="month">
                    <el-input v-model="addRedeemCodeData.month"  placeholder="请输入兑换码月份" clearable></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                    <el-input v-model="addRedeemCodeData.memo" placeholder="请输入备注" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addSingleRedeemCodeSubmit('addSingleRedeemCodeForm')">提交</el-button>
                    <el-button @click="resetForm('addSingleRedeemCodeForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 添加多条兑换码 -->
        <el-dialog title="添加多条兑换码" @keyup.enter.native="addMoreRedeemCodeSubmit('addMoreRedeemCodeForm')" :close-on-click-modal="false" :visible.sync="addMoreRedeemCodeVisible" :before-close="handleClose">
            <el-form :model="addRedeemCodeData" status-icon :rules="addMoreRedeemCodeRule" ref="addMoreRedeemCodeForm" label-width="160px">
                <el-form-item label="兑换码月份(默认一月)" prop="month">
                    <el-input v-model="addRedeemCodeData.month"  placeholder="请输入兑换码月份" clearable></el-input>
                </el-form-item>
                <el-form-item label="生成数量" prop="number">
                    <el-input v-model="addRedeemCodeData.number" placeholder="请输入生成兑换码数量" clearable></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                    <el-input v-model="addRedeemCodeData.memo" placeholder="请输入备份" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addMoreRedeemCodeSortSubmit('addMoreRedeemCodeForm')">提交</el-button>
                    <el-button @click="resetForm('updateProjectSortForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        findRedeemCodeList,  // 获取兑换码列表
        addSingleRedeemCode,  // 添加一条兑换码
        addMoreRedeemCode,  // 添加多条兑换码
        removeRedeemCode  // 删除兑换码
    } from '../../api/api.js';

    import axios from '../../api/axios'

    export default {
        name: 'redeem_code',

        data() {
            // 兑换码月份验证
            let validateMonth = (rule, value, callback) => {
                let reg = /^(0?[1-9]|1[0-2])$/;

                if (!reg.test(value)) {
                    return callback(new Error('月份在1-12之间！'));
                }

                callback();
            };

            // 数字验证
            let validateNumber = (rule, value, callback) => {
                let reg = /^[1-9]\d?$/;

                if (!reg.test(value)) {
                    return callback(new Error('数量必须为2位数的非零正整数！'));
                }

                callback();
            };

            return {
                /**
                 * common
                 */
                listLoading: false,  // lodding动画
                dialogVisible: false,  // 关闭提示
                sels: [],  //列表选中列

                // 分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 10, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                /**
                 * 兑换码列表
                 */
                redeem_code_info: [],  // 存放兑换码信息列表数据

                /**
                 * 添加兑换码
                 */
                // 添加兑换码数据
                addRedeemCodeData: {
                    month: 1,  // 兑换码月份（默认一月）
                    number: "",  // 生成数量
                    memo: ""  //备注
                },

                // 验证添加单条兑换码数据
                addSingleRedeemCodeRule: {
                    month: [
                        { validator: validateMonth, trigger: 'blur' },
                    ],
                },

                // 验证添加多条兑换码数据
                addMoreRedeemCodeRule: {
                    month: [
                        { required: true, message: '生成兑换码月份不能为空！', trigger: 'blur' },
                        { validator: validateMonth, trigger: 'blur' }
                    ],
                    number: [
                        { required: true, message: '生成兑换码数量不能为空！', trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' }
                    ],
                },

                /**
                 *  弹出表单界面
                 */
                addSingleRedeemCodeVisible: false,  //  显示隐藏添加单条兑换码界面
                addMoreRedeemCodeVisible: false,  // 显示隐藏添加多条兑换码界面
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
            // 列表是否选中
            selsChange (sels) {
                this.sels = sels;
                // console.log(sels);
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getRedeemCodeList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getRedeemCodeList();  // 加载分页数据
            },

            /**
             *  api
             *  获取兑换码信息
             */
            // 获取兑换码列表
            getRedeemCodeList () {
                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                };

                // 请求接口
                findRedeemCodeList(qs.stringify(param)).then(res => {
                    // console.log(res.data.data);

                    this.redeem_code_info = res.data.data.list;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;
                }).catch({});
            },

            /**
             *  api
             *  添加单条兑换码
             */
            addSingleRedeemCode () {
                console.log("添加单个兑换码");
            },
            // 点击添加单条兑换码
            addSingleRedeemCodeSubmit (formName) {
                //验证表单
                this.$refs[formName].validate((valid) => {
                    // 如果验证成功，请求接口数据
                    if (valid) {
                        // 参数
                        let params = {
                            month: this.addRedeemCodeData.month,
                            memo: this.addRedeemCodeData.memo
                        };

                        // 请求添加单条兑换码接口
                        addSingleRedeemCode(qs.stringify(params)).then(() => {
                            // 结束加载loading
                            this.listLoading = false;

                            // 隐藏添加单条兑换码
                            this.addSingleRedeemCodeVisible = false;

                            this.$message({
                                message: "添加成功！",
                                type: "success"
                            });

                            // 加载分页数据
                            this.getRedeemCodeList();

                            // data数据初始化
                            this.addRedeemCodeData.month = 1;
                            this.addRedeemCodeData.memo = "";
                        }).catch({});
                    } else {  // 验证失败跳出
                        console.log('error submit!!');
                    }
                });
            },

            /**
             *  api
             *  添加多条兑换码
             */
            // 点击添加多条兑换码
            addMoreRedeemCode () {
                // console.log("添加多条兑换码");
            },
            // 提交添加多条兑换码表单
            addMoreRedeemCodeSortSubmit (formName) {
                this.listLoading = true;  //点击提交开始加载loading

                //验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        // 请求添加单条兑换码接口
                        addMoreRedeemCode(qs.stringify(this.addRedeemCodeData)).then(() => {
                            // 结束加载loading
                            this.listLoading = false;

                            //隐藏添加多条兑换码表单界面
                            this.addMoreRedeemCodeVisible = false;

                            this.$message({
                                message: "添加成功！",
                                type: "success"
                            });

                            // 加载分页数据
                            this.getRedeemCodeList();

                            // data数据初始化
                            this.addRedeemCodeData.month = 1;
                            this.addRedeemCodeData.memo = "";
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                    }
                });
            },

            /**
             *  api
             *  删除兑换码
             */
            // 单个兑换码删除
            delRedeemCode (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let id = Object.assign({}, row).id;

                    let params = {
                        ids: id
                    }

                    removeRedeemCode(params).then(res => {
                        console.log(res);

                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });

                        this.getRedeemCodeList();  // 加载分页数据
                    }).catch({});
                }).catch(() => {});
            },

            // 批量删除兑换码
            batchRemove: function () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let params = [], url_arg;

                    for (let i=0; i<this.sels.length; i++){
                        params.push(this.sels[i].id);
                    }

                    url_arg = "?ids=" + params.join('&ids=');

                    axios.get("http://10.10.10.238:8089/admin/redeemcode/delete" + url_arg).then(res => {
                        // console.log(res);

                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });

                        this.getRedeemCodeList();  // 加载分页数据
                    }).catch({});
                }).catch(() => {});;
            }
        },
        // 预处理
        created () {
            this.getRedeemCodeList();
        }
    }
</script>

<style scoped>
    .btn_wrap{
        width: 150px;
    }

    .del_more{
        width: 98px;
    }
</style>