var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by seethinks@gmail.com on 2015/8/20.
 */
var double = (function () {
    function double(value) {
        if (value === void 0) { value = 0; }
        this.value = value;
    }
    return double;
}());
__reflect(double.prototype, "double");
//# sourceMappingURL=double.js.map