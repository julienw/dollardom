/**
* This file is part of $dom library (v0.9.2b)
* copyright 2009, 2010, 2011 Keith Clark
* Licensed under the MIT License.
* http://www.keithclark.co.uk/
*
* Copyright 2011 Julien Wajsberg
* Licensed under the MIT License
* http://github.com/julienw/dollardom
*/

(function(window) {
/*jshint boss: true, bitwise: true, curly: true, newcap: true, noarg: true, nonew: true, latedef: true, regexdash: true */

	var $dom = window.$dom;

    /* utilities functions */
    function _each(array, func) {
        for (var i = 0, l = array.length; i < l; i++) {
            func(array[i]);
        }
    }

    function _map(array, func) {
        var result = [],
            i = 0,
            l = array.length;
        for (; i < l; i++) {
            result.push(func(array[i]));
        }
        return result;
    }

    var each = Array.prototype.forEach ? function(array, func) { array.forEach(func); } : _each,
        map = Array.prototype.map ? function(array, func) { return array.map(func); } : _map;
	
	function DomObject(array) {
		this.a = array;
	}

	function get(sel, doc) {
		return new DomObject($dom.get(sel, doc));
	}

    function create(sel, doc) {
        return new DomObject([ $dom.create(sel, doc) ]);
    }



    DomObject.prototype = {
        addEvent: function(name, handler) {
            each(this.a, function(elt) {
                $dom.addEvent(elt, name, handler);
            });
            return this;
        },
        removeEvent: function(name, handler) {
            each(this.a, function(elt) {
                $dom.removeEvent(elt, name, handler);
            });
            return this;
        },
        descendants: function(sel) {
            this.a = map(this.a, function(elt) {
                return $dom.descendants(elt, sel);
            });
            return this;
        },
        ancestor: function(sel) {
            this.a = map(this.a, function(elt) {
                return $dom.ancestor(elt, sel);
            });
            return this;
        },
        next: function(sel) {
            this.a = map(this.a, function(elt) {
                return $dom.next(elt, sel);
            });
            return this;
        },
        previous: function(sel) {
            this.a = map(this.a, function(elt) {
                return $dom.previous(elt, sel);
            });
            return this;
        },
        first: function(sel) {
			this.a = map(this.a, function(elt) {
				return $dom.first(elt, sel);
			});
			return this;
		},
        last: function(sel) {
			this.a = map(this.a, function(elt) {
				return $dom.last(elt, sel);
			});
			return this;
		},
		empty: function() {
			each(this.a, function(elt) {
                $dom.empty(elt);
            });
            return this;
		},
        is: function(sel) {
            return this.a.length && $dom.is(this.a[0], sel);
        },
        hasClass: function(sel) {
            return this.a.length && $dom.hasClass(this.a[0], sel);
		},
        addClass: function(className) {
			each(this.a, function(elt) {
                $dom.addClass(elt, className);
            });
            return this;
		},
        removeClass: function(className) {
			each(this.a, function(elt) {
                $dom.removeClass(elt, className);
            });
            return this;
		},
        toggleClass: function(className, boolExpr) {
			each(this.a, function(elt) {
                $dom.toggleClass(elt, className, boolExpr);
            });
            return this;
		},
		style: function(prop, val) {
			each(this.a, function(elt) {
                $dom.style(elt, prop, val);
            });
            return this;
		},
		toDom: function() {
			return this.a;
		}
    };

    DomObject.onready = $dom.onready;
    DomObject.get = get;
    DomObject.create = create;

    window.$dom = DomObject;
	
})(this);
