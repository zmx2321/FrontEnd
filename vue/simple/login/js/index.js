window.onload = function(){
    //实例化
    new Vue({
        //作用域
        el: ".container",

        //初始数据
        data: {
            //切换卡
            tab: false,
            //用户信息进行双向绑定
            skname: '',
            skpwd: '',
            skpwd2: '',
            skpic: '',
            userlist: [],
            //注册按钮是否可以点击
            //resubmit: true,
            //注册提示
            tip: [],
        },

        //预处理数据
        //让用户根据初始数据有一个预先处理的结果（数据判断）
        //实时监听，但比实际步骤慢一步
        computed: {
            //用户信息数据符合条件为false，否则为true
            resubmit: function(){
                //检测用户名[4~6]
                var checkname;
                if(this.skname.length>=4 && this.skname.length<=6){
                    checkname = true;

                    this.tip[0] = "<b class='green'>用户名正确<b>";  //提示
                } else {
                    checkname = false;

                    this.tip[0] = "<b class='red'>用户名(4~6)</b>";
                }

                //检测密码[6~12]
                var checkpwd;
                if(this.skpwd.length>=6 && this.skpwd.length<=12){
                    checkpwd = true;

                    this.tip[1] = "<b class='green'>密码正确<b>";
                } else {
                    checkpwd = false;

                    this.tip[1] = "<b class='red'>密码(6~12)</b>";
                }

                //检测重复密码
                var checkpwd2;

                //预处理触发事件，让checkpwd2接收返回值
                //this表示vue整个实例（包括方法）
                checkpwd2 = this.mycheckskpwd2();

                //检测头像（是否存在[不为空]）
                var checkskpic;
                if(this.skpic){
                    checkskpic = true;

                    this.tip[3] = "<b class='green'>正确<b>";
                } else {
                    checkskpic = false;

                    this.tip[3] = "<b class='red'>错误</b>";
                }
                

                //全局(所有输入)检测
                if(checkname && checkpwd && checkpwd2 && checkskpic){
                    return false;  //注册可用
                } else {
                    return true;  //注册不可用
                }
            }
        },

        //函数（事件）
        methods: {
            //解决重复密码监听滞后性
            //事件在触发的过程中间具有实时性
            mycheckskpwd2: function(){
                if(this.skpwd == this.skpwd2 && this.skpwd2){
                    this.tip[2] = "<b class='green'>重复密码正确<b>";

                    return true;
                } else {
                    this.tip[2] = "<b class='red'>重复密码错误</b>";

                    return false;
                }
            },

            //提交注册
            submitreg: function(){
                this.userlist.push(
                    {
                        name: this.skname,
                        pwd: this.skpwd,
                        pic: this.skpic
                    }
                );
                console.log(this.userlist[0]);
                console.log(this.userlist[0].name);

                //切换到登陆
                this.tab = true;
            }
        },

        //监听
        watch: {
            //解决位数不正确（滞后性）
            //监听密码
            skpwd: function(newv, oldv){
                if(newv.length>=6 && newv.length<=12){
                    this.tip[1] = "<b class='green'>密码正确<b>";
                } else {
                    this.tip[1] = "<b class='red'>密码(6~12)</b>";
                }
            },

            //监听重复密码
            skpwd2: function(newv, oldv){
                this.mycheckskpwd2();
            }
        }
    });
}