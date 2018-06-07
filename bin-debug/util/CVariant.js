var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by seethinks@gmail.com on 2015/8/19.
 */
var CVariant = (function () {
    function CVariant(type) {
        this.type = type;
    }
    return CVariant;
}());
__reflect(CVariant.prototype, "CVariant");
//# sourceMappingURL=CVariant.js.map