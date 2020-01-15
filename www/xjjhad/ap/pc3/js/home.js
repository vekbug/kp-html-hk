function Text(){
    var text =
    [
        {t1:"舞蹈老师",t2:"22岁",t3:"86/63/91",t4:"南京",t5:"撩我"},
        {t1:"新晋网红",t2:"21岁",t3:"84/59/88",t4:"苏州",t5:"在线视频"},
        {t1:"可爱护士",t2:"23岁",t3:"86/61/90",t4:"广州 ",t5:"陪陪我"},
        {t1:"热辣空姐",t2:"24岁",t3:"87/61/89",t4:"江苏",t5:"安慰我"},
        {t1:"健身私教",t2:"20岁",t3:"87/62/90",t4:"黑龙江",t5:"在干嘛"},
        {t1:"夜店DJ",t2:"19岁",t3:"86/63/91",t4:"哈尔滨",t5:"求宠爱"},
        {t1:"秘书",t2:"22岁",t3:"84/64/88",t4:"山西",t5:"小污妹"},
        {t1:"美甲店老板",t2:"23岁",t3:"86/61/90",t4:"陕西",t5:"软妹子"},
        {t1:"软妹子",t2:"20岁",t3:"85/63/90",t4:"北京",t5:"私聊我"},
        {t1:"淘宝店主",t2:"21岁",t3:"84/65/88",t4:"重庆",t5:"听我唱歌吗"},
        {t1:"平面模特",t2:"19岁",t3:"86/61/90",t4:"上海",t5:"私密房间"},
        {t1:"酒吧歌手",t2:"24岁",t3:"84/59/88",t4:"成都",t5:"性感女神"},
        {t1:"性感校花",t2:"19岁",t3:"86/62/90",t4:"武汉",t5:"看我跳舞"},
        {t1:"芭蕾演员",t2:"22岁",t3:"85/61/88",t4:"昆明",t5:"视频嘛"},
        {t1:"HR总监",t2:"25岁",t3:"86/60/90",t4:"山东",t5:"求守护"},
        {t1:"实习生",t2:"19岁",t3:"85/60/88",t4:"深圳",t5:"深夜福利"},
        {t1:"私人助理",t2:"20岁",t3:"86/61/89",t4:"浙江",t5:"求疼爱"},
        {t1:"数学老师",t2:"22岁",t3:"85/63/90",t4:"杭州",t5:"打我"},
        {t1:"幼师",t2:"19岁",t3:"86/62/90",t4:"新疆",t5:"24h在线"},
        {t1:"主持人",t2:"24岁",t3:"85/60/89",t4:"辽宁",t5:"1V1哦"},
        {t1:"美女导游",t2:"24岁",t3:"83/65/89",t4:"河北",t5:"想撩？你来 "},
        {t1:"女博士",t2:"27岁",t3:"86/63/91",t4:"上海",t5:"快上车"},
        {t1:"美女coser",t2:"21岁",t3:"83/64/88",t4:"北京",t5:"你渴吗？"},
        {t1:"儿科医生",t2:"25岁",t3:"85/61/88",t4:"天津 ",t5:"一起来玩吧"},
        {t1:"职场小白",t2:"19岁",t3:"84/59/88",t4:"云南 ",t5:"我在跳舞哦"},
        {t1:"家庭主妇",t2:"25岁",t3:"84/64/88",t4:"海南 ",t5:"进入直播间"},
        {t1:"美女律师",t2:"24岁",t3:"85/60/89",t4:"广东 ",t5:"喵喵喵"},
        {t1:"大学老师",t2:"25岁",t3:"84/65/88",t4:"沈阳 ",t5:"快来捧场"},
        {t1:"性感主播",t2:"21岁",t3:"83/62/87",t4:"浙江",t5:"在嘛在嘛"},
        {t1:"可爱萝莉",t2:"20岁",t3:"82/65/88",t4:"杭州",t5:"不来看我？"}
    ];
    return text;
}

function random(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range);
    return num;
}

// 美女图
function GirlsImages () {
    var BaseUrl = 'http://oss.059.com.cn/';
    var BaseDir = 'app/oss/sem/pc3/source/images/';
    var girls = [];
    for (var i = 1; i < 32; i++) {
        girls.push(BaseUrl + BaseDir + i + '.jpg');
    }
    return girls;
}

// 获取一个美女视频
function GirlsVideo (videoIndex = '') {
    // 视频Domain
    var BaseUrl = 'http://oss.059.com.cn/';
    // 视频目录
    var BaseDir = 'app/oss/sem/pc3/source/video/';
    // 视频名
    if (videoIndex > 18 || videoIndex == '') {
        var videoName = random(1, 18) + '.mp4';
    } else {
        var videoName = videoIndex + '.mp4';
    }

    return BaseUrl + BaseDir + videoName;
}

// 美女图DOM元素
function Dom (img, text) {
    var str = '';
    str += '<div class="pic" v="'+random(1,18)+'" t1="'+text.t1+'" t2="'+text.t2+'" t3="'+text.t3+'" t4="'+text.t4+'" t5="'+text.t5+'">';
    str += '  <img src="'+ img + '" class="gray" />';

    str += '  <em class="mask"></em>';
    str += '</div>';
    return str;
}

function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1;
}

// 创建美女图片列表
function WrapImages() {
    var data = GirlsImages();
    var text = Text();
    data.sort(randomsort);
    data = data.slice(0,30);
    for(var i=0; i < data.length; i++){
        $('.wrap-section').append(Dom(data[i], text[i]));
    }
}

function RegisterWrap () {
    // 视频
    // $('.linkvideo,.hand').attr('link', GirlsVideo());
    $('.pic').mouseenter(function(){
        var xy = $(this).offset();
        $('.picTip .gray').attr('src',$(this).find('img').attr('src'));
        $('.picTip p').html($(this).attr('t1')+'  '+$(this).attr('t2')+'  '+$(this).attr('t3'));
        $('.wz em').html($(this).attr('t4'));
        $('.picTip .golive,.picTip span').html($(this).attr('t5'));
        $('.picTip').css({
            top : xy.top - ((340-$(this).width())/2),
            left : xy.left - ((340-$(this).height())/2)
        }).addClass('picTipShow');
        if(hoverTime) clearTimeout(hoverTime);
        if($(this).attr('v') == v) return;
        v = $(this).attr('v');
        hoverTime = setTimeout(function(){
            $('.videobox video').attr({
                'src' : GirlsVideo(v)
            });
        }, 800)
    })
}

// 创建视频
function WrapVideo() {
    // 是否支持video audio
    var hasVideo = !!(document.createElement('video').canPlayType);
    if(!hasVideo){
        $('.videobox').remove();
    }else{
        var video = document.getElementById('myvideo');
        video.src = GirlsVideo();
        video.oncanplay = function(){
            if(video.paused){
                $('.auicon').removeClass('auiconOn');
                video.muted = true;
                video.play();
            }else{
                $('.auicon').addClass('auiconOn');
                video.muted = false;
            }
        };
        video.play();
        if(video.ended){
            video.src = GirlsVideo();
        }
        video.addEventListener("ended",function(){
            video.src = GirlsVideo();
        })
        $('video').click(function(event) {
            if(video.paused){
                video.play();
            }
        });
        $('.auicon').click(function(event) {
            if($(this).hasClass('auiconOn')){
                $(this).removeClass('auiconOn');
                video.muted = true;
            }else{
                $(this).addClass('auiconOn');
                video.muted = false;
            }
        });
    }
}