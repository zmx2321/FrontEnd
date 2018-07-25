/**
 * Created by Administrator on 2016/12/6.
 */
myAppModule.filter("dateText", function () {
        return function (input) {
            if (!input) {
                return new Date().Format("yyyy-MM-dd hh:mm:ss");
            }
            return new Date(input).Format("yyyy-MM-dd hh:mm:ss");
        };
    }
)

myAppModule.filter("dayText", function () {
        return function (input) {
            if (!input) {
                return new Date().Format("yyyy-MM-dd");
            }
            return new Date(input).Format("yyyy-MM-dd");
        };
    }
)

myAppModule.filter("HourText", function () {
        return function (input) {
            if (!input) {
                return new Date().Format("hh:mm");
            }
            return new Date(input).Format("hh:mm");
        };
    }
)


myAppModule.filter("evalText", function () {
        return function (input) {
            if (input) {
                return eval("(" + input + ")");
            }
            return {};
        };
    }
)

myAppModule.filter("weekDay", function () {
        return function (input) {
            switch (input) {
                case 1:
                    return "周一";
                    break;
                case 2:
                    return "周二"
                    break;
                case 3:
                    return "周三"
                    break;
                case 4:
                    return "周四"
                    break;
                case 5:
                    return "周五";
                    break;
                case 6:
                    return "周六";
                case 7:
                    return "周日";
                case 0:
                    return "周日";
            }
        };
    }
)

myAppModule.filter("championImg", function (ChampionService) {
        return function (input) {
            return ChampionService.findChampionImg(input);
        };
    }
)

myAppModule.filter("championName", function (ChampionService) {
        return function (input) {
            return ChampionService.findChampionName(input);
        };
    }
)

myAppModule.filter("championTitle", function (ChampionService) {
        return function (input) {
            return ChampionService.findChampionTitle(input);
        };
    }
)


myAppModule.filter("calcPercent", function () {
        return function (input, num, total) {
            num = parseFloat(num);
            total = parseFloat(total);
            if (isNaN(num) || isNaN(total)) {
                return "-";
            }
            return total <= 0 ? "0%" : ((num / total * 100).toFixed(1) + "%");
        };
    }
)
myAppModule.filter("studentInfo", function (studentService) {
        return function (input) {
            return studentService.getStudent(input);
        };
    }
)

myAppModule.filter("teacherInfo", function (TeacherService) {
        return function (input) {
            return TeacherService.getTeacherInfo(input);
        };
    }
)

myAppModule.filter("teacherheader", function (TeacherService) {
        return function (input) {
            var teacher = TeacherService.getTeacherInfo(input);
            if (teacher) {
                if (teacher.header) {
                    return "http://static.iboom.tv/static/img/" + teacher.header
                } else {
                    return "http://static.iboom.tv/static/img/default.png"
                }
            } else {
                return "http://static.iboom.tv/static/img/default.png"
            }
        };
    }
)

myAppModule.filter("championImg", function (ChampionService) {
        return function (input) {
            return ChampionService.findChampionImg(input);
        };
    }
)

myAppModule.filter('trusted', ['$sce', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

myAppModule.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);


myAppModule.filter('bindsummoner', ['studentService', function (studentService) {
    return function (text) {
        var d = studentService.getStudent(text);
        return d ? d.summoner : "暂未绑定";
    };
}]);


