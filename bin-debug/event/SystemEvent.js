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
var SystemEvent = (function (_super) {
    __extends(SystemEvent, _super);
    function SystemEvent(type, _data, bubbles, cancelable) {
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
    SystemEvent.addEventListener = function (type, listener, target, useCapture, priority) {
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
    SystemEvent.removeEventListener = function (type, listener, target, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        this._dispatch.removeEventListener(type, listener, target, useCapture);
    };
    /**
     * 将事件分派到事件流中。事件目标是对其调用 dispatchEvent() 方法的 EventDispatcher 对象。
     * @param event
     */
    SystemEvent.dispatchEvents = function (event) {
        this._dispatch.dispatchEvent(event); // .target,event.type,event.bubbles,this.data
    };
    SystemEvent.LOGIN_RESULT = "login_result";
    SystemEvent.MOBILENO_LOGIN_RESULT = "MobileNo_login_result";
    SystemEvent.ONKEYREG_RESULT = "onkey_result";
    SystemEvent.VALIDSIGN_RESULT = "validSign_result";
    SystemEvent.GET_ALL_LIVE_ROOM = "get_all_live_room";
    SystemEvent.ROOM_INFO_RESULT = "room_info_result";
    SystemEvent.GET_SCORE_LIST = "get_score_list";
    SystemEvent.SEND_REG_SMS = "SendRegSms";
    SystemEvent.GET_USER_FACE = "GetUserFace";
    SystemEvent.GET_USER_FACE1 = "GetUserFace1";
    SystemEvent.GET_USER_FACE2 = "GetUserFace2";
    SystemEvent.GET_USER_FACE3 = "GetUserFace3";
    SystemEvent.GET_USER_FACE4 = "GetUserFace4";
    SystemEvent.REGISTER_BY_PHONE_NO = "RegisterByPhoneNo";
    SystemEvent.UPDATA_PLAYERDATA = "updata_playerdata";
    SystemEvent.UpdateNickName = "UpdateNickName";
    SystemEvent.GET_PLAYERDATA = "get_player_data";
    SystemEvent.CLOSE = "close";
    SystemEvent.CANCEL = "cancel";
    SystemEvent.gameResultReady = "game_result_ready";
    SystemEvent._dispatch = new egret.EventDispatcher();
    SystemEvent.DEALCARD = "dealCard";
    SystemEvent.ENTER_ROOM_PW = "enter_pw_room";
    SystemEvent.ENTER_ROOM_GODVIEW = "enter_room_godview";
    SystemEvent.MATCH_END = "match_end";
    SystemEvent.createRoomResult = "create_room_relsult";
    SystemEvent.inputPwSucceed = "input_pw";
    SystemEvent.GetMultiListBySign = "GetMultiListBySign";
    return SystemEvent;
}(egret.Event));
__reflect(SystemEvent.prototype, "SystemEvent");
//# sourceMappingURL=SystemEvent.js.map