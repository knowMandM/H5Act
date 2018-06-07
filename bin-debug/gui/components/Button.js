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
    var Button = (function (_super) {
        __extends(Button, _super);
        /**
         * 具体按钮类构造函数
         */
        function Button(defaultSkin, pressSkin, disableSkin, showYoyo) {
            var _this = _super.call(this) || this;
            _this._disableSkin = "";
            _this._showYoyo = true;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addedToStageHandler, _this);
            _this.data = new Object();
            if (disableSkin != undefined)
                _this._disableSkin = disableSkin;
            if (showYoyo != undefined)
                _this._showYoyo = showYoyo;
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
        Button.prototype.init = function () {
            this._offX = this._defaultSpr.width * .5;
            this._offY = this._defaultSpr.height * .5;
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEndHandler, this);
        };
        // *****************************************        初始化绘制        *********************
        Button.prototype.touchBeginHandler = function (e) {
            this._defaultSpr.visible = false;
            this._pressSpr.visible = true;
            if (this._showYoyo) {
                var tw = egret.Tween.get(this);
                tw.to({ scaleX: 1.2, scaleY: 1.2 }, ST.ConfigInfo.YOYO_SPEED, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, ST.ConfigInfo.YOYO_SPEED);
            }
        };
        Button.prototype.touchEndHandler = function (e) {
            this._defaultSpr.visible = true;
            this._pressSpr.visible = false;
        };
        Button.prototype.removedFromStageHandler = function (e) {
            this.destroy();
        };
        Button.prototype.addedToStageHandler = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
        };
        /**
         * 设置是否可用
         * @param	b
         */
        Button.prototype.setDisable = function (b) {
            if (!b) {
                this.touchEnabled = false;
                if (this._disableSpr != null) {
                    this._disableSpr.visible = true;
                    this._defaultSpr.visible = false;
                    this._pressSpr.visible = false;
                }
            }
            else {
                this.touchEnabled = true;
                this._defaultSpr.visible = true;
                this._pressSpr.visible = false;
                if (this._disableSkin != "") {
                    this._disableSpr.visible = false;
                }
            }
        };
        Button.prototype.setPostion = function (x, y) {
            this.x = x + this._offX;
            this.y = y + this._offY;
        };
        Button.prototype.getY = function () {
            return this.y - this._offY;
        };
        Button.prototype.getX = function () {
            return this.x - this._offX;
        };
        Button.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEndHandler, this);
            if (this.data != null)
                this.data = null;
        };
        Button.prototype.changeSkin = function (defaultSkin, pressSkin, disableSkin) {
            if (this._defaultSpr != undefined)
                this._defaultSpr.texture = RES.getRes(defaultSkin);
            if (this._pressSpr != undefined)
                this._pressSpr.texture = RES.getRes(pressSkin);
            if (disableSkin != undefined)
                this._disableSkin = disableSkin;
        };
        return Button;
    }(egret.DisplayObjectContainer));
    ST.Button = Button;
    __reflect(Button.prototype, "ST.Button");
})(ST || (ST = {}));
//# sourceMappingURL=Button.js.map