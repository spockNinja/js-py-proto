js-py-proto
===========

Javascript library to bring your favorite Python built-ins to the web.


Being a full-stack developer, I often find myself wishing that native Javascript entities had a bit more functionality.
In particular, I have written a few functions here and there that I come to expect because of python built-ins.

So, I decided to make a project where I can take that idea to the next level and aim to implement as many python built-ins in Javascript as I can.

### Using in Your Project
You can use the standard jspyproto.js file, which will automatically patch all of the modules that have been implemented.
OR, you can use the jspyproto-configurable.js file, which allows you to exclude certain functions and call ```jspyproto.start()``` on your own terms.

#### In the HTML...
```html
<html>
    <!-- All of your htmls... -->

    <!-- Include BEFORE your own js so the functions will be there when you want them. -->
    <script type="text/javascript" src="jspyproto.js"></script>
    <!-- If you are going to use the configurable version, put your configuration code immediately following. -->
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
#### Strings
String functions that have been implemented can be found here: http://docs.python.org/2/library/stdtypes.html#string-methods

****
### Contributing
#### Build Dependencies
* The build script is a bash script. So, yeah. It's simple and straightforward.
* [uglifyjs](https://github.com/mishoo/UglifyJS2) is used to compile the minified versions.

#### Running Tests
After running the build, simply open up the tests/test.html page in a browser.
