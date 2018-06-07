/**
 * Created by seethinks@gmail.com on 2015/8/20.
 */
class FixedArray
{
    public arr:Array<any>;
    public type:string
    public constructor(type:string,len:number) {
        this.type = type;
        this.arr = new Array<any>(len);
        var ddd:any;
        var i:number;
        for(i=0;i<len;i++)
        {
            ddd = new (egret.getDefinitionByName(type));
            this.arr[i] = ddd;
        }
    }

    public getAt(index:number):any
    {
        return this.arr[index]
    }
    public setAt(index:number,value:any)
    {
        this.arr[index] = value;
    }

    public getLen():number
    {
        return this.arr.length;
    }

    public slice(p:number,len:number):any
    {
        return this.arr.slice(p,len);
    }

    public splice(p:number,len:number):void
    {
        this.arr.splice(p,len);
    }


    public indexOf(value:number):number
    {
        var t:number = -1;
        if(this.type == "int") {
            for (var i:number = 0; i < this.arr.length; i++) {
                if(value == this.arr[i].value)
                {
                    t = i;
                }
            }
        }
        return t;
    }
}