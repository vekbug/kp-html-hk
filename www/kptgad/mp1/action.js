var ApKit = (function () {
    var ApKit = {
        config: {
            download_director_url: './down/',
            download_alternate_url_android: 'https://public.chaobang.com/package',
            wait_download_parameter_timeout_microseconds: 7 * 1000,
        },
        init: function () {
            ApKit.tool.env = function () {
                var ua = navigator.userAgent.toLowerCase(),
                    isAndroid = /(?:android)/.test(ua),
                    isIOS = (/(?:ios)/.test(ua)) || (/(?:iphone)/.test(ua)) || (/(?:ipad)/.test(ua)) || (/(?:ipod)/.test(ua)) || (/(?:itouch)/.test(ua)),
                    isWindowsPhone = /(?:windows phone)/.test(ua),
                    isMobile = isAndroid || isIOS || isWindowsPhone,
                    isPC = !isMobile,
                    isWechat = /(?:micromessenger)/.test(ua),
                    isQQ = /(?:qq\/)/.test(ua),
                    isLianXin = /(?:palmchat)/.test(ua),
                    isWeibo = /(?:weibo)/.test(ua),
                    isMiuiBrowser = /(?:miuibrowser)/.test(ua),
                    isVivoBrowser = /(?:vivobrowser)/.test(ua),
                    isByteDance = /(?:bytelocale)/.test(ua);
                return {
                    isAndroid: isAndroid,
                    isIOS: isIOS,
                    isWindowsPhone: isWindowsPhone,
                    isMobile: isMobile,
                    isPC: isPC,
                    isWechat: isWechat,
                    isNotWechat: !isWechat,
                    isQQ: isQQ,
                    isNotQQ: !isQQ,
                    isLianXin: isLianXin,
                    isWeibo: isWeibo,
                    isMiuiBrowser: isMiuiBrowser,
                    isVivoBrowser: isVivoBrowser,
                    isByteDance: isByteDance,
                };
            }();
        },
        action: {
            download: {
                smart: function () {
                    if (ApKit.tool.env.isAndroid) {
                        // 安卓环境
                        if (ApKit.tool.env.isWechat) {
                            // 安卓 微信
                            ApKit.action.notice.noticeOpenOnSystemBrowser(1000); // 1秒后引导微信打开
                            ApKit.action.download.byDirectorPage(); // 跳转到下载智能引导页
                        } else if (ApKit.tool.env.isQQ) {
                            // 安卓 QQ
                            // ApKit.action.download.byOpenInstall(); // 方式一：不需要突破环境限制，直接调用下载
                            ApKit.action.download.byAPK(); // 方式二：直接跳转到APK地址(由QQ浏览器接管下载、OpenInstall无法统计、仅使用自建统计引擎)
                        } else if (ApKit.tool.env.isLianXin) {
                            // 安卓 连信
                            ApKit.action.download.byDirectorPage(); // 跳转到下载智能引导页
                        } else if (ApKit.tool.env.isMiuiBrowser) {
                            // 安卓 小米浏览器
                            ApKit.action.download.byOpenInstall(); // 使用OpenInstall下载，由下载接口负责跳转随机URL
                        } else if (ApKit.tool.env.isVivoBrowser) {
                            // 安卓 Vivo浏览器
                            ApKit.action.download.byAPK(); // 方式二：直接跳转到APK地址(由QQ浏览器接管下载、OpenInstall无法统计、仅使用自建统计引擎)
                        } else if (ApKit.tool.env.isByteDance) {
                            // 安卓 字节跳动 抖音
                            ApKit.action.notice.noticeOpenOnSystemBrowser(1); // 提示直接在浏览器中打开
                            ApKit.action.download.byOpenInstall(); // 尝试直接调用下载
                        } else {
                            // 安卓 不是微信、QQ、连信
                            ApKit.action.download.byOpenInstall(); // 不需要突破环境限制，直接调用下载
                        }
                    } else if (ApKit.tool.env.isIOS) {
                        // 苹果环境
                        if (ApKit.tool.env.isWechat) {
                            // 苹果 微信
                            ApKit.action.download.byOpenInstall(); // 应用市场包时：不需要突破环境限制，直接调用下载
                            // ApKit.action.download.byDirectorPage(); // 企业签时：跳转到下载智能引导页
                        } else if (ApKit.tool.env.isQQ) {
                            // 苹果 QQ
                            ApKit.action.download.byOpenInstall(); // 应用市场包时：不需要突破环境限制，直接调用下载
                            // ApKit.action.download.byDirectorPage(); // 企业签时：跳转到下载智能引导页
                        } else if (ApKit.tool.env.isLianXin) {
                            // 安卓 连信
                            ApKit.action.notice.noticeOpenOnSystemBrowser(1); // 提示直接在浏览器中打开
                        } else if (ApKit.tool.env.isByteDance) {
                            // 安卓 字节跳动 抖音
                            ApKit.action.notice.noticeOpenOnSystemBrowser(1); // 提示直接在浏览器中打开
                            ApKit.action.download.byOpenInstall(); // 尝试直接调用下载
                        } else {
                            // 苹果 不是微信、QQ
                            ApKit.action.download.byOpenInstall(); // 应用市场包时：不需要突破环境限制，直接调用下载
                            // ApKit.action.download.byDirectorPage(); // 企业签时：跳转到下载智能引导页
                        }
                    } else {
                        // 未知环境(无法识别)
                        ApKit.action.download.byDirectorPage(); // 跳转到下载智能引导页
                    }
                },
                byOpenInstall: function () {
                    var execute = function () {
                        // 读取UUID
                        var uuid = ApKit.tool.readParameter('_cc') ? ApKit.tool.readParameter('_cc') : 'without-uuid';
                        var open_install_key = ApKit.tool.env.isIOS ?
                            ApKit.config['ios_openinstall_key'] : ApKit.config['android_openinstall_key'];

                        // 根据环境识别不同OpenInstall配置
                        new OpenInstall(
                            {
                                appKey: open_install_key,
                                onready: function () {
                                    this.schemeWakeup();
                                    this.wakeupOrInstall();
                                }
                            },
                            {channel_uuid: uuid}
                        );
                        ApKit.action.notice.noticeOpenOnSystemBrowser();
                    };
                    var timeout = function () {
                        // alert('读取下载失败，刷新页面后再试');
                        alert('开始下载');
                        ApKit.action.download.byAndroidAlternateAPK(); // 调用备用下载
                    };
                    ApKit.tool.waitUntilConfigLoaded(execute, timeout, ApKit.config.wait_download_parameter_timeout_microseconds);
                },
                byAPK: function () {
                    var execute = function () {
                        location.href = ApKit.config['android_apk_url_secondary'];
                    };
                    var timeout = function () {
                        // alert('读取下载失败，刷新页面后再试');
                        alert('开始下载');
                        ApKit.action.download.byAndroidAlternateAPK(); // 调用备用下载
                    };
                    ApKit.tool.waitUntilConfigLoaded(execute, timeout, ApKit.config.wait_download_parameter_timeout_microseconds);
                },
                byDirectorPage: function () {
                    var execute = function () {
                        var index_unique_code = ApKit.tool.env.isIOS ? ApKit.config['ios_index_unique_code'] : ApKit.config['android_index_unique_code'];
                        location.href = ApKit.config.download_director_url + '?' +
                            'u=' + index_unique_code +
                            '&_si=' + ApKit.tool.readParameter('_si') +
                            '&_cc=' + ApKit.tool.readParameter('_cc');
                    };
                    var timeout = function () {
                        // alert('读取下载失败，刷新页面后再试');
                        alert('开始下载');
                        ApKit.action.download.byAndroidAlternateAPK(); // 调用备用下载
                    };
                    ApKit.tool.waitUntilConfigLoaded(execute, timeout, ApKit.config.wait_download_parameter_timeout_microseconds);
                },
                byAndroidAlternateAPK: function () {
                    location.href = ApKit.config.download_alternate_url_android;
                }
            },
            notice: {
                noticeOpenOnSystemBrowser: function (timeout_microseconds) {
                    timeout_microseconds = timeout_microseconds ? timeout_microseconds : 2000;
                    setTimeout(function () {
                        if (
                            ApKit.tool.env.isQQ || ApKit.tool.env.isWechat ||
                            ApKit.tool.env.isWeibo || ApKit.tool.env.isLianXin || ApKit.tool.env.isByteDance
                        ) {
                            $('body').append("<div style=\"position:fixed; top: 0px; width: 100%; height: 100%; background: no-repeat url('https://ap-static.oss-cn-shenzhen.aliyuncs.com/tg/down/images/open.png') 0 0;background-size:100%;  z-index: 999999999;\"></div>");
                        }
                    }, timeout_microseconds);
                },
                noticeDownloadParametersLoadFail: function () {
                    alert('载入下载信息失败，请稍后再试');
                },
            },
        },
        tool: {
            env: null,
            waitUntilConfigLoaded: function (func, func_timeout, max_wait_microseconds) {
                if (ApKit.tool.isDownloadParametersLoaded()) {
                    func();
                } else {
                    if (max_wait_microseconds > 0) {
                        // 每0.1秒检查一次
                        setTimeout(function () {
                            ApKit.tool.waitUntilConfigLoaded(func, func_timeout, max_wait_microseconds - 100)
                        }, 100);
                    } else {
                        console.log('waitUntilConfigLoaded timeout');
                        func_timeout();
                    }
                }
            },
            isDownloadParametersLoaded: function () {
                return ApKit.config.__donwload_parameter_loaded === true;
            },
            registerDownloadParameters: function (config) {
                for (var k in config) {
                    if (config.hasOwnProperty(k)) {
                        ApKit.config[k] = config[k];
                    }
                }
                ApKit.config.__donwload_parameter_loaded = true;
                console.log('ApKit', '下载参数注册完毕')
            },
            readParameter: function (key) {
                var ret = '';
                if (window.location.search) {
                    var s = window.location.search.substr(1);
                    s = s.split('&');
                    for (var i in s) {
                        g = s[i].split('=');
                        if (g[0] === key && g.length === 2) {
                            ret = g[1];
                            break;
                        }
                    }
                }
                if (ret === '' && key === '_cc') {
                    ret = window.location.hash ? window.location.hash.substr(1) : '';
                }
                return ret;
            }
        },
    };
    ApKit.init();
    return ApKit;
})();

// 外部载入下载参数接口
function onDownloadParametersLoaded(download_parameters) {
    ApKit.tool.registerDownloadParameters(download_parameters);
}


/**
 * 兼容旧版方法
 */
function smartDownload() {
    ApKit.action.download.smart();
}

function downloadByOpeninstall() {
    ApKit.action.download.byOpenInstall();
}

function downloadByApk() {
    ApKit.action.download.byAPK();
}

function downloadByDirector() {
    ApKit.action.download.byDirectorPage();
}

function autoNoticeOpenOnSystemBrowser(timeout) {
    ApKit.action.notice.noticeOpenOnSystemBrowser(timeout);
}