var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ST;
(function (ST) {
    var RadioGroup = (function (_super) {
        __extends(RadioGroup, _super);
        function RadioGroup() {
            var _this = _super.call(this) || this;
            _this._radioList = new Array();
            _this._curRadio = null;
            return _this;
        }
        /**
         * 返回radio群组
         * @param	...radio
         * @return
         */
        RadioGroup.groupRadios = function () {
            var radios = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                radios[_i] = arguments[_i];
            }
            var g = new RadioGroup();
            var length1 = radios.length;
            for (var i1 = 0; i1 < length1; i1++) {
                var i = radios[i1];
                g.appendRadio(i);
            }
            return g;
        };
        /**
         * 添加radio进群组
         * @param	r
         */
        RadioGroup.prototype.appendRadio = function (r) {
            if (r == null) {
                return;
            }
            r.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.setSelectedHandler, this);
            this._radioList.push(r);
        };
        /**
         * 监听raido选择事件
         * @param	e
         */
        RadioGroup.prototype.setSelectedHandler = function (e) {
            for (var i = 0; i < this._radioList.length; i++) {
                this._radioList[i].setSelect(false);
            }
            console.log("this._radioList:" + this._radioList.length);
            this._curRadio = (e.currentTarget);
            this._curRadio.setSelect(true);
            var sue = new ST.GuiEvent(ST.GuiEvent.STRADIOGROUP_RADIO_SELECTEDINDEX);
            sue.data = { selectIndex: this._radioList.indexOf(this._curRadio) };
            this.dispatchEvent(sue);
        };
        /**
         * 删除radio
         * @param	r
         */
        RadioGroup.prototype.removeRadio = function (r) {
            var index = this._radioList.indexOf(r);
            if (index != -1) {
                this._radioList.splice(index, 1);
            }
        };
        /**
         * 返回radio数量
         * @return
         */
        RadioGroup.prototype.RadioNum = function () {
            return this._radioList.length;
        };
        RadioGroup.prototype.getCurSelectedIndex = function () {
            var index = -1;
            for (var i = 0; i < this._radioList.length; i++) {
                if (this._radioList[i]._isSelect) {
                    index = i;
                    return index;
                }
            }
            return index;
        };
        RadioGroup.prototype.getCurSelectedValue = function () {
            var index = -1;
            for (var i = 0; i < this._radioList.length; i++) {
                if (this._radioList[i]._isSelect) {
                    index = i;
                    break;
                    //return index;
                }
            }
            if (index != -1)
                return this._radioList[i].getValue();
            return "";
        };
        /**
         * 释放
         */
        RadioGroup.prototype.destory = function () {
            for (var i = 0; i < this._radioList.length; i++) {
                this._radioList[i].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.setSelectedHandler, this);
            }
            this._radioList.length = 0;
            this._radioList = null;
            if (this._curRadio)
                this._curRadio = null;
        };
        return RadioGroup;
    }(egret.EventDispatcher));
    ST.RadioGroup = RadioGroup;
    __reflect(RadioGroup.prototype, "ST.RadioGroup");
})(ST || (ST = {}));
//# sourceMappingURL=RadioGroup.js.map