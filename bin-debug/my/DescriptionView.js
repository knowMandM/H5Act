var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DescriptionView = (function () {
    function DescriptionView(title, content) {
        this.title = title;
        this.content = content;
    }
    DescriptionView.prototype.show = function () {
        this.desc = fairygui.UIPackage.createObject("duanwu", "description").asCom;
        this.desc.getChild("txt_title").text = this.title;
        this.desc.getChild("txt_content").text = this.content;
        fairygui.GRoot.inst.showPopup(this.desc);
    };
    DescriptionView.prototype.destory = function () {
        fairygui.GRoot.inst.hidePopup(this.desc);
    };
    return DescriptionView;
}());
__reflect(DescriptionView.prototype, "DescriptionView");
//# sourceMappingURL=DescriptionView.js.map