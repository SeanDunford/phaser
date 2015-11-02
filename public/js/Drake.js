var Drake = function(game) {
    this.game = game;

    this.maxHealth = 250;
    this.currentHealth = this.maxHealth;
    this.lastHealth = 0;

    this.drake = game.add.sprite(300, 200, 'drakeIdle');
    this.drake.animations.add('walk');
    this.drake.animations.play('walk', 8, true);
    this.origX = this.drake.x;
};
Drake.prototype.constructor = Drake;

Drake.prototype.punch = function () {
    this.drake.loadTexture('drakePunch', 0);
    this.drake.animations.add('punch');
    this.drake.animations.play('punch', 8, false, false);

    this.drake.events.onAnimationStart.add(function(){
        if (this.drake.animations.currentAnim.name === 'punch') {
            this.meek.punched();
            this.game.add.tween(this.drake).to({ x: 510 }, 100, Phaser.Easing.Linear.None, true);
            setTimeout(function (){ //Last Punch
                this.game.add.tween(this.drake).to({ x: 580 }, 40, Phaser.Easing.Linear.None, true);
            }.bind(this), 900);
        }
    }.bind(this), this);

    this.drake.events.onAnimationComplete.add(function(){
        if (this.drake.animations.currentAnim.name === 'punch') {
            //Reset
            this.game.add.tween(this.drake).to({ x: this.origX }, 100, Phaser.Easing.Linear.None, true);
            this.drake.loadTexture('drakeIdle', 0);
            this.drake.animations.add('walk');
            this.drake.animations.play('walk', 8, true);
        }
    }.bind(this), this);
};

Drake.prototype.setMeek = function (meek) {
    this.meek = meek;
};
