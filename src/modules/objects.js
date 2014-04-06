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
