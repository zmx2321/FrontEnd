export const publicMixin = {
  data() {
    return {
      // 通用分页的mixin字段
      pageNum: 1,
      pageSize: 10,
      total: 1,

      // 分类分页的mixin字段
      pageNumShop: 1,
      pageSizeShop: 10,
      totalShop: 1,

      // 分类分页的mixin字段
      pageNumNews: 1,
      pageSizeNews: 10,
      totalNews: 1,
    }
  },
  methods: {
    // 筛选搜索条件--返回非空字段
    _dealSearchList(object) {
      let newObject = {}
      for (const key in object) {
        if (object[key] !== '' && object[key] !== null) {
          newObject[key] = object[key]
        }
      }
      return newObject
    },

    // 校验是否空值
    _hasNull (object) {
      for (const key in object) {
        if (object[key] == '') {
          this.$message('请输入完整信息后提交！')
          return false
        }
      }
      return true
    },

  }
}
