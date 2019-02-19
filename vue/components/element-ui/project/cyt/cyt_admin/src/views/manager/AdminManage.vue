<template>

    <!--
        微信名提示： 关注公众号并登陆个人中心进行绑定
    -->

    <section class="main_cont">
        <!-- 表单 -->
        <el-row class="toolbar bdr_radiu">
            <el-button type="primary" @click="addAdminVisible = true">添加管理员</el-button>
        </el-row>

        <el-row>
            <!-- 管理员列表 -->
            <el-table class="rider_list" :data="admin_info" border highlight-current-row v-loading="listLoading">
                <el-table-column type="index" width="60" label="序号" align="center"></el-table-column>
                <!--<el-table-column prop="id" label="id" width="60" align="center"></el-table-column>-->
                <el-table-column prop="username" label="账号" width="auto" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" width="auto" align="center"></el-table-column>

                <el-table-column label="角色" width="auto" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.role == 0 ? "超级管理员" : "管理员" }}
                    </template>
                </el-table-column>

                <el-table-column prop="mobile" label="手机" width="auto" align="center"></el-table-column>

                <el-table-column label="封禁状态" width="100" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.disable === 0 ? "未封禁" : "封禁" }}
                    </template>
                </el-table-column>

                <el-table-column label="柜端权限" width="auto" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.guiAdmin == 1 ? "是" : "否" }}
                    </template>
                </el-table-column>

                <el-table-column prop="createAt" label="创建时间" width="110" align="center"></el-table-column>
                <!--<el-table-column prop="guiNos" label="格口编号" width="120" align="center"></el-table-column>-->
                <el-table-column prop="weChatName" label="微信名" width="auto" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="320">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="guiAdminManage(scope.row)" v-on:click="guiAdminManageVisible = true" v-if="scope.row.guiAdmin == 1">查看柜端权限</el-button>
                        <el-button type="text" size="small" @click="prohibition(scope.row)" v-if="scope.row.disable == 0">封禁</el-button>
                        <el-button type="text" size="small" @click="lifted(scope.row)" v-else>解禁</el-button>
                        <el-button type="text" size="small" @click="updateAdmin(scope.row)" v-on:click="updateAdminVisible = true">编辑</el-button>
                        <el-button type="text" size="small" @click="delAdmin(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <!-- 添加管理员 -->
        <el-dialog title="添加管理员" @keyup.enter.native="addAdminSubmit('addAdminForm')" :close-on-click-modal="false" :visible.sync="addAdminVisible" :before-close="handleClose">
            <el-form :model="addAdminData" status-icon :rules="addAdminRules" ref="addAdminForm" label-width="120px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addAdminData.username"  placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addAdminData.name"  placeholder="请输入姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="addAdminData.mobile"  placeholder="请输入手机号" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addAdminSubmit('addAdminForm')">提交</el-button>
                    <el-button @click="resetForm('addAdminForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑管理员 -->
        <el-dialog title="编辑管理员" @keyup.enter.native="updateAdminSubmit('updateAdminForm')" :close-on-click-modal="false" :visible.sync="updateAdminVisible" :before-close="handleClose">
            <el-form :model="updateAdminData" status-icon :rules="updateAdminRules" ref="updateAdminForm" label-width="120px">
                <el-form-item label="编号" prop="id">
                    <el-input v-model="updateAdminData.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="updateAdminData.username"  placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="updateAdminData.name"  placeholder="请输入姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="updateAdminData.mobile"  placeholder="请输入手机号" clearable></el-input>
                </el-form-item>
                <el-form-item label="柜端管理权限" class="intxt">
                    <el-select v-model="updateAdminData.guiRole" placeholder="柜端管理权限" @change="currentSel">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="updateAdminSubmit('updateAdminForm')">提交</el-button>
                    <el-button @click="resetForm('updateAdminForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 柜端管理权限 -->
        <el-dialog title="新增管理员允许管理的柜号" @keyup.enter.native="guiAdminManageSubmit('guiAdminManageForm')" :close-on-click-modal="false" :visible.sync="guiAdminManageVisible" :before-close="handleClose">
            <el-row class="toolbar bdr_radiu">
                <el-form :inline="true">
                    <el-col :span="22">
                        <el-form-item v-model="guicur" class="intxt">
                            <el-dropdown>
                                <el-button>
                                    {{ guicur }}<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown" class="downlist">
                                    <el-dropdown-item v-for="item in guiInfo" @click.native="getGuiNo(item)" :key="item.index">{{ item }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-form-item>

                        <el-form-item class="intxt">
                            <el-button type="primary" @click="addGuiNo">新增</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>

            <el-tag
                    :key="tag"
                    class="guitag"
                    v-for="tag in guiNos"
                    closable
                    :disable-transitions="false"
                    @close="deleteGuiNo(tag)">
                {{ tag }}
            </el-tag>
        </el-dialog>
    </section>
</template>

<script>
    import {
        getAdminList,  // 获取管理员列表
        getDeviceList,  // 获取设备编号
        selectAdminGuiNo,  // 获取管理员允许管理的柜号
        addGuiNo,  // 新增管理员允许管理的柜号
        deleteGuiNo,  // 删除管理员允许管理的柜号
        addAdmin,  // 添加管理员
        updateAdmin,  // 编辑管理员
        setDisable,  // 解封/封禁
        delAdmin  // 删除管理员
    } from '../../api/api.js';

    export default {
        name: "admin_manage",

        data() {
            return {
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示

                // 管理员信息
                admin_info: [],

                // 柜端管理权限列表
                guiNos: [],

                // 所有柜端设备
                guiInfo: [],
                guicur: "柜端列表",

                /**
                 * 添加管理员
                 */
                // 添加管理员数据
                addAdminData: {
                    username: "",  // 用户名
                    name: "",  // 姓名
                    mobile: "",  // 手机号
                },

                // 验证添加管理员界面数据
                addAdminRules: {
                    username: [
                        { required: true, message: '用户名不能为空！', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '姓名不能为空！', trigger: 'blur' },
                    ],
                    mobile: [
                        { required: true, message: '手机号不能为空！', trigger: 'blur' },
                    ],
                },

                /**
                 * 编辑管理员
                 */
                // 编辑管理员数据
                updateAdminData: {
                    id: "",  // id
                    username: "",  // 用户名
                    name: "",  // 姓名
                    mobile: "",  // 手机号
                    guiRole: ""  // 柜端管理权限
                },

                // 验证编辑管理员界面数据
                updateAdminRules: {
                    username: [
                        { required: true, message: '用户名不能为空！', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '姓名不能为空！', trigger: 'blur' },
                    ],
                    mobile: [
                        { required: true, message: '手机号不能为空！', trigger: 'blur' },
                    ],
                    guiRole: [
                        { required: true, message: '柜端管理权限不能为空！', trigger: 'blur' },
                    ],
                },

                /**
                 * 柜端管理权限
                 */
                // 柜端管理权限
                guiAdminData: {
                    adminId: "",  // 管理员id
                    guiNo: "",  // 柜号
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addAdminVisible: false,  // 添加新的管理员界面
                updateAdminVisible: false,  // 编辑管理员界面
                guiAdminManageVisible: false,  // 柜端管理权限界面
            }
        },
        methods: {
            /**
             * common
             */
            // 关闭提示
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    }).catch(() => {});
            },

            /**
             * api
             * 管理员信息
             */
            getAdminList () {
                getAdminList().then(res => {
                    // console.log(res.data.data);

                    this.admin_info = res.data.data;
                });
            },

            /**
             * api
             * 柜端管理权限
             */
            // 点击查看柜端权限
            guiAdminManage (row) {
                // 清空
                this.guicur = "柜端列表";

                // 获取并赋值管理员id
                this.guiAdminData.adminId = Object.assign({}, row).id;

                getDeviceList().then(res => {
                    let datas = res.data.data;

                    for (let i=0; i<datas.length; i++){
                        // console.log(datas[i].guiNo);
                        this.guiInfo.push(datas[i].guiNo);
                    }
                }).catch({});

                let param = {
                    adminId: this.guiAdminData.adminId
                }

                selectAdminGuiNo(param).then(res => {
                    // console.log(res);

                    this.guiNos = res.data.data;
                }).catch({});
            },
            // 下拉
            getGuiNo(item) {
                this.guicur = item;
                this.guiAdminData.guiNo = item;
            },
            // 添加柜端权限设备
            addGuiNo () {
                addGuiNo(this.guiAdminData).then(res => {
                    if (res.data.msg == "success"){
                        this.$message({
                            message: "添加成功！",
                            type: "success"
                        });

                        this.guiNos.push(this.guiAdminData.guiNo);
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                    }
                }).catch(() => {
                    /*this.$message({
                        message: "添加失败",
                        type: "warning"
                    });*/
                });

            },
            // 删除柜端权限
            deleteGuiNo(tag) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.guiAdminData.guiNo = tag;

                    deleteGuiNo(this.guiAdminData).then(() => {
                        this.$message({
                            message: "删除成功！",
                            type: "success"
                        });

                        this.guiNos.splice(this.guiNos.indexOf(tag), 1);
                    }).catch({});
                }).catch(err => {
                    throw err;
                });
            },

            /**
             * api
             * 添加管理员
             */
            // 提交添加管理员表单
            addAdminSubmit (formName) {
                this.listLoading = true;  //点击提交开始加载loading

                //验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        addAdmin(qs.stringify(this.addAdminData)).then(() => {
                            this.$message({
                                message: "添加成功！",
                                type: "success"
                            });

                            // 隐藏添加banner信息界面
                            this.addAdminVisible = false;

                            // 请求成功停止加载loading
                            this.listLoading = false;

                            // 刷新列表数据
                            this.getAdminList();
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                    }
                });
            },

            /**
             * api
             * 编辑管理员
             */
            // 编辑管理员(浅拷贝列表数据到表单)
            updateAdmin (row) {
                this.updateAdminData = Object.assign({}, row);

                // this.updateAdminData.guiRole = Object.assign({}, row).guiAdmin;
            },

            // 柜端管理权限
            currentSel (val) {
                console.log(val);
                /*switch (val) {
                    case "1" :
                        this.updateAdminData.guiRole = "是";
                        break;
                    case "0" :
                        this.updateAdminData.guiRole = "否";
                        break;
                }*/
            },

            // 提交编辑管理员表单
            updateAdminSubmit (formName) {
                this.listLoading = true;  //点击提交开始加载loading

                //验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        let params = {
                            adminId: this.updateAdminData.id,
                            username: this.updateAdminData.username,
                            name: this.updateAdminData.name,
                            mobile: this.updateAdminData.mobile,
                            guiRole: this.updateAdminData.guiRole,
                        };

                        updateAdmin(qs.stringify(params)).then(() => {
                            this.$message({
                                message: "编辑成功！",
                                type: "success"
                            });

                            // 隐藏添加banner信息界面
                            this.updateAdminVisible = false;

                            // 请求成功停止加载loading
                            this.listLoading = false;

                            // 刷新列表数据
                            this.getAdminList();
                        }).catch({});
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                    }
                });
            },

            /**
             * api 解封/封禁
             */
            // 封禁
            prohibition (row) {
                let disable;

                if (Object.assign({}, row).disable == 0){
                    disable = 1;
                } else {
                    disable = 0;
                }

                let params = {
                    id: Object.assign({}, row).id,  // 用户或者骑手,管理员id
                    disable: disable,  // 封禁 1 ，解封 0
                    type: 2  // 用户 1 ，骑手 0 , 管理员 2
                };

                setDisable(params).then(res => {
                    console.log(res);

                    this.$message({
                        message: '封禁成功',
                        type: 'success'
                    });

                    // 刷新列表数据
                    this.getAdminList();
                });
            },

            // 解封
            lifted (row) {
                let disable;

                if (Object.assign({}, row).disable == 0){
                    disable = 1;
                } else {
                    disable = 0;
                }

                let params = {
                    id: Object.assign({}, row).id,  // 用户或者骑手,管理员id
                    disable: disable,  // 封禁 1 ，解封 0
                    type: 2  // 用户 1 ，骑手 0 , 管理员 2
                };

                setDisable(params).then(res => {
                    console.log(res);

                    this.$message({
                        message: '解封成功',
                        type: 'success'
                    });

                    // 刷新列表数据
                    this.getAdminList();
                });
            },

            // 删除管理员
            delAdmin (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let id = Object.assign({}, row).id;

                    let params = {
                        id: id
                    };

                    delAdmin(params).then(() => {
                        this.$message({
                            message: "删除成功！",
                            type: "success"
                        });

                        // 刷新列表数据
                        this.getAdminList();
                    }).catch({});
                }).catch(err => {
                    throw err;
                });
            },
        },
        created () {
            this.getAdminList();
        }
    }
</script>

<style scoped>
    .rider_list{
        width: 100%;
    }

    .downlist{
        height: 200px;
        overflow: auto;
    }

    .guitag:not(:last-child){
        margin-right: 15px;
    }

    .intxt{
        margin-bottom: 0;
        padding: 0;
    }
</style>