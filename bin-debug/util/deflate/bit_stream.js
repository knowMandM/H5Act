var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var bit_stream = (function () {
    function bit_stream(data) {
        if (data === void 0) { data = null; }
        this.bit_pos = 0;
        this.bit_pos = 0;
        this.bit_data = new egret.ByteArray();
        if (data != null)
            this.bit_data.writeBytes(data, 0, data.length);
    }
    bit_stream.prototype.getpos = function () {
        return this.bit_pos;
    };
    bit_stream.prototype.getbits = function (count, move_pos) {
        if (move_pos === void 0) { move_pos = true; }
        var value = 0;
        for (var i = 0; i < count; i++) {
            var pos = this.bit_pos + i;
            var bit_index = pos % 8;
            var arr_index = (pos - bit_index) / 8;
            this.bit_data.position = arr_index;
            var tempValue = this.bit_data.readByte() & 0xff;
            value |= (((tempValue >>> bit_index) & 1) << i);
        }
        if (move_pos)
            this.bit_pos += count;
        return value;
    };
    return bit_stream;
}());
__reflect(bit_stream.prototype, "bit_stream");
//# sourceMappingURL=bit_stream.js.map