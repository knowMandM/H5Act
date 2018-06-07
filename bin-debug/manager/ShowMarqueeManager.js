var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ShowMarqueeManager = (function () {
    function ShowMarqueeManager() {
        this._infoList = new Array();
    }
    ShowMarqueeManager.getInstance = function () {
        if (!ShowMarqueeManager._instance) {
            ShowMarqueeManager._singleton = false;
            ShowMarqueeManager._instance = new ShowMarqueeManager();
            ShowMarqueeManager._singleton = true;
        }
        return ShowMarqueeManager._instance;
    };
    ShowMarqueeManager.prototype.addInfo = function (str) {
        this._infoList.push([str]);
        if (this._infoList.length == 1)
            this.showInfo();
    };
    ShowMarqueeManager.prototype.showInfo = function () {
        if (this._infoList.length > 0) {
            if (!this.MTA) {
                var tempSpr = new egret.DisplayObjectContainer();
                var laba = new egret.Bitmap();
                laba.texture = RES.getRes("game_card.xiaolaba");
                var tempTxt = new egret.TextField();
                tempTxt.text = this._infoList[0];
                tempTxt.size = 40;
                tempTxt.textAlign = "center";
                tempTxt.x = 40;
                tempSpr.addChild(laba);
                tempSpr.addChild(tempTxt);
                this.MTA = new ST.BubbleBox("game_card.Panel_back", tempSpr, false, ST.BubbleBox.OUT_TYPE_MARQUEE, 20);
                this.MTA.setPostion(LayerManager.stage.stageWidth, LayerManager.stage.stageHeight * .2);
                this.MTA.addEventListener("removed", this.removeMarquee, this);
                this.MTA._defaultSpr.alpha = .7;
                LayerManager.TopLayer.addChild(this.MTA);
            }
        }
    };
    ShowMarqueeManager.prototype.removeMarquee = function (e) {
        if (this.MTA) {
            this.MTA.removeEventListener("removed", this.removeMarquee, this);
            this.MTA.destroy();
            DisplayObjectUtil.removeAllChild(this.MTA);
            DisplayObjectUtil.removeForParent(this.MTA);
            this.MTA = null;
        }
        this._infoList.splice(0, 1);
        this.showInfo();
    };
    ShowMarqueeManager._singleton = true;
    return ShowMarqueeManager;
}());
__reflect(ShowMarqueeManager.prototype, "ShowMarqueeManager");
//# sourceMappingURL=ShowMarqueeManager.js.map