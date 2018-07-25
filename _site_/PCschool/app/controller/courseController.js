/**
 * Created by liufangzhou on 2016/11/23.
 */
myAppModule.controller('courseController',
    ["$routeParams", "$scope", '$rootScope', "asyncHttp", "LabService", "keBiaoService", "TeacherService", "userStatueService", function ($routeParams, $scope, $rootScope, asyncHttp, LabService, keBiaoService, TeacherService, userStatueService) {

        $rootScope.isMenuSelected = 1;

        $scope.imgRoot = "http://static.iboom.tv/static/img/";

        console.log(keBiaoService.getKeBiao(new Date(), 30));

        //课程页标签视图名称
        var labViewName = "PC课程页分类视图";

        //英雄列表,用于英雄选择弹出框，保存列表相关信息
        $scope.heroList = {};

        //课程列表
        $scope.courseList = [];

        var thisApi = {
            getLabViewList: {
                //dev: "mock/mockapi/recentChampionList.json",
                //test: "http://192.168.1.150:9000/wx/school/v1.0/statue",
                product: "/pc/school/course/v1.0/labView"
            },
            queryCourse: {
                //dev: "mock/mockapi/recentChampionList.json",
                //test: "http://192.168.1.150:9000/wx/school/v1.0/statue",
                product: "/pc/school/course/v1.0/queryCourse"
            },
            getHotCourse: {
                //dev: "mock/mockapi/recentChampionList.json",
                //test: "http://192.168.1.150:9000/wx/school/v1.0/statue",
                product: "/pc/school/course/v1.0/hotCourse"
            },
            getLatestCourse: {
                //dev: "mock/mockapi/recentChampionList.json",
                //test: "http://192.168.1.150:9000/wx/school/v1.0/statue",
                product: "/pc/school/course/v1.0/latestCourse"
            },
            courseTable: {
                product: "/pc/school/course/v1.0/courseTable?model=kebiao"
            }
        };
        bMock.setFace(thisApi);
        bMock.setEnv('product');

        //查询用
        //查询内容,页面查询输入框的值
        $scope.inputQueryStr = '';
        //当前选择的需要查询课程类别（最多/最新播放）的接口地址,默认选择最多
        var queryUrl = bMock.getFace("getHotCourse");


        //获取标签视图下所有标签
        $scope.getLabsByView = function (labView) {
            var labs = [];
            labView.labs.forEach(function (labId) {
                labs.push(LabService.getLabInfo(labId));
            });
            return labs;
        }

        $scope.tip = function () {
            //弹出框radio样式
            $scope.$watch('heroList.data', function () {
                $(".choicehreo_radio input[type='radio']").change(function () {
                    $(this).parent().find("b").addClass("hero_checked");
                    $(this).parent().parent().parent().siblings().find("b").removeClass("hero_checked");
                });
            })
        }
        $scope.tip();

        $scope.init = function () {
            asyncHttp.get(bMock.getFace("getLabViewList") + "?name=" + labViewName, function (data) {
                if (data.error) {
                    console.log("获取标签视图失败！");
                    return;
                }
                $scope.labViewList = data.data;
                //分路
                $scope.fenlu = data.data.childs[0];
                $scope.fenlu.labInfos = $scope.getLabsByView($scope.fenlu);
                //英雄
                $scope.yinxiong = data.data.childs[1];
                $scope.yinxiong.childs.forEach(function (ele) {
                    var labInfos = [];
                    ele.labs.forEach(function (labId) {
                        labInfos.push(LabService.getLabInfo(labId));
                    })
                    ele.labInfos = labInfos;
                })
                //打法
                $scope.dafa = data.data.childs[2];
                $scope.dafa.labInfos = $scope.getLabsByView($scope.dafa);

                console.log($scope.yinxiong);
                console.log($scope.labViewList);

                $scope.getHotCourse();
            });
        }
        $scope.init();

        //转换成查询体
        $scope.convertToQuery = function (labIds, content) {
            var queryRequest = {};
            var queryLabs = [];
            labIds.forEach(function (labId) {
                queryLabs.push(LabService.getLabInfo(labId).eName + "-" + labId);
            })
            queryRequest.labs = queryLabs;
            queryRequest.query = content;
            return queryRequest;
        }


        //获取最热课程
        $scope.getHotCourse = function () {
            $scope.thisCourseType = 0;
            var labIds = $scope.labViewList.labs;
            queryUrl = bMock.getFace("getHotCourse");
            asyncHttp.create(queryUrl + "?page=0&size=100", $scope.convertToQuery(labIds, null), function (data) {
                $scope.courseList = $scope.fillTeacherInfo(data.data);
                console.log("hotCourseList", data);
            }, function (data) {
                console.log("获取失败。");
            });
        }

        //获取最新课程
        $scope.getLatestCourse = function () {
            $scope.thisCourseType = 1;
            var labIds = $scope.labViewList.labs;
            queryUrl = bMock.getFace("getLatestCourse");
            asyncHttp.create(queryUrl + "?page=0&size=100", $scope.convertToQuery(labIds, null), function (data) {
                $scope.courseList = $scope.fillTeacherInfo(data.data);
                console.log("latestCourseList", data);
            }, function (data) {
                console.log("获取失败。");
            });
        }

        //选中英雄
        $scope.clickHero = function (hero, index) {
            $scope.thisIndex = index;
            queryUrl = bMock.getFace("queryCourse");
            //获取该英雄的标签id和上层标签id
            var labs = $scope.labViewList.labs.concat(hero.id);
            //转换成查询请求体，提供给查询使用
            $scope.heroChoosen.queryRequest = $scope.convertToQuery(labs, null);
        }

        //点击课程tab(分路，打发)查询课程
        $scope.clickLabTab = function (lab) {
            queryUrl = bMock.getFace("queryCourse");
            var labs = $scope.labViewList.labs.concat(lab.id);
            $scope.queryCourse($scope.convertToQuery(labs, null));
        }

        //点击查询按钮查询课程
        $scope.clickQueryBtn = function () {
            queryUrl = bMock.getFace("queryCourse");
            var labs = $scope.labViewList.labs;
            $scope.queryCourse($scope.convertToQuery(labs, $scope.inputQueryStr));
        }

        //查询课程
        $scope.queryCourse = function (queryRequest) {
            if ((queryRequest && typeof(queryRequest) != "undefined")) {
                asyncHttp.create(queryUrl + "?page=0&size=100", queryRequest, function (data) {
                    if (data.error) {
                        layer.alert("查询失败！");
                    } else {
                        $scope.courseList = $scope.fillTeacherInfo(data.data);
                        $scope.isShowMask = false;
                    }
                }, function (data) {
                    layer.alert("查询失败！");
                })
            }
        }

        //补充课表中的老师信息
        $scope.fillTeacherInfo = function (courses) {
            var result = [];
            if (courses && courses.length > 0) {
                courses.forEach(function (course) {
                    course.teacherInfo = TeacherService.getTeacherInfo(course.actionId);
                    result.push(course);
                })
                $scope.lackCourse = false;
            } else {
                $scope.lackCourse = true;
            }
            return result;
        }

        //是否显示遮罩层
        $scope.closeMask = function () {
            $scope.isShowMask = false;
        }

        //展示评价窗口
        $scope.isShowchoicehreo = false;

        $scope.showchoicehreo = function () {
            $scope.heroChoosen = {};//保存选中的英雄
            $scope.isShowMask = true;
            $("#radioBtn0").click();
        }

        $scope.closechoicehreo = function () {
            $scope.isShowMask = false;
        }


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
                $scope.index=0
                break;
            case "周二" :
                $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * -1).Format("yyyy/MM/dd"));
                $scope.isWeekdong = "xian1"
                $scope.index=1
                break;
            case "周三" :
                $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * -2).Format("yyyy/MM/dd"));
                $scope.isWeekdong = "xian2"
                $scope.index=2
                break;
            case "周四" :
                $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * -3).Format("yyyy/MM/dd"));
                $scope.isWeekdong = "xian3"
                $scope.index=3
                break;
            case "周五" :
                $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * -4).Format("yyyy/MM/dd"));
                $scope.isWeekdong = "xian4"
                $scope.index=4
                break;
            case "周六" :
                $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * -5).Format("yyyy/MM/dd"));
                $scope.isWeekdong = "xian5"
                $scope.index=5
                break;
            case "周日" :
                $scope.nowWeek = new Date(new Date(new Date($scope.now).getTime() + (3600 * 1000 * 24) * -6).Format("yyyy/MM/dd"));
                $scope.isWeekdong = "xian6"
                $scope.index=6
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
                $scope.lackLive = false;
            } else {
                $scope.CurriculumeSlectKeBiao = "";
                $scope.lackLive = true;
            }
        }


        $scope.getKebiaos = function () {
            var thisDay = new Date();
            // $scope.keBiaos = keBiaoService.getKeBiao(thisDay, 5);
            $scope.CurriculumKeBiaos = keBiaoService.getKeBiao($scope.nowWeek, 7);
            $scope.FirstKeBiao = $scope.CurriculumKeBiaos[$scope.index];
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