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