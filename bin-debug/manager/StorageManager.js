var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StorageManager = (function () {
    function StorageManager() {
    }
    //public static MULTI_DETAIL: string = "multiDetail";
    StorageManager.removeLocalStorage = function (itemName) {
        egret.localStorage.removeItem(itemName);
    };
    StorageManager.addLocalStorage = function (itemName, value) {
        egret.localStorage.setItem(itemName, value);
    };
    StorageManager.getLocalStorage = function (itemName) {
        var a = egret.localStorage.getItem(itemName);
        if (a == undefined)
            return "";
        return a;
    };
    //更新下拉列表
    StorageManager.updateUserList = function (userName, pwd, typeID) {
        var arrStr;
        if (typeID == 1)
            arrStr = StorageManager.getLocalStorage(StorageManager.LOGIN_LIST1);
        else
            arrStr = StorageManager.getLocalStorage(StorageManager.LOGIN_LIST2);
        var isFresh = false;
        if (arrStr != "" && arrStr != undefined)
            var arr = JSON.parse(arrStr);
        else
            var arr = null;
        if (arr != null && arr != undefined && arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].key == userName) {
                    arr[i].value = pwd;
                    isFresh = true;
                    break;
                }
            }
        }
        else
            arr = new Array();
        if (!isFresh) {
            arr.push({ key: userName, value: pwd });
        }
        arrStr = JSON.stringify(arr);
        if (typeID == 1)
            StorageManager.addLocalStorage(StorageManager.LOGIN_LIST1, arrStr);
        else
            StorageManager.addLocalStorage(StorageManager.LOGIN_LIST2, arrStr);
    };
    StorageManager.GetPdwByUserName = function (userName) {
        var pwd = StorageManager.getLocalStorage(StorageManager.CUR_PWD);
        if (pwd != null && pwd != undefined && pwd != "") {
            return pwd;
        }
        var arrStr = StorageManager.getLocalStorage(StorageManager.LOGIN_LIST1);
        var data = JSON.parse(arrStr);
        if (data != null && data != undefined)
            for (var i = 0; i < data.length; i++) {
                var key = data[i].key;
                var value = data[i].value;
                if (userName == key)
                    return value;
            }
        return "";
    };
    StorageManager.USER_SIGN = "userSign";
    StorageManager.SCORE_LIST = "scoreList";
    StorageManager.MULTI_BOUT = "multiBout";
    StorageManager.LOGIN_NAME = "LOGIN_NAME";
    StorageManager.LOGIN_PWD = "LOGIN_PWD";
    StorageManager.LOGIN_NAME2 = "LOGIN_NAME2";
    StorageManager.LOGIN_PWD2 = "LOGIN_PWD2";
    StorageManager.LOGIN_TYPE = "LOGIN_TYPE"; //用户名登录 1;  手机号登录 2;
    StorageManager.LOGIN_LIST1 = "LOGIN_LIST1";
    StorageManager.LOGIN_LIST2 = "LOGIN_LIST2";
    StorageManager.FRIEND_ROOM_NAME = "FRIEND_ROOM_NAME";
    StorageManager.CUR_PWD = "CUR_PWD";
    return StorageManager;
}());
__reflect(StorageManager.prototype, "StorageManager");
//# sourceMappingURL=StorageManager.js.map