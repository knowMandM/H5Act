var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by seethinks@gmail.com on 2015/8/10.
 */
var URLDefine = (function () {
    function URLDefine() {
    }
    URLDefine.LogInByWeb = "/Main/LogIn"; //��¼
    URLDefine.ValidSign = "/Main/ValidSign"; //��֤Ʊ��
    URLDefine.ClientRegister = "/Main/ClientRegister"; //һ��ע��
    URLDefine.GetAllRoom = "/Main/GetAllRoom"; //��ȡ����ֱ����
    //�Ƿ����ӿ�
    URLDefine.GetMatchList = "/StatScore/GetMatchList"; //��������
    URLDefine.GetMatchInfo = "/StatScore/GetMatchInfo"; //��ȡ��������
    URLDefine.AddMatch = "/StatScore/AddMatch"; //�������
    URLDefine.CreateMultiBout = "/StatScore/CreateMultiBout"; //��������
    URLDefine.GetMultiBout = "/StatScore/GetMultiBout"; //��ȡ��������
    URLDefine.GetMultiBoutList = "/StatScore/GetMultiBoutList"; //��ȡ�����б�
    URLDefine.UpdateMultiboutStatus = "/StatScore/UpdateMultiboutStatus"; //�޸ĳ���״̬
    URLDefine.GetBoutList = "/StatScore/GetBoutList"; //��ȡ���λ����Ϣ
    URLDefine.AddScore = "/StatScore/AddScore"; //��ӼǷ����ȷ�
    URLDefine.UpdateNickName = "/main/UpdateNickNameM"; //��ӼǷ����ȷ
    URLDefine.HeartBeat = "/main/HeartBeat";
    URLDefine.GetVedioList = "/main/GetVedioList"; // GetVedioList(int top)
    URLDefine.SendRegSms = "/main/SendRegSms"; // SendRegSms(string mobile)
    URLDefine.GetUserFace = "/main/GetUserFace"; // GetUserFace(int userID)
    URLDefine.RegisterByPhoneNo = "/main/RegisterByPhoneNo"; // SendRegSms(string mobile)
    URLDefine.LogInByPhoneNo = "/main/LogInByPhoneNo"; //LogInByPhoneNo(string mobile, string pwd)
    URLDefine.ExChangeTeleFee = "/main/ExChangeTeleFee"; //LogInByPhoneNo(string mobile, string pwd)
    URLDefine.GetGameRecordList = "/main/GetGameRecordList"; //main/GetGameRecordList(int multiID)   主域
    URLDefine.GetMultiListBySign = "/main/GetMultiListBySign"; //main/GetMultiListBySign(string sign)   主域
    return URLDefine;
}());
__reflect(URLDefine.prototype, "URLDefine");
//# sourceMappingURL=URLDefine.js.map