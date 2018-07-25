/**
 * Created by Administrator on 2016/3/8.
 */
myAppModule.provider("videoService", function () {
    this.statueUrl = "/pc/school/v1.0/video"
    this.setStatueUrl = function (newUrl) {
        if (newUrl) this.statueUrl = newUrl;
    }
    this.setLoginUrl = function (newLoginUrl) {
        if (newLoginUrl) this.loginUrl = newLoginUrl;
    }

    this.$get = function (syncHttp, StorageService) {
        var self = this;
        //获取
        function errorHandler() {
            console.log("获取学员数据失败！")
        }

        function getVideoDate(videoId) {
            if (StorageService["video-" + videoId]) {
                return StorageService["video-" + videoId];
            }
            var data = syncHttp.Get(self.statueUrl + "?videoId=" + videoId, null, errorHandler);
            if (data.data) {
                StorageService.set("video-" + videoId, data.data);
            }
            return data.data;
        }

        var service = {
            getVideo: function (studentNum) {
                return getVideoDate(studentNum);
            }
        };
        return service;
    }
})
