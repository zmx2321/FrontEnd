function getcookie(name){
    let skvalue = null;  //定义一个null变量
    let arr = document.cookie.split(";");  //分离出name,value

    console.log(arr);

    for(let item in arr){
        let arr2 = arr[item].split("=");  //分离出name, value节点

        //清理前面的空格
        if(arr2[0].trim() == name){
            skvalue = arr2[1];  //赋值value给变量
            break;
        }

        //console.log(arr2, arr2.trim());
    }

    //判断变量是否为null
    if(skvalue != null){
        return skvalue
    } else {
        return false;
    }
}

console.log(getcookie("userid"));

angular.module("app", []).controller("listCtrl", function ($scope, $http, $rootScope) {
    $http({
        method: "get",
        //url: "/userinfo/5c05c1ef2a8f974f8c5b2d0f"
        url: "userinfo" + getcookie("userid")
    }).then(function (res) {
        console.log(res.data);
        $rootScope.listdata = res.data;
    }, function (e) {
        console.log(e);
    })
});