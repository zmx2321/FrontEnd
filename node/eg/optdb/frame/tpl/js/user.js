angular.module("app", []).controller("listCtrl", function ($scope, $http, $rootScope) {
    $http({
        method: "get",
        url: "/json"
    }).then(function (res) {
        console.log(res.data);
        $rootScope.listdata = res.data;
    }, function (e) {
        console.log(e);
    })
});