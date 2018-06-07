/**
 * Created by seethinks@gmail.com on 2015/11/20.
 */
module ST {

    export class AlignTool {

        /**
         * spr 按照 spr2 居中对其
         * @param spr
         * @param spr2
         */
        static spr_To_spr2_Center(spr:egret.DisplayObject,spr2:egret.DisplayObject):void
        {
            spr.x = (spr2.width-spr.width) * .5;
            spr.y = (spr2.height-spr.height) * .5;
        }
    }
}