module ST {
    export class DragPanel extends egret.DisplayObjectContainer {
        private offsetPointX:number = 0;
        private offsetPointY:number = 0;
        public _closeButton:Button = null;
        public _moveArea:egret.DisplayObjectContainer = null;

        public constructor(moveArea:egret.DisplayObjectContainer,closeButton?:Button)
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this._moveArea = moveArea;
            this._closeButton = closeButton;
            moveArea.touchEnabled = true;
            this.touchEnabled = true;
            this.init();
        }

        public set elementsContent(value:egret.DisplayObject[]) {
            if (value) {
                var length = value.length;
                for (var i = 0; i < length; i++) {
                    this.addChild(value[i]);
                }
            }
        }

        private init():void
        {
            if (this._moveArea != null) {
                this._moveArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            if (this._closeButton != null) {
                this._closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this);
            }
        }

        public onCloseButtonClick(e:egret.TouchEvent):void {
            DisplayObjectUtil.removeAllChild(this);
            DisplayObjectUtil.removeForParent(this);
        }


        private onTouchBegin(event:egret.TouchEvent):void {
            this.offsetPointX = this._moveArea.x - event.$stageX;
            this.offsetPointY = this._moveArea.y - event.$stageY;
            LayerManager.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            LayerManager.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        }


        private onTouchMove(event:egret.TouchEvent):void {
            this._moveArea.x = event.$stageX + this.offsetPointX;
            this._moveArea.y = event.$stageY + this.offsetPointY;
            console.log("event.$stageX:"+event.$stageX,"   this.x:"+this.x);
        }


        private onTouchEnd(event:egret.TouchEvent):void {
            LayerManager.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            LayerManager.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        }

        private removedFromStageHandler(e:Event):void {
            this.destroy();
        }

        private addedToStageHandler(e:Event):void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
        }

        private destroy():void
        {
            if (this._moveArea != null) {
                this._moveArea.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            if (this._closeButton != null) {
                this._closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this);
            }
        }
    }

}