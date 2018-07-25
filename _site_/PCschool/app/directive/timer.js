/**
 *
 * Created by Administrator on 2016/12/6.
 */
myAppModule.directive("timer", function () {
        return {
            restrict: 'A',
            replace: true,
            controller: function ($scope, $element, $attrs) {
            },
            link: function ($scope, $element, $attrs) {//注册事件监测

                var statue = true;

                var max = 5;

                var beginText = $($element).text();

                function start() {
                    if (!statue) {
                        console.log("当前点击无效")
                        return;
                    }
                    if (!$scope.ok) {
                        console.log("当前无处理函数，无效！")
                        return;
                    }

                    var result = $scope.ok();

                    if (result == false) {
                        console.log("controller处理失败，当前不进入计时!")
                        return;
                    }

                    statue = false;
                    var maxTemp = max;
                    $($element).addClass("phone-code-input-span-read")
                    var triger = setInterval(function () {
                        if (maxTemp == 0) {
                            end();
                            $($element).removeClass("phone-code-input-span-read")
                            clearInterval(triger);
                        } else {
                            maxTemp = maxTemp - 1;
                            $($element).text("倒计时:" + maxTemp);
                        }
                    }, 1000);

                }


                function end() {
                    statue = true;
                    $($element).text(beginText);
                }

                $($element).click(function () {
                    switch (statue) {
                        case true:
                            start();
                            break;
                        case false:
                            console.log("当前状态点击没用！");
                    }
                })
            }
        }
    }
)

