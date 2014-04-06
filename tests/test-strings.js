/*
 * This file tests all of the String functions
 */

require('../build/js-py-proto')();

exports.stringTests = {

    testCapitalize: function(test) {
        test.strictEqual('capitalize me'.capitalize(), 'Capitalize me', 'Can capitalize correctly');
        test.strictEqual('Already capitalized'.capitalize(), 'Already capitalized', 'Does not change capitalized strings');
        test.strictEqual(''.capitalize(), '', 'Handles empty strings');
        test.strictEqual('1234'.capitalize(), '1234', 'Handles non-alphabetic strings');
        test.done();
    },

    testCenter: function(test) {
        var centerMe = 'center me';
    
        test.strictEqual(centerMe.center(11), ' center me ', 'Can center even diffs');
        test.strictEqual(centerMe.center(10), 'center me ', 'Can center odd diffs');
        test.strictEqual(centerMe.center(13), '  center me  ', 'Can center longer even diffs');
        test.strictEqual(centerMe.center(12), ' center me  ', 'Can center longer odd diffs');
    
        test.strictEqual(centerMe.center(11, '-'), '-center me-', 'Can center even diffs with fillchar');
        test.strictEqual(centerMe.center(10, '-'), 'center me-', 'Can center odd diffs with fillchar');
        test.strictEqual(centerMe.center(13, '-'), '--center me--', 'Can center longer even diffs with fillchar');
        test.strictEqual(centerMe.center(12, '-'), '-center me--', 'Can center longer odd diffs with fillchar');
    
        test.strictEqual(centerMe.center(9), 'center me', 'Does not change string of equal width');
        test.strictEqual(centerMe.center(7), 'center me', 'Does not change string of greater width');
    
        test.throws(
            function() {
                centerMe.center(11, '--');
            },
            TypeError,
            'Throws a TypeError when fillchars is too long'
        );
        test.done();
    },
    
    testCount: function(test) {
        test.strictEqual('sub'.count('sub'), 1, 'Can count one simple occurence');
        test.strictEqual('sub##'.count('sub'), 1, 'Can count one occurence at the beginning of the string');
        test.strictEqual('#sub#'.count('sub'), 1, 'Can count one occurence in the middle of the string');
        test.strictEqual('##sub'.count('sub'), 1, 'Can count one occurence at the end of the string');
    
        test.strictEqual('subsub'.count('sub'), 2, 'Can count two simple occurences');
        test.strictEqual('sub sub'.count('sub'), 2, 'Can count two spaced occurences');
        test.strictEqual('susub subub'.count('sub'), 2, 'Can count two occurences with partial occurences');
    
        test.strictEqual('sub'.count('sub', 0, 3), 1, 'Can count one simple occurence within full range');
        test.strictEqual('sub'.count('sub', 1, 3), 0, 'Can count zero occurences with shortened start range');
        test.strictEqual('sub'.count('sub', 0, 2), 0, 'Can count zero occurences with shortened end range');
    
        test.strictEqual('abc'.count('sub'), 0, 'Can count zero occurences in a simple comparison');
        test.strictEqual('abc'.count('sub'), 0, 'Can count zero occurences in a simple comparison');
    
        test.strictEqual('subub dubity sub dib dub sib sub'.count('sub'), 3, 'Can count three occurences in a mixed string');
        test.strictEqual('subub dubity sub dib dub sib sub'.count('sub', 1), 2, 'Can count two occurences in a mixed string with a shortened start range');
        test.strictEqual('subub dubity sub dib dub sib sub'.count('sub', 0, 31), 2, 'Can count two occurences in a mixed string with a shortened end range');
        test.done();
    },
    
    testEndswith: function(test) {
        var testEnds = 'endswith';
    
        test.strictEqual(testEnds.endswith('with'), true, 'Can see a simple case of ending with');
        test.strictEqual(testEnds.endswith('endswith'), true, 'Can see a case of ending with when the entire string matches');
        test.strictEqual(testEnds.endswith('what'), false, 'Can see a simple case of not ending with');
        test.strictEqual('endswithsith'.endswith('ith'), true, 'Can see a case of ending with while the subtring is also present elsewhere');
    
        test.strictEqual(testEnds.endswith('with', 3), true, 'Can see a simple case of ending with on a sliced string');
        test.strictEqual(testEnds.endswith('with', 0, 5), false, 'Can see a simple case of not ending with on a sliced string');
        test.strictEqual(testEnds.endswith('wit', 3, 7), true, 'Can see a case of ending with on a sliced string that matches the entire string');
        test.done();
    },
    
    testFind: function(test) {
        var testFind = 'finding';
    
        test.strictEqual(testFind.find('find'), 0, 'Can find a simple string at the start of the subject string');
        test.strictEqual(testFind.find('ing'), 4, 'Can find a simple string at the end of the subject string');
        test.strictEqual(testFind.find('ind'), 1, 'Can find a simple string in the middle of the subject string');
    
        test.strictEqual(testFind.find('find', 0, 4), 0, 'Can find a simple string equal to the slice of subject string');
        test.strictEqual(testFind.find('find', 0, 3), -1, 'Can not find a simple string when the slice cuts out the target');
        test.strictEqual(testFind.find('ing', 3), 4, 'Can find a simple string when the slice equals the target');
        test.done();
    },
    
    testFormat: function(test) {
        var testFormatDict = '{first}, {{second}} + {1}';
        var testFormatList = '{0}, {{1}} + {a}';
        var testUndefined = '{undefined}';
    
        test.strictEqual(testFormatDict.format({first: 'indeed'}), 'indeed, {{second}} + {1}', 'Can format a single arg dict correctly');
        test.strictEqual(testFormatDict.format({first: 'indeed', second: 'good sir'}), 'indeed, {good sir} + {1}', 'Can format multiple args dict correctly');
        test.strictEqual(testFormatDict.format({first: 'indeed', second: 'good sir', 1: 'quite'}), 'indeed, {good sir} + quite', 'Can format multiple args dict correctly with a number as a key');
        test.strictEqual(testFormatDict.format({first: 'indeed', second: 'good sir', 1: 'quite', another: 'nope'}), 'indeed, {good sir} + quite', 'Can handle the lack of a place to replace an arg');
    
        test.strictEqual(testFormatList.format(['indeed']), 'indeed, {{1}} + {a}', 'Can format a single arg list correctly');
        test.strictEqual(testFormatList.format(['indeed', 'good sir']), 'indeed, {good sir} + {a}', 'Can format a multiple arg list correctly');
        test.strictEqual(testFormatList.format(['indeed', 'good sir', 'another?']), 'indeed, {good sir} + {a}', 'Can handle the lack of a place to replace an arg');
    
        test.strictEqual(testUndefined.format({first: 'meh'}), testUndefined, 'Can format a string with {undefined} in it appropriately using a dict');
        test.strictEqual(testUndefined.format(['bluh']), testUndefined, 'Can format a string with {undefined} in it appropriately using a list');
    
        test.strictEqual(testFormatDict.format({}), testFormatDict, 'Can handle empty dicts');
        test.strictEqual(testFormatList.format({}), testFormatList, 'Can handle empty lists');
        test.done();
    },
    
    testIndex: function(test) {
        // Don't need to test too much, as it uses find
        // Just test that -1 throws ValueError
        var testIndex = 'indices';
        test.throws(
            function() {
                testIndex.index('abc');
            },
            /ValueError/,
            'Throws a ValueError when string is not found'
        );
        test.throws(
            function() {
                testIndex.index('abc', 2, 5);
            },
            /ValueError/,
            'Throws a ValueError when string is not found in a slice'
        );
        test.done();
    },
    
    testIsalnum: function(test) {
        test.ok('abc123'.isalnum(), 'Can verify a simple alphanumeric string');
        test.ok(!'abc 123'.isalnum(), 'Does not consider a space to be alphanumeric');
        test.ok(!'abc_123'.isalnum(), 'Does not consider an underscore to be alphanumeric');
        test.ok(!'a@b$c&1!2#3*'.isalnum(), 'Does not consider special characters to be alphanumeric');
        test.ok('a1b2c3'.isalnum(), 'Can verify a mixed alphanumeric string');
        test.ok(!''.isalnum(), 'Requires at least one character');
        test.done();
    },
    
    testIsalpha: function(test) {
        test.ok('abcdefg'.isalpha(), 'Can verify a simple alphabetic string');
        test.ok(!' abc '.isalpha(), 'Does not consider a space to be alphabetic');
        test.ok(!'_abc_'.isalpha(), 'Does not consider an underscore to be alphabetic');
        test.ok(!'a@b$c&D!E#D*'.isalpha(), 'Does not consider special characters to be alphabetic');
        test.ok('aBcDeF'.isalpha(), 'Can verify a mixed case string');
        test.ok(!''.isalpha(), 'Requires at least one character');
        test.done();
    },
    
    testIsdigit: function(test) {
        test.ok('123456'.isdigit(), 'Can verify a simple numeric string');
        test.ok(!' 123 '.isdigit(), 'Does not consider a space to be numeric');
        test.ok(!'_123_'.isdigit(), 'Does not consider an underscore to be numeric');
        test.ok(!'1@2$3&4!5#6*'.isdigit(), 'Does not consider special characters to be numeric');
        test.ok(!''.isdigit(), 'Requires at least one character');
        test.done();
    },
    
    testIslower: function(test) {
        test.ok('abcdefg'.islower(), 'Can verify a simple lowercase string');
        test.ok('spaces are fine'.islower(), 'Does not care about spaces');
        test.ok('1as ar3 number5'.islower(), 'Does not care about digits');
        test.ok('a@b$c&d!e#f*'.islower(), 'Does not care about special characters');
        test.ok(!'Uppers ARE NOT cool'.islower(), 'Is false when uppercase letters are present');
        test.ok(!''.islower(), 'Requires at least one character');
        test.ok(!'123!@#_ '.islower(), 'Requires at least one cased character');
        test.done();
    },
    
    testIsspace: function(test) {
        test.ok('   '.isspace(), 'Can verify a simple spacey string');
        test.ok('\t'.isspace(), 'Considers tabs');
        test.ok('\n'.isspace(), 'Considers newlines');
        test.ok(!'O+her 5tuff d*3s n0t W0rk'.isspace(), 'Is false when non spacey characters are present');
        test.ok(!''.isspace(), 'Requires at least one character');
        test.done();
    },
    
    testIstitle: function(test) {
        test.ok('Capitalized'.istitle(), 'Can verify a simple Titled string');
        test.ok('Multiple Capitalized'.istitle(), 'Can verify a Titled string with multiple words');
        test.ok(!'3 Numbers 4 Matt3r'.istitle(), 'Numbers are not considered a title string');
        test.ok(!'lower is certainly not titled'.istitle(), 'Can verify that lowercase words are not titled');
        test.ok(!''.istitle(), 'Requires at least one character');
        test.done();
    },
    
    testIsupper: function(test) {
        test.ok('UPPER'.isupper(), 'Can verify a simple uppercase string');
        test.ok('A B C D'.isupper(), 'Does not care about spaces');
        test.ok('A1B2C3D4'.isupper(), 'Does not care about digits');
        test.ok('A@B$C&D!'.isupper(), 'Does not care about special characters');
        test.ok(!'lower'.isupper(), 'Can verify that lowercase words are not uppercase');
        test.ok(!''.isupper(), 'Requires at least one character');
        test.ok(!'123!@#_ '.isupper(), 'Requires at least one cased character');
        test.done();
    },
    
    testJoin: function(test) {
        var testList = ['first', 'second', 'third'];
        var testDict = {'one': 1, 'two': 2, 'three': 3};
    
        test.strictEqual(''.join(testList), 'firstsecondthird', 'Can join a simple list on an empty string');
        test.strictEqual(''.join(testDict), 'onetwothree', 'Can join a simple dict on an empty string');
        test.strictEqual(' '.join(testList), 'first second third', 'Can join a simple list on a space');
        test.strictEqual(' '.join(testDict), 'one two three', 'Can join a simple dict on a space');
        test.strictEqual('-'.join(testList), 'first-second-third', 'Can join a simple list on a hyphen');
        test.strictEqual('-'.join(testDict), 'one-two-three', 'Can join a simple dict on a hyphen');
        test.strictEqual(', '.join(testList), 'first, second, third', 'Can join a simple list on a multichar string');
        test.strictEqual(', '.join(testDict), 'one, two, three', 'Can join a simple dict on a multichar string');
    
        test.strictEqual(' '.join([]), '', 'Can handle an empty list');
        test.strictEqual(' '.join({}), '', 'Can handle an empty dict');
        test.done();
    },
    
    testLjust: function(test) {
        test.strictEqual('justify me'.ljust(15), 'justify me     ', 'Can left justify a simple string');
        test.strictEqual('justify me'.ljust(15, '-'), 'justify me-----', 'Can left justify a simple string');
        test.strictEqual('justify me'.ljust(4), 'justify me', 'Returns the base string when width is less than base string length');
    
        test.strictEqual(''.ljust(3), '   ', 'Can handle an empty base string');
        test.strictEqual(''.ljust(3, '-'), '---', 'Can handle an empty base string with a hyphen fillchar');
        test.strictEqual(''.ljust(0), '', 'Can handle an empty base string with 0 width');
    
        test.throws(
            function() {
                var testy = 'justify me'.ljust(15, '--');
            },
            TypeError,
            'Throws a TypeError whenever the fillchar is too long'
        );
    
        test.throws(
            function() {
                var testy = 'justify me'.ljust(15, '');
            },
            TypeError,
            'Throws a TypeError whenever the fillchar is too short'
        );
        test.done();
    },
    
    testLower: function(test) {
        // No need for too much here since it's using String.toLowerCase under the hood
        test.strictEqual('UPPERCASE'.lower(), 'uppercase', 'Uses toLowerCase');
        test.done();
    },
    
    testLstrip: function(test) {
        test.strictEqual('   start here'.lstrip(), 'start here', 'Can remove spaces from the beginning of a simple string');
        test.strictEqual('\n\tstart here'.lstrip(), 'start here', 'Can remove tabs and newlines from the beginning of a simple string');
        test.strictEqual('   start here  '.lstrip(), 'start here  ', 'Does not remove spaces from the end of a simple string');
        test.strictEqual('\n\tstart here\n\t'.lstrip(), 'start here\n\t', 'Does not remove tabs and newlines from the end of a simple string');
        test.strictEqual('\n\tstart\n\there'.lstrip(), 'start\n\there', 'Does not remove tabs and newlines from the middle of a simple string');
    
        test.strictEqual('abcstart here'.lstrip('abc'), 'start here', 'Can remove a given character set from the beginning of a simple string');
        test.strictEqual('bcastart here'.lstrip('abc'), 'start here', 'Can remove a given character set in any order from the beginning of a simple string');
        test.strictEqual('abcstart hereabc'.lstrip('abc'), 'start hereabc', 'Does not remove a given character set from the end of a simple string');
        test.strictEqual('abcstartabchere'.lstrip('abc'), 'startabchere', 'Does not remove a given character set from the middle of a simple string');
    
        test.strictEqual(''.lstrip(), '', 'Can handle an empty base string.');
        test.strictEqual('  abc'.lstrip(''), '  abc', 'Can handle an empty character set.');
        test.done();
    },
    
    testPartition: function(test) {
        test.deepEqual('first,second'.partition(','), ['first', ',', 'second'], 'Can partition a simple string on a simple separator');
        test.deepEqual('first---second'.partition('---'), ['first', '---', 'second'], 'Can partition a simple string on a multichar separator');
        test.deepEqual('first,second,third'.partition(','), ['first', ',', 'second,third'], 'Can partition a simple string with multiple instances of separator');
        test.deepEqual('first.second'.partition(','), ['first.second', '', ''], 'Returns correct result when separator is not found');
    
        test.deepEqual(''.partition(','), ['', '', ''], 'Can handle an empty base string');
    
        test.throws(
            function() {
                var testy = 'first,second'.partition('');
            },
            /ValueError: empty separator/,
            "Throws a ValueError when the separator is empty"
        );
        test.done();
    },
    
    testRfind: function(test) {
        var findThis = "find something in this string";
        test.strictEqual(findThis.rfind('ing'), 26, 'Can correctly identify the rightmost index of a substring that is at the very end of the string');
        test.strictEqual(findThis.rfind('in'), 26, 'Can correctly identify the rightmost index of a substring that is not at the end of the string');
        test.strictEqual(findThis.rfind('in', 0, 24), 15, 'Can correctly identify the rightmost index of a substring that is not at the end of the string');
        test.strictEqual(findThis.rfind('in', 4, 24), 15, 'Can correctly identify the rightmost index of a substring when not starting at 0');
    
        test.strictEqual(findThis.rfind('what'), -1, 'Can correctly identify that a substring is not present in the base string');
        test.strictEqual(findThis.rfind('ring', 0, 27), -1, 'Can correctly identify that a substring is not present in a slice of the base string');
        test.strictEqual(findThis.rfind('ring', 5, 27), -1, 'Can correctly identify that a substring is not present when not starting at 0');
    
        test.strictEqual(findThis.rfind(''), 29, 'Behaves as python rfind does where empty strings are located at the end of the string');
        test.strictEqual(''.rfind('something'), -1, 'Can handle empty base strings');
        test.done();
    },
    
    testRindex: function(test) {
        // it uses rfind under the hood, so we just need to test the -1 case
        test.throws(
            function() {
                var testy = 'not in here'.rindex('wat');
            },
            /ValueError/,
            "Throws an error when the string is not found"
        );
    
        test.throws(
            function() {
                var testy = 'not in here'.rindex('wat', 2, 7);
            },
            /ValueError/,
            "Throws an error when the string is not found in a slice of the base string"
        );
        test.done();
    },
    
    testRjust: function(test) {
        var justifyThis = "JUSTICE";
        test.strictEqual(justifyThis.rjust(10), '   JUSTICE', 'Can right justify a simple string');
        test.strictEqual(justifyThis.rjust(10, '-'), '---JUSTICE', 'Can right justify a simple string with specified fillchar');
        test.strictEqual(justifyThis.rjust(4), justifyThis, 'Returns the base string when width is less than base string length');
    
        test.strictEqual(''.rjust(3), '   ', 'Can handle an empty base string');
        test.strictEqual(''.rjust(3, '-'), '---', 'Can handle an empty base string with a hyphen fillchar');
        test.strictEqual(''.rjust(0), '', 'Can handle an empty base string with 0 width');
    
        test.throws(
            function() {
                var testy = 'JUSTICE'.rjust(15, '--');
            },
            TypeError,
            'Throws a TypeError whenever the fillchar is too long'
        );
    
        test.throws(
            function() {
                var testy = 'JUSTICE'.rjust(15, '');
            },
            TypeError,
            'Throws a TypeError whenever the fillchar is too short'
        );
        test.done();
    },
    
    testRpartition: function(test) {
        test.deepEqual('first,second'.rpartition(','), ['first', ',', 'second'], 'Can partition a simple string on a simple separator');
        test.deepEqual('first---second'.rpartition('---'), ['first', '---', 'second'], 'Can partition a simple string on a multichar separator');
        test.deepEqual('first,second,third'.rpartition(','), ['first,second', ',', 'third'], 'Can partition a simple string with multiple instances of separator');
        test.deepEqual('first.second'.rpartition(','), ['first.second', '', ''], 'Returns correct result when separator is not found');
    
        test.deepEqual(''.rpartition(','), ['', '', ''], 'Can handle an empty base string');
    
        test.throws(
            function() {
                var testy = 'first,second'.rpartition('');
            },
            /ValueError: empty separator/,
            "Throws a ValueError when the separator is empty"
        );
        test.done();
    },
    
    testRstrip: function(test) {
        test.strictEqual('clean up    '.rstrip(), 'clean up', 'Can remove spaces from the end of a simple string');
        test.strictEqual('clean up\n\t'.rstrip(), 'clean up', 'Can remove tabs and newlines from the end of a simple string');
        test.strictEqual('   clean up   '.rstrip(), '   clean up', 'Does not remove spaces from the beginning of a simple string');
        test.strictEqual('\n\tclean up\n\t'.rstrip(), '\n\tclean up', 'Does not remove tabs and newlines from the beginning of a simple string');
        test.strictEqual('clean\n\tup\n\t'.rstrip(), 'clean\n\tup', 'Does not remove tabs and newlines from the middle of a simple string');
    
        test.strictEqual('clean upabc'.rstrip('abc'), 'clean up', 'Can remove a given character set from the end of a simple string');
        test.strictEqual('clean upbca'.rstrip('abc'), 'clean up', 'Can remove a given character set in any order from the end of a simple string');
        test.strictEqual('abcclean upabc'.rstrip('abc'), 'abcclean up', 'Does not remove a given character set from the beginning of a simple string');
        test.strictEqual('cleanabcupabc'.rstrip('abc'), 'cleanabcup', 'Does not remove a given character set from the middle of a simple string');
    
        test.strictEqual(''.rstrip(), '', 'Can handle an empty base string.');
        test.strictEqual('abc   '.lstrip(''), 'abc   ', 'Can handle an empty character set.');
        test.done();
    },
    
    testSplitlines: function(test) {
        test.deepEqual('two\nlines'.splitlines(), ['two', 'lines'], 'Can split on a simple newline character');
        test.deepEqual('two\nlines'.splitlines(true), ['two\n', 'lines'], 'Can keep the newlines intact');
        test.deepEqual('two\nlines\n'.splitlines(true), ['two\n', 'lines\n'], 'Can keep the newlines intact even when ending on a newline');
        test.deepEqual('one line'.splitlines(), ['one line'], 'Can handle strings with no newlines characters');
        test.deepEqual(''.splitlines(), [], 'Can handle empty strings');
        test.done();
    },
    
    testStartswith: function(test) {
        var testStart = 'startswith';
    
        test.strictEqual(testStart.startswith('start'), true, 'Can see a simple case of starting with');
        test.strictEqual(testStart.startswith('startswith'), true, 'Can see a case of starting with when the entire string matches');
        test.strictEqual(testStart.startswith('what'), false, 'Can see a simple case of not starting with');
        test.strictEqual('startswithstars'.startswith('star'), true, 'Can see a case of starting with while the subtring is also present elsewhere');
    
        test.strictEqual(testStart.startswith('art', 2), true, 'Can see a simple case of starting with on a sliced string');
        test.strictEqual(testStart.startswith('start', 2), false, 'Can see a simple case of not starting with on a sliced string');
        test.strictEqual(testStart.startswith('arts', 2, 6), true, 'Can see a case of starting with on a sliced string that matches the entire string');
        test.done();
    },
    
    testStrip: function(test) {
        // uses rstrip and lstrip internally, so just check that both work together
        test.strictEqual('   abc   '.strip(), 'abc', 'Can remove spaces from the start and end of a string');
        test.strictEqual('\n\tabc\n\t'.strip(), 'abc', 'Can remove tabs and newlines from the start and end of a string');
        test.strictEqual('  a b c  '.strip(), 'a b c', 'Does not remove spaces from the middle of the string');
        test.strictEqual('\n\ta\nb\tc\n\t'.strip(), 'a\nb\tc', 'Does not remove tabs and newlines from the middle of the string');
    
        test.strictEqual('123clean up123'.strip('123'), 'clean up', 'Can remove a given character set from the start and end of a simple string');
        test.strictEqual('312clean up213'.strip('123'), 'clean up', 'Can remove a given character set in any order from the start and end of a simple string');
        test.strictEqual('321clean312up231'.strip('123'), 'clean312up', 'Does not remove a given character set from the middle of a simple string');
    
        test.strictEqual(''.strip(), '', 'Can handle an empty base string.');
        test.strictEqual('   abc   '.lstrip(''), '   abc   ', 'Can handle an empty character set.');
        test.done();
    },
    
    testSwapcase: function(test) {
        test.strictEqual('abcd'.swapcase(), 'ABCD', 'Can swap the case of a simple lowercase string');
        test.strictEqual('ABCD'.swapcase(), 'abcd', 'Can swap the case of a simple uppercase string');
        test.strictEqual('AbcD'.swapcase(), 'aBCd', 'Can swap the case of a simple mixed-case string');
    
        test.strictEqual('A complicated $tr1nG'.swapcase(), 'a COMPLICATED $TR1Ng', 'Can swap the case of a complicated string');
        test.strictEqual('123 !@# )(*'.swapcase(), '123 !@# )(*', 'Does not change a string with no cased characters');
        test.strictEqual(''.swapcase(), '', 'Can handle an empty string');
        test.done();
    },
    
    testTitle: function(test) {
        test.strictEqual('a simple titleable string'.title(), 'A Simple Titleable String', 'Can titlecase a simple lowercase string');
        test.strictEqual('A SIMPLE TITLEABLE STRING'.title(), 'A Simple Titleable String', 'Can titlecase a simple uppercase string');
        test.strictEqual('a String with some Titled words'.title(), 'A String With Some Titled Words', 'Can titlecase a string that alread contains title words');
    
        test.strictEqual("a string's titling isn't always easy".title("'"), "A String's Titling Isn't Always Easy", 'Can titlecase a string correctly when given an apostrophe as not a word boundary');
        test.strictEqual("a hyphen-ated string should-work".title("-"), "A Hyphen-ated String Should-work", 'Can titlecase a string correctly when given a hyphen as not a word boundary');
        test.strictEqual('a normal string'.title(''), 'A Normal String', 'Can handle the empty string passed for notWordBoundaries');
        test.strictEqual(''.title(), '', 'Can handle the empty string');
        test.done();
    },
    
    testZfill: function(test) {
        // uses rjust internally, so just test that '0's are used
        test.strictEqual('1234'.zfill(10), '0000001234', 'Can fill correctly with 0s');
        test.done();
    }
};
