/**
 * Created by liufangzhou on 2016/11/23.
 */
/**
 * Created by liufangzhou on 2016/11/22.
 */

myAppModule.controller('serviceController',
    ["$routeParams", "$scope", '$rootScope', "asyncHttp", "DataCheckService", "userStatueService", "TeacherService", "studentService", function ($routeParams, $scope, $rootScope, asyncHttp, DataCheckService, userStatueService, TeacherService, studentService) {

        var thisApi = {
            serviceStatue: {
                dev: "mock/mockapi/serviceStatue.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/serviceStatue",
                product: "/pc/school/v1.0/serviceStatue"
            },
            teacher: {
                dev: "mock/mockapi/teacher.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/teacher",
                product: "/pc/school/v1.0/teacher"
            },
            //是否显示评论的接口
            OTOevaluate: {
                dev: "mock/mockapi/evaluate.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/hasNeedEvaluate?studentNum=666",
                product: "/pc/school/v1.0/oto/lol/hasNeedEvaluate"
            },
            SSJevaluate: {
                dev: "mock/mockapi/evaluate.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/oto/ssj/hasNeedEvaluate?studentNum=666",
                product: "/pc/school/v1.0/ssj/lol/hasNeedEvaluate"
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

            //获取推荐老师的接口
            OTOrecommend: {
                dev: "mock/mockapi/recommend.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/recommend",
                product: "/pc/school/v1.0/oto/lol/recommend"
            },
            SSJrecommend: {
                dev: "mock/mockapi/recommend.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/ssj/lol/recommend",
                product: "/pc/school/v1.0/ssj/lol/recommend"
            },
            //获取最新动态的接口
            OTOdynamics: {
                dev: "mock/mockapi/dynamics.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/latestDynamics",
                product: "/pc/school/v1.0/oto/lol/latestDynamics"
            },
            SSJdynamics: {
                dev: "mock/mockapi/dynamics.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/ssj/lol/latestDynamics",
                product: "/pc/school/v1.0/ssj/lol/latestDynamics"
            },
            branch: {
                dev: "mock/dynamics.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/submitBranch",
                product: "/pc/school/v1.0/submitBranch"
            },
            cancel: {
                dev: "mock/dynamics.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/cancel",
                product: "/pc/school/v1.0/ssj/lol/cancel"
            },
        };
        bMock.setFace(thisApi);

        bMock.setEnv("product");

        $rootScope.isMenuSelected = 2;

        //获取用户信息
        $scope.userStatue = userStatueService.getStatue();


        $scope.mes = "111";
        console.log($scope.mes);


        $scope.closeMask = function () {
            $scope.isShowMask = false;
        }

        //展示一对一CD规则

        $scope.isShowMask = false;
        $scope.isShowOTORule = false;

        $scope.showOTORule = function () {
            $scope.isShowMask = true;
            $scope.isShowOTORule = true;
        };

        $scope.closeOTORule = function () {
            $scope.isShowMask = false;
            $scope.isShowOTORule = false;
        }


        //展示评价窗口
        $scope.isShowEvaluation = false;

        $scope.showEvaluation = function () {
            $scope.isShowMask = true;
            $scope.isShowEvaluation = true;
        }

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

        //获取服务预约信息

        $scope.serviceType = 0;


        //时间戳转换
        function formatDate(now) {
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var week = now.getDay();
            var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            var hour = now.getHours();
            var minute = now.getMinutes();
            return month + " 月 " + date + " 日 " + " ( " + weekDay[week] + " ) " + hour + ":" + minute;
        }

        function formDaytDate(now) {
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var week = now.getDay();
            var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            var hour = now.getHours();
            var minute = now.getMinutes();
            return year + "-" + month + "- " + date;
        }


        //获取老师信息

        //获取预约信息
        $scope.getServiceStatue = function () {

            asyncHttp.get(bMock.getFace("serviceStatue"), function (data, status) {
                if (DataCheckService.check$HttpError(data, status)) {
                    layer.alert('获取预约信息失败！');
                    return;
                }
                console.log(data.data);
                var thisServiceStatus = data.data;
                if (thisServiceStatus.oto) {
                    var otoStatus = thisServiceStatus.oto;
                    switch (otoStatus.statue) {
                        case "apply" :
                            console.log('一对一可申请状态');
                            $scope.otoStatueNum = 0;
                            break;
                        case "wait" :
                            console.log('一对一已经有申请');
                            $scope.otoStatueNum = 1;
                            // var thisTime = new Date(otoStatus.lolServiceApplyDetailResponse.hopeTeachTime);
                            //$scope.OTOTime = formatDate(new Date(otoStatus.lolServiceApplyDetailResponse.hopeTeachTime));
                            //$scope.OTOInfo = otoStatus.lolServiceApplyDetailResponse.info;
                            //$scope.OTOTeacher = TeacherService.getTeacherInfo(otoStatus.lolServiceApplyDetailResponse.teacherId).name;
                            break;
                        default:
                            console.log('一对一有CD状态');
                            $scope.otoStatueNum = 2;
                    }
                    ;
                } else {

                }
                if (thisServiceStatus.ssj) {
                    var ssjStatus = thisServiceStatus.ssj;
                    switch (ssjStatus.statue) {
                        case "apply" :
                            console.log('生死局可申请状态');
                            $scope.ssjStatueNum = 0;
                            break;
                        case "wait" :
                            console.log('生死局已经有申请');
                            $scope.ssjStatueNum = 1;
                            // $scope.SSJTime = formatDate(new Date(ssjStatus.lolServiceApplyDetailResponse.hopeTeachTime));
                            // $scope.SSJInfo = ssjStatus.lolServiceApplyDetailResponse.info;
                            // $scope.SSJTeacher = TeacherService.getTeacherInfo(ssjStatus.lolServiceApplyDetailResponse.teacherId).name;
                            break;
                        default:
                            console.log('生死局进入CD状态');
                            $scope.ssjStatueNum = 2;
                    }
                } else {

                }

            });
        }


        //获取推荐老师

        $scope.getRecommend = function (num) {

            var thisUrl;
            if (num === 0) {
                thisUrl = bMock.getFace("OTOrecommend")
            } else {
                thisUrl = bMock.getFace("SSJrecommend")
            }

            asyncHttp.get(thisUrl + "?size=3", function (data, status) {
                if (DataCheckService.check$HttpError(data, status)) {
                    layer.alert('获取优秀老师失败！');
                    return;
                }
                $scope.recommendTeachers = data.data;
                console.log(data.data);
            });
        }


        //动态加载数据
        $scope.scoreCallBack = function (index) {
            console.log(index);
            var pageNumber = index;
            $scope.getDynamics(index);
        };


        //获取最新动态

        $scope.fiveNewDynamics = [];

        $scope.getDynamics = function (index) {
            var thisUrl;
            if ($scope.serviceType === 0) {
                thisUrl = bMock.getFace("OTOdynamics")
            } else {
                thisUrl = bMock.getFace("SSJdynamics")
            }

            asyncHttp.get(thisUrl + "?page=" + index + "&size=5", function (data, status) {
                if (DataCheckService.check$HttpError(data, status)) {
                    layer.alert('获取最新动态失败！');
                    return;
                }
                if (data.length > 0) {
                    console.log(data);
                    function findData(element, index, array) {
                        $scope.fiveNewDynamics.push(element);
                    }

                    data.data.forEach(findData);
                    console.log($scope.fiveNewDynamics);
                }
            });
        }


        //获取是否需要评价

        $scope.getEvaluate = function (num) {

            var thisUrl;
            if (num === 0) {
                thisUrl = bMock.getFace("OTOevaluate")
            } else {
                thisUrl = bMock.getFace("SSJevaluate")
            }

            asyncHttp.get(thisUrl + "?studentNum=" + $scope.userStatue.student.studentNum, function (data, status) {
                if (data.length > 0) {
                    $scope.isHaveEvaluate = true;
                    console.log(data.data);
                    return;
                } else {
                    $scope.isHaveEvaluate = false;
                }

            });
        }

        $scope.getServiceType = function (num) {
            $scope.serviceType = num;
            if($scope.serviceType===0){
                asyncHttp.get(bMock.getFace("OTOappoint") + "?studentNum=" + $scope.userStatue.student.studentNum , function (data, status) {
                    //获取服务预约信息
                    switch (data.data.statue) {
                        case "apply" :
                            console.log('无预约，隐藏预约模块');
                            $scope.otoStatueNum = 0;
                            $scope.yinzhang=false

                            break;
                        case "wait" :
                            console.log('已经有申请，需要等待');
                            $scope.otoStatueNum =1;
                            if(data.data.lolServiceApplyDetailResponse){
                                $scope.id=data.data.lolServiceApplyDetailResponse.id
                                $scope.isAppont1 = data.data.lolServiceApplyDetailResponse.hopeTeachTime;
                                $scope.apRange1 = eval("(" + data.data.lolServiceApplyDetailResponse.whatStudy.whatStudy + ")").position + ' ' + data.data.lolServiceApplyDetailResponse.howTeach.howTeach + ' ' + eval("(" + data.data.lolServiceApplyDetailResponse.whatStudy.whatStudy + ")").hero.substring(0, 4);
                                $scope.apname1 = TeacherService.getTeacherInfo(data.data.lolServiceApplyDetailResponse.teacherId).name;
                            }
                            //    老师没有联系我
                            $scope.nolianxi=function(){
                                $.ajax({
                                    url: bMock.getFace("branch")+'?'+'applyId='+$scope.id+'&studentNum='+$scope.userStatue.student.studentNum,
                                    type: "get",
                                    success: function (data) {
                                        alert("提交反馈成功");
                                    },
                                    error: function () {
                                        alert("提交反馈失败");
                                    }
                                });
                            }

                            //  取消预约
                            $scope.quxiaoyuyue=function(){
                                if(($scope.isAppont1 - new Date().getTime())>3*60*60*1000){
                                    $scope.iscdw=true
                                    $scope.isShowMask1=true
                                    $scope.otoquxiaotrue=function(){
                                        $.ajax({
                                            url: bMock.getFace("cancel")+'?'+'applyId='+$scope.id,
                                            type: "get",
                                            success: function (data) {
                                                if(!data.error){
                                                    alert("取消成功")
                                                }
                                                $scope.iscdw=false
                                                $scope.isShowMask1=false
                                            },
                                            error: function () {
                                                alert("取消失败");

                                            }
                                        });
                                    }
                                }else if(($scope.isAppont1 - new Date().getTime())<3*60*60*1000){
                                    $scope.isShowMask1=true
                                    $scope.btn7cd=function(){
                                        $.ajax({
                                            url: bMock.getFace("cancel")+'?'+'applyId='+$scope.id,
                                            type: "get",
                                            success: function (data) {

                                                if(!data.error){
                                                    alert('取消成功')
                                                }

                                                $scope.isShowMask1=false;
                                            },
                                            error: function () {
                                                alert("取消失败");
                                                $scope.isShowMask1=false;
                                                return;

                                            }
                                        });
                                    }



                                }else{
                                    $scope.isShowMask1=true
                                }
                            }
                            $scope.no7cd=function(){
                                $scope.isShowMask1=false
                            }
                            $scope.isMask1=function(){
                                $scope.isShowMask1=false
                            }


                            break;
                        case "end" :
                            console.log('进入cd期');
                            $scope.otoStatueNum = 2;
                            $scope.isHaveEvaluate=false
                           var sday = Math.floor(data.data.waitDays / 24);
                           var stime = data.data.waitDays - sday * 24;
                            console.log("还剩" + sday + "天" + stime + "时");
                            $scope.sheng="还剩" + sday + "天" + stime + "时"
                            break;
                        default:
                            console.log('一对一其他状态');
                    }

                });

            }else if($scope.serviceType===1){
                asyncHttp.get(bMock.getFace("SSJappoint") + "?studentNum=" + $scope.userStatue.student.studentNum , function (data, status) {
                    //获取服务预约信息
                    switch (data.data.statue) {
                        case "apply" :
                            console.log('无预约，隐藏预约模块');
                            $scope.otoStatueNum = 0;
                            $scope.ssjyin=false
                            break;
                        case "wait" :
                            console.log('已经有申请，需要等待');
                            $scope.ssjStatueNum = 1;
                            if(data.data.lolServiceApplyDetailResponse){
                                $scope.isAppont2 = data.data.lolServiceApplyDetailResponse.hopeTeachTime;
                                $scope.apRange2 = data.data.lolServiceApplyDetailResponse.howTeach.howTeach;
                                $scope.apname2 = TeacherService.getTeacherInfo(data.data.lolServiceApplyDetailResponse.teacherId).name;
                            }
                            //    老师没有联系我
                            $scope.nossjlianxi=function(){
                                $.ajax({
                                    url: bMock.getFace("branch")+'?'+'applyId='+$scope.id+'&studentNum='+$scope.userStatue.student.studentNum,
                                    type: "get",
                                    success: function (data) {
                                        alert("提交反馈成功");
                                    },
                                    error: function () {
                                        alert("提交反馈失败");
                                    }
                                });
                            }

                            //  取消预约
                            $scope.ssjquxiaoyuyue=function(){
                                if(($scope.isAppont1 - new Date().getTime())>3*60*60*1000){
                                    $scope.iscdw=true
                                    $scope.isShowMask1=true
                                    $scope.otoquxiaotrue=function(){
                                        $.ajax({
                                            url: bMock.getFace("cancel")+'?'+'applyId='+$scope.id,
                                            type: "get",
                                            success: function (data) {
                                                alert(80)
                                            },
                                            error: function () {
                                                alert("取消失败");

                                            }
                                        });
                                    }
                                }else if(($scope.isAppont1 - new Date().getTime())<3*60*60*1000){
                                    $scope.isShowMask1=true
                                    $scope.btn7cd=function(){
                                        $.ajax({
                                            url: bMock.getFace("cancel")+'?'+'applyId='+$scope.id,
                                            type: "get",
                                            success: function (data) {
                                                if(!data.error){
                                                    alert('取消成功')
                                                }


                                            },
                                            error: function () {
                                                alert("取消失败");
                                                return;
                                            }
                                        });
                                    }
                                    $scope.no7cd=function(){
                                        $scope.isShowMask1=false
                                    }
                                }else{
                                    $scope.isShowMask1=true
                                }
                            }
                            $scope.isMask1=function(){
                                $scope.isShowMask1=false
                            }
                            $scope.issssjshow=function(){
                                $scope.isSsshoecd=true
                            }
                            $scope.closessjRule=function(){
                                $scope.isSsshoecd=false
                            }

                            break;
                        case "end" :
                            console.log('进入cd期');
                            $scope.ssjStatueNum = 2;
                            $scope.isHaveEvaluate=false
                            var sday = Math.floor(data.data.waitDays / 24);
                            var stime = data.data.waitDays - sday * 24;
                            console.log("还剩" + sday + "天" + stime + "时");
                            $scope.sheng2="还剩" + sday + "天" + stime + "时"
                            break;
                        default:
                            console.log('一对一其他状态');
                    }

                });

            }

            $scope.getRecommend($scope.serviceType);
            // $scope.getDynamics($scope.serviceType);
            $scope.getEvaluate($scope.serviceType);
            $scope.getDynamics(0);

        };

        $scope.getServiceType(0);
        //$scope.getServiceStatue();
        //获取需要评价的相关信息


        //打分设置
        $scope.getSerHelp = function (v) {

            switch (v) {
                case 1 :
                    $scope.help = "1分"
                    break;
                case 2 :
                    $scope.help = "2分"
                    break;
                case 3 :
                    $scope.help = "3分"
                    break;
                case 4 :
                    $scope.help = "4分"
                    break;
                case 5 :
                    $scope.help = "5分"
                    break;
                default:
                    $scope.help = 0
            }
        }
        $scope.getSerAttitude = function (v) {

            switch (v) {
                case 1 :
                    $scope.attitude = "1分"
                    break;
                case 2 :
                    $scope.attitude = "2分"
                    break;
                case 3 :
                    $scope.attitude = "3分"
                    break;
                case 4 :
                    $scope.attitude = "4分"
                    break;
                case 5 :
                    $scope.attitude = "5分"
                    break;
                default:
                    $scope.attitude = 0
            }
        }
        $scope.getSerAptitude = function (v) {

            switch (v) {
                case 1 :
                    $scope.aptitude = "1分"
                    break;
                case 2 :
                    $scope.aptitude = "2分"
                    break;
                case 3 :
                    $scope.aptitude = "3分"
                    break;
                case 4 :
                    $scope.aptitude = "4分"
                    break;
                case 5 :
                    $scope.aptitude = "5分"
                    break;
                default:
                    $scope.aptitude = 0
            }
        }


        //提交评价


        //获取预约信息






    }]);
