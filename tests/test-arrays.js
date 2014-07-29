/*
 * This file tests all of the array functions
 */

require('../build/js-py-proto')();

exports.arrayTests = {

    testAppend: function(test) {
        // just make sure the patch is working
        var testArr = ['one', 'two', 'three'];

        testArr.append('four');
        test.deepEqual(testArr, ['one', 'two', 'three', 'four'], 'Works as expected');

        var emptyArr = [];
        emptyArr.append('buh');
        test.deepEqual(emptyArr, ['buh']);
        test.done();
    },

    testCount: function(test) {
        var testArr = ['one', 'two', 'three', 'two', 'three', 'three'];

        test.strictEqual(testArr.count('one'), 1, 'Can count a single instance of the target');
        test.strictEqual(testArr.count('two'), 2, 'Can count multiple instances of the target');
        test.strictEqual(testArr.count('four'), 0, 'Can count zero instances of the target');

        test.strictEqual([].count('wat'), 0, 'Can handle an empty array');
        test.done();
    },

    testExtend: function(test) {
        var testArr = ['one', 'two', 'three'];
        var anotherArr = [1, 2, 3];
        var anObj = {'who': 'me', 'what': 'that', 'when': 'now', 'where': 'here', 'why': 'because'};

        testArr.extend(anotherArr);
        test.deepEqual(testArr, ['one', 'two', 'three', 1, 2, 3], 'Can extend an array by another array');

        anotherArr.extend([]);
        test.deepEqual(anotherArr, [1, 2, 3], 'Can extend an array with an empty array');

        anotherArr.extend(anObj);
        test.deepEqual(anotherArr, [1, 2, 3, 'me', 'that', 'now', 'here', 'because'], 'Can extend an array with an object');

        anotherArr = [1, 2, 3];
        anotherArr.extend({});
        test.deepEqual(anotherArr, [1, 2, 3], 'Can extend an array with an empty object');

        test.throws(
            function() {
                testArr.extend('strang');
            },
            TypeError,
            'Throws an error when trying to extend an array with something other than an iterable.'
        );
        test.done();
    },

    testIndex: function(test) {
        var testArr = ['one', 'two', 'three'];

        test.strictEqual(testArr.index('one'), 0, 'Can give the index of the first item');
        test.strictEqual(testArr.index('two'), 1, 'Can give the index of an item in the middle');
        test.strictEqual(testArr.index('three'), 2, 'Can give the index of the last item');

        test.throws(
            function() {
                testArr.index('four');
            },
            /ValueError/,
            'Throws a ValueError when the item is not in the array'
        );

        test.throws(
            function() {
                var empty = [];
                empty.index('four');
            },
            /ValueError/,
            'Throws a ValueError when an array is empty'
        );
        test.done();
    },

    testInsert: function(test) {
        // Nothing fancy, as the args just get passed along to splice
        var testArr = ['one', 'three'];

        testArr.insert(1, 'two');
        test.deepEqual(testArr, ['one', 'two', 'three'], 'Can insert an item into the array at a given index');
        test.done();
    },

    testPopItem: function(test) {
        var testArr = ['one', 'two', 'three'];

        var first = testArr.popItem(0);
        test.strictEqual(first, 'one', 'The popped item at index 0 matches expected.');
        test.deepEqual(testArr, ['two', 'three'], 'The array that was popped off of was modified correctly.');

        var last = testArr.popItem(1);
        test.strictEqual(last, 'three', 'The popped item at index 1 matches expected.');
        test.deepEqual(testArr, ['two'], 'The array that was popped off of was modified correctly.');

        test.throws(
            function() {
                testArr.popItem(1);
            },
            /IndexError/,
            'Throws an IndexError when index is invalid.'
        );
        test.done();
    },

    testRemove: function(test) {
        var testArr = ['one', 'two', 'three'];

        testArr.remove('one');
        test.deepEqual(testArr, ['two', 'three'], 'The array that was removed from at the beginning was modified correctly.');

        testArr.remove('three');
        test.deepEqual(testArr, ['two'], 'The array that was removed from at the end was modified correctly.');

        test.throws(
            function() {
                testArr.remove('four');
            },
            /ValueError/,
            'Throws a ValueError when passed item is not in the array.'
        );
        test.done();
    }
};
