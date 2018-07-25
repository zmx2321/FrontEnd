/**
 * Created by liufangzhou on 2016/12/5.
 */

myAppModule.controller('editPersonController',
    ["$routeParams", "$scope", '$rootScope', "asyncHttp","userStatueService","StorageService", "AreaService", function ($routeParams, $scope, $rootScope, asyncHttp,userStatueService,StorageService, AreaService) {

        var thisApi = {
            updateInfo: {
                product: "/pc/school/v1.0/updateUserInfo"
            },
            sendCode: {
                "product": "/pc/school/v1.0/login/sendCode"
            },
            tempKeyLogin: {
                "product": "/pc/school/v1.0/login/tempKeyLogin"
            },
            updatePwd: {
                product: "/pc/school/v1.0/updatePwd"
            },
            bindSummoner: {
                product: "/pc/school/v1.0/bindSummoner"
            },
            updateHeader: {
                product: "/pc/school/v1.0/updateStudentHeader"
            }
        };
        bMock.setFace(thisApi);
        bMock.setEnv('product');

        $scope.mes = "menu";
        console.log($scope.mes);

        $scope.menuSelected = function (num) {
            $rootScope.isMenuSelected = num;
        };

        $scope.loginOut = function () {
            console.log("111");
            window.location.pathname = "index.html";
        };

        $scope.editInfo = function (num) {
            $scope.personStatue.userInfo = angular.copy($scope.userInfoBackup);//恢复到备份
            $scope.editNum = num;
            if (num === 0) {
                $("#editQQ").removeAttr("disabled");
                $("#editWX").attr("disabled", "disabled");
                $("#editPhone").attr("disabled", "disabled");
                return;
            } else if (num === 1) {
                $("#editQQ").attr("disabled", "disabled");
                $("#editWX").removeAttr("disabled");
                $("#editPhone").attr("disabled", "disabled");
                return;
            } else if (num === 2) {
                $("#editQQ").attr("disabled", "disabled");
                $("#editWX").attr("disabled", "disabled");
                $("#editPhone").removeAttr("disabled");
                return;
            } else {
                $("#editQQ").attr("disabled", "disabled");
                $("#editWX").attr("disabled", "disabled");
                $("#editPhone").attr("disabled", "disabled");
                return;
            }
        }

        $scope.showSection = 0;

        $scope.changeSection = function (num) {
            //初始化参数
            $scope.findModel.findPwdPhone = null;
            $scope.findModel.findPwdCode = null;
            $scope.oldPwd = null;
            $scope.newPwd = null;
            $scope.newPwd_2 = null;
            $scope.isSendMessage = false;
            $scope.sendStatue = 0;
            $scope.isNext = false;
            $scope.summoner = $scope.personStatue.student.summoner;
            $scope.confirmArea(AreaService.get($scope.personStatue.student.areaCode));

            $scope.showSection = num;
        }

        $scope.isSendMessage = false;
        $scope.sendStatue = 0;
        $scope.sendMessage = function () {
            $scope.sendStatue = 1;
            $scope.isSendMessage = true;
        }

        $scope.isNext = false;
        $scope.nextStep = function () {
            $scope.isNext = true;
        }

        $scope.editPerson = function () {
            $scope.isShowMask = true
            $scope.isShoweditPerson = true;
            $scope.isEdshow = true;

        }
        $scope.closeeditPerson = function () {
            $scope.isShoweditPerson = false;
            $scope.isShowMask = false;
            $scope.isEdshow = false;
            //上传头像
            asyncHttp.create('/uploadBase64File',localStorage.getItem('photo'), function (data) {
                if (data.error) {
                    layer.alert("查询失败！");
                } else {
                    $scope.personStatue.student.header = data.data;
                    asyncHttp.create(bMock.getFace("updateHeader")+ "?header=" + $scope.personStatue.student.header,null,function (data) {
                        if (data.error) {
                            layer.alert("更新头像失败");
                            return;
                        }
                    },function (data) {
                    })
                }
            }, function (data) {
                layer.alert("查询失败！");
            })
        }

        //初始化
        $scope.init = function () {
            $scope.personStatue = userStatueService.getStatue();//获取学员状态
            $scope.userInfoBackup = angular.copy($scope.personStatue.userInfo);//信息建立一份拷贝
        }
        $scope.init();

        //更新
        $scope.updateInfo = function () {
            asyncHttp.create(bMock.getFace("updateInfo"), $scope.personStatue.userInfo, function (data) {
                if (data.error) {
                    layer.alert("更新失败");
                    return;
                }
                $scope.userInfoBackup = angular.copy($scope.personStatue.userInfo);//更新备份
                $scope.editInfo(4);
            }, function (data) {
                layer.alert("更新失败！");
            })
        }

        $scope.isChooseArea = false;
        //点击关闭大区信息
        $scope.closeChooseArea = function () {
            $scope.isShowMask = false;
            $scope.isChooseArea = false;
        }

        $scope.closeChooseArea = function () {
            $scope.isShowMask = false;
            $scope.isChooseArea = false;
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
        // console.log($scope.AllNetArea);
        $scope.DXArea = $scope.AllNetArea.电信;
        // console.log($scope.DXArea);
        $scope.WTArea = $scope.AllNetArea.网通;
        $scope.JJArea = $scope.AllNetArea.教育;

        $scope.confirmArea = function (area) {
            $scope.selectedArea = area;
            $scope.selectedAreaNet = $scope.selectedArea.net;
            $scope.selectedAreaName = $scope.selectedArea.name;
            $scope.selectedAreaId = $scope.selectedArea.id;
            $scope.closeChooseArea();
        }

        //更新
        $scope.updateInfo = function () {
            asyncHttp.create(bMock.getFace("updateInfo"), $scope.personStatue.userInfo, function (data) {
                if (data.error) {
                    layer.alert("更新失败");
                    return;
                }
                $scope.userInfoBackup = angular.copy($scope.personStatue.userInfo);//更新备份
                $scope.editInfo(4);
            }, function (data) {
                layer.alert("更新失败！");
            })
        }

        $scope.uoloadHeader = function () {

        }


        //lol学院departmentId为6
        $scope.registerModel = {departmentId: 6};
        $scope.findModel = {departmentId: 6};

        //找回密码使用
        $scope.sendCode = function () {
            if (!$scope.findModel.findPwdPhone) {
                alert("找回手机未真确填写！")
                return;
            }
            if ($scope.findModel.findPwdPhone.length != 11) {
                alert("找回手机号未正确填写！")
                return;
            }
            asyncHttp.create(bMock.getFace("sendCode") + "?phone=" + $scope.findModel.findPwdPhone, $scope.registerModel, function (data) {
                if (data.error) {
                    alert(data.msg);
                } else {
                    console.log(data);
                }
            }, function () {

            })
        }

        //找回密码使用
        $scope.tempKeyLogin = function () {
            if (!$scope.findModel.findPwdCode) {
                alert("找回码未真确填写！");
                return;
            }

            if (!$scope.findModel.findPwdPhone) {
                alert("找回手机未真确填写！");
                return;
            }

            asyncHttp.create(bMock.getFace("tempKeyLogin") + "?phone=" + $scope.findModel.findPwdPhone + "&code=" + $scope.findModel.findPwdCode + "&departmentCode=" + $scope.findModel.departmentId, $scope.registerModel, function (data) {
                if (data.error) {
                    alert(data.msg);
                } else {
                    if (data.data) {
                        $scope.nextStep();
                    }
                }
            }, function () {

            })
        }

        $scope.updatePwd = function () {
            if ($scope.newPwd == $scope.newPwd_2) {
                asyncHttp.get(bMock.getFace("updatePwd") + "?oldPwd="+ $scope.oldPwd +"&newPwd=" + $scope.newPwd, function (data) {
                    console.log(data);
                    if(data.error){
                        alert(data.msg);
                        return;
                    }
                    $scope.changeSection(0);
                }, function () {
                })
            } else {
                alert("您输入的两次密码不一致！")
            }
        }

        $scope.bindSummoner = function () {
            asyncHttp.get(bMock.getFace("bindSummoner") + "?summoner="+ $scope.summoner +"&areaCode=" + $scope.selectedAreaId, function (data) {
                if(data.error){
                    alert(data.msg);
                    return;
                }
                $scope.personStatue.student.summoner = data.data.summoner;
                $scope.personStatue.student.areaCode = data.data.areaCode;
                $scope.changeSection(0);
            }, function () {
            })
        }

    }]);
