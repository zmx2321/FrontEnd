<template>
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange">
        <ul>
            <li v-for="item in list">{{ item }}</li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
    </mt-loadmore>
</template>

<script>
    export default {
        name: 'page-navbar',

        data() {
            return {
                topStatus: '1'
            };
        },

        methods: {
            handleTopChange(status) {
                this.topStatus = status;
            },
        },

    }
</script>
