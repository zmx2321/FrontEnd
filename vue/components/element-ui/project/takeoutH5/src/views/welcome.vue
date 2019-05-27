<template>
  <div class="loader">
  <img src="../assets/img/start.png">
  </div>
</template>

<script>
export default {
  ready () {
    setTimeout(() => {
      this.$route.router.go({path: '/seller', replace: true})
    }, 1500)
  }
}
</script>

<style scoped>

.loader {
  width: 100%;
  height: 100%;
  z-index: 1100;
  position: absolute;
  background-color: white;
}
.loader img{
  width: 100%;
}
</style>
