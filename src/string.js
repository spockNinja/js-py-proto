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

        return this.slice(start, end).indexOf(sub);
    },

    format: function(args) {
        // formats the string using '{}' notation
        // Either {0} {1} {2} notation with a list ([]) can be used
        // Or {named1} {named2} notation with a dict ({}) can be used
        // **Not an exact translation of python's format, but we just can't do kwargs**
        var formatted = this;
        if (Array.isArray(args)) {
            for (var i=0; i<args.length; i++) {
                formatted = formatted.replace(new RegExp('\\{'+i+'\\}', 'gm'), args[i]);
            }
        }
        else if (typeof args === 'object') {
            for (var k in args) {
                if (args.hasOwnProperty(k)) {
                    formatted = formatted.replace(new RegExp('\\{'+k+'\\}', 'gm'), args[k]);
                }
            }
        }
        return formatted;
    },

    index: function(sub, start, end) {
        // finds the index of the first occurence of a substring
        // within the slice from start to end
        start = start || 0;
        end = end || this.length;

        var idx = this.slice(start, end).indexOf(sub);
        if (idx === -1) {
            throw "ValueError"
        }
        return idx;
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
        // *Note that == is intentional and necessary, as === will be false in this context
        return (this.toLowerCase() == this) && (/[a-z]+/).test(this);
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
    }
};
