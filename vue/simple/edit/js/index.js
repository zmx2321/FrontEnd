var demo = new Vue({
    el: '#main',
    data: {
        show_tooltip: false,
        text_content: '点我，并编辑内容。'
    },
    methods: {
        hideTooltip: function(){
            // 在模型改变时，视图也会自动更新
            this.show_tooltip = false;
        },
        toggleTooltip: function(){
            this.show_tooltip = !this.show_tooltip;
        }
    }
})