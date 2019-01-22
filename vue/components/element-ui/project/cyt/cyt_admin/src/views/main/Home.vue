<template>
    <section class="home">
        <div class="container">
            <p class="lead">{{ mainData.title }}</p>
        </div>
    </section>
</template>

<script>
    export default {
        name: "home",

        data () {
            return {
                mainData: {
                    title: title
                }
            }
        },
        created (){
            // console.log(aa);
        }
    };
</script>

<style scoped>
    .home {
      padding: 0;
      width: 100%;
      height: 100%;
      background: url(../../assets/images/showcase.png) top no-repeat;
      background-size: 100% 100%;
    }

    .container {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 100px;
        background-color: rgba(0, 0, 0, 0.7);
        text-align: center;
        color: white;
    }

    .lead {
        margin-top: 50px;
        font-size: 22px;
    }
</style>