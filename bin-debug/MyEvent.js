var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MyEvent = (function (_super) {
    __extends(MyEvent, _super);
    function MyEvent(type, _data, bubbles, cancelable) {
        if (_data === void 0) { _data = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.data = _data;
        return _this;
    }
    /**
     * 使用 EventDispatcher 对象注册事件侦听器对象，以使侦听器能够接收事件通知。可以为特定类型的事件、阶段和优先级在显示列表中的所有节点上注册事件侦听器。
     * @param type
     * @param listener
     * @param useCapture
     * @param priority
     * @param useWeakReference
     */
    MyEvent.addEventListener = function (type, listener, target, useCapture, priority) {
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        this._dispatch.addEventListener(type, listener, target, useCapture, priority);
    };
    /**
     * 从 EventDispatcher 对象中删除侦听器。如果没有向 EventDispatcher 对象注册任何匹配的侦听器，则对此方法的调用没有任何效果。
     * @param type
     * @param listener
     * @param useCapture
     */
    MyEvent.removeEventListener = function (type, listener, target, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        this._dispatch.removeEventListener(type, listener, target, useCapture);
    };
    /**
     * 将事件分派到事件流中。事件目标是对其调用 dispatchEvent() 方法的 EventDispatcher 对象。
     * @param event
     */
    MyEvent.dispatchEvents = function (event) {
        this._dispatch.dispatchEvent(event); // .target,event.type,event.bubbles,this.data
    };
    MyEvent.INITSCENE = "init_scene";
    MyEvent.GETREWARD1 = "get_reward1";
    MyEvent.GETREWARD2 = "get_reward2";
    MyEvent.REFRESHREWARDRET1 = "refresh_reward_ret1";
    MyEvent.REFRESHREWARDRET2 = "refresh_reward_ret2";
    MyEvent.REFRESHFINAL = "refresh_final_reward";
    MyEvent.GETFINALREWARD = "get_final_reward";
    MyEvent.ACTNOTOPEN = "act_not_open";
    MyEvent.ACTEND = "act_end";
    MyEvent.INITLOADING = "init_loading";
    MyEvent._dispatch = new egret.EventDispatcher();
    return MyEvent;
}(egret.Event));
__reflect(MyEvent.prototype, "MyEvent");
//# sourceMappingURL=MyEvent.js.map