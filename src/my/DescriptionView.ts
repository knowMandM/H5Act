class DescriptionView
{
    title   : string
    content : string
    desc : fairygui.GComponent
    constructor(title, content)
    {
        this.title = title
        this.content = content
        
    }

    show(){
        this.desc = fairygui.UIPackage.createObject("duanwu", "description").asCom
        this.desc.getChild("txt_title").text = this.title
        this.desc.getChild("txt_content").text = this.content
        fairygui.GRoot.inst.showPopup(this.desc);
    }

    destory(){
        fairygui.GRoot.inst.hidePopup(this.desc)
    }
}