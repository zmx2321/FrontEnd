<template>
    <section class="main_cont">
        <!-- 链接列表 -->
        <el-row>
            <el-table :data="link_info" border highlight-current-row v-loading="listLoading" @current-change="copyLink" height="calc(100vh - 226px)" row-class-name="link_info">
                <el-table-column type="index" width="60" align="center"></el-table-column>
                <!--<el-table-column prop="adminId" label="管理员编号" width="100" align="center"></el-table-column>-->
                <!--<el-table-column label="url" width="auto" align="left">  </el-table-column>-->
                <el-table-column prop="url" label="链接" width="auto" align="left"></el-table-column>                
                <el-table-column prop="cpaWeight" label="CPA权值" width="auto" align="center"></el-table-column>
                <el-table-column prop="cpsWeight" label="CPS权值" width="auto" align="center"></el-table-column>
                <el-table-column prop="mobile" label="渠道账号" width="auto" align="center"></el-table-column>
                <el-table-column prop="realName" label="渠道姓名" width="auto" align="center"></el-table-column>
                <el-table-column prop="memo" label="备注" width="auto" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="320">
                    <template slot-scope="scope">
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

        <el-dialog title="编辑链接" :close-on-click-modal="false" :visible.sync="editLinkVisible" :before-close="handleClose">
            <el-form :model="editLinkData" status-icon :rules="editLinkRules" ref="editLinkForm" label-width="160px">
                <el-form-item label="CPA 权值" prop="cpaWeight">
                    <el-input v-model="editLinkData.cpaWeight" placeholder="请输入CPA 权值" clearable></el-input>
                </el-form-item>
                <el-form-item label="CPS 权值" prop="cpsWeight">
                    <el-input v-model="editLinkData.cpsWeight" placeholder="请输入CPS 权值" clearable></el-input>
                </el-form-item>
                <el-form-item label="渠道" class="intxt">
                    <el-select v-model="editLinkData.adminId" placeholder="请输入渠道">
                        <el-option v-for="(item,index) in user_info" :label="item.mobile" :value="item.id" :key="index"></el-option>
                    </el-select>
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
    import Clipboard from 'clipboard';  // 点击复制

    import {
        getAccount,  // 获取账号列表
        getLinkList,  // 获取链接列表
        updateLink,  // 编辑子链接的属性
        delLink,  // 删除链接
    } from '../../api/api.js';

    export default {
        name: 'onelink_manager',

        data() {
            // url验证
            let validateUrl = (rule, value, callback) => {
                let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;

                if (!reg.test(value)) {
                    return callback(new Error('url输入不正确！'));
                }

                callback();
            };

            return {
                /**
                 * common
                 */
                listLoading: false,  // lodding动画

                // 分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 20, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                // 页面参数
                parentId: this.$route.query.parentId,

                /**
                 * 链接
                 */
                // 链接列表
                link_info: [],  // 存放链接信息列表数据

                /**
                 * 用户
                 */
                // 用户列表
                user_info: [],  // 存放用户信息列表数据

                /**
                 * 编辑链接
                 */
                editLinkData: {
                    linkId: "",  // linkId， 主链接的ID
                    adminId: "",  // 挂一个关联的 渠道经理Id（adminId）
                    cpaWeight: "",
                    cpsWeight: "",
                    memo: "",
                },

                editLinkRules: {
                },

                /**
                 *  弹出表单界面(true 显示, false 隐藏)
                 */
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
             *  api getAccount
             *  获取用户账号信息
             */
            // 获取用户账号列表
            getAccountList () {
                // 请求接口
                getAccount().then(res => {
                    // console.log(res.data.data.set[0].createAt);

                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        let datas = res.data.data.set;

                        // console.log(datas);
                        this.user_info = datas;
                    }
                }).catch({});
            },

            /**
             *  api getLinkList
             *  获取链接信息
             */
            // 获取链接列表
            getLinkList () {
                let params = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                    parentId: this.parentId == "" ? undefined : this.parentId,  // 父链接
                };

                // console.log(params);

                // loading
                this.listLoading = true;

                // 请求接口
                getLinkList(params).then(res => {
                    // console.log(res.data.code);

                    if (res.data.code == 1) {
                        this.$message.warning(res.data.msg);
                    }

                    if (res.data.code == 0) {
                        let datas = res.data.data.set;

                        for (let i=0; i<datas.length; i++) {
                            datas[i].isCopy = false;

                            if (datas[i].cpaWeight != null) {
                                datas[i].cpaWeight = `${datas[i].cpaWeight}%`;
                            }

                            if (datas[i].cpsWeight != null) {
                                datas[i].cpsWeight = `${datas[i].cpsWeight}%`;
                            }
                        }

                        // console.log(datas);

                        this.link_info = datas;

                        // console.log(this.link_info);

                        // 返回分页总数
                        this.page_arg.total = res.data.data.pager.total;
                    }

                    this.listLoading = false;
                }).catch({});
            },

            // 复制连接
            copyLink (val) {
                let clipboard = new Clipboard('.copy_link')
                clipboard.on('success', e => {
                    this.$message.success("复制成功!");

                    val.isCopy = true;

                    // 释放内存
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    // 不支持复制
                    this.$message.warning("该浏览器不支持自动复制!");
                    // 释放内存
                    clipboard.destroy()
                })
            },

            /**
             * api updateLink
             * 编辑链接
             */
            // 点击编辑
            editLink (row) {
                this.editLinkData = Object.assign({}, row);
                this.editLinkData.linkId = row.id;
            },
            // 提交编辑表单
            editLinkSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    this.listLoading = true;

                    //如果验证成功，请求接口数据
                    if (valid) {
                        if (this.editLinkData.adminId == "" || this.editLinkData.adminId == undefined) {
                            this.$message.warning("渠道不能为空");
                            this.listLoading = false;
                        } else {
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

                                this.getLinkList();
                            }).catch({});
                        }
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
            this.getAccountList();
            this.getLinkList();
        }
    }
</script>

<style lang="less" scoped>
    .toolbar {
        padding-bottom: 0;
    }

    /deep/ .upload_btn {
        /*width: 85%;*/
        width: 110px;
        margin-left: 15px;
        margin-top: -1px;

        .el-upload {
            position: absolute;
            margin-top: -27px;

            button {
                padding: 12px 20px;
            }
        }

        ul {
            display: none;
        }
    }

    .contd {
        color: #9e9e9e;
    }

    .filter_wrap {
        .btn_wrap {
            margin-bottom: 10px;
            width: initial;

            .expot_user {
                display: inline-block;

                a.mod {
                    position: absolute;
                    width: 60px;
                    height: 22px;
                    line-height: 22px;
                    margin-top: 14px;
                    font-size: 12px;
                    color: #409EFF;
                    transition: 0.2s linear;
                }

                a.mod:hover {
                    color: #333;
                    transition: 0.3s linear;
                }
            }

            .btn_intxt {
                display: inline-block;
            }
        }
    }
</style>