var ParticleSystem = Class.extend({
    init: function(context, sprite, spriteSize, x, y, width, height, nbParticles) {
        
        this.ctx = context;
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.spriteSize = spriteSize;
        this.particles = [];
        this.NB_PARTICLES = nbParticles;

        for(var i = 0; i < this.NB_PARTICLES; i += 1) {
            this.spawnParticle();
        };
    },
    
    spawnParticle: function() {
        this.particles.push({ xPos: Math.round(rand(0, this.w)),
                              yPos: rand(this.h - 20, this.h),
                              yStep: rand(0.5, 5),
                              alpha: rand(0, 1) });
    },
    
    update: function() {
        var p;
        
        for(var i = 0, nb = this.particles.length; i < nb; i += 1) {
            p = this.particles[i];

            // p.alpha -= 0.1;
            p.yPos = Math.round(p.yPos - p.yStep);
            p.duration -= p.durationStep;
            p.alpha -= 0.01;
            if(p.alpha <= 0) {
                this.particles.remove(i);
                this.spawnParticle();
            }
        }
    },
    
    draw: function() {
        var p, ctx = this.ctx;

        for(var i = 0, nb = this.particles.length; i < nb; i += 1) {
            p = this.particles[i];
            ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.drawImage(this.sprite, this.x + p.xPos, this.y + p.yPos, this.spriteSize, this.spriteSize);
            ctx.restore();
        }
    }
});

var Lights = Class.extend({
    init: function(canvasId, spritePath, spriteSize, width, height) {
        var self = this;
        
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.w = width;
        this.h = height;
        this.particleSprite = new Image();
        this.particleSprite.src = spritePath;

        this.canvas.width = this.w;
        this.canvas.height = this.h;
        
        this.systems = [];
        
        this.particleSprite.onload = function() {
            self.systems.push(new ParticleSystem(self.ctx, self.particleSprite, 13, 0, 0, 205, 320, 20));
            self.systems.push(new ParticleSystem(self.ctx, self.particleSprite, 7, 220, -100, 80, 260, 15));
            self.systems.push(new ParticleSystem(self.ctx, self.particleSprite, 5, 60, -100, 50, 260, 15));
            self.play();
        };
    },
    
    forEachSystem: function(callback) {
        for(var i = 0; i < 3; i++) {
            callback(this.systems[i]);
        }
    },
    
    play: function() {
        var self = this;
        
        this.animation = setInterval(function() {
            self.ctx.clearRect(0, 0, self.w, self.h);
            self.forEachSystem(function(system) {
                system.update();
                system.draw();
            });
        }, 1000 / 60);
    },
    
    pause: function() {
        clearInterval(this.animation);
    }
});

