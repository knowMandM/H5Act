var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BC = (function () {
    function BC() {
    }
    /**
     * 返回监听者队列
     * @return
     */
    BC.getInstancesDictionary = function () {
        return BC.instancesLib;
    };
    /**
     * 返回所有监听交互关系对象列表
     * @return
     *
     */
    BC.getListenerDictionary = function () {
        return BC.listenerLib;
    };
    Object.defineProperty(BC, "checkListenerFun", {
        /**
         * 检查监听信息的函数，检查函数如果返回true，将会进入Debug暂停模式，调试模式下生效
         * @return
         */
        get: function () {
            return BC._checkListenerFun;
        },
        /**
         * 检查监听信息的函数，检查函数如果返回true，将会进入Debug暂停模式，调试模式下生效
         * @return
         */
        set: function (fun) {
            BC._checkListenerFun = fun;
        },
        enumerable: true,
        configurable: true
    });
    /**
 * addEvent (监听者, 通知者, 事件名称, 函数,是否冒泡,排序,是否弱引用)<br/>
 * BC.addEvent(<font color="#0033ff"><b>this</b></font>,loader,Event.COMPLETE,
 * test2);<br/>
 *
 * @param a
 * @param p
 * @param event
 * @param func
 * @param useCapture
 * @param priority
 * @param useWeakReference    useWeakReference
 */
    BC.addEvent = function (a, p, event, func, useCapture, priority, useWeakReference) {
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        if (useWeakReference === void 0) { useWeakReference = false; }
        try {
            var listener = BC.listenerLib;
            var instances = BC.instancesLib;
            //				if(<boolean><any> (BC._checkListenerFun) && BC._checkListenerFun({listener:listener,instances:instances,info:this.arguments})){
            //					this.flash.debugger.enterDebugger();
            //				}
            p.addEventListener(event, func, this, useCapture, priority, useWeakReference);
            if (!listener[a]) {
                listener[a] = new Object();
            }
            if (!instances[p]) {
                instances[p] = new Object();
            }
            if (!instances[p][a]) {
                instances[p][a] = new Object();
            }
            var myobj = listener[a];
            if (!myobj[event]) {
                myobj[event] = {};
                myobj[event].captureTrue = new Object();
                myobj[event].captureFalse = new Object();
            }
            var eventLib = new Object();
            if (useCapture) {
                eventLib = myobj[event].captureTrue;
            }
            else {
                eventLib = myobj[event].captureFalse;
            }
            if (!eventLib[p] || !eventLib[p][func]) {
                if (!instances[p][a][func])
                    instances[p][a][func] = [];
                instances[p][a][func].push({ e: event, u: useCapture });
            }
            if (!eventLib[p]) {
                eventLib[p] = new Object();
            }
            eventLib[p][func] = func;
        }
        catch (e) {
            throw "参数不能为空!\n" + "addEvent(" + a + "," + p + "," + event + "," + func + "," + useCapture + "," + priority + "," + useWeakReference + ");";
        }
    };
    /**
 * 只监听到一次事件就删除监听，无需手动删除监听 手动删除不要传func参数，使用removeEvent(a,p,event);
 * 用法同addEvent方法.
 *
 * @param a
 * @param p
 * @param event
 * @param func
 * @param useCapture
 * @param priority
 * @param useWeakReference    useWeakReference
 */
    BC.addOnceEvent = function (a, p, event, func, useCapture, priority, useWeakReference) {
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        if (useWeakReference === void 0) { useWeakReference = false; }
        var onceFun = function handler(e) {
            BC.removeEvent(a, p, event, onceFun, useCapture);
            func(this.e);
        };
        BC.addEvent(a, p, event, onceFun, useCapture, priority, useWeakReference);
    };
    /**
 * <b>去除监听的用法一共有8种：</b><br/>
 * <ul>
 * 	<li><font color="#3f5fbf">000 删除指定监听者，指定事件名，指定回调函数的一条监听</font>	</li>
 * </ul>
 *        BC.removeEvent(<font color="#0033ff"><b>this</b></font>);
 * <ul>
 * 	<li><font color="#3f5fbf">001 删除指定监听者，指定回调函数的所有监听</font></li>
 * </ul>
 *        BC.removeEvent(<font color="#0033ff"><b>this</b></font>,<font
 * color="#0033ff"><b>null</b></font>,<font color="#0033ff"><b>null</b></font>,
 * eventHandler);
 * <ul>
 * 	<li><font color="#3f5fbf">010 删除指定监听者，指定事件名的所有监听</font></li>
 * </ul>
 *        BC.removeEvent(<font color="#0033ff"><b>this</b></font>,<font
 * color="#0033ff"><b>null</b></font>,Event.COMPLETE);
 * <ul>
 * 	<li><font color="#3f5fbf">011 删除指定监听者，指定事件名，指定回调函数的一条监听</font></li>
 * </ul>
 * BC.removeEvent(<font color="#0033ff"><b>this</b></font>,<font
 * color="#0033ff"><b>null</b></font>,Event.COMPLETE,eventHandler);
 * <ul>
 * 	<li><font color="#3f5fbf">100 删除指定通知者和监听者之间的所有监听</font></li>
 * </ul>
 *        BC.removeEvent(<font color="#0033ff"><b>this</b></font>,loader);
 * <ul>
 * 	<li><font color="#3f5fbf">101 删除通知者和监听者之间使用同一回调函数的所有监听</font></li>
 * </ul>
 * BC.removeEvent(<font color="#0033ff"><b>this</b></font>,loader,<font
 * color="#0033ff"><b>null</b></font>,eventHandler);
 * <ul>
 * 	<li><font color="#3f5fbf">110 删除通知者和监听者之间指定事件的所有监听</font></li>
 * </ul>
 *        BC.removeEvent(<font color="#0033ff"><b>this</b></font>,loader,Event.
 * COMPLETE);
 * <ul>
 * 	<li><font color="#3f5fbf">111 删除指定的一条监听</font></li>
 * </ul>
 *        BC.removeEvent(<font color="#0033ff"><b>this</b></font>,loader,Event.
 * COMPLETE, eventHandler);
 *
 * @param a
 * @param p
 * @param event
 * @param fun
 * @param useCapture    useCapture
 */
    BC.removeEvent = function (a, p, event, fun, useCapture) {
        if (p === void 0) { p = null; }
        if (event === void 0) { event = null; }
        if (fun === void 0) { fun = null; }
        if (useCapture === void 0) { useCapture = false; }
        if (!a) {
            console.log("监听者参数不能为空！");
            return;
        }
        ;
        var listener = BC.listenerLib;
        var instances = BC.instancesLib;
        var lib;
        var _fun;
        var _obj;
        var _arr;
        var _deleteList;
        var _hasListener = true;
        var i = 0;
        var len = 0;
        if (p && event && fun) {
            /**	type:111 20ms**/
            /**删除指定的一条监听**/
            if (!listener[a] || !listener[a][event]) {
                return;
            }
            lib = useCapture ? listener[a][event].captureTrue : listener[a][event].captureFalse;
            if (lib[p]) {
                p.removeEventListener(event, fun, this, useCapture);
                lib[p][fun] = null;
                _hasListener = false;
                for (_obj in lib[p]) {
                    _hasListener = true;
                    break;
                }
                if (!_hasListener) {
                    delete lib[p];
                }
                _arr = instances[p][a][fun];
                if (_arr) {
                    len = _arr.length;
                    for (i = 0; i < len; i++) {
                        _obj = _arr[i];
                        if (_obj.e == event && _obj.u == useCapture) {
                            _arr.splice(i, 1);
                            len--;
                            break;
                        }
                    }
                    if (!len) {
                        delete instances[p][a][fun];
                    }
                }
                _hasListener = false;
                for (_obj in instances[p][a]) {
                    _hasListener = true;
                    break;
                }
                if (!_hasListener) {
                    delete instances[p][a];
                }
            }
        }
        else if (!p && !event && !fun) {
            /**	type:000 15ms**/
            /**删除指定监听者，指定事件名，指定回调函数的一条监听**/
            _deleteList = [];
            for (event in listener[a]) {
                lib = listener[a][event].captureFalse;
                for (p in lib) {
                    var length1 = lib[p].length;
                    for (var i1 = 0; i1 < length1; i1++) {
                        fun = lib[p][i1];
                        p.removeEventListener(event, fun, this, false);
                    }
                    _deleteList.push(p);
                }
                lib = listener[a][event].captureTrue;
                for (p in lib) {
                    var length2 = lib[p].length;
                    for (var i2 = 0; i2 < length2; i2++) {
                        fun = lib[p][i2];
                        p.removeEventListener(event, fun, this, true);
                    }
                    _deleteList.push(p);
                }
            }
            len = _deleteList.length;
            for (i = 0; i < len; i++) {
                if (instances[_deleteList[i]])
                    delete instances[_deleteList[i]][a];
                _hasListener = false;
                for (_obj in instances[_deleteList[i]]) {
                    _hasListener = true;
                    break;
                }
                if (!_hasListener) {
                    delete instances[_deleteList[i]];
                }
            }
            delete listener[a];
        }
        else if (p && event && !fun) {
            /**	type:110 33ms**/
            /**删除通知者和监听者之间指定事件的所有监听**/
            if (!listener[a] || !listener[a][event]) {
                return;
            }
            lib = listener[a][event].captureFalse;
            if (lib[p]) {
                var length3 = lib[p].length;
                for (var i3 = 0; i3 < length3; i3++) {
                    fun = lib[p][i3];
                    p.removeEventListener(event, fun, this, false);
                }
                delete lib[p];
            }
            lib = listener[a][event].captureTrue;
            if (lib[p]) {
                var length4 = lib[p].length;
                for (var i4 = 0; i4 < length4; i4++) {
                    fun = lib[p][i4];
                    p.removeEventListener(event, fun, this, true);
                }
                delete lib[p];
            }
            _deleteList = [];
            for (_obj in instances[p][a]) {
                _fun = _obj;
                _arr = instances[p][a][_fun];
                if (_arr) {
                    len = _arr.length;
                    for (i = len - 1; i >= 0; i--) {
                        _obj = _arr[i];
                        if (_obj.e == event) {
                            _arr.splice(i, 1);
                            len--;
                        }
                    }
                    if (!len) {
                        _deleteList.push(_fun);
                    }
                }
            }
            len = _deleteList.length;
            for (i = 0; i < len; i++) {
                delete instances[p][a][_deleteList[i]];
            }
            _hasListener = false;
            for (_obj in instances[p][a]) {
                _hasListener = true;
                break;
            }
            if (!_hasListener) {
                delete instances[p][a];
            }
        }
        else if (p && !event && fun) {
            /**	type:101 29ms**/
            /**删除通知者和监听者之间使用同一回调函数的所有监听**/
            if (!instances[p] || !instances[p][a]) {
                return;
            }
            lib = instances[p][a];
            _arr = lib[fun];
            if (_arr) {
                len = _arr.length;
                for (i = 0; i < len; i++) {
                    _obj = _arr[i];
                    p.removeEventListener(_obj.e, fun, this, _obj.u);
                }
                delete lib[fun];
            }
            _hasListener = false;
            for (_obj in instances[p][a]) {
                _hasListener = true;
                break;
            }
            if (!_hasListener) {
                delete instances[p][a];
            }
            for (event in listener[a]) {
                lib = listener[a][event].captureFalse;
                if (lib[p]) {
                    p.removeEventListener(event, fun, this, false);
                    delete lib[p][fun];
                }
                _hasListener = false;
                for (_obj in lib[p]) {
                    _hasListener = true;
                    break;
                }
                if (!_hasListener) {
                    delete lib[p];
                }
                lib = listener[a][event].captureTrue;
                if (lib[p]) {
                    p.removeEventListener(event, fun, this, true);
                    delete lib[p][fun];
                }
                _hasListener = false;
                for (_obj in lib[p]) {
                    _hasListener = true;
                    break;
                }
                if (!_hasListener) {
                    delete lib[p];
                }
            }
        }
        else if (p && !event && !fun) {
            /**	type:100 42ms**/
            /**删除指定通知者和监听者之间的所有监听**/
            if (!instances[p] || !instances[p][a]) {
                return;
            }
            lib = instances[p][a];
            for (_obj in lib) {
                fun = _obj;
                _arr = lib[fun];
                if (_arr) {
                    len = _arr.length;
                    for (i = 0; i < len; i++) {
                        _obj = _arr[i];
                        p.removeEventListener(_obj.e, fun, this, _obj.u);
                    }
                }
            }
            delete instances[p][a];
            for (event in listener[a]) {
                lib = listener[a][event].captureFalse;
                if (lib[p]) {
                    var length5 = lib[p].length;
                    for (var i5 = 0; i5 < length5; i5++) {
                        fun = lib[p][i5];
                        p.removeEventListener(event, fun, this, false);
                    }
                    delete lib[p];
                }
                lib = listener[a][event].captureTrue;
                if (lib[p]) {
                    var length6 = lib[p].length;
                    for (var i6 = 0; i6 < length6; i6++) {
                        fun = lib[p][i6];
                        p.removeEventListener(event, fun, this, true);
                    }
                    delete lib[p];
                }
            }
        }
        else if (!p && event && fun) {
            /**	type:011 27ms**/
            /**删除指定监听者，指定事件名，指定回调函数的一条监听**/
            if (!listener[a] || !listener[a][event]) {
                return;
            }
            lib = listener[a][event].captureFalse;
            _deleteList = [];
            for (p in lib) {
                if (lib[p][fun]) {
                    _deleteList.push(p);
                }
            }
            lib = listener[a][event].captureTrue;
            for (p in lib) {
                if (lib[p][fun]) {
                    _deleteList.push(p);
                }
            }
            len = _deleteList.length;
            for (i = 0; i < len; i++) {
                BC.removeEvent(a, _deleteList[i], event, fun, useCapture);
            }
            return;
        }
        else if (!p && event && !fun) {
            /**	type:010 16ms**/
            /**删除指定监听者，指定事件名，指定回调函数的一条监听**/
            if (!listener[a] || !listener[a][event]) {
                return;
            }
            lib = listener[a][event].captureFalse;
            _deleteList = [];
            for (p in lib) {
                _deleteList.push(p);
            }
            lib = listener[a][event].captureTrue;
            for (p in lib) {
                _deleteList.push(p);
            }
            len = _deleteList.length;
            for (i = 0; i < len; i++) {
                BC.removeEvent(a, _deleteList[i], event);
            }
            return;
        }
        else if (!p && !event && fun) {
            /**	type:001 13ms**/
            /**删除指定监听者，指定事件名，指定回调函数的一条监听**/
            _deleteList = [];
            for (event in listener[a]) {
                lib = listener[a][event].captureFalse;
                for (p in lib) {
                    if (lib[p][fun]) {
                        _deleteList.push([p, event]);
                    }
                }
                lib = listener[a][event].captureTrue;
                for (p in lib) {
                    if (lib[p][fun]) {
                        _deleteList.push([p, event]);
                    }
                }
            }
            len = _deleteList.length;
            for (i = 0; i < len; i++) {
                BC.removeEvent(a, _deleteList[i][0], _deleteList[i][1]);
            }
            return;
        }
        for (event in listener[a]) {
            _hasListener = false;
            for (_obj in listener[a][event].captureTrue) {
                _hasListener = true;
                break;
            }
            for (_obj in listener[a][event].captureFalse) {
                _hasListener = true;
                break;
            }
            if (!_hasListener) {
                delete listener[a][event];
            }
        }
        _hasListener = false;
        for (_obj in listener[a]) {
            _hasListener = true;
            break;
        }
        if (!_hasListener) {
            delete listener[a];
        }
        _hasListener = false;
        for (_obj in instances[p]) {
            _hasListener = true;
            break;
        }
        if (!_hasListener) {
            delete instances[p];
        }
    };
    /**
     * 监听者队列
     */
    BC.instancesLib = new Object();
    /**
     * 监听交互关系对象列表
     */
    BC.listenerLib = new Object();
    return BC;
}());
__reflect(BC.prototype, "BC");
//# sourceMappingURL=BC.js.map