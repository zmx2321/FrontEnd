$(function(){
    let json = {a: 1, b:2, c:3};
    let json3 = Object.assign({}, json);
    let json2 = json;
    json.d = 5;
    console.log("json" , json);
    console.log("json2" , json2);
    console.log("json3" , json3);
});