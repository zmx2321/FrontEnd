new Vue({
    el: "#app",
    components: {
        father: {
        	    template: "#fatherTemplate",
        	    data() {
        	    	return {
        	    		name: "老王",
        	    		sondata: "",
        	    	}
        	    },

               methods: {
                    // 拿到子组件给父组件传递的值
                    getval(val) {
                        this.sondata = val;
                    }
               },

        	     components: {
        	    	son: {
        	    	  template: "#sonTemplate",
                        props: ['fatherdata'],
                        data () {
                            return {
                                // 只能通过事件给父组件传数据(自定义事件)
                                // 在发数据的组件(子组件) 定义一个方法
                                message: "你好，我是小王~~~~~",
                            }
                        },

                        methods: {
                            // 给父组件传数据
                            send() {
                                // alert();
                                // 触发自定义事件
                                // $emit("事件名称", 传递的数据)
                                this.$emit("getdata",  this.message);
                            }
                        }
        	    	}
        	     }
        }
    }
});