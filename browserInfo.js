var browserInfo = function() {

    var engine = {
        //type
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        oprea: 0,

        //specific version 
        version: null
    };

    var browser = {
        //type
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        oprea: 0,
        chrome: 0,


        //specific version 
        version: null
    };

    var system = {
        win: false,
        mac: false,
        x11: false,

        // mobile
        iphone: false,
        ipod: false,
        ipad: false,
        android: false,
        nokiaN: false,
        winMobile: false,

        // game station
        wii: false,
        ps: false
    };

    var ua = navigator.userAgent;
    if (window.oprea) {
        engine.version = browser.version = window.oprea.version();
        engine.oprea = browser.oprea = parseFloat(engine.version);
    } else if (/AppleWebkit\/(\S+)/.test(ua)) {
        engine.version = RegExp['$1'];
        engine.webkit = parseFloat(engine.version);

        // confirm is Chrome or safari
        if (/Chrome\/(\S+)/.test(ua)) {
            engine.version = RegExp['$1'];
            engine.webkit = parseFloat(engine.version);
        } else if (/Version\/(\S+)/.test(ua)) {
            engine.version = RegExp['$1'];
            engine.safari = parseFloat(engine.version);
        } else {
            // probably determine the version number
            var safariVersion = 1;
            if (engine.webkit < 100) {
                safariVersion = 1;
            } else if (engine.webkit < 312) {
                safariVersion = 1.2;
            } else if (engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }

            browser.safari = browser.version = safariVersion;
        }

    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;])/.test(ua)) {
        engine.version = browser.version = RegExp['$1'];
        engine.khtml = browser.kong = parseFloat(engine.version);
    } else if (/rv:([^\)]+\) Gecko \/\d{8}/.test(ua)) {
        engine.version = RegExp['$1'];
        engine.gecko = parseFloat(engine.version);

        // confirm is Firefox or not
        if (/Firefox\/(\S+)/.test(ua)) {
            engine.version = RegExp['$1'];
            engine.firefox = parseFloat(engine.version);
        }
    } else if (/MSIE ([^;]+)/.test(ua)) {
        engine.version = browser.version = RegExp['$1'];
        engine.ie = browser.ie = parseFloat(engine.version);
    }

    // check browser
    browser.ie = engine.ie;
    browser.oprea = engine.oprea;

    // check platform
    var p = navigator.platform;
    system.win = p.indexOf('Win') == 0;
    system.mac = p.indexOf('Mac') == 0;
    system.x11 = (p == 'X11') || (p.indexOf('Linux') == 0);

    // check Windows OS
    if (system.win) {
        if (/Wind(?:dows)?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
            if (RegExp["$1"] == "NT") {
                switch (RegExp["$2"]) {
                    case "5.0":
                        system.win = '2000';
                        break;
                    case "5.1":
                        system.win = 'XP';
                        break;
                    case "6.0":
                        system.win = 'Vista';
                        break;
                    case "6.1":
                        system.win = '7';
                        break;
                    default:
                        system.win = 'NT';
                        break;
                }
            } else if (RegExp["$1"] == "9x") {
                system.win = 'ME';
            } else {
                system.win = RegExp['$1'];
            }
        }
    }

    //mobile device
    system.iphone = ua.indexOf('iPhone') > -1;
    system.iPod = ua.indexOf('iPod') > -1;
    system.iPad = ua.indexOf('iPad') > -1;
    system.nokiaN = ua.indexOf('nokiaN') > -1;

    // windows mobile
    if (system.win === 'CE') {
        system.windMoile = system.win;
    } else if (system.win === 'Ph') {
        if (/Windows Phone OS (\d+ \d+)/.test(ua)) {
            system.win = 'Phone';
            system.winMobile = parseFloat(RegExp['$1']);
        }
    }

    // check IOS version
    if (system.mac && ua.indexOf('mobile') > -1) {
        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp['$1'].replace('_', '.'));
        } else {
            system.ios = 2;
        }
    }

    // check android version
    if (/Android (\d+\.\d+)/.test(ua)) {
        system.android = parseFloat(RegExp['$1']);
    }

    // game OS
    system.wii = ua.indexOf('Wii') > -1;
    system.ps = /playstation/i.test(ua);

    return {
        engine: engine,
        browser: browser,
        system: system
    }
}();