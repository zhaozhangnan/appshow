/********************************************code start*********************************************************/
(function(window){
    var urlParam=getURLParamters();
    for(var attr in urlParam){
        if(attr=="cmsp"||attr=="uidtype"||attr=="idfa"){
            localStorage.removeItem(attr);
            localStorage.setItem(attr,urlParam[attr]);
        }
    }
    function getURLParamters(){
        if(window.location.search==""){
            return {};
        }
        var urlParamters = '{"' + window.location.search.replace(/^\?/, '').replace(/&/g, '","').replace(/=/g, '":"')+ '"}';
        var result = JSON.parse(urlParamters);
        return result;
    }
})(window);
var trackPath = "http://newcms.mobile1.com.cn/tracknew/advTract/tractEventJsonP.action?";
var trackScript;
function track(cId, eventId, url) {
    var trckCmspData={ cmsp:"",uidtype:"",idfa:""};
    trckCmspData.cmsp=!(localStorage.getItem('cmsp'))?"":localStorage.getItem('cmsp');
    trckCmspData.uidtype=!(localStorage.getItem('uidtype'))?"":localStorage.getItem('uidtype');
    trckCmspData.idfa=!(localStorage.getItem('idfa'))?"":localStorage.getItem('idfa');
    trackScript = null;
    trackScript = document.createElement("script");
    var src = trackPath + "cid=" + cId + "&eventid=" + eventId+"&cmsp="+trckCmspData.cmsp+"-"+trckCmspData.idfa+"____"+trckCmspData.uidtype;
    trackScript.type = "text/javascript";
    trackScript.src = src;
    document.getElementsByTagName("head")[0].appendChild(trackScript);
    if (url != undefined && url != null && url != "") {
        setTimeout(redirection, 500);
        function redirection() {
            window.location = url;
        }
    }
}
function eventcallback(result) {
    if(typeof trackScript==='undefined')
        return;
    document.getElementsByTagName("head")[0].removeChild(trackScript);
    trackScript=null;

}
/********************************************code end*********************************************************/
