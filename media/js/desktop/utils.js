var TRANSITION_END = 'transitionend webkitTransitionEnd oTransitionEnd';

var onTransitionEnd = function($element, callback) {
    $element.bind(TRANSITION_END, callback);
};

var onTransitionEndOnce = function($element, callback) {
    var transitionEndWrapper = function() {
            if(callback) {
                callback();
            }
            $element.unbind(TRANSITION_END, transitionEndWrapper);
        };
    $element.bind(TRANSITION_END, transitionEndWrapper);
};

var deg2rad = function(degrees) {
    return degrees * Math.PI / 180;
};

var rad2deg = function(radians) {
    return radians * 180 / Math.PI;
};

var rand = function(min, max) {
    return min + (Math.random() * (max - min));
};

/**
 * Based on: http://www.mredkj.com/javascript/numberFormat.html#addcommas
 */
var addThousandsSeparator = function addCommas(str, separator) {
	str += '';
	x = str.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + separator + '$2');
	}
	return x1 + x2;
};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};