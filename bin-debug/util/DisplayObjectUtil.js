var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by seethinks@gmail.com on 2015/5/4.
 */
var DisplayObjectUtil = (function () {
    function DisplayObjectUtil() {
    }
    DisplayObjectUtil.removeAllChild = function (dis) {
        while (dis.numChildren > 0) {
            dis.removeChildAt(0);
        }
    };
    DisplayObjectUtil.removeForParent = function (dis) {
        if (dis.parent)
            dis.parent.removeChild(dis);
    };
    DisplayObjectUtil.createTextFile = function () {
        var txt = new egret.TextField();
        txt.size = 24;
        return txt;
    };
    return DisplayObjectUtil;
}());
__reflect(DisplayObjectUtil.prototype, "DisplayObjectUtil");
//# sourceMappingURL=DisplayObjectUtil.js.map