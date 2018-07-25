/**
 * Created by Administrator on 2016/12/8.
 */
myAppModule.service("StorageService", function () {

    var cacheMap = {};

    var type = localStorage ? 1 : 0;

    var rt = {
        get: function (key) {
            switch (type) {
                case 1:
                    return localStorage.getItem(key) ? eval("(" + localStorage.getItem(key) + ")") : null;
                case 0:
                    return cacheMap[key];
            }
        },
        set: function (key, data) {
            switch (type) {
                case 1:
                    localStorage.setItem(key, (typeof data) == "string" ? data : JSON.stringify(data));
                    break;
                case 0:
                    cacheMap[key];
                    break;
            }
        },
        rem: function (key) {
            switch (type) {
                case 1:
                    localStorage.clear(key);
                    break;
                case 0:
                    delete cacheMap[key];
                    break;
            }
        }
    };
    return rt;
})

