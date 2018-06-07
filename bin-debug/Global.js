var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Global = (function () {
    function Global() {
    }
    Global.APP_NAME = "hnhb";
    Global.VER_MAJOR = 1;
    Global.VER_MINOR = 0;
    Global.VER_BUILDNO = 20140603;
    Global.GAME_ID = 470;
    Global.ServerIp = "192.168.10.29"; //"120.24.102.9"; h5assistmpsvr's ip
    Global.ServerPort = 1852; //60674;
    Global.IsBrowser = false;
    // result define
    Global.UR_REQ_BASE = 0;
    Global.UR_OPERATE_SUCCEEDED = Global.UR_REQ_BASE + 10;
    Global.UR_OPERATE_FAILED = Global.UR_REQ_BASE + 10100;
    //REQ
    Global.REQ_BASE = 400000;
    Global.REQ_ACT_CONFIG = Global.REQ_BASE + 7001;
    Global.REQ_USER_DATA = Global.REQ_BASE + 7002;
    Global.REQ_USER_REWARD = Global.REQ_BASE + 7004;
    Global.REQ_FINAL_REWARD = Global.REQ_BASE + 7006;
    return Global;
}());
__reflect(Global.prototype, "Global");
//# sourceMappingURL=Global.js.map