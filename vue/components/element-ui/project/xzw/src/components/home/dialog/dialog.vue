<template>
  <div class="container">
    <el-dialog :title="dialogTitle" :visible.sync="isShow" :width="dialogWidth" @close="onClose">
      <!-- <span>这是一段信息</span> -->
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
export default {
  name: "v-dialog",
  props: {
    dialogVisible: {
      type: Boolean,
      value: false,
    },
    dialogTitle: {
      type: String,
      value: '标题'
    },
    dialogWidth:{
      type: String,
      value: "30%"
    },
  },
  watch: {
    dialogVisible: function (val) {
      this.isShow = val
    },
  },
  data () {
    return {
      isShow: false
    };
  },
  methods: {
    onCancel () {
      this.$emit("onCancel", false)
    },
    onSure () {
      this.$emit("onSure", false)
    },
    onClose () {
      this.$emit("onClose", false)
    },
  }
}
</script>
  
<style lang="scss" scoped>
</style>