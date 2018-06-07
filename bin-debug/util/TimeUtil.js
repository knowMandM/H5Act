var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TimeUtil = (function () {
    function TimeUtil() {
    }
    /**
     * 获取 00：00：00格式的时间显示
     * @param _time 单位秒
     * @return
     */
    TimeUtil.getColonTimeStr = function (_time) {
        if (_time === void 0) { _time = 0; }
        var _h = Math.floor(_time / 3600);
        var _m = Math.floor((_time % 3600) / 60);
        var _s = (_time % 3600) % 60;
        var _str = (_h >= 10 ? (_h + "") : ("0" + _h)) + ":" + (_m >= 10 ? (_m + "") : ("0" + _m)) + ":" + (_s >= 10 ? (_s + "") : ("0" + _s));
        return _str;
    };
    /**
     * 获取 00：00格式的时间显示
     * @param _time 单位秒
     * @return
     */
    TimeUtil.getColonTimeStrByM = function (_time) {
        if (_time === void 0) { _time = 0; }
        var _m = Math.floor((_time % 3600) / 60);
        var _s = (_time % 3600) % 60;
        var _str = (_m >= 10 ? (_m + "") : ("0" + _m)) + ":" + (_s >= 10 ? (_s + "") : ("0" + _s));
        return _str;
    };
    TimeUtil.getColonTimeStrByM2 = function (_time) {
        if (_time === void 0) { _time = 0; }
        var _h = Math.floor(_time / 3600);
        var _m = Math.floor((_time % 3600) / 60);
        var _s = (_time % 3600) % 60;
        var _str = (_h >= 10 ? (_h + "") : ("0" + _h)) + ":" + (_m >= 10 ? (_m + "") : ("0" + _m)) + ":" + (_s >= 10 ? (_s + "") : ("0" + _s));
        return _str;
    };
    TimeUtil.getColonTimeStrByM3 = function (_time) {
        if (_time === void 0) { _time = 0; }
        var _D = Math.floor(_time / 86400);
        var _h = Math.floor((_time % 86400) / 3600);
        var _m = Math.floor(((_time % 86400) % 3600) / 60);
        var _s = ((_time % 86400) % 3600) % 60;
        var _str;
        if (_D > 0) {
            _str = _D + "天后";
        }
        else {
            _str = (_h >= 10 ? (_h + "") : ("0" + _h)) + ":" + (_m >= 10 ? (_m + "") : ("0" + _m)) + ":" + (_s >= 10 ? (_s + "") : ("0" + _s));
        }
        return _str;
    };
    TimeUtil.getHourMinuteTimeStr = function (second) {
        if (second === void 0) { second = 0; }
        TimeUtil.timeDate.setTime(second * 1000);
        var hour = TimeUtil.timeDate.getHours();
        var minute = TimeUtil.timeDate.getMinutes();
        var str = TimeUtil.getTimeText(hour, minute);
        return str;
    };
    TimeUtil.getTimeText = function (minute, second) {
        if (second === void 0) { second = 0; }
        var timeStr = "";
        timeStr += minute < 10 ? "0" + minute : minute.toString();
        timeStr += ":";
        timeStr += second < 10 ? "0" + second : second.toString();
        return timeStr;
    };
    /**
     * 若时间大于等于一天  返回 0天 格式的时间显示
     * 若时间小于一天 则返回 00：00：00格式的时间显示
     * @param _time
     * @return
     */
    TimeUtil.getFormatTimeStr = function (_time) {
        if (_time === void 0) { _time = 0; }
        if (_time >= TimeUtil.DAY_SECONDS) {
            return Math.ceil(_time / this.DAY_SECONDS) + "天";
        }
        return TimeUtil.getColonTimeStr(_time);
    };
    /**
     * C server 时间转成秒数
     */
    TimeUtil.timeToSec = function (str) {
        return parseInt(str.substr(8, 2)) * 3600 + parseInt(str.substr(10, 2)) * 60 + parseInt(str.substr(12, 2));
    };
    /**
     * C server 时间转成时间戳
     * @ param str - 20150401093000
     */
    TimeUtil.CTimeToAsTime = function (str) {
        var yy = Number(str.substr(0, 4));
        var mm = Number(str.substr(4, 2)) - 1; // javascript中月份是0-11表示的，真是费解。。
        var dd = Number(str.substr(6, 2));
        var hh = Number(str.substr(8, 2));
        var mu = Number(str.substr(10, 2));
        var ss = Number(str.substr(12, 2));
        var d1 = new Date(yy, mm, dd, hh, mu, ss);
        return d1.getTime();
    };
    TimeUtil.DAY_SECONDS = 24 * 3600;
    TimeUtil.timeDate = new Date();
    return TimeUtil;
}());
__reflect(TimeUtil.prototype, "TimeUtil");
//# sourceMappingURL=TimeUtil.js.map