interface ICipher{
		getBlockSize():number;
		encrypt(src:egret.ByteArray):void;
		decrypt(src:egret.ByteArray):void;
		dispose():void;
		toString():string;
}