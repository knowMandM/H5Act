var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GlobalVars = (function () {
    function GlobalVars() {
    }
    //view
    GlobalVars.test1 = "globaltest0";
    GlobalVars.test2 = "globaltest1";
    GlobalVars.deadline = 1525190399; //2018.5.1.23.59.59
    GlobalVars.remainTip = "xx天xx时xx分";
    //config
    GlobalVars.ClientIp = "svr.saiqu.com";
    GlobalVars.ClientPort = 1852;
    GlobalVars.DanmuClientPort = 1855; // 1855 弹幕服务器    - 1852 游戏服务器
    GlobalVars.IsBrowh = false;
    //gui
    GlobalVars.Font_YaHei = "微软雅黑";
    //req
    GlobalVars.userid = 436403; //用户ID
    GlobalVars.actid = 0; //活动ID
    return GlobalVars;
}());
__reflect(GlobalVars.prototype, "GlobalVars");
//# sourceMappingURL=GlobalVars.js.map