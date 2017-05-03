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

    return {
        engine: engine,
        browser: browser,
        system: system
    }
}();