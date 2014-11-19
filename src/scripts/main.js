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