var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by seethinks@gmail.com on 2015/8/20.
 */
var DArray = (function () {
    function DArray(type) {
        this.type = type;
        this.arr = new Array();
    }
    DArray.prototype.getAt = function (index) {
        return this.arr[index];
    };
    DArray.prototype.setAt = function (index, value) {
        this.arr[index] = value;
    };
    DArray.prototype.setLen = function (value) {
        this.arr.length = value;
    };
    DArray.prototype.getLen = function () {
        return this.arr.length;
    };
    return DArray;
}());
__reflect(DArray.prototype, "DArray");
//# sourceMappingURL=DArray.js.map