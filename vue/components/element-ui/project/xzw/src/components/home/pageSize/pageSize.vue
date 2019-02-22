<template>
  <div class="container">
    <el-pagination 
      @current-change = "onCurrentChange"
      background layout="prev, pager, next" 
      :page-size="pageSize"
      :current-page="currentPage"
      :total="1000">
    </el-pagination>
  </div>
</template>
  
<script>
export default {
  name: "v-pagesize",
  props:{
    pageSize:{
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      currentPage: 1,
    };
  },
  methods:{
    onCurrentChange(value){
      this.$emit('onPageNum', value)
    }
  }
}
</script>
  
<style lang="scss" scoped>
.container{
  text-align: right;
}
</style>