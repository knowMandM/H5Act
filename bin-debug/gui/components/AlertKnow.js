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
    var AlertKnow = (function (_super) {
        __extends(AlertKnow, _super);
        function AlertKnow(type) {
            if (type === void 0) { type = AlertKnow.BTN_YES_NO; }
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addedToStageHandler, _this);
            if (_this._mask == null) {
                _this._mask = new egret.Sprite();
                _this._mask.graphics.beginFill(0x000000, 0.5);
                _this._mask.graphics.drawRect(0, 0, GlobalVars.stageWidth, GlobalVars.stageHeight);
                _this._mask.graphics.endFill();
                //                this._mask.touchEnabled = true;
                //                this._mask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
                _this.addChild(_this._mask);
            }
            if (_this._container == null) {
                _this._container = new egret.DisplayObjectContainer;
                _this.addChild(_this._container);
            }
            _this._container.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.stopPopup, _this);
            if (_this._bg == null) {
                _this._bg = new egret.Bitmap();
                _this._bg.texture = RES.getRes("bg_alert");
                _this._container.addChild(_this._bg);
            }
            if (_this._sumitBtn == null) {
                _this._sumitBtn = new ST.Button("btn_alert_sure", "btn_alert_sure_down");
                if (type == AlertKnow.BTN_YES) {
                    _this._sumitBtn.x = 320;
                    _this._sumitBtn.y = 360;
                }
                else {
                    _this._sumitBtn.x = 200;
                    _this._sumitBtn.y = 360;
                }
                _this._container.addChild(_this._sumitBtn);
            }
            if (type == AlertKnow.BTN_YES_NO) {
                if (_this._cancelBtn == null) {
                    _this._cancelBtn = new ST.Button("btn_alert_cancel", "btn_alert_cancel_down");
                    _this._cancelBtn.x = 450;
                    _this._cancelBtn.y = 360;
                    _this._container.addChild(_this._cancelBtn);
                }
            }
            if (_this._txt == null) {
                _this._txt = new egret.TextField();
                _this._txt.textAlign = egret.HorizontalAlign.CENTER;
                _this._txt.size = 36;
                _this._txt.multiline = true;
                _this._txt.lineSpacing = 35;
                _this._txt.width = 500;
                _this._txt.x = 50;
                _this._txt.fontFamily = GlobalVars.Font_YaHei;
                _this._txt.y = 130;
                _this._txt.textColor = 0x000000;
                _this._container.addChild(_this._txt);
                _this._container.anchorOffsetX = _this._container.width * .5;
                _this._container.anchorOffsetY = _this._container.height * .5;
            }
            if (LayerManager.AlertLayer == null)
                return _this;
            LayerManager.AlertLayer.addChild(_this);
            _this.redrawByBrowser();
            var tw = egret.Tween.get(_this._container);
            tw.to({ scaleX: 1.2, scaleY: 1.2 }, ST.ConfigInfo.YOYO_SPEED * 1.5, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, ST.ConfigInfo.YOYO_SPEED * 1.5);
            return _this;
        }
        AlertKnow.prototype.stopPopup = function (e) {
            e.stopImmediatePropagation();
        };
        AlertKnow.prototype.redrawByBrowser = function () {
            this._container.x = LayerManager.stage.stageWidth * .5;
            this._container.y = LayerManager.stage.stageHeight * .5;
        };
        AlertKnow.prototype.show = function (str, _submitFun, _cancelFun) {
            this._submitFunction = _submitFun;
            this._cancelFunction = _cancelFun;
            this._sumitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onApply, this);
            if (this._cancelBtn != null)
                this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancel, this);
            this._txt.text = str;
        };
        AlertKnow.prototype.onApply = function () {
            this.hide();
            if (this._submitFunction != null) {
                this._submitFunction();
            }
            SystemEvent.dispatchEvents(new SystemEvent(SystemEvent.CLOSE));
        };
        AlertKnow.prototype.onCancel = function () {
            if (this._cancelFunction != null) {
                this._cancelFunction();
            }
            this.hide();
            SystemEvent.dispatchEvents(new SystemEvent(SystemEvent.CLOSE));
            SystemEvent.dispatchEvents(new SystemEvent(SystemEvent.CANCEL));
        };
        AlertKnow.prototype.hide = function () {
            DisplayObjectUtil.removeAllChild(this);
            DisplayObjectUtil.removeForParent(this);
        };
        AlertKnow.prototype.destroy = function () {
            console.log("alert.destroy");
            if (this._bg != null) {
                DisplayObjectUtil.removeAllChild(this._bg);
                DisplayObjectUtil.removeForParent(this._bg);
                this._bg = null;
            }
            if (this._cancelBtn != null) {
                DisplayObjectUtil.removeAllChild(this._cancelBtn);
                DisplayObjectUtil.removeForParent(this._cancelBtn);
                this._cancelBtn = null;
            }
            if (this._sumitBtn != null) {
                DisplayObjectUtil.removeAllChild(this._sumitBtn);
                DisplayObjectUtil.removeForParent(this._sumitBtn);
                this._sumitBtn = null;
            }
            if (this._txt != null) {
                DisplayObjectUtil.removeAllChild(this._txt);
                DisplayObjectUtil.removeForParent(this._txt);
                this._txt = null;
            }
            if (this._mask != null) {
                DisplayObjectUtil.removeAllChild(this._mask);
                DisplayObjectUtil.removeForParent(this._mask);
                this._mask = null;
            }
        };
        AlertKnow.prototype.removedFromStageHandler = function (e) {
            this.destroy();
        };
        AlertKnow.prototype.addedToStageHandler = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
        };
        AlertKnow.BTN_YES_NO = "btn_yes_no";
        AlertKnow.BTN_YES = "btn_yes";
        return AlertKnow;
    }(egret.DisplayObjectContainer));
    ST.AlertKnow = AlertKnow;
    __reflect(AlertKnow.prototype, "ST.AlertKnow");
})(ST || (ST = {}));
//# sourceMappingURL=AlertKnow.js.map