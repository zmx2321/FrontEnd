new Vue({
    el: "#app",
    components: {
        father: {
        	    template: "#fatherTemplate",
        	    data() {
        	    	return {
        	    		name: "老王",
        	    		sonData: "",
        	    	}
        	    },

        	    components: {
        	    	son: {
        	    	  template: "#sonTemplate",
                        props: ['fatherdata'],
        	    	}
        	     }
        }
    }
});