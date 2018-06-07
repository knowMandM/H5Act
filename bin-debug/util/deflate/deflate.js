var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var deflate = (function () {
    function deflate() {
        this.len_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        this.lc = new huffman_tree();
        this.lc.codes_decode = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0, 0];
        this.lc.codes_length = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0];
        this.dc = new huffman_tree();
        this.dc.codes_decode = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 32769, 49153];
        this.dc.codes_length = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14];
        //    OutPos = 0
        this.create_static_tree();
    }
    deflate.prototype.create_static_tree = function () {
        var lengths = new Array(288);
        this.initArrayByNumber(lengths, 0);
        for (var i = 0; i < 144; i++)
            lengths[i] = 8;
        for (var i = 144; i < 256; i++)
            lengths[i] = 9;
        for (var i = 256; i < 280; i++)
            lengths[i] = 7;
        for (var i = 280; i < 288; i++)
            lengths[i] = 8;
        this.static__ltree = new huffman_tree();
        this.create_codes(this.static__ltree, lengths, 288);
        for (var i = 0; i < 32; i++)
            lengths[i] = 5;
        this.static__dtree = new huffman_tree();
        this.create_codes(this.static__dtree, lengths, 32);
    };
    deflate.prototype.create_codes = function (tree, lengths, codes_count) {
        if (codes_count === void 0) { codes_count = 0; }
        tree.min_length = 16;
        tree.max_length = 0;
        var bl_count = new Array(17);
        this.initArrayByNumber(bl_count, 0);
        for (var i = 0; i < codes_count; i++) {
            bl_count[lengths[i]]++;
            if (lengths[i] > tree.max_length)
                tree.max_length = lengths[i];
            if (lengths[i] < tree.min_length && lengths[i] > 0)
                tree.min_length = lengths[i];
        }
        {
            var ln = 1;
            for (var i = 1; i <= tree.max_length; i++) {
                ln = ln * 2 - bl_count[i];
                if (ln < 0)
                    throw new Error();
            }
            if (ln)
                throw new Error();
        }
        tree.codes_length = new Array(1 << tree.max_length);
        this.initArrayByNumber(tree.codes_length, 0);
        tree.codes_decode = new Array(1 << tree.max_length);
        this.initArrayByNumber(tree.codes_decode, 0);
        var next_code = new Array(17);
        this.initArrayByNumber(next_code, 0);
        {
            var code = 0;
            for (var i = 1; i <= tree.max_length; i++) {
                code = (code + bl_count[i - 1]) * 2;
                next_code[i] = code;
            }
        }
        for (var i = 0; i < codes_count; i++) {
            var ln = lengths[i];
            if (ln != 0) {
                var code = deflate.bit_reverse(next_code[ln], ln);
                tree.codes_length[code] = ln;
                tree.codes_decode[code] = i;
                next_code[ln]++;
            }
        }
    };
    deflate.bit_reverse = function (value, bits_count) {
        if (bits_count === void 0) { bits_count = 0; }
        var ret = 0;
        while (bits_count > 0) {
            ret = ((ret << 1) | (value & 1));
            bits_count--;
            value >>>= 1;
        }
        return ret;
    };
    deflate.prototype.initArrayByNumber = function (arr, value) {
        var i = 0;
        for (i = 0; i < arr.length; i++) {
            arr[i] = value;
        }
    };
    deflate.prototype.uncompress = function (data, zip64) {
        if (zip64 === void 0) { zip64 = false; }
        if (data.length == 0)
            return;
        this.istream = new bit_stream(data);
        this.ostream = new egret.ByteArray();
        //=============================================================================
        //compression extreme: 78DA
        //compression standard:789C
        //compression faible:  785E
        switch (this.istream.getbits(16)) {
            case 0xDA78:
            case 0x9C78:
            case 0x5E78:
                break;
            default: throw new Error();
        }
        //=============================================================================
        for (var is_last_block = 0; !is_last_block;) {
            is_last_block = this.istream.getbits(1);
            switch (this.istream.getbits(2)) {
                case 0:
                    this.istream.getbits((8 - this.istream.getpos() % 8) % 8);
                    var length = this.istream.getbits(16);
                    var not_length = this.istream.getbits(16);
                    if ((length ^ ~not_length) & 0xFFFF)
                        throw new Error();
                    for (var i = 0; i < length; i++)
                        this.ostream.writeByte(this.istream.getbits(8));
                    break;
                case 1:
                    this.uncompress_block(this.static__ltree, this.static__dtree, zip64);
                    break;
                case 2:
                    this.create_dynamic_tree();
                    this.uncompress_block(this.dynamic_ltree, this.dynamic_dtree, zip64);
                    break;
                case 3:
                    throw new Error();
            }
        }
        data.clear();
        data.writeBytes(this.ostream, 0, this.ostream.length);
    };
    deflate.prototype.create_dynamic_tree = function () {
        var len_count = this.istream.getbits(5) + 257;
        var dist_count = this.istream.getbits(5) + 1;
        var codes_count = this.istream.getbits(4) + 4;
        var length = new Array(19);
        this.initArrayByNumber(length, 0);
        for (var i = 0; i < codes_count; i++)
            length[this.len_order[i]] = this.istream.getbits(3);
        for (var i = codes_count; i < 19; i++)
            length[this.len_order[i]] = 0;
        this.bl_tree = new huffman_tree();
        this.create_codes(this.bl_tree, length, 19);
        length = new Array(len_count + dist_count);
        this.initArrayByNumber(length, 0);
        for (var pos = 0; pos < len_count + dist_count;) {
            var nu_bits = this.bl_tree.min_length;
            while (this.bl_tree.codes_length[this.istream.getbits(nu_bits, false)] != nu_bits)
                nu_bits++;
            var copy = this.bl_tree.codes_decode[this.istream.getbits(nu_bits)];
            if (copy < 16) {
                length[pos] = copy;
                pos++;
            }
            else {
                var ln = 0;
                switch (copy) {
                    case 16:
                        //=============================================================================
                        if (pos == 0)
                            throw new Error();
                        //=============================================================================
                        copy = 3 + this.istream.getbits(2);
                        ln = length[pos - 1];
                        break;
                    case 17:
                        copy = 3 + this.istream.getbits(3);
                        break;
                    default:
                        copy = 11 + this.istream.getbits(7);
                        break;
                }
                //=============================================================================
                if (pos + copy > len_count + dist_count)
                    throw new Error();
                //=============================================================================
                for (; copy > 0; copy--) {
                    length[pos] = ln;
                    pos++;
                }
            }
        }
        this.dynamic_ltree = new huffman_tree();
        this.create_codes(this.dynamic_ltree, length, len_count);
        for (var i = 0; i < dist_count; i++)
            length[i] = length[i + len_count];
        this.dynamic_dtree = new huffman_tree();
        this.create_codes(this.dynamic_dtree, length, dist_count);
    };
    deflate.prototype.uncompress_block = function (ltree, dtree, zip64) {
        while (true) {
            var nu_bits = ltree.min_length;
            while (ltree.codes_length[this.istream.getbits(nu_bits, false)] != nu_bits)
                nu_bits++;
            var value = ltree.codes_decode[this.istream.getbits(nu_bits)];
            if (value == 256) {
                break;
            }
            else if (value < 256) {
                this.ostream.writeByte(value);
            }
            else {
                value -= 257;
                var length = this.lc.codes_decode[value] + this.istream.getbits(this.lc.codes_length[value]);
                if (length == 258 && zip64)
                    length = this.istream.getbits(16) + 3;
                nu_bits = dtree.min_length;
                while (dtree.codes_length[this.istream.getbits(nu_bits, false)] != nu_bits)
                    nu_bits++;
                value = dtree.codes_decode[this.istream.getbits(nu_bits)];
                var distance = this.dc.codes_decode[value] + this.istream.getbits(this.dc.codes_length[value]);
                for (var i = 0; i < length; i++) {
                    var ostreamP = this.ostream.position;
                    this.ostream.position = ostreamP - distance;
                    var tempN = this.ostream.readByte() & 0xff;
                    this.ostream.position = ostreamP;
                    this.ostream.writeByte(tempN);
                    //this.ostream.writeByte(this.ostream[this.ostream.position - distance]);
                }
            }
        }
    };
    return deflate;
}());
__reflect(deflate.prototype, "deflate");
//# sourceMappingURL=deflate.js.map