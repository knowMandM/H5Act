var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/* 通讯消息 */
var ActDef = (function () {
    function ActDef() {
    }
    // 道具数量
    ActDef.nPropNum = 4;
    // 任务数量
    ActDef.nTaskNum = 4;
    // 通讯消息
    ActDef.GR_H5ACT_QUERY_INFO = 408001; // 查询道具数量，任务完成次数
    ActDef.GR_H5ACT_AWARD_PRIZE = 408002; // 领奖励
    ActDef.GR_ERROR_INFOMATION_EX = 60031; // 异常消息
    return ActDef;
}());
__reflect(ActDef.prototype, "ActDef");
/* 本地事件 */
var ActEvent = (function () {
    function ActEvent() {
    }
    ActEvent.EVENT_SHOW_HALL = "EVENT_SHOW_HALL";
    return ActEvent;
}());
__reflect(ActEvent.prototype, "ActEvent");
/* 道具种类 */
var PropID;
(function (PropID) {
    PropID[PropID["Rice"] = 0] = "Rice";
    PropID[PropID["Leaf"] = 1] = "Leaf";
    PropID[PropID["Rope"] = 2] = "Rope";
    PropID[PropID["Jujube"] = 3] = "Jujube"; //红枣
})(PropID || (PropID = {}));
/* 任务种类 */
var TaskType;
(function (TaskType) {
    TaskType[TaskType["one"] = 0] = "one";
    TaskType[TaskType["two"] = 1] = "two";
    TaskType[TaskType["three"] = 2] = "three";
    TaskType[TaskType["four"] = 3] = "four";
})(TaskType || (TaskType = {}));
/* 按钮状态 */
var BtnStatus;
(function (BtnStatus) {
    BtnStatus[BtnStatus["notComplete"] = 0] = "notComplete";
    BtnStatus[BtnStatus["canAward"] = 1] = "canAward";
    BtnStatus[BtnStatus["done"] = 2] = "done"; // 完成次数已经用完
})(BtnStatus || (BtnStatus = {}));
//# sourceMappingURL=ActivityDefine.js.map