var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CustomMap = (function () {
    function CustomMap() {
        this._record = new Object();
        this._length = 0;
    }
    /**添加一个对象 */
    CustomMap.prototype.add = function (key, value, thisObjOfKey, cover) {
        if (cover === void 0) { cover = false; }
        var added = false;
        var uid = UIDManager.getUid(key, thisObjOfKey);
        if (this._record[uid] == null) {
            this._record[uid] = value;
            this._length++;
            added = true;
        }
        else if (cover) {
            var valueOld = this._record[uid];
            if (valueOld != value) {
                if (valueOld.constructor == CustomMap) {
                    valueOld.gc();
                }
                this._record[uid] = value;
            }
            added = true;
        }
        return added;
    };
    /**更新某个key的值 */
    CustomMap.prototype.update = function (key, value, thisObjOfKey) {
        var uid = UIDManager.getUid(key, thisObjOfKey);
        if (this._record[uid] != null) {
            this._record[uid] = value;
        }
    };
    /**获取对象 */
    CustomMap.prototype.get = function (key, thisObjOfKey) {
        var uid = UIDManager.getUid(key, thisObjOfKey);
        return this._record[uid];
    };
    /**删除一个对象*/
    CustomMap.prototype.del = function (key, thisObjOfKey) {
        var uid = UIDManager.getUid(key, thisObjOfKey);
        var value = this._record[uid];
        delete this._record[uid];
        if (value != null) {
            this._length--;
        }
        return value;
    };
    /**回收 */
    CustomMap.prototype.gc = function () {
        this.clear();
    };
    /**清理 */
    CustomMap.prototype.clear = function () {
        var uid;
        var value;
        for (uid in this._record) {
            value = this._record[uid];
            delete this._record[uid];
            if (value.constructor == CustomMap) {
                value.gc();
            }
        }
        this._length = 0;
    };
    /**按值遍历 */
    CustomMap.prototype.forEach = function (callBack, thisObjOfCallBack) {
        var key;
        var value;
        for (key in this._record) {
            value = this._record[key];
            if (!callBack.apply(thisObjOfCallBack, [value])) {
                return;
            }
        }
    };
    /**按Key遍历 */
    CustomMap.prototype.for = function (callBack, thisObjOfCallBack) {
        var key;
        for (key in this._record) {
            if (!callBack.apply(thisObjOfCallBack, [key])) {
                return;
            }
        }
    };
    Object.defineProperty(CustomMap.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    return CustomMap;
}());
__reflect(CustomMap.prototype, "CustomMap");
var UIDManager = (function () {
    function UIDManager() {
    }
    /**获取某个对象的uid */
    UIDManager.getUid = function (target, thisObjOfTarget) {
        if (target != null) {
            if (target.constructor == String || target.constructor == Number)
                return target;
            if (target["com.once.uid"] == null) {
                UIDManager._uid++;
                target["com.once.uid"] = "com.once.uid" + UIDManager._uid;
            }
            if (thisObjOfTarget != null) {
                if (thisObjOfTarget["com.once.uid"] == null) {
                    UIDManager._uid++;
                    thisObjOfTarget["com.once.uid"] = "com.once.uid" + UIDManager._uid;
                }
                return thisObjOfTarget["com.once.uid"] + "_" + target["com.once.uid"];
            }
            return target["com.once.uid"];
        }
        throw new Error("uid生成失败");
    };
    UIDManager._uid = 0;
    return UIDManager;
}());
__reflect(UIDManager.prototype, "UIDManager");
//# sourceMappingURL=CustomMap.js.map