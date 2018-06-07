class ReqTaskInfo{
    public nUserID : int = new int();
    public nActID : int = new int();

    constructor(nUserID:number, nActID:number)
    {
        this.nUserID.value = nUserID
        this.nActID.value = nActID
    }
}

class PropsCountInfo{
    public nPropID : int = new int();
    public nRestCount : int = new int();

    constructor(nPropID:number, nRestCount:number)
    {
        this.nPropID.value = nPropID
        this.nRestCount.value = nRestCount
    }
}

class TaskGainedInfo{
    public nTaskID : int = new int();
    public nGainedCount : int = new int();

    constructor(taskID:number, nGaindCount:number)
    {
        this.nTaskID.value = taskID
        this.nGainedCount.value = nGaindCount
    }
}

class ReqTaskInfoRet{
    public nPropCount:int = new int();
    public nTaskCount:int = new int();
    public nDateTime:int = new int();
    // 端午道具数量
    public arrPropCount: FixedArray = new FixedArray("PropsCountInfo",ActDef.nPropNum);
    // 端午任务完成数量
    public arrGainedCount:FixedArray = new FixedArray("TaskGainedInfo", ActDef.nTaskNum);
}

class ReqAwardPrize{
    public nUserID : int = new int();
    public nTaskID : int = new int();
    public nActID : int = new int();
    public nFinishCount : int = new int();

    constructor(nUserID:number, nTaskID:number, nActID:number, nFinishCount:number)
    {
        this.nUserID.value = nUserID
        this.nTaskID.value = nTaskID
        this.nActID.value = nActID
        this.nFinishCount.value = nFinishCount
    }
}

class ERR_INFO_EGRET
{
	public errMsg : string = ""
}

class ReqAwardPrizeRet
{
    bResult : int = new int();
    nAwardType : int = new int();
    nAwardCount : int = new int();

    nUserID : int = new int();
    nTaskID : int = new int();
    nActID : int = new int();
    nFinishCount : int = new int();
    strWebID : string;
}
