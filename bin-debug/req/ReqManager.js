var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ReqManager = (function () {
    function ReqManager() {
    }
    ReqManager.getInstance = function () {
        if (!ReqManager._instance) {
            ReqManager._singleton = false;
            ReqManager._instance = new ReqManager();
            ReqManager._singleton = true;
        }
        return ReqManager._instance;
    };
    ReqManager.prototype.setUp = function () {
        SocketEvent.addEventListener(SocketEvent.CONNECTED_SERVER, this.connectServerSuccess, this);
        SQGameServer.getInstance().connectServer();
        //----------------------------
        //按钮事件
        MyEvent.addEventListener(MyEvent.GETREWARD1, this.getReward1, this);
        MyEvent.addEventListener(MyEvent.GETREWARD2, this.getReward2, this);
        MyEvent.addEventListener(MyEvent.GETFINALREWARD, this.getFinalReward, this);
    };
    ReqManager.prototype.destroy = function () {
    };
    //calls
    ReqManager.prototype.connectServerSuccess = function (e) {
        if (e === void 0) { e = null; }
        //LoadingManager.showLoading();
        console.log("connectServerSuccess");
        SocketEvent.removeEventListener(SocketEvent.CONNECTED_SERVER, this.connectServerSuccess, this);
        //请求任务数据
        ActivityModel.getInstance().reqTaskData();
    };
    ReqManager.prototype.getActConfigSuccess = function (e) {
        //LoadingManager.hideLoading();
        if (!e.data.data)
            return;
        var b = e.data.data;
        console.log(e.data);
        console.log("e.data.result = " + e.data.result);
        if (e.data.result == Global.REQ_ACT_CONFIG) {
        }
        else {
            this.checkResultMessage(e.data.request, e.data.result);
        }
    };
    ReqManager.prototype.getUserDataSuccess = function (e) {
        //LoadingManager.hideLoading();
        if (!e.data.data)
            return;
        var b = e.data.data;
        console.log(e.data);
        console.log("e.data.result = " + e.data.result);
        if (e.data.result == Global.REQ_USER_DATA) {
            this.initScene();
        }
        else {
            this.checkResultMessage(e.data.request, e.data.result);
        }
    };
    ReqManager.prototype.getRewardRet = function (e) {
        //LoadingManager.hideLoading();
        if (!e.data.data)
            return;
        var b = e.data.data;
        console.log(e.data);
        console.log("e.data.result = " + e.data.result);
        //日常奖励 / 累计奖励
        if (e.data.result == Global.REQ_USER_REWARD || e.data.result == Global.REQ_FINAL_REWARD) {
        }
        else {
            this.checkResultMessage(e.data.request, e.data.result);
        }
    };
    /** error msg function **/
    ReqManager.prototype.checkResultMessage = function (msgHead, value, msg, b) {
        if (msg === void 0) { msg = ""; }
        if (b === void 0) { b = null; }
        var str = "";
        console.log("msgHead:", msgHead, "value:", value);
        switch (value) {
            case Global.UR_OPERATE_FAILED:
                str = msg != "" ? msg : "出现常规错误 消息号:" + msgHead;
                break;
            default:
                console.log(str = "出现错误,ID:" + msgHead);
                break;
        }
    };
    ReqManager.prototype.initScene = function () {
        MyEvent.dispatchEvents(new MyEvent(MyEvent.INITSCENE));
    };
    ReqManager.prototype.refreshRewardRet1 = function () {
        MyEvent.dispatchEvents(new MyEvent(MyEvent.REFRESHREWARDRET1));
    };
    ReqManager.prototype.refreshRewardRet2 = function () {
        MyEvent.dispatchEvents(new MyEvent(MyEvent.REFRESHREWARDRET2));
    };
    ReqManager.prototype.refreshFinalRet = function () {
        MyEvent.dispatchEvents(new MyEvent(MyEvent.REFRESHFINAL));
    };
    //领取奖励1
    ReqManager.prototype.getReward1 = function () {
    };
    //领取奖励2
    ReqManager.prototype.getReward2 = function () {
    };
    ReqManager.prototype.getFinalReward = function () {
    };
    ReqManager._singleton = true;
    return ReqManager;
}());
__reflect(ReqManager.prototype, "ReqManager");
//# sourceMappingURL=ReqManager.js.map