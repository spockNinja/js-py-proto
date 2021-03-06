js-py-proto
===========

Javascript library to bring your favorite Python built-ins to the web.


Being a full-stack developer, I often find myself wishing that native Javascript entities had a bit more functionality.
In particular, I have written a few functions here and there that I come to expect because of python built-ins.

So, I decided to make a project where I can take that idea to the next level and aim to implement as many python built-ins in Javascript as I can.

Travis Build Status: [![Build Status](https://travis-ci.org/spockNinja/js-py-proto.svg?branch=master)](https://travis-ci.org/spockNinja/js-py-proto)

### Using in Your Project

#### In the HTML...
```html
<html>
    <!-- All of your htmls... -->

    <!-- Include BEFORE your own js so the functions will be there when you want them. -->
    <script type="text/javascript" src="jspyproto.js"></script>
    <!-- Your scripts here... -->
</html>
```

#### In the JS...
```javascript
    // Use Strings, Objects, Arrays as you normally would...
    // But now... they have all of the python built-ins implemented!
    var pyString = "i am a javascript string... with python functions";
    pyString.capitalize(); // "I am a javascript string... with python functions"
    pyString.count('python'); // 1
    // And many more...
```

#### In nodejs...
`npm install js-py-proto`
```javascript
    require('js-py-proto')();
    var pyString = "i am a javascript string... with python functions";
    pyString.capitalize(); // "I am a javascript string... with python functions"
    pyString.count('python'); // 1
    // And many more...
```

#### Strings
String functions that have been implemented can be found here: http://docs.python.org/2/library/stdtypes.html#string-methods

#### Objects/Dicts
Object/Dict functions that have been implemented can be found here: https://docs.python.org/2/library/stdtypes.html#mapping-types-dict
* `get` was aliased to `getValue` because `get` breaks some standard javascript Object features
* `update` currently only takes another Object/Dict and does not accept an array of (key, val) pairs
* `iter*` and `view*` functions have not yet been implemented because there is no euqivalent in javascript yet
* Once Javascript 1.7 is widely supported, `iter*` functions will be useful and are on my radar

#### Arrays
Array functions that have been implemented can be found here: https://docs.python.org/2/tutorial/datastructures.html#more-on-lists
* `pop` was aliased to `popItem` because native JS already implements `pop`, and the python allows for passing an item in to pop

****
### Contributing
1. Create your Fork
2. Install [nodejs](http://nodejs.org/) and [npm](https://www.npmjs.org/)
3. `npm install -g grunt-cli`
4. `cd` into your fork and `npm install` to get the dependencies
5. Make your changes.
6. Add/Fix tests.
7. Run `grunt` in the project directory.
8. Fix any issues from failing tests or jshint warnings.
9. Commit and open up a PR!
