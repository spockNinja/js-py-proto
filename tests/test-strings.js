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
        TypeError,
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

test( "isalnum", function(assert) {
    assert.ok('abc123'.isalnum(), 'Can verify a simple alphanumeric string');
    assert.ok(!'abc 123'.isalnum(), 'Does not consider a space to be alphanumeric');
    assert.ok(!'abc_123'.isalnum(), 'Does not consider an underscore to be alphanumeric');
    assert.ok(!'a@b$c&1!2#3*'.isalnum(), 'Does not consider special characters to be alphanumeric');
    assert.ok('a1b2c3'.isalnum(), 'Can verify a mixed alphanumeric string');
    assert.ok(!''.isalnum(), 'Requires at least one character');
});

test( "isalpha", function(assert) {
    assert.ok('abcdefg'.isalpha(), 'Can verify a simple alphabetic string');
    assert.ok(!' abc '.isalpha(), 'Does not consider a space to be alphabetic');
    assert.ok(!'_abc_'.isalpha(), 'Does not consider an underscore to be alphabetic');
    assert.ok(!'a@b$c&D!E#D*'.isalpha(), 'Does not consider special characters to be alphabetic');
    assert.ok('aBcDeF'.isalpha(), 'Can verify a mixed case string');
    assert.ok(!''.isalpha(), 'Requires at least one character');
});

test( "isdigit", function(assert) {
    assert.ok('123456'.isdigit(), 'Can verify a simple numeric string');
    assert.ok(!' 123 '.isdigit(), 'Does not consider a space to be numeric');
    assert.ok(!'_123_'.isdigit(), 'Does not consider an underscore to be numeric');
    assert.ok(!'1@2$3&4!5#6*'.isdigit(), 'Does not consider special characters to be numeric');
    assert.ok(!''.isdigit(), 'Requires at least one character');
});

test( "islower", function(assert) {
    assert.ok('abcdefg'.islower(), 'Can verify a simple lowercase string');
    assert.ok('spaces are fine'.islower(), 'Does not care about spaces');
    assert.ok('1as ar3 number5'.islower(), 'Does not care about digits');
    assert.ok('a@b$c&d!e#f*'.islower(), 'Does not care about special characters');
    assert.ok(!'Uppers ARE NOT cool'.islower(), 'Is false when uppercase letters are present');
    assert.ok(!''.islower(), 'Requires at least one character');
    assert.ok(!'123!@#_ '.islower(), 'Requires at least one cased character');
});

test( "isspace", function(assert) {
    assert.ok('   '.isspace(), 'Can verify a simple spacey string');
    assert.ok('\t'.isspace(), 'Considers tabs');
    assert.ok('\n'.isspace(), 'Considers newlines');
    assert.ok(!'O+her 5tuff d*3s n0t W0rk'.isspace(), 'Is false when non spacey characters are present');
    assert.ok(!''.isspace(), 'Requires at least one character');
});

test( "istitle", function(assert) {
    assert.ok('Capitalized'.istitle(), 'Can verify a simple Titled string');
    assert.ok('Multiple Capitalized'.istitle(), 'Can verify a Titled string with multiple words');
    assert.ok(!'3 Numbers 4 Matt3r'.istitle(), 'Numbers are not considered a title string');
    assert.ok(!'lower is certainly not titled'.istitle(), 'Can verify that lowercase words are not titled');
    assert.ok(!''.istitle(), 'Requires at least one character');
});

test( "isupper", function(assert) {
    assert.ok('UPPER'.isupper(), 'Can verify a simple uppercase string');
    assert.ok('A B C D'.isupper(), 'Does not care about spaces');
    assert.ok('A1B2C3D4'.isupper(), 'Does not care about digits');
    assert.ok('A@B$C&D!'.isupper(), 'Does not care about special characters');
    assert.ok(!'lower'.isupper(), 'Can verify that lowercase words are not uppercase');
    assert.ok(!''.isupper(), 'Requires at least one character');
    assert.ok(!'123!@#_ '.isupper(), 'Requires at least one cased character');
});

test( "join", function(assert) {
    var testList = ['first', 'second', 'third'];
    var testDict = {'one': 1, 'two': 2, 'three': 3};

    assert.strictEqual(''.join(testList), 'firstsecondthird', 'Can join a simple list on an empty string');
    assert.strictEqual(''.join(testDict), 'onetwothree', 'Can join a simple dict on an empty string');
    assert.strictEqual(' '.join(testList), 'first second third', 'Can join a simple list on a space');
    assert.strictEqual(' '.join(testDict), 'one two three', 'Can join a simple dict on a space');
    assert.strictEqual('-'.join(testList), 'first-second-third', 'Can join a simple list on a hyphen');
    assert.strictEqual('-'.join(testDict), 'one-two-three', 'Can join a simple dict on a hyphen');
    assert.strictEqual(', '.join(testList), 'first, second, third', 'Can join a simple list on a multichar string');
    assert.strictEqual(', '.join(testDict), 'one, two, three', 'Can join a simple dict on a multichar string');

    assert.strictEqual(' '.join([]), '', 'Can handle an empty list');
    assert.strictEqual(' '.join({}), '', 'Can handle an empty dict');
});

test( "ljust", function(assert) {
    assert.strictEqual('justify me'.ljust(15), 'justify me     ', 'Can left justify a simple string');
    assert.strictEqual('justify me'.ljust(15, '-'), 'justify me-----', 'Can left justify a simple string');
    assert.strictEqual('justify me'.ljust(4), 'justify me', 'Returns the base string when width is less than base string length');

    assert.strictEqual(''.ljust(3), '   ', 'Can handle an empty base string');
    assert.strictEqual(''.ljust(3, '-'), '---', 'Can handle an empty base string with a hyphen fillchar');
    assert.strictEqual(''.ljust(0), '', 'Can handle an empty base string with 0 width');

    assert.throws(
        function() {
            var testy = 'justify me'.ljust(15, '--');
        },
        TypeError,
        'Throws a TypeError whenever the fillchar is too long'
    );

    assert.throws(
        function() {
            var testy = 'justify me'.ljust(15, '');
        },
        TypeError,
        'Throws a TypeError whenever the fillchar is too short'
    );
});

test( "lower", function(assert) {
    // No need for too much here since it's using String.toLowerCase under the hood
    assert.strictEqual('UPPERCASE'.lower(), 'uppercase', 'Uses toLowerCase');
});

test( "lstrip", function(assert) {
    assert.strictEqual('   start here'.lstrip(), 'start here', 'Can remove spaces from the beginning of a simple string');
    assert.strictEqual('\n\tstart here'.lstrip(), 'start here', 'Can remove tabs and newlines from the beginning of a simple string');
    assert.strictEqual('   start here  '.lstrip(), 'start here  ', 'Does not remove spaces from the end of a simple string');
    assert.strictEqual('\n\tstart here\n\t'.lstrip(), 'start here\n\t', 'Does not remove tabs and newlines from the end of a simple string');
    assert.strictEqual('\n\tstart\n\there'.lstrip(), 'start\n\there', 'Does not remove tabs and newlines from the middle of a simple string');

    assert.strictEqual('abcstart here'.lstrip('abc'), 'start here', 'Can remove a given character set from the beginning of a simple string');
    assert.strictEqual('bcastart here'.lstrip('abc'), 'start here', 'Can remove a given character set in any order from the beginning of a simple string');
    assert.strictEqual('abcstart hereabc'.lstrip('abc'), 'start hereabc', 'Does not remove a given character set from the end of a simple string');
    assert.strictEqual('abcstartabchere'.lstrip('abc'), 'startabchere', 'Does not remove a given character set from the middle of a simple string');

    assert.strictEqual(''.lstrip(), '', 'Can handle an empty base string.');
    assert.strictEqual('  abc'.lstrip(''), '  abc', 'Can handle an empty character set.');
});

test( "partition", function(assert) {
    assert.deepEqual('first,second'.partition(','), ['first', ',', 'second'], 'Can partition a simple string on a simple separator');
    assert.deepEqual('first---second'.partition('---'), ['first', '---', 'second'], 'Can partition a simple string on a multichar separator');
    assert.deepEqual('first,second,third'.partition(','), ['first', ',', 'second,third'], 'Can partition a simple string with multiple instances of separator');
    assert.deepEqual('first.second'.partition(','), ['first.second', '', ''], 'Returns correct result when separator is not found');

    assert.deepEqual(''.partition(','), ['', '', ''], 'Can handle an empty base string');

    assert.throws(
        function() {
            var testy = 'first,second'.partition('');
        },
        /ValueError: empty separator/,
        "Throws a ValueError when the separator is empty"
    );
});

test( "rfind", function(assert) {
    var findThis = "find something in this string";
    assert.strictEqual(findThis.rfind('ing'), 26, 'Can correctly identify the rightmost index of a substring that is at the very end of the string');
    assert.strictEqual(findThis.rfind('in'), 26, 'Can correctly identify the rightmost index of a substring that is not at the end of the string');
    assert.strictEqual(findThis.rfind('in', 0, 24), 15, 'Can correctly identify the rightmost index of a substring that is not at the end of the string');
    assert.strictEqual(findThis.rfind('in', 4, 24), 15, 'Can correctly identify the rightmost index of a substring when not starting at 0');

    assert.strictEqual(findThis.rfind('what'), -1, 'Can correctly identify that a substring is not present in the base string');
    assert.strictEqual(findThis.rfind('ring', 0, 27), -1, 'Can correctly identify that a substring is not present in a slice of the base string');
    assert.strictEqual(findThis.rfind('ring', 5, 27), -1, 'Can correctly identify that a substring is not present when not starting at 0');

    assert.strictEqual(findThis.rfind(''), 29, 'Behaves as python rfind does where empty strings are located at the end of the string');
    assert.strictEqual(''.rfind('something'), -1, 'Can handle empty base strings');
});

test( "rindex", function(assert) {
    // it uses rfind under the hood, so we just need to test the -1 case
    assert.throws(
        function() {
            var testy = 'not in here'.rindex('wat');
        },
        /ValueError/,
        "Throws an error when the string is not found"
    );

    assert.throws(
        function() {
            var testy = 'not in here'.rindex('wat', 2, 7);
        },
        /ValueError/,
        "Throws an error when the string is not found in a slice of the base string"
    );
});

test( "rjust", function(assert) {
    var justifyThis = "JUSTICE";
    assert.strictEqual(justifyThis.rjust(10), '   JUSTICE', 'Can right justify a simple string');
    assert.strictEqual(justifyThis.rjust(10, '-'), '---JUSTICE', 'Can right justify a simple string with specified fillchar');
    assert.strictEqual(justifyThis.rjust(4), justifyThis, 'Returns the base string when width is less than base string length');

    assert.strictEqual(''.rjust(3), '   ', 'Can handle an empty base string');
    assert.strictEqual(''.rjust(3, '-'), '---', 'Can handle an empty base string with a hyphen fillchar');
    assert.strictEqual(''.rjust(0), '', 'Can handle an empty base string with 0 width');

    assert.throws(
        function() {
            var testy = 'JUSTICE'.rjust(15, '--');
        },
        TypeError,
        'Throws a TypeError whenever the fillchar is too long'
    );

    assert.throws(
        function() {
            var testy = 'JUSTICE'.rjust(15, '');
        },
        TypeError,
        'Throws a TypeError whenever the fillchar is too short'
    );
});

test( "rpartition", function(assert) {
    assert.deepEqual('first,second'.rpartition(','), ['first', ',', 'second'], 'Can partition a simple string on a simple separator');
    assert.deepEqual('first---second'.rpartition('---'), ['first', '---', 'second'], 'Can partition a simple string on a multichar separator');
    assert.deepEqual('first,second,third'.rpartition(','), ['first,second', ',', 'third'], 'Can partition a simple string with multiple instances of separator');
    assert.deepEqual('first.second'.rpartition(','), ['first.second', '', ''], 'Returns correct result when separator is not found');

    assert.deepEqual(''.rpartition(','), ['', '', ''], 'Can handle an empty base string');

    assert.throws(
        function() {
            var testy = 'first,second'.rpartition('');
        },
        /ValueError: empty separator/,
        "Throws a ValueError when the separator is empty"
    );
});

test( "rstrip", function(assert) {
    assert.strictEqual('clean up    '.rstrip(), 'clean up', 'Can remove spaces from the end of a simple string');
    assert.strictEqual('clean up\n\t'.rstrip(), 'clean up', 'Can remove tabs and newlines from the end of a simple string');
    assert.strictEqual('   clean up   '.rstrip(), '   clean up', 'Does not remove spaces from the beginning of a simple string');
    assert.strictEqual('\n\tclean up\n\t'.rstrip(), '\n\tclean up', 'Does not remove tabs and newlines from the beginning of a simple string');
    assert.strictEqual('clean\n\tup\n\t'.rstrip(), 'clean\n\tup', 'Does not remove tabs and newlines from the middle of a simple string');

    assert.strictEqual('clean upabc'.rstrip('abc'), 'clean up', 'Can remove a given character set from the end of a simple string');
    assert.strictEqual('clean upbca'.rstrip('abc'), 'clean up', 'Can remove a given character set in any order from the end of a simple string');
    assert.strictEqual('abcclean upabc'.rstrip('abc'), 'abcclean up', 'Does not remove a given character set from the beginning of a simple string');
    assert.strictEqual('cleanabcupabc'.rstrip('abc'), 'cleanabcup', 'Does not remove a given character set from the middle of a simple string');

    assert.strictEqual(''.rstrip(), '', 'Can handle an empty base string.');
    assert.strictEqual('abc   '.lstrip(''), 'abc   ', 'Can handle an empty character set.');
});

test( "splitlines", function(assert) {
    assert.deepEqual('two\nlines'.splitlines(), ['two', 'lines'], 'Can split on a simple newline character');
    assert.deepEqual('two\nlines'.splitlines(true), ['two\n', 'lines'], 'Can keep the newlines intact');
    assert.deepEqual('two\nlines\n'.splitlines(true), ['two\n', 'lines\n'], 'Can keep the newlines intact even when ending on a newline');
    assert.deepEqual('one line'.splitlines(), ['one line'], 'Can handle strings with no newlines characters');
    assert.deepEqual(''.splitlines(), [], 'Can handle empty strings');
});

test( "startswith", function(assert) {
    var testStart = 'startswith';

    assert.strictEqual(testStart.startswith('start'), true, 'Can see a simple case of starting with');
    assert.strictEqual(testStart.startswith('startswith'), true, 'Can see a case of starting with when the entire string matches');
    assert.strictEqual(testStart.startswith('what'), false, 'Can see a simple case of not starting with');
    assert.strictEqual('startswithstars'.startswith('star'), true, 'Can see a case of starting with while the subtring is also present elsewhere');

    assert.strictEqual(testStart.startswith('art', 2), true, 'Can see a simple case of starting with on a sliced string');
    assert.strictEqual(testStart.startswith('start', 2), false, 'Can see a simple case of not starting with on a sliced string');
    assert.strictEqual(testStart.startswith('arts', 2, 6), true, 'Can see a case of starting with on a sliced string that matches the entire string');
});

test( "strip", function(assert) {
    // uses rstrip and lstrip internally, so just check that both work together
    assert.strictEqual('   abc   '.strip(), 'abc', 'Can remove spaces from the start and end of a string');
    assert.strictEqual('\n\tabc\n\t'.strip(), 'abc', 'Can remove tabs and newlines from the start and end of a string');
    assert.strictEqual('  a b c  '.strip(), 'a b c', 'Does not remove spaces from the middle of the string');
    assert.strictEqual('\n\ta\nb\tc\n\t'.strip(), 'a\nb\tc', 'Does not remove tabs and newlines from the middle of the string');

    assert.strictEqual('123clean up123'.strip('123'), 'clean up', 'Can remove a given character set from the start and end of a simple string');
    assert.strictEqual('312clean up213'.strip('123'), 'clean up', 'Can remove a given character set in any order from the start and end of a simple string');
    assert.strictEqual('321clean312up231'.strip('123'), 'clean312up', 'Does not remove a given character set from the middle of a simple string');

    assert.strictEqual(''.strip(), '', 'Can handle an empty base string.');
    assert.strictEqual('   abc   '.lstrip(''), '   abc   ', 'Can handle an empty character set.');
});

test( "swapcase", function(assert) {
    assert.strictEqual('abcd'.swapcase(), 'ABCD', 'Can swap the case of a simple lowercase string');
    assert.strictEqual('ABCD'.swapcase(), 'abcd', 'Can swap the case of a simple uppercase string');
    assert.strictEqual('AbcD'.swapcase(), 'aBCd', 'Can swap the case of a simple mixed-case string');

    assert.strictEqual('A complicated $tr1nG'.swapcase(), 'a COMPLICATED $TR1Ng', 'Can swap the case of a complicated string');
    assert.strictEqual('123 !@# )(*'.swapcase(), '123 !@# )(*', 'Does not change a string with no cased characters');
    assert.strictEqual(''.swapcase(), '', 'Can handle an empty string');
});

test( "title", function(assert) {
    assert.strictEqual('a simple titleable string'.title(), 'A Simple Titleable String', 'Can titlecase a simple lowercase string');
    assert.strictEqual('A SIMPLE TITLEABLE STRING'.title(), 'A Simple Titleable String', 'Can titlecase a simple uppercase string');
    assert.strictEqual('a String with some Titled words'.title(), 'A String With Some Titled Words', 'Can titlecase a string that alread contains title words');

    assert.strictEqual("a string's titling isn't always easy".title("'"), "A String's Titling Isn't Always Easy", 'Can titlecase a string correctly when given an apostrophe as not a word boundary');
    assert.strictEqual("a hyphen-ated string should-work".title("-"), "A Hyphen-ated String Should-work", 'Can titlecase a string correctly when given a hyphen as not a word boundary');
    assert.strictEqual('a normal string'.title(''), 'A Normal String', 'Can handle the empty string passed for notWordBoundaries');
    assert.strictEqual(''.title(), '', 'Can handle the empty string');
});

test( "zfill", function(assert) {
    // uses rjust internally, so just test that '0's are used
    assert.strictEqual('1234'.zfill(10), '0000001234', 'Can fill correctly with 0s');
});
