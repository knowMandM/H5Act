var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DialogUI = (function (_super) {
    __extends(DialogUI, _super);
    function DialogUI(msg) {
        var _this = _super.call(this) || this;
        _this.m_msg = msg;
        return _this;
    }
    DialogUI.prototype.onInit = function () {
        this.contentPane = fairygui.UIPackage.createObject("duanwu" /*这个是包名*/, "dialog" /*这个是组件名*/).asCom;
        this.contentPane.getChild("txt_msg").text = this.m_msg;
        this.contentPane.setXY(GlobalVars.stageWidth / 2, GlobalVars.stageHeight / 2);
        this.show();
    };
    return DialogUI;
}(fairygui.Window));
__reflect(DialogUI.prototype, "DialogUI");
//# sourceMappingURL=DialogView.js.map