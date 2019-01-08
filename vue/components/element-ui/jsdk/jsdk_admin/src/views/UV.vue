<template>
    <section class="main_cont">
        <!-- 项目列表 -->
        <el-row>
            <el-table class="project_list" :data="uv_info" border highlight-current-row v-loading="listLoading" height="800">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>
                <el-table-column prop="title" label="项目标题" width="200" align="center"></el-table-column>
                <el-table-column label="项目logo" width="200" align="center">
            	<template slot-scope="scope">
            		<img :src="scope.row.logo" class="tabimg" />
            	</template>
                </el-table-column>
                <el-table-column prop="countUV" label="访问量" width="auto"></el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-col :span="24" class="toolbar f-cb">
                <el-pagination class="f-fr" layout="prev, pager, next, total"  @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="page_arg.total"></el-pagination>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import {
        UVProject  //UV接口
    } from '../api/api.js';

    export default {
        name: "uv",

        data () {
            return{
                /**
                 * common
                 */
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示

                //uv信息
                uv_info: [],

                //分页参数
                page_arg: {
                    pagesize: "11",  // 初始一页条数
                    currentPage: "1",  // 当前第几页
                    total: 0,  // 用于table的 :total
                },
            }
        },
        methods: {
            /**
             * common
             */
            //关闭提示
            handleClose(done) {
                this.$confirm('确认关闭？').then(() => {
                    done();
                }).catch(err => {
                    throw err;
                });
            },

            /**
             *  分页
             */
            // 控制每页的数量--分页
            handleCurrentChange(val) {
                this.page_arg.currentPage = val;
                this.getProjectUV();
            },

            /**
             * api
             */
            //获取项目信息
            getProjectUV () {
                //接口参数
                let param = {
                    pageSize: this.page_arg.pagesize,
                    pageNum: this.page_arg.currentPage,
                };

                this.listLoading = true;

                UVProject(qs.stringify(param)).then(res => {
                    this.listLoading = false;

                    this.page_arg.total = res.data.data.total;
                    this.uv_info = res.data.data.list;
                });
            },
        },
        created () {
            this.getProjectUV();
        }
    }
</script>

<style scoped>
    .tabimg{
        display: block;
        width: 40px;
        height: 40px;
        margin: 0 auto;
    }
</style>