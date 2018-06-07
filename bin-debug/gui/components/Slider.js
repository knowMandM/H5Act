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
    var Slider = (function (_super) {
        __extends(Slider, _super);
        function Slider(direction, scrollSpeed, trackHeight, minNum, maxNum, stepNum) {
            if (direction === void 0) { direction = Slider.VERTICAL; }
            if (scrollSpeed === void 0) { scrollSpeed = .5; }
            if (trackHeight === void 0) { trackHeight = 100; }
            if (minNum === void 0) { minNum = 0; }
            if (maxNum === void 0) { maxNum = 100; }
            if (stepNum === void 0) { stepNum = 0; }
            var _this = _super.call(this) || this;
            _this._scrollDir = direction;
            _this._scrollSpeed = scrollSpeed;
            _this._trackHeight = trackHeight;
            _this._minNum = minNum;
            _this._maxNum = maxNum;
            _this._stepNum = stepNum;
            _this.init();
            return _this;
        }
        Slider.prototype.init = function () {
            this._styleMap = new Object();
            this._wheelSpeed = 3;
            this._wheelStrenght = 3;
            this._scrollSpeed = 1 - this._scrollSpeed;
            this._curNum = this._minNum;
            this._trackSpr = new egret.DisplayObjectContainer();
            this._thumbSpr = new egret.DisplayObjectContainer();
            this._trackSubSpr = new egret.DisplayObjectContainer();
            this._thumbSubSpr = new egret.DisplayObjectContainer();
            this.addChild(this._trackSpr);
            this.addChild(this._thumbSpr);
            this._valueEvent = new ST.GuiEvent(ST.GuiEvent.Slider_CHANGE_VALUE);
            this.draw();
            this._thumbSpr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startDragThumb, this);
            this._trackSpr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTrackHandler, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
        };
        Slider.prototype.addedToStageHandler = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
        };
        Slider.prototype.removedFromStageHandler = function (e) {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
            this.destroy();
        };
        Slider.prototype.draw = function () {
            if (this._trackSubSpr)
                this._trackSpr.addChild(this._trackSubSpr);
            if (this._thumbSubSpr)
                this._thumbSpr.addChild(this._thumbSubSpr);
            this.setupDirLocation();
        };
        /**
         * 设置Slider的方向
        */
        Slider.prototype.setupDirLocation = function () {
            if (this._scrollDir == Slider.VERTICAL) {
                this._trackSpr.x = 0;
                this._trackSpr.y = 0;
                if (this._trackSpr.height > 0)
                    this._trackHeight = this._trackSpr.height;
                this._thumbSpr.x = this._trackSpr.width / 2 - this._thumbSpr.width / 2;
                this._thumbSpr.y = 0;
            }
            else if (this._scrollDir == Slider.HORIZONTAL) {
                this._trackSpr.x = 0;
                this._trackSpr.y = 0;
                if (this._trackSpr.height > 0)
                    this._trackHeight = this._trackSpr.height;
                this._thumbSpr.x = this._trackSpr.width / 2 - this._thumbSpr.width / 2;
                this._thumbSpr.y = -(this._trackSpr.width / 2 - this._thumbSpr.width / 2);
                this._trackSpr.rotation = 270;
                this._thumbSpr.rotation = 270;
            }
        };
        /**
         * 内部渲染逻辑
         */
        /**
         * 点击Slider
         * @param	evt
         */
        Slider.prototype.clickTrackHandler = function (evt) {
            var trackClicPos;
            if (this._scrollDir == Slider.VERTICAL) {
                trackClicPos = evt.stageY - this.y - this.parent.y;
            }
            else if (this._scrollDir == Slider.HORIZONTAL) {
                trackClicPos = evt.stageX - this.x - this.parent.x;
            }
            this.moveThumb(trackClicPos);
        };
        Slider.prototype.startDragThumb = function (evt) {
            this._offNum = evt.localY;
            this._thumbSpr.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startDragThumb, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stopDragThumb, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMoveHandler, this);
        };
        Slider.prototype.mouseMoveHandler = function (evt) {
            var thumbNewPos;
            var tp = this.localToGlobal(this.stage.x, this.stage.y);
            if (this._scrollDir == Slider.VERTICAL) {
                thumbNewPos = evt.stageY - tp.y - this._offNum;
            }
            else if (this._scrollDir == Slider.HORIZONTAL) {
                thumbNewPos = evt.stageX - tp.x - this._offNum;
            }
            this.moveThumb(thumbNewPos);
        };
        Slider.prototype.moveThumb = function (pThumbNewPos) {
            if (this._scrollDir == Slider.VERTICAL) {
                if (pThumbNewPos < 0) {
                    this._thumbSpr.y = 0;
                }
                else if (pThumbNewPos > this._trackHeight - this._thumbSpr.height) {
                    this._thumbSpr.y = this._trackHeight - this._thumbSpr.height;
                }
                else {
                    this._thumbSpr.y = pThumbNewPos;
                }
                this.moveTargetVerticaly(this._thumbSpr.y);
            }
            else if (this._scrollDir == Slider.HORIZONTAL) {
                if (pThumbNewPos < 0) {
                    this._thumbSpr.x = 0;
                }
                else if (pThumbNewPos > this._trackHeight - this._thumbSpr.width) {
                    this._thumbSpr.x = this._trackHeight - this._thumbSpr.width;
                }
                else {
                    this._thumbSpr.x = pThumbNewPos;
                }
                this.moveTargetHorizontaly(this._thumbSpr.x);
            }
        };
        Slider.prototype.moveTargetHorizontaly = function (thumbX) {
            var tn = this._maxNum - this._minNum;
            this._posPercent = (tn * thumbX) / (this._trackHeight - this._thumbSpr.width - 1);
            this._curNum = this._posPercent + this._minNum;
            this.dispatchEvent(this._valueEvent);
            //_newPosTarget = (_target.width - _trackHeight) * _posPercent * 0.01;
        };
        Slider.prototype.moveTargetVerticaly = function (thumbY) {
            var tn = this._maxNum - this._minNum;
            this._posPercent = (tn * thumbY) / (this._trackHeight - this._thumbSpr.height);
            this._curNum = this._posPercent + this._minNum;
            this.dispatchEvent(this._valueEvent);
        };
        Slider.prototype.stopDragThumb = function (evt) {
            this._thumbSpr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startDragThumb, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopDragThumb, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMoveHandler, this);
        };
        Object.defineProperty(Slider.prototype, "Value", {
            get: function () {
                return this._curNum;
            },
            /**
             * get/set
             */
            set: function (num) {
                this._curNum = num;
            },
            enumerable: true,
            configurable: true
        });
        Slider.prototype.destroy = function () {
        };
        Slider.VERTICAL = "vertical";
        Slider.HORIZONTAL = "horizontal";
        return Slider;
    }(egret.DisplayObjectContainer));
    ST.Slider = Slider;
    __reflect(Slider.prototype, "ST.Slider");
})(ST || (ST = {}));
//# sourceMappingURL=Slider.js.map