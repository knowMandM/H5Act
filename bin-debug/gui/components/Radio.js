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
    var Radio = (function (_super) {
        __extends(Radio, _super);
        /**
         * 具体按钮类构造函数
         * defaultSkin - 未选择状态
         * pressSkin - 按下状态
         * selectSkin - 选择后状态
         */
        function Radio(defaultSkin, pressSkin, selectSkin, disableSkin, showYoyo, value) {
            var _this = _super.call(this) || this;
            _this._disableSkin = "";
            _this._showYoyo = true;
            _this._isSelect = false;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addedToStageHandler, _this);
            _this.data = new Object();
            if (disableSkin != undefined)
                _this._disableSkin = disableSkin;
            if (showYoyo != undefined)
                _this._showYoyo = showYoyo;
            if (value != undefined)
                _this._value = value;
            if (_this._defaultSpr == null) {
                _this._defaultSpr = new egret.Bitmap();
                _this._defaultSpr.texture = RES.getRes(defaultSkin);
                _this.addChild(_this._defaultSpr);
                _this._defaultSpr.anchorOffsetX = _this._defaultSpr.width * .5;
                _this._defaultSpr.anchorOffsetY = _this._defaultSpr.height * .5;
                _this.x = _this._defaultSpr.width * .5;
                _this.y = _this._defaultSpr.height * .5;
            }
            if (_this._pressSpr == null) {
                _this._pressSpr = new egret.Bitmap();
                _this._pressSpr.texture = RES.getRes(pressSkin);
                _this._pressSpr.visible = false;
                _this.addChild(_this._pressSpr);
                _this._pressSpr.anchorOffsetX = _this._pressSpr.width * .5;
                _this._pressSpr.anchorOffsetY = _this._pressSpr.height * .5;
                _this.x = _this._pressSpr.width * .5;
                _this.y = _this._pressSpr.height * .5;
            }
            if (_this._selectSpr == null) {
                _this._selectSpr = new egret.Bitmap();
                _this._selectSpr.texture = RES.getRes(selectSkin);
                _this._selectSpr.visible = false;
                _this.addChild(_this._selectSpr);
                _this._selectSpr.anchorOffsetX = _this._selectSpr.width * .5;
                _this._selectSpr.anchorOffsetY = _this._selectSpr.height * .5;
                _this.x = _this._selectSpr.width * .5;
                _this.y = _this._selectSpr.height * .5;
            }
            if (_this._disableSkin != undefined) {
                if (_this._disableSkin != "") {
                    if (_this._disableSpr == null) {
                        _this._disableSpr = new egret.Bitmap();
                        _this._disableSpr.texture = RES.getRes(disableSkin);
                        _this._disableSpr.visible = false;
                        _this.addChild(_this._disableSpr);
                        _this._disableSpr.anchorOffsetX = _this._disableSpr.width * .5;
                        _this._disableSpr.anchorOffsetY = _this._disableSpr.height * .5;
                        _this.x = _this._disableSpr.width * .5;
                        _this.y = _this._disableSpr.height * .5;
                    }
                }
            }
            _this.init();
            return _this;
        }
        /**
         * 初始化Button显示对象和绘制，绘制元素建立map
         */
        Radio.prototype.init = function () {
            this._offX = this._defaultSpr.width * .5;
            this._offY = this._defaultSpr.height * .5;
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        };
        // *****************************************        初始化绘制        *********************
        Radio.prototype.touchBeginHandler = function (e) {
            if (!this._isSelect) {
                this._defaultSpr.visible = false;
                this._pressSpr.visible = false;
                this._selectSpr.visible = true;
                this._isSelect = true;
            }
            else {
                this._isSelect = false;
                this._defaultSpr.visible = true;
                this._pressSpr.visible = false;
                this._selectSpr.visible = false;
            }
            if (this._showYoyo) {
                var tw = egret.Tween.get(this);
                tw.to({ scaleX: 1.2, scaleY: 1.2 }, ST.ConfigInfo.YOYO_SPEED, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, ST.ConfigInfo.YOYO_SPEED);
            }
        };
        Radio.prototype.removedFromStageHandler = function (e) {
            this.destroy();
        };
        Radio.prototype.setPostion = function (x, y) {
            this.x = x + this._offX;
            this.y = y + this._offY;
        };
        Radio.prototype.addedToStageHandler = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
        };
        Radio.prototype.getSelect = function () {
            return this._isSelect;
        };
        Radio.prototype.setSelect = function (b) {
            if (!b) {
                this._defaultSpr.visible = true;
                this._pressSpr.visible = false;
                this._selectSpr.visible = false;
                this._isSelect = false;
            }
            else {
                this._isSelect = true;
                this._defaultSpr.visible = false;
                this._pressSpr.visible = false;
                this._selectSpr.visible = true;
            }
        };
        /**
         * 设置是否可用
         * @param	b
         */
        Radio.prototype.setDisable = function (b) {
            if (!b) {
                this.touchEnabled = false;
                if (this._disableSpr != null) {
                    this._disableSpr.visible = true;
                    this._defaultSpr.visible = false;
                    this._pressSpr.visible = false;
                    this._selectSpr.visible = false;
                }
            }
            else {
                this.touchEnabled = true;
                this._defaultSpr.visible = true;
                this._pressSpr.visible = false;
                this._selectSpr.visible = false;
                if (this._disableSkin != "") {
                    this._disableSpr.visible = false;
                }
            }
        };
        Radio.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        };
        Radio.prototype.getValue = function () {
            return this._value;
        };
        return Radio;
    }(egret.DisplayObjectContainer));
    ST.Radio = Radio;
    __reflect(Radio.prototype, "ST.Radio");
})(ST || (ST = {}));
//# sourceMappingURL=Radio.js.map