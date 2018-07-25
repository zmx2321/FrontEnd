/**
 * Created by liufangzhou on 2016/12/1.
 */
myAppModule.controller('serviceTimeController',
    ["$routeParams", "$scope", '$rootScope', "syncHttp", "asyncHttp", "DataCheckService", "LabService", "userStatueService", "AreaService","TeacherService" ,function ($routeParams, $scope, $rootScope, syncHttp, asyncHttp, DataCheckService, LabService, userStatueService, AreaService,TeacherService) {


        $scope.serviceType = $routeParams.serviceType;
        $scope.teacherId = $routeParams.teacherId;

        console.log($scope.serviceType);
        console.log($scope.teacherId);

        $rootScope.isMenuSelected = 2;

        var thisApi = {
            //获取全部老师
            revtProcessChta: {
                dev: "mock/mockapi/revtProcessChta.json",
                test: "http://192.168.1.150:8998/wx/school/v1.0/oto/lol/allTeacher",
                product: "/pc/school/v1.0/oto/lol/allTeacher"
            },
            //获取需要评论的内容
            appointSuccess: {
                dev: "mock/mockapi/appointSuccess.json",
                test: "http://192.168.1.150:8998/wx/school/v1.0/oto/lol/watch",
                product: "/pc/school/v1.0/oto/lol/watch"
            },
            //获取老师空闲时间
            teacherSlots: {
                product: "/pc/school/v1.0/teacherSlots"
            },
            canApply: {
                product: "/pc/school/v1.0/oto/lol/canApply"
            },
            submitOto: {
                product: "/pc/school/v1.0/oto/lol/submitOto"
            },
            submitSsj: {
                product: "/pc/school/v1.0/ssj/lol/submitOto"
            },
            getLabViewList: {

                product: "/pc/school/course/v1.0/labView"
            },
            queryCourse: {

            product: "/pc/school/course/v1.0/queryCourse"
        },
            //一对一预约信息
            OTOappoint: {
                product: "/pc/school/v1.0/oto/lol/statue"
            },
            //生死局预约信息
            SSJappoint: {
                product: "/pc/school/v1.0/ssj/lol/statue"
            },
        };
        bMock.setFace(thisApi);
        bMock.setEnv("product");

        //获取用户信息
        $scope.userStatue = userStatueService.getStatue();
        console.log($scope.userStatue);

        //获取用户是否可以预约


        //获取系统时间

        function GetMouthDay(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;//获取当前月份的日期
            var d = dd.getDate();
            return m + "月" + d + "日";
        }

        function getYearMonthDay(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;//获取当前月份的日期
            var d = dd.getDate();
            return y + "-" + m + "-" + d;
        }


        function timeInfo(AddDayCount) {
            this.yearTime = getYearMonthDay(AddDayCount);
            this.monthTime = GetMouthDay(AddDayCount);
        }

        $scope.thisTimeToday = new timeInfo(0);

        $scope.thisTimetomorrow = new timeInfo(1);

        $scope.thisTimeAfter = new timeInfo(2);

        console.log($scope.timeArray);

        //获取预约信息
        $scope.getApontime = function () {
            asyncHttp.get(bMock.getFace("canApply") + "?studentNum=" + $scope.userStatue.student.studentNum + "?date=2016-11-22-14", function (data, status) {
                if (DataCheckService.check$HttpError(data, status)) {
                    layer.alert('获取预约信息失败！');
                    return;
                }
                $scope.isCanAppltToday = data.data;
                console.log(data.data);
            });
        }

         $scope.getApontime();


        //获取老师空闲时间

        $scope.teacherSlots = function (day) {
            asyncHttp.get(bMock.getFace("teacherSlots") + "?teacherId=" + $scope.teacherId + "&slotDay=" + day, function (data, status) {
                if (DataCheckService.check$HttpError(data, status)) {
                    layer.alert('获取老师信息失败！');
                    return;
                }
                $scope.teacherTime = data.data.slotStatue;


                function findForbidHour(element, index, array) {
                    if (!element) {
                        $scope.HourForbid = index;
                    }
                }

                $scope.teacherTime.forEach(findForbidHour);
            });
        }

        //选择教学时间
        $scope.chooseTeachDay = function (num) {
            $scope.dayNumber = num;
            $scope.thisTeacherDay = new timeInfo(num);
            $scope.teacherSlots($scope.thisTeacherDay.yearTime);
            $scope.chooseTeachHour(0);
        }

        $scope.chooseTeachHour = function (num) {
            $scope.HourNumber = num;
            //$scope.thisTeacherHour = new timeInfo(num);
            console.log($scope.HourNumber);
        }

        $scope.chooseTeachDay(0);

        $scope.isShowMask = false;
        $scope.isChooseArea = false;


        //选择生死局大区信息
        //$scope.chooseArea = function () {
        //    $scope.isShowMask = true;
        //    $scope.isChooseArea = true;
        //    $(".selectarea_cont dd").click(function(){
        //        $(".selectarea_cont dd").removeClass("selectarea_on");
        //        $(this).addClass("selectarea_on")
        //    })
        //}
      //点击关闭大区信息
        $scope.closeChooseArea = function () {
            $scope.isShowMask = false;
            $scope.isChooseArea = false;
        }



        //获取教学模式

        $scope.chooseTeachStyle = function (num) {
            $scope.teachStyle = num;

        }
        $scope.chooseTeachStyle(1);
        //获取学习位置

        $scope.chooseTeachRoute = function (num) {
            $scope.teachRoute = num;
        }
        $scope.chooseTeachRoute(0);

        $scope.submitTeachInfo = function () {
            var thisApplyInfo;

        }

        //获取学习的英雄

        //获取学生CD时间

        //获取预约成功返回的信息


        //获取大区信息


        //获取英雄信息
        //var heroName = "LOL英雄分类";
        //$scope.heroInit = function () {
        //    asyncHttp.get(bMock.getFace("getLabViewList") + "?name=" + heroName, function (data) {
        //        if (data.error) {
        //            console.log("获取英雄信息失败！");
        //            return;
        //        }
        //        console.log(data);
        //        $scope.yinxiongQ=data.data.childs;
        //    })
        //}
        //$scope.heroInit();

        //课程页标签视图名称
        var labViewName = "PC课程页分类视图";

        //英雄列表,用于英雄选择弹出框，保存列表相关信息
        $scope.heroList = {};

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



        function NewList(name,labs){
            this.name = name;
            this.labs = labs;
        }

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
        //选中英雄
        $scope.clickHero = function (hero) {
            $scope.id=hero.id
            $scope.name=LabService.getLabInfo(hero.id).labName


            queryUrl = bMock.getFace("queryCourse");
            //获取该英雄的标签id和上层标签id
            var labs = $scope.labViewList.labs.concat(hero.id);
            //转换成查询请求体，提供给查询使用
        }

        //选英雄
        $scope.queding=function(){

        }


        //点击显示英雄列表
        $scope.ishero=function(){
            $scope.isheroshow=true
        }
        //点击关闭英雄列表
        $scope.closehreo=function(){
            $scope.isheroshow=false
        }

        //实现本地图片上传前的预览
        function uploadPhotos(){
            $(".sss_picbox input[type='file']").change(function(){
                $(".sss_picot").show();
                $(".sss_picbox").css({
                    //border: "none",
                });
                var objUrl = getObjectURL(this.files[0]);
                if(objUrl) {
                    $("#img0").attr("src", objUrl);
                }
            });
            function getObjectURL(file) {
                var url = null;
                if (window.createObjectURL!=undefined) { // basic
                    url = window.createObjectURL(file) ;
                } else if (window.URL!=undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file) ;
                } else if (window.webkitURL!=undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file) ;
                }
                return url ;
            }
        }
        uploadPhotos()



        //提交预约信息
        var teachkTime=["13:30:00","15:00:00","16:30:00","18:00:00","19:30:00","21:00:00"]
        var teachS=["不限","SOLO","实战教学","录像教学"]
        var teateachR=["不限","中单","打野","ADC","辅助"]





            //提交一对一预约信息
            $scope.submit = function () {
                $.ajax({
                    async: false,
                    url: bMock.getFace("submitOto"),
                    type:"post",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        "studentNum":$scope.userStatue.student.studentNum,
                        "qq":$scope.userStatue.student.qq,
                        "phone":$scope.userStatue.student.mobile,
                        "teacherId":$scope.teacherId,
                        "hopeTeachTime":$scope.thisTeacherDay.yearTime+' '+teachkTime[$scope.HourNumber],
                        "howTeach":teachS[$scope.teachStyle],
                        "mark":$scope.serviceRemark,
                        "timeIndex":$scope.HourNumber,
                        "whatStudy":JSON.stringify({
                            position:teateachR[$scope.teachRoute],
                            hero: $scope.name,
                            heroId: $scope.id
                        }) ,
                    }),
                    dataType: "json",
                    success: function (data, status) {
                        if (!data.error){
                            //点击预约完成后弹出成功数据 一对一
                                $scope.isShowappointmento = true;
                                $scope.appointmentComo = function () {
                                $scope.isShowappointmento = false;
                            }
                            $scope.getOTOApontimeSucco = function () {
                                asyncHttp.get(bMock.getFace("OTOappoint") + "?studentNum=" + $scope.userStatue.student.studentNum , function (data, status) {
                                    if(data.data.lolServiceApplyDetailResponse){
                                        $scope.isAppont = data.data.lolServiceApplyDetailResponse.hopeTeachTime;
                                        $scope.apRange = eval("(" + data.data.lolServiceApplyDetailResponse.whatStudy.whatStudy + ")").position + ' ' + data.data.lolServiceApplyDetailResponse.howTeach.howTeach + ' ' + eval("(" + data.data.lolServiceApplyDetailResponse.whatStudy.whatStudy + ")").hero.substring(0, 4);
                                        $scope.apname = TeacherService.getTeacherInfo(data.data.lolServiceApplyDetailResponse.teacherId).name;
                                    }

                                });
                            }

                            $scope.getOTOApontimeSucco()

                        }else{
                            alert("一对一预约提交失败！"+data.msg);
                                $scope.isShowappointmento = false;
                            return;
                }
               
                },
                error: function () {
                    console.log("提交失败");
                }
            });
        }


            //提交生死局预约信息

            $scope.submit2 = function () {
                //图片上传
                var formData = new FormData();
                formData.append('file', $('#file0')[0].files[0]);
                console.log(formData);
                $.ajax({
                    url: '/admin/upload',
                    type: 'POST',
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (returndata) {
                        if (returndata.error) {
                            alert("申请证明上传失败！");
                            return;
                        }
                        $.ajax({
                            async: false,
                            url: bMock.getFace("submitSsj"),
                            type:"post",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify({
                                "studentNum":$scope.userStatue.student.studentNum,
                                "qq":$scope.userStatue.student.qq,
                                "phone":$scope.userStatue.student.mobile,
                                "teacherId":$scope.teacherId,
                                "timeIndex":$scope.HourNumber,
                                "hopeTeachTime":$scope.thisTeacherDay.yearTime+' '+teachkTime[$scope.HourNumber],
                                "howTeach":$scope.selectedAreaName,
                                "mark":$scope.serviceRemark,
                            }),
                            dataType: "json",
                            success: function (data, status) {
                                if (!data.error){
                                //点击预约完成后弹出成功数据 生死局
                                    $scope.isShowappointments = true;
                                    $scope.appointmentComs = function () {
                                        $scope.isShowappointments = false;
                                    }
                                    $scope.getSSJApontimeSuccs = function () {
                                        asyncHttp.get(bMock.getFace("SSJappoint") + "?studentNum=" + $scope.userStatue.student.studentNum , function (data, status) {
                                            if(data.data.lolServiceApplyDetailResponse){
                                                $scope.isAppontssj = data.data.lolServiceApplyDetailResponse.hopeTeachTime;
                                                $scope.apRangessj = $scope.selectedAreaName;
                                                $scope.apnamessj = TeacherService.getTeacherInfo(data.data.lolServiceApplyDetailResponse.teacherId).name;
                                            }

                                        });
                                    }

                                    $scope.getSSJApontimeSuccs()



                                }else{
                                    alert("生死局预约提交失败！"+data.msg);
                                        $scope.isShowappointments = false;
                                    return;
                                }

                        },
                        error: function () {
                            console.log("提交失败");
                        }
                    });
                },
                error: function (returndata) {
                    alert("提交失败");
                }
            });
        }

        //点击预约完成后弹出成功数据 一对一
        //    $scope.isShowappointment = true;

        //点击预约完成后弹出成功数据 生死局
        $scope.appointmentComs = function () {
            $scope.isShowappointments = false;
        }




        //选择大区
        $scope.isShowMask = false;
        $scope.isChooseArea = false;

        $scope.chooseArea = function () {
            $scope.isShowMask = true;
            $scope.isChooseArea = true;
        }
        // $scope.teacherSlots();

        $scope.closeChooseArea = function () {
            $scope.isShowMask = false;
            $scope.isChooseArea = false;
        }

        //获取大区信息
        $scope.AllNetArea = AreaService.getByNet();
        console.log($scope.AllNetArea);
        $scope.DXArea = $scope.AllNetArea.电信;
        console.log($scope.DXArea);
        $scope.WTArea = $scope.AllNetArea.网通;
        $scope.JJArea = $scope.AllNetArea.教育;

        $scope.confirmArea = function (area) {
            $scope.selectedArea = area;
            $scope.selectedAreaNet = $scope.selectedArea.net;
            $scope.selectedAreaName = $scope.selectedArea.name;
            $scope.selectedAreaId = $scope.selectedArea.id;
            $scope.closeChooseArea();
        }
        var firstArea = {"version": 0, "id": 1, "name": "艾欧尼亚", "code": "电信一", "net": "电信"};
        $scope.confirmArea(firstArea);


    }]);