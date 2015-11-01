var Drake = function(game) {
    this.game = game;

    this.maxHealth = 250;
    this.currentHealth = this.maxHealth;
    this.lastHealth = 0;

    this.drake = game.add.sprite(300, 200, 'drakeIdle');
    this.drake.animations.add('walk');
    this.drake.animations.play('walk', 8, true);
};
Drake.prototype.constructor = Drake;

Drake.prototype.punch = function () {
    this.drake.loadTexture('drakePunch', 0);
    this.drake.animations.add('punch');
    this.drake.animations.play('punch', 8, false, false);
    this.drake.events.onAnimationComplete.add(function(){
        this.drake.loadTexture('drakeIdle', 0);
        this.drake.animations.add('walk');
        this.drake.animations.play('walk', 8, true);
    }, this);
};
