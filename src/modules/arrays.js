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
