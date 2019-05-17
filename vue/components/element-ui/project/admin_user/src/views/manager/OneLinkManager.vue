<template>
    <section class="main_cont">
        <!-- 链接列表 -->
        <el-row>
            <el-table :data="link_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 226px)">
                <el-table-column type="index" width="60" align="center"></el-table-column>
                <!--<el-table-column prop="adminId" label="管理员编号" width="100" align="center"></el-table-column>-->

                <el-table-column prop="url" label="url" width="auto" align="left"></el-table-column>
                <!--<el-table-column prop="mobile" label="手机号" width="auto" align="center"></el-table-column>
                <el-table-column prop="realName" label="姓名" width="auto" align="center"></el-table-column>
                <el-table-column prop="totalPrice" label="链接金额" width="auto" align="center"></el-table-column>
                <el-table-column prop="crtattim" label="链接时间" width="auto" align="center"></el-table-column>-->
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
    </section>
</template>

<script>
    import {
        getLinkList,  // 获取链接列表
    } from '../../api/api.js';

    export default {
        name: 'onelink_manager',

        data() {
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
                parentId: this.$route.params.parentId,

                /**
                 * 链接
                 */
                // 链接列表
                link_info: [],  // 存放链接信息列表数据

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
                        this.user_info = res.data.data.set;

                        // 返回分页总数
                        this.page_arg.total = res.data.data.pager.total;
                    }

                    this.listLoading = false;
                }).catch({});
            },
        },
        // 预处理
        created () {
            this.getUserList();

            this.userType = localStorage.userType;
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