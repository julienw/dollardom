/**
* @preserve $dom library (v0.9.1b) copyright 2009, Keith Clark
* Licensed under the MIT License.
* http://www.keithclark.co.uk/
*
* Copyright 2011 Julien Wajsberg
* Licensed under the MIT License
* http://github.com/julienw/dollardom
*/
/*jshint boss: true, bitwise: true, curly: true, newcap: true, noarg: true, nonew: true */
/* future jshint options : nomen: true */
/* undef options seems buggy */
(function (window)
{
    var 
    /* these references exist to reduce size in minifiers */
		_document = window.document,
        _docElt = _document.documentElement,
		_true = true,
		_false = false,
		_undefined,
		animTimer, time, animItems = [],

    /* dom vars */
		re_css_property = /^(.*?)(px|deg)?$/,
		re_selector_fragment = /^\s*([>+~])?\s*([*a-z0-9\-_]+)?(?:#([a-z0-9\-_]+))?(?:\.([a-z0-9\.\-_]+))?\s*/i,
        re_get_alias = /\-(\w)/g,
		loadHandlers = [],
        ieEvents = [],

    // styleAlias is a css-name to camelCaseName lookup that's automatically populated when calling
    // the _getStyle() and _setStyle() methods. It's pre-populated with the float css lookup.

		styleAlias = { "float": "cssFloat" in _docElt.style ? "cssFloat" : "styleFloat" },


    // style handers are used to extend or override existing css properties. When calling _getStyle()
    // or _setStyle() this object is checked first to see if a get/set handler exists for the passed 
    // propertyName. Handlers are camelCase.

    // Standards based style handlers

	    styleHandlers = {
			borderWidth: {
				    get: function (e) {
				        return _getStyle(e, "border-left-width");
				    }
				},
			padding: {
				    get: function (e) {
				        return _getStyle(e, "padding-left");
				    }
				},
			margin: {
				    get: function (e) {
				        return _getStyle(e, "margin-left");
				    }
				}
			};

    // Internet Explorer style handlers
        if ((! "opacity" in docElt.style) && "filters" in docElt) {
            styleHandlers.opacity = {
				    set: function (e, v) {
				        var f = e.filters.alpha;

				        if (!f) {
				            e.style.filter += " Alpha(opacity=" + (v * 100) + ")";
				        } else {
				            f.opacity = v * 100;
				        }
				    },
				    get: function (e) {
				        var f = e.filters.alpha;
				        return f ? f.opacity / 100 : 1;
				    }
				};
        }
        // should trigger in IE and in some recent clients
        // TODO : this is just plain wrong
        if ("clientWidth" in docElt) {
            styleHandlers.width = {
                get: function (e) { return e.style.width || e.clientWidth || e.offsetWidth; }
            };
        }
        if ("clientHEight" in docElt) {
            styleHandlers.height = {
                get: function (e) { return e.style.height || e.clientHeight || e.offsetHeight; }
			};
        }
     var _addEvent = window.addEventListener ?
            function (elm, name, handler)
            {
                elm.addEventListener(name, handler, false);
            }
        : 
            function (elm, name, handler)
            {
                var eventKey = elm.uniqueID + name + handler;
                ieEvents[eventKey] = function () { var e = window.event; e.target = e.srcElement; handler(e); };
                elm.attachEvent("on" + name, ieEvents[eventKey]);
            },

     _removeEvent = window.removeEventListener ?
            function (elm, name, handler)
            {
                elm.removeEventListener(name, handler, false);
            }
        :
            function (elm, name, handler)
            {
                var eventKey = elm.uniqueID + name + handler;
                elm.detachEvent("on" + name, ieEvents[eventKey]);
                delete (ieEvents[eventKey]);
            },

    _getStyle = (_document.defaultView && _document.defaultView.getComputedStyle) ?
			function (elm, property)
			{
			    var prop = _getAlias(property), handler = styleHandlers[prop];
			    return handler && handler.get ?
					handler.get(elm) :
					elm.ownerDocument.defaultView.getComputedStyle(elm, null).getPropertyValue(property);
			}
        :
			function (elm, property)
			{
			    var prop = _getAlias(property), handler = styleHandlers[prop];
			    return ((handler && handler.get) ? handler.get(elm) : elm.currentStyle[prop]);
			}
        ;

    function _setStyle(elm, property, value)
    {
        var prop = _getAlias(property), handler = styleHandlers[prop];
        return (handler && handler.set) ? handler.set(elm, value) : elm.style[prop] = value;
    }


    function _getAlias(property)
    {
        return styleAlias[property] || (styleAlias[property] = property.replace(re_get_alias, function (m, l) { return l.toUpperCase(); }));
    }


    function _style(elm, property, value)
    {
        if (value === _undefined)
        {
            if (typeof property == "string")
            {
                return _getStyle(elm, property) || 0;
            }
            for (var x in property)
            {
                _setStyle(elm, x, property[x]);
            }
        }
        else
        {
            _setStyle(elm, property, value);
        }
    }


    // _sel returns an array of simple selector fragment objects from the passed complex selector string
    function _sel(selector)
    {
        var f, out = [];
        if (typeof selector === "string")
        {
            while (selector)
            {
                f = selector.match(re_selector_fragment);
                if (f[0] === "") {
                    return null;
                }
                out.push({
                    rel: f[1],
                    tag: f[2],
                    uTag: (f[2] || "").toUpperCase(),
                    id: f[3],
                    classes: (f[4]) ? f[4].split(".") : _undefined
                });
                selector = selector.substring(f[0].length);
            }
        }
        return out;
    }


    // determines if the passed element is a descentand of anthor element
    function _isDescendant(elm, ancestor)
    {
        while ((elm = elm.parentNode) && elm != ancestor) { }
        return elm !== null;
    }


    // $dom's CSS selector
    function _descendants(refelm, selector)
    {

        function find(elm, selectorFragment)
        {
            var c, results = selectorFragment.id ?
				((c = ((elm && elm.ownerDocument) || _document).getElementById(selectorFragment.id)) && _isDescendant(c, elm)) ? [c] : [] :
				toArray(elm.getElementsByTagName(selectorFragment.tag ? selectorFragment.uTag : "*"));
            c = results.length;

            if (c > 0 && (selectorFragment.id || selectorFragment.classes)) {
                while (c--) {
                    if (!_match(results[c], selectorFragment)) {
                        results.splice(c, 1);
                    }
                }
            }
            return results;
        }


        function toArray(nodes)
        {
            try {
                return Array.prototype.slice.call(nodes);
            } catch (e) {
                var arr = [];
                for (var i = 0; i < nodes.length; i++) {
                    arr.push(nodes[i]);
                }
                return arr;
            }
        }

        function contains(o)
        {
            for (var c = results.length; c--; ) {
                if (results[c] === o) {
                    return _true;
                }
            }
            return _false;
        }

        var results = [],
			elements = [refelm],
			selectorFragments = _sel(selector),
			c, lc,
			d, ld,
			e, le,
			fragment,
			elm, elms;

        if (!selectorFragments.length) {
            selectorFragments = [{}];
        }

        for (c = 0, lc = selectorFragments.length; c < lc; c++)
        {
            fragment = selectorFragments[c];
            for (d = 0, ld = elements.length; d < ld; d++)
            {
                elm = elements[d];
                switch (fragment.rel)
                {
                    case ">":
                        var children = elm.childNodes;
                        for (e = 0, le = children.length; e < le; e++)
                        {
                            if (_match(children[e], fragment))
                            {
                                results.push(children[e]);
                            }
                        }
                        break;

                    case "~":
                        while (elm = elm.nextSibling)
                        {
							if (_match(elm, fragment))
                            {
                                if (contains(elm))
                                {
                                    break;
                                }
                                results.push(elm);
                            }
                        }
                        break;

                    case "+":
                        while ((elm = elm.nextSibling) && elm.nodeType != 1) { }
                        if (elm && _match(elm, fragment))
                        {
                            results.push(elm);
                        }
						
                        break;

                    default:
                        elms = find(elm, fragment);
                        if (c > 0)
                        {
                            for (e = 0, le = elms.length; e < le; e++)
                            {
                                if (!contains(elms[e])) {
                                    results.push(elms[e]);
                                }
                            }
                        }
                        else { results = results.concat(elms); }
                        break;
                }
            }

            if (!results.length) {
                return [];
            }
            elements = results.splice(0, results.length);

        }
        return elements;
    }


    function _match(elm, selector)
    {
        return (elm.nodeType === 1 && selector) &&
		!(selector.tag && selector.uTag != elm.tagName) &&
		!(selector.id && selector.id != elm.id) &&
		!(selector.classes && !_hasClasses(elm, selector.classes));
    }

    function _find(elm, property, selectorFragment)
    {
        selectorFragment = _sel(selectorFragment);
		//if(selectorFragment===_undefined || !selectorFragment.tag)selectorFragment = _sel(selectorFragment);
        selectorFragment = selectorFragment.length > 0 ? selectorFragment[0] : null;
        while (elm && (elm = elm[property]) && (selectorFragment ? (!_match(elm, selectorFragment)) : (elm.nodeType != 1))) { }
        return elm;
    }

    function _hasClasses(elm, classNames)
    {
        if (elm.className === "") {
            return _false;
        }
        for (var c = 0; c < classNames.length; c++)
        {
            if (_hasClass(elm, classNames[c])) { return _false; }
        }
        return _true;
    }


    function _removeAnim(index, fin)
    {
        var item = animItems.splice(index, 1)[0];
        if (typeof item.callback === "function")
        {
            item.callback(fin, item.elm);
        }
    }

    function _anim(elm, properties, duration, callback)
    {
        var property, props = [], s, e, i = -1, c;

        for (c = animItems.length - 1; c >= 0; c--)
        {
            if (animItems[c].elm == elm)
            {
                i = c; break;
            }
        }

        if (properties === _undefined) {
            return i > -1;
        }
        if (i > -1) {
            _removeAnim(i, _false);
        }

        if (duration === _undefined) {
            duration = 500;
        }


        for (property in properties)
        {
            s = re_css_property.exec(_style(elm, property));
            e = re_css_property.exec(properties[property]);
            props[property] = { s: parseFloat(s[1]), e: parseFloat(e[1]), u: s[2] || e[2] || "" };
        }

        animItems.push({ elm: elm, startTime: new Date(), properties: props, callback: callback, duration: duration });

        if (!animTimer)
        {
            animTimer = window.setInterval(function ()
            {
                for (var c = animItems.length - 1; c >= 0; c--)
                {
                    var styles = {},
					prop,
					style,
					anim = animItems[c],
                    duration = anim.duration,
					ticks = new Date() - anim.startTime,
					ref = 1 - (0.5 - (Math.cos(ticks / duration * (Math.PI)) / 2));

                    for (prop in anim.properties)
                    {
                        style = anim.properties[prop];
                        styles[prop] = Number(ticks >= duration ?
								style.e :
								style.s > style.e ?
									style.e + (style.s - style.e) * ref :
									style.s + (style.e - style.s) * (1 - ref)).toFixed(2) + style.u;

                        if (styles[prop] == "NaNpx") {
                            styles[prop] = "0";
                        }
                    }
                    _style(anim.elm, styles);

                    if (ticks >= duration)
                    {
                        _removeAnim(c, _true);
                    }
                }

                if (!animItems.length)
                {
                    animTimer = window.clearInterval(animTimer);
                }
            }, 10);
        }
    }



    function init()
    {
        var done, timer, handler;
        function fn(e) {
            if (!done) {
                done = true;
                if (timer) {
                    timer = window.clearTimeout(timer);
                }
                for (var i = 0, l = loadHandlers.length; i < l; i++) { loadHandlers[i](); }
            }
        }

        // Diego Perini's doScroll trick
        // see http://javascript.nwbox.com/IEContentLoaded/
        function scrollCheck() {
            try {
                _docElt.doScroll("left");
            } catch (e) {
                window.setTimeout(scrollCheck, 20);
                return;
            }

            fn();
        }

        if (/loaded|complete/.test(_document.readyState)) {
            // already ready
            window.setTimeout(fn, 0);
            return;
        }

        /* we're lucky because addEventListener and DOMContentLoaded are both
         * supported from IE9 */
        if (_document.addEventListener)
        {
            _document.addEventListener('DOMContentLoaded', fn, _false);
            /* just to be sure */
            _document.addEventListener('load', fn, _false);
        } else if (_document.attachEvent) {
            // IE8-
            /* just to be sure */
            _document.attachEvent('onload', fn);

            /* doScroll is not adequate when we're in a frame */
            /* (from jQuery) */
            var toplevel = false;

            try {
                toplevel = (window.frameElement === null);
            } catch(e) {}

            if (!toplevel && _docElt.doScroll) {
                scrollCheck();
            }
        }
    }

     function _create(selector, doc) {
         var s = _sel(selector)[0],
             e = (doc || _document).createElement(s.tag);
        if (s.id) {
            e.id = s.id;
        }
        
        if (s.classes) {
            e.className = s.classes.join(" ");
        }
        return e;
     }

    function _onready(handler) {
        loadHandlers.push(handler);
    }

    function _get(selector, doc) {
        return _descendants((doc || _document), selector);
    }

    function _ancestor(elm, selector) {
        return _find(elm, "parentNode", selector);
    }
    function _next(elm, selector) {
        return _find(elm, "nextSibling", selector);
    }

    function _previous(elm, selector) {
        return _find(elm, "previousSibling", selector);
    }

    function _first(elm, selector) {
        var p = elm.parentNode;
        return _find(p, "firstChild", selector) || _next(p.firstChild, selector);
    }
    function _last(elm, selector) {
        var p = elm.parentNode;
        return _find(p, "lastChild", selector) || _previous(p.lastChild, selector);
    }

    function _hasClass(elm, className) {
        return (" " + elm.className + " ").indexOf(" "+className+" ") > -1;
    }

    function _addClass(elm, className) {
        if (!_hasClass(elm, className)) {
            elm.className += " " + className;
        }
    }

    function _removeClass(elm, className) {
        if (_hasClass(elm, className)) {
            elm.className = elm.className.replace(new RegExp("(^|\\s)" + className + "(\\s|$)"), " ").replace(/\s$/, "");
        }
    }

    function _toggleClass(elm, className, expr) {
        (expr ? _addClass : _removeClass)(elm, className);
    }


    var dom = {
	    /* -- Experimental methods --*/

	    create: _create,
        onready: _onready,

	    /* events */
	    addEvent: _addEvent,
	    removeEvent: _removeEvent,

	    /* selections */
	    get: _get,
	    descendants: _descendants,
	    ancestor: _ancestor,
	    next: _next,
	    previous: _previous,
	    first: _first,
	    last: _last,

	    /* styling */
	    hasClass: _hasClass,
	    addClass: _addClass,
	    removeClass: _removeClass,
	    toggleClass: _toggleClass,
	    style: _style,
	    transform: _anim
	};

    window.$dom = dom;
    init();

})(this);

