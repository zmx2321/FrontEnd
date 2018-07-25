/**
 * Created by liufangzhou on 2016/12/7.
 */

myAppModule.provider("webSocketService", function () {
    this.stompClient = null;
    this.setStompEndPoint = function (endPoint) {
        this.endPoint = endPoint;
    }


    this.$get = function () {
        var self = this;
        var receive = new Date().getTime();
        var service = {
            listen: function (url, handler, scope) {

                if (!self.stompClient) {
                    var socket = new SockJS("http://chat.iboom.tv/" + self.endPoint);
                    self.stompClient = Stomp.over(socket);
                }

                self.stompClient.connect({}, function (frame) {
                    $("#chatInfo").text("连接直播聊天室成功！")
                    self.subUrl = url;
                    self.stompClient.subscribe(url, function (greeting) {
                        receive = new Date().getTime();
                        if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                            scope.$apply(function () {
                                console.log(greeting.body)
                                handler ? handler(JSON.parse(greeting.body), scope) : null;
                            });
                        }
                    });
                });
                return this;
            },
            reSubscribe: function (url) {
                self.stompClient.subscribe(self.subUrl, function (greeting) {
                    if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                        scope.$apply(function () {
                            console.log(greeting.body)
                            handler ? handler(JSON.parse(greeting.body), scope) : null;
                        });
                    }
                });
            },
            say: function (url, data, handler, scope) {
                self.stompClient.send(url, {}, JSON.stringify(data));
                if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                    scope.$apply(function () {
                        handler ? handler(data, scope) : null;
                    });
                }
            }

        };
        return service;
    }
});

myAppModule.config(function (webSocketServiceProvider) {
    webSocketServiceProvider.setStompEndPoint("hello")
})

myAppModule.controller('liveController',
    ["$routeParams", "$scope", '$rootScope', "asyncHttp", "userStatueService", "webSocketService", "$http", "keBiaoService", "TeacherService",
        function ($routeParams, $scope, $rootScope, asyncHttp, userStatueService, webSocketService, $http, keBiaoService, TeacherService) {

            $rootScope.isMenuSelected = 1;
            // var urlNumber = window.location.href.split('?')[1];
            //
            // function GetRequest() {
            //     //获取url中"?"符后的字串
            //     var json = decodeURI(urlNumber);
            //     return json;
            // }
            //
            // var urlInfo = GetRequest();
            //
            // console.log(urlInfo);

            console.log(keBiaoService.getKeBiao(new Date(), 30));
            //获取直播与聊天室的id

            var liveShowId = $routeParams.liveShowId;


            //聊天室的初始化
            $scope.chats = [];
            var speaker = {};
            var group = "default"

            var contentBox = $("#contentBox");

            // $scope.getStatue = function () {
            //     $.get("wx/school/v1.0/statue", function (data, status) {
            //         if (!data.data) {
            //             window.location.href = "index.html?" + window.location.pathname + window.location.search;
            //         } else {
            //             console.log("登录成功！");
            //         }
            //     });
            // };

            $scope.connect = function () {
                $http.get("/pc/school/v1.0/statue").success(function (data) {
                    var auth = data.data.student;
                    console.log(auth);
                    speaker = boomWebSocket.createSpeaker(auth.summoner, auth.studentNum, auth.header ? auth.header : "defaultIco.png");
                    group = auth.areaCode ? auth.areaCode : "default";
                    webSocketService.listen("/topic/greetings/" + liveShowId, function (data, $scope) {
                        $scope.chats.push(data);
                        var move = $("#inner").height()
                        contentBox.scrollTop(move);
                        $scope.toBottom();
                    }, $scope)
                    clearInterval(contectClock)
                }).error(function () {
                })
            }

            var contectClock = setInterval($scope.connect, 3000);

            $scope.myKeyup = function (e) {
                var keycode = window.event ? e.keyCode : e.which;
                console.log("-------")
                if (keycode == 13) {
                    $scope.say();
                }
            };

            $scope.say = function () {
                if ($scope.data) {
                    var data = boomWebSocket.createGroupMessage($scope.data, liveShowId, speaker)
                    webSocketService.say("/app/hello", data, null, $scope);
                    $scope.data = "";
                    $scope.toBottom();
                }
            };
            $scope.toBottom = function () {
                $("#inner").scrollTop(88888);
            };

            $scope.saySome = function () {
                console.log("test");
            };


            //根据ID查找直播

            //初始化直播
            var playerId;
            var player = new CloudLivePlayer();

            function initPlayer() {
                player.init({
                    activityId: playerId,
                    rate: "yuanhua"
                }, "player");
            }

            // function getTeacher(value) {
            //     var thisTeacher;
            //     $.ajax({
            //         async: false,
            //         url: bMock.getFace("teacher"),
            //         success: function (data, status) {
            //             thisTeacher = data.data;
            //         }
            //     });
            //     return thisTeacher;
            // }


            //获取全部老师


            $scope.getThisLive = function () {
                $http.get("/wx/school/v1.0/live/" + liveShowId).success(function (data) {
                    console.log(data);
                    if (data) {
                        playerId = data.data.activityId;
                        initPlayer(playerId);
                        $scope.liveInfo = data.data;
                        $scope.thisTeacher = TeacherService.getTeacherInfo($scope.liveInfo.ownId);
                        console.log($scope.thisTeacher);
                        $scope.thisTeacherName = $scope.thisTeacher.name;
                        $scope.thisTeacherHeader = $scope.thisTeacher.header;
                        console.log()
                    } else {
                        alert("暂无此直播！")
                    }
                }).error(function () {
                })
            }

            $scope.getThisLive();


            //处理BOM课程表

            //点击当前日期显示红色
            $scope.getWeekCurriculumShow = function (v) {
                $scope.isWeekCurriculumShow = v;
                $scope.isWeekdong = v;
            }
            //时间戳转换
            function formatDate(now) {
                var month = now.getMonth() + 1;
                var date = now.getDate();
                var week = now.getDay();
                var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
                var hour = now.getHours();
                var minute = now.getMinutes();
                return weekDay[week];
            }

            //设置当前时间
            $scope.now = new Date().Format("yyyy/MM/dd")
            var weekNow = formatDate(new Date($scope.now));
            var nextWeekNow = formatDate(new Date($scope.now));

            //根据当前时间判断当前周一到周日 并标注当前日期
            switch (weekNow) {
                case "周一" :
                    $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * 0).Format("yyyy/MM/dd"));
                    $scope.isWeekdong = "xian0"
                    break;
                case "周二" :
                    $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * -1).Format("yyyy/MM/dd"));
                    $scope.isWeekdong = "xian1"
                    break;
                case "周三" :
                    $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * -2).Format("yyyy/MM/dd"));
                    $scope.isWeekdong = "xian2"
                    break;
                case "周四" :
                    $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * -3).Format("yyyy/MM/dd"));
                    $scope.isWeekdong = "xian3"
                    break;
                case "周五" :
                    $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * -4).Format("yyyy/MM/dd"));
                    $scope.isWeekdong = "xian4"
                    break;
                case "周六" :
                    $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * -5).Format("yyyy/MM/dd"));
                    $scope.isWeekdong = "xian5"
                    break;
                case "周日" :
                    $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * -6).Format("yyyy/MM/dd"));
                    $scope.isWeekdong = "xian6"
                    break;
            }
            $scope.CurriculumKeBiaos = keBiaoService.getKeBiao($scope.nowWeek, 7);
            console.log(formatDate($scope.nowWeek));


            //点击按钮跳转日期(上一周、下一周)
            var iu = 0
            //上一周
            $scope.JumpLeftbtn = function () {
                var ui = 7 * --iu
                switch (weekNow) {
                    case "周一" :
                        $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * (ui)).Format("yyyy/MM/dd"));
                        break;
                    case "周二" :
                        $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * (ui - 1)).Format("yyyy/MM/dd"));
                        break;
                    case "周三" :
                        $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * (ui - 2)).Format("yyyy/MM/dd"));
                        break;
                    case "周四" :
                        $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * (ui - 3)).Format("yyyy/MM/dd"));
                        break;
                    case "周五" :
                        $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * (ui - 4)).Format("yyyy/MM/dd"));
                        break;
                    case "周六" :
                        $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * (ui - 5)).Format("yyyy/MM/dd"));
                        break;
                    case "周日" :
                        $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * (ui - 6)).Format("yyyy/MM/dd"));
                        break;
                }
                $scope.isWeekCurriculumShow = 0;
                $scope.isWeekdong = 0
                $scope.CurriculumKeBiaos = keBiaoService.getKeBiao($scope.nowWeek, 7);
                $scope.imgshow = false;
            }
            //下一周
            $scope.JumpRightbtn = function () {
                if (iu > 0) {
                    $scope.JumpRightbtn = function () {
                        //阻止继续点击下一周
                    }
                } else {
                    var ui = 7 * iu++
                    switch (nextWeekNow) {
                        case "周一" :
                            $scope.nextWeekNow = new Date(new Date(new Date().getTime() + (3600 * 1000 * 24) * (7 + ui)).Format("yyyy/MM/dd"));
                            break;
                        case "周二" :
                            $scope.nextWeekNow = new Date(new Date(new Date().getTime() + (3600 * 1000 * 24) * (6 + ui)).Format("yyyy/MM/dd"));
                            break;
                        case "周三" :
                            $scope.nextWeekNow = new Date(new Date(new Date().getTime() + (3600 * 1000 * 24) * (5 + ui)).Format("yyyy/MM/dd"));
                            break;
                        case "周四" :
                            $scope.nextWeekNow = new Date(new Date(new Date().getTime() + (3600 * 1000 * 24) * (4 + ui)).Format("yyyy/MM/dd"));
                            break;
                        case "周五" :
                            $scope.nextWeekNow = new Date(new Date(new Date().getTime() + (3600 * 1000 * 24) * (3 + ui)).Format("yyyy/MM/dd"));
                            break;
                        case "周六" :
                            $scope.nextWeekNow = new Date(new Date(new Date().getTime() + (3600 * 1000 * 24) * (2 + ui)).Format("yyyy/MM/dd"));
                            break;
                        case "周日" :
                            $scope.nextWeekNow = new Date(new Date(new Date().getTime() + (3600 * 1000 * 24) * (1 + ui)).Format("yyyy/MM/dd"));
                            break;
                    }
                }
                $scope.CurriculumKeBiaos = keBiaoService.getKeBiao($scope.nextWeekNow, 7);
                $scope.isWeekCurriculumShow = 0;
                $scope.isWeekdong = 0;
                if (iu > 0) {
                    $scope.imgshow = true
                }
            }
            //显示课表数据
            $scope.Exhibition = function (data) {
                // $scope.CurriculumeSlectKeBiao = data.keBiao;
                console.log(data);
                if (data.keBiao) {
                    $scope.CurriculumeSlectKeBiao = data.keBiao;
                    $scope.lackCourse = false;
                } else {
                    $scope.CurriculumeSlectKeBiao = "";
                    $scope.lackCourse = true;
                }
            }


            $scope.getKebiaos = function () {
                var thisDay = new Date();
                // $scope.keBiaos = keBiaoService.getKeBiao(thisDay, 5);
                $scope.CurriculumKeBiaos = keBiaoService.getKeBiao($scope.nowWeek, 7);
                $scope.FirstKeBiao = $scope.CurriculumKeBiaos[0];
                $scope.Exhibition($scope.FirstKeBiao);
            }

            $scope.getKebiaos();

            //获取课程表内容
            // $scope.courseTable = function () {
            //     asyncHttp.get(bMock.getFace("courseTable"), function (data) {
            //         console.log(data);
            //     }, function (data) {
            //         console.log("获取教学状态失败！")
            //     })
            // }
            // $scope.courseTable();
        }]);