namespace("math", [], function(){
    function add(a, b){ return a + b }
    function sub(a, b){ return a - b }

    return {
        add: add,
        sub: sub
    }
});

namespace("caculator", ["math"], function(m){
    var action = "add";
    function compute(a, b){
        return m[action](a, b);
    }
    return {
        compute: compute
    }
})