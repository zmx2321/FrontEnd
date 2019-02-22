<template>
  <div class="container">
    <el-select @change="onSelectType" v-model="value" placeholder="视频类型" style="width: 100%">
      <el-option v-for="item in selectOptions" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>
  
<script>
export default {
  name: "v-select",
  props: {
    selectOptions: {
      type: Array,
      value: [
        {
          id: '选项1',
          name: '全部'
        }
      ]
    }
  },
  data () {
    return {
      value: '',
    }
  },
  methods: {
    onSelectType (value) {
      this.$emit('onSelectType', value)
    }
  }
}
</script>
  
<style lang="scss" scoped>
</style>