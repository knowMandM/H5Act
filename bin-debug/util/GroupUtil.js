var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by seethinks@gmail.com on 2015/5/4.
 */
var GroupUtil = (function () {
    function GroupUtil() {
    }
    GroupUtil.removeAllElement = function (group) {
        while (group.numElements > 0) {
            group.removeChildAt(0);
        }
    };
    return GroupUtil;
}());
__reflect(GroupUtil.prototype, "GroupUtil");
//# sourceMappingURL=GroupUtil.js.map