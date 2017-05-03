var client = function() {

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

    return {
        engine: engine,
        browser: browser,
        system: system
    }
}();