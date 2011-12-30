$dom
====
_5k Javascript library for selecting, styling, traversing and animating DOM elements._

$dom was coded by Keith Clark and was once available at http://www.keithclark.co.uk/$dom/.

FAQ
---

### Which version to download ?

`$dom.dev.js` is always the most up to date version. I consider that is
is pretty good quality, which means that I still find bugs myself, but
that I feel it can be used on real web sites or web applications. Please
report any bug you find.

I'll try to keep `$dom.min.js` (minified with `uglifyjs`) in sync but
take attention to the timestamp to be sure.

If you want animation support, include either both `$dom.dev.js` and `$dom-animate.dev.js`
or their concatened/minified version `$dom-with-animate.min.js`.
Please note however that nowadays, you should consider doing simple
animations with CSS transitions. For your more complex needs you can also
have a look to SVG.

If you want try the new jQuery-like simpler chaining API, you must include
`$dom-chain.dev.js` as well. Since it is newer than the normal API, it
could have some bugs. Please consider this syntax beta-quality.

### Why ?
I used $dom in a project and wanted to fix one bug. Moreover Keith Clark
 stopped maintaining this code and I felt it is still useful nowadays.

I asked him where I could find the original source code
(since only the minified/obfuscated code was available on
his website) and he kindly sent it to me.

### Why $dom ? There are lots of other very good libraries outthere

That's right. For big projects, you can use jQuery, Dojo, ExtJS, Mootools,
etc. For mobile projects, there are jQuery Mobile, jqtouch, Sencha touch,
Zepto.js, xui.js. But please read further.

#### Strong points

$dom features the following strong points:

* it's _small_: 2.3 kB for the minified/gzipped version (compare with
jQuery's size: 30kB)
* it's _general_: it's not mobile-only or desktop-only. It's perfect for
mobile-first or responsive design, which should run on a variety of 
very different devices.
* it's _compatible_ with all javascript-enabled browsers in use nowadays,
even Internet Explorer 6. If you find a problem in such a browser, then
it is a bug, please report it.
* the syntax is clean. Compare:

 $("<div id='myDiv' class='class1 class2'>"); // jQuery

with

 $dom.create("div#myDiv.class1.class2"); // $dom.

* it doesn't include the features you don't need, e.g. Array iteration
functions (`forEach`, `map`, `reduce`, etc.) or Ajax. There are perfectly
good polyfills outthere.
* [Good documentation](http://julienw.github.com/dollardom/doc)
* [Permissive BSD-like license](https://github.com/julienw/dollardom/raw/LICENSE)
* the author knows Javascript and the DOM (or I think so ;-) ).

#### Weak points

It has also of course some weak points, because we can't have it all:

* it is certainly slower than alternatives like jQuery. However, on
real websites, we should never have 10000 nodes. If you have, then this
is not the right tool. We will never support such use cases.
* it can't animate to relative value units like `em`.
* the syntax is not jQuery-compatible, which means you have to learn
a new syntax. I suggest you have a look to the $dom chaining API
which is cleaner and simpler than the legacy API.

### Is there an alternative ?
[ender.js](http://ender.no.de/) could be a good alternative with its
modular approach. This is a goal to integrate better with this tool.

Development notes
---
The build script needs uglifyjs and node.

On Debian-like systems, these could most probably
be installed with the command :

    aptitude install libnode-uglify

### TODO

* write more tests
* document the chaining API
* write more examples
* make `transform` queueable
* support attribute selector
