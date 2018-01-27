function PlagueDoctor(game) {
    this.idleAnimationDown = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 384, 64, 64, 0.5, 3, true, false);
    this.idleAnimationUp = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"),0,192,64,64,0.5,2,true,false);
    this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 256, 64, 64, 0.5, 3, true, false);
    this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 320, 64, 64, 0.5, 3, true, false);

    this.walkAnimationUp = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 448, 64, 64, 0.2, 4, true, false);
    this.walkAnimationDown = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 512, 64, 64, 0.2, 4, true, false);
    this.walkAnimationDownAgro = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 576, 64, 64, 0.2, 4, true, false);
    this.walkAnimationLeft = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 640, 64, 64, 0.2, 4, true, false);
    this.walkAnimationLeftAgro = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 704, 64, 64, 0.2, 4, true, false);
    this.walkAnimationRight = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 768, 64, 64, 0.2, 4, true, false);
    this.walkAnimationRightAgro = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 832, 64, 64, 0.2, 4, true, false);

    this.attackAnimationDown = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 0, 64, 64, 0.6, 4, true, false);
    this.attackAnimationUp = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 128, 192, 64, 64, 0.6, 1, true, false);
    this.attackAnimationLeft = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 64, 64, 64, 0.6, 4, true, false);
    this.attackAnimationRight = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 128, 64, 64, 0.6, 4, true, false);

    this.spellAnimationUp = new Animation(ASSET_MANAGER.getAsset("./img/PD_Spell_SpriteSheet.png"), 0, 128, 64, 64, 0.2, 3, true, false);
    this.spellAnimationDown = new Animation(ASSET_MANAGER.getAsset("./img/PD_Spell_SpriteSheet.png"), 0, 64, 64, 64, 0.2, 3, true, false);
    this.spellAnimationLeft = new Animation(ASSET_MANAGER.getAsset("./img/PD_Spell_SpriteSheet.png"), 0, 0, 64, 64, 0.2, 3, true, false);
    this.spellAnimationRight = new Animation(ASSET_MANAGER.getAsset("./img/PD_Spell_SpriteSheet.png"), 0, 192, 64, 64, 0.2, 3, true, false);


    this.deathAnimationDown = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 896, 64, 64, 0.4, 4, false, false);
    this.deathAnimationUp = new Animation(ASSET_MANAGER.getAsset("./img/PlagueDoctor_SpriteSheet.png"), 0, 960, 64, 64, 0.4, 4, false, false);
    this.dead = false;
    this.radius = 100;

    this.facingDirection = "down";
    this.standingStill = true;
    this.attacking = false;
    this.isAngry = false;
    this.currentProjectile = null;
    Entity.call(this, game, 400, 400);
}

PlagueDoctor.prototype = new Entity();
PlagueDoctor.prototype.constructor = PlagueDoctor;

PlagueDoctor.prototype.update = function () {
    //If a death animation is occuring
    if (this.deathAnimationDown.isDone() || this.deathAnimationUp.isDone()) {
        this.removeFromWorld = true;
    }
    if (this.game.K) this.dead = true;

    if (!this.dead) {

        if (this.currentProjectile === null || this.currentProjectile.removeFromWorld) {
            this.attacking = false;
            if (this.game.W) {
                this.facingDirection = "up";
                this.standingStill = false;
            }
            if (this.game.A) {
                this.facingDirection = "left";
                this.standingStill = false
            }
            if (this.game.S) {
                this.facingDirection = "down";
                this.standingStill = false;
            }
            if (this.game.D) {
                this.facingDirection = "right";
                this.standingStill = false;
            }
            if (this.game.I) {
                this.standingStill = true;
            }
        }

        if (this.game.space) {
            this.attacking = true;
            this.standingStill = true;
        }

        if (this.attacking) {
            this.standingStill = true;

            if(this.game.space !== null && (this.currentProjectile === null || this.currentProjectile.removeFromWorld)) {
                this.createSpell();
            }
        }
    }

    Entity.prototype.update.call(this);
};

PlagueDoctor.prototype.createSpell = function () {
    var currentSpellAnimation = null;
    var facingNum = 0;
    var spellX = this.x;
    var spellY = this.y;
    switch(this.facingDirection) {

        case "down":
            //no need to change the x and y locations.
            currentSpellAnimation = this.spellAnimationDown;
            facingNum = 2;
            break;
        case "up":
            spellY = this.y - 32;
            currentSpellAnimation = this.spellAnimationUp;
            facingNum = 1;
            break;
        case "left":
            spellX = this.x - 5;
            spellY = this.y - 2;
            currentSpellAnimation = this.spellAnimationLeft;
            facingNum = 3;
            break;
        case "right":
            spellX = this.x + 5;
            spellY = this.y - 2;
            currentSpellAnimation = this.spellAnimationRight;
            facingNum = 4;
            break;
    }
    this.currentProjectile = new Projectile(this.game, currentSpellAnimation,facingNum,spellX,spellY,this.player);
    this.game.addEntity(this.currentProjectile);

};

PlagueDoctor.prototype.draw = function (ctx) {
    if(this.dead) {
        this.death(ctx);
    } else if(this.attacking) {
        this.attack(ctx);
    } else if (this.standingStill){
        this.standStill(ctx);
    } else {
        this.walking(ctx);
    }

    Entity.prototype.draw.call(this);
};

PlagueDoctor.prototype.death = function(ctx) {
    switch(this.facingDirection) {
        case "down":
            this.deathAnimationDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case "up":
            this.deathAnimationUp.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case "left":
            this.deathAnimationDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case "right":
            this.deathAnimationDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
    }
};

PlagueDoctor.prototype.standStill = function (ctx) {

    switch(this.facingDirection) {
        case "down":
            this.idleAnimationDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case "up":
            this.idleAnimationUp.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case "left":
            this.idleAnimationLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case "right":
            this.idleAnimationRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
    }

};

PlagueDoctor.prototype.walking = function(ctx) {
    switch(this.facingDirection) {
        case "down":
            if (this.isAngry) {
                this.walkAnimationDownAgro.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            } else {
                this.walkAnimationDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            }
            break;
        case "up":
            this.walkAnimationUp.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case "left":
            if (this.isAngry) {
                this.walkAnimationLeftAgro.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            } else {
                this.walkAnimationLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            }
            break;
        case "right":
            if (this.isAngry) {
                this.walkAnimationRightAgro.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            } else {
                this.walkAnimationRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            }
            break;
    }
};

PlagueDoctor.prototype.attack = function (ctx) {
    switch(this.facingDirection) {
        case "down":
            this.attackAnimationDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case "up":
            this.attackAnimationUp.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case "left":
            this.attackAnimationLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case "right":
            this.attackAnimationRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
    }
};