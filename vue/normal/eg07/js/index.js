new Vue({
    el: "#app",
    components: {
        boxList: {
        	    template: "#boxListTemplate",
        	    components: {
        	    	item: {
        	    	    template: "#itemTemplate",
        	    	}
        	     }
        }
    }
});