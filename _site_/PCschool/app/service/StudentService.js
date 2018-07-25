/**
 * Created by Administrator on 2016/3/8.
 */
myAppModule.provider("studentService", function () {
    this.statueUrl = "/pc/school/v1.0/studentInfo"
    this.setStatueUrl = function (newUrl) {
        if (newUrl) this.statueUrl = newUrl;
    }
    this.setLoginUrl = function (newLoginUrl) {
        if (newLoginUrl) this.loginUrl = newLoginUrl;
    }

    this.$get = function (syncHttp, StorageService, userStatueService) { // injectables go here
        var self = this;
        //获取
        function errorHandler() {
            console.log("获取学员数据失败！")
        }

        function getStatueDate(studentNum) {
            if (StorageService.get(studentNum)) {
                return StorageService.get(studentNum);
            }
            var data = syncHttp.Get(self.statueUrl + "?studentNum=" + studentNum, null, errorHandler);
            if (data.data) {
                StorageService.set(studentNum, data.data);
            }
            return data.data;
        }

        var service = {
            getStudent: function (studentNum) {
                return getStatueDate(studentNum);
            },
            clearStudentache: function (key) {
                StorageService.rem(key)
            }
        };
        return service;
    }
})
