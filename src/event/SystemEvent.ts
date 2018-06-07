class SystemEvent extends egret.Event {
    public static LOGIN_RESULT: string = "login_result";
    public static MOBILENO_LOGIN_RESULT: string = "MobileNo_login_result";
    public static ONKEYREG_RESULT: string = "onkey_result";
    public static VALIDSIGN_RESULT: string = "validSign_result";
    public static GET_ALL_LIVE_ROOM: string = "get_all_live_room";
    public static ROOM_INFO_RESULT: string = "room_info_result";
    public static GET_SCORE_LIST: string = "get_score_list";
    public static SEND_REG_SMS: string = "SendRegSms";
    public static GET_USER_FACE: string = "GetUserFace";
    public static GET_USER_FACE1: string = "GetUserFace1";
    public static GET_USER_FACE2: string = "GetUserFace2";
    public static GET_USER_FACE3: string = "GetUserFace3";
    public static GET_USER_FACE4: string = "GetUserFace4";
    public static REGISTER_BY_PHONE_NO: string = "RegisterByPhoneNo";

    public static UPDATA_PLAYERDATA: string = "updata_playerdata";

    public static UpdateNickName: string = "UpdateNickName";

    public static GET_PLAYERDATA: string = "get_player_data";

    public static CLOSE: string = "close";
    public static CANCEL: string = "cancel";

    public static gameResultReady: string = "game_result_ready";

    public static _dispatch: egret.EventDispatcher = new egret.EventDispatcher();
    public static DEALCARD: string = "dealCard";

    public static ENTER_ROOM_PW: string = "enter_pw_room";
    public static ENTER_ROOM_GODVIEW: string = "enter_room_godview";

    public static MATCH_END: string = "match_end";

    public static createRoomResult: string = "create_room_relsult";
    public static inputPwSucceed: string = "input_pw";
    public static GetMultiListBySign: string = "GetMultiListBySign";

    

    /**
     * 使用 EventDispatcher 对象注册事件侦听器对象，以使侦听器能够接收事件通知。可以为特定类型的事件、阶段和优先级在显示列表中的所有节点上注册事件侦听器。
     * @param type
     * @param listener
     * @param useCapture
     * @param priority
     * @param useWeakReference
     */
    public static addEventListener(type: string, listener: Function, target: any, useCapture: boolean = false, priority: number = 0): void {
        this._dispatch.addEventListener(type, listener, target, useCapture, priority);
    }

    /**
     * 从 EventDispatcher 对象中删除侦听器。如果没有向 EventDispatcher 对象注册任何匹配的侦听器，则对此方法的调用没有任何效果。
     * @param type
     * @param listener
     * @param useCapture
     */
    public static removeEventListener(type: string, listener: Function, target: any, useCapture: boolean = false): void {
        this._dispatch.removeEventListener(type, listener, target, useCapture);
    }

    /**
     * 将事件分派到事件流中。事件目标是对其调用 dispatchEvent() 方法的 EventDispatcher 对象。
     * @param event
     */
    public static dispatchEvents(event: egret.Event) {
        this._dispatch.dispatchEvent(event); // .target,event.type,event.bubbles,this.data
    }

    public data: any;
    public constructor(type: string, _data: any = null, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
        this.data = _data;
    }
}