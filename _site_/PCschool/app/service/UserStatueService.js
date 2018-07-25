/**
 * Created by Administrator on 2016/3/8.
 */
myAppModule.provider("userStatueService", function () {
    this.statueUrl = "/pc/school/v1.0/statue"
    this.loginUrl = "/index.html"
    this.setStatueUrl = function (newUrl) {
        if (newUrl) this.statueUrl = newUrl;
    }
    this.setLoginUrl = function (newLoginUrl) {
        if (newLoginUrl) this.loginUrl = newLoginUrl;
    }

    this.$get = function (syncHttp) { // injectables go here
        var self = this;
        var userStatue;
        //获取
        function errorHandler() {
            //获取登录状态失败，5秒跳转到登录页
            setTimeout(function () {
                window.location.href = self.loginUrl
            }, 5000);
        }

        function offLineHandler() {
            window.location.href = self.loginUrl
        }

        function getStatueDate() {
            var data = syncHttp.Get(self.statueUrl, null, errorHandler);
            if (data.data) {
                userStatue = data.data;
            } else {
                offLineHandler ? offLineHandler() : "";
            }
        }

        getStatueDate();


        setInterval(getStatueDate, 30000);

        var service = {
            getStatue: function () {
                return userStatue;
            },
            isSelf: function (studentNum) {
                if (userStatue) {
                    return userStatue.student.studentNum == studentNum;
                } else {
                    return false;
                }
            }
        };
        return service;
    }
})
