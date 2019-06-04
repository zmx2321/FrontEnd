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
    // 这里面的方法会接收一个参数，就是上面的state
    changePrice(state) {
      const oldData = state.dishes;

      const newData = oldData.map(value => {
          // 把人民币换成泰铢
          return {
              name: value.name,
              price: value.price * 5
          }
      });

      return newData;
    }
  },
  // 管理数据
  //  同步
  mutations: {
      // 支持传参(payload)从第二个参数开始，就是对应的调用的时候传过来的参数
      discount(state, dis) {
          state.dishes.forEach(ele =>{
              ele.price *= dis/10;
              // 保留两位小数  ele.price.toFixed(2);
              // ele.price = Math.round((ele.price*dis/10)*100)/100;
              // ele.price = (ele.price*dis/10).toFixed(2);
          })
      }

      // 测试同步
      // 点击多次，记录每次点击状态，点任何一个状态都是最初的状态
      /*discount(state, dis) {
          // 定时器
          setTimeout(()=> {
              state.dishes.forEach(ele =>{
                  ele.price = (ele.price*dis/10).toFixed(2);
              })
          }, 2000);
      }*/
  },
  // 操作mutations
  // 异步
  actions: {
      // 第一个参数不是state,是类似store对象的实例
      discount(context, dis) {
          // console.log(context);

          // context.commit();  // ***执行mutations
          /*state.dishes.forEach(ele =>{
              ele.price = (ele.price*dis/10).toFixed(2);
          })*/

          setTimeout(()=> {
              context.commit("discount", dis);
          }, 2000);
      }
  }
})
