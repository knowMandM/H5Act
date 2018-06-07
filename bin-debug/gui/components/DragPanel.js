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
    var DragPanel = (function (_super) {
        __extends(DragPanel, _super);
        function DragPanel(moveArea, closeButton) {
            var _this = _super.call(this) || this;
            _this.offsetPointX = 0;
            _this.offsetPointY = 0;
            _this._closeButton = null;
            _this._moveArea = null;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addedToStageHandler, _this);
            _this._moveArea = moveArea;
            _this._closeButton = closeButton;
            moveArea.touchEnabled = true;
            _this.touchEnabled = true;
            _this.init();
            return _this;
        }
        Object.defineProperty(DragPanel.prototype, "elementsContent", {
            set: function (value) {
                if (value) {
                    var length = value.length;
                    for (var i = 0; i < length; i++) {
                        this.addChild(value[i]);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        DragPanel.prototype.init = function () {
            if (this._moveArea != null) {
                this._moveArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            if (this._closeButton != null) {
                this._closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this);
            }
        };
        DragPanel.prototype.onCloseButtonClick = function (e) {
            DisplayObjectUtil.removeAllChild(this);
            DisplayObjectUtil.removeForParent(this);
        };
        DragPanel.prototype.onTouchBegin = function (event) {
            this.offsetPointX = this._moveArea.x - event.$stageX;
            this.offsetPointY = this._moveArea.y - event.$stageY;
            LayerManager.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            LayerManager.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        DragPanel.prototype.onTouchMove = function (event) {
            this._moveArea.x = event.$stageX + this.offsetPointX;
            this._moveArea.y = event.$stageY + this.offsetPointY;
            console.log("event.$stageX:" + event.$stageX, "   this.x:" + this.x);
        };
        DragPanel.prototype.onTouchEnd = function (event) {
            LayerManager.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            LayerManager.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        DragPanel.prototype.removedFromStageHandler = function (e) {
            this.destroy();
        };
        DragPanel.prototype.addedToStageHandler = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
        };
        DragPanel.prototype.destroy = function () {
            if (this._moveArea != null) {
                this._moveArea.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            if (this._closeButton != null) {
                this._closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this);
            }
        };
        return DragPanel;
    }(egret.DisplayObjectContainer));
    ST.DragPanel = DragPanel;
    __reflect(DragPanel.prototype, "ST.DragPanel");
})(ST || (ST = {}));
//# sourceMappingURL=DragPanel.js.map