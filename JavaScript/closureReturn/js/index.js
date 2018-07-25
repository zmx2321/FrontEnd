function a(b){
    var c = 1;
    return function d(b){
        return c + b;
    }
}

var test = a(3);
console.log(test);