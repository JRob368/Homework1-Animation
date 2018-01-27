function Projectile(game, animation, direction, startX, startY) {

    this.shootAnimation = animation;
    this.facingDirection = direction;
    this.maxAnimationLoopsBeforeRemoval = 5;

    Entity.call(this, game, startX, startY);
}

Projectile.prototype = new Entity();
Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function () {
    if (this.shootAnimation.timesFinished >= this.maxAnimationLoopsBeforeRemoval) {
        this.removeFromWorld = true;
        this.shootAnimation.timesFinished = 0;
    }

    var totalDistance = 2;
    var distance = 0;

    switch (this.facingDirection) {
        case 1: //forward
            distance = totalDistance;
            this.y = this.y - distance;
            break;
        case 2: //downward
            distance = totalDistance;
            this.y = this.y + distance;
            break;
        case 3: //left
            distance = totalDistance;
            this.x = this.x - distance;
            break;
        case 4: //right
            distance = totalDistance;
            this.x = this.x + distance;
            break;
        default: //anything else

            return;
    }
    Entity.prototype.update.call(this);
};

Projectile.prototype.draw = function (ctx) {

    this.shootAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}
