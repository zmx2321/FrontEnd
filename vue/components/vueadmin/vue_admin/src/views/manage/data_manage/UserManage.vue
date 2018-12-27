<template>
    <section class="main_cont">
        <!-- 用户管理 -->
        <el-row>
            <el-col :span="24" class="title">
                <i class="el-icon-info"></i>
                <span>用户管理</span>
            </el-col>

            <el-form :inline="true">
                <el-col :span="22">
                    <el-form-item>
                        <el-input v-model="phone" placeholder="请输入手机号码" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchUser">根据手机号查找相关用户</el-button>
                    </el-form-item>
                </el-col>
            </el-form>

            <!-- 账号列表 -->
            <el-table class="user_list" :data="user_info" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" height="600">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column type="index" width="35"></el-table-column>
                <el-table-column prop="createAt" label="注册时间"></el-table-column>
                <el-table-column prop="openId" label="微信标志"></el-table-column>
                <el-table-column prop="mobile" label="手机号码"></el-table-column>
            </el-table>
            <!-- 底部工具条 -->
            <el-col :span="24" class="toolbar bottip">
                <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import { geUserList } from '../../../api/api.js';

    export default {
        name: "user_manage",

        data() {
            return {
                listLoading: false,  //lodding动画
                dialogVisible: false,  //关闭提示

                sels: [],  //列表选中列

                //记录信息参数
                user_arg: {
                    date: "2018/12/25",
                },

                phone: '',

                //记录信息
                user_info: [],
            }
        },
        methods: {
            //获取用户信息
            geUserList(){
                let para = {
                    date: this.user_arg.date,
                };

                geUserList(qs.stringify(para)).then(res => {
                    this.user_info = res.data.data.list;
                    console.log(this.user_info);
                });
            },
            //根据手机号查询用户
            searchUser () {
                console.log(this.user_info);
                // for(let i=0; i<this.user_info.lenth; i++){
                //     if(user_info[i].phone == this.phone){
                //         console.log("11");
                //     }
                // }
            },
            //关闭提示
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            //列表是否选中
            selsChange (sels) {
                this.sels = sels;
            },
            //账号批量删除
            batchRemove: function () {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    console.log("账号批量删除");
                }).catch(() => {

                });
            },
        },
        created () {
            this.geUserList();
        }
    }
</script>

<style scoped>
    .title{
        margin-bottom: 10px;
    }

    .user_list{
        width: 100%;
    }
</style>