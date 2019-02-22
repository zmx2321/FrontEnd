<template>
  <div class="container">
    
            <v-editor :editorContent.sync="editorContent"></v-editor>
  </div>
</template>

<script>
import wangeditor from '@/components/wangeditor/wangeditor';

export default {
  name: 'newsEditor',
  components: {
    "v-editor": wangeditor
  },
  data () {
    return {
      editorContent: '',
    }
  },
  methods: {

  }
    
}
</script>

