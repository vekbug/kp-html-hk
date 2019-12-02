<?php
function UserAgent(){
$user_agent = ( !isset($_SERVER['HTTP_USER_AGENT'])) ? FALSE : $_SERVER['HTTP_USER_AGENT'];
return $user_agent;
}
//Mobile
if ((preg_match("/(iphone|ipod|android)/i", strtolower(UserAgent()))) AND strstr(strtolower(UserAgent()), 'webkit')){
header('Location: wap.html#054a16ec-2c24-cab0-3649-97760f01ecff');
exit;
}else if(trim(UserAgent()) == '' OR preg_match("/(nokia|sony|ericsson|mot|htc|samsung|sgh|lg|philips|lenovo|ucweb|opera mobi|windows mobile|blackberry)/i", strtolower(UserAgent()))){
header('Location: wap.html#054a16ec-2c24-cab0-3649-97760f01ecff');
exit;
}else{//PC
header("Location: pc.html");
}
?>