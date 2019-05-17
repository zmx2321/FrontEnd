<template>
    <section class="main_cont">
        <!-- 筛选 -->
        <el-row class="toolbar bdr_radiu f-cb">
            <el-form :model="filterData" status-icon ref="filterForm" :inline="true">
                <el-col :span="24">
                    <!-- keyword（查询关键词，模糊匹配 url 和 memo字段） -->
                    <el-form-item label="查询关键词">
                        <el-input v-model="filterData.keyword" placeholder="请输入关键词" clearable></el-input>
                    </el-form-item>

                    <!--日期，格式行如：2019-04-12-->
                    <el-form-item label="日期">
                        <el-date-picker
                                v-model="filterData.timeArray"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy-MM-dd"
                                @change="getSTime"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>

                    <!-- 按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="filterFormSubmit('filterForm')">查询</el-button>
                        <el-button type="primary" @click="addLinkVisible = true">新增链接</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>

        <!-- 链接列表 -->
        <el-row>
            <el-table class="link_list" :data="link_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 218px)">
                <el-table-column type="index" width="60" align="center"></el-table-column>
                <!--<el-table-column prop="adminId" label="管理员编号" width="100" align="center"></el-table-column>-->

                <el-table-column prop="url" label="url" width="auto" align="left"></el-table-column>
                <!--<el-table-column prop="mobile" label="手机号" width="auto" align="center"></el-table-column>
                <el-table-column prop="realName" label="姓名" width="auto" align="center"></el-table-column>
                <el-table-column prop="totalPrice" label="链接金额" width="auto" align="center"></el-table-column>
                <el-table-column prop="crtattim" label="链接时间" width="auto" align="center"></el-table-column>-->

                <el-table-column fixed="right" label="操作" width="320">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="checkLink(scope.row)">查看子链接</el-button>
                        <el-button type="text" size="small" @click="addOneLink(scope.row)" v-on:click="addOneLinkVisible = true">添加子链接</el-button>
                        <el-button type="text" size="small" @click="editLink(scope.row)" v-on:click="editLinkVisible = true">编辑</el-button>
                        <el-button type="text" size="small" @click="delLink(scope.row)">删除</el-button>
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

        <el-dialog title="新增链接" :close-on-click-modal="false" :visible.sync="addLinkVisible" :before-close="handleClose">
            <el-form :model="addLinkData" status-icon :rules="addLinkRules" ref="addLinkForm" label-width="160px">
                <el-form-item label="url" prop="url">
                    <el-input v-model="addLinkData.url" placeholder="请输入url" clearable></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="num">
                    <el-input v-model="addLinkData.num" placeholder="请输入数量" clearable></el-input>
                </el-form-item>
                <el-form-item label="CPA 权值" prop="cpaWeight">
                    <el-input v-model="addLinkData.cpaWeight" placeholder="请输入CPA 权值" clearable></el-input>
                </el-form-item>
                <el-form-item label="CPS 权值" prop="cpsWeight">
                    <el-input v-model="addLinkData.cpsWeight" placeholder="请输入CPS 权值" clearable></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                    <el-input type="textarea" v-model="addLinkData.memo" placeholder="请输入备注" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addLinkSubmit('addLinkForm')">提交</el-button>
                    <el-button @click="resetForm('addLinkForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="新增子链接" :close-on-click-modal="false" :visible.sync="addOneLinkVisible" :before-close="handleClose">
            <el-form :model="addOneLinkData" status-icon :rules="addOneLinkRules" ref="addOneLinkForm" label-width="160px">
                <el-form-item label="数量" prop="num">
                    <el-input v-model="addOneLinkData.num" placeholder="请输入数量" clearable></el-input>
                </el-form-item>
                <el-form-item label="CPA 权值" prop="cpaWeight">
                    <el-input v-model="addOneLinkData.cpaWeight" placeholder="请输入CPA 权值" clearable></el-input>
                </el-form-item>
                <el-form-item label="CPS 权值" prop="cpsWeight">
                    <el-input v-model="addOneLinkData.cpsWeight" placeholder="请输入CPS 权值" clearable></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                    <el-input type="textarea" v-model="addOneLinkData.memo" placeholder="请输入备注" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addOneLinkSubmit('addOneLinkForm')">提交</el-button>
                    <el-button type="primary" @click="addOneLinkSubmit('addOneLinkForm')">提交</el-button>
                    <el-button @click="resetForm('addOneLinkForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="编辑链接" :close-on-click-modal="false" :visible.sync="editLinkVisible" :before-close="handleClose">
            <el-form :model="editLinkData" status-icon :rules="editLinkRules" ref="editLinkForm" label-width="160px">
                <el-form-item label="CPA 权值" prop="cpaWeight">
                    <el-input v-model="editLinkData.cpaWeight" placeholder="请输入CPA 权值" clearable></el-input>
                </el-form-item>
                <el-form-item label="CPS 权值" prop="cpsWeight">
                    <el-input v-model="editLinkData.cpsWeight" placeholder="请输入CPS 权值" clearable></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                    <el-input type="textarea" v-model="editLinkData.memo" placeholder="请输入备注" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="editLinkSubmit('editLinkForm')">提交</el-button>
                    <el-button @click="resetForm('editLinkForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {
        getLinkList,  // 获取链接列表
        addLink,  // 添加新链接(自动生成若干子链接)
        addOneLink,  // 补添若干条子链接
        updateLink,  // 编辑子链接的属性
        delLink,  // 删除链接
    } from '../../api/api.js';

    export default {
        name: 'link_manager',

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
                    page_size: 20, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                userCode: "",  // 登录用户id

                /**
                 * 筛选器
                 */
                // 时间筛选器
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },

                // 筛选数据
                filterData: {
                    timeArray: "",
                    keyword: "",  // keyword（查询关键词，模糊匹配 url 和 memo字段）
                    dateBegin: "",  // 日期，格式行如：2019-04-12
                    dateEnd: "",  // 日期，格式行如：2019-04-12
                },

                /**
                 * 链接
                 */
                // 链接列表
                link_info: [],  // 存放用户信息列表数据

                /**
                 * 添加链接
                 */
                addLinkData: {
                    url: "https://www.baidu.com",  // url
                    num: "20",  // 数量
                    cpaWeight: "33",
                    cpsWeight: "33",
                    memo: "test",
                },

                addLinkRules: {
                    url: [
                        { required: true, message: 'url不能为空！', trigger: 'blur' }
                    ],
                    num: [
                        { required: true, message: '数量不能为空！', trigger: 'blur' }
                    ],
                },

                /**
                 * 添加子链接
                 */
                addOneLinkData: {
                    linkId: "",
                    num: "20",  // 数量
                    cpaWeight: "33",
                    cpsWeight: "33",
                    memo: "test",
                },

                addOneLinkRules: {
                    num: [
                        { required: true, message: '数量不能为空！', trigger: 'blur' }
                    ],
                },

                /**
                 * 编辑链接
                 */
                editLinkData: {
                    linkId: "",  // linkId， 主链接的ID
                    adminId: "",  // 挂一个关联的 渠道经理Id（adminId）
                    cpaWeight: "33",
                    cpsWeight: "33",
                    memo: "test",
                },

                editLinkRules: {
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
                addLinkVisible: false,  // 新增链接
                addOneLinkVisible: false,  // 新增子链接
                editLinkVisible: false,  // 编辑链接
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
            // 时间戳 2019-04-23
            formatDate (now) {
                now = new Date(now);
                let year = now.getFullYear();
                let month = now.getMonth() + 1;
                let date = now.getDate();

                return `${year}-${month}-${date}`;
            },

            /**
             *  分页
             */
            // 点击页码
            handleCurrentChange() {
                this.getLinkList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getLinkList();  // 加载分页数据
            },

            /**
             *  api delLink
             *  获取用户账号信息
             */
            // 点击日期控制器
            getSTime(val) {
                if(val){
                    // 为起止时间赋值
                    this.filterData.dateBegin = this.formatDate(val[0]);
                    this.filterData.dateEnd = this.formatDate(val[1]);
                }

                return false;
            },
            // 获取链接列表
            getLinkList () {
                //接口参数
                let params = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                    keyword: this.filterData.keyword == "" ? undefined : this.filterData.keyword,  // keyword（查询关键词，模糊匹配 url 和 memo字段）
                    dateBegin: this.filterData.dateBegin == "" ? undefined : this.filterData.dateBegin,  // 日期，格式行如：2019-04-12
                    dateEnd: this.filterData.dateEnd == "" ? undefined : this.filterData.dateEnd,  // 日期，格式行如：2019-04-12
                    parentId: this.filterData.parentId == "" ? undefined : this.filterData.parentId,  // 主链接ID，传null查看所有的主链接，指定主链接Id查看其下挂的所以子链接
                };

                // loading
                this.listLoading = true;

                // 请求接口
                getLinkList(params).then(res => {
                    // console.log(res.data.data.set);

                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        let datas = res.data.data.set;

                        this.link_info = datas;

                        // 返回分页总数
                        this.page_arg.total = res.data.data.pager.total;
                    }

                    this.listLoading = false;
                }).catch({});
            },
            // 筛选
            filterFormSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    //如果验证成功，请求接口数据
                    if (valid) {
                        this.getLinkList();
                    } else {  //验证失败跳出
                        this.message.error("表单填写错误");
                    }
                });
            },
            // 查看子链接
            checkLink (row) {
                this.$router.push({
                    path: "onelink_manager",
                    query: {
                        parentId: row.id
                    }
                });
            },

            /**
             *  api addOneLink
             *  添加子链接
             */
            // 点击添加子链接
            addOneLink (row) {
                this.addOneLinkData.linkId = row.id;
            },
            // 提交添加表单
            addOneLinkSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    this.listLoading = true;

                    //如果验证成功，请求接口数据
                    if (valid) {
                        addOneLink(qs.stringify(this.addLinkData)).then(res => {
                            console.log(res);

                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("添加成功");
                            }

                            this.listLoading = false;
                            this.addLinkVisible = false;

                            this.getLinkList();
                        }).catch({});
                    } else {  //验证失败跳出
                        this.$message.error("表单填写错误");
                    }
                });
            },

            /**
             *  api addLink
             *  添加链接
             */
            // 提交添加表单
            addLinkSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    this.listLoading = true;

                    //如果验证成功，请求接口数据
                    if (valid) {
                        addLink(qs.stringify(this.addLinkData)).then(res => {
                            console.log(res);

                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("添加成功");
                            }

                            this.listLoading = false;
                            this.addLinkVisible = false;

                            this.getLinkList();
                        }).catch({});
                    } else {  //验证失败跳出
                        this.$message.error("表单填写错误");
                    }
                });
            },

            /**
             * api updateLink
             * 编辑链接
             */
            // 点击编辑
            editLink (row) {
                this.editLinkData.linkId = row.id;
                this.editLinkData.adminId = this.userCode;
            },
            // 提交编辑表单
            editLinkSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    this.listLoading = true;

                    //如果验证成功，请求接口数据
                    if (valid) {
                        updateLink(qs.stringify(this.editLinkData)).then(res => {
                            // console.log(res);

                            if (res.data.code == 1) {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == 0) {
                                this.$message.success("编辑成功");
                            }

                            this.listLoading = false;
                            this.editLinkVisible = false;
                        }).catch({});
                    } else {  //验证失败跳出
                        this.$message.error("表单填写错误");
                    }
                });
            },

            /**
             *  api delLink
             *  删除链接
             */
            delLink (row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let params = {
                        linkId: row.id,
                    }

                    delLink(qs.stringify(params)).then(res => {
                        if (res.data.code == 1) {
                            this.$message.warning(res.data.msg);
                        }

                        if (res.data.code == 0) {
                            this.$message.success("链接删除成功！");
                            this.getLinkList();
                        }
                    }).catch({});
                }).catch(() => {});
            },
        },
        // 预处理
        created () {
            this.userCode = localStorage.userCode;
            this.getLinkList();
        }
    }
</script>

<style lang="less" scoped>
    .toolbar .el-form-item {
        margin-bottom: 3px;
    }
</style>