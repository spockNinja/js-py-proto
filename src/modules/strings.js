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
