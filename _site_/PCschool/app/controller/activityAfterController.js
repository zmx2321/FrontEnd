/**
 * Created by liufangzhou on 2016/11/23.
 */
/**
 * Created by liufangzhou on 2016/11/22.
 */

myAppModule.controller('activityAfterController',
    ["userStatueService", "asyncHttp", "$routeParams", "$scope", '$rootScope', "userStatueService", function (userStatueService, asyncHttp, $routeParams, $scope, $rootScope, userStatueService) {

        var activityId = $routeParams.activityId;

        if (!activityId) {
            window.history.go(-1);
            return;
        }

        var thisApi = {
            matchDetail: {
                dev: "/app/mock/mockapi/matchDetailAfter.json",
                product: "/pc/school/v1.0/getReviewMatchDetail?id="
            }
        };
        bMock.setFace(thisApi);
        bMock.setEnv("dev")

        $rootScope.isMenuSelected = 3;

        $scope.winTeam = [];

        //处理活动页首页轮播
        $scope.getMatchDetail = function () {
            asyncHttp.get(bMock.getFace("matchDetail"), function (data) {
                if (data.error) {
                    console.log("获取活动详情失败！");
                    return;
                }
                var match = data.data.match;

                //活动数据
                $scope.match = match.match;
                console.log($scope.match);
                $scope.players = match.players;
                $scope.matchTeams = match.matchTeams;

                angular.forEach($scope.matchTeams, function (data) {
                    if (data) {
                        data.rank ? ($scope.winTeam[data.rank] = data) : "";
                    }
                })


                console.log($scope.winTeam)
                //视屏数据
                console.log(data.data.videos.length > 0);
                if (data.data.videos) {
                    $scope.videos = data.data.videos;
                    $scope.lackVideo = false;
                } else {
                    $scope.lackVideo = true;
                }


            }, function () {
                console.log("获取活动详情失败！！")
            })
        }
        $scope.getMatchDetail();

    }]);
