/**
 * Created by liufangzhou on 2016/11/29.
 */
myAppModule.controller('allTeacherController',
    ["$routeParams", "$scope", '$rootScope', "asyncHttp", "DataCheckService", "userStatueService","LabService" ,function ($routeParams, $scope, $rootScope, asyncHttp, DataCheckService, userStatueService,LabService) {


        $scope.serviceType = $routeParams.serviceType;

        console.log($scope.serviceType);

        var thisApi = {
            revtProcessChta: {
                dev: "mock/mockapi/revtProcessChta.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/allTeacher",
                product: "/pc/school/v1.0/oto/lol/allTeacher"
            },
            getUser: {
                dev: "mock/mockapi/getUserInfo.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/getUserInfo?userId=1",
                product: "/pc/school/v1.0/getUserInfo"
            }

        };
        bMock.setFace(thisApi);
        bMock.setEnv("product");

        $rootScope.isMenuSelected = 2;

        //课程页标签视图名称
        var labViewName = "PC课程页分类视图";


        $scope.init = function () {
            asyncHttp.get("/pc/school/course/v1.0/labView?name=" + labViewName, function (data) {
                if (data.error) {
                    console.log("获取标签视图失败！");
                    return;
                }
                //分路
                $scope.fenlu = data.data.childs[0];
                $scope.fenlu.labInfos = $scope.getLabsByView($scope.fenlu);
            });
        }
        $scope.init();

        //获取标签视图下所有标签
        $scope.getLabsByView = function (labView) {
            var labs = [];
            labView.labs.forEach(function (labId) {
                labs.push(LabService.getLabInfo(labId));
            });
            return labs;
        }

        //获取全部老师信息
        $scope.getALLTeacher = function () {
            asyncHttp.get(bMock.getFace("revtProcessChta"), function (data, status) {
                if (DataCheckService.check$HttpError(data, status)) {
                    layer.alert('获取全部老师失败！');
                    return;
                }
                $scope.allTeachers = data.data;
                $scope.allTeachersAll = data.data;
                $scope.allTeachersAll2 = data.data;
                console.log(data.data);
            });
        }

        $scope.getALLTeacher();

        //获取符合信息的老师

        //点击分类查询课程
        $scope.clickLabTab = function (ele) {
            var lab=ele.labName;
            var list=[];
            for(var i=0;i< $scope.allTeachersAll2.length;i++){
                 var a= $scope.allTeachersAll2[i].teachRange.split(",");
                for(var j=0;j< a.length;j++){
                   if(lab.substr(0,1)==a[j].substr(0,1)){
                       list.push( $scope.allTeachersAll2[i]);
                       j=a.length;
                   }
                }
            }
            $scope.allTeachers = list;
            $scope.allTeachersAll=list;
        }

        //根据老师姓名查询课程
        $scope.clickQueryBtn = function () {
            var teachername=$("#teacher_name").val();
            var list=[];
            for(var i=0;i< $scope.allTeachersAll.length;i++){
             if($scope.allTeachersAll[i].name==teachername){
                 list.push($scope.allTeachersAll[i]);
             }
                }
            $scope.allTeachers = list;
        }


    }]);