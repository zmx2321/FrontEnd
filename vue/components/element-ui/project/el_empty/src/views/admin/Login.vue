<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">{{ mainData.title }}</span>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "login",

        data() {
            return {
                mainData: {
                    title: title
                },
            };
        },

        methods: {
        },
        // 预处理
        created: function(){
        },
    };
</script>

<style scoped>
    .login {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../assets/images/bg.jpg) no-repeat center center;
        background-size: 100% 100%;
    }

    .form_container {
        position: absolute;
        top: 20%;
        left: 34%;
        width: 370px;
        padding: 25px;
        text-align: center;
        border-radius: 5px;
    }

    .form_container .manage_tip .title {
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }

    .loginForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 10px #cccc;
    }

    .submit_btn {
        width: 100%;
    }

    .tiparea p a {
        color: #409eff;
    }
</style>


