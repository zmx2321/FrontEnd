/**
 * Created by liufangzhou on 2016/11/29.
 */
myAppModule.controller('loginController',
    ["$routeParams", "$scope", "asyncHttp", "DataCheckService", "AreaService", "StorageService", function ($routeParams, $scope, asyncHttp, DataCheckService, AreaService, StorageService) {

        //初始化登录背景
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 10,
                    "density": {
                        "enable": true,
                        "value_area": 200
                    }
                },
                "color": {
                    "value": "#f6e5ea"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 8,
                        "color": "#f6e5ea"
                    },
                    "polygon": {
                        "nb_sides": 0
                    },
                    // "image": {
                    //   "src": "img/github.svg",
                    //   "width": 100,
                    //   "height": 100
                    // }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#e1e1e1",
                    "opacity": 1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2.5,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 400,
                        "rotateY": 600
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.4
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });

        var thisApi = {
            statue: {
                dev: "mock/mockapi/statue.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/hasNeedEvaluate?studentNum=666",
                product: "/wx/school/v1.0/statue"
            },
            login: {
                product: "/pc/school/v1.0/login"
            },
            getUser: {
                dev: "mock/mockapi/getUserInfo.json",
                test: "http://192.168.1.150:9000/wx/school/v1.0/getUserInfo?userId=1",
                product: "/wx/school/v1.0/evaluate"
            },
            register: {
                "product": "/pc/school/v1.0/register"
            },
            sendCode: {
                "product": "/pc/school/v1.0/login/sendCode"
            },
            tempKeyLogin: {
                "product": "/pc/school/v1.0/login/tempKeyLogin"
            },
            updatePwd: {
                product: "/pc/school/v1.0/updatePwd"
            }

        };
        bMock.setFace(thisApi);
        bMock.setEnv("product");

        $scope.loginModel = {departmentId: "6"};

        $scope.$watch("loginModel.qq", function () {
            if ($scope.loginModel.qq && $scope.loginModel.qq.length == 11) {
                console.log("加载头像");
            } else {
                console.log("等等---加载头像");
            }
        })

        $scope.getLastestLoginInfo = function () {
            var cache = StorageService.get("loginInfo")
            if (cache) {
                if (cache.student) {
                    $scope.header = cache.student.header ? "http://static.iboom.tv/static/img/" + cache.student.header : "app/static/images/head_student.png"
                }
            } else {
                $scope.header = "app/static/images/head_student.png";
            }
        }

        $scope.getLastestLoginInfo()

        $scope.login = function () {
            if (!$scope.loginModel.pwd) {
                console.log("密码为填写!");
                return;
            }
            asyncHttp.create(bMock.getFace("login"), $scope.loginModel, function (data) {
                if (!data.data || data.data.code != 0) {
                    alert("登录失败！" + (data.data ? data.data.info : ""))
                    return;
                }
                StorageService.set("loginInfo", data.data);
                window.location.href = "app/index.html";
            }, function (data) {
                console.log("登录失败！")
            })
        };

        $scope.isLogin = true;
        $scope.toRegistered = function () {
            $scope.isLogin = false;
            $scope.isFind = false;
            $scope.isRegistered = true;
        }

        $scope.toFind = function () {
            $scope.isLogin = false;
            $scope.isRegistered = false;
            $scope.isFind = true;
        }

        $scope.backLogin = function () {
            $scope.isFind = false;
            $scope.isRegistered = true;
            $scope.isFirstStep = true;
            $scope.isLogin = true;

        }

        $scope.isFirstStep = true;

        $scope.findNext = function () {
            $scope.isFirstStep = false;
        }


        $scope.end = false;

        //lol学院departmentId为6
        $scope.registerModel = {departmentId: 6};

        $scope.checkResult = {phone: true, pwd: true, newPwd: true, tPwd: true};


        //注册使用
        $scope.register = function () {

            $scope.end = true;

            if (!$scope.check()) {
                console.log("校验位通过！不予执行");
                return;
            }

            asyncHttp.create(bMock.getFace("register"), $scope.registerModel, function (data) {
                if (data.error) {
                    alert(data.msg);
                } else {
                    //注册成功！
                    window.location.href = "index.html";
                }
            }, function () {

            })
        }

        $scope.findModel = {departmentId: 6};

        $scope.check = function () {
            var checkResult = phoneCheck($scope.registerModel.phone) && checkPwd($scope.registerModel.pwd) && pwdCheck($scope.registerModel.pwd, $scope.registerModel.newPwd)
            return checkResult;
        }


        function phoneCheck(data) {
            if ((/^1(3|4|5|7|8)\d{9}$/.test(data))) {
                return true;
            } else {
                //执行显示操作
                $scope.checkResult.phone = false;
                return false;
            }
        }

        function checkPwd(data) {
            if (/[0-9 | A-Z | a-z]{6,16}/.test(data)) {
                return true;
            } else {
                $scope.checkResult.pwd = false;
                return false;
            }
        }

        function pwdCheck(fPwd, sPwd) {
            if (fPwd == sPwd) {
                return true;
            } else {
                //执行显示操作
                $scope.checkResult.newPwd = false;
                return false;
            }
        }

        $scope.ok = function () {
            sendCode()
        }

        //找回密码使用
        function sendCode() {
            if (!$scope.findModel.findPwdPhone) {
                alert("找回手机未真确填写！")
                return false;
            }
            if ($scope.findModel.findPwdPhone.length != 11) {
                alert("找回手机号未正确填写！")
                return false;
            }
            asyncHttp.create(bMock.getFace("sendCode") + "?phone=" + $scope.findModel.findPwdPhone, $scope.registerModel, function (data) {
                if (data.error) {
                    alert(data.msg);
                } else {
                    console.log(data)
                }
            }, function () {

            })
        }

        //找回密码使用
        $scope.tempKeyLogin = function () {
            if (!$scope.findModel.findPwdCode) {
                alert("找回码未真确填写！")
                return;
            }

            if (!$scope.findModel.findPwdPhone) {
                alert("找回手机未真确填写！")
                return;
            }

            asyncHttp.create(bMock.getFace("tempKeyLogin") + "?phone=" + $scope.findModel.findPwdPhone + "&code=" + $scope.findModel.findPwdCode + "&departmentCode=" + $scope.findModel.departmentId, $scope.registerModel, function (data) {
                if (data.error) {
                    alert(data.msg);
                } else {
                    if (data.data) {
                        $scope.findNext();
                    }
                }
            }, function () {

            })
        }


        $scope.updatePwd = function () {
            if ($scope.newPwd == $scope.newPwd_2) {
                asyncHttp.get(bMock.getFace("updatePwd") + "?oldPwd=null&newPwd=" + $scope.newPwd, function (data) {
                    console.log(data)
                    window.location.href = "/index.html"
                }, function () {
                })
            } else {
                alert("您输入的两次密码不一致！")
            }
        }


        //选择大区

        $scope.isFirstChooseArea = true;
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
            $scope.isFirstChooseArea = false;
        }
        // var firstArea = {"version": 0, "id": 1, "name": "艾欧尼亚", "code": "电信一", "net": "电信"};
        // $scope.confirmArea(firstArea);

    }]);