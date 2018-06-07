
module ST {

    export class AlertKnow extends egret.DisplayObjectContainer {
        static BTN_YES_NO: string = "btn_yes_no";
        static BTN_YES: string = "btn_yes";
        private _cancelBtn: ST.Button;
        private _sumitBtn: ST.Button;
        private _bg: egret.Bitmap;
        private _txt: egret.TextField;
        private _mask: egret.Sprite;
        private _container: egret.DisplayObjectContainer;
        private _submitFunction: Function;
        private _cancelFunction: Function;

        public constructor(type: string = AlertKnow.BTN_YES_NO) {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            if (this._mask == null) {
                this._mask = new egret.Sprite();
                this._mask.graphics.beginFill(0x000000, 0.5);
                this._mask.graphics.drawRect(0, 0, GlobalVars.stageWidth, GlobalVars.stageHeight);
                this._mask.graphics.endFill();
                //                this._mask.touchEnabled = true;
                //                this._mask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
                this.addChild(this._mask);
            }
            if (this._container == null) {
                this._container = new egret.DisplayObjectContainer;
                this.addChild(this._container)
            }
            this._container.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stopPopup, this);
            if (this._bg == null) {
                this._bg = new egret.Bitmap();
                this._bg.texture = RES.getRes("bg_alert");
                this._container.addChild(this._bg)
            }
            if (this._sumitBtn == null) {
                this._sumitBtn = new ST.Button("btn_alert_sure", "btn_alert_sure_down");
                if (type == AlertKnow.BTN_YES) {
                    this._sumitBtn.x = 320;
                    this._sumitBtn.y = 360;
                } else {
                    this._sumitBtn.x = 200;
                    this._sumitBtn.y = 360;
                }
                this._container.addChild(this._sumitBtn)
            }
            if (type == AlertKnow.BTN_YES_NO) {
                if (this._cancelBtn == null) {
                    this._cancelBtn = new ST.Button("btn_alert_cancel", "btn_alert_cancel_down");
                    this._cancelBtn.x = 450;
                    this._cancelBtn.y = 360;
                    this._container.addChild(this._cancelBtn)
                }
            }
            if (this._txt == null) {
                this._txt = new egret.TextField();
                this._txt.textAlign = egret.HorizontalAlign.CENTER;
                this._txt.size = 36;
                this._txt.multiline = true;
                this._txt.lineSpacing = 35;
                this._txt.width = 500;
                this._txt.x = 50;
                this._txt.fontFamily = GlobalVars.Font_YaHei;
                this._txt.y = 130;
                this._txt.textColor = 0x000000;
                this._container.addChild(this._txt)
                this._container.anchorOffsetX = this._container.width * .5;
                this._container.anchorOffsetY = this._container.height * .5;
            }
            if (LayerManager.AlertLayer == null) return;
            LayerManager.AlertLayer.addChild(this);

            this.redrawByBrowser();
            var tw = egret.Tween.get(this._container);
            tw.to({ scaleX: 1.2, scaleY: 1.2 }, ConfigInfo.YOYO_SPEED * 1.5, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, ConfigInfo.YOYO_SPEED * 1.5);
        }

        private stopPopup(e: egret.TouchEvent) {
            e.stopImmediatePropagation();
        }

        public redrawByBrowser(): void {
            this._container.x = LayerManager.stage.stageWidth * .5;
            this._container.y = LayerManager.stage.stageHeight * .5;
        }

        public show(str: string, _submitFun?: Function, _cancelFun?: Function): void {
            this._submitFunction = _submitFun;
            this._cancelFunction = _cancelFun;
            this._sumitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onApply, this);
            if (this._cancelBtn != null) this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancel, this);
            this._txt.text = str;
        }

        private onApply(): void {
            this.hide();
            if (this._submitFunction != null) {
                this._submitFunction();
            }
            SystemEvent.dispatchEvents(new SystemEvent(SystemEvent.CLOSE));
        }

        private onCancel(): void {
            if (this._cancelFunction != null) {
                this._cancelFunction();
            }
            this.hide();
            SystemEvent.dispatchEvents(new SystemEvent(SystemEvent.CLOSE));
            SystemEvent.dispatchEvents(new SystemEvent(SystemEvent.CANCEL));
        }

        public hide(): void {
            DisplayObjectUtil.removeAllChild(this);
            DisplayObjectUtil.removeForParent(this);
        }

        private destroy(): void {
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
        }

        private removedFromStageHandler(e: egret.Event): void {
            this.destroy();
        }

        private addedToStageHandler(e: egret.Event): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
        }
    }
}