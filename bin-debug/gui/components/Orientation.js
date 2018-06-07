var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ST;
(function (ST) {
    var Orientation = (function () {
        function Orientation() {
        }
        /**
         * vertical orientation
         */
        Orientation.VERTICAL = "myVertical";
        /**
         * horizontal orientation
         */
        Orientation.HORIZONTAL = "myHorizontal";
        /**
         * indicates whether we need vertical, horizontal or both
         */
        Orientation.AUTO = "myAuto";
        return Orientation;
    }());
    ST.Orientation = Orientation;
    __reflect(Orientation.prototype, "ST.Orientation");
})(ST || (ST = {}));
//# sourceMappingURL=Orientation.js.map