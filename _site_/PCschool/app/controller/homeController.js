/**
 * Created by liufangzhou on 2016/11/23.
 */
/**
 * Created by liufangzhou on 2016/11/22.
 */

myAppModule.controller('homeController',
    ["$routeParams", "$scope", '$rootScope', "asyncHttp", "DataCheckService", "LabService", "userStatueService", "keBiaoService", function ($routeParams, $scope, $rootScope, asyncHttp, DataCheckService, LabService, userStatueService, keBiaoService) {


        var thisApi = {
            statue: {
                dev: "mock/mockapi/statue.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/hasNeedEvaluate?studentNum=666",
                product: "/wx/school/v1.0/statue"
            },
            homeCarsouel: {
                dev: "mock/mockapi/homeCarsouel.json",
                test: "http://localhost:8999/pc/school/course/v1.0/homePageCarousel?model=pc首页轮播",
                product: "/pc/school/course/v1.0/homePageCarousel?model=pc首页轮播"
            },
            serviceStatue: {
                dev: "mock/mockapi/serviceStatue.json",
                test: "http://localhost:8999/pc/school/v1.0/serviceStatue?studentNum=1",
                product: "/pc/school/v1.0/serviceStatue"
            },
            courseTable: {
                dev: "mock/mockapi/courseTable.json",
                test: "http://localhost:8999/pc/school/course/v1.0/courseTable?model=kebiao",
                product: "/pc/school/course/v1.0/courseTable?model=kebiao"
            },
            getLatestCourse: {
                //dev: "mock/mockapi/recentChampionList.json",
                //test: "http://192.168.1.150:9000/wx/school/v1.0/statue",
                product: "/pc/school/course/v1.0/latestCourse"
            },
            //获取我的预约信息接口
            OTOappoint: {
                dev: "mock/mockapi/appoint.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/statue",
                product: "/pc/school/v1.0/oto/lol/statue"
            },
            SSJappoint: {
                dev: "mock/mockapi/appoint.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/ssj/lol/statue",
                product: "/pc/school/v1.0/ssj/lol/statue"
            },
        };
        bMock.setFace(thisApi);
        bMock.setEnv("product");


        //课程页标签视图名称
        var labViewName = "PC课程页分类视图";

        //获取用户信息
        $scope.userStatue = userStatueService.getStatue();

        $scope.now = new Date().getTime();


        $scope.chose = function (data, index) {
            if (data.keBiao) {
                $scope.selectKeBiao = data.keBiao;
                $scope.lackCourse = false;
            } else {
                $scope.selectKeBiao = "";
                $scope.lackCourse = true;
            }
            $scope.thisIndex = index;
        }

        $scope.getKebiaos = function () {
            var thisDay = new Date();
            $scope.keBiaos = keBiaoService.getKeBiao(thisDay, 5);
            console.log($scope.keBiaos);
            $scope.FirstKeBiao = $scope.keBiaos[0];
            $scope.chose($scope.FirstKeBiao, 0);
        }

        $scope.getKebiaos();
        //初始化swiper

        $scope.init = function () {
            asyncHttp.get("/pc/school/course/v1.0/labView" + "?name=" + labViewName, function (data) {
                if (data.error) {
                    console.log("获取标签视图失败！");
                    return;
                }
                $scope.labViewList = data.data;

                $scope.getLatestCourse();
            });
        }

        $scope.init();

        function initSwiper() {
            var mySwiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay: 3000,
                autoplayDisableOnInteraction: false
            })
        }

        $rootScope.isMenuSelected = 0;

        $scope.mes = "111";

        console.log($scope.mes);

        $scope.isSelectedLi = false;


        //获取轮播图

        $scope.getCarsouel = function () {
            asyncHttp.get(bMock.getFace("homeCarsouel"), function (data) {
                console.log(data);
                if (data.data.carouselDtos) {
                    var thisLives = data.data.carouselDtos;
                    var lists = "";
                    console.log(thisLives);
                    $.each(thisLives, function (n, value) {
                        var li = "";
                        li += "<div class='swiper-slide'><a href='http://" + value.url + "'>" + "<img src='http://static.iboom.tv/static/img/" + value.img + "'/>" + "</a>" + "</div>";
                        lists += li;
                    });
                    $("#vsrmd").append(lists);
                    initSwiper();
                } else {
                    layer.alert("加载失败，请刷新重试哦！");
                }

            }, function (data) {
                console.log("获取轮播图失败！")
            })
        };

        $scope.getCarsouel();

        //获取教学状态
        $scope.getServiceStatue = function () {
            asyncHttp.get(bMock.getFace("serviceStatue") + "?studentNum=" + $scope.userStatue.student.studentNum, function (data) {
                console.log(data);

            }, function (data) {
                console.log("获取教学状态失败！")
            })
        }

        $scope.getServiceStatue();

        //获取课程表内容
        $scope.courseTable = function () {
            asyncHttp.get(bMock.getFace("courseTable"), function (data) {
                console.log(data);

            }, function (data) {
                console.log("获取教学状态失败！")
            })
        }
        $scope.courseTable();

        //获取最新课程
        $scope.page = 0;
        $scope.size = 9;
        $scope.getLatestCourse = function () {
            var labIds = $scope.labViewList.labs;

            asyncHttp.create("/pc/school/course/v1.0/latestCourse" + "?page=" + $scope.page + "&size=" + $scope.size, $scope.convertToQuery(labIds, null), function (data) {

                $scope.LatestCourse = data.data;

                console.log($scope.LatestCourse);
            }, function (data) {
                console.log("获取失败。");
            });
        }

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

        //判断首页一对一状态
        asyncHttp.get(bMock.getFace("OTOappoint") + "?studentNum=" + $scope.userStatue.student.studentNum , function (data, status) {
            //获取服务预约信息
            switch (data.data.statue) {
                case "apply" :
                    console.log('无预约，隐藏预约模块');
                    $scope.otoshowyu=true
                    break;
                case "wait" :
                    $scope.otoshowyi=true
                    console.log('已经有申请，需要等待');
                    break;
                case "end" :
                    $scope.otoshowcd=true
                    console.log('进入cd期');
                    break;
                default:
                    console.log('一对一其他状态');
            }

        });


        //点击跳转到服务页面

        $scope.toService=function(){
            //跳转到服务页面
        }

        //判断首页生死局状态
        asyncHttp.get(bMock.getFace("SSJappoint") + "?studentNum=" + $scope.userStatue.student.studentNum , function (data, status) {
            //获取服务预约信息
            switch (data.data.statue) {
                case "apply" :
                    console.log('无预约，隐藏预约模块');
                    $scope.ssjshowyu=true
                    break;
                case "wait" :
                    $scope.ssjshowyi=true
                    console.log('已经有申请，需要等待');
                    break;
                case "end" :
                    $scope.ssjshowcd=true
                    console.log('进入cd期');
                    break;
                default:
                    console.log('ssj其他状态');
            }

        });


        //点击跳转到服务页面






    }]);
