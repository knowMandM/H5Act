var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActivityModel = (function () {
    function ActivityModel() {
        // 玩家拥有的各种道具数量
        this.mapPropCount = {};
        // 每种任务已领取的次数
        this.mapTaskGainedCount = {};
        // 奖励类型对应的名称
        this.mapAwardType2Name = {};
        this.bIsAwarding = false;
        this.m_nTime = 0;
        this.init();
    }
    ActivityModel.getInstance = function () {
        if (!this._instance) {
            this._instance = new ActivityModel();
        }
        return this._instance;
    };
    ActivityModel.prototype.init = function () {
        this.readConfig(); // 读取config.json
        this.registerRequestCallBack(); // 注册通讯消息响应函数
        this.initMaps();
    };
    ActivityModel.prototype.initMaps = function () {
        for (var i = 0; i < this.cTaskConfig["taskDescription"]["propIDList"].length; i++) {
            var nPropID = Number(this.cTaskConfig["taskDescription"]["propIDList"][i]["propID"]);
            this.mapPropCount[nPropID] = 0;
        }
        for (var i = 0; i < this.cTaskConfig["taskDescription"]["awardList"].length; i++) {
            var awardType = this.cTaskConfig["taskDescription"]["awardList"][i]["awardType"];
            var typeName = this.cTaskConfig["taskDescription"]["awardList"][i]["typeName"];
            this.mapAwardType2Name[awardType] = typeName;
        }
        for (var i = 0; i < this.cTaskConfig["taskList"].length; i++) {
            var taskID = this.cTaskConfig["taskList"][i]["taskID"];
            this.mapTaskGainedCount[taskID] = 0;
        }
    };
    ActivityModel.prototype.registerRequestCallBack = function () {
        SocketEvent.addEventListener(ActDef.GR_H5ACT_QUERY_INFO.toString(), this.reqTaskDataCallBack, this);
        SocketEvent.addEventListener(ActDef.GR_H5ACT_AWARD_PRIZE.toString(), this.reqAwardPrizeCallBack, this);
        SocketEvent.addEventListener(ActDef.GR_ERROR_INFOMATION_EX.toString(), this.onError, this);
    };
    ActivityModel.prototype.readConfig = function () {
        this.cTaskConfig = RES.getRes("config");
    };
    /**
     * 根据任务和完成次数，刷新物品数据
     * @param nTaskID
     * @param nFinishCount
     */
    ActivityModel.prototype.updateData = function (nTaskID, nFinishCount) {
        for (var i = 0; i < this.cTaskConfig["taskList"].length; i++) {
            if (this.cTaskConfig["taskList"][i]["taskID"] == nTaskID) {
                var taskNode = this.cTaskConfig["taskList"][i];
                for (var j = 0; j < taskNode["propList"].length; j++) {
                    var nPropID = taskNode["propList"][j]["propID"];
                    var nDeductNum = taskNode["propList"][j]["needNum"] * nFinishCount;
                    this.mapPropCount[nPropID] -= nDeductNum;
                }
            }
        }
        this.mapTaskGainedCount[nTaskID] += nFinishCount;
    };
    /**
     * 向服务器获取活动任务数据
     */
    ActivityModel.prototype.reqTaskData = function () {
        var TaskInfoReq = new ReqTaskInfo(GlobalVars.userid, this.cTaskConfig["actID"]);
        SQGameServer.getInstance().sendRequest(ActDef.GR_H5ACT_QUERY_INFO, TaskInfoReq);
    };
    /**
     * 请求任务数据回调
     * 更新数据，刷新界面
     * @param e
     */
    ActivityModel.prototype.reqTaskDataCallBack = function (e) {
        if (e === void 0) { e = null; }
        if (!e.data.data)
            return;
        console.log(e.data);
        console.log("e.data.result = " + e.data.result);
        if (e.data.request == ActDef.GR_H5ACT_QUERY_INFO) {
            var UserRewardRet = new ReqTaskInfoRet();
            var data = e.data.data;
            CSerializable.Deserialization(UserRewardRet, data);
            for (var i = 0; i < UserRewardRet.nPropCount.value; i++) {
                var nPropID = UserRewardRet.arrPropCount.getAt(i).nPropID.value;
                this.mapPropCount[nPropID] = UserRewardRet.arrPropCount.getAt(i).nRestCount.value;
            }
            for (var i = 0; i < UserRewardRet.nTaskCount.value; i++) {
                var nTaskID = UserRewardRet.arrGainedCount.getAt(i).nTaskID.value;
                this.mapTaskGainedCount[nTaskID] = UserRewardRet.arrGainedCount.getAt(i).nGainedCount.value;
            }
            this.m_nTime = UserRewardRet.nDateTime.value;
            MyEvent.dispatchEvents(new MyEvent(ActEvent.EVENT_SHOW_HALL, UserRewardRet.nDateTime.value));
        }
        else {
            ReqManager.getInstance().checkResultMessage(e.data.request, e.data.result);
        }
    };
    /**
     * 请求发奖
     * @param taskid
     * @param actID
     * @param nFinishCount
     */
    ActivityModel.prototype.reqAwardPrize = function (taskid, actID, nFinishCount) {
        if (nFinishCount === void 0) { nFinishCount = 1; }
        var objReqAwardPrize = new ReqAwardPrize(GlobalVars.userid, // nUserID
        taskid, // nTaskID
        this.cTaskConfig["actID"], // nActID
        1); // nFinishCount 
        SQGameServer.getInstance().sendRequest(ActDef.GR_H5ACT_AWARD_PRIZE, objReqAwardPrize);
    };
    /**
     * 请求发奖回调
     * @param e
     */
    ActivityModel.prototype.reqAwardPrizeCallBack = function (e) {
        if (e === void 0) { e = null; }
        if (!e.data.data)
            return;
        console.log(e.data);
        console.log("e.data.result = " + e.data.result);
        if (e.data.request == ActDef.GR_H5ACT_AWARD_PRIZE) {
            this.bIsAwarding = false;
            var reqAwardPrizeRet = new ReqAwardPrizeRet();
            var data = e.data.data;
            CSerializable.Deserialization(reqAwardPrizeRet, data);
            var msg = "";
            if (reqAwardPrizeRet.bResult.value == 0) {
                msg = "领奖失败，请过段时间再试！";
            }
            else {
                msg = "兑换成功！\n获得 [" + this.mapAwardType2Name[reqAwardPrizeRet.nAwardType.value]
                    + "x" + reqAwardPrizeRet.nAwardCount.value + "]";
            }
            //let _reqTaskDataTimeout = egret.setTimeout(() => {
            //    this.reqTaskData()
            //    egret.clearTimeout(_reqTaskDataTimeout);
            //}, this, 400);
            if (reqAwardPrizeRet.bResult.value == 1) {
                this.updateData(reqAwardPrizeRet.nTaskID.value, reqAwardPrizeRet.nFinishCount.value);
                MyEvent.dispatchEvents(new MyEvent(ActEvent.EVENT_SHOW_HALL, this.m_nTime));
            }
            var dialog = new DialogUI(msg);
            dialog.modal = true;
            dialog.showModalWait();
            dialog.show();
        }
        else {
            ReqManager.getInstance().checkResultMessage(e.data.request, e.data.result);
        }
    };
    /**
     * 错误消息
     * @param e
     */
    ActivityModel.prototype.onError = function (e) {
        if (e === void 0) { e = null; }
        if (!e.data.data)
            return;
        console.log(e.data);
        console.log("e.data.result = " + e.data.result);
        var errorInfo = new ERR_INFO_EGRET();
        var data = e.data.data;
        CSerializable.Deserialization(errorInfo, data);
        this.bIsAwarding = false;
        alert(errorInfo.errMsg);
    };
    // 单例
    ActivityModel._instance = null;
    return ActivityModel;
}());
__reflect(ActivityModel.prototype, "ActivityModel");
//# sourceMappingURL=ActivityModel.js.map