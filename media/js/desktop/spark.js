var Spark = Class.extend({
    init: function(canvasId, h, w) {
        var canvas = document.getElementById(canvasId),
            red = '232, 57, 57',
            orange = '252, 174, 70',
            yellow = '247, 227, 94';

        this.h = h;
        this.w = w;
        canvas.height = this.h;
        canvas.width = this.w;
        this.ctx = canvas.getContext('2d');
        this.shapes = [{ arcAngle: 88, angle: -55, angleStep: -0.6, minAngle: 30, maxAngle: 160, rgb: red, scale: 1.2, scaleStep: 0.005, minScale: 1.1, maxScale: 1.25 },
                       { arcAngle: 85, angle: -85, angleStep: -0.6, minAngle: 60, maxAngle: 170, rgb: red, scale: 0.95, scaleStep: 0.005, minScale: 0.9, maxScale: 1.1 },
                       { arcAngle: 60, angle: -10, angleStep: -0.6, minAngle: 5, maxAngle: 90, rgb: red, scale: 0.92, scaleStep: 0.005, minScale: 0.85, maxScale: 1.0 },
                       { arcAngle: 90, angle: -90, angleStep: -0.6, minAngle: 80, maxAngle: 180, rgb: orange, scale: 0.55, scaleStep: 0.005, minScale: 0.45, maxScale: 0.6 },
                       { arcAngle: 95, angle: 0, angleStep: -0.6, minAngle: -10, maxAngle: 100, rgb: orange, scale: 0.4, scaleStep: 0.005, minScale: 0.35, maxScale: 0.5 },
                       { arcAngle: 50, angle: -110, angleStep: -0.6, minAngle: 90, maxAngle: 170, rgb: orange, scale: 0.7, scaleStep: 0.005, minScale: 0.6, maxScale: 0.75 },
                       { arcAngle: 90, angle: -12, angleStep: -0.6, minAngle: 5, maxAngle: 130, rgb: orange, scale: 0.75, scaleStep: 0.005, minScale: 0.7, maxScale: 0.8 },
                       { arcAngle: 80, angle: -50, angleStep: -0.75, minAngle: 25, maxAngle: 145, rgb: yellow, scale: 0.32, scaleStep: 0.005, minScale: 0.3, maxScale: 0.4 },
                       { arcAngle: 90, angle: -90, angleStep: -0.015, minAngle: 80, maxAngle: 200, rgb: yellow, scale: 0.2, scaleStep: 0.005, minScale: 0.2, maxScale: 0.3 },
                       { arcAngle: 30, angle: -22, angleStep: 1, minAngle: 10, maxAngle: 160, rgb: yellow, scale: 0.28, scaleStep: 0.005, minScale: 0.2, maxScale: 0.3 }];
        
        this.play();
    },
    
    update: function() {
        var dice, s;
        
        for(var i = 0, nb = this.shapes.length; i < nb; i += 1) {
            s = this.shapes[i];
            dice = rand(1, 20);

            s.moveFactor = 1-(i / 6);

            if(Math.abs(s.angle) > (s.maxAngle - s.arcAngle) || Math.abs(s.angle) < s.minAngle || dice === 6) {
                s.angleStep *= -1;
            } 
            s.angle += s.angleStep * rand(1, 2);

            if(s.scale > s.maxScale || s.scale < s.minScale || dice === 1) {
                s.scaleStep *= -1;
            }
            s.scale += s.scaleStep * rand(1, 2);
        }
    },

    draw: function() {
        var shape, ctx = this.ctx;
        
        for(i = 0, nb = this.shapes.length; i < nb; i += 1) {
            shape = this.shapes[i];

         	ctx.save();
                ctx.shadowBlur = 30;
                ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    	    	ctx.fillStyle = "rgba("+shape.rgb+", 0.8)";
    		    ctx.translate(this.w / 2, this.h);
    	        ctx.rotate(deg2rad(shape.angle));
    	        ctx.beginPath();
    	        ctx.moveTo(0, 0);
    	        ctx.arc(0, 0, 100 * shape.scale, 0, -deg2rad(shape.arcAngle), true);
    	        ctx.fill();
    	    ctx.restore();
        }
    },

    play: function() {
        var self = this;
        
        this.animation = setInterval(function() {
            self.ctx.clearRect(0, 0, self.w, self.h);
            self.update();
            self.draw();
        }, 1000 / 60);
    },
    
    pause: function() {
        clearInterval(this.animation);
    }
});
