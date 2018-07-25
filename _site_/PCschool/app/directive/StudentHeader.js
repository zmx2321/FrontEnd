/**
 * Created by Administrator on 2016/12/6.
 */
myAppModule.directive("studentheader", function (studentService) {
        return {
            restrict: 'A',
            replace: true,
            controller: function ($scope, $element, $attrs) {
            },
            link: function ($scope, $element, $attrs) {//×¢²áÊÂ¼þ¼à²â
                var dateKey = $attrs.studentheader;
                try {
                    var dk = dateKey.split("-")[0];
                    var studentNumKey = dateKey.split("-")[1]
                    var studentNum = ($scope[dk])[studentNumKey];
                    var student = studentService.getStudent(studentNum);
                    if (student) {
                        $($element).attr("src", "http://static.iboom.tv/static/img/" + (student.header ? student.header : "default.png"));
                    } else {
                        $($element).attr("src", "http://static.iboom.tv/static/img/default.png");
                    }
                } catch (e) {
                    $($element).attr("src", "http://static.iboom.tv/static/img/default.png");
                }

            }
        }
    }
)

myAppModule.directive("selfheader", function (userStatueService) {
        return {
            restrict: 'A',
            replace: true,
            controller: function ($scope, $element, $attrs) {
            },
            link: function ($scope, $element, $attrs) {//×¢²áÊÂ¼þ¼à²â
                try {
                    var statue = userStatueService.getStatue();
                    if (!statue) {
                        $($element).attr("src", "http://static.iboom.tv/static/img/default.png");
                    } else {
                        var student = statue.student;
                        if (student) {
                            $($element).attr("src", "http://static.iboom.tv/static/img/" + (student.header ? student.header : "default.png"));
                        } else {
                            $($element).attr("src", "http://static.iboom.tv/static/img/default.png");
                        }
                    }
                } catch (e) {
                    $($element).attr("src", "http://static.iboom.tv/static/img/default.png");
                }

            }
        }
    }
)