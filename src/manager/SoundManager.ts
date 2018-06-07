/**
 * Created by seethinks@gmail.com on 2015/12/7.
 */
class SoundManager {
    public static playSound(soundName:string): void {
        var sound:egret.Sound = RES.getRes(soundName);
        sound.play(0,1);
    }
}