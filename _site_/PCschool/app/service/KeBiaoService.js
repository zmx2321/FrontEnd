/**
 * Created by Administrator on 2016/3/8.
 */
myAppModule.provider("keBiaoService", function () {
        this.statueUrl = "/pc/school/course/v1.0/courseTable?model=kebiao"
        this.loginUrl = "/index.html"
        this.setStatueUrl = function (newUrl) {
            if (newUrl) this.statueUrl = newUrl;
        }
        this.setLoginUrl = function (newLoginUrl) {
            if (newLoginUrl) this.loginUrl = newLoginUrl;
        }

        this.$get = function (syncHttp) { // injectables go here
            var self = this;
            var kebiao = {};
            //获取
            function errorHandler() {
                console.log("获取课表信息失败！")
            }

            function getKeBiaoDate() {
                var data = syncHttp.Get(self.statueUrl, null, errorHandler);
                if (data.data && data.data.childs) {
                    for (var a = 0; a < data.data.childs.length; a++) {
                        kebiao[data.data.childs[a] ? data.data.childs[a].name : null] = data.data.childs[a].carouselDtos;
                    }
                }
            }

            //获取所有的老师信息
            getKeBiaoDate();

            function getKeBiao(data, num) {
                var date = [];
                for (var a = 0; a < num; a++) {
                    var targetDate = new Date(data.getTime() + (3600 * 1000 * 24) * a);
                    var key = targetDate.Format("yyyy-MM-dd");
                    var kebiaoByDay = kebiao[key];
                    date.push({"date": targetDate.Format("MM-dd"), "day": targetDate.getDay(), "keBiao": kebiaoByDay});
                }
                return date;
            }


            var service = {
                "getKeBiao": function (data, num) {//根据起始日期拿N个
                    return getKeBiao(data, num);
                }
            };
            return service;
        }
    }
)
