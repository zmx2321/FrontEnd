import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 存储数据
  state: {
    dishes: [
        {name: "可乐", price: 33},
        {name: "雪碧", price: 44},
    ],
  },
  // 获取数据
  getters: {

  },
  // 管理数据
  mutations: {

  },
  // 操作mutations
  actions: {

  }
})
