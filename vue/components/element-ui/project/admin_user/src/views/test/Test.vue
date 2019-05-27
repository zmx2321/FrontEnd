<template>
    <section class="main_cont">
        <h2 style="margin-bottom: 50px">test</h2>

        <el-select v-model="selectValue" @change="langChange" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>

        <input type="text" :placeholder="$t('message.hello')">
        {{$t('message.hello')}}

        {{$t('message.hello')}}

        <p v-html="$t('message.hello')"></p>

        <!-- Target -->
        <input id="foo" value="https://github.com/zenorocha/clipboard.js.git">

        <!-- Trigger -->
        <button class="btn" data-clipboard-target="#foo">
            <img src="assets/clippy.svg" alt="Copy to clipboard">
        </button>

        <hr />

        <button class="tag-read" data-clipboard-text="我是可以复制的内容，请点击复制" @click="copy">立即阅读</button>
        <button class="tag-read" data-clipboard-text="我是可以复制的内容，请点击复制ssdsa" @click="copy">立即阅读</button>
    </section>
</template>

<script>
    import Clipboard from 'clipboard'

    export default {
        name: "Test",

        data () {
            return {
                selectValue: '',
                options: [
                    {
                        value: 'cn',
                        label: '中文'
                    }, {
                        value: 'en',
                        label: 'English'
                    }
                ]
            }
        },

        methods: {
            // 语言切换
            langChange(e){
                this.$confirm(this.$t('btn.down'))
                    .then(() => {
                        // console.log(e)
                        localStorage.setItem('lang',e);
                        this.$i18n.locale = e;
                    }).catch(() => {});

            },
            copy() {
                // var clipboard = new this.clipboard('.tag-read')
                var clipboard = new Clipboard('.tag-read')
                clipboard.on('success', e => {
                    console.log('复制成功')
                    // 释放内存
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    // 不支持复制
                    console.log('该浏览器不支持自动复制')
                    // 释放内存
                    clipboard.destroy()
                })
            }
        },
        created : function(){
            console.log(this.$i18n.locale)

            let that = this;
            console.log(localStorage.lang)
            that.selectValue = localStorage.lang == undefined?'cn':localStorage.lang
        }
    }
</script>

<style scoped>

</style>