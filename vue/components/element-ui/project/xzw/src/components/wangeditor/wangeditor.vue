<template>
  <div id="wangeditor">
    <div id="editorElem" ref="editorElem" style="text-align:left"></div>
  </div>
</template>

<script>
import NewsModel from '@/models/news-model.js';
import E from 'wangeditor';
const newsModel = new NewsModel();
const editor = new E('#editorElem')

export default {
  name: 'wangeditor',
  props: ['editorContent'],

  watch:{
    editorContent: function(value){
      editor.txt.html(value)
    }
  },

  data () {
    return {
      _editorContent: null
    }
  },
  mounted () {
    // var editor = new E(this.$refs.editorElem)        //创建富文本实例
    editor.customConfig.onchange = (html) => {
      this.$emit('update:editorContent', html)  //把这个html传入父组件
    }

    editor.customConfig.uploadImgServer ='/admin/upload/uploadImage'
    editor.customConfig.uploadFileName = 'file'
    editor.customConfig.withCredentials = true // 跨域传递 cookie
    editor.customConfig.zIndex = 100
    editor.customConfig.uploadImgMaxLength = 10
    editor.customConfig.showLinkImg = false // 隐藏“网络图片”tab
    editor.customConfig.uploadImgHeaders = {
      'Accept': '*/*',
    }

    editor.customConfig.customUploadImg = (files, insert) => {
      if(files.length == 0){
        return 
      }
      
      for (let i = 0; i < files.length; i++) {
        const formdata = new FormData();
        const element = files[i];
        formdata.append('file', files[i]);

        newsModel.uploadImages(formdata).then((result) => {
          const imgUrl = result.data
          insert(imgUrl)
        }).catch((err) => {
          console.log(err);
        });
      }

    }
    editor.create()
  },
}
</script>

<style lang="scss" scoped>

</style>
