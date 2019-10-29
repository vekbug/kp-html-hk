
function getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return '';
}

function isIos() {
	var u = navigator.userAgent, app = navigator.appVersion; 
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
	console.log("isiOS:" + isiOS);
	console.log("isAndroid:" + isAndroid);
	return isiOS;
}

function loadBody(divid) {
    var a = $("#" + divid).height();
    var b = $(window).height();
    if(b > a) {
        $("#" + divid).height(b);
    }
}

function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

function addMeta(name,content){//手动添加mate标签
	let meta = document.createElement('meta');
    meta.content=content;
    meta.name=name;
    document.getElementsByTagName('head')[0].appendChild(meta);
}