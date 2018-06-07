var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ST;
(function (ST) {
    var Panel = (function (_super) {
        __extends(Panel, _super);
        /**
         * 具体按钮类构造函数
         * bgSkin - 皮肤背景 (支持九宫格)
         * closeSpr - 关闭按钮
         */
        function Panel(bgSkin, closeSpr, showYoyo) {
            var _this = _super.call(this) || this;
            _this._showYoyo = true;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removedFromStageHandler, _this);
            _this.data = new Object();
            _this._closeSpr = closeSpr;
            if (closeSpr != undefined)
                _this._closeSpr = closeSpr;
            if (showYoyo != undefined)
                _this._showYoyo = showYoyo;
            if (_this._defaultSpr == null) {
                _this._defaultSpr = new egret.Bitmap();
                _this._defaultSpr.scale9Grid = new egret.Rectangle(12, 12, 82, 76);
                _this._defaultSpr.texture = RES.getRes(bgSkin);
                _this.addChild(_this._defaultSpr);
            }
            if (_this._closeSpr != null)
                _this.addChild(_this._closeSpr);
            _this.setSize(_this._defaultSpr.width, _this._defaultSpr.height);
            _this.init();
            return _this;
        }
        /**
         * 初始化Button显示对象和绘制，绘制元素建立map
         */
        Panel.prototype.init = function () {
            //this.touchEnabled = true;
            if (this._showYoyo) {
                var tw = egret.Tween.get(this);
                tw.to({ scaleX: 1.2, scaleY: 1.2 }, ST.ConfigInfo.YOYO_SPEED, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, ST.ConfigInfo.YOYO_SPEED);
            }
            if (this._closeSpr != null)
                this._closeSpr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanelHandler, this);
        };
        // *****************************************        初始化绘制        *********************
        Panel.prototype.closePanelHandler = function (e) {
            DisplayObjectUtil.removeAllChild(this);
            DisplayObjectUtil.removeForParent(this);
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        Panel.prototype.setSize = function (w, h, closeH) {
            this._defaultSpr.width = w;
            this._defaultSpr.height = h;
            this._defaultSpr.anchorOffsetX = this._defaultSpr.width * .5;
            this._defaultSpr.anchorOffsetY = this._defaultSpr.height * .5;
            this._offX = this._defaultSpr.width * .5;
            this._offY = this._defaultSpr.height * .5;
            if (this._closeSpr != null)
                this._closeSpr.x = this._defaultSpr.width * .5 - 10;
            if (this._closeSpr != null) {
                this._closeSpr.y = -this._defaultSpr.height * .5 + 10;
                if (closeH != undefined && closeH > 0)
                    this._closeSpr.y = -this._defaultSpr.height * .5 + 10 + closeH;
            }
        };
        Panel.prototype.setPostion = function (x, y) {
            this.x = x + this._offX;
            this.y = y + this._offY;
        };
        Panel.prototype.removedFromStageHandler = function (e) {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
            this.destroy();
        };
        Panel.prototype.addedToStageHandler = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
        };
        Panel.prototype.destroy = function () {
            if (this._closeSpr != null)
                this._closeSpr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanelHandler, this);
            if (this._defaultSpr != null) {
                DisplayObjectUtil.removeAllChild(this._defaultSpr);
                DisplayObjectUtil.removeForParent(this._defaultSpr);
                this._defaultSpr = null;
            }
            if (this.data != null)
                this.data = null;
        };
        return Panel;
    }(egret.DisplayObjectContainer));
    ST.Panel = Panel;
    __reflect(Panel.prototype, "ST.Panel");
})(ST || (ST = {}));
//# sourceMappingURL=Panel.js.map