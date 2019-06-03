<template>
  <li>
    <slot name="title"></slot>
    <slot name="price"></slot>
  </li>
</template>

<script>
export default {
  name: 'Menu-list',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
