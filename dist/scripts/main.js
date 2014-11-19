var Particle = function(context, x, y, direction, speed, lineLength) {

    var context = context,
        speed = speed || 5,
        vel = {
            x:  Math.cos(direction * Math.PI / 180) * speed,
            y: -Math.sin(direction * Math.PI / 180) * speed
        };

    this.pos = {
        x: x || 0,
        y: y || 0
    };

    this.update = function(){
        this.pos.x += vel.x;
        this.pos.y += vel.y;

        if (this.pos.x < 0){
            this.pos.x = window.innerWidth;
        }

        if (this.pos.y < 0){
            this.pos.y = window.innerHeight;
        }

        if(this.pos.x > window.innerWidth){
            this.pos.x = 0;
        }

        if(this.pos.y > window.innerHeight){
            this.pos.y = 0;
        }

        this.draw();
        this.link();
    };

    this.draw = function(){
        context.strokeStyle = '#ffffff';
        context.rect(this.pos.x, this.pos.y, 1, 1);
        context.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        context.stroke();
    };

    // Link with other partials
    this.link = function(){
        var that = this;
        _.each(site.particles, function(particle){
            if (particle !== that && site.getDistance(particle, that) < lineLength){
                context.beginPath();
                context.moveTo(particle.pos.x, particle.pos.y);
                context.lineTo(that.pos.x, that.pos.y);
                context.strokeStyle = 'rgba(255, 255, 255, 0.03)';
                context.stroke();
            }
        });
    };
};
var site = (function(){

    var numOfParticles = 300,
        lineLength = _.random(10, 50),
        canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        particles = _(numOfParticles).times(function(n){
            return new Particle(
                ctx,
                n * (window.innerWidth / numOfParticles),
                window.innerHeight / numOfParticles * n,
                _.random(0, 360),
                _.random(0.5, 1),
                lineLength
            );
        });

    function init(){
        bindResize();
        setupParticles();
        requestAnimationFrame(draw);
    }

    function setupParticles(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function draw(){
        canvas.width = canvas.width;
        _.invoke(particles, 'update');
        requestAnimationFrame(draw);
    }

    function getDistance(particle1, particle2){
        var dx = particle1.pos.x - particle2.pos.x,
            dy = particle1.pos.y - particle2.pos.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function bindResize(){
        window.addEventListener("resize", _.debounce(setupParticles, 500), false);
    }

    return {
        start: init,
        particles: particles,
        getDistance: getDistance
    };

})();

site.start();