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
var TestServer = (function (_super) {
    __extends(TestServer, _super);
    function TestServer() {
        var _this = _super.call(this) || this;
        _this.isConnect = false;
        _this.m_token = 0;
        _this.m_msgQueue = new Array();
        return _this;
    }
    TestServer.getInstance = function () {
        if (!TestServer._instance) {
            TestServer._singleton = false;
            TestServer._instance = new TestServer();
            TestServer._singleton = true;
        }
        return TestServer._instance;
    };
    TestServer.prototype.connectServer = function () {
        console.log("connect Test Server --->");
        this.m_buff = new egret.ByteArray();
        this.webSocket = new egret.WebSocket();
        this.webSocket.type = egret.WebSocket.TYPE_BINARY;
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.webSocket.connect(GlobalVars.ClientIp, GlobalVars.ClientPort);
        console.log("正在连接 test server ip:" + GlobalVars.ClientIp + "  port:" + GlobalVars.ClientPort);
    };
    TestServer.prototype.onSocketError = function (e) {
        console.log("server 连接出现错误!!!" + e.hashCode);
    };
    TestServer.prototype.onSocketClose = function () {
        console.log("server 关闭了!!!");
    };
    TestServer.prototype.onSocketOpen = function () {
        console.log("test server 连接成功!!!");
        SocketEvent.dispatchEvents(new SocketEvent(SocketEvent.CONNECTED_SERVER));
    };
    TestServer.prototype.OnNotifyReceived = function (msg_type, request, data, result) {
        console.log("<收到>  ->" + data + "   请求头:" + request + "   result:" + result);
        var se;
        if (msg_type == 2) {
            se = new SocketEvent(request.toString());
            se.data = { data: data, request: request, result: result, positive: true };
            SocketEvent.dispatchEvents(se);
        }
        else {
            se = new SocketEvent(request.toString());
            se.data = { data: data, request: request, result: result, positive: false };
            SocketEvent.dispatchEvents(se);
        }
    };
    TestServer.prototype.onReceiveMessage = function (e) {
        var ba = new egret.ByteArray();
        this.webSocket.readBytes(ba);
        this.m_buff.position = this.m_buff.length;
        this.m_buff.writeBytes(ba, 0, ba.length);
        this.m_buff.position = 0;
        var packet;
        while ((packet = new CPacket).FromBytes(this.m_buff)) {
            var temp = new egret.ByteArray();
            this.m_buff.readBytes(temp, 0, this.m_buff.bytesAvailable);
            this.m_buff = temp;
            console.log("packet.msg_type:" + packet.msg_type);
            if (packet.msg_type == 2) {
                if (this.m_msgQueue[0].session_id != packet.session_id) {
                    this.webSocket.close();
                    //                        var info:AlertInfo = new AlertInfo();
                    //                        info.str ="need_echo出错->。:"+packet.request+":"+this.m_msgQueue.length;
                    //                        info.type =  AlertType.ALARM
                    //                        info.state = 1
                    //                        info.applyFun = function ():void{
                    //                            this.navigateToURL(new URLRequest("javascript:location.reload();"),"_self");
                    //                        }
                    //                        var alert:AlertKnow = new AlertKnow(info);
                    //                        alert.show();
                    return;
                }
                this.OnNotifyReceived(packet.msg_type, this.m_msgQueue[0].request, packet.raw_data, packet.request);
                this.m_msgQueue.shift();
                if (this.m_msgQueue.length > 0) {
                    var temp2 = new egret.ByteArray();
                    this.m_msgQueue[0].ToBytes(temp2);
                    this.webSocket.writeBytes(temp2, 0, temp2.length);
                    this.webSocket.flush();
                }
            }
            else {
                this.OnNotifyReceived(packet.msg_type, packet.request, packet.raw_data, Global.UR_OPERATE_SUCCEEDED);
            }
        }
        // TestServer.dispatchCmd(e.data);
    };
    TestServer.prototype.sendCmd = function (cmd, data) {
        this.processRequest(cmd, data);
    };
    /**
     * 发送数据给服务端
     * @param request
     * @param data
     * @param echo_wait
     */
    TestServer.prototype.processRequest = function (request, data, echo_wait) {
        if (echo_wait === void 0) { echo_wait = 1; }
        if (!this.webSocket)
            return;
        if (!this.webSocket.connected)
            return;
        var packet = new CPacket();
        packet.request = request;
        packet.session_id = ++this.m_token;
        packet.encrypt = 0;
        packet.echo_wait = echo_wait;
        packet.compress = 0;
        packet.raw_data.writeBytes(data, 0, data.length);
        //packet.result = 0;
        if (echo_wait == 1) {
            ////            if(packet.request == 221080){
            ////                for(var i:number=0;i<this.m_msgQueue.length;i++){
            ////                    if((<CPacket><any> (this.m_msgQueue[i])).request == 221080){
            //////							LogToRemote.SaveToRemote(true,"出牌这里的队列中，已经有一条出牌记录，对抗赛... jj");
            ////                    }
            ////                }
            ////            }
            this.m_msgQueue.push(packet);
            //            if (this.m_msgQueue.length > 50){
            //                var info:AlertInfo = new AlertInfo();
            //                info.str ="need_echo出错->。:"+packet.request+":"+this.m_msgQueue.length;
            //                info.type =  AlertType.ALARM
            //                info.state = 1
            //                info.applyFun = function ():void{
            //                    //this.navigateToURL(new egret.URLRequest("javascript:location.reload();"),"_self");
            //                }
            //                var alert:AlertKnow = new AlertKnow(info);
            //                alert.show();
            //            }
            //
            if (this.m_msgQueue.length > 1)
                return;
        }
        var temp = new egret.ByteArray();
        packet.ToBytes(temp);
        console.log("Send ->" + request + "   参数 ->" + data + "  request:" + request + "  temp -->" + temp);
        this.webSocket.writeBytes(temp, 0, temp.length);
        this.webSocket.flush();
    };
    //
    //    public static removeCmdListener(request:number,listener:Function, useCapture:boolean=false, priority:number=0, useWeakReference:boolean=false):void{
    //        var cmd:string = request+"";
    //        SocketEvent.removeEventListener(cmd,listener);
    //    }
    //    public dispatchCmd(data:any):void
    //    {
    //        this._cmdDispatch.dispatchEvent(new SocketEvent(data.request,{data:data.data,request:data.request,result:data.result,positive:data.positive}));
    //    }
    /**
     * 添加命令监听
     * @param request
     * @param listener
     * @param useCapture
     * @param priority
     * @param useWeakReference
     */
    TestServer.addCmdListener = function (request, listener, useCapture, priority, useWeakReference) {
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        if (useWeakReference === void 0) { useWeakReference = false; }
        var cmd = request + "";
        BC.addEvent(TestServer._cmdDispatch, TestServer._cmdDispatch, cmd, listener, useCapture, priority, useWeakReference);
    };
    /**
     * 添加一次命令监听
     * @param request
     * @param listener
     * @param useCapture
     * @param priority
     * @param useWeakReference
     */
    TestServer.addOnceCmdListener = function (request, listener, useCapture, priority, useWeakReference) {
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        if (useWeakReference === void 0) { useWeakReference = false; }
        var cmd = request + "";
        BC.addOnceEvent(TestServer._cmdDispatch, TestServer._cmdDispatch, cmd, listener, useCapture, priority, useWeakReference);
    };
    /**
     * 移除命令监听
     * @param request
     * @param listener
     * @param useCapture
     * @param priority
     * @param useWeakReference
     */
    TestServer.removeCmdListener = function (request, listener, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        var cmd = request + "";
        BC.removeEvent(TestServer._cmdDispatch, TestServer._cmdDispatch, cmd, listener, useCapture);
    };
    TestServer.addEventListener = function (type, listener, useCapture, priority, useWeakReference) {
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        if (useWeakReference === void 0) { useWeakReference = false; }
        BC.addEvent(TestServer._dispatch, TestServer._dispatch, type, listener, useCapture, priority, useWeakReference);
    };
    TestServer.removeEventListener = function (type, listener, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        BC.removeEvent(TestServer._dispatch, TestServer._dispatch, type, listener, useCapture);
    };
    TestServer.dispatchCmd = function (data) {
        //trace(" dispatchCmd data.request:"+data.request);
        //			if(data.request == GlobalVar.BlockMsg["cmd"])
        //			{
        ////				trace("BlockMsg  request ->>>>>>>>>:"+data.request);
        ////				if(data.result == Global.UR_OPERATE_SUCCEEDED)
        ////				{
        ////
        ////				}else if (data.result == Global.UR_OPERATE_FAILED)
        ////				{
        ////
        ////				}
        //				GlobalVar.BlockMsg = {};
        //			}
        TestServer._cmdDispatch.dispatchEvent(new SocketEvent(data.request, { data: data.data, request: data.request, result: data.result, positive: data.positive }));
    };
    TestServer.prototype.close = function () {
        this.webSocket.close();
        this.isConnect = false;
    };
    TestServer.destroy = function () {
    };
    TestServer._singleton = true;
    TestServer._cmdDispatch = new egret.EventDispatcher();
    TestServer._dispatch = new egret.EventDispatcher();
    return TestServer;
}(egret.DisplayObjectContainer));
__reflect(TestServer.prototype, "TestServer");
//# sourceMappingURL=TestServer.js.map