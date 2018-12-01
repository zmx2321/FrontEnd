/**
 * http://www.coolneng.com/wap/json/cates/（栏目）301
 * http://www.coolneng.com/wap/json/list.php?fid=3（栏目中的列表）
 * http://www.coolneng.com/wap/json/show.php?tid=574（列表具体内容）
 */
Vue.use(VueResource);

var skrouter = new VueRouter({
    routes: [
        {
            path: "/", 
            component: {
                template:"<div class='mgtp box'>首页内容</div>", 
            }
        },
        {
            path: "/cate", 
            component: {
                template:"#cate", 

                data: function(){
                    return {
                        apidata: [], 
                        apiurl: "http://www.coolneng.com/wap/json/cates/",
                    }
                },
                //在创建的时候监听接口
                created: function(){
                    var that = this;  //这里的this值vue实例

                    //jquery方法
                    /*$.ajax({
                        type: 'get',
                        url: this.apiurl,
                        data: {},
                        dataType: 'json',
                        success: function(data, status){
                            //console.log(data.content);

                            that.apidata = data.content;
                            //console.log(this.apidata);
                        }
                    });*/
                    $.getJSON(this.apiurl, function(res){
                        that.apidata = res.content;
                    });
                }
            }
        },
        {
            path: "/list/:fid",  //列表页
            component: {
                template:"#list",

                data: function(){
                    //console.log(this.$route.params.fid);

                    return {
                        apidata: [], 
                        apiurl: "http://www.coolneng.com/wap/json/list.php?fid=" + this.$route.params.fid,
                    }
                },

                //在创建的时候监听接口
                created: function(){
                    var that = this;  //这里的this值vue实例

                    //jquery方法
                    $.ajax({
                        type: 'get',
                        url: this.apiurl,
                        data: {},
                        dataType: 'json',
                        success: function(data, status){
                            //console.log(data);
                            //console.log(data.content);

                            that.apidata = data.content;
                            //console.log(that.apidata);
                        }
                    });
                }
            }
        },
        {
            path: "/show/:tid",  //列表详情页面
            component: {
                template:"#show",

                data: function(){
                    console.log(this.$route.params.tid);

                    return {
                        apidata: [], 
                        apiurl: "http://www.coolneng.com/wap/json/show.php?tid=" + this.$route.params.tid,
                    }
                },

                //在创建的时候监听接口
                created: function(){
                    /*var that = this;  //这里的this值vue实例

                    //jquery方法
                    $.ajax({
                        type: 'get',
                        url: this.apiurl,
                        data: {},
                        dataType: 'json',
                        success: function(data, status){
                            //console.log(data);
                            //console.log(data.content);

                            that.apidata = data.content;
                            console.log(that.apidata);
                        }
                    });*/
                    this.$http.get(this.apiurl).then(res=>{
                        this.apidata = res.body.content;
                        console.log(this.apidata);
                    }, res=>{
                        console.log("error");
                    });
                }
            }
        }
    ]
});

//实例化
new Vue({
    //路由
    router: skrouter,

    //作用域
    el: ".container",

    //初始数据
    data: {
        
    },

    //预处理数据
    computed: {
        
    },

    //函数（事件）
    methods: {
        
    },

    //监听
    watch: {

    }
});
