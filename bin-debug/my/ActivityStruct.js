var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ReqTaskInfo = (function () {
    function ReqTaskInfo(nUserID, nActID) {
        this.nUserID = new int();
        this.nActID = new int();
        this.nUserID.value = nUserID;
        this.nActID.value = nActID;
    }
    return ReqTaskInfo;
}());
__reflect(ReqTaskInfo.prototype, "ReqTaskInfo");
var PropsCountInfo = (function () {
    function PropsCountInfo(nPropID, nRestCount) {
        this.nPropID = new int();
        this.nRestCount = new int();
        this.nPropID.value = nPropID;
        this.nRestCount.value = nRestCount;
    }
    return PropsCountInfo;
}());
__reflect(PropsCountInfo.prototype, "PropsCountInfo");
var TaskGainedInfo = (function () {
    function TaskGainedInfo(taskID, nGaindCount) {
        this.nTaskID = new int();
        this.nGainedCount = new int();
        this.nTaskID.value = taskID;
        this.nGainedCount.value = nGaindCount;
    }
    return TaskGainedInfo;
}());
__reflect(TaskGainedInfo.prototype, "TaskGainedInfo");
var ReqTaskInfoRet = (function () {
    function ReqTaskInfoRet() {
        this.nPropCount = new int();
        this.nTaskCount = new int();
        this.nDateTime = new int();
        // 端午道具数量
        this.arrPropCount = new FixedArray("PropsCountInfo", ActDef.nPropNum);
        // 端午任务完成数量
        this.arrGainedCount = new FixedArray("TaskGainedInfo", ActDef.nTaskNum);
    }
    return ReqTaskInfoRet;
}());
__reflect(ReqTaskInfoRet.prototype, "ReqTaskInfoRet");
var ReqAwardPrize = (function () {
    function ReqAwardPrize(nUserID, nTaskID, nActID, nFinishCount) {
        this.nUserID = new int();
        this.nTaskID = new int();
        this.nActID = new int();
        this.nFinishCount = new int();
        this.nUserID.value = nUserID;
        this.nTaskID.value = nTaskID;
        this.nActID.value = nActID;
        this.nFinishCount.value = nFinishCount;
    }
    return ReqAwardPrize;
}());
__reflect(ReqAwardPrize.prototype, "ReqAwardPrize");
var ERR_INFO_EGRET = (function () {
    function ERR_INFO_EGRET() {
        this.errMsg = "";
    }
    return ERR_INFO_EGRET;
}());
__reflect(ERR_INFO_EGRET.prototype, "ERR_INFO_EGRET");
var ReqAwardPrizeRet = (function () {
    function ReqAwardPrizeRet() {
        this.bResult = new int();
        this.nAwardType = new int();
        this.nAwardCount = new int();
        this.nUserID = new int();
        this.nTaskID = new int();
        this.nActID = new int();
        this.nFinishCount = new int();
    }
    return ReqAwardPrizeRet;
}());
__reflect(ReqAwardPrizeRet.prototype, "ReqAwardPrizeRet");
//# sourceMappingURL=ActivityStruct.js.map