/* 通讯消息 */
class ActDef{
    // 道具数量
    public static nPropNum:number = 4
    // 任务数量
    public static nTaskNum:number = 4

    // 通讯消息
    public static GR_H5ACT_QUERY_INFO  : number = 408001  // 查询道具数量，任务完成次数
    public static GR_H5ACT_AWARD_PRIZE : number = 408002  // 领奖励

    public static GR_ERROR_INFOMATION_EX : number = 60031  // 异常消息
}

/* 本地事件 */
class ActEvent{
    public static EVENT_SHOW_HALL : string = "EVENT_SHOW_HALL"
}


/* 道具种类 */
enum PropID {
    Rice = 0,  //粽米
    Leaf,      //粽叶
    Rope,      //粽绳
    Jujube     //红枣
}

/* 任务种类 */
enum TaskType{
    one = 0,
    two,
    three,
    four,
}

/* 按钮状态 */
enum BtnStatus{
    notComplete = 0, // 有完成次数，未达到任务条件
    canAward = 1,    // 有完成次数，未达到任务领取条件
    done = 2         // 完成次数已经用完
}
