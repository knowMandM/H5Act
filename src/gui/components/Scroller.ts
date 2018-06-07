
module ST {
    export class Scroller extends egret.EventDispatcher{
// ----------------------------------------------------------------------------------------------------------------------- vars

        /**
         * @private
         * set the object to save the setters value inside it self
         */
        public _propSaver:any = new Object();

        // input vars
        private _content:egret.DisplayObjectContainer;
        private _boundWidth:number = 100;
        private _boundHeight:number = 100;

        private _orientation:string = Orientation.AUTO;
        //private _easeType:string = Easing.Expo_easeOut;
        private _duration:number = .5;

        public _holdArea:number = 10;
        public _isStickTouch:boolean = false;

        private _yPerc:number = 0;
        private _xPerc:number = 0;


        // needed vars
        private _time1:number
        private _time2:number = 0;
        private _y1:number
        private _y2:number
        private _yOverlap:number
        private _yOffset:number;
        private _x1:number
        private _x2:number
        private _xOverlap:number
        private _xOffset:number;

        //public _easeTypeFunc:any = EaseLookup.find(this._easeType);

        private _touchPoint:egret.Point;
        private _holdAreaPoint:egret.Point;
        public _isHoldAreaDone:boolean = false; // if true, shows that we have got out of the hold area

        private _isScrollBegin:boolean = true;


// ----------------------------------------------------------------------------------------------------------------------- constructor func

        public constructor(_content:egret.DisplayObjectContainer){
            super();
            this._content = _content;
            console.log("this._content:"+this._content.y)
        }

// ----------------------------------------------------------------------------------------------------------------------- funcs



// ----------------------------------------------------------------------------------------------------------------------- Methods

        public startScroll($point:egret.Point):void{
            this._touchPoint = $point;

            if (this._isScrollBegin) // _isScrollBegin is true when user scrolls for the first time and each time he calls fling(){
            {
                this._holdAreaPoint = this._touchPoint;
                this._isHoldAreaDone = false; // so that on TouchPhase.MOVED check the _holdArea

                this.initScrollV();
                this.initScrollH();

                this._isScrollBegin = false; // set it to false, so the next time that user calls this function on TouchPhase.MOVED, function will do the rest
                //this.dispatchEvent(new ScrollEvent(ScrollEvent.MOUSE_DOWN));
                return;
            }

            // the above has happened for the first time on TouchPhase.BEGAN, so on TouchPhase.MOVED _isScrollBegin is false and won't do the above if statment and do the following
            var diff:number;

            if (this._orientation == Orientation.VERTICAL) {
                if (!this._isHoldAreaDone){
                    diff = this._holdAreaPoint.y - this._touchPoint.y;
                    diff = Math.sqrt(Math.pow(diff, 2)); // set to always get positive number
                    if (diff < this._holdArea) return; // if user is moving around and still didn't move so much to get out of the _holdArea boundaries, don't do the scroll animation
                }

                this.scrollVSetting();
            }
            else if (this._orientation == Orientation.HORIZONTAL) {
                if (!this._isHoldAreaDone){
                    diff = this._holdAreaPoint.x - this._touchPoint.x;
                    diff = Math.sqrt(Math.pow(diff, 2)); // set to always get positive number
                    if (diff < this._holdArea) return; // if user is moving around and still didn't move so much to get out of the _holdArea boundaries, don't do the scroll animation
                }

                this.scrollHSetting();
            }
            else // if it was AUTO
            {
                if (!this._isHoldAreaDone)
                {
                    // set diff 2 time according to x and y, so that if user moves in any direction, the diff amount will be added
                    diff = this._holdAreaPoint.y - this._touchPoint.y;
                    diff += this._holdAreaPoint.x - this._touchPoint.x;
                    diff = Math.sqrt(Math.pow(diff, 2)); // set to always get positive number
                    if (diff < this._holdArea) return; // if user is moving around and still didn't move so much to get out of the _holdArea boundaries, don't do the scroll animation
                }

                this.scrollVSetting();
                this.scrollHSetting();
            }



            this._isHoldAreaDone = true; // so that it won't check _holdArea next time that we move if we got back to its boundaries, because we don't like it to stop our scroll animation unless we release our touch and touch to move again
            //this.dispatchEvent(new ScrollEvent(ScrollEvent.MOUSE_MOVE));
        }

        private scrollVSetting():void
        {
            //if maskContent's position exceeds the bounds, make it drag only half as far with each mouse movement (like iPhone/iPad behavior)
            var y:number = this._touchPoint.y - this._yOffset;
            if (y > 0) {
                if (this._isStickTouch) this._content.y = 0;
                else this._content.y = (y + 0) * 0.5;
            }
            else if (y < 0 - this._yOverlap) {
                if (this._isStickTouch) this._content.y = (- this._yOverlap);
                else this._content.y = (y + 0 - this._yOverlap) * 0.5;
            }
            else {
                this._content.y = y;
            }

            //if the frame rate is too high, we won't be able to track the velocity as well, so only update the values 20 times per second
            var t:number = egret.getTimer();

            if (t - this._time2 > 50){
                this._y2 = this._y1;
                this._time2 = this._time1;
                this._y1 = this._content.y;
                this._time1 = t;
            }

            this.computeYPerc(); // to analyze _yPerc
        }

        private scrollHSetting():void{
            //if maskContent's position exceeds the bounds, make it drag only half as far with each mouse movement (like iPhone/iPad behavior)
            var x:number = this._touchPoint.x - this._xOffset;
            if (x > 0) {
                if (this._isStickTouch) this._content.x = 0;
                else this._content.x = (x + 0) * 0.5;
            }
            else if (x < 0 - this._xOverlap) {
                if (this._isStickTouch) this._content.x = (- this._xOverlap);
                else this._content.x = (x + 0 - this._xOverlap) * 0.5;
            }
            else {
                this._content.x = x;
            }

            //if the frame rate is too high, we won't be able to track the velocity as well, so only update the values 20 times per second
            var t:number = egret.getTimer();
            if (t - this._time2 > 50){
                this._x2 = this._x1;
                this._time2 = this._time1;
                this._x1 = this._content.x;
                this._time1 = t;
            }

            this.computeXPerc(); // to analyze _xPerc
        }
        private initScrollV():void{
            this._y1 = this._content.y;
            this._y2 = this._content.y;
            this._yOffset = this._touchPoint.y - this._content.y;
            this._yOverlap = Math.max(0, this._content.height - this._boundHeight);
            this._time1 = this._time2 = egret.getTimer();
        }

        private initScrollH():void{
            this._x1 = this._x2 = this._content.x;
            this._xOffset = this._touchPoint.x - this._content.x;
            this._xOverlap = Math.max(0, this._content.width - this._boundWidth);
            this._time1 = this._time2 = egret.getTimer();
        }

        public fling():void{
            // user usually calls this function on TouchPhase.ENDED, so we dispatch MOUSE_UP here
            //this.dispatchEvent(new ScrollEvent(ScrollEvent.MOUSE_UP));


            var time:number = (egret.getTimer() - this._time2) / 1000;
            if (time <= 0.020) time = 0.020;
            var yVelocity:number = (this._content.y - this._y2) / time;
            var xVelocity:number = (this._content.x - this._x2) / time;

            // set animation tolerance amount accroding to _isStickTouch is true or false
            var tolerance:any = { minDuration:(this._isStickTouch) ? 0: .3,
                overShoot:(this._isStickTouch) ? 0: 1 };


            LayerManager.stage.addEventListener(egret.Event.ENTER_FRAME,this.onTweenUpdate,this)
//            ThrowPropsPlugin.to(this._content, {throwProps:{
//                y:{velocity:yVelocity, max:0, min:0 - this._yOverlap, resistance:300},
//                x:{velocity:xVelocity, max:0, min:0 - this._xOverlap, resistance:300}
//            }, onUpdate:this.onTweenUpdate, onComplete:this.onTweenComplete, ease:this._easeTypeFunc
//            }, 10, tolerance.minDuration, tolerance.overShoot);

            this._isScrollBegin = true; // so that on the next scroll, scroller sets the touch begin settings in startScroll()
        }
        private onTweenUpdate():void{
            this.computeYPerc();
            this.computeXPerc();

            //this.dispatchEvent(new ScrollEvent(ScrollEvent.TOUCH_TWEEN_UPDATE));
        }
        private onTweenComplete():void{
            this.computeYPerc();
            this.computeXPerc();

            //this.dispatchEvent(new ScrollEvent(ScrollEvent.TOUCH_TWEEN_COMPLETE));
        }




        public computeYPerc($manualPerc:boolean = false):void{
            if (!this._content) return;
            if (this._orientation == Orientation.HORIZONTAL) return; // if _orientation is not vertical or auto, just return
            if (this._content.height <= this._boundHeight) return; // if content is smaller than the boundaries, there's no reason to set any percent


            if ($manualPerc){
                var yLoc:number = (this._yPerc * (this._content.height - this._boundHeight)) / 100; // Periodic Table-> _yPerc / 100 = ? / _content.height
                var tw:egret.Tween = egret.Tween.get(this._content);
                tw.to({y:- yLoc},this._duration,egret.Ease.sineIn);
                $manualPerc = false;
            }
            else{
                var diff:number = this._content.height - this._boundHeight; // the different amount between the 2 heights

                var currY: number = Math.sqrt(Math.pow(this._content.y, 2)); // set to always get positive number
                if (this._content.y > 0) currY = 0; // if touch scroll was scratching at start point, set currY to 0 obviously
                else if ( (- this._content.y) > diff) currY = diff; // if it was scratching at end point, set currY to diff obviously

                this._yPerc = currY * 100 / diff; // Periodic Table-> diff / 100 = currY / ?
            }
        }

        public computeXPerc($manualPerc:boolean = false):void{
            if (!this._content) return;
            if (this._orientation == Orientation.VERTICAL) return; // if _orientation is not horizontal or auto, just return
            if (this._content.width <= this._boundWidth) return; // if content is smaller than the boundaries, there's no reason to set any percent

            if ($manualPerc){
                var xLoc:number = (this._xPerc * (this._content.width - this._boundWidth)) / 100; // Periodic Table-> _xPerc / 100 = ? / _content.width
                var tw:egret.Tween = egret.Tween.get(this._content);
                tw.to({x:- xLoc},this._duration,egret.Ease.sineIn);
                $manualPerc = false;
            }
            else{
                var diff:number = this._content.width - this._boundWidth; // the different amount between the 2 widths

                var currX: number = Math.sqrt(Math.pow(this._content.x, 2)); // set to always get positive number
                if (this._content.x > 0) currX = 0; // if touch scroll was scratching at start point, set currX to 0 obviously
                else if ( (- this._content.x) > diff) currX = diff; // if it was scratching at end point, set currX to diff obviously

                this._xPerc = currX * 100 / diff; // Periodic Table-> diff / 100 = currX / ?
            }
        }

// ----------------------------------------------------------------------------------------------------------------------- Properties

        /**
         * indicates the scroller width.
         * @default 100
         */
        public get boundWidth():number{
            return this._boundWidth;
        }
        /**
         * @private
         */
        public set boundWidth(a:number){
            if(a != this._boundWidth){
                this._boundWidth = a;
                this._propSaver.boundWidth = this._boundWidth; // pass the new value to the value of the object property

                this.computeXPerc(true);
            }
        }

        /**
         * indicates the scroller height.
         * @default 100
         */
        public get boundHeight():number{
            return this._boundHeight;
        }
        /**
         * @private
         */
        public set boundHeight(a:number){
            if(a != this._boundHeight){
                this._boundHeight = a;
                this._propSaver.boundHeight = this._boundHeight; // pass the new value to the value of the object property

                this.computeYPerc(true);
            }
        }

        /**
         * indicates the type of orientation.
         * @default Orientation.AUTO
         * @see Orientation
         */
        public getOrientation():string{
            return this._orientation;
        }
        /**
         * @private
         */
        public seOrientation(a:string){
            if(a != this._orientation){
                this._orientation = a;
                this._propSaver.orientation = this._orientation; // pass the new value to the value of the object property
            }
        }

        /**
         * indicates the type of scrollbar ease.
         * @default Easing.Expo_easeOut
         * @see Easing
         */
//		public get easeType():string{
//			return this._easeType;
//		}
        /**
         * @private
         */
//		public set easeType(a:string){
//			if(a != this._easeType){
//				this._easeType = a;
//				this._easeTypeFunc = EaseLookup.find(this._easeType);
//				this._propSaver.easeType = this._easeType; // pass the new value to the value of the object property
//			}
//		}

        /**
         * indicates the content scrolling ease animation delay.
         * @default .5
         */
        public getDuration():number{
            return this._duration;
        }
        /**
         * @private
         */
        public setDuration(a:number){
            if(a != this._duration){
                this._duration = a;
                this._propSaver.duration = this._duration; // pass the new value to the value of the object property
            }
        }

        /**
         * if <code>true</code>, touch scroll is sticked if content position is at the start or end point of the mask,
         * if <code>false</code>, touch scroll bounces when gets to the start or end point of the mask.
         * @default false
         */
        public get isStickTouch():boolean{
            return this._isStickTouch;
        }
        /**
         * @private
         */
        public set isStickTouch(a:boolean){
            if(a != this._isStickTouch){
                this._isStickTouch = a;
                this._propSaver.isStickTouch = this._isStickTouch; // pass the new value to the value of the object property
            }
        }

        /**
         * indicates the hold area boundaries.
         * @default 10
         */
        public get holdArea():number{
            return this._holdArea;
        }
        /**
         * @private
         */
        public set holdArea(a:number){
            if(a != this._holdArea){
                this._holdArea = a;
                this._propSaver.holdArea = this._holdArea; // pass the new value to the value of the object property
            }
        }

        /**
         * if <code>true</code>, shows that we have scrolled enough and got out of the <code>holdArea</code>,
         * if <code>false</code>, shows that we are still inside the <code>holdArea</code>.
         */
        public get isHoldAreaDone():boolean{
            return this._isHoldAreaDone;
        }

        public set content(a:egret.DisplayObjectContainer){
            this._content = a;


        }

        /**
         * indicates the location of scrollbar vertically, values are from 0 to 100.
         * @default 0
         */
        public get yPerc():number{
            return this._yPerc;
        }
        /**
         * @private
         */
        public set yPerc(a:number){
            if(a != this._yPerc){
                this._yPerc = a;
                this._propSaver.yPerc = this._yPerc; // pass the new value to the value of the object property

                this.computeYPerc(true);
            }
        }

        /**
         * indicates the location of scrollbar horizontally, values are from 0 to 100.
         * @default 0
         */
        public get xPerc():number{
            return this._xPerc;
        }
        /**
         * @private
         */
        public set xPerc(a:number){
            if(a != this._xPerc){
                this._xPerc = a;
                this._propSaver.xPerc = this._xPerc; // pass the new value to the value of the object property

                this.computeXPerc(true);
            }
        }




        /**
         * export the class and send the Object that holds all of the setters values.
         */
        public get exportProp():any{
            return this._propSaver;
        }
        /**
         * import the class and get the Object that holds all of the setters values.
         */
//        public set importProp(a:any){
//            for (var prop:any in a){
//                this[prop] = a[prop];
//            }
//        }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}