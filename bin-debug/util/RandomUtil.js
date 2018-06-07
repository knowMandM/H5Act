var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 */
var RandomUtil = (function () {
    function RandomUtil() {
    }
    RandomUtil.uuid = function () {
        function s4() {
            return (((1 + Math.random()) * 0x10000) || 0).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    RandomUtil.getUid = function () {
        return this.uuid();
    };
    RandomUtil.getSmallRandom = function (len) {
        if (len === void 0) { len = 8; }
        return Math.random().toString(36).slice(2).slice(0, len);
    };
    RandomUtil.getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    return RandomUtil;
}());
__reflect(RandomUtil.prototype, "RandomUtil");
//# sourceMappingURL=RandomUtil.js.map