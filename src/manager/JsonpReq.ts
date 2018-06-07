class JsonpReq {
    private static _regID: number = 0;
    public static completeCall: any = {};
    public static process($loader: egret.URLLoader): void {

        JsonpReq.completeCall["call_" + JsonpReq._regID] = (data) => {
            var id = JsonpReq._regID;
            $loader.data = data;
            $loader.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
            //  delete JsonpReq.completeCall["call_" + id];
        };
        JsonpReq.startLoader($loader, JsonpReq._regID);
        JsonpReq._regID++;
    }
    private static startLoader(loader: egret.URLLoader, id: number): void {
        var script = document.createElement('script');
        script.src = loader._request.url + "JsonpReq.completeCall.call_" + id + "";  // "JsonpReq.completeCall.call_" + id +"";
        document.body.appendChild(script);
    }
}