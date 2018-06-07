class ActivityCtrl {
    m_model: ActivityModel = undefined;
    m_view: ActivityView = undefined;
    m_mainView: any;

    // 单例
    private static _instance: ActivityCtrl = null;
    public static getInstance(mainView): ActivityCtrl {
        if (!this._instance) {
            this._instance = new ActivityCtrl(mainView);
        }
        return this._instance;
    }

    public constructor(mainView) {
        this.m_model = ActivityModel.getInstance();
        this.m_view = new ActivityView(mainView);
        this.m_mainView = mainView
        this.init()
    }

    public init(): void {
        this.bindAwardBtnClickEvent()
        this.bindDescriptionClickEvent()
    }

    public bindAwardBtnClickEvent(): void {
        let awardBtnCount = this.m_model.cTaskConfig["taskList"].length
        for (let i = 0; i < awardBtnCount; i++) {
            this.m_view.activeView.getChild("scroll").asCom.getChild("obj_item" + i).asCom.getChild("btn_award").addClickListener(() => {
                console.log("btn " + i + " clicked")
                if (this.m_model.bIsAwarding == true) 
                {
                    console.log("请等待领奖结果..")
                    return
                }

                this.m_model.bIsAwarding = true;
                let timeout = egret.setTimeout(() => {
                    this.m_model.bIsAwarding = false;
                    egret.clearTimeout(timeout);
                }, this, 4000);

                this.m_model.reqAwardPrize(
                    this.m_model.cTaskConfig["taskList"][i]["taskID"],
                    this.m_model.cTaskConfig["actID"]
                )
            }, this)
        }
    }

    public bindDescriptionClickEvent(): void {
        let mapPropID2Title: { [key: number]: string } = {
            1: "粽米",
            2: "粽叶",
            3: "粽绳",
            4: "红枣",
        }

        let mapPropID2Content: { [key: number]: string } = {
            1: "任意玩法的初级、中级、高级场中对局有几率获得",
            2: "任意玩法的初级、中级、高级场中对局有几率获得",
            3: "任意玩法的中级、高级场中对局有几率获得",
            4: "任意玩法的高级场中对局有几率获得",
        }

        let rowNUm = this.m_model.cTaskConfig["taskList"].length
        for (let i = 0; i < rowNUm; i++) {
            let currTaskConfig = this.m_model.cTaskConfig["taskList"][i]
            for (let index = 0; index < currTaskConfig["propList"].length; index++) {
                this.m_view.activeView.getChild("scroll").asCom.getChild("obj_item" + i).asCom.getChild("prop_" + index).asCom.getChild("btn_info").addClickListener(() => {
                    let nPropID = currTaskConfig["propList"][index]["propID"]
                    let strTitle = mapPropID2Title[nPropID]
                    let strContent = mapPropID2Content[nPropID]
                    let desc = new DescriptionView(strTitle, strContent)


                    desc.show()
                    let _Timeout = egret.setTimeout(() => {
                        desc.destory()
                        egret.clearTimeout(_Timeout);
                    }, this, 3000);

                }, this)
            }
        }
    }

    public freshView(nTime: number) {
        let gameView = this.m_view.activeView;
        let gameModel = this.m_model;
        console.log("freshView nTime:" + nTime)
        if (this.isNotStart(nTime)) {
            this.m_view.showNotStartScence()
            // 到活动时间时，刷新活动页面
            let nTimeIntervalToStart = this.calcTimeIntervalToStart(nTime)
            console.log("nTimeIntervalToStart:" + nTimeIntervalToStart / 1000)
            let _Timeout = egret.setTimeout(() => {
                egret.clearTimeout(_Timeout);
                let config = this.m_model.cTaskConfig;
                this.freshViewByConfig(config);
                this.freshViewByUser();
                this.m_view.showActiveScene();
            }, this, nTimeIntervalToStart);
        }
        else if (this.isEnded(nTime)) {
            this.m_view.showEndedScene()
        }
        else {
            // 在活动时间内的场景
            let config = this.m_model.cTaskConfig;
            this.freshViewByConfig(config);
            this.freshViewByUser();
            this.m_view.showActiveScene();
            // 到活动结束时间，展示结束界面
            let nTimeIntervalToEnd = this.calcTimeIntervalToEnd(nTime)
            console.log("nTimeIntervalToEnd:" + nTimeIntervalToEnd / 1000)
            let _Timeout = egret.setTimeout(() => {
                egret.clearTimeout(_Timeout);
                this.m_view.showEndedScene()
            }, this, nTimeIntervalToEnd);
        }
        
    }

    /**
     * 计算离活动开始还有多少毫秒
     * @param nTime 
     */
    public calcTimeIntervalToStart(nTime: number) {
        let nActiveStartTime = TimeUtil.CTimeToAsTime(this.m_model.cTaskConfig["validDate"]+"000000")
        let nServerTime = nTime*1000

        return nActiveStartTime - nServerTime
    }

    /**
     * 计算离活动结束还有多少毫秒
     * @param nTime 
     */
    public calcTimeIntervalToEnd(nTime: number) {
        let str = TimeUtil.CTimeToAsTime(this.m_model.cTaskConfig["expiredDate"]+"000000")
        console.log("str:" + str)
        let nActiveEndTime = TimeUtil.CTimeToAsTime(this.m_model.cTaskConfig["expiredDate"]+"000000")
        let nServerTime = nTime*1000
        let date = new Date()
        date.setTime(nActiveEndTime)
        console.log("nActiveEndTime:" + date.toLocaleDateString())
        date.setTime(nServerTime)
        console.log("nServerTime:" + date.toLocaleDateString())
        return nActiveEndTime - nServerTime
    }


    public isNotStart(nTime : number ): boolean{
        let nActiveStartTime = TimeUtil.CTimeToAsTime(this.m_model.cTaskConfig["validDate"]+"000000")
        let nServerTime = nTime*1000

        if (nServerTime < nActiveStartTime)
        {
            return true
        }

        return false
    }

    public isEnded(nTime:number) : boolean{
        let nActiveEndTime = TimeUtil.CTimeToAsTime(this.m_model.cTaskConfig["expiredDate"]+"000000")
        let nServerTime = nTime*1000

        if (nServerTime >= nActiveEndTime)
        {
            return true
        }

        return false
    }



    public freshViewByConfig(config) {
        for (let i = 0; i < config["taskList"].length; i++) {
            let currTaskConfig = config["taskList"][i]
            for (let index = currTaskConfig["propList"].length; index < 4; index++) {
                this.m_view.hidePropByIndex(i, index);
            }

            for (let index = 0; index < currTaskConfig["propList"].length; index++) {
                this.m_view.setPropNeedNumByIndex(i, index, currTaskConfig["propList"][index]["needNum"]);
                this.m_view.setPropIconByIndex(i, index, currTaskConfig["propList"][index]["propID"])
            }

            this.m_view.setMaxGainCountByRow(i, currTaskConfig["maxGainCount"])
            this.m_view.setAwardIconByRow(i, currTaskConfig["award"]["awardType"])
            this.m_view.setAwardCountByRow(i, currTaskConfig["award"]["awardCount"])
            this.m_view.setAwardAwardBtnEnableByRow(i, false);
        }
    }

    public freshViewByUser() {
        let config = this.m_model.cTaskConfig;
        for (let i = 0; i < config["taskList"].length; i++) {
            let currTaskConfig = config["taskList"][i]
            // 设置各道具拥有的数量
            for (let index = 0; index < currTaskConfig["propList"].length; index++) {
                let prodID = currTaskConfig["propList"][index]["propID"]
                this.m_view.setPropHasNumByIndex(i, index, this.m_model.mapPropCount[prodID]);
            }
            // 设置剩余完成次数
            let taskID = currTaskConfig["taskID"]
            this.m_view.setRestAwardCount(i, currTaskConfig["maxGainCount"] - this.m_model.mapTaskGainedCount[taskID])

            // 设置任务领奖按钮状态
            let btnStatus: number = this.calcAwardBtnStatus(i);
            this.m_view.setAwardBtnStatus(i, btnStatus)
        }
    }

    public calcAwardBtnStatus(row: number) {
        let config = this.m_model.cTaskConfig;
        let currTaskConfig = config["taskList"][row]
        let retStatus = BtnStatus.done

        // 没有完成次数了，返回done
        let taskID = currTaskConfig["taskID"]
        let restCount = currTaskConfig["maxGainCount"] - this.m_model.mapTaskGainedCount[taskID]
        if (restCount <= 0) {
            retStatus = BtnStatus.done
            return retStatus
        }

        retStatus = BtnStatus.canAward
        for (let i = 0; i < currTaskConfig["propList"].length; i++) {
            let prodId = currTaskConfig["propList"][i]["propID"]
            let needNum = currTaskConfig["propList"][i]["needNum"]

            // 有一个道具少于需要的数量，返回未完成
            if (this.m_model.mapPropCount[prodId] < needNum) {
                retStatus = BtnStatus.notComplete
                break
            }
        }

        return retStatus
    }
}