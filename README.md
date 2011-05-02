$dom
====
_5k Javascript library for selecting, styling, traversing and animating DOM elements._

$dom was coded by Keith Clark and was once available at http://www.keithclark.co.uk/$dom/.

FAQ
---

### Which version to download ?
$dom.dev.js is always the most up to date version. It is currently facing big changes, especially in its Internet
Explorer support, but should work. Please report any bug you find.

I'll try to keep $dom.min.js (minified with uglifyjs) in sync but take attention to the timestamp to be sure.

### Why ?
I used $dom in a project and wanted to fix one bug. Moreover Keith Clark stopped maintaining this code
and I felt it is still useful nowadays.

I asked him where I could find the original source code (since only the minified/obfuscated code was available on
his website) and he kindly sent it to me.

### Why $dom ? There are lots of other very good libraries outthere
That's right. For big projects, you can use jQuery, Dojo, ExtJS, Prototype, etc. For mobile projects, there are
jQuery Mobile, jqtouch, Sencha touch, Zepto.js, xui.js.

I needed a _small_ library with support for not only Webkit but also Firefox, IE, etc. I found that $dom
is exactly what I needed at the time.

### Alternative
I do feel [ender.js](http://ender.no.de/) could be a very good alternative.

Development notes
---
The build script needs uglifyjs and node.

On Debian-like systems, these could most probably
be installed with the command :

    aptitude install libnode-uglify

### TODO
* separate the animate part
* write good documentation
* write good tests




