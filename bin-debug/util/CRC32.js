var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CRC32 = (function () {
    function CRC32() {
        /** The crc data checksum so far. */
        this.crc = 0;
    }
    /** Make the table for a fast CRC. */
    CRC32.makeCrcTable = function () {
        var crcTable = new Array(256);
        for (var n = 0; n < 256; n++) {
            var c = n;
            for (var k = 8; --k >= 0;) {
                if ((c & 1) != 0)
                    c = 3988292384 ^ (c >>> 1);
                else
                    c = c >>> 1;
            }
            crcTable[n] = c;
        }
        return crcTable;
    };
    /**
     * Returns the CRC32 data checksum computed so far.
     */
    CRC32.prototype.getValue = function () {
        return this.crc & 4294967295;
        // return this.crc & 0xffffffff;
    };
    /**
     * Resets the CRC32 data checksum as if no update was ever called.
     */
    CRC32.prototype.reset = function () {
        this.crc = 0;
    };
    /**
     * Adds the complete byte array to the data checksum.
     *
     * @param buf the buffer which contains the data
     */
    CRC32.prototype.update = function (buf) {
        var off = 0;
        var len = buf.length;
        var c = ~this.crc;
        // while(--len >= 0) c = CRC32.crcTable[(c ^ buf[off++]) & 0xff] ^ (c >>> 8);
        //while(--len >= 0) c = CRC32.crcTable[(c ^ buf[off++]) & 255] ^ (c >>> 8);
        buf.position = 0;
        for (var i = 0; i < buf.length; i++) {
            c = CRC32.crcTable[(c ^ +buf.readByte()) & 255] ^ (c >>> 8);
        }
        this.crc = ~c;
    };
    /** The fast CRC table. Computed once when the CRC32 class is loaded. */
    CRC32.crcTable = CRC32.makeCrcTable();
    return CRC32;
}());
__reflect(CRC32.prototype, "CRC32");
//# sourceMappingURL=CRC32.js.map