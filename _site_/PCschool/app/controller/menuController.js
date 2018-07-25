/**
 * Created by liufangzhou on 2016/11/24.
 */
/**
 * Created by liufangzhou on 2016/11/23.
 */
/**
 * Created by liufangzhou on 2016/11/22.
 */

myAppModule.controller('menuController',
    ["$routeParams", "$scope", '$rootScope', "asyncHttp", "userStatueService", function ($routeParams, $scope, $rootScope, asyncHttp, userStatueService) {

        // $scope.getStatus = function () {
        //     asyncHttp.get(bMock.getFace("statue"), function (data, status) {
        //         if (!data.data) {
        //             // window.location.href = "index.html?" + window.location.pathname + window.location.search;
        //             console.log("登录失败！");
        //         } else {
        //             console.log("登录成功！");
        //         }
        //     });
        // };

        $scope.mes = "menu";
        console.log($scope.mes);

        // $scope.getStatus();

        $scope.menuSelected = function (num) {
            $rootScope.isMenuSelected = num;
        }

        $scope.userStatueInfo = userStatueService.getStatue();
        console.log($scope.userStatueInfo);


    }]);
