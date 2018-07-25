/**
 * Created by liufangzhou on 2016/11/23.
 */
/**
 * Created by liufangzhou on 2016/11/22.
 */

myAppModule.controller('activityBeforeController',
    ["userStatueService", "asyncHttp", "$routeParams", "$scope", '$rootScope', "userStatueService", function (userStatueService, asyncHttp, $routeParams, $scope, $rootScope, userStatueService) {

        var activityId = $routeParams.activityId;

        var thisApi = {
            matchDetail: {
                dev: "/app/mock/mockapi/matchDetailBefore.json",
                product: "/pc/school/v1.0/getGoingMatchDetail?id="
            },//获取当前活动的所有评论
            matchDiscusses: {
                dev: "/pc/school/v1.0/match/discusses?matchId=",
                product: "/pc/school/v1.0/match/discusses?matchId="
            },//评论当前活动
            createDiscuss: {
                dev: "/pc/school/v1.0/match/discuss",
                product: "/pc/school/v1.0/match/discuss"
            }

        };
        bMock.setFace(thisApi);
        bMock.setEnv("product");

        $rootScope.isMenuSelected = 3;

        $scope.userInfo = userStatueService.getStatue();
        console.log($scope.userInfo);

        //处理活动页首页轮播
        $scope.getMatchDetail = function () {
            asyncHttp.get(bMock.getFace("matchDetail", activityId), function (data) {
                if (data.error) {
                    console.log("获取活动详情失败！");
                    return;
                }
                var matchDetail = data.data;
                $scope.matchDetail = matchDetail;
                $scope.detail = matchDetail.match;
                $scope.players = matchDetail.players;
                $scope.matchTeams = matchDetail.matchTeams;

            }, function () {
                console.log("获取活动页轮播失败！")
            })
        }
        $scope.getMatchDetail();

        //获取评论
        $scope.getDiscusses = function () {
            asyncHttp.get(bMock.getFace("matchDiscusses", activityId), function (data) {
                if (data.data.length > 0) {
                    $scope.discusses = data.data;
                    $scope.lackDiscuss = false;
                    $scope.isOpensend = false;
                } else {
                    $scope.lackDiscuss = true;
                }

            }, function () {
                console.log("获取活动页轮播失败！")
            })
        }

        $scope.getDiscusses();

        // var dis = {
        //     relationId: activityId,
        //     who: "1",
        //     content: "我是一只小小小小鸟意大利修宪公投结果出炉，总理伦齐承认公投失败并提出辞职，年内又一黑天鹅事件成真。这场包括改革官僚体系及行政结构、削减参议院名额加强中央集权等在内的改革终究没有成真。不过专家说了，这事儿对中国影响不大~",
        //     prise: 10,
        //     low: 10
        // };

        $scope.isOpenSend = false;
        $scope.openSend = function () {
            $scope.isOpensend = true;
        }

        $scope.sendDiscuss = function () {
            console.log("11");
            var dis = {
                relationId: activityId,
                who: $scope.userInfo.student.studentNum,
                content: $scope.activityDiscuss,
                prise: 10,
                low: 10
            };
            if ($scope.activityDiscuss) {
                console.log("发现内容1");
                asyncHttp.create(bMock.getFace("createDiscuss"), dis, function (data) {
                    console.log(data);
                    $scope.getDiscusses();
                }, function () {
                    console.log("提交评论失败！")
                })
            } else {
                layer.alert("评论无内容");
            }
        }

        $scope.discusses = function () {//提交评论
            console.log("发现内容0");
            // console.log($scope.activityDiscuss);
            // var dis = {
            //     relationId: activityId,
            //     who: $scope.userInfo.student.studentNum,
            //     content: $scope.activityDiscuss,
            //     prise: 10,
            //     low: 10
            // };
            console.log("发现内容1");
            // if ($scope.activityDiscuss) {
            //     console.log("发现内容1");
            //     asyncHttp.create(bMock.getFace("matchDiscuss"), dis, function (data) {
            //         console.log(data);
            //         $scope.getDiscusses();
            //     }, function () {
            //         console.log("提交评论失败！")
            //     })
            // } else {
            //     layer.alert("评论无内容");
            // }
        }

    }])
;
