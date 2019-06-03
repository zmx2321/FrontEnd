new Vue({
    el: "#app",
    components: {
        boxList: {
            template: "#boxListTemplate",
            // props 在组件上定义一些属性来传递数据
            props: ["title", "price"]
        }
    }
});