/**
 * 参数定义说明：parent，child，scoreMaxTime，需要在score中定义一个函数，scoreCallBack
 * Created by Administrator on 2016/12/6.
 */
myAppModule.directive("scrollwatch", function (studentService) {
        return {
            restrict: 'A',
            replace: true,
            controller: function ($scope, $element, $attrs) {
            },
            link: function ($scope, $element, $attrs) {//注册事件监测
                var watchAttrs = $attrs.scrollwatch;
                if (!watchAttrs) {
                    console.log("监控参数缺失" + $element)
                }
                var data = eval("(" + watchAttrs + ")")
                if (data.parent) {
                    var parent = $("#" + data.parent);
                    var contentHeight = data.height;
                    if (!contentHeight) {
                        console.log("原始高度未定义，滚动条会存在问题")
                    }
                    var maxTime = data.scoreMaxTime ? data.scoreMaxTime : 10000;
                    var indexTime = 1;
                    var timer = 100;
                    $($element).scroll(function () {
                        console.log("-----")
                        //滚动条向下拉的距离大于总高度-100
                        console.log("滚动距离：" + $($element).scrollTop() + "parent高度" + parent.height());
                        if ($($element).scrollTop() + contentHeight >= (parent.height() - 30)) {
                            clearTimeout(timer)
                            timer = setTimeout(function () {
                                if (!$scope.$$phase) {
                                    $scope.$apply(function () {
                                        if (indexTime < maxTime) {
                                            $scope.scoreCallBack && $scope.scoreCallBack(indexTime);
                                            indexTime = indexTime + 1;
                                        }
                                    });
                                } else {
                                    if (indexTime < maxTime) {
                                        $scope.scoreCallBack && $scope.scoreCallBack(indexTime);
                                        indexTime = indexTime + 1;
                                    }
                                }
                            }, 200);
                        }
                    })
                }
            }
        }
    }
)

