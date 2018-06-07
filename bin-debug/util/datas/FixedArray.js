var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by seethinks@gmail.com on 2015/8/20.
 */
var FixedArray = (function () {
    function FixedArray(type, len) {
        this.type = type;
        this.arr = new Array(len);
        var ddd;
        var i;
        for (i = 0; i < len; i++) {
            ddd = new (egret.getDefinitionByName(type));
            this.arr[i] = ddd;
        }
    }
    FixedArray.prototype.getAt = function (index) {
        return this.arr[index];
    };
    FixedArray.prototype.setAt = function (index, value) {
        this.arr[index] = value;
    };
    FixedArray.prototype.getLen = function () {
        return this.arr.length;
    };
    FixedArray.prototype.slice = function (p, len) {
        return this.arr.slice(p, len);
    };
    FixedArray.prototype.splice = function (p, len) {
        this.arr.splice(p, len);
    };
    FixedArray.prototype.indexOf = function (value) {
        var t = -1;
        if (this.type == "int") {
            for (var i = 0; i < this.arr.length; i++) {
                if (value == this.arr[i].value) {
                    t = i;
                }
            }
        }
        return t;
    };
    return FixedArray;
}());
__reflect(FixedArray.prototype, "FixedArray");
//# sourceMappingURL=FixedArray.js.map