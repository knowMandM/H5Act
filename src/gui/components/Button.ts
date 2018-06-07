
module ST {

    export class Button extends egret.DisplayObjectContainer {
        public data: Object;
        private _defaultSpr: egret.Bitmap;
        private _pressSpr: egret.Bitmap;
        private _disableSpr: egret.Bitmap;
        private _disableSkin: string = "";
        private _showYoyo: boolean = true;

        private _offX: number;
        private _offY: number;

        /**
         * 具体按钮类构造函数
         */
        public constructor(defaultSkin: string, pressSkin: string, disableSkin?: string, showYoyo?: boolean) {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.data = new Object();
            if (disableSkin != undefined) this._disableSkin = disableSkin;
            if (showYoyo != undefined) this._showYoyo = showYoyo;
            if (this._defaultSpr == null) {
                this._defaultSpr = new egret.Bitmap();
                this._defaultSpr.texture = RES.getRes(defaultSkin);
                this.addChild(this._defaultSpr);
                this._defaultSpr.anchorOffsetX = this._defaultSpr.width * .5;
                this._defaultSpr.anchorOffsetY = this._defaultSpr.height * .5;
                this.x = this._defaultSpr.width * .5;
                this.y = this._defaultSpr.height * .5;
            }
            if (this._pressSpr == null) {
                this._pressSpr = new egret.Bitmap();
                this._pressSpr.texture = RES.getRes(pressSkin);
                this._pressSpr.visible = false;
                this.addChild(this._pressSpr);
                this._pressSpr.anchorOffsetX = this._pressSpr.width * .5;
                this._pressSpr.anchorOffsetY = this._pressSpr.height * .5;
                this.x = this._pressSpr.width * .5;
                this.y = this._pressSpr.height * .5;
            }
            if (this._disableSkin != undefined) {
                if (this._disableSkin != "") {
                    if (this._disableSpr == null) {
                        this._disableSpr = new egret.Bitmap();
                        this._disableSpr.texture = RES.getRes(disableSkin);
                        this._disableSpr.visible = false;
                        this.addChild(this._disableSpr);
                        this._disableSpr.anchorOffsetX = this._disableSpr.width * .5;
                        this._disableSpr.anchorOffsetY = this._disableSpr.height * .5;
                        this.x = this._disableSpr.width * .5;
                        this.y = this._disableSpr.height * .5;
                    }
                }
            }
            this.init();
        }

        /**
         * 初始化Button显示对象和绘制，绘制元素建立map
         */
        public init(): void {
            this._offX = this._defaultSpr.width * .5;
            this._offY = this._defaultSpr.height * .5;
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEndHandler, this);
        }
        // *****************************************        初始化绘制        *********************

        private touchBeginHandler(e: egret.TouchEvent): void {
            this._defaultSpr.visible = false;
            this._pressSpr.visible = true;
            if (this._showYoyo) {
                var tw = egret.Tween.get(this);
                tw.to({ scaleX: 1.2, scaleY: 1.2 }, ConfigInfo.YOYO_SPEED, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, ConfigInfo.YOYO_SPEED);
            }
        }
        private touchEndHandler(e: egret.TouchEvent): void {
            this._defaultSpr.visible = true;
            this._pressSpr.visible = false;
        }
        private removedFromStageHandler(e: Event): void {
            this.destroy();
        }

        private addedToStageHandler(e: Event): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
        }

        /**
         * 设置是否可用
         * @param	b
         */
        public setDisable(b: boolean): void {
            if (!b) {
                this.touchEnabled = false;
                if (this._disableSpr != null) {
                    this._disableSpr.visible = true;
                    this._defaultSpr.visible = false;
                    this._pressSpr.visible = false;
                }
            } else {
                this.touchEnabled = true;
                this._defaultSpr.visible = true;
                this._pressSpr.visible = false;
                if (this._disableSkin != "") {
                    this._disableSpr.visible = false;
                }
            }
        }
        public setPostion(x: number, y: number) {
            this.x = x + this._offX;
            this.y = y + this._offY;
        }
        public getY(): number {
            return this.y - this._offY;

        }
        public getX(): number {
            return this.x - this._offX;
        }
        public destroy(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEndHandler, this);
            if (this.data != null) this.data = null;
        }

        public changeSkin(defaultSkin: string, pressSkin: string, disableSkin?: string): void {
            if (this._defaultSpr != undefined)
                this._defaultSpr.texture = RES.getRes(defaultSkin);
            if (this._pressSpr != undefined)
                this._pressSpr.texture = RES.getRes(pressSkin);
            if (disableSkin != undefined)
                this._disableSkin = disableSkin;
        }
    }
}