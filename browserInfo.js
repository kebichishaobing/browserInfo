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

    return {
        engine: engine,
        browser: browser
    }
}();