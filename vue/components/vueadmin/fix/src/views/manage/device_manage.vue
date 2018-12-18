<template>
    <section>
        <!--工具条-->

        <!--
        编辑位置信息
        显示设备的存取餐二维码
        查看设备状态
        设备通信状态
        设备柜口状态
        远程开柜


        开启单个特定柜口
        一键开启所有柜口

        重启设备
        添加新的设备

        设备 设备查询 查询
             添加新的设备 重启设备
        柜口 开启单个特定柜口 开启
             一键开启所有柜口
        -->

        <el-row>
            <el-form :inline="true" :model="filters">
                <el-col class="toolbar" :span="24">
                    <el-col :span="2" class="mantit">设备</el-col>
                    <el-col :span="22">
                        <el-form-item>
                            <el-input v-model="filters.name" placeholder="请输入设备名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getDevices">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="deviceAdd">添加新的设备</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="restartDevice">重启设备</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col class="toolbar" :span="24">
                    <el-col :span="2" class="mantit">柜口</el-col>
                    <el-col :span="22">
                        <el-form-item>
                            <el-input v-model="filters.name" placeholder="请输入单个特定柜口ID"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="openCabinet">开启</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="openAllCabinet">一键开启所有柜口</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <!-- 设备列表 -->
        <!--<el-table :data="users" v-loading="listLoading" @selection-change="selsChange">-->
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <!--<el-table-column type="index" width="60"></el-table-column>-->
            <!--<el-table-column prop="name" label="设备名称" width="120" sortable></el-table-column>-->

            <!--<el-table-column label="操作" width="150">-->
                <!--<template scope="scope">-->
                    <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                    <!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
        <!--</el-table>-->
        <!--<el-table :data="users" v-loading="listLoading" border @selection-change="selsChange">-->
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <!--<el-table-column type="index" width="50"></el-table-column>-->
            <!--<el-table-column prop="name" label="设备名称" width="120" sortable></el-table-column>-->
            <!--<el-table-column prop="id" label="ID" width="180">-->
            <!--</el-table-column>-->
        <!--</el-table>-->
        <el-table
                :data="tableData6"
                :span-method="arraySpanMethod"
                border
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="amount1"
                    sortable
                    label="数值 1">
            </el-table-column>
            <el-table-column
                    prop="amount2"
                    sortable
                    label="数值 2">
            </el-table-column>
            <el-table-column
                    prop="amount3"
                    sortable
                    label="数值 3">
            </el-table-column>
        </el-table>

        <el-table
                :data="tableData6"
                :span-method="objectSpanMethod"
                border
                style="width: 100%; margin-top: 20px">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="amount1"
                    label="数值 1（元）">
            </el-table-column>
            <el-table-column
                    prop="amount2"
                    label="数值 2（元）">
            </el-table-column>
            <el-table-column
                    prop="amount3"
                    label="数值 3（元）">
            </el-table-column>
        </el-table>

        <!-- 添加新的设备 -->
        <el-dialog title="添加新的设备" v-model="addDeviceForm" :close-on-click-modal="false">

        </el-dialog>

        <!--<el-row>-->
        <!--<el-col  class="toolbar" :span="24">-->
        <!--<el-form :inline="true" :model="filters">-->
        <!--<el-form-item>-->
        <!--<el-input v-model="filters.name" placeholder="设备名称"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="getUsers">查询</el-button>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</el-col>-->
        <!--</el-row>-->

        <!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">-->
            <!--<el-form :inline="true" :model="filters">-->
                <!--<el-form-item>-->
                    <!--<el-input v-model="filters.name" placeholder="设备名称"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="getUsers">查询</el-button>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="handleAdd">添加新的设备</el-button>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="handleAdd">重启设备</el-button>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="handleAdd">一键开启所有柜口</el-button>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</el-col>-->
        <!--<el-row>-->
        <!--<el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>-->
        <!--</el-row>-->

        <!--列表-->
        <!--<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">-->
        <!--<el-table-column type="selection" width="55">-->
        <!--</el-table-column>-->
        <!--<el-table-column type="index" width="60">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="name" label="姓名" width="120" sortable>-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="age" label="年龄" width="100" sortable>-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="birth" label="生日" width="120" sortable>-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="addr" label="地址" min-width="180" sortable>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="操作" width="150">-->
        <!--<template scope="scope">-->
        <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
        <!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--</el-table>-->

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="editForm.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="addForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="addForm.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

    export default {
        data() {
            return {
                tableData6: [{
                    id: '12987122',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                }, {
                    id: '12987123',
                    name: '王小虎',
                    amount1: '165',
                    amount2: '4.43',
                    amount3: 12
                }, {
                    id: '12987124',
                    name: '王小虎',
                    amount1: '324',
                    amount2: '1.9',
                    amount3: 9
                }, {
                    id: '12987125',
                    name: '王小虎',
                    amount1: '621',
                    amount2: '2.2',
                    amount3: 17
                }, {
                    id: '12987126',
                    name: '王小虎',
                    amount1: '539',
                    amount2: '4.1',
                    amount3: 15
                }],

                listLoading: false,  //lodding动画
                sels: [],  //列表选中列

                //添加新的设备
                addDeviceForm: false,  //新增界面是否显示
                addLoading: false,
                addDeviceRules: {
                    name: [
                        { required: true, message: '请输入设备名称', trigger: 'blur' }
                    ]
                },
                //新增界面数据
                addDeviceData: {

                },




                filters: {
                    name: ''
                },
                users: [],
                total: 0,
                page: 1,



                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                }

            }
        },
        methods: {
            arraySpanMethod({ row, column, rowIndex, columnIndex }) {
                if (rowIndex % 2 === 0) {
                    if (columnIndex === 0) {
                        return [1, 2];
                    } else if (columnIndex === 1) {
                        return [0, 0];
                    }
                }
            },

            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },



            //查询设备信息
            getDevices (){
                console.log("查询设备信息");
            },
            //显示添加设备界面
            deviceAdd () {
                console.log("添加设备");
                this.addDeviceForm = true;
                this.addDeviceData = {

                };
            },
            //重启设备
            restartDevice () {
                console.log("重启设备");
            },
            //开启柜口
            openCabinet () {
                console.log("开启柜口");
            },
            //一键开启所有柜口
            openAllCabinet () {
                console.log("开启所有柜口");
            },
            //选中批量删除按钮可以点击
            selsChange (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { ids: ids };
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },


            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                getUserListPage(para).then((res) => {
                    //console.log(res);
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { id: row.id };
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            editUser(para).then((res) => {
                                console.log(res);

                                this.editLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addUser(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },

        },
        mounted() {
            this.getUsers();
        }
    }

</script>

<style scoped>
    .toolbar{
        padding: 10px 10px 0 10px;
        margin: 10px 0px;
    }

    .mantit{
        color: #5d5656;
        line-height: 35px;
        text-align: center;
    }
</style>