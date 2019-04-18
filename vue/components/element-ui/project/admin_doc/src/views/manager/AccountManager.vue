<template>
    <section class="main_cont">
        <!-- 按钮 -->
        <el-row class="toolbar bdr_radiu f-cb">
            <el-col class="f-fl btn_wrap">
                <el-button type="primary" @click="addUserVisible = true">添加账号</el-button>
            </el-col>
        </el-row>

        <!-- 用户列表 -->
        <el-row>
            <el-table class="user_list" :data="user_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 240px)">
                <el-table-column type="index" width="60" align="center" label="序号"></el-table-column>
                <el-table-column prop="id" label="用户编号" width="80" align="center"></el-table-column>

                <el-table-column prop="realName" label="真实姓名" width="80" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号" width="auto" align="center"></el-table-column>
                <el-table-column prop="createAt" label="创建日期" width="auto" align="center"></el-table-column>
                <el-table-column prop="updateAt" label="更新日期" width="auto" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="500">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="checkUser(scope.row)">查看</el-button>
                        <el-button type="text" size="small" @click="editUserAttribute(scope.row)" v-on:click="editUserAttributeVisible = true">编辑价格和流量</el-button>
                        <el-button type="text" size="small" @click="editUserAccount(scope.row)" v-on:click="editUserAccountVisible = true">编辑密码</el-button>
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

        <!-- 添加账号 -->
        <el-dialog title="添加账号" @keyup.enter.native="addUserSubmit('editVoteForm')" :close-on-click-modal="false" :visible.sync="addUserVisible" :before-close="handleClose">
            <el-form :model="addUserData" status-icon :rules="addUserRules" ref="addUserForm" label-width="160px">
                <el-form-item label="姓名" prop="realName">
                    <el-input v-model="addUserData.realName"  placeholder="请输入密码" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addUserData.mobile"  placeholder="请输入手机" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="addUserData.password"  placeholder="请输入密码" clearable></el-input>
                </el-form-item>

                <!-- 0-管理员，1-组长，2-客服，3-话务（管理员只能添加组长，组长只能添加L客服和话务）-->
                <el-form-item label="用户类型" prop="type">
                    <el-select v-model="addUserData.type">
                        <el-option label="管理员" value="0"></el-option>
                        <el-option label="组长" value="1"></el-option>
                        <el-option label="客服" value="2"></el-option>
                        <el-option label="话务" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <!-- 组长必填这个字段 -->
                <el-form-item label="单价" prop="price">
                    <el-input v-model="addUserData.price"  placeholder="请输入单价" clearable></el-input>
                </el-form-item>

                <!-- 客服必填这个字段 -->
                <el-form-item label="数量" prop="amount">
                    <el-input v-model="addUserData.amount"  placeholder="请输入数量" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addUserSubmit('addUserForm')">提交</el-button>
                    <el-button @click="resetForm('addUserForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑用户价格和流量 -->
        <el-dialog title="编辑用户价格和流量" @keyup.enter.native="editUserAttributeSubmit('editUserAttributeForm')" :close-on-click-modal="false" :visible.sync="editUserAttributeVisible" :before-close="handleClose">
            <el-form :model="editUserAttributeData" status-icon :rules="editUserAttributeRules" ref="editUserAttributeForm" label-width="160px">
                <el-form-item label="用户编号" prop="userId">
                    <el-input v-model="editUserAttributeData.userId" disabled></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="editUserAttributeData.price"  placeholder="请输入价格" clearable></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="amount">
                    <el-input v-model="editUserAttributeData.amount"  placeholder="请输入数量" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="editUserAttributeSubmit('editUserAttributeForm')">提交</el-button>
                    <el-button @click="resetForm('editUserAttributeForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑用户密码 -->
        <el-dialog title="编辑用户密码" @keyup.enter.native="editUserAccountSubmit('editUserAccountForm')" :close-on-click-modal="false" :visible.sync="editUserAccountVisible" :before-close="handleClose">
            <el-form :model="editUserAccountData" status-icon :rules="editUserAccountRules" ref="editUserAccountForm" label-width="160px">
                <el-form-item label="用户编号" prop="userId">
                    <el-input v-model="editUserAccountData.userId" disabled></el-input>
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
        getUser,  // 获取投票列表
        addUser,  // 添加账号
        checkUser,  // 查看账号
        editUserAttribute,  // 编辑价格和流量
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

            // 单价，组长必填这个字段(type[1])
            const validatePrice = (rule, value, callback) => {
                let reg = /^(-)|([1-9]\d*)((\.\d+)?)$/;

                if (!reg.test(value)) {
                    return callback(new Error('价格必须是整数或者小数且前缀不能为0！'));
                }

                if (this.addUserData.type == 1 && value == "") {
                    callback(new Error("组长必填单价!"));
                } else {
                    callback();
                }
            };

            // 数量，客服必填这个字段(type[2])
            const validateAmount = (rule, value, callback) => {
                let reg = /^\+?[1-9][0-9]*$/;

                if (!reg.test(value)) {
                    return callback(new Error('数量为非0正整数！'));
                }

                if (this.addUserData.type == 2 && value == "") {
                    callback(new Error("客服必填数量!"));
                } else {
                    callback();
                }
            };

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
                 * 用户
                 */
                // 用户列表
                user_info: [],  // 存放用户信息列表数据

                /**
                 * 添加用户
                 */
                // 添加用户数据
                addUserData: {
                    realName: "wsn",  // 姓名
                    mobile: "18254873257",  // 手机
                    password: "11111",  // 密码
                    type: "0",  // 用户类型：0-管理员，1-组长，2-客服，3-话务（管理员只能添加组长，组长只能添加L客服和话务）
                    price: "44",  // 单价，组长必填这个字段
                    amount: "66",  // 数量，客服必填这个字段
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
                    price: [
                        { validator: validatePrice, trigger: "blur" }
                    ],
                    amount: [
                        { validator: validateAmount, trigger: "blur" }
                    ]
                },

                /**
                 * api editUserAttribute
                 * 编辑用户价格和流量
                 */
                // 编辑用户价格和流量数据
                editUserAttributeData: {
                    userId: "",  // 用户id
                    price: "",  // 价格
                    amount: "",  // 数量
                },

                // 验证编辑用户价格和流量数据
                editUserAttributeRules: {
                    price: [
                        { required: true, message: '价格不能为空！', trigger: 'blur' }
                    ],
                    amount: [
                        { required: true, message: '数量不能为空！', trigger: 'blur' }
                    ]
                },

                /**
                 * api
                 * 编辑用户密码
                 */
                // 编辑用户密码数据
                editUserAccountData: {
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
                editUserAttributeVisible: false,  // 编辑用户价格和流量界面
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
             *  api getUser
             *  获取用户信息
             */
            // 获取用户列表
            getUserList () {
                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                };

                // loading
                this.listLoading = true;

                // 请求接口
                getUser(param).then(res => {
                    // console.log(res.data.data.users);

                    if (this.user_info != null) {
                        this.listLoading = false;
                        this.user_info = res.data.data.users;
                    }

                    // 返回分页总数
                    this.page_arg.total = res.data.data.count;
                }).catch({});
            },

            /**
             * api addUser
             * 添加用户
             */
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
                                this.getUserList();
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
                        console.log("查看用户", res.data.data);
                    }
                }).catch({});
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

                        this.getUserList();
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

                        this.getUserList();
                    }
                }).catch({});
            },

            /**
             * api editUserAttribute
             * 编辑用户价格和流量
             */
            // 点击编辑用户价格和流量
            editUserAttribute (row) {
                // 浅拷贝
                // this.editUserAttributeData = Object.assign({}, row);
                this.editUserAttributeData.userId = row.id;  // 用户编号
                this.editUserAttributeData.price = row.price;  // 价格
                this.editUserAttributeData.amount = row.amount;  // 数量
            },
            // 提交编辑用户价格和流量表单
            editUserAttributeSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        editUserAttribute(qs.stringify(this.editUserAttributeData)).then(res => {
                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("编辑用户价格和流量成功！");
                                this.getUserList();
                            }

                            this.editUserAttributeVisible = false;
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
            },
            // 提交编辑用户密码表单
            editUserAccountSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        editUserAccount(qs.stringify(this.editUserAccountData)).then(res => {
                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("编辑用户密码成功！");
                                this.getUserList();
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
                }).then(res => {
                    let params = {
                        userId: row.id,
                    }

                    delUser(qs.stringify(params)).then(res => {
                        if (res.data.code == 1) {
                            this.$message.warning(res.data.msg);
                        }

                        if (res.data.code == 0) {
                            this.$message.success("账号删除成功！");
                            this.getUserList();
                        }
                    }).catch({});
                    // console.log(Object.assign({}, row));
                    console.log("删除", row);
                }).catch(() => {});
            },
        },
        // 预处理
        created () {
            this.getUserList();
        }
    }
</script>

<style lang="less" scoped>

</style>