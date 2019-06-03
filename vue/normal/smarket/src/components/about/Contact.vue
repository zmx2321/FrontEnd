<template>
    <div>
        <h2>联系我们</h2>

        <nav>
            <ul>
                <li>
                    <router-link to="/about/contact/wechat" tag="h3">微信</router-link>
                </li>
                <li>
                    <router-link to="/about/contact/qq" tag="h3">qq</router-link>
                </li>
                <li>
                    <router-link to="/about/contact/email" tag="h3">email</router-link>
                </li>
            </ul>
        </nav>

        <div class="box">
            <router-view />
        </div>
    </div>
</template>

<script>
    export default {
        name: "Contect"
    }
</script>

<style scoped>

</style>