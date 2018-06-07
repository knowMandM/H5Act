class Global{
    public static APP_NAME: string = "hnhb";
    public static VER_MAJOR: number = 1;
    public static VER_MINOR: number = 0;
    public static VER_BUILDNO: number = 20140603;
    public static GAME_ID: number = 470;

    public static ServerIp: string = "192.168.10.29"  //"120.24.102.9"; h5assistmpsvr's ip
    public static ServerPort: number = 1852      //60674;

    public static IsBrowser: boolean = false;

    // result define
    public static UR_REQ_BASE: number = 0;
    public static UR_OPERATE_SUCCEEDED: number = Global.UR_REQ_BASE + 10;
    public static UR_OPERATE_FAILED: number = Global.UR_REQ_BASE + 10100;

    //REQ
    public static REQ_BASE: number = 400000;
    public static REQ_ACT_CONFIG: number = Global.REQ_BASE + 7001;
    public static REQ_USER_DATA: number = Global.REQ_BASE + 7002;
    public static REQ_USER_REWARD: number = Global.REQ_BASE + 7004;
    public static REQ_FINAL_REWARD: number = Global.REQ_BASE + 7006;
}