
module ST {

	export class Slider extends egret.DisplayObjectContainer {
		static VERTICAL:string = "vertical";
		static HORIZONTAL:string 	= "horizontal";
		private _trackSpr:egret.DisplayObjectContainer;
		private _trackSubSpr:egret.DisplayObjectContainer;
		private _thumbSpr:egret.DisplayObjectContainer;
		private _thumbSubSpr:egret.DisplayObjectContainer;
		private _scrollDir:string;
		private _scrollSpeed:number;
		private _trackHeight:number;
		private _styleMap:any;
		private _wheelSpeed:number;
		private _wheelStrenght:number;
		private _posPercent:number;
		private _newPosTarget:number;
		private _minNum:number;
		private _maxNum:number;
		private _curNum:number;
		private _stepNum:number;
		private _valueEvent:GuiEvent;
		
		public constructor(direction:string = Slider.VERTICAL, scrollSpeed:number = .5, trackHeight:number = 100, minNum:number = 0, maxNum:number = 100, stepNum:number = 0 ) {
			super();
			this._scrollDir = direction;
			this._scrollSpeed = scrollSpeed;
			this._trackHeight = trackHeight;
			this._minNum = minNum;
			this._maxNum = maxNum;
			this._stepNum = stepNum;
			this.init();
		}
		public init():void {
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
			this._valueEvent = new GuiEvent(GuiEvent.Slider_CHANGE_VALUE);

			this.draw();
			
			this._thumbSpr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startDragThumb, this);
			this._trackSpr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTrackHandler, this);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
		}
		
		private addedToStageHandler(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
		}
		
		private removedFromStageHandler(e:egret.Event):void {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this);
			this.destroy();
		}
		
		public draw():void {
			if (this._trackSubSpr) this._trackSpr.addChild(this._trackSubSpr);
			if (this._thumbSubSpr) this._thumbSpr.addChild(this._thumbSubSpr);
			this.setupDirLocation();
		}
		
		/**
		 * 设置Slider的方向
		*/
		private setupDirLocation():void {
			if (this._scrollDir == Slider.VERTICAL){
				this._trackSpr.x = 0;
				this._trackSpr.y = 0;
				if (this._trackSpr.height >0) this._trackHeight = this._trackSpr.height;
				this._thumbSpr.x = this._trackSpr.width/2-this._thumbSpr.width/2;
				this._thumbSpr.y =0;
			}
			else if (this._scrollDir == Slider.HORIZONTAL){
				this._trackSpr.x = 0;
				this._trackSpr.y = 0;
				if (this._trackSpr.height >0) this._trackHeight = this._trackSpr.height;
				this._thumbSpr.x = this._trackSpr.width/2-this._thumbSpr.width/2;
				this._thumbSpr.y = -(this._trackSpr.width/2-this._thumbSpr.width/2);
				
				this._trackSpr.rotation = 270;
				this._thumbSpr.rotation = 270;
			}
		}
		
		/**
		 * 内部渲染逻辑
		 */
		
		/**
		 * 点击Slider
		 * @param	evt
		 */
		private clickTrackHandler(evt:egret.TouchEvent):void{
				var trackClicPos:number;
				if (this._scrollDir == Slider.VERTICAL){
					trackClicPos = evt.stageY-this.y-this.parent.y;
				}
				else if (this._scrollDir == Slider.HORIZONTAL){
					trackClicPos = evt.stageX-this.x-this.parent.x;
				}
				this.moveThumb(trackClicPos);
		}

		private _offNum:number; // 偏移存储值
		private startDragThumb(evt:egret.TouchEvent):void{
			this._offNum = evt.localY; 
			this._thumbSpr.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startDragThumb, this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stopDragThumb, this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMoveHandler, this);
		}
		
		private mouseMoveHandler(evt:egret.TouchEvent):void{
			var thumbNewPos:number;
			var tp:egret.Point = this.localToGlobal(this.stage.x, this.stage.y);
			if (this._scrollDir == Slider.VERTICAL){
				thumbNewPos = evt.stageY - tp.y - this._offNum;
			}
			else if (this._scrollDir == Slider.HORIZONTAL){
				thumbNewPos = evt.stageX - tp.x - this._offNum;
			}
			this.moveThumb(thumbNewPos);
		}
		
		private moveThumb(pThumbNewPos:number):void{
			if (this._scrollDir == Slider.VERTICAL){
				if (pThumbNewPos<0){
					this._thumbSpr.y = 0;
				}
				else if (pThumbNewPos >this._trackHeight-this._thumbSpr.height){
					this._thumbSpr.y = this._trackHeight-this._thumbSpr.height;
				}
				else{
					this._thumbSpr.y = pThumbNewPos;
				}
				this.moveTargetVerticaly(this._thumbSpr.y);
			}
			else if (this._scrollDir == Slider.HORIZONTAL){
				if (pThumbNewPos<0){
					this._thumbSpr.x = 0;
				}
				else if (pThumbNewPos >this._trackHeight-this._thumbSpr.width){
					this._thumbSpr.x = this._trackHeight-this._thumbSpr.width;
				}
				else{
					this._thumbSpr.x = pThumbNewPos;
				}
				this.moveTargetHorizontaly(this._thumbSpr.x);
			}
		}
				
		private moveTargetHorizontaly(thumbX:number):void{
			var tn:number = this._maxNum - this._minNum;
			this._posPercent = (tn * thumbX) / (this._trackHeight - this._thumbSpr.width - 1);
			this._curNum =this._posPercent + this._minNum;
			this.dispatchEvent(this._valueEvent);
			//_newPosTarget = (_target.width - _trackHeight) * _posPercent * 0.01;
		}
		
		private moveTargetVerticaly(thumbY:number):void{
			var tn:number = this._maxNum - this._minNum;
			this._posPercent = (tn * thumbY) / (this._trackHeight - this._thumbSpr.height);
			this._curNum = this._posPercent + this._minNum;
			this.dispatchEvent(this._valueEvent);
		}
		
		private stopDragThumb(evt:egret.TouchEvent):void{
			this._thumbSpr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startDragThumb, this);
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopDragThumb, this);
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMoveHandler, this);
		}
		
		/**
		 * get/set
		 */
		public set Value(num:number){
			this._curNum = num ;
		}
		public get Value():number{
			return this._curNum;
		}
		 
		public destroy():void {
		}
	}
}