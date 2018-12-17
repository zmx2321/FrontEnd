<template>


    <!--管理员设置
    增加、删除管理员
    修改管理员信息（姓名、账号、密码、网点等）
    以角色为单位的权限管理（未来需求）
    新增角色
    对角色编辑权限
    在角色中增加相应的子管理员-->

    <section>
        <h2>账号管理</h2>

        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="primary" @click="handleAdd2">新增2</el-button>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">

        </el-dialog>

        <el-dialog title="新增2" v-model="addFormVisible2" :close-on-click-modal="false">

        </el-dialog>
    </section>
</template>

<script>
    export default {
        name: "account_manage",

        data() {
            return {
                filters: {
                    name: ''
                },

                // editFormVisible: false,//编辑界面是否显示
                // editLoading: false,

                addFormVisible: false,//新增界面是否显示
                addFormVisible2: false,//新增界面是否显示

                addLoading: false,
            }
        },
        methods: {
            //显示编辑界面
            // handleEdit: function () {
            //     this.editFormVisible = true;
            // },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
            },
            handleAdd2: function () {
                this.addFormVisible2 = true;
            },

        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>