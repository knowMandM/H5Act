var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActivityView = (function () {
    function ActivityView(mainView) {
        this.activeNotTimingView = null;
        this.awardIcon_Type2Url = {
            1: "ui://duanwu/sliver",
            2: "ui://duanwu/ticket",
        };
        this.awardIcon_PropID2Url = {
            1: "ui://duanwu/rice",
            2: "ui://duanwu/leaf",
            3: "ui://duanwu/rope",
            4: "ui://duanwu/jujube",
        };
        this.createView(mainView);
    }
    ActivityView.prototype.createView = function (mainView) {
        this.mainView = mainView;
        fairygui.UIPackage.addPackage("duanwu"); //这个是key
        this.mainView.stage.addChild(fairygui.GRoot.inst.displayObject);
        this.activeView = fairygui.UIPackage.createObject("duanwu" /*这个是包名*/, "main" /*这个是组件名*/).asCom;
    };
    /**
     * 展示活动未开始的页面
     */
    ActivityView.prototype.showNotStartScence = function () {
        this.showNotActiveScene("活动还未开始，敬请期待...");
    };
    /**
     * 展示活动已结束的页面
     */
    ActivityView.prototype.showEndedScene = function () {
        this.showNotActiveScene("活动已经结束啦..");
    };
    /**
     * 展示未在活动中的页面
     * 活动未开始、活动已结束
     */
    ActivityView.prototype.showNotActiveScene = function (tips) {
        if (this.activeNotTimingView == null) {
            this.activeNotTimingView = fairygui.UIPackage.createObject("duanwu" /*这个是包名*/, "nottiming" /*这个是组件名*/).asCom;
        }
        if (this.activeView == null) {
            this.mainView.removeChild(this.activeView.displayObject);
            this.activeView = null;
        }
        this.activeNotTimingView.setSize(this.mainView.stage.stageWidth, this.mainView.stage.stageHeight);
        this.activeNotTimingView.getChild("text_tip").text = tips;
        console.log("this.stage.stageWidth:" + this.mainView.stage.stageWidth + "this.stage.stageHeight:" + this.mainView.stage.stageHeight);
        this.mainView.addChild(this.activeNotTimingView.displayObject);
    };
    /**
     * 展示活动中的页面
     */
    ActivityView.prototype.showActiveScene = function () {
        if (this.activeNotTimingView != null) {
            this.mainView.removeChild(this.activeNotTimingView.displayObject);
            this.activeNotTimingView = null;
        }
        this.activeView.setSize(this.mainView.stage.stageWidth, this.mainView.stage.stageHeight);
        console.log("this.stage.stageWidth:" + this.mainView.stage.stageWidth + "this.stage.stageHeight:" + this.mainView.stage.stageHeight);
        this.mainView.addChild(this.activeView.displayObject);
    };
    /**
     * 根据配置隐藏道具
     * 例：某任务只有一个道具，则隐藏后面3个
     * @param row
     * @param index
     */
    ActivityView.prototype.hidePropByIndex = function (row, index) {
        this.activeView.getChild("scroll").asCom.getChild("obj_item" + row).asCom.getChild("prop_" + index).asCom.visible = false;
    };
    /**
     * 设置完成任务单个道具需要的个数
     * @param row
     * @param index
     * @param needNum
     */
    ActivityView.prototype.setPropNeedNumByIndex = function (row, index, needNum) {
        var objText = this.activeView.getChild("scroll").asCom.getChild("obj_item" + row).asCom.getChild("prop_" + index).asCom.getChild("txt_num");
        var re = /([0-9]+)['/']([0-9]+)/;
        objText.text = objText.text.replace(re, "$1/" + needNum);
    };
    /**
     * 根据道具ID设置图片
     * @param row
     * @param index
     * @param propID
     */
    ActivityView.prototype.setPropIconByIndex = function (row, index, propID) {
        var loaderIcon = this.activeView.getChild("scroll").asCom.getChild("obj_item" + row).asCom.getChild("prop_" + index).asCom.getChild("loader_icon");
        loaderIcon.url = this.awardIcon_PropID2Url[propID];
        loaderIcon.autoSize = true;
    };
    /**
     * 设置可完成任务的总次数
     * @param row
     * @param maxGainCount
     */
    ActivityView.prototype.setMaxGainCountByRow = function (row, maxGainCount) {
        var objText = this.activeView.getChild("scroll").asCom.getChild("obj_item" + row).asCom.getChild("txt_rest");
        var re = /(.*)([0-9]+)['/']([0-9]+)/;
        objText.text = objText.text.replace(re, "$1$2/" + maxGainCount);
    };
    /**
     * 设置任务奖励的icon
     * @param row
     * @param awardType
     */
    ActivityView.prototype.setAwardIconByRow = function (row, awardType) {
        var awardImgLoader = this.activeView.getChild("scroll").asCom.getChild("obj_item" + row).asCom.getChild("loader_awardImg");
        awardImgLoader.url = this.awardIcon_Type2Url[awardType];
        awardImgLoader.autoSize = true;
    };
    /**
     * 设置任务奖励数量
     * @param row
     * @param awardCount
     */
    ActivityView.prototype.setAwardCountByRow = function (row, awardCount) {
        var objText = this.activeView.getChild("scroll").asCom.getChild("obj_item" + row).asCom.getChild("txt_num");
        objText.text = "x" + awardCount;
    };
    /**
     * 设置领取任务奖励按钮的可点击状态
     * @param row
     * @param enabled
     */
    ActivityView.prototype.setAwardAwardBtnEnableByRow = function (row, enabled) {
        var btnAward = this.activeView.getChild("scroll").asCom.getChild("obj_item" + row).asCom.getChild("btn_award");
        btnAward.enabled = enabled;
    };
    /**
     * 设置道具数量
     * @param row
     * @param index
     * @param count
     */
    ActivityView.prototype.setPropHasNumByIndex = function (row, index, count) {
        var objText = this.activeView.getChild("scroll").asCom.getChild("obj_item" + row).asCom.getChild("prop_" + index).asCom.getChild("txt_num");
        var re = /([0-9]+)['/']([0-9]+)/;
        objText.text = objText.text.replace(re, count + "/$2");
        this.setPropNumColor(objText, objText.text);
    };
    /**
     * 设置道具数量文本的颜色，
     * - 拥有的大于等于需要的显示绿色，否则显示红色
     * @param text_obj
     * @param text
     */
    ActivityView.prototype.setPropNumColor = function (text_obj, text) {
        var re = /([0-9]+)['/']([0-9]+)/;
        var m = re.exec(text);
        var nOwnNum = Number(m[1]);
        var nNeedNum = Number(m[2]);
        if (nOwnNum < nNeedNum) {
            text_obj.color = 0xFF0000;
        }
        else {
            text_obj.color = 0x006600;
        }
    };
    /**
     * 设置剩余领取次数
     * @param row
     * @param restCount
     */
    ActivityView.prototype.setRestAwardCount = function (row, restCount) {
        var objText = this.activeView.getChild("scroll").asCom.getChild("obj_item" + row).asCom.getChild("txt_rest");
        var re = /.*['/']([0-9]+)/;
        objText.text = objText.text.replace(re, "剩余次数：" + restCount + "/$1");
    };
    /**
     * 设置任务奖励按钮状态
     * @param row
     * @param status
     */
    ActivityView.prototype.setAwardBtnStatus = function (row, status) {
        var mapStatus2Enabled = {};
        mapStatus2Enabled[BtnStatus.canAward] = true;
        mapStatus2Enabled[BtnStatus.done] = false;
        mapStatus2Enabled[BtnStatus.notComplete] = false;
        var mapStatus2BtnTitle = {};
        mapStatus2BtnTitle[BtnStatus.canAward] = "兑 换";
        mapStatus2BtnTitle[BtnStatus.done] = "已完成";
        mapStatus2BtnTitle[BtnStatus.notComplete] = "未完成";
        var mapStatus2BtnShow = {};
        mapStatus2BtnShow[BtnStatus.canAward] = true;
        mapStatus2BtnShow[BtnStatus.done] = false;
        mapStatus2BtnShow[BtnStatus.notComplete] = true;
        var btnAward = this.activeView.getChild("scroll").asCom.getChild("obj_item" + row).asCom.getChild("btn_award");
        btnAward.enabled = mapStatus2Enabled[status];
        btnAward.title = mapStatus2BtnTitle[status];
        btnAward.visible = mapStatus2BtnShow[status];
        //////////////////////////////////////////////////////////////////////////////////////
        var mapStatus2DoneImg = {};
        mapStatus2DoneImg[BtnStatus.canAward] = false;
        mapStatus2DoneImg[BtnStatus.done] = true;
        mapStatus2DoneImg[BtnStatus.notComplete] = false;
        var doneImg = this.activeView.getChild("scroll").asCom.getChild("obj_item" + row).asCom.getChild("img_finish");
        doneImg.visible = mapStatus2DoneImg[status];
        //////////////////////////////////////////////////////////////////////////////////////
        var mapStatus2RestCount = {};
        mapStatus2RestCount[BtnStatus.canAward] = true;
        mapStatus2RestCount[BtnStatus.done] = false;
        mapStatus2RestCount[BtnStatus.notComplete] = true;
        var restCount = this.activeView.getChild("scroll").asCom.getChild("obj_item" + row).asCom.getChild("txt_rest");
        restCount.visible = mapStatus2RestCount[status];
    };
    return ActivityView;
}());
__reflect(ActivityView.prototype, "ActivityView");
//# sourceMappingURL=ActivityView.js.map