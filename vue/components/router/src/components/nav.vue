<template>
  <div>
    <nav class="nav">
      <div class="flex-item"><router-link to="/title1">title1</router-link></div>
      <div class="flex-item"><router-link to="/title2">title2</router-link></div>
      <div class="flex-item"><router-link to="/title3">title3</router-link></div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  };
</script>

<style>
  .nav{
    display:flex;
    width:100%;
    height:40px;
    line-height:40px;
    background-color:#f2f2f2;
  }
    
    .flex-item{
      flex:1;
      color:#04bdb9;
      text-align:center;
    }
</style>
