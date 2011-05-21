var Widget = Class.extend({
    init: function($element) {
        var self = this,
            $previousSibling;
            
        this.$el = $element;
        this.pageName = $element.parent().attr('id');
        $previousSibling = this.$el.prev();
        
        if($previousSibling.length > 0) {
            onTransitionEnd($previousSibling, function() {
                self.animate();
            });
        } else {
            subscribe("pagechange",  function(pageName) {
                if(self.pageName === pageName) {
                    self.animate();
                }
            });
        }
    },
    
    animate: function() {}
});

var CountUp = Widget.extend({
    init: function($element) {
        var numberStr, regexp;
        
        this._super($element);
        this.duration = 350;
        this.$number = this.$el.find('.number');
        numberStr = this.$number.text();
        this.thousandsSeparator = numberStr.indexOf(',') >= 0 ? ',': ' ';
        regexp = this.thousandsSeparator === ',' ? /,+/g : /\s+/g;
        this.maxValue = parseInt(numberStr.replace(regexp, ''));
    },
    
    animate: function() {
        var self = this,
            counter = {value: 0},
            update = function() {
                self.$number.text(addThousandsSeparator(Math.round(counter.value), self.thousandsSeparator));
            };
        
        tween = new TWEEN.Tween(counter).to({value: this.maxValue}, this.duration).onUpdate(update).start();
    }
});

var PieChart = Widget.extend({
    init: function(divId, cx, cy, radius, duration, slices) {
        var self = this,
            $element = $(divId);
        
        this._super($element);
        this.$canvas = $element.find('canvas');
        this.ctx = this.$canvas[0].getContext("2d"),
        this.cx = cx,
        this.cy = cy,
        this.radius = radius,
        this.duration = duration;
        this.slices = slices;

        $('#spark-1 .block-2 canvas').mousemove(function(event) {
            console.log('prout');
            var chartPos = $(this).offset(),
                mx = event.pageX - chartPos.left,
        	    my = event.pageY - chartPos.top,
        	    x = mx - cx,
        	    y = -(my - cy),
        	    a = rad2deg(Math.atan2(y, x)),
        	    slice;
            
        	if(a < 0) a += 360;
        	a = 360 - a;
        	if(a > 270) a -= 360;

        	for(var i = 0, nb = self.slices.length; i < nb; i++) {
        	    slice = self.slices[i];
        	    
        	    if(a > slice.start && a < slice.end) {
        	        console.log(slice.name);
        	    }
        	}
        });
    },
    
    drawSlice: function(startAngle, endAngle, color) {
        var ctx = this.ctx;
        ctx.beginPath();
		ctx.moveTo(this.cx, this.cy);
		ctx.arc(this.cx, this.cy, this.radius, deg2rad(startAngle), deg2rad(endAngle), false);
    	ctx.closePath();
    	ctx.fillStyle = color;
    	ctx.fill();
    },
    
    animate: function() {
        var self = this,
            piechart = {angle: -90},
            update = function() {
                for(var i = 0, nb = self.slices.length; i < nb; i++) {
                    var slice = self.slices[i];
                    
                    if(piechart.angle > slice.start) {
                        if(piechart.angle < slice.end) {
                            self.drawSlice(slice.start, piechart.angle, slice.color);
                        } else {
                            self.drawSlice(slice.start, slice.end, slice.color);
                        }
                    }
                }
            };

        this.ctx.clearRect(0, 0, this.$canvas.width(), this.$canvas.height());
        tween = new TWEEN.Tween(piechart).to({angle: 270}, this.duration).easing(TWEEN.Easing.Quartic.EaseOut).onUpdate(update).start();
    }
});