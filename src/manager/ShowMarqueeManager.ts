class ShowMarqueeManager{
    private static  _singleton:boolean=true;
    private static  _instance:ShowMarqueeManager;
    private _infoList:Array<any>;
    private MTA:ST.BubbleBox;
    public constructor()
    {
        this._infoList = new Array<any>();
    }
    public static getInstance():ShowMarqueeManager{
        if (!ShowMarqueeManager._instance) {
            ShowMarqueeManager._singleton=false;
            ShowMarqueeManager._instance=new ShowMarqueeManager();
            ShowMarqueeManager._singleton=true;
        }
        return ShowMarqueeManager._instance;
    }

    public addInfo(str:string):void{
        this._infoList.push([str]);
        if(this._infoList.length ==1) this.showInfo();
    }



    private showInfo():void{
        if(this._infoList.length>0){
            if(!this.MTA){
                var tempSpr:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
                var laba:egret.Bitmap = new egret.Bitmap();
                laba.texture = RES.getRes("game_card.xiaolaba")
                var tempTxt:egret.TextField = new egret.TextField();
                tempTxt.text = this._infoList[0];
                tempTxt.size = 40;
                tempTxt.textAlign = "center"
                tempTxt.x= 40;
                tempSpr.addChild(laba)
                tempSpr.addChild(tempTxt)
                this.MTA = new ST.BubbleBox("game_card.Panel_back",tempSpr,false,ST.BubbleBox.OUT_TYPE_MARQUEE,20)
                this.MTA.setPostion(LayerManager.stage.stageWidth,LayerManager.stage.stageHeight*.2)
                this.MTA.addEventListener("removed",this.removeMarquee,this)
                this.MTA._defaultSpr.alpha=.7;
                LayerManager.TopLayer.addChild(this.MTA)
            }
        }
    }

    private removeMarquee(e:Event):void{
        if(this.MTA){
            this.MTA.removeEventListener("removed",this.removeMarquee,this)
            this.MTA.destroy();
            DisplayObjectUtil.removeAllChild(this.MTA)
            DisplayObjectUtil.removeForParent(this.MTA)
            this.MTA = null;
        }
        this._infoList.splice(0,1);
        this.showInfo();
    }
}