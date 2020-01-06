//$(window).width();
function resize(){
    var win_w= $(window).width();
    if (win_w < 751) {
        $('html').css('font-size',($(window).width())/7.5+'px');
    } else {
        $('html').css('font-size',"100px");
    }
}
window.onresize=resize;
$(function(){resize();});