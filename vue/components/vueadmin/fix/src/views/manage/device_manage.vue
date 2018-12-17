<template>
    <section>
        <h2>设备管理</h2>

        <!--添加新的设备
        编辑位置信息
        显示设备的存取餐二维码
        查看设备状态
        设备通信状态
        设备柜口状态
        远程开柜
        开启单个特定柜口
        一键开启所有柜口
        重启设备-->


        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="primary" @click="handleAdd2">新增2</el-button>

        <!--<el-button size="small" @click="handleEdit">编辑</el-button>-->


        <!--编辑界面-->
        <!--<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">

        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">

        </el-dialog>

        <el-dialog title="新增2" v-model="addFormVisible2" :close-on-click-modal="false">

        </el-dialog>
    </section>
</template>

<script>
    export default {
        name: "device",

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