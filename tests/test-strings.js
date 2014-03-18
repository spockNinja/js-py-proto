/*
 * This file tests all of the String functions
 */

test( "Test String.capitalize", function(assert) {
    assert.strictEqual('capitalize me'.capitalize(), 'Capitalize me', 'Can capitalize correctly');
    assert.strictEqual('Already capitalized'.capitalize(), 'Already capitalized', 'Does not change capitalized strings');
    assert.strictEqual(''.capitalize(), '', 'Handles empty strings');
    assert.strictEqual('1234'.capitalize(), '1234', 'Handles non-alphabetic strings');
});

test( "Test String.center", function(assert) {
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
        'Throws a TypeError when fillchars is too long.'
    );
});

test( "Test String.count", function(assert) {
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

