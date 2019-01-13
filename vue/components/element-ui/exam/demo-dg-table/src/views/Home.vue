<template>
  <div class="hello">
    <dg-table
            :data='data'
            :selection="true"
            :pagination="true"
            :page-config="{ pagenum:pagenum, curpage: curpage }"
            :filter-init="[]"
            :row-click="onclick"
            :action-config="activeConfig"
            :column-config="config"
            @filter-change='getFilter'
            @select-change="getselect"
            @page-change="getpage"></dg-table>
  </div>
</template>

<script>
import cc from './columcomponent.vue'  // 自定义列的组件
import CF from './customizefilter.vue' // 自定义的筛选器
import CM from './customizemenu.vue' // 自定义的操作列
import {
    searchdata,
    dofilter,
    cities,
    createTableDataByRandom
} from '../assets/js/simulationapi.js' // 用于模拟表数据的js

export default {
  name: 'home',

  components: {
    // HelloWorld
  },

    methods: {
        getpage (page) { // 翻页变化事件的绑定函数
            this.curpage = page
            let allfilter = {
                filters: this.filters,
                page
            }
            let res = dofilter(allfilter)
            this.data = res.data
        },
        getFilter (val) { // 筛选条件变化事件的绑定函数
            console.log(val)
            let allfilter = {
                filters: val,
                page: 1
            }
            this.filters = val
            let res = dofilter(allfilter)
            this.data = res.data
            this.pagenum = res.pagenum
        },
        getselect (val) { // 多选变化事件的绑定函数
            console.log(val)
        }
    },
    mounted () {
        let res = createTableDataByRandom(587)
        this.data = res.data
        this.pagenum = res.pagenum
    },
    data () {
        return {
            filters: 3,
            select: true,
            pagination: true,
            pagenum: 1,
            curpage: 1,
            onclick: (row) => {
                alert(JSON.stringify(row))
            },
            activeConfig: {
                type: 'customize', // 声明类型为自定义
                label: '获取',
                component: CM, // 引用vue组件
                handlers: { // 在组件中 采用 handlers.firsth(row)使用
                    firsth: (row) => {console.log('first', row)},
                    second: (row) => {console.log('second', row)}
                },
                width: '100'
            },
            config: [
                {
                    prop: 'name',
                    label: '姓名',
                    width: '80',
                    filterConfig: {
                        ftn: '姓名',
                        type: 'search',
                        key: 'uid',
                        placeholder: '输入姓名',
                        listinfo: {
                            handler: searchdata,
                            searchkey: 'name', // 用于搜索api对应的key
                            showkey: 'name' // 在列表中要显示的字段
                        }
                    }
                }, {
                    prop: 'gender',
                    label: '性别',
                    component: cc, // 自定义性别处理的组件 在组件中会传入row 当前行
                    width: '80',
                    filterConfig: {
                        ftn: '性别',
                        type: 'radio',
                        key: 'gender',
                        listinfo: {
                            labelkey: 'label',
                            valuekey: 'value'
                        },
                        items: [
                            { label: '男', value: 1 },
                            { label: '女', value: 2 }
                        ]
                    }
                }, {
                    prop: 'birthPlace',
                    label: '出生地',
                    processdata: (row, prop) => {
                        // console.log('process data:', row) // 返回整行 便于 处理一些依赖其他列的数据
                        var space = ''
                        if (!row.birthPlace) return '-'
                        var curobj = row.birthPlace
                        while (1) {
                            if (curobj) {
                                space += curobj.name
                                curobj = curobj.child
                            } else {
                                break
                            }
                        }
                        return space
                    }, // 数据的处理 默认提供一些 也可以自定义处理数据的函数
                    filterConfig: {
                        ftn: '出生地',
                        key: 'birthPlace',
                        type: 'cascader',
                        hidebg: true,
                        props: {
                            value: 'code',
                            label: 'name',
                            children: 'children'
                        },
                        items: cities()
                    }
                }, {
                    prop: 'birthDay',
                    label: '出生日期',
                    filterConfig: {
                        ftn: '生日',
                        hidebg: true,
                        type: 'date',
                        key: 'birthDay'
                    },
                    processdata: 'time'
                }, {
                    prop: 'phone',
                    label: '手机号',
                    filterConfig: {
                        ftn: '手机',
                        type: 'edit',
                        key: 'phone'
                    }
                }, {
                    prop: 'age',
                    label: '年龄',
                    filterConfig: {
                        ftn: '年龄',
                        type: 'range',
                        key: 'age',
                        unit: '岁'
                    }
                }, {
                    prop: 'age2',
                    label: '年龄'
                }, {
                    prop: 'age3',
                    label: '自定义筛选',
                    filterConfig: {
                        ftn: '自定义筛选',
                        type: 'customize', // 声明为自定义筛选器
                        component: CF, // 筛选的组件 返回的数据要按规定格式返回
                        key: 'age',
                        customizedata: {label: '我是用户自定义的数据', value: 'balabalabala'} // 会传入组件中供组件使用
                    }
                }
            ],
            data: []
        }
    }
}
</script>
