window.onload = function(){
    //实例化
    new Vue({
        //作用域
        el: ".container",

        //初始数据
        data: {
            skname: "",
			skage: "",
			tip: "等待",  //提示信息
			//每个用户占用一个数据
			userinfo: [
				{name: "aaa", age: "88"},
			],
        },

        //预处理数据
        computed: {

        },

        //函数（事件）
        methods: {
        	add: function(){
            	//获取用户名年龄
            	//console.log(this.skname, this.skage);

            	//假如用户名和年龄不为空(存在)
            	if(this.skname && this.skage){
            		this.userinfo.push(
            			{
            				name: this.skname,
            				age: this.skage
            			}
            		);

            		this.tip = "<b style='color:green'>用户信息添加成功</b>";
            	} else {
            		this.tip = "<b style='color:red'>请注意输入用户名与年龄</b>";
            	}
            },

            reset: function(){
            	/*this.skname = "";
            	this.skage = "";*/

                this.skname = this.skage = "";
            },

            del: function(num){
            	//splice() 方法可删除从 index 处开始的零个或多个元素
            	//并且用参数列表中声明的一个或多个值来替换那些被删除的元素
            	//this.userinfo.splice(this.index, 1);
            	
            	console.log(num);
            	this.userinfo.splice(num, 1);
            },

            clear: function(){
				this.userinfo = [];
            }
        },

        //监听（初始化数据和预处理数据）
        //自动，随时监测
        watch: {
        	//监听的两个参数（固定）
        	//第一个参数：当前的数据
        	//第二个参数：上一次的数据
        	skage: function(newv, oldv){
        		//console.log(newv, oldv);

        		if(newv>120 || newv<1){
        			//this.skage = oldv;  //上一次输入的值
        			this.tip = "<b style='color:red'>年龄输入有误</b>";
        		} else {
        			this.tip = "等待";
        		}
        	}
        }
    });
}