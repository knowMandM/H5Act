var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by seethinks@gmail.com on 2015/10/13.
 */
var LoadingManager = (function () {
    function LoadingManager() {
    }
    LoadingManager.showLoading = function () {
        if (this.loadingContainer == null) {
            this.loadingContainer = new egret.DisplayObjectContainer();
            this.loadingBg = new egret.Sprite();
            this.loadingBg.graphics.beginFill(0x000000, 0);
            this.loadingBg.graphics.drawRect(0, 0, LayerManager.stage.stageWidth, LayerManager.stage.stageHeight);
            this.loadingBg.graphics.endFill();
            this.loadingContainer.addChild(this.loadingBg);
            var data = RES.getRes("loading.json");
            var txtr = RES.getRes("loading.png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            this.mcLoading = new egret.MovieClip(mcFactory.generateMovieClipData("loading"));
            this.mcLoading.x = LayerManager.stage.stageWidth * .5 - 222 * .5;
            this.mcLoading.y = LayerManager.stage.stageHeight * .5 - 222 * .5;
            this.mcLoading.play(-1);
            this.mcLoading.visible = false;
            this.loadingContainer.addChild(this.mcLoading);
            this._showIconTimeout = egret.setTimeout(this.showIcon, this, 1000);
            LayerManager.TopLayer.addChild(this.loadingContainer);
        }
        else {
            this.mcLoading.visible = false;
            this._showIconTimeout = egret.setTimeout(this.showIcon, this, 1000);
            this.loadingContainer.visible = true;
        }
        if (this.outTimer != null) {
            this.outTimer.stop();
            this.outTimer.removeEventListener(egret.TimerEvent.TIMER, this.outTimerHandler, this);
            this.outTimer = null;
            this.outTimer = new egret.Timer(8000);
            this.outTimer.addEventListener(egret.TimerEvent.TIMER, this.outTimerHandler, this);
            this.outTimer.start();
        }
        else {
            this.outTimer = new egret.Timer(8000);
            this.outTimer.addEventListener(egret.TimerEvent.TIMER, this.outTimerHandler, this);
            this.outTimer.start();
        }
    };
    LoadingManager.outTimerHandler = function (e) {
        if (this.outTimer != null) {
            this.outTimer.stop();
            this.outTimer.removeEventListener(egret.TimerEvent.TIMER, this.outTimerHandler, this);
            this.outTimer = null;
        }
        this.hideLoading();
    };
    LoadingManager.showIcon = function () {
        if (this.mcLoading)
            this.mcLoading.visible = true;
        egret.clearTimeout(this._showIconTimeout);
    };
    LoadingManager.hideLoading = function () {
        egret.clearTimeout(this._showIconTimeout);
        if (LoadingManager.loadingContainer)
            LoadingManager.loadingContainer.visible = false;
    };
    return LoadingManager;
}());
__reflect(LoadingManager.prototype, "LoadingManager");
//# sourceMappingURL=LoadingManager.js.map