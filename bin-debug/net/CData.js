var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by seethinks@gmail.com on 2015/8/19.
 */
var CData = (function () {
    function CData() {
        this.first = new int;
        this.second = "";
        this.thrid = false;
        this.fourth = new uint;
        this.fifth = new double;
        this.darr = new Array();
        this.sarr = new FixedArray("int", 10);
    }
    return CData;
}());
__reflect(CData.prototype, "CData");
//# sourceMappingURL=CData.js.map