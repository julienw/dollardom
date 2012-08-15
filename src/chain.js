/**
* This file is part of $dom library (v0.9.2b)
* copyright 2009, 2010, 2011 Keith Clark
* Licensed under the MIT License.
* http://www.keithclark.co.uk/
*
* Copyright 2011, 2012 Julien Wajsberg
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
    
    // this doesn't detect cycles (like array containting itself)
    function _flatten(array) {
        var i = 0,
            result = [],
            queue = [ array ],
            current, ii, ll, item;
        
        while (i < queue.length) {
            current = queue[i]; // current is always an array
            for (ii = 0, ll = current.length; ii < ll; ii++) {
                item = current[ii];
                if (isArray(item)) {
                    queue.push(item);
                } else {
                    result.push(item);
                }
            }
            i++;
        }
        return result;
    }
    
    function _isArray(arg) {  
        return Object.prototype.toString.call(arg) === '[object Array]';  
    }

    var each = Array.prototype.forEach ? function(array, func) { array.forEach(func); } : _each,
        map = Array.prototype.map ? function(array, func) { return array.map(func); } : _map,
        isArray = Array.isArray || _isArray;
    
    function DomObject(array) {
        this.a = array;
    }

    function select(sel, doc) {
        return new DomObject($dom.get(sel, doc));
    }

    function newElement(sel, doc) {
        return new DomObject([ $dom.create(sel, doc) ]);
    }
    
    function fromDom(a) {
        a = isArray(a) ? a : [ a ];
        return new DomObject(a);
    }

    var proto = $dom.fn = DomObject.prototype = {
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
            return fromDom(
                _flatten(
                    map(this.a, function(elt) {
                        return $dom.descendants(elt, sel);
                    })
                )
            );
        },
        ancestor: function(sel) {
            return fromDom(
                map(this.a, function(elt) {
                    return $dom.ancestor(elt, sel);
                })
            );
        },
        next: function(sel) {
            return fromDom(
                map(this.a, function(elt) {
                    return $dom.next(elt, sel);
                })
            );
        },
        previous: function(sel) {
            return fromDom(
                map(this.a, function(elt) {
                    return $dom.previous(elt, sel);
                })
            );
        },
        first: function(sel) {
            return fromDom(
                map(this.a, function(elt) {
                    return $dom.first(elt, sel);
                })
            );
        },
        last: function(sel) {
            return fromDom(
                map(this.a, function(elt) {
                    return $dom.last(elt, sel);
                })
            );
        },
        empty: function() {
            each(this.a, $dom.empty);
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
        dom: function(n) {
            return (typeof n === "number") ? this.a[n] : this.a;
        },
        append: function(what) {
            if (what instanceof DomObject) {
                what = what.a;
            }
            
            if (! isArray(what)) {
                what = [ what ];
            }
            each(this.a, function(node) {
                each(what, function(what) {
                    node.appendChild(what);
                });
            });
            return this;
        },
        appendTo: function(node) {
            if (! (node instanceof DomObject)) {
                node = fromDom(node);
            }
            
            node.append(this);
            return this;
        },
        size: function() {
            return this.a.length;
        },
        each: function(func) {
            each(this.a, func);
            return this;
        },
        text: function(str) {
            return this.append($dom.text(str));
        },
        extend: $dom.extend,
        attr: function(key, val) {
            return this.a.length && $dom.attr(this.a[0], key, val);
        }
    };

    if ($dom.transform) {
        proto.transform = proto.animate = function(props, duration, callback) {
            each(this.a, function(elt) {
                $dom.transform(elt, props, duration, callback);
                callback = null; // call callback only once
            });
            return this;
        };
    }

    $dom.extend({
        Get: select,
        select: select,
        Create: newElement,
        element: newElement,
        From: fromDom,
        from: fromDom,
        each: each,
        map: map
    });
    
})(this);
