var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by seethinks@gmail.com on 2015/11/20.
 */
var ST;
(function (ST) {
    var AlignTool = (function () {
        function AlignTool() {
        }
        /**
         * spr 按照 spr2 居中对其
         * @param spr
         * @param spr2
         */
        AlignTool.spr_To_spr2_Center = function (spr, spr2) {
            spr.x = (spr2.width - spr.width) * .5;
            spr.y = (spr2.height - spr.height) * .5;
        };
        return AlignTool;
    }());
    ST.AlignTool = AlignTool;
    __reflect(AlignTool.prototype, "ST.AlignTool");
})(ST || (ST = {}));
//# sourceMappingURL=AlignTool.js.map