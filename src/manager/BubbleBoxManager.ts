class BubbleBoxManager {
    public static init(str: string) {
        var txtTips: egret.TextField = new egret.TextField();
        txtTips.text = str;
        var tips: ST.BubbleBox = new ST.BubbleBox("game_card.Panel_back", txtTips, true, ST.BubbleBox.OUT_TYPE_UP_ALPHA)
        tips.setPostion(LayerManager.stage.stageWidth * .5 - txtTips.width * .5, LayerManager.stage.stageHeight * .5 - txtTips.height * .5)
        LayerManager.TopLayer.addChild(tips);
    }
}