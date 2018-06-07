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
    var BubbleBox = (function (_super) {
        __extends(BubbleBox, _super);
        /**
         * 具体按钮类构造函数
         * bgSkin - 皮肤背景 (支持九宫格)
         * closeSpr - 关闭按钮
         */
        function BubbleBox(bgSkin, spr, showYoyo, outType, dealyTimer) {
            var _this = _super.call(this) || this;
            _this.DealyTimer = 2500;
            _this._showYoyo = true;
            _this._outType = BubbleBox.OUT_TYPE_ALPHA;
            _this._spr = spr;
            if (showYoyo != undefined)
                _this._showYoyo = showYoyo;
            if (outType != undefined)
                _this._outType = outType;
            if (dealyTimer != undefined)
                _this.DealyTimer = dealyTimer;
            if (_this._defaultSpr == null) {
                _this._defaultSpr = new egret.Bitmap();
                _this._defaultSpr.scale9Grid = new egret.Rectangle(12, 12, 82, 76);
                _this._defaultSpr.texture = RES.getRes(bgSkin);
                _this.addChild(_this._defaultSpr);
            }
            _this.addChild(_this._spr);
            _this.init();
            return _this;
        }
        /**
         * 初始化Button显示对象和绘制，绘制元素建立map
         */
        BubbleBox.prototype.init = function () {
            this._defaultSpr.width = this._spr.width + 50;
            this._defaultSpr.height = this._spr.height * 2;
            this._defaultSpr.anchorOffsetX = this._defaultSpr.width * .5;
            this._defaultSpr.anchorOffsetY = this._defaultSpr.height * .5;
            this._spr.anchorOffsetX = this._spr.width * .5;
            this._spr.anchorOffsetY = this._spr.height * .5;
            this._offX = this._defaultSpr.width * .5;
            this._offY = this._defaultSpr.height * .5;
            //AlignTool.spr_To_spr2_Center(this._spr,this._defaultSpr)
            if (this._showYoyo) {
                var tw = egret.Tween.get(this);
                tw.to({ scaleX: 1.2, scaleY: 1.2 }, ST.ConfigInfo.YOYO_SPEED, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, ST.ConfigInfo.YOYO_SPEED);
            }
            this._timer = new egret.Timer(this.DealyTimer);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.closePanelHandler, this);
            this._timer.start();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
        };
        // *****************************************        初始化绘制        *********************
        BubbleBox.prototype.closePanelHandler = function (e) {
            var _this = this;
            var tw = egret.Tween.get(this);
            if (this._outType == BubbleBox.OUT_TYPE_ALPHA) {
                tw.to({ alpha: 0 }, ST.ConfigInfo.ALPHA_OUT_SPEED).call(function () {
                    DisplayObjectUtil.removeAllChild(_this);
                    DisplayObjectUtil.removeForParent(_this);
                });
            }
            else if (this._outType == BubbleBox.OUT_TYPE_UP_ALPHA) {
                tw.to({ alpha: 0, y: this.y - 100 }, ST.ConfigInfo.ALPHA_OUT_SPEED).call(function () {
                    DisplayObjectUtil.removeAllChild(_this);
                    DisplayObjectUtil.removeForParent(_this);
                });
            }
            else if (this._outType == BubbleBox.OUT_TYPE_MARQUEE) {
                tw.to({ x: 0 - this.width }, ST.ConfigInfo.ALPHA_OUT_SPEED * 15).call(function () {
                    DisplayObjectUtil.removeAllChild(_this);
                    DisplayObjectUtil.removeForParent(_this);
                    _this.dispatchEventWith("removed");
                });
            }
        };
        BubbleBox.prototype.setPostion = function (x, y) {
            this.x = x + this._offX;
            this.y = y + this._offY;
        };
        BubbleBox.prototype.removedFromStageHandler = function (e) {
            this.destroy();
        };
        BubbleBox.prototype.addedToStageHandler = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
        };
        BubbleBox.prototype.destroy = function () {
            if (this._timer) {
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.closePanelHandler, this);
                this._timer = null;
            }
            if (this._defaultSpr) {
                DisplayObjectUtil.removeAllChild(this._defaultSpr);
                DisplayObjectUtil.removeForParent(this._defaultSpr);
                this._defaultSpr = null;
            }
        };
        BubbleBox.OUT_TYPE_ALPHA = "out_type_alpha";
        BubbleBox.OUT_TYPE_UP_ALPHA = "out_type_up_alpha";
        BubbleBox.OUT_TYPE_MARQUEE = "out_type_marquee";
        return BubbleBox;
    }(egret.DisplayObjectContainer));
    ST.BubbleBox = BubbleBox;
    __reflect(BubbleBox.prototype, "ST.BubbleBox");
})(ST || (ST = {}));
//# sourceMappingURL=BubbleBox.js.map