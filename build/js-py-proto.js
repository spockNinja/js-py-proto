/*
 * Just defining the base jspyproto object
 * (to be included before the modules)
 */
var jspyproto = {
    modules: {}
};

/*
 * This file contains all of the functions attached to the Array.prototype.
 * The intention is to mirror all of the array functions in python
 *
 * *Notes*
 *      Python's pop is a bit different than JSs, and has been aliased as popItem
 */

jspyproto.modules.arrays = {

    append: Array.prototype.push,

    count: function(item) {
        // returns the number of times item appears in the list
        var count = 0;
        for (var i=0; i<this.length; i++) {
            if (this[i] === item) {
                count++;
            }
        }
        return count;
    },

    extend: function(other) {
        // concats another iterable onto this
        if (typeof other === "object") {
            for (var k in other) {
                if (other.hasOwnProperty(k)) {
                    this.push(other[k]);
                }
            }
        }
        else {
            throw TypeError("Array.extend requires another iterable");
        }
    },

    index: function(item) {
        // returns the index in the list of the first item that euqals x
        // throws an error if no match is found
        var idxOf = this.indexOf(item);

        if (idxOf !== -1) {
            return idxOf;
        }
        else {
            throw new Error("ValueError: " + item + " is not in the list");
        }
    },

    insert: function(idx, item) {
        // Insert item into the list at idx
        this.splice(idx, 0, item);
    },

    popItem: function(idx) {
        // remove the item at idx if it is specified
        // otherwise, just pop the last item in the array
        if (idx !== undefined) {
            if (idx < this.length && idx >= 0) {
                return this.splice(idx, 1)[0];
            }
            else {
                throw new Error("IndexError: popItem index out of range");
            }
        }
        return this.pop();
    },

    remove: function(item) {
        // removes the first item from the list that matches the given item
        // throws an error if no match is found
        var removeIdx = this.indexOf(item);

        if (removeIdx >= 0) {
            this.splice(removeIdx, 1);
        }
        else {
            throw new Error("ValueError: Array.remove(x): x not in Array");
        }
    }
};

/*
 * This file contains all of the functions attached to the Object.prototype.
 * The intention is to mirror all of the dict functions in python
 *
 * *Notes*
 *      iter* functions are not Implemeted yet.
 *      I eagerly await the widespread support of JS 1.7+
 *      with Iterators/Generators/yield/array comprehensions... pythonic JS nerdgasm...
 *
 *      view* functions are not implemented yet. Idk how or why in JS at the moment.
 *      Let me know if you have any suggestions
 */

jspyproto.modules.objects = {

    clear: function() {
        // Delete all of the items from the object
        for (var k in this) {
            if (this.hasOwnProperty(k)) {
                delete this[k];
            }
        }
    },

    copy: function() {
        // Return a shallow copy of the object
        var retDict = {};
        for (var k in this) {
            if (this.hasOwnProperty(k)) {
                retDict[k] = this[k];
            }
        }
        return retDict;
    },

    fromkeys: function(seq, value) {
        // Creates a new object with keys from seq and values set to value
        value = value || null;
        var retDict = {};
        for (var i=0; i<seq.length; i++) {
            retDict[seq[i]] = value;
        }
        return retDict;
    },

    getVal: function(key, def) {
        // Return what is at this[key] if there is something
        // otherwise, use default (which defaults to null)
        def = def || null;

        if (this[key] !== undefined) {
            return this[key];
        }
        return def;
    },

    // Test for the presence of key in the object
    // Deprecated in python, but useful in JS since 'a in obj' isn't reliable
    hasKey: Object.hasOwnProperty,

    items: function() {
        // Return an array of the objects (key, value) pairs
        // Since JS doesn't have a tuple, the inner pairs are also arrays
        var retItems = [];
        for (var k in this) {
            if (this.hasOwnProperty(k)) {
                retItems.push([k, this[k]]);
            }
        }
        return retItems;
    },

    pop: function(key, def) {
        // If key is present, return the value. Otherwise, return default.
        // If default is not provided AND key is not present, raise KeyError
        if (this.hasOwnProperty(key)) {
            var retVal = this[key];
            delete this[key];
            return retVal;
        }

        if (def !== undefined) {
            return def;
        }

        throw new Error("KeyError: " + key);
    },

    popitem: function() {
        // Removes and returns an arbitrary (key, value) pair from the object
        for (var k in this) {
            if (this.hasOwnProperty(k)) {
                var retPair = [k, this[k]];
                delete this[k];
                return retPair;
            }
        }
        throw new Error("KeyError: Object is empty");
    },

    setdefault: function(key, def) {
        // If key is in the object, return its value.
        // Otherwise, insert key with a value of default and return default (defaults to null)
        def = def || null;

        if (this.hasOwnProperty(key)) {
            return this[key];
        }

        this[key] = def;
        return def;
    },

    update: function(other) {
        // Updates this object with the key/value pairs in other, which is another object.
        // We don't have kwargs in JS, so we can't do that part...
        // I don't see the tuple/list version as very useful, so it can be implemented later.
        for (var k in other) {
            if (other.hasOwnProperty(k)) {
                this[k] = other[k];
            }
        }
    },

    values: function() {
        // Returns an array of the objects values
        var retArr = [];
        for (var k in this) {
            if (this.hasOwnProperty(k)) {
                retArr.push(this[k]);
            }
        }
        return retArr;
    }
};

/*
 * This file contains the source for all of the String prototyped functions.
 *
 * the goal is to implement as many functions in
 * http://docs.python.org/2/library/stdtypes.html#string-methods as possible
*/


jspyproto.modules.strings = {
    capitalize : function() {
        // Makes the first letter capitalized and the rest lowercase
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
    },

    center: function(width, fillchar) {
        // centers the string in a new string of given width,
        // filling the space with fillchar (defaults to space)
        fillchar = fillchar || ' ';
        if (fillchar.length > 1) {
            throw new TypeError("center fillchar must be a single character");
        }

        var halfFill = (width - this.length)/2;
        var str = "", padArr = [], half = halfFill >> 0;

        // build an array of fillchars, length=half
        for (var i=0; i<half; i++) {
            padArr[i] = fillchar;
        }

        // surround the string with the two halves
        str = padArr.concat(this, padArr).join('');

        // tack on one more for odd lengths
        if (halfFill % 1 > 0) {
            str += fillchar;
        }

        return str;
    },

    count: function(sub, start, end) {
        // count the number of non-overlapping instances of 'sub'
        // between the optional 'start' and 'end' (0 based indices)
        start = start || 0;
        end = end || this.length;
        var count = 0, idx = start, inc = 0;

        // go until we don't find any more occurences in the slice
        while ((inc = this.slice(idx, end).indexOf(sub)) !== -1) {
            count++;
            idx += (inc + sub.length);
        }
        return count;
    },

    endswith: function(suffix, start, end) {
        // check to see if suffix is at the very end of the string,
        // using start and end as clamps for the comparison
        start = start || 0;
        end = end || this.length;

        var slice = this.slice(start, end);
        var lastIndexOf = slice.lastIndexOf(suffix);
        return (lastIndexOf !== -1 && lastIndexOf === (slice.length - suffix.length));
    },

    find: function(sub, start, end) {
        // finds the index of the first occurence of a substring
        // within the slice from start to end
        start = start || 0;
        end = end || this.length;

        var res = this.slice(start, end).indexOf(sub);
        if (res !== -1) {
            // tack on the start, but only if we found something
            res += start;
        }
        return res;
    },

    format: function(args) {
        // formats the string using '{}' notation
        // Either {0} {1} {2} notation with a list ([]) can be used
        // Or {named1} {named2} notation with a dict ({}) can be used
        // **Not an exact translation of python's format, but we just can't do kwargs**
        var formatted = this.toString();
        for (var k in args) {
            if (args.hasOwnProperty(k)) {
                formatted = formatted.replace(new RegExp('\\{'+k+'\\}', 'gm'), args[k]);
            }
        }
        return formatted;
    },

    index: function(sub, start, end) {
        // finds the index of the first occurence of a substring
        // within the slice from start to end, but throws an error on -1
        var res = this.find(sub, start, end);

        if (res === -1) {
            throw new Error("ValueError");
        }
        return res;
    },

    isalnum: function() {
        // True if all chars are alphanumeric and there is at least one character
        return (/^[A-Za-z0-9]+$/).test(this);
    },

    isalpha: function() {
        // True if all chars are alphabetic and there is at least one character
        return (/^[A-Za-z]+$/).test(this);
    },

    isdigit: function() {
        // True if all chars are digits and there is at least one character
        return (/^\d+$/).test(this);
    },

    islower: function() {
        // True if all cased chars are lowercase and there is at least one cased character
        return (this.toLowerCase() === this.toString()) && (/[a-z]/).test(this);
    },

    isspace: function() {
        // True if all chars are whitespace and there is at least one character
        return (/^\s+$/).test(this);
    },

    istitle: function() {
        // True if all words are capitalized
        // adapted from http://hg.python.org/cpython/file/63f0a1e95d2b/Objects/stringobject.c#l3509
        var cased = false;
        var previousIsCased = false;
        for (var c in this) {
            if (!this.hasOwnProperty(c)) {
                continue;
            }

            if ((/[A-Z]/).test(this[c])) {
                if (previousIsCased) {
                    return false;
                }
                previousIsCased = true;
                cased = 1;
            }
            else if ((/[a-z]/).test(this[c])) {
                if (!previousIsCased) {
                    return false;
                }
                previousIsCased = true;
                cased = true;
            }
            else {
                previousIsCased = false;
            }
        }
        return cased;
    },

    isupper: function() {
        // True if all cased chars are uppercase and there is at least one cased character
        return (this.toUpperCase() === this.toString()) && (/[A-Z]/).test(this);
    },

    join: function(toJoin) {
        // Joins the given iterable on 'this'

        // Call toJoin's .join if it exists
        if (typeof toJoin.join === 'function') {
            return toJoin.join(this);
        }

        // Otherwise, do it ourselves...
        var retString = '';
        var delim = '';
        for (var k in toJoin) {
            if (toJoin.hasOwnProperty(k)) {
                retString += (delim + k);
                delim = this.toString();
            }
        }
        return retString;
    },

    ljust: function(width, fillchar) {
        // Return the string left justified within a string of length = width
        // extra space gets filled with fillchar, which defaults to space

        if (fillchar === undefined) {
            fillchar = ' ';
        }

        if (fillchar.length !== 1) {
            throw new TypeError("ljust fillchar must be a single character");
        }

        var lengthDiff = width - this.length;
        if (lengthDiff <= 0) {
            return this.toString();
        }

        var retString = this.toString();
        for (var i=0; i<lengthDiff; i++) {
            retString += fillchar;
        }

        return retString;
    },

    lower: String.prototype.toLowerCase,

    lstrip: function(chars) {
        // Returns a copy of the string with leading characters removed.
        // chars is a string specifying the set of chars to remove, defaults to whitespace

        // turn the chars into a regex
        var reg = null;
        if (chars !== undefined) {
            reg = new RegExp('^['+chars+']');
        }
        else {
            reg = new RegExp('^\\s');
        }

        var retString = this.toString(), currLen;

        do {
            currLen = retString.length;
            retString = retString.replace(reg, '');
        }
        while (retString.length !== currLen);

        return retString;
    },

    partition: function(sep) {
        // Split the string at the first occurrence of sep, and return a list of length 3
        // containing the part before the separator, the separator itself, and the part after the separator.
        // If the separator is not found, return a list of length 3 containing the string and two empty strings.
        if (sep.length === 0) {
            throw new Error("ValueError: empty separator given to String.partition");
        }

        var idx = this.indexOf(sep);

        if (idx === -1) {
            return [this.toString(), '', ''];
        }

        return [this.slice(0, idx), sep, this.slice(idx+sep.length)];
    },

    rfind: function(sub, start, end) {
        // Return the highest index in a string where sub is found, such that sub is between start and end
        start = start || 0;
        end = end || this.length;

        var res = this.slice(start, end).lastIndexOf(sub);
        if (res !== -1) {
            // add start, but only if we found something
            res += start;
        }
        return res;
    },

    rindex: function(sub, start, end) {
        // Just like rfind, except it throws an error instead of returning -1
        var res = this.rfind(sub, start, end);

        if (res === -1) {
            throw new Error("ValueError");
        }

        return res;
    },

    rjust: function(width, fillchar) {
        // Return the string right justified within a string of length = width
        // extra space gets filled with fillchar, which defaults to space
        if (fillchar === undefined) {
            fillchar = ' ';
        }
        if (fillchar.length !== 1) {
            throw new TypeError("rjust fillchar must be a single character");
        }

        var lengthDiff = width - this.length;
        if (lengthDiff <= 0) {
            return this.toString();
        }

        var retString = '';
        for (var i=0; i<lengthDiff; i++) {
            retString += fillchar;
        }

        retString += this.toString();

        return retString;
    },

    rpartition: function(sep) {
        // Split the string at the last occurrence of sep, and return a list of length 3
        // containing the part before the separator, the separator itself, and the part after the separator.
        // If the separator is not found, return a list of length 3 containing the string and two empty strings.
        if (sep.length === 0) {
            throw new Error("ValueError: empty separator given to String.partition");
        }

        var idx = this.lastIndexOf(sep);

        if (idx === -1) {
            return [this.toString(), '', ''];
        }

        return [this.slice(0, idx), sep, this.slice(idx+sep.length)];
    },

    // Not sure how I feel about rsplit just yet...
    // split behaves differently in python than the js string split. So what should this one do?

    rstrip: function(chars) {
        // Returns a copy of the string with trailing characters removed.
        // chars is a string specifying the set of chars to remove, defaults to whitespace

        // turn the chars into a regex
        var reg = null;
        if (chars) {
            reg = new RegExp('['+chars+']$');
        }
        else {
            reg = new RegExp('\\s$');
        }

        var retString = this.toString(), currLen;

        do {
            currLen = retString.length;
            retString = retString.replace(reg, '');
        }
        while (retString.length !== currLen);

        return retString;
    },

    splitlines: function(keepends) {
        // Returns a list of the lines, including line breaks if keepends is true

        var retArray = [], newLineRegex = null;
        // without keepnds, we can do the quick and easy split on newline chars
        if (!keepends) {
            newLineRegex = (/[\f\n\r]/);
            retArray = this.split(newLineRegex);
        }
        else {
            // use the capturing functionality of split to keep the newlines
            // we just have to create a new array with every two items concatenated
            newLineRegex = (/([\f\n\r])/);
            var keptArray = this.split(newLineRegex);

            for (var i=0; i<keptArray.length; i+=2) {
                if ((i + 1) < keptArray.length) {
                    retArray.push(keptArray[i] + keptArray[i+1]);
                }
                else {
                    retArray.push(keptArray[i]);
                }
            }
        }

        // to act like python's version, we need to take off trailing empty strings
        if (retArray.slice(-1)[0] === "") {
            retArray.pop();
        }

        return retArray;
    },

    startswith: function(prefix, start, end) {
        // check to see if prefix is at the beginning of the string,
        // using start and end as clamps for the comparison
        start = start || 0;
        end = end || this.length;

        var slice = this.slice(start, end);
        return (slice.indexOf(prefix) === 0);
    },

    strip: function(chars) {
        // Returns a copy of the string with leading and trailing characters removed.
        // chars is a string specifying the set of chars to remove, defaults to whitespace

        return this.lstrip(chars).rstrip(chars);
    },

    swapcase: function() {
        // Return a copy of the string with uppercase characters converted to lowercase and vice versa

        // Use this.replace with a function
        // *has to be done in one pass or we'll overwrite our changes*
        return this.replace(/([a-z]+)|([A-Z]+)/g, function(match) {
            if (match.toLowerCase() === match) {
                return match.toUpperCase();
            }
            else {
                return match.toLowerCase();
            }
        });
    },

    title: function(notWordBoundaries) {
        // Returns a titlecased version of the string where words start with an uppercase char
        // and the remaining characters are lowercase
        // Optional notWordBoundaries string can hold any chars that shouldn't be considered
        // word boundaries, userful for things like apostrophes and dashes
        notWordBoundaries = notWordBoundaries || '';
        reg = new RegExp('\\b[A-Za-z]+(['+notWordBoundaries+'A-Za-z]*)', 'g');
        return this.replace(reg, function(match) {
            return match[0].toUpperCase() + match.slice(1).toLowerCase();
        });
    },

    // Not sure how or if I want to implement translate... maybe call replace mutliple times with a dict?

    upper: String.prototype.toUpperCase,

    zfill: function(width) {
        // Returns the string left filled with zeros in a string of length=width
        return this.rjust(width, '0');
    }
};

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
                    case 'arrays':
                        objToPatch = Array.prototype;
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
