class ReqManager
{
    private static  _singleton:boolean=true;
    private static  _instance:ReqManager;

    public static stage: egret.Stage;

    public constructor()
    {

    }

    public static getInstance():ReqManager{
        if (!ReqManager._instance) {
            ReqManager._singleton=false;
            ReqManager._instance=new ReqManager();
            ReqManager._singleton=true;
        }
        return ReqManager._instance;
    }

    public setUp(): void {

        SocketEvent.addEventListener(SocketEvent.CONNECTED_SERVER, this.connectServerSuccess, this);
        SQGameServer.getInstance().connectServer();

        //----------------------------
        //按钮事件
        MyEvent.addEventListener(MyEvent.GETREWARD1, this.getReward1, this);
        MyEvent.addEventListener(MyEvent.GETREWARD2, this.getReward2, this);
        MyEvent.addEventListener(MyEvent.GETFINALREWARD, this.getFinalReward, this);
    }

    public destroy(): void {
        
    }


    //calls
    private connectServerSuccess(e: SystemEvent = null): void {
        //LoadingManager.showLoading();
        console.log("connectServerSuccess")
        SocketEvent.removeEventListener(SocketEvent.CONNECTED_SERVER, this.connectServerSuccess, this);

        //请求任务数据
        ActivityModel.getInstance().reqTaskData();
    }

    private getActConfigSuccess(e: SocketEvent): void {
        //LoadingManager.hideLoading();
        if (!e.data.data) return;
        var b: egret.ByteArray = e.data.data;
        console.log(e.data);
        console.log("e.data.result = " + e.data.result);
        
        if (e.data.result == Global.REQ_ACT_CONFIG) {
         } else {
            this.checkResultMessage(e.data.request, e.data.result);
        }
    }

    private getUserDataSuccess(e: SocketEvent): void {
        //LoadingManager.hideLoading();
        if (!e.data.data) return;
        var b: egret.ByteArray = e.data.data;
        console.log(e.data);
        console.log("e.data.result = " + e.data.result);
        
        if (e.data.result == Global.REQ_USER_DATA) {
            this.initScene();
        } else {
            this.checkResultMessage(e.data.request, e.data.result);
        }
    }

    private getRewardRet(e: SocketEvent): void {
        //LoadingManager.hideLoading();
        if (!e.data.data) return;
        var b: egret.ByteArray = e.data.data;
        console.log(e.data);
        console.log("e.data.result = " + e.data.result);
        
        //日常奖励 / 累计奖励
        if (e.data.result == Global.REQ_USER_REWARD || e.data.result == Global.REQ_FINAL_REWARD) {

        } 
        else {
            this.checkResultMessage(e.data.request, e.data.result);
        }
    }


    /** error msg function **/
    public checkResultMessage(msgHead: number, value: number, msg: string = "", b: egret.ByteArray = null): void {
        var str: string = "";
        console.log("msgHead:", msgHead, "value:", value);
        switch (value) {
            case Global.UR_OPERATE_FAILED:
                str = msg != "" ? msg : "出现常规错误 消息号:" + msgHead
                break;

            default:
                console.log(str = "出现错误,ID:" + msgHead);
                break;
        }
    }

    public initScene()
    {
        MyEvent.dispatchEvents(new MyEvent(MyEvent.INITSCENE));
    }

    public refreshRewardRet1()
    {
        MyEvent.dispatchEvents(new MyEvent(MyEvent.REFRESHREWARDRET1))
    }

    public refreshRewardRet2()
    {
        MyEvent.dispatchEvents(new MyEvent(MyEvent.REFRESHREWARDRET2))
    }

    public refreshFinalRet()
    {
        MyEvent.dispatchEvents(new MyEvent(MyEvent.REFRESHFINAL))
    }

    //领取奖励1
    public getReward1()
    {

    }

    //领取奖励2
    public getReward2()
    {
    }

    public getFinalReward()
    {
    }
}