/**
 * Created by seethinks@gmail.com on 2015/5/4.
 */
class GroupUtil {

    static removeAllElement(group: eui.Group) {
        while (group.numElements > 0) {
            group.removeChildAt(0)
        }
    }
}