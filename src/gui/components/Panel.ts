
module ST {

    export class Panel extends egret.DisplayObjectContainer {
        public data: Object;
        private _defaultSpr: egret.Bitmap;
        public _closeSpr: Button;
        private _showYoyo: boolean = true;

        private _offX: number;
        private _offY: number;
        /**
         * 具体按钮类构造函数
         * bgSkin - 皮肤背景 (支持九宫格)
         * closeSpr - 关闭按钮
         */
        public constructor(bgSkin: string, closeSpr?: Button, showYoyo?: boolean) {
            super();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
            this.data = new Object();
            this._closeSpr = closeSpr;
            if (closeSpr != undefined) this._closeSpr = closeSpr;
            if (showYoyo != undefined) this._showYoyo = showYoyo;
            if (this._defaultSpr == null) {
                this._defaultSpr = new egret.Bitmap();
                this._defaultSpr.scale9Grid = new egret.Rectangle(12, 12, 82, 76);
                this._defaultSpr.texture = RES.getRes(bgSkin);
                this.addChild(this._defaultSpr);
            }
            if (this._closeSpr != null) this.addChild(this._closeSpr);
            this.setSize(this._defaultSpr.width, this._defaultSpr.height);
            this.init();
        }

        /**
         * 初始化Button显示对象和绘制，绘制元素建立map
         */
        public init(): void {
            //this.touchEnabled = true;
            if (this._showYoyo) {
                var tw = egret.Tween.get(this);
                tw.to({ scaleX: 1.2, scaleY: 1.2 }, ConfigInfo.YOYO_SPEED, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, ConfigInfo.YOYO_SPEED);
            }
            if (this._closeSpr != null) this._closeSpr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanelHandler, this)
        }
        // *****************************************        初始化绘制        *********************

        private closePanelHandler(e: egret.TouchEvent): void {
            DisplayObjectUtil.removeAllChild(this);
            DisplayObjectUtil.removeForParent(this);
            this.dispatchEventWith(egret.Event.CLOSE)
        }


        public setSize(w: number, h: number, closeH?: number): void {
            this._defaultSpr.width = w;
            this._defaultSpr.height = h;
            this._defaultSpr.anchorOffsetX = this._defaultSpr.width * .5;
            this._defaultSpr.anchorOffsetY = this._defaultSpr.height * .5;
            this._offX = this._defaultSpr.width * .5;
            this._offY = this._defaultSpr.height * .5;
            if (this._closeSpr != null)
                this._closeSpr.x = this._defaultSpr.width * .5 - 10;
            if (this._closeSpr != null) {
                this._closeSpr.y = - this._defaultSpr.height * .5 + 10;
                if (closeH != undefined && closeH > 0)
                    this._closeSpr.y = - this._defaultSpr.height * .5 + 10 + closeH;
            }
        }

        public setPostion(x: number, y: number) {
            this.x = x + this._offX;
            this.y = y + this._offY;
        }

        private removedFromStageHandler(e: Event): void {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
            this.destroy();
        }

        private addedToStageHandler(e: Event): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
        }


        public destroy(): void {
            if (this._closeSpr != null) this._closeSpr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanelHandler, this)
            if (this._defaultSpr != null) {
                DisplayObjectUtil.removeAllChild(this._defaultSpr)
                DisplayObjectUtil.removeForParent(this._defaultSpr)
                this._defaultSpr = null;
            }
            if (this.data != null) this.data = null;
        }
    }
}