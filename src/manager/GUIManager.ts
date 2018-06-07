/**
 * Created by seethinks@gmail.com on 15/3/15.
 */
class GUIManager
{
    private static  _singleton:boolean=true;
    private static  _instance:GUIManager;

    private static _titleScreen:egret.DisplayObjectContainer;
    private _endScreen:egret.DisplayObjectContainer;

    public txtTimer:egret.TextField;
    public txtSavedCount:egret.TextField;

    public constructor()
    {

    }

    public static getInstance():GUIManager{
        if (!GUIManager._instance) {
            GUIManager._singleton=false;
            GUIManager._instance=new GUIManager();
            GUIManager._singleton=true;
        }
        return GUIManager._instance;
    }



}