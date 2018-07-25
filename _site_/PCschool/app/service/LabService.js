/**
 * Created by Administrator on 2016/3/8.
 */
myAppModule.provider("LabService", function () {
        this.statueUrl = "/pc/school/v1.0/labs"
        this.loginUrl = "/index.html"
        this.setStatueUrl = function (newUrl) {
            if (newUrl) this.statueUrl = newUrl;
        }
        this.setLoginUrl = function (newLoginUrl) {
            if (newLoginUrl) this.loginUrl = newLoginUrl;
        }

        this.$get = function (syncHttp) { // injectables go here
            var self = this;
            var labs = {};
            //获取
            function errorHandler() {
                //获取登录状态失败，5秒跳转到登录页
                console.log("获取老师信息失败！")
            }

            function getAllLabInfos() {
                var data = syncHttp.Get(self.statueUrl, null, errorHandler);
                if (data.data) {
                    for (var a = 0; a < data.data.length; a++) {
                        labs[data.data[a].id] = data.data[a];
                    }
                }
            }

            //获取所有的老师信息
            getAllLabInfos();


            var service = {
                getLabInfo: function (id) {
                    return labs[id];
                }
            };
            return service;
        }
    }
)
