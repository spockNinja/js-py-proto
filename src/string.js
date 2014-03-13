/*
 * This file contains the source for all of the String prototyped functions.
 *
 * the goal is to implement as many functions in
 * http://docs.python.org/2/library/stdtypes.html#string-methods as possible
*/


Object.defineProperty(String.prototype, 'capitalize', { value: function _capitalize() {
    // Makes the first letter capitalized and the rest lowercase
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}});

Object.defineProperty(String.prototype, 'center', {value: function _center(width, fillchar) {
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
}});

Object.defineProperty(String.prototype, 'count', { value: function _count(sub, start, end) {
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
}});

Object.defineProperty(String.prototype, 'endswith', { value: function _count(suffix, start, end) {
    // check to see if suffix is at the very end of the string,
    // using start and end as clamps for the comparison
    start = start || 0;
    end = end || this.length;

    var slice = this.slice(start, end);
    var lastIndexOf = slice.lastIndexOf(suffix);
    return (lastIndexOf !== -1 && lastIndexOf === (slice.length - suffix.length));
}});

Object.defineProperty(String.prototype, 'find', {value: function _find(sub, start, end) {
    // finds the index of the first occurence of a substring
    // within the slice from start to end
    start = start || 0;
    end = end || this.length;

    return this.slice(start, end).indexOf(sub);
}});

Object.defineProperty(String.prototype, 'format', {value: function _format(args) {
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
}});

Object.defineProperty(String.prototype, 'index', {value: function _index(sub, start, end) {
    // finds the index of the first occurence of a substring
    // within the slice from start to end
    start = start || 0;
    end = end || this.length;

    var idx = this.slice(start, end).indexOf(sub);
    if (idx === -1) {
        throw "ValueError"
    }
    return idx;
}});
