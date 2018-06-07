class DialogUI extends fairygui.Window{
    m_msg : string
    constructor(msg : string){
        super()
        this.m_msg = msg
    }

    onInit()
    {
        this.contentPane = fairygui.UIPackage.createObject("duanwu"/*这个是包名*/, "dialog"/*这个是组件名*/).asCom;
        this.contentPane.getChild("txt_msg").text = this.m_msg
        this.contentPane.setXY(GlobalVars.stageWidth / 2, GlobalVars.stageHeight / 2)

        this.show()
    }
}