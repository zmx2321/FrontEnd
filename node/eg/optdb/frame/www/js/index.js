angular.module("app", ["ngRoute", "ngSanitize"]).
//服务
constant("api", {
    //接口路径定义

}).
//路由配置
config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "www/temp/home.html"
    })
}).
controller("ctrl", function ($scope) {

});