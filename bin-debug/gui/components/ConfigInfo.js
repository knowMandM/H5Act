var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by seethinks@gmail.com on 2015/11/19.
 */
var ST;
(function (ST) {
    var ConfigInfo = (function () {
        function ConfigInfo() {
        }
        ConfigInfo.YOYO_SPEED = 80;
        ConfigInfo.ALPHA_OUT_SPEED = 800;
        return ConfigInfo;
    }());
    ST.ConfigInfo = ConfigInfo;
    __reflect(ConfigInfo.prototype, "ST.ConfigInfo");
})(ST || (ST = {}));
//# sourceMappingURL=ConfigInfo.js.map