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
        this.width = this.$canvas.width(),
        this.height = this.$canvas.height(),
        this.radius = radius,
        this.duration = duration;
        this.slices = slices;

        $element.find('.breakdown').mousemove(function(event) {
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
        	        $element.find('.tooltip').removeClass('active');
                    $element.find('li:eq('+i+') .tooltip').addClass('active');
        	    }
        	}
        });
        
        $element.find('.breakdown').mouseleave(function(event) {
            $element.find('.tooltip').removeClass('active');
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
                self.ctx.clearRect(0, 0, self.width, self.height);
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
        
        tween = new TWEEN.Tween(piechart).to({angle: 270}, this.duration).easing(TWEEN.Easing.Quartic.EaseOut).onUpdate(update).start();
    }
});

var RingChart = PieChart.extend({
    init: function(divId, cx, cy, radius, duration, slices) {
        this._super(divId, cx, cy, radius, duration, slices);
    },
    
    drawSlice: function(startAngle, endAngle, color) {
        var ctx = this.ctx;
        ctx.strokeStyle = color;
    	ctx.lineWidth = 15;
    	ctx.lineCap = 'butt';
        ctx.beginPath();
		ctx.arc(this.cx, this.cy, this.radius, deg2rad(startAngle), deg2rad(endAngle), false);
    	ctx.stroke();
    }
});


var LineChart = Widget.extend({
    init: function(divId, width, height, color, duration, points) {
        var self = this,
            $element = $(divId),
            currentPoint;

        this._super($element);
        this.$canvas = $element.find('canvas');
        this.ctx = this.$canvas[0].getContext("2d");
        this.width = width;
        this.height = height;
        this.color = color;
        this.duration = duration;
        this.points = points;
        this.pointOffset = this.width / (points.length - 1);
	    this.tooltip = {x: 0, y: 0};

        $(divId).mousemove(function(event) {
            var chartPos = $(this).offset(),
                mx = event.pageX - chartPos.left,
        	    my = event.pageY - chartPos.top,
        	    p = Math.round(mx / self.pointOffset),
        	    updateTooltip = function() {
        	        console.log('x:'+Math.round(self.tooltip.x)+' y:'+Math.round(self.tooltip.y));
        	        // TODO: Change tooltip position
        	    };
        	
        	if(p !== currentPoint) {
        	    currentPoint = p;
        	    // TODO: Change tooltip content
        	    new TWEEN.Tween(self.tooltip).to({x: p * self.pointOffset, y: self.height - self.points[p]}, 300)
        	                                 .onUpdate(updateTooltip)
        	                                 .start();
        	}
        });
    },
    
    drawBackground: function() {
        var x = 0;

        ctx = this.ctx;
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#555';
        for(var i = 0, nb = this.points.length; i < nb; i++) {
            x = Math.round(i * this.pointOffset);
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
        }
        ctx.moveTo(0, this.height);
        ctx.lineTo(this.width, this.height);
        ctx.stroke();
    },
    
    animate: function() {
        var self = this,
            nbPoints = self.points.length,
            animatedPoints = [],
            ctx = this.ctx,
            update = function() {
                var x, y;
                
                ctx.clearRect(0, 0, self.width, self.height);
                self.drawBackground();
                ctx.lineWidth = 5;
            	ctx.strokeStyle = self.color;
                ctx.beginPath();
                ctx.moveTo(0, animatedPoints[0].value);
                for(var i = 1; i < nbPoints; i++) {
                    x = i * self.pointOffset;
                    y = animatedPoints[i].value;
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
            };
        
        for(var i = 0; i < nbPoints; i++) {
            var point = {value: this.height};
            new TWEEN.Tween(point).to({value: this.height - this.points[i]}, this.duration+(i*(this.duration/nbPoints)))
                                  .easing(TWEEN.Easing.Quartic.EaseOut)
                                  .onUpdate(update)
                                  .start();
            animatedPoints.push(point);
        }
    }
});