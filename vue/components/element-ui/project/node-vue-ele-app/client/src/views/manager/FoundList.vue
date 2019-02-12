<template>
    <section class="main_cont">
        <!-- 筛选 -->
        <el-row>
            <el-form :model="search_data" ref="search_data" label-width="100px">
                <el-col class="toolbar bdr_radiu" :span="24">
                    <el-col :span="22">
                        <el-form-item label="投标时间筛选:" class="intxt">
                            <el-date-picker
                                    v-model="search_data.startTime"
                                    type="datetime"
                                    placeholder="选择开始时间">
                            </el-date-picker> &#45;&#45;
                            <el-date-picker
                                    v-model="search_data.endTime"
                                    type="datetime"
                                    placeholder="选择结束时间">
                            </el-date-picker>

                            <el-form-item class="intxt">
                                <el-button type="primary" size ="small" icon="search" @click='onScreeoutMoney()'>筛选</el-button>
                            </el-form-item>

                            <el-form-item class="intxt">
                                <el-button type="primary" size ="small" icon="view" @click='onAddMoney()'>添加</el-button>
                            </el-form-item>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <!-- 表单 -->
        <el-row>
            <el-form :inline="true" ref="search_data" :model='search_data'>
                <!--<el-form-item label="投标时间筛选:">
                    <el-date-picker
                            v-model="search_data.startTime"
                            type="datetime"
                            placeholder="选择开始时间">
                    </el-date-picker> &#45;&#45;
                    <el-date-picker
                            v-model="search_data.endTime"
                            type="datetime"
                            placeholder="选择结束时间">
                    </el-date-picker>

                    <el-form-item>
                        <el-button type="primary" size ="small" icon="search" @click='onScreeoutMoney()'>筛选</el-button>
                    </el-form-item>

                    <el-form-item class="btnRight">
                        <el-button type="primary" size ="small" icon="view" @click='onAddMoney()'>添加</el-button>
                    </el-form-item>
                </el-form-item>-->
                <el-col class="toolbar bdr_radiu">
                    <el-col :span="12" class="f-fl">
                        <el-form-item label="投标时间筛选:">
                            <el-date-picker
                                    v-model="search_data.startTime"
                                    type="datetime"
                                    placeholder="选择开始时间">
                            </el-date-picker> &#45;&#45;
                            <el-date-picker
                                    v-model="search_data.endTime"
                                    type="datetime"
                                    placeholder="选择结束时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item>
                            <el-button type="primary" size ="small" icon="search" @click='onScreeoutMoney()'>筛选</el-button>
                        </el-form-item>

                        <el-form-item class="btnRight">
                            <el-button type="primary" size ="small" icon="view" @click='onAddMoney()'>添加</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>

        <!-- 资金列表 -->
        <el-row>
            <el-table v-if="tableData.length > 0" :data='tableData' max-height="450" border :default-sort = "{prop: 'date', order: 'descending'}" height="calc(100vh - 120)">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->
                <!--<el-table-column prop="id" label="id" width="100"></el-table-column>-->
                <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>

                <el-table-column prop="date" label="创建时间" width="250" align="center" sortable>
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="type" label="收支类型" width="150" align="center"></el-table-column>

                <el-table-column prop="describe" label="收支描述" width="180" align="center"></el-table-column>

                <el-table-column prop="income" label="收入" width="170" align="center">
                    <template slot-scope="scope">
                        <span style="color:#00d053">+ {{ scope.row.income }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="expend" label="支出" width="170" align="center">
                    <template slot-scope="scope">
                        <span style="color:#f56767">- {{ scope.row.expend }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="cash" label="账户现金" width="170" align="center">
                    <template slot-scope="scope">
                        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="remark" label="备注" width="220" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="180">
                    <template slot-scope='scope'>
                        <el-button type="warning" icon='edit' size="small" @click='onEditMoney(scope.row)'>编辑</el-button>
                        <el-button type="danger" icon='delete' size="small" @click='onDeleteMoney(scope.row,scope.$index)'>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 底部工具条 -->
            <!--<el-col :span="24" class="toolbar bottip">-->
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <!--</el-col>-->
        </el-row>
    </section>
</template>

<script>
    import {
        getProfile  // 资金管理列表
    } from "../../api/api"

    export default {
        name: "FoundList",

        data() {
            return {
                // 筛选
                search_data: {
                    startTime: "",
                    endTime: ""
                },

                // 资金列表数据
                tableData: [],
            }
        },

        methods: {
            getProfile() {
                // 获取表格数据
                getProfile().then(res => {
                    console.log(res)

                    this.tableData = res.data;
                });
            },
        },
        created () {
            this.getProfile();
        }
    }
</script>

<style scoped>
    .fillcontain {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }

    .btnRight {
        float: right;
    }

    .pagination {
        text-align: right;
        margin-top: 10px;
    }

    .intxt{
        display: inline-block;
        margin-right: 16px;
        margin-bottom: 22px;
        width: 345px;
    }
</style>