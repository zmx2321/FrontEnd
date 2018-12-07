/**
 * 代码很简单，就是暴露一个返回结果是「Hello World !」的方法，「Hello World !」会被放在请求结果的 data 里。
 */

module.exports = async ctx => {
  ctx.state.data = "Hello World !"
}