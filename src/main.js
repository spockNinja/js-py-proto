/*
 * This file contains the platform support logic and the code
 * that actually patches the native prototypes with the module functions
 */

(function() {

    // check platform and feature support
    var node = false;
    var browser = false;
    var defineProperty = false;

    if (typeof module !== 'undefined' && module.exports) {
        node = true;
        if (typeof Object.defineProperty === 'function') {
            defineProperty = true;
        }
    }
    else {
        browser = true;
        if (typeof Object.defineProperty === 'function' && !(/MSIE 8.0/).test(navigator.userAgent)) {
            defineProperty = true;
        }
    }
    

    var start = function() {
        // Actually apply the functions to the correct prototypes
        for (var m in jspyproto.modules) {
            if (jspyproto.modules.hasOwnProperty(m)) {
                var objToPatch = null;
                switch (m) {
                    case 'strings':
                        objToPatch = String.prototype;
                        break;
                    case 'objects':
                        objToPatch = Object.prototype;
                        break;
                    default:
                        throw new Error("Module not yet implemented: " + m);
                }

                for (var f in jspyproto.modules[m]) {
                    if (jspyproto.modules[m].hasOwnProperty(f)) {
                        if (defineProperty) {
                            Object.defineProperty(objToPatch, f, {value: jspyproto.modules[m][f]});
                        }
                        else {
                            objToPatch[f] = jspyproto.modules[m][f];
                        }
                    }
                }
            }
        }

        // clean ourselves up to keep the global namespace clean
        /* jshint ignore:start */
        delete jspyproto;
        /* jshint ignore:end */
    };

    if (browser) {
        start();
    }
    else if (node) {
        module.exports = start;
    }
}).call(this);
