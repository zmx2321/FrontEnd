new Vue({
    el: "#app",
    // 局部组件中都带s，全局只能生成一个没有s
    components: {
        // 组件名
        navBar: {
            template: "#navTemplate",
            data() {
                return {
                    text: ["食材1", "食材2"],
                }
            },
            methods: {
                log() {
                    console.log("点击");
                }
            }
        },
        // 组件名
        navList: {
            template: "#navListTemplate",
        },
        // .....
    }
});


new Vue({
    el: "#box",
});