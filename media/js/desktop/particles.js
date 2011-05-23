var ParticleSystem = Class.extend({
    init: function(canvasId, spritePath, spriteSize, width, height, nbParticles) {
        var self = this;
        
        this.canvas = document.getElementById(canvasId),
        this.ctx = this.canvas.getContext('2d'),
        this.w = width,
        this.h = height,
        this.particleSprite = new Image(),
        this.particleSprite.src = spritePath;
        this.particles = [],
        this.NB_PARTICLES = nbParticles;

        this.canvas.height = this.h;
        this.canvas.width = this.w;

        for(var i = 0; i < this.NB_PARTICLES; i += 1) {
            this.spawnParticle();
        };
        
        this.particleSprite.onload = function() {
            self.play();
        };
    },
    
    spawnParticle: function() {
        this.particles.push({ xPos: Math.round(rand(0, 220)),
                              yPos: rand(300, 320),
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

        ctx.clearRect(0, 0, this.w, this.h);
        for(var i = 0, nb = this.particles.length; i < nb; i += 1) {
            p = this.particles[i];
            ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.drawImage(this.particleSprite, p.xPos, p.yPos);
            ctx.restore();
        }
    },
    
    play: function() {
        var self = this;
        
        this.animation = setInterval(function() {
            self.update();
            self.draw();
            console.log('play');
        }, 1000 / 60);
    },
    
    pause: function() {
        clearInterval(this.animation);
    }
});
