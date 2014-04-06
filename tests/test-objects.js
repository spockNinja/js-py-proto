/*
 * This file tests all of the object functions
 */

require('../build/js-py-proto')();

exports.objectTests = {

    testClear: function(test) {
        var testObj = {'one': 1, 'two': 'two', 'three': false};
        testObj.clear();
        test.deepEqual(testObj, {}, 'Can clear out an Object\'s properties');

        var emptyObj = {};
        emptyObj.clear();
        test.deepEqual(emptyObj, {}, 'Can handle an empty Object');
        test.done();
    },

    testCopy: function(test) {
        var testObj = {'one': 1, 'two': 'two', 'three': false};
        var copyObj = testObj.copy();

        test.deepEqual(testObj, copyObj, 'Can copy one Object\'s properties into another Object');

        testObj.one = 'one';
        testObj.two = 2;
        copyObj.three = true;
        test.notStrictEqual(testObj.one, copyObj.one, 'Changing one Object\'s properties does not affect the copied Object');
        test.notStrictEqual(testObj.two, copyObj.two, 'Changing one Object\'s properties does not affect the copied Object');
        test.notStrictEqual(testObj.three, copyObj.three, 'Changing one Object\'s properties does not affect the copied Object');

        var emptyObj = {};
        var copiedEmptyObj = emptyObj.copy();
        test.deepEqual(emptyObj, copiedEmptyObj, 'Can handle an empty Object');
        test.done();
    },

    testFromkeys: function(test) {
        var fromArray = ['one', 'two', 'three'];

        var testObj = Object.fromkeys(fromArray);
        test.deepEqual(testObj, {'one': null, 'two': null, 'three': null}, 'Can create a new object from a list of keys with no given value');

        var testObj2 = Object.fromkeys(fromArray, 'not null');
        test.deepEqual(testObj2, {'one': 'not null', 'two': 'not null', 'three': 'not null'}, 'Can create a new object from a list of keys with a given value');

        var emptyArray = [];
        var emptyObj = Object.fromkeys(emptyArray);
        test.deepEqual(emptyObj, {}, 'Can handle an empty array');
        test.done();
    },

    testGetVal: function(test) {
        var testObj = {'one': 1, 'two': 'two', 'three': false};

        test.strictEqual(testObj.getVal('one'), 1, 'Can get a simple property out of an Object');
        test.strictEqual(testObj.getVal('two'), 'two', 'Can get a simple property out of an Object');
        test.strictEqual(testObj.getVal('three'), false, 'Can get a simple property out of an Object');

        test.strictEqual(testObj.getVal('notHere'), null, 'Can return null when the key to get is not in the Object and no default is given');
        test.strictEqual(testObj.getVal('notHere', 'default'), 'default', 'Can return default when the key to get is not in the Object');
        test.done();
    },

    testHasKey: function(test) {
        // don't need to test much, it uses Object.hasOwnProperty
        var testObj = {'one': 1, 'two': 'two', 'three': false};

        test.strictEqual(testObj.hasKey('one'), true, 'Can return true when a key is present');
        test.strictEqual(testObj.hasKey('nope'), false, 'Can return false when a key is not present');
        test.done();
    },

    testItems: function(test) {
        var testObj = {'one': 1, 'two': 'two', 'three': false};

        test.deepEqual(testObj.items(), [['one', 1], ['two', 'two'], ['three', false]], 'Can return an array of [key, value] arrays representing an Object');
        test.deepEqual({}.items(), [], 'Can handle an empty Object');
        test.done();
    },

    testPop: function(test) {
        var testObj = {'one': 1, 'two': 'two', 'three': false};

        var popped = testObj.pop('one');
        test.strictEqual(popped, 1, 'Can pop the currect value at a given key');
        test.deepEqual(testObj, {'two': 'two', 'three': false}, 'Removed the key when it was popped');

        var popped = testObj.pop('nope', 'default');
        test.strictEqual(popped, 'default', 'Can return a default when key is not present to pop');
        test.deepEqual(testObj, {'two': 'two', 'three': false}, 'Did not change the Object when no key was popped');

        test.throws(
            function() {
                testObj.pop('nope');
            },
            /KeyError/,
            'Can throw a KeyError when key is not found and default is not given'
        );
        test.done();
    },

    testPopitem: function(test) {
        var testObj = {'one': 1, 'two': 'two', 'three': false};
        var keys = ['one', 'two', 'three'];
        var values = [1, 'two', false];

        var popped = testObj.popitem();
        var poppedKeyIdx = keys.indexOf(popped[0]);
        var poppedValIdx = values.indexOf(popped[1]);
        test.notStrictEqual(poppedKeyIdx, -1, 'The key was a valid key from the object');
        test.notStrictEqual(poppedValIdx, -1, 'The value was a valid value from the object');
        test.strictEqual(poppedKeyIdx, poppedValIdx, 'The popped key and value are a matching pair');

        test.strictEqual(testObj[popped[0]], undefined, 'The popped item is no longer present on the Object');

        test.throws(
            function() {
                var testy = {};
                testy.popitem();
            },
            /KeyError/,
            'Can throw a KeyError when the object is empty'
        );
        test.done();
    },

    testSetdefault: function(test) {
        var testObj = {'one': 1, 'two': 'two', 'three': false};

        test.strictEqual(testObj.setdefault('one', 'one'), 1, 'Returns the current value when key is present');
        test.strictEqual(testObj.setdefault('four', 'default'), 'default', 'Returns the default value when key is not present');
        test.strictEqual(testObj.four, 'default', 'The value was set on the object when the key was not already presnt');

        test.strictEqual(testObj.setdefault('five'), null, 'Returns null when key is not present and default is not given');
        test.strictEqual(testObj.five, null, 'The value was set to null on the object when the key was not already presnt and default was not given');
        test.done();
    },

    testUpdate: function(test) {
        var testObj = {'one': 1, 'two': 'two', 'three': false};

        testObj.update({'four': 'another item'});
        test.strictEqual(testObj.four, 'another item', 'Adds a key/value pair for an item that did not already exist');
        test.deepEqual(testObj, {'one': 1, 'two': 'two', 'three': false, 'four': 'another item'}, 'Does not make any other changes to the Object');

        var testObj2 = {'two': 2};
        testObj2.update(testObj);
        test.deepEqual(testObj2, testObj, 'Can update with multiple keys and overwrite an existing key');

        var emptyObj = {};
        emptyObj.update({});
        test.deepEqual(emptyObj, {}, 'Can handle empty Objects');
        test.done();
    },

    testValues: function(test) {
        var testObj = {'one': 1, 'two': 'two', 'three': false};

        test.deepEqual(testObj.values(), [1, 'two', false], 'Can return an array of values in a simple Object');

        test.deepEqual(testObj, {'one': 1, 'two': 'two', 'three': false}, 'Did not change the source Object');
        
        var emptyObj = {};
        test.deepEqual(emptyObj.values(), [], 'Can handle an empty Object');
        test.done();
    }
};
