<template>
    <div class="page-navbar">
        <!-- navbar -->
        <mt-navbar class="page-part" v-model="navSelected">
            <mt-tab-item id="1">选项一</mt-tab-item>
            <mt-tab-item id="2">选项二</mt-tab-item>
            <mt-tab-item id="3">选项三</mt-tab-item>
        </mt-navbar>

        <div>
            <mt-cell class="page-part" title="当前选中">{{ navSelected }}</mt-cell>
        </div>

        <!-- tabcontainer -->
        <mt-tab-container v-model="navSelected">
            <mt-tab-container-item id="1">
                <mt-cell title="内容" />
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell title="测试" />
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <mt-cell title="选项" />
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    export default {
        name: 'page-navbar',

        data() {
            return {
                navSelected: '1'
            };
        }
    };
</script>
