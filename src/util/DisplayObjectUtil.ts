/**
 * Created by seethinks@gmail.com on 2015/5/4.
 */
class DisplayObjectUtil  {

    static  removeAllChild(dis:any)
    {
        while (dis.numChildren > 0)
        {
            dis.removeChildAt(0)
        }
    }

    static  removeForParent(dis:any)
    {
        if(dis.parent) dis.parent.removeChild(dis);
    }

    static createTextFile():egret.TextField
    {
        var txt:egret.TextField = new egret.TextField();
        txt.size = 24;
        return txt;
    }
}