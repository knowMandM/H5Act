var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by seethinks@gmail.com on 2015/8/10.
 */
var HashMap = (function () {
    function HashMap() {
        this.keys = new Array();
        this.values = new Array();
    }
    HashMap.prototype.clear = function () {
        while (this.keys.length > 0) {
            this.keys.pop();
        }
        while (this.values.length > 0) {
            this.values.pop();
        }
        this.updateSize();
    };
    HashMap.prototype.delete = function (key) {
        var result = false;
        var index = this.keys.indexOf(key);
        if (index != -1) {
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
            this.updateSize();
            result = true;
        }
        return result;
    };
    HashMap.prototype.forEach = function () {
    };
    HashMap.prototype.get = function (key) {
        var result = null;
        var index = this.keys.indexOf(key);
        if (index != -1) {
            result = this.values[index];
        }
        return result;
    };
    HashMap.prototype.has = function (key) {
        var index = this.keys.indexOf(key);
        return index != -1;
    };
    HashMap.prototype.set = function (key, value) {
        this.keys.push(key);
        this.values.push(value);
        this.updateSize();
    };
    HashMap.prototype.updateSize = function () {
        this.size = this.keys.length;
    };
    return HashMap;
}());
__reflect(HashMap.prototype, "HashMap");
//# sourceMappingURL=HashMap.js.map