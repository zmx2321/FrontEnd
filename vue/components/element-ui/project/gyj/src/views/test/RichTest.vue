<template>
    <section class="main_cont">
        <!-- 图片上传组件辅助-->
        <el-upload
                class="avatar-uploader"
                :action="serverUrl"
                name="img"
                :headers="header"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload="beforeUpload">
        </el-upload>
        <!--富文本编辑器组件-->
        <el-row v-loading="quillUpdateImg">
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
    // 工具栏配置
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ]

    import {
        getImgURI,  // 上传图片
        getVideoURI,  // 上传视频
    } from "../../api/api"

    export default {
        data() {
            return {
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                serverUrl: 'https://jsonplaceholder.typicode.com/posts/',  // 这里写你要上传的图片服务器地址
                header: {
                    // cookieName: document.cookie.indexOf("JSESSIONID" + "=")
                    // token: sessionStorage.token
                },  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
                detailContent: '', // 富文本内容
                editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        console.log("上传图片", value);
                                        // 触发input框选择图片文件
                                        document.querySelector('.avatar-uploader input').click();
                                        // document.querySelector('.ql-image').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                },
                                'video': function (value) {
                                    if (value) {
                                        console.log("上传视频", value);
                                        // 触发input框选择图片文件
                                        document.querySelector('.avatar-uploader input').click()
                                        // document.querySelector('.ql-video').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                }
                /*editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('#quill-upload input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                }*/
            }
        },
        methods: {
            // 富文本图片上传前
            beforeUpload() {
                // 显示loading动画
                this.quillUpdateImg = true
            },

            uploadSuccess(res, file) {
                console.log(file);

                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill

                let formData = new FormData();
                formData.append('file', file.raw);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                /*getImgURI(formData, config).then(res => {
                    // console.log(res);

                    if (res.status == "200"){
                        // 获取光标所在位置
                        let length = quill.getSelection().index;
                        // 插入图片  res.info为服务器返回的图片地址
                        quill.insertEmbed(length, 'image', res.data.data)
                        // 调整光标到最后
                        quill.setSelection(length + 1)
                    } else {
                        this.$message.error('图片插入失败')
                    }
                });*/
                getVideoURI(formData, config).then(res => {
                    console.log(res);

                    if (res.status == "200"){
                        // 获取光标所在位置
                        let length = quill.getSelection().index;
                        // 插入图片  res.info为服务器返回的图片地址
                        quill.insertEmbed(length, 'video', res.data.data)
                        // 调整光标到最后
                        quill.setSelection(length + 1)
                    } else {
                        this.$message.error('视频插入失败')
                    }
                });

                // loading动画消失
                this.quillUpdateImg = false
            },

            // 富文本图片上传失败
            uploadError() {
                // loading动画消失
                this.quillUpdateImg = false
                this.$message.error('文件插入失败')
            },


            /**
             * 富文本
             */
            // 准备编辑器
            // editor
            onEditorReady() {
                // console.log("准备编辑器");
            },
            // 失去焦点事件
            onEditorBlur(){
                // console.log("失去焦点事件");
            },

            // 获得焦点事件
            onEditorFocus(){
                // console.log("获得焦点事件");
            },

            // 内容改变事件
            onEditorChange(){
                // console.log("内容改变事件");
            },
        }
    }
</script>