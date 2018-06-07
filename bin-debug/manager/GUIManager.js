var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by seethinks@gmail.com on 15/3/15.
 */
var GUIManager = (function () {
    function GUIManager() {
    }
    GUIManager.getInstance = function () {
        if (!GUIManager._instance) {
            GUIManager._singleton = false;
            GUIManager._instance = new GUIManager();
            GUIManager._singleton = true;
        }
        return GUIManager._instance;
    };
    GUIManager._singleton = true;
    return GUIManager;
}());
__reflect(GUIManager.prototype, "GUIManager");
//# sourceMappingURL=GUIManager.js.map