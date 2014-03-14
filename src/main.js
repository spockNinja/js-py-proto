/*
 * This file contains all of the configuration and Browser support logic.
 */

jspyproto = {

    modules: {},

    options: {
        exclude: {
            strings: [],
            objects: [],
            numbers: []
        }
    },

    browserSupport: {
        defineProperty: true,
    },

    // Apply preferences
    configure: function(userOptions) {
        if (typeof userOptions !== "object") {
            throw "Configure options must be an object.";
        }

        // Parse the exlusion settings
        if (userOptions.exclude !== undefined) {
            if (typeof userOptions.exclude !== "object") {
                throw "Exclude options must be an object.";
            }
            for (var k in userOptions.exclude) {
                if (this.options.exclude.hasOwnProperty(k)) {
                    if (typeof userOptions.exclude[k] === "boolean") {
                        this.options.exclude[k] = userOptions.exclude[k];
                    }
                    else if (Array.isArray(userOptions.exclude[k])) {
                        var moduleExclusions = [];
                        for (var i=0; i<userOptions.exclude[k].length; i++) {
                            if (this.modules[k].hasOwnProperty(userOptions.exclude[k][i])) {
                                moduleExclusions.push(userOptions.exclude[k][i]);
                            }
                            else {
                                throw userOptions[k][i] + " is not a valid method of the " + k + " module.";
                            }
                        }
                        if (moduleExclusions.length > 0) {
                            this.options.exclude[k] = moduleExclusions;
                        }
                    }
                    else {
                        throw "Exclusion paramaters must be a boolean or list.";
                    }
                }
                else if (userOptions.exclude.hasOwnProperty(k)) {
                    throw k + " is not a valid module to exclude.";
                }
            }
        }
    },

    // Check to see what the browser can do...
    checkBrowserSupport: function() {
        if (Object.defineObject === undefined || (/MSIE 8.0/).test(navigator.userAgent)) {
            this.browserSupport.defineProperty = false;
        }
    },

    // Actually apply the functions to the correct prototypes
    start: function() {
        this.checkBrowserSupport();

        for (var m in this.modules) {
            if (!this.modules.hasOwnProperty(m) ||
                 this.options.exclude[m] === true) {
                continue;
            }

            var objToPatch = null;
            switch (m) {
                case 'strings':
                    objToPatch = String.prototype;
                    break;
                case 'objects':
                    objToPatch = Object.prototype;
                    break;
                default:
                    throw "Module not yet implemented: " + m;
            }

            for (var f in this.modules[m]) {
                if (!this.modules[m].hasOwnProperty(f) ||
                     this.options.exclude[m].indexOf(f) !== -1) {
                    continue;
                }

                if (this.browserSupport.defineProperty) {
                    Object.defineProperty(objToPatch, f, this.modules[m][f]);
                }
                else {
                    objToPatch[f] = this.modules[m][f];
                }
            }
        }

        // clean ourselves up to keep the global namespace clean
        delete jspyproto;
    }
}
