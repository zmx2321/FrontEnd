<template>
    <section class="main_cont">
        <!-- 用户列表 -->
        <el-row>
            <el-table class="user_list" :data="user_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 170px)">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <el-table-column prop="id" label="用户id" width="80" align="center"></el-table-column>

                <!--<el-table-column label="头像" width="100" align="center">-->
                    <!--<template slot-scope="scope">-->
                        <!--<img :src="scope.row.avatar" class="tabimg" />-->
                    <!--</template>-->
                <!--</el-table-column>-->

                <el-table-column prop="username" label="用户名" width="80" align="center"></el-table-column>
                <el-table-column prop="nickname" label="昵称" width="115" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号" width="115" align="center"></el-table-column>
                <!--<el-table-column prop="sex" label="性别" width="115" align="center"></el-table-column>-->
                <!--<el-table-column prop="age" label="年龄" width="115" align="center"></el-table-column>-->
                <!--<el-table-column prop="birthday" label="生日" width="110" align="center"></el-table-column>-->
                <el-table-column prop="createAt" label="创建时间" width="110" align="center"></el-table-column>
                <!--<el-table-column prop="expireAt" label="过期时间" width="110" align="center"></el-table-column>-->
                <!--<el-table-column prop="updateAt" label="更新时间" width="110" align="center"></el-table-column>-->
                <!--<el-table-column prop="realname" label="真实姓名" width="110" align="center"></el-table-column>-->
                <el-table-column prop="wxNumber" label="微信号" width="80" align="center"></el-table-column>
                <el-table-column prop="loginTime" label="登录时间" width="auto"></el-table-column>
                <!--<el-table-column prop="deviceType" label="设备类型" width="80" align="center"></el-table-column>-->
                <!--<el-table-column prop="loginIp" label="登录ip" width="auto"></el-table-column>-->
            </el-table>

            <!-- 分页 -->
            <el-col :span="24" class="toolbar f-cb">
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
    </section>
</template>

<script>
    import {
        findUserList,  // 获取管理员和员工列表
    } from '../../api/api.js';

    export default {
        name: 'user',

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
                    page_size: 5, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                /**
                 * 用户列表
                 */
                user_info: [],  // 存放用户信息列表数据
            }
        },
        methods: {
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
             *  api
             *  获取用户信息
             */
            getUserList () {
                //接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                };

                // 请求接口数据
                findUserList(param).then(res => {
                    // console.log(res);

                    this.user_info = res.data.data.list;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;
                }).catch({});
            }
        },
        // 预处理
        created () {
            // 获取接口数据
            this.getUserList();
        }
    }
</script>

<style scoped>
    .toolbar {
        padding-bottom: 0;
    }
</style>