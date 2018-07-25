/**
 * Created by liufangzhou on 2016/11/23.
 */
myAppModule.controller('courseRecordingController',
    ["$routeParams", "videoService", "$scope", '$rootScope', "asyncHttp", "LabService", "keBiaoService", "TeacherService", "userStatueService", "DataCheckService", "$sce",
        function ($routeParams, videoService, $scope, $rootScope, asyncHttp, LabService, keBiaoService, TeacherService, userStatueService, DataCheckService, $sce) {

            $rootScope.isMenuSelected = 1;

            var courseId = $routeParams.courseId;

            if (!courseId) {
                //如果没有courseId，返回
                history.go(-1);
            }

            $scope.imgRoot = "http://static.iboom.tv/static/img/";

            var thisApi = {
                courseId: {
                    product: "/pc/school/course/v1.0/courseDetail?courseId="
                },
                discuss: {
                    product: "/pc/school/course/v1.0/discuss"
                },
                discusses: {
                    product: "/pc/school/course/v1.0/discusses?courseId="
                },
                ask: {
                    product: "/pc/school/course/v1.0/question"
                },
                courseVideo: {
                    product: "/pc/school/v1.0/video?videoId="
                }
            };
            bMock.setFace(thisApi);
            bMock.setEnv('product');


            //获取用户信息

            $scope.userInfo = userStatueService.getStatue();


            //获取课程信息
            $scope.getCourse = function (courseId) {
                asyncHttp.get(bMock.getFace("courseId") + courseId, function (data) {
                    if (data.error) {
                        layer.alert("查询失败！");
                        return;
                    } else {
                        $scope.course = data.data;
                        console.log($scope.course);
                        $scope.courseInfo = $scope.course.course;
                        if ($scope.course.courseQuestionList.length > 0) {
                            $scope.questions = $scope.course.courseQuestionList;
                            $scope.lackQuestions = false;
                        } else {
                            $scope.lackQuestions = true;
                        }

                        if ($scope.course.mainPointsList.length > 0) {
                            $scope.mainContent = $scope.course.mainPointsList[0].keyPoint ? $scope.course.mainPointsList[0].keyPoint : "暂未内容";
                            $scope.lackMainPoint = false;
                        } else {
                            $scope.lackMainPoint = true;
                        }
                        $scope.getCourseVideo();
                    }
                }, function (data) {
                    layer.alert("查询失败！");
                })
            }
            //获取课程详情
            $scope.getCourse(courseId);


            //获取课程相关视频
            $scope.getCourseVideo = function () {
                if ($scope.courseInfo.videoId === null) {
                    // $scope.thisCourseVideo.videoName = "暂未绑定视频"
                    layer.alert("暂未绑定视频！");
                } else {
                    asyncHttp.get(bMock.getFace("courseVideo") + $scope.courseInfo.videoId, function (data, status) {
                        if (DataCheckService.check$HttpError(data, status)) {
                            layer.alert('获取课程相关视频失败！');
                            return;
                        }
                        $scope.thisCourseVideo = data.data;
                        if ($scope.thisCourseVideo.videoUin) {
                            $scope.videoUrl = "http://yuntv.letv.com/bcloud.swf?uu=fiyztsskze&vu=" + $scope.thisCourseVideo.videoUin + "&pu=c1dad40eb3&auto_play=1&gpcflag=1&lang=zh_CN";
                        }
                    }, function (data) {
                        layer.alert('获取课程相关视频失败！');
                    })
                }
            };

            $scope.closeEvaluation = function () {
                if ($scope.help && $scope.attitude && $scope.aptitude) {
                    $scope.isShowMask = false;
                    $scope.isShowEvaluation = false;
                } else {
                    $scope.help = "尚未评分"
                    $scope.attitude = "尚未评分"
                    $scope.aptitude = "尚未评分"
                }

            }


            //评论课程
            $scope.doDiscuss = function () {
                if ($scope.help && $scope.attitude && $scope.aptitude && $scope.courseEvaluationText) {
                    var dis = {
                        relationId: courseId,
                        who: $scope.userInfo.student.studentNum,
                        content: $scope.courseEvaluationText,
                        prise: 0,
                        low: 0,
                        extraDate: {
                            help: $scope.help,
                            attitude: $scope.attitude,
                            aptitude: $scope.attitude,
                        }
                    }
                    asyncHttp.create(bMock.getFace("discuss"), dis, function (data) {
                        if (data.error) {
                            layer.alert("评价失败");
                            return;
                        } else {
                            layer.alert("评价成功！");
                            $scope.isShowMask = false;
                            $scope.isShowEvaluation = false;
                            $scope.doDiscusses(0, 100);
                        }
                    }, function () {
                    })
                } else {
                    $scope.help = "尚未评分"
                    $scope.attitude = "尚未评分"
                    $scope.aptitude = "尚未评分";
                    layer.alert("请完成评论内容哦");
                }
            }


            //获取评论
            $scope.doDiscusses = function (page, size) {
                $scope.discusses = [];
                var str = courseId + "&page=" + page + "&size=" + size;
                asyncHttp.get(bMock.getFace("discusses", str), function (data) {
                    if (data.error) {
                        layer.alert("评价失败")
                        return;
                    } else {
                        if (data.data.length > 0) {
                            $scope.discusses = data.data;
                            $scope.lackDiscusses = false;
                        } else {
                            $scope.lackDiscusses = true;
                        }
                        console.log($scope.discusses);
                    }
                }, function () {
                })
            }

            //提问
            $scope.question = function () {
                if (!$scope.askContent) {
                    return;
                }
                asyncHttp.create(bMock.getFace("ask"), {
                    question: $scope.askContent,
                    courseId: courseId,
                    studentNum: userStatueService.getStatue().student.studentNum,
                    version: 0,
                    disable: false
                }, function (data) {
                    if (data.error) {
                        layer.alert("提问失败");
                        return;
                    } else {
                        if (!$scope.questions) {
                            $scope.questions = [];
                        }
                        $scope.questions.unshift(data.data);
                    }
                }, function () {
                })
            }


            $scope.doDiscusses(0, 100);


            //点击问答 课程 改变样式
            $scope.isShowRecording = false;

            $scope.showRecording = function () {
                $scope.isShowMask = true;
            }

            $scope.closeRecording = function () {
                $scope.isShowMask = false;
            }

            $scope.iseavWenShow = 0
            $scope.iseavWen = function (v) {
                $scope.iseavWenShow = v
            }

            //点赞样式

            $scope.isGood = function () {
                $scope.isGoodShow = true
            }
            $scope.isGood1 = function () {
                $scope.isGoodShow = false
            }


            //展示评价窗口
            $scope.isShowEvaluation = false;

            $scope.showEvaluation = function () {
                $scope.isShowMask = true;
                $scope.isShowEvaluation = true;
            }

            $scope.closeEvaluation = function () {
                $scope.isShowMask = false;
                $scope.isShowEvaluation = false;
            }

            //打分设置
            $scope.getSerHelp = function (v) {

                switch (v) {
                    case 1 :
                        $scope.help = 1
                        break;
                    case 2 :
                        $scope.help = 2
                        break;
                    case 3 :
                        $scope.help = 3
                        break;
                    case 4 :
                        $scope.help = 4
                        break;
                    case 5 :
                        $scope.help = 5
                        break;
                    default:
                        $scope.help = 0
                }
            }
            $scope.getSerAttitude = function (v) {

                switch (v) {
                    case 1 :
                        $scope.attitude = 1
                        break;
                    case 2 :
                        $scope.attitude = 2
                        break;
                    case 3 :
                        $scope.attitude = 3
                        break;
                    case 4 :
                        $scope.attitude = 4
                        break;
                    case 5 :
                        $scope.attitude = 5
                        break;
                    default:
                        $scope.attitude = 0
                }
            }
            $scope.getSerAptitude = function (v) {

                switch (v) {
                    case 1 :
                        $scope.aptitude = 1
                        break;
                    case 2 :
                        $scope.aptitude = 2
                        break;
                    case 3 :
                        $scope.aptitude = 3
                        break;
                    case 4 :
                        $scope.aptitude = 4
                        break;
                    case 5 :
                        $scope.aptitude = 5
                        break;
                    default:
                        $scope.aptitude = 0
                }
            }

        }]);