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


Meek.prototype.punch = function () {
    this.meek.bringToTop();
    this.meek.loadTexture('meekPunch', 0);
    this.meek.animations.add('punch');
    this.meek.animations.play('punch', 8, false, false);

    this.meek.events.onAnimationStart.add(function(){
        if (this.meek.animations.currentAnim.name === 'punch') {
            this.drake.punched();
            this.game.add.tween(this.meek).to({ x: 390 }, 100, Phaser.Easing.Linear.None, true);
            setTimeout(function (){ //Last Punch
                this.game.add.tween(this.meek).to({ x: 320 }, 40, Phaser.Easing.Linear.None, true);
            }.bind(this), 900);
        }
    }.bind(this), this);

    this.meek.events.onAnimationComplete.add(function(){
        if (this.meek.animations.currentAnim.name === 'punch') {
            //Reset
            this.game.add.tween(this.meek).to({ x: this.origX }, 100, Phaser.Easing.Linear.None, true);
            this.meek.loadTexture('meekIdle', 0);
            this.meek.animations.add('walk');
            this.meek.animations.play('walk', 8, true);
        }
    }.bind(this), this);
};