var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by seethinks@gmail.com on 2015/12/7.
 */
var SoundManager = (function () {
    function SoundManager() {
    }
    SoundManager.playSound = function (soundName) {
        var sound = RES.getRes(soundName);
        sound.play(0, 1);
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map