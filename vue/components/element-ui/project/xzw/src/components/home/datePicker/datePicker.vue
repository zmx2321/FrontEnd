<template>
  <div class="container">
  <el-date-picker
      v-model="value"
      @change="onSelectDate"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      fformat="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd">
    </el-date-picker>
  </div>
</template>
  
<script>
export default {
  name: "v-date-picker",
  data () {
    return {
      value: ''
    };
  },
  methods:{
    onSelectDate(params) {
      this.$emit('onSelectDate', params)
    }
  },
}
</script>
  
<style lang="scss" scoped>
.container{
  .el-date-editor--daterange.el-input__inner{
    width: 100%;
  }
}
</style>