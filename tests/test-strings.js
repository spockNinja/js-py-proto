/*
 * This file tests all of the String functions
 */
module("String");

test( "capitalize", function(assert) {
    assert.strictEqual('capitalize me'.capitalize(), 'Capitalize me', 'Can capitalize correctly');
    assert.strictEqual('Already capitalized'.capitalize(), 'Already capitalized', 'Does not change capitalized strings');
    assert.strictEqual(''.capitalize(), '', 'Handles empty strings');
    assert.strictEqual('1234'.capitalize(), '1234', 'Handles non-alphabetic strings');
});

test( "center", function(assert) {
    var centerMe = 'center me';

    assert.strictEqual(centerMe.center(11), ' center me ', 'Can center even diffs');
    assert.strictEqual(centerMe.center(10), 'center me ', 'Can center odd diffs');
    assert.strictEqual(centerMe.center(13), '  center me  ', 'Can center longer even diffs');
    assert.strictEqual(centerMe.center(12), ' center me  ', 'Can center longer odd diffs');

    assert.strictEqual(centerMe.center(11, '-'), '-center me-', 'Can center even diffs with fillchar');
    assert.strictEqual(centerMe.center(10, '-'), 'center me-', 'Can center odd diffs with fillchar');
    assert.strictEqual(centerMe.center(13, '-'), '--center me--', 'Can center longer even diffs with fillchar');
    assert.strictEqual(centerMe.center(12, '-'), '-center me--', 'Can center longer odd diffs with fillchar');

    assert.strictEqual(centerMe.center(9), 'center me', 'Does not change string of equal width');
    assert.strictEqual(centerMe.center(7), 'center me', 'Does not change string of greater width');

    assert.throws(
        function() {
            centerMe.center(11, '--');
        },
        /TypeError/,
        'Throws a TypeError when fillchars is too long'
    );
});

test( "count", function(assert) {
    assert.strictEqual('sub'.count('sub'), 1, 'Can count one simple occurence');
    assert.strictEqual('sub##'.count('sub'), 1, 'Can count one occurence at the beginning of the string');
    assert.strictEqual('#sub#'.count('sub'), 1, 'Can count one occurence in the middle of the string');
    assert.strictEqual('##sub'.count('sub'), 1, 'Can count one occurence at the end of the string');

    assert.strictEqual('subsub'.count('sub'), 2, 'Can count two simple occurences');
    assert.strictEqual('sub sub'.count('sub'), 2, 'Can count two spaced occurences');
    assert.strictEqual('susub subub'.count('sub'), 2, 'Can count two occurences with partial occurences');

    assert.strictEqual('sub'.count('sub', 0, 3), 1, 'Can count one simple occurence within full range');
    assert.strictEqual('sub'.count('sub', 1, 3), 0, 'Can count zero occurences with shortened start range');
    assert.strictEqual('sub'.count('sub', 0, 2), 0, 'Can count zero occurences with shortened end range');

    assert.strictEqual('abc'.count('sub'), 0, 'Can count zero occurences in a simple comparison');
    assert.strictEqual('abc'.count('sub'), 0, 'Can count zero occurences in a simple comparison');

    assert.strictEqual('subub dubity sub dib dub sib sub'.count('sub'), 3, 'Can count three occurences in a mixed string');
    assert.strictEqual('subub dubity sub dib dub sib sub'.count('sub', 1), 2, 'Can count two occurences in a mixed string with a shortened start range');
    assert.strictEqual('subub dubity sub dib dub sib sub'.count('sub', 0, 31), 2, 'Can count two occurences in a mixed string with a shortened end range');
});

test( "endswith", function(assert) {
    var testEnds = 'endswith';

    assert.strictEqual(testEnds.endswith('with'), true, 'Can see a simple case of ending with');
    assert.strictEqual(testEnds.endswith('endswith'), true, 'Can see a case of ending with when the entire string matches');
    assert.strictEqual(testEnds.endswith('what'), false, 'Can see a simple case of not ending with');
    assert.strictEqual('endswithsith'.endswith('ith'), true, 'Can see a case of ending with while the subtring is also present elsewhere');

    assert.strictEqual(testEnds.endswith('with', 3), true, 'Can see a simple case of ending with on a sliced string');
    assert.strictEqual(testEnds.endswith('with', 0, 5), false, 'Can see a simple case of not ending with on a sliced string');
    assert.strictEqual(testEnds.endswith('wit', 3, 7), true, 'Can see a case of ending with on a sliced string that matches the entire string');
});

test( "find", function(assert) {
    var testFind = 'finding';

    assert.strictEqual(testFind.find('find'), 0, 'Can find a simple string at the start of the subject string');
    assert.strictEqual(testFind.find('ing'), 4, 'Can find a simple string at the end of the subject string');
    assert.strictEqual(testFind.find('ind'), 1, 'Can find a simple string in the middle of the subject string');

    assert.strictEqual(testFind.find('find', 0, 4), 0, 'Can find a simple string equal to the slice of subject string');
    assert.strictEqual(testFind.find('find', 0, 3), -1, 'Can not find a simple string when the slice cuts out the target');
    assert.strictEqual(testFind.find('ing', 3), 4, 'Can find a simple string when the slice equals the target');
});

test( "format", function(assert) {
    var testFormatDict = '{first}, {{second}} + {1}';
    var testFormatList = '{0}, {{1}} + {a}';
    var testUndefined = '{undefined}';

    assert.strictEqual(testFormatDict.format({first: 'indeed'}), 'indeed, {{second}} + {1}', 'Can format a single arg dict correctly');
    assert.strictEqual(testFormatDict.format({first: 'indeed', second: 'good sir'}), 'indeed, {good sir} + {1}', 'Can format multiple args dict correctly');
    assert.strictEqual(testFormatDict.format({first: 'indeed', second: 'good sir', 1: 'quite'}), 'indeed, {good sir} + quite', 'Can format multiple args dict correctly with a number as a key');
    assert.strictEqual(testFormatDict.format({first: 'indeed', second: 'good sir', 1: 'quite', another: 'nope'}), 'indeed, {good sir} + quite', 'Can handle the lack of a place to replace an arg');

    assert.strictEqual(testFormatList.format(['indeed']), 'indeed, {{1}} + {a}', 'Can format a single arg list correctly');
    assert.strictEqual(testFormatList.format(['indeed', 'good sir']), 'indeed, {good sir} + {a}', 'Can format a multiple arg list correctly');
    assert.strictEqual(testFormatList.format(['indeed', 'good sir', 'another?']), 'indeed, {good sir} + {a}', 'Can handle the lack of a place to replace an arg');

    assert.strictEqual(testUndefined.format({first: 'meh'}), testUndefined, 'Can format a string with {undefined} in it appropriately using a dict');
    assert.strictEqual(testUndefined.format(['bluh']), testUndefined, 'Can format a string with {undefined} in it appropriately using a list');

    assert.strictEqual(testFormatDict.format({}), testFormatDict, 'Can handle empty dicts');
    assert.strictEqual(testFormatList.format({}), testFormatList, 'Can handle empty lists');
});

test( "index", function(assert) {
    // Don't need to test too much, as it uses find
    // Just test that -1 throws ValueError
    var testIndex = 'indices';
    assert.throws(
        function() {
            testIndex.index('abc');
        },
        /ValueError/,
        'Throws a ValueError when string is not found'
    );
    assert.throws(
        function() {
            testIndex.index('abc', 2, 5);
        },
        /ValueError/,
        'Throws a ValueError when string is not found in a slice'
    );
});
