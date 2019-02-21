<template>
    <section class="home">
        <div class="container">
            <p class="lead">{{ mainData.title }}</p>
        </div>
        <ul class="bottom">
            <li>powered by</li>
            <li>
                <a href="http://ximuok.com">ximuok.com</a>
            </li>
        </ul>
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
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .bottom{
        position: absolute;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%);
    }

    .bottom li{
        display: inline-block;
        color: #757575;
    }

    .bottom li a{
        color: #757575;
        transition: 0.2s linear;
    }

    .bottom li a:hover{
        color: #bdbdbd;
        transition: 0.3s linear;
    }

    .bottom li:not(:last-child){
        margin-right: 8px;
    }
</style>