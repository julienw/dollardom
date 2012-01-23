/**
* This file is part of $dom library (v0.9.1b)
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

	var $dom = window.$dom,
		_style = $dom.style,
		animItems = [],
        _undefined,
	
	// Paul Irish's requestAnimationFrame shim
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
		requestAnimFrame = window.requestAnimationFrame || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     ||
              function(/* function */ callback /*, DOMElement element */){
                window.setTimeout(function() { callback(); }, 16);
              },
        // we don't support relative units for animation on purpose, because
        // it's difficult to get it right : computedStyle comes in absolute units
		re_css_property = /^(.*?)(px|deg)?$/;


    function _removeAnim(index, fin) {
        var item = animItems.splice(index, 1)[0];
        
        if (item.callback) {
            item.callback(fin, item.elm);
        }
    }
    
    function _timerAnim(timestamp) {
		timestamp = timestamp || +new Date(); // Chrome 10 and the shim function give no time argument
		for (var c = animItems.length - 1; c >= 0; c--)	{
			var	prop, style,
				styles = {},
				anim = animItems[c];
			
			// set startTime if not set
			anim.startTime = anim.startTime || timestamp;
			
			var duration = anim.duration,
				props = anim.properties,
				ticks = timestamp - anim.startTime,
				ref = 0.5 - (Math.cos(ticks / duration * (Math.PI)) / 2);

			for (prop in props)	{
				style = props[prop];
/*					
				styles[prop] = Number(ticks >= duration ?
						style.e :
						style.s > style.e ?
							style.e + (style.s - style.e) * (1 - ref) : // going backward
							style.s + (style.e - style.s) * ref  // going forward
						).toFixed(2) + style.u;
*/
				styles[prop] = "" + (ticks >= duration ?
						style.e :
						style.s + (style.e - style.s) * ref
						) + style.u;
			
				if (styles[prop] == "NaNpx") {
					styles[prop] = 0;
				}
			}
			_style(anim.elm, styles);

			if (ticks >= duration) {
				_removeAnim(c, true);
			}
		}

		if (animItems.length) {
			requestAnimFrame(_timerAnim);
		}
	}


    function _anim(elm, properties, duration, callback) {
        var property, props = [], s, e, i = -1, c;

        for (c = animItems.length - 1; c >= 0; c--) {
            if (animItems[c].elm == elm) {
                i = c; break;
            }
        }

        if (properties === _undefined) {
            return i > -1; // means an animation is running
        }
        if (i > -1) {
			// if it was already animating, then we stop the last animation
            _removeAnim(i, false);
        }

        if (duration === _undefined) {
            duration = 500;
        }


        for (property in properties) {
            s = re_css_property.exec(_style(elm, property)); // current style
            e = re_css_property.exec(properties[property]); // style to be
            props[property] = {
				s: parseFloat(s[1]) || 0,
				e: parseFloat(e[1]) || 0,
				// we use s[2] only if the user didn't put any unit in the command
				u: e[2] || s[2] || ""
			};
        }

        animItems.push({
			elm: elm,
			properties: props,
			callback: callback,
			duration: duration
		});

		requestAnimFrame(_timerAnim);
    }
    
    $dom.transform = $dom.animate = _anim;

})(this);
