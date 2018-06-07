var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VectorUtil = (function () {
    function VectorUtil() {
    }
    VectorUtil.vertorToArray = function (_v) {
        var arr = [];
        if (_v) {
            try {
                for (var i = 0; i < _v.getLen(); i++) {
                    arr.push(_v.getAt(i).value);
                }
            }
            catch (Error) {
                for (var i = 0; i < _v.length; i++) {
                    arr.push(_v[i].value);
                }
            }
        }
        return arr;
    };
    return VectorUtil;
}());
__reflect(VectorUtil.prototype, "VectorUtil");
//# sourceMappingURL=VectorUtil.js.map