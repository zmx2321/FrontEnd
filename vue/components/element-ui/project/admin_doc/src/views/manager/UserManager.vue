<template>
    <section class="main_cont">
        <!-- 用户列表 -->
        <el-row>
            <el-table class="user_list" :data="user_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 70px)">
                <el-table-column type="index" width="60" align="center" label="序号"></el-table-column>
                <el-table-column prop="id" label="用户编号" width="80" align="center"></el-table-column>

                <!--area: "北京市东城区"
                contact: "秋"
                contactTelephone: "15422337865"
                createAt: "2019-04-18 22:18:44"
                id: 44
                identity: "362524199602184519"
                mobile: "15658069443"
                realName: "秋白"
                updateAt: "2019-04-18 22:18:44"
                zhimafen: 652-->

                <el-table-column prop="realName" label="真实姓名" width="auto" align="center"></el-table-column>
                <el-table-column prop="identity" label="身份证" width="auto" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号码" width="auto" align="center"></el-table-column>
                <el-table-column prop="area" label="地址" width="auto" align="center"></el-table-column>
                <el-table-column prop="createAt" label="创建时间" width="auto" align="center"></el-table-column>
                <el-table-column prop="createAt" label="编辑时间" width="auto" align="center"></el-table-column>
            </el-table>
        </el-row>
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
            return {
                /**
                 * common
                 */
                listLoading: false,  // lodding动画
                dialogVisible: false,  // 关闭提示

                /**
                 * 用户
                 */
                // 用户列表
                user_info: [],  // 存放用户信息列表数据
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
             *  api getUser
             *  获取用户信息
             */
            // 获取用户列表
            getUserList () {
                // loading
                this.listLoading = true;

                // 请求接口
                getUser().then(res => {
                    // console.log(res.data.data.users);

                    if (res.data.data != null) {
                        this.listLoading = false;
                        this.user_info = res.data.data;
                    }
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
                this.editUserAttributeData.amount = row.amount;  // 流量
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
                            this.getUserList();
                        }
                    }).catch({});
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