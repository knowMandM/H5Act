var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BubbleBoxManager = (function () {
    function BubbleBoxManager() {
    }
    BubbleBoxManager.init = function (str) {
        var txtTips = new egret.TextField();
        txtTips.text = str;
        var tips = new ST.BubbleBox("game_card.Panel_back", txtTips, true, ST.BubbleBox.OUT_TYPE_UP_ALPHA);
        tips.setPostion(LayerManager.stage.stageWidth * .5 - txtTips.width * .5, LayerManager.stage.stageHeight * .5 - txtTips.height * .5);
        LayerManager.TopLayer.addChild(tips);
    };
    return BubbleBoxManager;
}());
__reflect(BubbleBoxManager.prototype, "BubbleBoxManager");
//# sourceMappingURL=BubbleBoxManager.js.map