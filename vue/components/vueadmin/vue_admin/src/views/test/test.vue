<template>
    <section>
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

    </section>
</template>
<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                // users: []
            }
        },
        methods: {
            //获取用户列表
            getUser: function () {
                // let para = {
                //     name: this.filters.name
                // };
                //
                // getUserList(para).then((res) => {
                //     console.log(res.data.users);
                // });

                let para = {
                    name: this.filters.name
                };
                axios.get("http://www.coolneng.com/wap/json/cates/").then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        mounted() {
            this.getUser();
        }
    };

</script>

<style scoped>

</style>