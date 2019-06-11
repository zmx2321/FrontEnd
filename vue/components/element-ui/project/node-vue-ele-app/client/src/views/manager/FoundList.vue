<template>
    <section class="main_cont">
        <el-row class="toolbar bdr_radiu f-cb">
            <el-col class="f-cb btn_wrap">
                <el-button type="primary" @click="addProfiles" v-on:click="addProfilesVisible = true" class="f-fl">添加</el-button>
            </el-col>
        </el-row>

        <!-- 资金列表 -->
        <el-row>
            <el-table v-if="profilesInfo.length > 0" :data='profilesInfo' max-height="450" border :default-sort = "{prop: 'date', order: 'descending'}" v-loading="listLoading" height="calc(100vh - 120)">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <!--<el-table-column prop="id" label="id" width="100"></el-table-column>-->
                <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>

                <el-table-column prop="date" label="创建时间" width="250" align="center" sortable>
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="type" label="收支类型" width="150" align="center"></el-table-column>

                <el-table-column prop="describe" label="收支描述" width="180" align="center"></el-table-column>

                <el-table-column prop="income" label="收入" width="170" align="center">
                    <template slot-scope="scope">
                        <span style="color:#00d053">+ {{ scope.row.income }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="expend" label="支出" width="170" align="center">
                    <template slot-scope="scope">
                        <span style="color:#f56767">- {{ scope.row.expend }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="cash" label="账户现金" width="170" align="center">
                    <template slot-scope="scope">
                        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="remark" label="备注" width="220" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="180">
                    <template slot-scope='scope'>
                        <el-button type="warning" icon='edit' size="small" v-on:click="editProfilesVisible = true" @click='onEditMoney(scope.row)'>编辑</el-button>
                        <el-button type="danger" icon='delete' size="small" @click='onDeleteMoney(scope.row)'>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 底部工具条 -->
            <!--<el-col :span="24" class="toolbar bottip">-->
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <!--</el-col>-->
        </el-row>

        <!-- 添加 -->
        <el-dialog title="添加" @keyup.enter.native="addProfilesSubmit('addProfilesForm')" :close-on-click-modal="false" :visible.sync="addProfilesVisible" :before-close="handleClose">
            <el-form :model="addProfilesData" status-icon :rules="addProfilesRules" ref="addProfilesForm" label-width="160px">
                <el-form-item label="收支类型:" >
                    <el-select v-model="addProfilesData.type" placeholder="收支类型">
                        <el-option
                                v-for="(formtype, index) in format_type_list"
                                :key="index"
                                :label="formtype" :value="formtype"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop='describe' label="收支描述:">
                    <el-input type="describe" v-model="addProfilesData.describe"></el-input>
                </el-form-item>

                <el-form-item prop='income'  label="收入:">
                    <el-input type="income" v-model="addProfilesData.income"></el-input>
                </el-form-item>

                <el-form-item prop='expend' label="支出:">
                    <el-input type="expend" v-model="addProfilesData.expend"></el-input>
                </el-form-item>

                <el-form-item prop='cash' label="账户现金:">
                    <el-input type="cash" v-model="addProfilesData.cash"></el-input>
                </el-form-item>

                <el-form-item label="备注:">
                    <el-input type="textarea" v-model="addProfilesData.remark"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addProfilesSubmit('addProfilesForm')">提交</el-button>
                    <el-button @click="resetForm('addProfilesForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog title="编辑" @keyup.enter.native="editProfilesSubmit('addProfilesForm')" :close-on-click-modal="false" :visible.sync="editProfilesVisible" :before-close="handleClose">
            <el-form :model="editProfilesData" status-icon :rules="editProfilesRules" ref="editProfilesForm" label-width="160px">
                <el-form-item label="收支类型:" >
                    <el-select v-model="editProfilesData.type" placeholder="收支类型">
                        <el-option
                                v-for="(formtype, index) in format_type_list"
                                :key="index"
                                :label="formtype" :value="formtype"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop='describe' label="收支描述:">
                    <el-input type="describe" v-model="editProfilesData.describe"></el-input>
                </el-form-item>

                <el-form-item prop='income'  label="收入:">
                    <el-input type="income" v-model="editProfilesData.income"></el-input>
                </el-form-item>

                <el-form-item prop='expend' label="支出:">
                    <el-input type="expend" v-model="editProfilesData.expend"></el-input>
                </el-form-item>

                <el-form-item prop='cash' label="账户现金:">
                    <el-input type="cash" v-model="editProfilesData.cash"></el-input>
                </el-form-item>

                <el-form-item label="备注:">
                    <el-input type="textarea" v-model="editProfilesData.remark"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="editProfilesSubmit('editProfilesForm')">提交</el-button>
                    <el-button @click="resetForm('editProfilesForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        getProfile,  // 资金管理列表
        addProfile,  // 添加
        editProfile,  // 编辑
        delProfile,  // 删除
    } from "../../api/api"

    export default {
        name: "FoundList",

        data() {
            return {
                /**
                 * common
                 */
                listLoading: false,  // lodding动画
                dialogVisible: false,  // 关闭提示

                /**
                 * 添加
                 */
                format_type_list: [
                    "提现",
                    "提现手续费",
                    "充值",
                    "优惠券",
                    "充值礼券",
                    "转账"
                ],

                // 添加数据
                addProfilesData: {
                    type: "",  // 收支类型
                    describe: "",  // 收支描述
                    income: "",  // 收入
                    expend: "",  // 支出
                    cash: "",  // 账户现金
                    remark: "",  // 备注
                },

                // 验证添加数据
                addProfilesRules: {
                    describe: [
                        { required: true, message: "收支描述不能为空！", trigger: "blur" }
                    ],
                    income: [
                        { required: true, message: "收入不能为空！", trigger: "blur" }
                    ],
                    expend: [
                        { required: true, message: "支出不能为空！", trigger: "blur" }
                    ],
                    cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
                },

                // 编辑数据
                editProfilesData: {
                    id: "",
                    type: "",  // 收支类型
                    describe: "",  // 收支描述
                    income: "",  // 收入
                    expend: "",  // 支出
                    cash: "",  // 账户现金
                    remark: "",  // 备注
                },

                // 验证编辑数据
                editProfilesRules: {
                    describe: [
                        { required: true, message: "收支描述不能为空！", trigger: "blur" }
                    ],
                    income: [
                        { required: true, message: "收入不能为空！", trigger: "blur" }
                    ],
                    expend: [
                        { required: true, message: "支出不能为空！", trigger: "blur" }
                    ],
                    cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
                },

                // 资金列表数据
                profilesInfo: [],

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addProfilesVisible: false,  // 添加界面
                editProfilesVisible: false,  // 编辑界面
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
             * api getProfile
             * 列表
             */
            getProfile() {
                this.listLoading = true;

                // 获取表格数据
                getProfile().then(res => {
                    // console.log(res)

                    this.profilesInfo = res.data;

                    this.listLoading = false;
                });
            },

            /**
             * api addProfiles
             * 添加
             */
            // 点击添加
            addProfiles () {

            },
            // 提交添加表单
            addProfilesSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        this.listLoading = true;

                        // 添加
                        addProfile(qs.stringify(this.addProfilesData)).then(res => {
                            if (res.status != 200) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.status == 200) {
                                this.$message.success("添加成功！");
                                this.getProfile();
                            }

                            this.addProfilesVisible = false;
                            this.getProfile();
                            this.listLoading = false;
                        }).catch({});
                    } else {  //验证失败跳出
                        this.$message.error("表单填写错误");
                    }
                });
            },

            /**
             * api editProfile
             * 编辑
             */
            // 点击编辑
            onEditMoney (row) {
                this.editProfilesData = Object.assign({}, row);
                this.editProfilesData.id = row._id;

                // console.log(this.editProfilesData);
            },
            // 提交编辑表单
            editProfilesSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        this.listLoading = true;

                        // 编辑
                        // editProfile(qs.stringify(this.editProfilesData)).then(res => {
                        this.axios.post("/api/profiles/edit/"+this.editProfilesData.id, this.editProfilesData).then(res => {
                            // console.log(res);

                            if (res.status != 200) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.status == 200) {
                                this.$message.success("编辑成功！");
                                this.getProfile();
                            }

                            this.editProfilesVisible = false;
                            this.getProfile();
                            this.listLoading = false;
                        }).catch({});
                    } else {  //验证失败跳出
                        this.$message.error("表单填写错误");
                    }
                });
            },

            /**
             * api delProfile
             * 删除
             */
            onDeleteMoney(row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    /*this.listLoading = true;

                    let params = {
                        id: row._id
                    }*/

                    // delProfile(params).then(res => {
                    this.axios.delete("/api/profiles/delete/"+row._id).then(res => {
                        if (res.status != 200) {
                            this.$message.warning(res.data.msg);
                        }

                        if (res.status == 200) {
                            this.$message.success("删除成功！");
                            this.getProfile();
                        }

                        this.getProfile();
                        this.listLoading = false;
                    }).catch({});
                }).catch(() => {});
            }
        },
        created () {
            this.getProfile();
        }
    }
</script>

<style scoped>
    .fillcontain {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }

    .btnRight {
        float: right;
    }

    .pagination {
        text-align: right;
        margin-top: 10px;
    }

    .intxt{
        display: inline-block;
        margin-right: 16px;
        margin-bottom: 22px;
        width: 345px;
    }
</style>