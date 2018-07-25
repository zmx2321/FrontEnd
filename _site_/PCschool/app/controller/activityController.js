/**
 * Created by liufangzhou on 2016/11/23.
 */
/**
 * Created by liufangzhou on 2016/11/22.
 */

myAppModule.controller('activityController',
    ["userStatueService", "asyncHttp", "$routeParams", "$scope", '$rootScope', "userStatueService",
        function (userStatueService, asyncHttp, $routeParams, $scope, $rootScope, userStatueService) {

            var thisApi = {
                matchCarousel: {
                    dev: "/app/mock/mockapi/matchCarousel.json",
                    product: "/pc/school/v1.0/matchCarousel?model=活动页轮播图"
                }, matches: {
                    dev: "/app/mock/mockapi/getMatchList.json",
                    product: "/pc/school/v1.0/getMatchList?groupType=6"
                }
            };
            bMock.setFace(thisApi);
            bMock.setEnv("product");

            $rootScope.isMenuSelected = 3;

            //处理活动页首页轮播
            $scope.showHand = function () {
                asyncHttp.get(bMock.getFace("matchCarousel"), function (data) {
                    if (data.data && data.data.carouselDtos && data.data.carouselDtos.length > 0) {
                        $scope.matchCarsouel = data.data.carouselDtos[0];
                        console.log($scope.matchCarsouel);
                        $scope.hasHeader = true;
                    } else {
                        $scope.hasHeader = false;
                    }
                }, function () {
                    console.log("获取活动页轮播失败！")
                })
            }
            $scope.showHand();

            $scope.allMatch = null;

            //处理所有的比赛列表
            $scope.getAllMatches = function () {

                $scope.isSelectEnd = false;

                if ($scope.allMatch) {
                    $scope.matches = angular.copy($scope.allMatch);
                }
                asyncHttp.get(bMock.getFace("matches"), function (data) {
                    if (data.data && data.data.length > 0) {
                        $scope.matches = data.data;
                        $scope.allMatch = data.data;
                        console.log(data.data);
                    }
                }, function () {
                    console.log("获取活动页活动列表失败！")
                })
            }
            $scope.getAllMatches();

            function filterEndMatch(matches) {
                var m = [];
                angular.forEach(matches, function (data) {
                        if (!data.endTime) {
                            return;
                        }
                        if (data.endTime < (new Date().getTime())) {
                            m.push(data);
                        }
                    }
                )
                return m;
            }

            $scope.getEndMatches = function () {
                $scope.isSelectEnd = true;
                if ($scope.allMatch) {
                    $scope.matches = filterEndMatch($scope.allMatch);
                    return;
                }
                asyncHttp.get(bMock.getFace("matches"), function (data) {
                    if (data.data && data.data.length > 0) {
                        $scope.matches = filterEndMatch($scope.allMatch);
                        console.log(data.data);
                    }
                }, function () {
                    console.log("获取活动页活动列表失败！")
                })
            }

            //处理activity，之前


        }
    ]);
