var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActivityCtrl = (function () {
    function ActivityCtrl(mainView) {
        this.m_model = undefined;
        this.m_view = undefined;
        this.m_model = ActivityModel.getInstance();
        this.m_view = new ActivityView(mainView);
        this.m_mainView = mainView;
        this.init();
    }
    ActivityCtrl.getInstance = function (mainView) {
        if (!this._instance) {
            this._instance = new ActivityCtrl(mainView);
        }
        return this._instance;
    };
    ActivityCtrl.prototype.init = function () {
        this.bindAwardBtnClickEvent();
        this.bindDescriptionClickEvent();
    };
    ActivityCtrl.prototype.bindAwardBtnClickEvent = function () {
        var _this = this;
        var awardBtnCount = this.m_model.cTaskConfig["taskList"].length;
        var _loop_1 = function (i) {
            this_1.m_view.activeView.getChild("scroll").asCom.getChild("obj_item" + i).asCom.getChild("btn_award").addClickListener(function () {
                console.log("btn " + i + " clicked");
                if (_this.m_model.bIsAwarding == true) {
                    console.log("请等待领奖结果..");
                    return;
                }
                _this.m_model.bIsAwarding = true;
                var timeout = egret.setTimeout(function () {
                    _this.m_model.bIsAwarding = false;
                    egret.clearTimeout(timeout);
                }, _this, 4000);
                _this.m_model.reqAwardPrize(_this.m_model.cTaskConfig["taskList"][i]["taskID"], _this.m_model.cTaskConfig["actID"]);
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < awardBtnCount; i++) {
            _loop_1(i);
        }
    };
    ActivityCtrl.prototype.bindDescriptionClickEvent = function () {
        var _this = this;
        var mapPropID2Title = {
            1: "粽米",
            2: "粽叶",
            3: "粽绳",
            4: "红枣",
        };
        var mapPropID2Content = {
            1: "任意玩法的初级、中级、高级场中对局有几率获得",
            2: "任意玩法的初级、中级、高级场中对局有几率获得",
            3: "任意玩法的中级、高级场中对局有几率获得",
            4: "任意玩法的高级场中对局有几率获得",
        };
        var rowNUm = this.m_model.cTaskConfig["taskList"].length;
        var _loop_2 = function (i) {
            var currTaskConfig = this_2.m_model.cTaskConfig["taskList"][i];
            var _loop_3 = function (index) {
                this_2.m_view.activeView.getChild("scroll").asCom.getChild("obj_item" + i).asCom.getChild("prop_" + index).asCom.getChild("btn_info").addClickListener(function () {
                    var nPropID = currTaskConfig["propList"][index]["propID"];
                    var strTitle = mapPropID2Title[nPropID];
                    var strContent = mapPropID2Content[nPropID];
                    var desc = new DescriptionView(strTitle, strContent);
                    desc.show();
                    var _Timeout = egret.setTimeout(function () {
                        desc.destory();
                        egret.clearTimeout(_Timeout);
                    }, _this, 3000);
                }, this_2);
            };
            for (var index = 0; index < currTaskConfig["propList"].length; index++) {
                _loop_3(index);
            }
        };
        var this_2 = this;
        for (var i = 0; i < rowNUm; i++) {
            _loop_2(i);
        }
    };
    ActivityCtrl.prototype.freshView = function (nTime) {
        var _this = this;
        var gameView = this.m_view.activeView;
        var gameModel = this.m_model;
        console.log("freshView nTime:" + nTime);
        if (this.isNotStart(nTime)) {
            this.m_view.showNotStartScence();
            // 到活动时间时，刷新活动页面
            var nTimeIntervalToStart = this.calcTimeIntervalToStart(nTime);
            console.log("nTimeIntervalToStart:" + nTimeIntervalToStart / 1000);
            var _Timeout_1 = egret.setTimeout(function () {
                egret.clearTimeout(_Timeout_1);
                var config = _this.m_model.cTaskConfig;
                _this.freshViewByConfig(config);
                _this.freshViewByUser();
                _this.m_view.showActiveScene();
            }, this, nTimeIntervalToStart);
        }
        else if (this.isEnded(nTime)) {
            this.m_view.showEndedScene();
        }
        else {
            // 在活动时间内的场景
            var config = this.m_model.cTaskConfig;
            this.freshViewByConfig(config);
            this.freshViewByUser();
            this.m_view.showActiveScene();
            // 到活动结束时间，展示结束界面
            var nTimeIntervalToEnd = this.calcTimeIntervalToEnd(nTime);
            console.log("nTimeIntervalToEnd:" + nTimeIntervalToEnd / 1000);
            var _Timeout_2 = egret.setTimeout(function () {
                egret.clearTimeout(_Timeout_2);
                _this.m_view.showEndedScene();
            }, this, nTimeIntervalToEnd);
        }
    };
    /**
     * 计算离活动开始还有多少毫秒
     * @param nTime
     */
    ActivityCtrl.prototype.calcTimeIntervalToStart = function (nTime) {
        var nActiveStartTime = TimeUtil.CTimeToAsTime(this.m_model.cTaskConfig["validDate"] + "000000");
        var nServerTime = nTime * 1000;
        return nActiveStartTime - nServerTime;
    };
    /**
     * 计算离活动结束还有多少毫秒
     * @param nTime
     */
    ActivityCtrl.prototype.calcTimeIntervalToEnd = function (nTime) {
        var str = TimeUtil.CTimeToAsTime(this.m_model.cTaskConfig["expiredDate"] + "000000");
        console.log("str:" + str);
        var nActiveEndTime = TimeUtil.CTimeToAsTime(this.m_model.cTaskConfig["expiredDate"] + "000000");
        var nServerTime = nTime * 1000;
        var date = new Date();
        date.setTime(nActiveEndTime);
        console.log("nActiveEndTime:" + date.toLocaleDateString());
        date.setTime(nServerTime);
        console.log("nServerTime:" + date.toLocaleDateString());
        return nActiveEndTime - nServerTime;
    };
    ActivityCtrl.prototype.isNotStart = function (nTime) {
        var nActiveStartTime = TimeUtil.CTimeToAsTime(this.m_model.cTaskConfig["validDate"] + "000000");
        var nServerTime = nTime * 1000;
        if (nServerTime < nActiveStartTime) {
            return true;
        }
        return false;
    };
    ActivityCtrl.prototype.isEnded = function (nTime) {
        var nActiveEndTime = TimeUtil.CTimeToAsTime(this.m_model.cTaskConfig["expiredDate"] + "000000");
        var nServerTime = nTime * 1000;
        if (nServerTime >= nActiveEndTime) {
            return true;
        }
        return false;
    };
    ActivityCtrl.prototype.freshViewByConfig = function (config) {
        for (var i = 0; i < config["taskList"].length; i++) {
            var currTaskConfig = config["taskList"][i];
            for (var index = currTaskConfig["propList"].length; index < 4; index++) {
                this.m_view.hidePropByIndex(i, index);
            }
            for (var index = 0; index < currTaskConfig["propList"].length; index++) {
                this.m_view.setPropNeedNumByIndex(i, index, currTaskConfig["propList"][index]["needNum"]);
                this.m_view.setPropIconByIndex(i, index, currTaskConfig["propList"][index]["propID"]);
            }
            this.m_view.setMaxGainCountByRow(i, currTaskConfig["maxGainCount"]);
            this.m_view.setAwardIconByRow(i, currTaskConfig["award"]["awardType"]);
            this.m_view.setAwardCountByRow(i, currTaskConfig["award"]["awardCount"]);
            this.m_view.setAwardAwardBtnEnableByRow(i, false);
        }
    };
    ActivityCtrl.prototype.freshViewByUser = function () {
        var config = this.m_model.cTaskConfig;
        for (var i = 0; i < config["taskList"].length; i++) {
            var currTaskConfig = config["taskList"][i];
            // 设置各道具拥有的数量
            for (var index = 0; index < currTaskConfig["propList"].length; index++) {
                var prodID = currTaskConfig["propList"][index]["propID"];
                this.m_view.setPropHasNumByIndex(i, index, this.m_model.mapPropCount[prodID]);
            }
            // 设置剩余完成次数
            var taskID = currTaskConfig["taskID"];
            this.m_view.setRestAwardCount(i, currTaskConfig["maxGainCount"] - this.m_model.mapTaskGainedCount[taskID]);
            // 设置任务领奖按钮状态
            var btnStatus = this.calcAwardBtnStatus(i);
            this.m_view.setAwardBtnStatus(i, btnStatus);
        }
    };
    ActivityCtrl.prototype.calcAwardBtnStatus = function (row) {
        var config = this.m_model.cTaskConfig;
        var currTaskConfig = config["taskList"][row];
        var retStatus = BtnStatus.done;
        // 没有完成次数了，返回done
        var taskID = currTaskConfig["taskID"];
        var restCount = currTaskConfig["maxGainCount"] - this.m_model.mapTaskGainedCount[taskID];
        if (restCount <= 0) {
            retStatus = BtnStatus.done;
            return retStatus;
        }
        retStatus = BtnStatus.canAward;
        for (var i = 0; i < currTaskConfig["propList"].length; i++) {
            var prodId = currTaskConfig["propList"][i]["propID"];
            var needNum = currTaskConfig["propList"][i]["needNum"];
            // 有一个道具少于需要的数量，返回未完成
            if (this.m_model.mapPropCount[prodId] < needNum) {
                retStatus = BtnStatus.notComplete;
                break;
            }
        }
        return retStatus;
    };
    // 单例
    ActivityCtrl._instance = null;
    return ActivityCtrl;
}());
__reflect(ActivityCtrl.prototype, "ActivityCtrl");
//# sourceMappingURL=ActivityCtrl.js.map