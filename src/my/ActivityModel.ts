type typeCountInfo = { rest: number, max: number };
type props = { rice: number, leaf: number, rope: number, jujube: number };
type rewardInfo = { type: number, count: number }

class ActivityModel {
    // 玩家拥有的各种道具数量
    public mapPropCount: { [key/*propID*/: number]: number/*数量*/ } = {}
    // 每种任务已领取的次数
    public mapTaskGainedCount: { [key/*taskid*/: number]: number/*次数*/ } = {}
    // 奖励类型对应的名称
    public mapAwardType2Name: { [key/*AwardType*/: number]: string/*奖励物品名称*/ } = {}
    // 任务配置
    public cTaskConfig: any;
    public bIsAwarding: boolean = false;
    public m_nTime: number = 0

    // 单例
    private static _instance: ActivityModel = null;
    public static getInstance(): ActivityModel {
        if (!this._instance) {
            this._instance = new ActivityModel();
        }
        return this._instance;
    }

    public constructor() {
        this.init();

    }

    public init(): void {
        this.readConfig();  // 读取config.json
        this.registerRequestCallBack() // 注册通讯消息响应函数
        this.initMaps()
    }

    public initMaps() {
        for (let i = 0; i < this.cTaskConfig["taskDescription"]["propIDList"].length; i++) {
            let nPropID = Number(this.cTaskConfig["taskDescription"]["propIDList"][i]["propID"])
            this.mapPropCount[nPropID] = 0;
        }

        for (let i = 0; i < this.cTaskConfig["taskDescription"]["awardList"].length; i++) {
            let awardType = this.cTaskConfig["taskDescription"]["awardList"][i]["awardType"]
            let typeName = this.cTaskConfig["taskDescription"]["awardList"][i]["typeName"]
            this.mapAwardType2Name[awardType] = typeName;
        }

        for (let i = 0; i < this.cTaskConfig["taskList"].length; i++) {
            let taskID = this.cTaskConfig["taskList"][i]["taskID"]
            this.mapTaskGainedCount[taskID] = 0;
        }
    }

    public registerRequestCallBack(): void {
        SocketEvent.addEventListener(ActDef.GR_H5ACT_QUERY_INFO.toString(), this.reqTaskDataCallBack, this);
        SocketEvent.addEventListener(ActDef.GR_H5ACT_AWARD_PRIZE.toString(), this.reqAwardPrizeCallBack, this);
        SocketEvent.addEventListener(ActDef.GR_ERROR_INFOMATION_EX.toString(), this.onError, this);
    }

    public readConfig(): void {
        this.cTaskConfig = RES.getRes("config");
    }

    /**
     * 根据任务和完成次数，刷新物品数据
     * @param nTaskID 
     * @param nFinishCount 
     */
    public updateData(nTaskID: number, nFinishCount: number) {
        for (let i = 0; i < this.cTaskConfig["taskList"].length; i++) {
            if (this.cTaskConfig["taskList"][i]["taskID"] == nTaskID) {
                let taskNode = this.cTaskConfig["taskList"][i]
                for (let j = 0; j < taskNode["propList"].length; j++) {
                    let nPropID = taskNode["propList"][j]["propID"]
                    let nDeductNum = taskNode["propList"][j]["needNum"] * nFinishCount

                    this.mapPropCount[nPropID] -= nDeductNum;
                }
            }
        }
        this.mapTaskGainedCount[nTaskID] += nFinishCount


    }
    /**
     * 向服务器获取活动任务数据
     */
    public reqTaskData(): void {
        let TaskInfoReq: ReqTaskInfo = new ReqTaskInfo(
            GlobalVars.userid,
            this.cTaskConfig["actID"]
        );

        SQGameServer.getInstance().sendRequest(ActDef.GR_H5ACT_QUERY_INFO, TaskInfoReq)
    }


    /**
     * 请求任务数据回调
     * 更新数据，刷新界面
     * @param e 
     */
    public reqTaskDataCallBack(e: SystemEvent = null): void {
        if (!e.data.data) return;

        console.log(e.data);
        console.log("e.data.result = " + e.data.result);

        if (e.data.request == ActDef.GR_H5ACT_QUERY_INFO) {
            var UserRewardRet: ReqTaskInfoRet = new ReqTaskInfoRet();
            let data: egret.ByteArray = e.data.data;
            CSerializable.Deserialization(UserRewardRet, data);

            for (let i = 0; i < UserRewardRet.nPropCount.value; i++) {
                let nPropID = UserRewardRet.arrPropCount.getAt(i).nPropID.value;
                this.mapPropCount[nPropID] = UserRewardRet.arrPropCount.getAt(i).nRestCount.value;
            }

            for (let i = 0; i < UserRewardRet.nTaskCount.value; i++) {
                let nTaskID = UserRewardRet.arrGainedCount.getAt(i).nTaskID.value;
                this.mapTaskGainedCount[nTaskID] = UserRewardRet.arrGainedCount.getAt(i).nGainedCount.value;
            }

            this.m_nTime = UserRewardRet.nDateTime.value
            MyEvent.dispatchEvents(new MyEvent(ActEvent.EVENT_SHOW_HALL, UserRewardRet.nDateTime.value))
        }
        else {
            ReqManager.getInstance().checkResultMessage(e.data.request, e.data.result)
        }
    }

    /**
     * 请求发奖
     * @param taskid 
     * @param actID 
     * @param nFinishCount 
     */
    public reqAwardPrize(taskid: number, actID: number, nFinishCount: number = 1): void {
        let objReqAwardPrize: ReqAwardPrize = new ReqAwardPrize(
            GlobalVars.userid,           // nUserID
            taskid,                      // nTaskID
            this.cTaskConfig["actID"],   // nActID
            1)                           // nFinishCount 

        SQGameServer.getInstance().sendRequest(ActDef.GR_H5ACT_AWARD_PRIZE, objReqAwardPrize)
    }

    /**
     * 请求发奖回调
     * @param e 
     */
    public reqAwardPrizeCallBack(e: SystemEvent = null): void {
        if (!e.data.data) return;
        console.log(e.data);
        console.log("e.data.result = " + e.data.result);


        if (e.data.request == ActDef.GR_H5ACT_AWARD_PRIZE) {
            this.bIsAwarding = false
            let reqAwardPrizeRet: ReqAwardPrizeRet = new ReqAwardPrizeRet();
            let data: egret.ByteArray = e.data.data;
            CSerializable.Deserialization(reqAwardPrizeRet, data);

            let msg: string = "";
            if (reqAwardPrizeRet.bResult.value == 0) {
                msg = "领奖失败，请过段时间再试！"
            }
            else {
                msg = "兑换成功！\n获得 [" + this.mapAwardType2Name[reqAwardPrizeRet.nAwardType.value]
                    + "x" + reqAwardPrizeRet.nAwardCount.value + "]"
            }

            //let _reqTaskDataTimeout = egret.setTimeout(() => {
            //    this.reqTaskData()
            //    egret.clearTimeout(_reqTaskDataTimeout);
            //}, this, 400);
            if (reqAwardPrizeRet.bResult.value == 1) {
                this.updateData(reqAwardPrizeRet.nTaskID.value, reqAwardPrizeRet.nFinishCount.value)
                MyEvent.dispatchEvents(new MyEvent(ActEvent.EVENT_SHOW_HALL, this.m_nTime))
            }

            let dialog: DialogUI = new DialogUI(msg)
            dialog.modal = true
            dialog.showModalWait()
            dialog.show()
        }
        else {
            ReqManager.getInstance().checkResultMessage(e.data.request, e.data.result)
        }
    }

    /**
     * 错误消息
     * @param e 
     */
    public onError(e: SystemEvent = null): void {
        if (!e.data.data) return;
        console.log(e.data);
        console.log("e.data.result = " + e.data.result);

        let errorInfo = new ERR_INFO_EGRET();
        let data: egret.ByteArray = e.data.data;

        CSerializable.Deserialization(errorInfo, data);
        this.bIsAwarding = false;
        alert(errorInfo.errMsg)
    }
}