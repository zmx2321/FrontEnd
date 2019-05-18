<template>
    <section class="main_cont">
        <!-- 按钮 -->
        <el-row class="toolbar bdr_radiu f-cb">
            <el-col class="f-cb btn_wrap">
                <el-button type="primary" @click="addUser" v-on:click="addUserVisible = true" class="f-fl">添加账号</el-button>
            </el-col>
        </el-row>

        <!-- 用户列表 -->
        <el-row>
            <el-table class="user_list" :data="user_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 218px)">
                <el-table-column type="index" width="60" align="center"></el-table-column>
                <!--<el-table-column prop="id" label="用户编号" width="80" align="center"></el-table-column>-->

                <el-table-column prop="realName" label="姓名" width="auto" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号" width="auto" align="center"></el-table-column>
                <!--<el-table-column prop="parentName" label="上级姓名" width="auto" align="center"></el-table-column>-->
                <!--<el-table-column prop="parentMobile" label="上级手机号" width="auto" align="center"></el-table-column>-->
                <el-table-column prop="type" label="类型" width="auto" align="center" :formatter="formatType"></el-table-column>

                <el-table-column prop="cpaWeight" label="CPA 权值" width="auto" align="center"></el-table-column>
                <el-table-column prop="cpsWeight" label="CPS 权值" width="auto" align="center"></el-table-column>

                <el-table-column prop="crtattim" label="创建日期" width="auto" align="center"></el-table-column>

                <!--<el-table-column label="是否被禁用" width="auto" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.disable === 0 ? "未被禁用" : "被禁用" }}
                    </template>
                </el-table-column>-->

                <el-table-column fixed="right" label="操作" width="320">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editUser(scope.row)" v-on:click="editUserVisible = true">修改权值和备注</el-button>
                        <!--<el-button type="text" size="small" @click="editUserAccount(scope.row)" v-on:click="editUserAccountVisible = true">编辑密码</el-button>-->
                        <el-button type="text" size="small" @click="turnOn(scope.row)" v-show="scope.row.disable == 1">启用账号</el-button>
                        <el-button type="text" size="small" @click="turnOff(scope.row)" v-show="scope.row.disable == 0">禁用账号</el-button>
                        <el-button type="text" size="small" @click="delUser(scope.row)">删除</el-button>
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

        <!-- 查看用户 -->
        <el-dialog title="查看用户" :close-on-click-modal="true" :visible.sync="checkUserVisible">
            <!--<el-table :data="currentUser">
                <el-table-column property="id" label="用户编号" width="150"></el-table-column>
            </el-table>-->
            <ul class="check_user_wrap">
                <li>
                    <dl>
                        <dd>用户编号：</dd>
                        <dd>{{ currentUser.id }}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dd>真实姓名：</dd>
                        <dd>{{ currentUser.realName }}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dd>用户手机：</dd>
                        <dd>{{ currentUser.mobile }}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dd>用户类型：</dd>
                        <dd>{{ currentUser.typeName }}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dd>创建时间：</dd>
                        <dd>{{ currentUser.createAt }}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dd>修改时间：</dd>
                        <dd>{{ currentUser.updateAt }}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dd>CPA 权值：</dd>
                        <dd>{{ currentUser.cpaWeight }}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dd>CPS  权值：</dd>
                        <dd>{{ currentUser.cpsWeight }}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dd>备注：</dd>
                        <dd>{{ currentUser.memo }}</dd>
                    </dl>
                </li>
            </ul>
        </el-dialog>

        <!-- 添加账号 -->
        <el-dialog title="添加账号" @keyup.enter.native="addUserSubmit('addUserForm')" :close-on-click-modal="false" :visible.sync="addUserVisible" :before-close="handleClose">
            <el-form :model="addUserData" status-icon :rules="addUserRules" ref="addUserForm" label-width="160px">
                <el-form-item label="姓名" prop="realName">
                    <el-input v-model="addUserData.realName"  placeholder="请输入姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addUserData.mobile"  placeholder="请输入手机" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addUserData.password"  placeholder="请输入密码" clearable></el-input>
                </el-form-item>

                <!--用户类型：0-管理员，2-渠道（管理员能添加渠道账号，渠道不能添加账号,做成下拉选择的）-->
                <el-form-item label="用户类型" prop="type">
                    <el-select v-model="addUserData.type">
                        <el-option label="管理员" value="0" v-if="userType == -1"></el-option>
                        <el-option label="渠道" value="2" v-if="userType == 0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="CPA 权值" prop="cpaWeight">
                    <el-input v-model="addUserData.cpaWeight"  placeholder="请输入CPA 权值" clearable></el-input>
                </el-form-item>
                <el-form-item label="CPS 权值" prop="cpsWeight">
                    <el-input v-model="addUserData.cpsWeight"  placeholder="请输入CPS 权值" clearable></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                    <el-input type="textarea" v-model="addUserData.memo"  placeholder="请输入备注" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addUserSubmit('addUserForm')">提交</el-button>
                    <el-button @click="resetForm('addUserForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 修改权值和备注 -->
        <el-dialog title="修改权值和备注" @keyup.enter.native="editUserSubmit('editUserForm')" :close-on-click-modal="false" :visible.sync="editUserVisible" :before-close="handleClose">
            <el-form :model="editUserData" status-icon :rules="editUserRules" ref="editUserForm" label-width="160px">
                <!--<el-form-item label="用户编号" prop="userId">
                    <el-input v-model="editUserAttributeData.userId" disabled></el-input>
                </el-form-item>-->
                <el-form-item label="CPA 权值" prop="cpaWeight">
                    <el-input v-model="editUserData.cpaWeight" placeholder="请输入CPA 权值" clearable></el-input>
                </el-form-item>
                <el-form-item label="CPS 权值" prop="cpsWeight">
                    <el-input v-model="editUserData.cpsWeight" placeholder="请输入CPS 权值" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="editUserSubmit('editUserForm')">提交</el-button>
                    <el-button @click="resetForm('editUserForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑用户密码 -->
        <el-dialog title="编辑用户密码" @keyup.enter.native="editUserAccountSubmit('editUserAccountForm')" :close-on-click-modal="false" :visible.sync="editUserAccountVisible" :before-close="handleClose">
            <el-form :model="editUserAccountData" status-icon :rules="editUserAccountRules" ref="editUserAccountForm" label-width="160px">
                <!--<el-form-item label="用户编号" prop="userId">
                    <el-input v-model="editUserAccountData.userId" disabled></el-input>
                </el-form-item>-->
                <el-form-item label="姓名" prop="realName">
                    <el-input v-model="editUserAccountData.realName" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="editUserAccountData.password" placeholder="请输入密码" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="editUserAccountSubmit('editUserAccountForm')">提交</el-button>
                    <el-button @click="resetForm('editUserAccountForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        getAccount,  // 获取账号列表
        addUser,  // 添加账号
        checkUser,  // 查看账号
        editUser,  // 修改权值和备注
        editUserAccount,  // 编辑密码
        turnOn,  // 启用账号
        turnOff,  // 禁用账号
        delUser,  // 删除账号
    } from '../../api/api.js';

    export default {
        name: 'account_manager',

        data() {
            // 手机号
            const validatePhone = (rule, value, callback) => {
                let reg = /^(-)|([1-9]\d*)((\.\d+)?)$/;

                if (!reg.test(value)) {
                    return callback(new Error('手机号错误！'));
                }

                callback();
            };

            // 数字为正整数
            const validateNum = (rule, value, callback) => {
                if (!Number.isInteger(parseInt(value))) {
                    return callback(new Error('必须为整数'));
                }

                callback();
            };

            return {
                /**
                 * common
                 */
                listLoading: false,  // lodding动画
                dialogVisible: false,  // 关闭提示

                isWorkTime: false,  // 是否为工作时间

                // 分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 20, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                /**
                 * 用户
                 */
                // 用户列表
                user_info: [],  // 存放用户信息列表数据

                // 用户类型
                userType: 0,

                currentUser: {},

                /**
                 * 添加用户
                 */
                // 添加用户数据
                addUserData: {
                    realName: "",  // 姓名
                    mobile: "",  // 手机
                    password: "",  // 密码
                    type: "",  // 0-管理员，2-渠道
                    cpaWeight: 50,  // CPA 权值，整数类型，默认50
                    cpsWeight: 50,  // CPS 权值，整数类型，默认50
                    memo: "",  // 备注
                },

                // 验证添加用户数据
                addUserRules: {
                    realName: [
                        { required: true, message: '姓名不能为空！', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '手机不能为空！', trigger: 'blur' },
                        { validator: validatePhone, trigger: "blur" }
                    ],
                    password: [
                        { required: true, message: '密码不能为空！', trigger: 'blur' }
                    ],
                    cpaWeight: [
                        { required: true, message: 'CPA不能为空！', trigger: 'blur' },
                        { validator: validateNum, trigger: "blur" }
                    ],
                    cpsWeight: [
                        { required: true, message: 'CPS不能为空！', trigger: 'blur' },
                        { validator: validateNum, trigger: "blur" }
                    ]
                },

                /**
                 * api editUser
                 * 修改权值和备注
                 */
                // 修改权值和备注数据
                editUserData: {
                    userId: "",  // 用户id
                    cpaWeight: "50",  // CPA 权值，整数类型，默认50
                    cpsWeight: "50",  // CPS 权值，整数类型，默认50
                },

                // 验证修改权值和备注数据
                editUserRules: {
                    cpaWeight: [
                        { required: true, message: 'CPA 权值不能为空！', trigger: 'blur' },
                        { validator: validateNum, trigger: "blur" }
                    ],
                    cpsWeight: [
                        { required: true, message: 'CPS 权值不能为空！', trigger: 'blur' },
                        { validator: validateNum, trigger: "blur" }
                    ]
                },

                /**
                 * api
                 * 编辑用户密码
                 */
                // 编辑用户密码数据
                editUserAccountData: {
                    realName: "",  // 姓名
                    userId: "",  // 用户编号
                    password: "",  // 密码
                },

                // 验证编辑用户密码数据
                editUserAccountRules: {
                    password: [
                        { required: true, message: '密码不能为空！', trigger: 'blur' }
                    ]
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addUserVisible: false,  // 添加用户界面
                checkUserVisible: false,  // 查看用户界面
                editUserVisible: false,  // 修改权值和备注界面
                editUserAccountVisible: false,  // 编辑用户密码界面
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
            // 时间戳
            formatDate (now) {
                let hour = now.getHours();
                let minute = now.getMinutes();
                let second = now.getSeconds();
                minute=="0"?minute="00":minute;
                second=="0"?second="00":second;

                return `${hour}:${minute}:${second}`;
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getAccountList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getAccountList();  // 加载分页数据
            },

            /**
             * el-upload common
             */
            // 文件上传之前
            beforeUpload (file) {
                this.upload_arg.file = [];
            },
            // 文件超出个数限制时的钩子
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 ${this.upload_arg.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            // 删除文件之前的钩子
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },

            /**
             *  api getAccount
             *  获取用户账号信息
             */
            // 获取用户账号列表
            getAccountList () {
                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                };

                // loading
                this.listLoading = true;

                // 请求接口
                getAccount(param).then(res => {
                    // console.log(res.data.data.set[0].createAt);

                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        let datas = res.data.data.set;

                        for (let i=0; i<datas.length; i++) {
                            datas[i].crtattim = datas[i].createAt.slice(2, -3);
                        }

                        // console.log(datas);
                        this.user_info = datas;

                        // 返回分页总数
                        this.page_arg.total = res.data.data.pager.total;
                    }

                    this.listLoading = false;
                }).catch({});
            },
            // 用户状态类型
            formatType (row) {
                switch (row.type) {
                    case 0:
                        return "管理员";
                        break;
                    case 1:
                        return "";
                        break;
                    case 2:
                        return "渠道";
                        break;
                }
            },

            /**
             * api addUser
             * 添加用户
             */
            // 点击添加用户
            addUser () {
                this.addUserData.type = "2";
            },
            // 提交添加用户表单
            addUserSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        // 添加
                        addUser(qs.stringify(this.addUserData)).then(res => {
                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("账号添加成功！");
                                this.getAccountList();
                            }

                            this.addUserVisible = false;
                        }).catch({});
                    } else {  //验证失败跳出
                        this.$message.error("表单填写错误");
                    }
                });
            },

            /**
             * api checkUser
             * 查看用户
             */
            checkUser (row) {
                let params = {
                    userId: row.id,
                }

                checkUser(params).then(res => {
                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        // console.log("查看用户", res.data.data);

                        this.currentUser = res.data.data;

                        this.changeUserType();  // 用户类型转换
                    }
                }).catch({});
            },
            // 用户类型转换
            changeUserType () {
                // 0-管理员，1-组长，2-客服，3-话务
                switch (this.currentUser.type) {
                    case 0:
                        this.currentUser.typeName = "管理员";
                        break;
                    case 1:
                        this.currentUser.typeName = "组长";
                        break;
                }
            },

            /**
             * api 启用/禁用账号
             * turnOn,  // 启用账号
             * turnOff,  // 禁用账号
             */
            // 启用账号
            turnOn (row) {
                let params = {
                    userId: row.id,
                }

                turnOn(qs.stringify(params)).then(res => {
                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        this.$message.success("账号启用成功");

                        this.getAccountList();
                    }
                }).catch({});
            },
            // 启用账号
            turnOff (row) {
                let params = {
                    userId: row.id,
                }

                turnOff(qs.stringify(params)).then(res => {
                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        this.$message.success("账号禁用成功");

                        this.getAccountList();
                    }
                }).catch({});
            },

            /**
             * api editUser
             * 修改权值和备注
             */
            // 点击修改权值和备注
            editUser (row) {
                this.editUserData.userId = row.id;

                // console.log(this.editUserData.userId);
            },
            // 提交修改权值和备注表单
            editUserSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        let params = {
                            userId: this.editUserData.userId,
                            cpaWeight: this.editUserData.cpaWeight,
                            cpsWeight: this.editUserData.cpsWeight,
                        }

                        editUser(qs.stringify(params)).then(res => {
                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("修改权值和备注成功！");
                                this.getAccountList();
                            }

                            this.editUserVisible = false;
                        }).catch({});
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             * api editUserAccount
             * 编辑用户密码
             */
            // 点击编辑用户密码
            editUserAccount (row) {
                this.editUserAccountData.userId = row.id;  // 用户编号
                this.editUserAttributeData.realName = row.realName;  // 姓名
            },
            // 提交编辑用户密码表单
            editUserAccountSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        let params = {
                            userId: this.editUserAccountData.userId,
                            password: this.editUserAccountData.password,
                        }

                        editUserAccount(qs.stringify(params)).then(res => {
                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("编辑用户密码成功！");
                                this.getAccountList();
                            }

                            this.editUserAccountVisible = false;
                        }).catch({});
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },

            /**
             *  api
             *  删除用户
             */
            delUser (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let params = {
                        userId: row.id,
                    }

                    delUser(qs.stringify(params)).then(res => {
                        if (res.data.code == 1) {
                            this.$message.warning(res.data.msg);
                        }

                        if (res.data.code == 0) {
                            this.$message.success("账号删除成功！");
                            this.getAccountList();
                        }
                    }).catch({});
                }).catch(() => {});
            },
        },
        // 预处理
        created () {
            this.getAccountList();

            this.userType = localStorage.userType;
        }
    }
</script>

<style lang="less" scoped>
    .check_user_wrap {
        li:last-child {
            margin-bottom: 0;
        }

        li {
            margin-bottom: 15px;

            dd {
                display: inline-block;
            }
        }
    }
</style>