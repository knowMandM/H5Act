/**
 * Created by seethinks@gmail.com on 2015/8/10.
 */
class HashMap<K, V>{
    public size: number;
    private keys: Array<K>;
    private values: Array<V>;
    constructor() {
        this.keys = new Array<K>();
        this.values = new Array<V>();
    }

    public clear(): void {
        while (this.keys.length > 0) {
            this.keys.pop();
        }
        while (this.values.length > 0) {
            this.values.pop();
        }
        this.updateSize();
    }

    public delete(key: K): boolean {
        var result: boolean = false;
        var index = this.keys.indexOf(key);
        if (index != -1) {
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
            this.updateSize();
            result = true;
        }
        return result;
    }

    public forEach(): void {

    }

    public get(key: K): V {
        var result: V = null;
        var index = this.keys.indexOf(key);
        if (index != -1) {
            result = this.values[index];
        }
        return result;
    }

    public has(key: K): boolean {
        var index = this.keys.indexOf(key);
        return index != -1;
    }

    public set(key: K, value: V):void {
        this.keys.push(key);
        this.values.push(value);
        this.updateSize();

    }

    private updateSize(): void {
        this.size = this.keys.length;
    }

}
