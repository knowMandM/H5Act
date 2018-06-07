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
    var TextBox = (function (_super) {
        __extends(TextBox, _super);
        /**
         * 具体按钮类构造函数
         */
        function TextBox(defaultSkin, disableSkin, value, defaultStr, width) {
            var _this = _super.call(this) || this;
            _this._disableSkin = "";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addedToStageHandler, _this);
            _this.data = new Object();
            _this._txtBg = new egret.Bitmap();
            _this._txtBg.texture = RES.getRes(defaultSkin);
            _this.addChild(_this._txtBg);
            if (disableSkin != undefined)
                _this._disableSkin = disableSkin;
            if (_this._disableSkin != undefined) {
                _this._txtBgDisable = new egret.Bitmap();
                _this._txtBgDisable.texture = RES.getRes(_this._disableSkin);
                _this.addChild(_this._txtBgDisable);
            }
            _this._txt = new eui.EditableText();
            _this._txt.type = egret.TextFieldType.INPUT;
            _this._txt.text = value;
            if (width != null && width > 0)
                _this._txt.width = width;
            else
                _this._txt.width = 580;
            _this._txt.height = 100;
            _this._txt.x = 20;
            _this._txt.y = 20;
            _this._txt.size = 40;
            _this._txt.maxChars = 20;
            _this._txt.textColor = 0xdedfe0;
            _this._txt.addEventListener(egret.TouchEvent.FOCUS_IN, _this.focusinHandler, _this);
            _this._txt.addEventListener(egret.TouchEvent.FOCUS_OUT, _this.focusoutHandler, _this);
            _this.addChild(_this._txt);
            _this._defaultStr = new egret.TextField();
            _this._defaultStr.visible = false;
            _this._defaultStr.x = _this._txt.x;
            _this._defaultStr.y = _this._txt.y;
            _this._defaultStr.text = defaultStr;
            _this._defaultStr.size = 34;
            _this._defaultStr.textColor = 0xdedfe0;
            _this.addChild(_this._defaultStr);
            if (_this._txt.text == "" && defaultStr != undefined && defaultStr != null && defaultStr != "" && value != undefined && value != "") {
                _this._defaultStr.visible = true;
            }
            _this.init();
            return _this;
        }
        TextBox.prototype.setSize = function (n) {
            this._txt.size = n;
        };
        TextBox.prototype.focusinHandler = function (e) {
            this._defaultStr.visible = false;
        };
        TextBox.prototype.focusoutHandler = function (e) {
            if (this._txt.text == "") {
                this._defaultStr.visible = true;
            }
        };
        /**
         * 初始化Button显示对象和绘制，绘制元素建立map
         */
        TextBox.prototype.init = function () {
            this.touchEnabled = true;
            // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        };
        // *****************************************        初始化绘制        *********************
        TextBox.prototype.removedFromStageHandler = function (e) {
            this.destroy();
        };
        TextBox.prototype.addedToStageHandler = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
        };
        TextBox.prototype.getValue = function () {
            return this._txt.text;
        };
        TextBox.prototype.setValue = function (value) {
            return this._txt.text = value;
        };
        TextBox.prototype.displayAsPassword = function (b) {
            this._txt.displayAsPassword = b;
        };
        /**
         * 设置是否可用
         * @param	b
         */
        TextBox.prototype.setDisable = function (b) {
            if (!b) {
                this.touchEnabled = false;
                if (this._txtBgDisable != null) {
                    this._txtBgDisable.visible = true;
                    this._txtBg.visible = false;
                    this._txt.type = egret.TextFieldType.DYNAMIC;
                }
            }
            else {
                this.touchEnabled = true;
                if (this._txtBg != null) {
                    this._txtBg.visible = true;
                    this._txtBgDisable.visible = false;
                    this._txt.type = egret.TextFieldType.INPUT;
                }
            }
        };
        TextBox.prototype.setPostion = function (x, y) {
            this.x = x;
            this.y = y;
            this._offX = x;
            this._offY = y;
        };
        TextBox.prototype.getY = function () {
            return this._txt.y + this._offY;
        };
        TextBox.prototype.getX = function () {
            return this._txt.x + this._offX;
        };
        TextBox.prototype.destroy = function () {
            if (this.data != null)
                this.data = null;
            // this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        };
        return TextBox;
    }(egret.DisplayObjectContainer));
    ST.TextBox = TextBox;
    __reflect(TextBox.prototype, "ST.TextBox");
})(ST || (ST = {}));
//# sourceMappingURL=TextBox.js.map