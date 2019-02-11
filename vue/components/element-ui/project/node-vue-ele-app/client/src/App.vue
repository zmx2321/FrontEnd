<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
    import jwt_decode from "jwt-decode";

    export default {
        // 刷新保存vuex
        name: 'App',

        methods: {
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            }
        },
        created() {
            if (localStorage.eleToken) {
                const decode = jwt_decode(localStorage.eleToken);
                this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
                this.$store.dispatch("setUser", decode);
            }
        }
    };
</script>

<style>
  #app {
    width: 100vw;
    height: 100vh;
  }
</style>
