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
var SQGameServer = (function (_super) {
    __extends(SQGameServer, _super);
    function SQGameServer() {
        var _this = _super.call(this) || this;
        _this.isConnect = true;
        _this.m_token = 0;
        _this.isSocketConnectFlag = false;
        _this._isSd = false; // 是否手动关闭
        _this.m_msgQueue = new Array();
        return _this;
    }
    SQGameServer.getInstance = function () {
        if (!SQGameServer._instance) {
            SQGameServer._singleton = false;
            SQGameServer._instance = new SQGameServer();
            SQGameServer._singleton = true;
        }
        return SQGameServer._instance;
    };
    SQGameServer.prototype.connectServer = function () {
        this.isSocketConnectFlag = false;
        this.m_buff = new egret.ByteArray();
        this.webSocket = new egret.WebSocket();
        this.webSocket.type = egret.WebSocket.TYPE_BINARY;
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.webSocket.connect(Global.ServerIp, Global.ServerPort);
        console.log("do connect servsdfsder ip:" + Global.ServerIp + "  port:" + Global.ServerPort);
    };
    SQGameServer.prototype.onSocketError = function (e) {
        //this.isConnect = false;
        console.log("this.isSocketConnectFlag:" + this.isSocketConnectFlag);
        //
        if (this.isSocketConnectFlag) {
            if (egret.Capabilities.os == "Android") {
                egret.ExternalInterface.call("doAndroidReLoadGame", "");
            }
            else {
                egret.ExternalInterface.call("doIOSSocketError", "");
            }
        }
        console.log("server onSocketError!!!" + e.hashCode);
    };
    SQGameServer.prototype.onSocketClose = function () {
        console.log("server onSocketClose!!!:" + this._isSd);
        this.isSocketConnectFlag = false;
        if (this._isSd) {
            this._isSd = false;
            console.log("  this._isSd = false;-------------------------------------");
            return;
        }
        this.destroy();
        //this.isConnect = false;
        var alert = new ST.AlertKnow(ST.AlertKnow.BTN_YES);
        alert.show("亲，服务器mm不高兴了，请点击重连安慰一下她吧，木啊！", function () {
            alert.hide();
            if (Global.IsBrowser) {
                document.location.reload();
            }
            else {
                if (egret.Capabilities.os == "Android")
                    egret.ExternalInterface.call("doAndroidReLoadGame", "");
                else
                    egret.ExternalInterface.call("doIOSExitGame", "");
            }
        });
    };
    SQGameServer.prototype.onSocketOpen = function () {
        console.log("server 连接成功!!!");
        SocketEvent.dispatchEvents(new SocketEvent(SocketEvent.CONNECTED_SERVER));
        this.isConnect = true;
        this.isSocketConnectFlag = true;
        //** 加心跳timer
        if (this._t == null) {
            this._t = new egret.Timer(120 * 1000);
            this._t.addEventListener(egret.TimerEvent.TIMER, this.heart, this);
            this._t.start();
        }
    };
    SQGameServer.prototype.heart = function (e) {
        this.processRequest(500005, new egret.ByteArray, 0);
    };
    SQGameServer.prototype.OnNotifyReceived = function (msg_type, request, data, result, requestData) {
        var se;
        if (msg_type == 2) {
            requestData.position = 0;
            requestData.endian = egret.Endian.LITTLE_ENDIAN;
            console.log("<------dui lie shou dao>  ->" + data + "   qing qiu tou:" + request + "   result:" + result);
            se = new SocketEvent(request.toString());
            se.data = { data: data, request: request, result: result, positive: true, requestData: requestData };
            SocketEvent.dispatchEvents(se);
        }
        else {
            console.log(" tong zhi shou dao  ->" + data + "   qing qiu tou:" + request + "   result:" + result);
            se = new SocketEvent(request.toString());
            se.data = { data: data, request: request, result: result, positive: false, requestData: requestData };
            SocketEvent.dispatchEvents(se);
        }
    };
    SQGameServer.prototype.onReceiveMessage = function (e) {
        var ba = new egret.ByteArray();
        this.webSocket.readBytes(ba);
        this.m_buff.position = this.m_buff.length;
        this.m_buff.writeBytes(ba, 0, ba.length);
        this.m_buff.position = 0;
        //console.log("rrrrr:",ba)
        var packet;
        while ((packet = new CPacket).FromBytes(this.m_buff)) {
            var temp = new egret.ByteArray();
            this.m_buff.readBytes(temp, 0, this.m_buff.bytesAvailable);
            this.m_buff = temp;
            //console.log("packet.msg_type:",packet.msg_type)
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
                //                for (var str in packet)
                //                {
                //                    console.log(" ppppppppppppppp str:"+str+"    ----:"+packet[str])
                //                }
                this.OnNotifyReceived(packet.msg_type, this.m_msgQueue[0].request, packet.raw_data, packet.request, this.m_msgQueue[0].raw_data);
                this.m_msgQueue.shift();
                //console.log("this.m_msgQueue.length:"+this.m_msgQueue.length)
                if (this.m_msgQueue.length > 0) {
                    var temp2 = new egret.ByteArray();
                    this.m_msgQueue[0].ToBytes(temp2);
                    this.webSocket.writeBytes(temp2, 0, temp2.length);
                    this.webSocket.flush();
                }
            }
            else {
                this.OnNotifyReceived(packet.msg_type, packet.request, packet.raw_data, Global.UR_OPERATE_SUCCEEDED, null);
            }
        }
    };
    SQGameServer.prototype.sendRequest = function (reqID, data) {
        var sendData = new egret.ByteArray();
        CSerializable.Serialization(data, sendData);
        this.sendCmd(reqID, sendData, 0);
    };
    SQGameServer.prototype.sendCmd = function (cmd, data, echo_wait) {
        if (echo_wait === void 0) { echo_wait = 1; }
        this.processRequest(cmd, data, echo_wait);
    };
    /**
     * 发送数据给服务端
     * @param request
     * @param data
     * @param echo_wait
     */
    SQGameServer.prototype.processRequest = function (request, data, echo_wait) {
        if (echo_wait === void 0) { echo_wait = 1; }
        //console.log("this.webSocket:"+this.webSocket+"  this.webSocket.connected:"+this.webSocket.connected)
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
            console.log("this.m_msgQueue.length:" + this.m_msgQueue.length);
            if (this.m_msgQueue.length > 1)
                return;
        }
        var temp = new egret.ByteArray();
        packet.ToBytes(temp);
        console.log("Send ->" + request + "   can shu ->" + data + "  request:" + request + "  temp -->" + temp);
        this.webSocket.writeBytes(temp, 0, temp.length);
        this.webSocket.flush();
    };
    SQGameServer.prototype.destroy = function (isSd) {
        // this._isSd = isSd;
        if (isSd === void 0) { isSd = false; }
        if (this.webSocket != null) {
            this.webSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.webSocket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.webSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.webSocket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.webSocket.close();
            this.webSocket = null;
        }
        if (this._t != null) {
            this._t.stop();
            this._t.removeEventListener(egret.TimerEvent.TIMER, this.heart, this);
            this._t = null;
        }
    };
    SQGameServer._singleton = true;
    return SQGameServer;
}(egret.DisplayObjectContainer));
__reflect(SQGameServer.prototype, "SQGameServer");
//# sourceMappingURL=SQGameServer.js.map