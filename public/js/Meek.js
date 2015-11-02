var Meek = function(game) {
    this.game = game;

    this.maxHealth = 225;
    this.currentHealth = this.maxHealth;
    this.lastHealth = 0;

    this.meek = game.add.sprite(600, 200, 'meekIdle');
    this.meek.animations.add('walk');
    this.meek.animations.play('walk', 7, true);
    this.origX = this.meek.x;
};
Meek.prototype.constructor = Meek;

Meek.prototype.setDrake = function (drake) {
    this.drake = drake;
};

Meek.prototype.punched = function () {
    setTimeout(function() {
        //Last punch impact
        this.game.add.tween(this.meek).to({ x: 800 }, 150, Phaser.Easing.Linear.None, true);
    }.bind(this), 950);

    setTimeout(function() {
        //Reset
        this.game.add.tween(this.meek).to({ x: 600 }, 200, Phaser.Easing.Linear.None, true);
    }.bind(this), 1480);
};