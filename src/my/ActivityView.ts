class ActivityView{
    mainView : any;
    activeView : any;
    activeNotTimingView : fairygui.GComponent = null;
    dialogView:any;
    awardIcon_Type2Url : { [key: number]: string; } = {
        1 : "ui://duanwu/sliver",  // 银子icon
        2 : "ui://duanwu/ticket",  // 礼券icon
    };

    awardIcon_PropID2Url : { [key: number]: string; } = {
        1 : "ui://duanwu/rice",    // 粽米
        2 : "ui://duanwu/leaf",    // 粽叶
        3 : "ui://duanwu/rope",    // 粽绳
        4 : "ui://duanwu/jujube",  // 红枣
    };

    public constructor(mainView) {
        this.createView(mainView);
    }

    public createView(mainView) {
        this.mainView = mainView;

        fairygui.UIPackage.addPackage("duanwu"); //这个是key
        this.mainView.stage.addChild(fairygui.GRoot.inst.displayObject)
        this.activeView = fairygui.UIPackage.createObject("duanwu"/*这个是包名*/, "main"/*这个是组件名*/).asCom;
    }

    /**
     * 展示活动未开始的页面
     */
    public showNotStartScence() {
        this.showNotActiveScene("活动还未开始，敬请期待...")
    }

    /**
     * 展示活动已结束的页面
     */
    public showEndedScene(){
        this.showNotActiveScene("活动已经结束啦..")
    }

    /**
     * 展示未在活动中的页面
     * 活动未开始、活动已结束
     */
    public showNotActiveScene(tips:string){
        if (this.activeNotTimingView == null)
        {
            this.activeNotTimingView = fairygui.UIPackage.createObject("duanwu"/*这个是包名*/, "nottiming"/*这个是组件名*/).asCom;
        }
        if (this.activeView == null)
        {
            this.mainView.removeChild(this.activeView.displayObject);
            this.activeView = null
        }
        this.activeNotTimingView.setSize(this.mainView.stage.stageWidth,this.mainView.stage.stageHeight);
        this.activeNotTimingView.getChild("text_tip").text = tips
        console.log("this.stage.stageWidth:" + this.mainView.stage.stageWidth + "this.stage.stageHeight:" + this.mainView.stage.stageHeight);
        this.mainView.addChild(this.activeNotTimingView.displayObject);
    }

    /**
     * 展示活动中的页面
     */
    public showActiveScene(){
        if (this.activeNotTimingView != null)
        {
            this.mainView.removeChild(this.activeNotTimingView.displayObject);
            this.activeNotTimingView = null
        }
        this.activeView.setSize(this.mainView.stage.stageWidth,this.mainView.stage.stageHeight);
        console.log("this.stage.stageWidth:" + this.mainView.stage.stageWidth + "this.stage.stageHeight:" + this.mainView.stage.stageHeight);
        this.mainView.addChild(this.activeView.displayObject);
    }

    /**
     * 根据配置隐藏道具
     * 例：某任务只有一个道具，则隐藏后面3个
     * @param row 
     * @param index 
     */
    public hidePropByIndex(row:number, index:number):void{
        this.activeView.getChild("scroll").asCom.getChild("obj_item"+row).asCom.getChild("prop_"+index).asCom.visible = false;
    }

    /**
     * 设置完成任务单个道具需要的个数
     * @param row 
     * @param index 
     * @param needNum 
     */
    public setPropNeedNumByIndex(row:number, index:number, needNum:number):void{
        let objText = this.activeView.getChild("scroll").asCom.getChild("obj_item"+row).asCom.getChild("prop_"+index).asCom.getChild("txt_num")
        let re = /([0-9]+)['/']([0-9]+)/
        objText.text = objText.text.replace(re, "$1/"+needNum)
    }

    /**
     * 根据道具ID设置图片
     * @param row 
     * @param index 
     * @param propID 
     */
    public setPropIconByIndex(row:number, index:number, propID:number):void{
        let loaderIcon = this.activeView.getChild("scroll").asCom.getChild("obj_item"+row).asCom.getChild("prop_"+index).asCom.getChild("loader_icon")
        loaderIcon.url = this.awardIcon_PropID2Url[propID]
        loaderIcon.autoSize = true
    }

    /**
     * 设置可完成任务的总次数
     * @param row 
     * @param maxGainCount 
     */
    public setMaxGainCountByRow(row:number, maxGainCount:number){
        let objText = this.activeView.getChild("scroll").asCom.getChild("obj_item"+row).asCom.getChild("txt_rest")
        let re = /(.*)([0-9]+)['/']([0-9]+)/
        objText.text = objText.text.replace(re, "$1$2/" + maxGainCount)
    }

    /**
     * 设置任务奖励的icon
     * @param row 
     * @param awardType 
     */
    public setAwardIconByRow(row:number, awardType:number){
        let awardImgLoader :fairygui.GLoader = this.activeView.getChild("scroll").asCom.getChild("obj_item"+row).asCom.getChild("loader_awardImg")
        awardImgLoader.url = this.awardIcon_Type2Url[awardType]
        awardImgLoader.autoSize = true
    }

    /**
     * 设置任务奖励数量
     * @param row 
     * @param awardCount 
     */
    public setAwardCountByRow(row:number, awardCount:number){
        let objText = this.activeView.getChild("scroll").asCom.getChild("obj_item"+row).asCom.getChild("txt_num")
        objText.text = "x" + awardCount
    }

    /**
     * 设置领取任务奖励按钮的可点击状态
     * @param row 
     * @param enabled 
     */
    public setAwardAwardBtnEnableByRow(row: number, enabled:boolean){
        let btnAward = this.activeView.getChild("scroll").asCom.getChild("obj_item"+row).asCom.getChild("btn_award")
        btnAward.enabled = enabled;
    }

    /**
     * 设置道具数量
     * @param row 
     * @param index 
     * @param count 
     */
    public setPropHasNumByIndex(row : number, index:number, count: number){
        let objText = this.activeView.getChild("scroll").asCom.getChild("obj_item"+row).asCom.getChild("prop_"+index).asCom.getChild("txt_num")
        let re = /([0-9]+)['/']([0-9]+)/
        objText.text = objText.text.replace(re, count+"/$2")
        this.setPropNumColor(objText, objText.text);
    }

    /**
     * 设置道具数量文本的颜色，
     * - 拥有的大于等于需要的显示绿色，否则显示红色
     * @param text_obj 
     * @param text 
     */
    public setPropNumColor(text_obj : any, text:string){
        let re = /([0-9]+)['/']([0-9]+)/
        let m = re.exec(text)
        let nOwnNum = Number(m[1])
        let nNeedNum = Number(m[2])
        
        if (nOwnNum < nNeedNum){
            text_obj.color = 0xFF0000
        }
        else{
            text_obj.color = 0x006600
        }
    }

    /**
     * 设置剩余领取次数
     * @param row 
     * @param restCount 
     */
    public setRestAwardCount(row : number, restCount: number){
        let objText = this.activeView.getChild("scroll").asCom.getChild("obj_item"+row).asCom.getChild("txt_rest")
        let re = /.*['/']([0-9]+)/
        objText.text = objText.text.replace(re, "剩余次数：" + restCount + "/$1")
    }

    /**
     * 设置任务奖励按钮状态
     * @param row 
     * @param status 
     */
    public setAwardBtnStatus(row:number, status:number){
        let mapStatus2Enabled: { [key: number]: boolean; } = {}
        mapStatus2Enabled[BtnStatus.canAward] = true
        mapStatus2Enabled[BtnStatus.done] = false
        mapStatus2Enabled[BtnStatus.notComplete] = false

        let mapStatus2BtnTitle: {[key: number]: string} = {}
        mapStatus2BtnTitle[BtnStatus.canAward] = "兑 换"
        mapStatus2BtnTitle[BtnStatus.done] = "已完成"
        mapStatus2BtnTitle[BtnStatus.notComplete] = "未完成"

        let mapStatus2BtnShow:{[key: number]: boolean} = {}
        mapStatus2BtnShow[BtnStatus.canAward] = true
        mapStatus2BtnShow[BtnStatus.done] = false
        mapStatus2BtnShow[BtnStatus.notComplete] = true

        let btnAward = this.activeView.getChild("scroll").asCom.getChild("obj_item"+row).asCom.getChild("btn_award")
        btnAward.enabled = mapStatus2Enabled[status]
        btnAward.title = mapStatus2BtnTitle[status]
        btnAward.visible = mapStatus2BtnShow[status]
        //////////////////////////////////////////////////////////////////////////////////////

        let mapStatus2DoneImg:{[key: number]: boolean} = {}
        mapStatus2DoneImg[BtnStatus.canAward] = false
        mapStatus2DoneImg[BtnStatus.done] = true
        mapStatus2DoneImg[BtnStatus.notComplete] = false

        let doneImg = this.activeView.getChild("scroll").asCom.getChild("obj_item"+row).asCom.getChild("img_finish")
        doneImg.visible = mapStatus2DoneImg[status]
        //////////////////////////////////////////////////////////////////////////////////////

        let mapStatus2RestCount:{[key: number]: boolean} = {}
        mapStatus2RestCount[BtnStatus.canAward] = true
        mapStatus2RestCount[BtnStatus.done] = false
        mapStatus2RestCount[BtnStatus.notComplete] = true

        let restCount = this.activeView.getChild("scroll").asCom.getChild("obj_item"+row).asCom.getChild("txt_rest")
        restCount.visible = mapStatus2RestCount[status]

    }
}