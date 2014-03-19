#!/bin/bash
BUILD=./build
SRC=./src
MODULES=./src/modules/*.js

# Clear the previous build
if [ -e "$BUILD/jspyproto.js" ]
then
    rm $BUILD/*.js
fi

# Build the configurable version
cat "$SRC/main.js" >> "$BUILD/jspyproto-configurable.js"

for f in $MODULES
do
    cat $f >> "$BUILD/jspyproto-configurable.js"
done

# Build the auto-include version
cp "$BUILD/jspyproto-configurable.js" "$BUILD/jspyproto.js"
cat "$SRC/auto-include.js" >> "$BUILD/jspyproto.js"

# Now make the minified versions
uglifyjs "$BUILD/jspyproto-configurable.js" -o "$BUILD/jspyproto-configurable.min.js"
uglifyjs "$BUILD/jspyproto.js" -o "$BUILD/jspyproto.min.js"
