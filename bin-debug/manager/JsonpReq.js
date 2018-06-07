var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var JsonpReq = (function () {
    function JsonpReq() {
    }
    JsonpReq.process = function ($loader) {
        JsonpReq.completeCall["call_" + JsonpReq._regID] = function (data) {
            var id = JsonpReq._regID;
            $loader.data = data;
            $loader.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
            //  delete JsonpReq.completeCall["call_" + id];
        };
        JsonpReq.startLoader($loader, JsonpReq._regID);
        JsonpReq._regID++;
    };
    JsonpReq.startLoader = function (loader, id) {
        var script = document.createElement('script');
        script.src = loader._request.url + "JsonpReq.completeCall.call_" + id + ""; // "JsonpReq.completeCall.call_" + id +"";
        document.body.appendChild(script);
    };
    JsonpReq._regID = 0;
    JsonpReq.completeCall = {};
    return JsonpReq;
}());
__reflect(JsonpReq.prototype, "JsonpReq");
//# sourceMappingURL=JsonpReq.js.map