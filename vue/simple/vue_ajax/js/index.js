window.onload = function(){
    var vm = new Vue({
        el:'#box',

        data:{
            msg:'Hello World!',
        },

        methods:{
            getText: function(){
                this.$http.get('text/ajax_info.txt').then(function(res){
                    var textbox = document.getElementById('textbox');

                    console.log(res);
                    console.log(res.bodyText);
                    textbox.innerHTML = res.bodyText;  
                }, function(){
                    console.log('请求失败处理');
                });
            },

            getJson: function(){
                //发送get请求
                this.$http.get('json/ajax_info.json').then(function(res){
                    var textbox = document.getElementById('textbox');

                    console.log(res);
                    console.log(res.bodyText);
                    textbox.innerHTML = res.bodyText;  
                }, function(){
                    console.log('请求失败处理');
                });
            }
        }
    });
}