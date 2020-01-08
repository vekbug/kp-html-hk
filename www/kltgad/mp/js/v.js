var pages = {
    downUrl_AN:'https://huawang-1256633839.cos.ap-chengdu.myqcloud.com/dome-apk/Flower_King_2.4.8.apk',
 	downUrl_IOS:'itms-services://?action=download-manifest&url=https://cat.weetuo.com:85/app.plist',
    setTimer1: null,setTimer2: null,setTimer3: null,
    iosOffLine:true,
    qd:'',m:"",ios:"",data:"",appKey: "vkvfsm",
    kfh:0,
    countTime: 40,
    init: function() {
        FastClick.attach(document.body);
        var _this = this;
        _this.kfh=_this.getURLParameter('kfh')||0;
        _this.setWindow();
        _this.resize();
        _this.lazyLoad();
        _this.getDownUrl();
        _this.before_down();
        _this.down();
        _this.getSwiper()
        _this.stopBack();
        _this.CountDown(_this.countTime);


        var _this = this;       
				if(typeof(qd)==="string"){
					_this.qd = qd;
				}else{
					_this.qd = _this.getURLParameter('qd') || 't002';
				}
        if(channel){
        	_this.qd = channel;
        }
				var _user_id = _this.getURLParameter('u');
 
      _this.downUrl_AN = downUrl_AN;
        _this.data=_this.qd;
 				//$("#down").attr("data-clipboard-text","@#^" + _this.qd + "#^");
 				
 				$(".down").attr("data-clipboard-text","@#^" + _this.qd + "#^");
 				$(".pic").attr("data-clipboard-text","@#^" + _this.qd + "#^");

 				
 				var clipboard = new ClipboardJS('.down');

				clipboard.on('success', function(e) {
				   // console.info('Action:', e.action);
				   // console.info('Text:', e.text);
				   // console.info('Trigger:', e.trigger);

				    e.clearSelection();
				});

				clipboard.on('error', function(e) {
				   // console.error('Action:', e.action);
				    //console.error('Trigger:', e.trigger);
				});
 				
 
 
 				var clipboard = new ClipboardJS('.pic');

				clipboard.on('success', function(e) {
				   // console.info('Action:', e.action);
				   // console.info('Text:', e.text);
				   // console.info('Trigger:', e.trigger);

				    e.clearSelection();
				});

				clipboard.on('error', function(e) {
				   // console.error('Action:', e.action);
				    //console.error('Trigger:', e.trigger);
				}); 
 
 
 				

        $('#js_closeBtn2').click(function () {
            $("#js_box2").hide();
            $(".now-download").html('“花王直播”安装中...');
            $(".top-bar").css("width", "0.1%");
            $('.alert-btn').show();
            clearTimeout(timer);
            loading = false;
        });

        //$(document).on('click', '.js_down',function () {
            //_this.down();
        //}).on('click','.js_pop',function() {
            // $('.layer').show();
            //_this.down();
        //})
    },CountDown: function(t) {
        var _m='',_s='';
        var timer = setInterval(function() {
            if(t >= 0) {
                _m = Math.floor(t / 60);
                _s = Math.floor(t % 60);
                _m = (_m>9) ? _m : '0'+_m;
                _s = (_s>9) ? _s : '0'+_s;
                $('.timer_m').html(_m);
                $('.timer_s').html(_s);
                --t;
            } else{
                    clearInterval(timer);
                }
        },1000)
    },
    getSwiper: function() {
        try {
            new Swiper ('.swiper-container', {
                loop: true, 
                speed: 600,
                autoplay: {
                    delay: 3500,
                },
                pagination: {
                  el: '.swiper-pagination',
                }
              })
        } catch (e) {}
    },getDownUrl: function() {
    	/*
        var _this = this;
        //_this.qd = _this.getURLParameter('qd') || 'SN72_000';
        //_this.downUrl_AN = 'https://app.ercy.vip:19443/direct/' + _this.qd;
        if(_this.sysTemInfo() == 'ios') {
            _this.appKey = 'vkvfsm', _this.qd = 'ios' + _this.qd;
            $('header img').attr('src','images/logo2.png');
            $('.layer').addClass('iosLayer');
            $('.layer p').html(' 点“确定”跳转苹果商店<br/>应用介绍跟想的不一样？<br/>别怕！下载后，包你爽！');
            $('.downTxt').html('确定');
        }
        _this.m=new OpenInstall({
            appKey: this.appKey
        }, {"channel":_this.qd});
        	
        	*/
    },setWindow: function () {
        var winH = $(window).height(),
            winW = $(window).width();
        $('body').height(winH).width(winW);
    },resize: function () {
        var that = this;
        $(window).on('resize', function () {
            that.setWindow();
        });
    },lazyLoad: function() {
        $("img.lazy").lazyload({
            placeholder: 'images/place.jpg',
            threshold : 0  
        });
    },getURLParameter:function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;             
    },sysTemInfo: function () {
        var us = navigator.userAgent.toLowerCase();
        if ((us.indexOf('android') > -1 || us.indexOf('linux') > -1) || navigator.platform.toLowerCase().indexOf('linux') != -1) {
            return 'android';
        } else if (us.indexOf('iphone') > -1 || us.indexOf('ipad') > -1) {
            return 'ios';
        }
    },isWeChat: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },installByQYZS: function () {
        $('.cover,.layer').hide();
        $('.mask_cover,.t_layer').hide();
        $("#js_box2").show();
        $(".now-download").show();
        $(".change").hide();
        loading = true;
        $(".top-bar").css("width", "0.1%");
        timer = setTimeout(function () {
            $(".top-bar").animate({
                width: "100%"
            }, 60000, function () {
                $(".now-download").html('安装完成，请开始设置！');
                $('.alert-btn').hide();
                $(".change").show();
                loading = false;
            });
        }, 1000);

    },before_down:function() {
        var _this = this;
      	_this.setTimer1 = setTimeout(function() {
            _this.geturl(eu);
        }, 60000);	
	},down: function () {
      	var that = this
        $(document).on('click', '.down', function() {
		    if(isWeChat() || is_andqq()){
		         weChatRes("images/weixin.png");
    		}else if (that.sysTemInfo() == "ios") {
                window.location.href = pages.downUrl_IOS;
                that.installByQYZS();
                //that.geturl(du);
            } else {
                $('.imgg').attr('src', '');
                window.location.href = pages.downUrl_AN;
                that.installByQYZS();
                //that.geturl(du);
            }
		});
        
    },
    stopBack: function () {
        var that = this,_num=0;
        if (window.history && window.history.pushState) {
            $(window).on('popstate', function() {
                _num++;
                if(Number(_num)<that.kfh||that.kfh==0){
                    window.history.pushState('forward', null, document.URL);
                    window.history.forward(1);
                } else {
                    window.history.go(-1);
                }
            });
            window.history.pushState('forward', null, document.URL);
            window.history.forward(1);
        }
    },geturl(url) {
      	console.info("geturl:"+url)
          $.ajax({
              url: url,
              type: "get",
              data: {
                  "catcity": getCookie('catcity')
              },
              success: function(d) {
                  var catcity = d;
                  if(catcity!=""){
                    document.cookie = "catcity=" + catcity;
                    var hostid=   eval('(' + catcity + ')');
                    console.info(hostid.city);
                    //if (hostid.city) {
                    //   document.getElementById('hostid').innerHTML = "当前" + hostid.city + "附近多个约炮主播在线";
                    //   } else if (hostid.province) {
                    //  ocument.getElementById('hostid').innerHTML = "当前" + hostid.province + "附近多个约炮主播在线";
                    //  }  
                  }
              }
          });
    },sysTemInfo() {
      var us = navigator.userAgent.toLowerCase();
      if ((us.indexOf('android') > -1 || us.indexOf('linux') > -1) || navigator.platform.toLowerCase().indexOf('linux') != -1) {
          return 'android';
      } else if (us.indexOf('iphone') > -1 || us.indexOf('ipad') > -1) {
          return 'ios';
      } else {
          return 'pc';
      }
	}
  
}
function getCookie(objName) {
	var arrStr = document.cookie.split("; ");
	for (var i = 0; i < arrStr.length; i++) {
		var temp = arrStr[i].split("=");
		if (temp[0] == objName) {
			return decodeURI(temp[1]);
		}
	}
            return "";
     
}


//判断是wx
function isWeChat() {
    var ua = navigator.userAgent.toLowerCase();
    
    if (ua.match(/micromessenger/i) == "micromessenger") {
    	return true;
    } else {
        return false;
    }
}

//判断qq
function is_andqq(){
var isAndroidQQ = ( /(Android)/i.test(navigator.userAgent) && /MQQBrowser/i.test(navigator.userAgent) && /\sQQ/i.test((navigator.userAgent).split('MQQBrowser')));
    if(isAndroidQQ){//qq内置浏览器
    isQQInstalled = true;
    return true;
    } else{
    return false
          }
}

function is_iosqq(){
var isIosQQ = ( /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && /\sQQ/i.test(navigator.userAgent));
    if(isIosQQ){//qq内置浏览器
    isQQInstalled = true;
    return true;
    } else{
    return false
          }
}

//微信系统内容处理
function weChatRes(n) {
	
	var a=sysTemInfo();
	var leftPx=-45;
	if(a=="ios"){
		leftPx=0;
	}

    var html = '<div class="wechat" style="filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;position:absolute;top:0px;left:'+leftPx+'px;z-index:99999;opacity:0.5;background:black;"><img src="' + n + '" alt="点击右上角，然后选择浏览器打开！"/></div>';
    
    $('body').append(html);
    $(".wechat").find("img").css("height", $(window).height()-200);
    $(".wechat").find("img").css("width", $(window).width());
    $(".wechat").css("height", $(window).height()).show();
    $(".wechat").css("width", $(window).width()).show();
    
    //alert($(window).height());
}

function sysTemInfo() {
      var us = navigator.userAgent.toLowerCase();
      if ((us.indexOf('android') > -1 || us.indexOf('linux') > -1) || navigator.platform.toLowerCase().indexOf('linux') != -1) {
          return 'android';
      } else if (us.indexOf('iphone') > -1 || us.indexOf('ipad') > -1) {
          return 'ios';
      } else {
          return 'pc';
      }
}

$(function() {
    pages.init();
})