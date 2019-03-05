<template>
    <section class="main_cont">
        <!--富文本编辑器组件-->
        <el-row>
            <quill-editor
                    v-model="detailContent"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @ready="onEditorReady($event)"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)"
            >
            </quill-editor>
        </el-row>
    </section>
</template>
<script>
    import {
        getImgURI,  // 上传图片
        getVideoURI,  // 上传视频
    } from "../../api/api"

    export default {
        data() {
            return {
                editorOption: {},

                detailContent: "",

                editorOption: {
                    modules: {
                        toolbar: {  // 如果不上传图片到服务器，此处不必配置
                            container: [
                                [{'size': ['small', false, 'large', 'huge']}],
                                [{'align': []}],
                                ['link', 'image', 'video']
                            ],  // container为工具栏，可自行配置
                            handlers: {
                                'image': function () {  // 劫持原来的图片点击按钮事件
                                    document.querySelector('.ql-image').click()
                                },
                                'video':function(val){
                                    document.querySelector('.ql-video').click()
                                }
                            }
                        }
                    },
                    theme: 'snow',
                    placeholder: '填写内容',
                }  // 必须初始化为对象 init  to Object
            }
        },
        methods: {
            /**
             * 富文本
             */
            // 准备编辑器
            // editor
            onEditorReady() {
                console.log("准备编辑器");
            },
            // 失去焦点事件
            onEditorBlur(){
                console.log("失去焦点事件");
            },

            // 获得焦点事件
            onEditorFocus(){
                console.log("获得焦点事件");
            },

            // 内容改变事件
            onEditorChange(){
                console.log("内容改变事件");
            },
        }
    }
</script>