var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var huffman_tree = (function () {
    function huffman_tree() {
        this.min_length = 0;
        this.max_length = 0;
    }
    return huffman_tree;
}());
__reflect(huffman_tree.prototype, "huffman_tree");
//# sourceMappingURL=huffman_tree.js.map