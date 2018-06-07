
module ST {

    export class TextBox extends egret.DisplayObjectContainer {
        public data: Object;
        private _disableSkin: string = "";
        private _txt: eui.EditableText; //文本框
        private _txtBg: egret.Bitmap;//背景图
        private _txtBgDisable: egret.Bitmap;//不可点背景图
        private _offX: number;
        private _offY: number;
        private _defaultStr: egret.TextField;  //默认文本
        /**
         * 具体按钮类构造函数
         */
        public constructor(defaultSkin: string, disableSkin?: string, value?: string, defaultStr?: string, width?: number) {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.data = new Object();


            this._txtBg = new egret.Bitmap();
            this._txtBg.texture = RES.getRes(defaultSkin);
            this.addChild(this._txtBg);

            if (disableSkin != undefined) this._disableSkin = disableSkin;
            if (this._disableSkin != undefined) {
                this._txtBgDisable = new egret.Bitmap();
                this._txtBgDisable.texture = RES.getRes(this._disableSkin);
                this.addChild(this._txtBgDisable);
            }

            this._txt = new eui.EditableText();
            this._txt.type = egret.TextFieldType.INPUT;
            this._txt.text = value;
            if (width != null && width > 0)
                this._txt.width = width;
            else
                this._txt.width = 580;
            this._txt.height = 100;

            this._txt.x = 20;
            this._txt.y = 20;
            this._txt.size = 40;
            this._txt.maxChars = 20;
            this._txt.textColor = 0xdedfe0;
            this._txt.addEventListener(egret.TouchEvent.FOCUS_IN, this.focusinHandler, this);
            this._txt.addEventListener(egret.TouchEvent.FOCUS_OUT, this.focusoutHandler, this);
            this.addChild(this._txt);

            this._defaultStr = new egret.TextField();
            this._defaultStr.visible = false;
            this._defaultStr.x = this._txt.x;
            this._defaultStr.y = this._txt.y;
            this._defaultStr.text = defaultStr;
            this._defaultStr.size = 34;
            this._defaultStr.textColor = 0xdedfe0;
            this.addChild(this._defaultStr);

            if (this._txt.text == "" && defaultStr != undefined && defaultStr != null && defaultStr != "" && value != undefined && value != "") {
                this._defaultStr.visible = true;
            }


            this.init();
        }

        public setSize(n: number): void {
            this._txt.size = n;
        }

        private focusinHandler(e: egret.TouchEvent) {
            this._defaultStr.visible = false;
        }
        private focusoutHandler(e: egret.TouchEvent) {
            if (this._txt.text == "") {
                this._defaultStr.visible = true;
            }
        }



        /**
         * 初始化Button显示对象和绘制，绘制元素建立map
         */
        public init(): void {

            this.touchEnabled = true;
            // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        }
        // *****************************************        初始化绘制        *********************


        private removedFromStageHandler(e: Event): void {
            this.destroy();
        }

        private addedToStageHandler(e: Event): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
        }



        public getValue(): string {
            return this._txt.text;
        }
        public setValue(value: string) {
            return this._txt.text = value;
        }
        public displayAsPassword(b: boolean) {
            this._txt.displayAsPassword = b;
        }

        /**
         * 设置是否可用
         * @param	b
         */
        public setDisable(b: boolean): void {
            if (!b) {
                this.touchEnabled = false;
                if (this._txtBgDisable != null) {
                    this._txtBgDisable.visible = true;
                    this._txtBg.visible = false;
                    this._txt.type = egret.TextFieldType.DYNAMIC;
                }
            } else {
                this.touchEnabled = true;
                if (this._txtBg != null) {
                    this._txtBg.visible = true;
                    this._txtBgDisable.visible = false;
                    this._txt.type = egret.TextFieldType.INPUT;
                }
            }
        }
        public setPostion(x: number, y: number) {
            this.x = x;
            this.y = y;
            this._offX = x;
            this._offY = y;
        }
        public getY(): number {
            return this._txt.y + this._offY;

        }
        public getX(): number {
            return this._txt.x + this._offX;
        }


        public destroy(): void {
            if (this.data != null) this.data = null;
            // this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        }
    }
}