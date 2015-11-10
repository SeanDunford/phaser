var Meek = function(game) {
    this.game = game;

    this.maxHealth = 225;
    this.currentHealth = this.maxHealth;
    this.lastHealth = 0;
};
Meek.prototype.constructor = Meek;

$.extend(Meek.prototype, {
    play: function () {
        this.meek = game.add.sprite(600, 200, 'meekIdle');
        this.meek.animations.add('walk');
        this.meek.animations.play('walk', 7, true);
        this.origX = this.meek.x;
    },

    setDrake: function (drake) {
        this.drake = drake;
    },
    punched: function () {
        this.meek.loadTexture('meekPunched', 0);
        this.meek.animations.add('punched');
        this.meek.animations.play('punched', 8, false, false);

        this.meek.events.onAnimationComplete.add(function(){
            if (this.meek.animations.currentAnim.name === 'punched') {
                //Reset
                this.setMeekToIdle();
            }
        }.bind(this), this);

        setTimeout(function() {
            //Last punch impact
            this.game.add.tween(this.meek).to({ x: 800 }, 150, Phaser.Easing.Quadratic.None, true);
        }.bind(this), 950);
    },
    setMeekToIdle: function () {
        this.game.add.tween(this.meek).to({ x: this.origX }, 100, Phaser.Easing.Quadratic.None, true);
        this.meek.loadTexture('meekIdle', 0);
        this.meek.animations.add('walk');
        this.meek.animations.play('walk', 8, true);
    },
    punch: function () {
        this.meek.bringToTop();
        this.meek.loadTexture('meekPunch', 0);
        this.meek.animations.add('punch');
        this.meek.animations.play('punch', 8, false, false);

        this.meek.events.onAnimationStart.add(function(){
            if (this.meek.animations.currentAnim.name === 'punch') {
                this.drake.punched();
                this.game.add.tween(this.meek).to({ x: 390 }, 100, Phaser.Easing.Quadratic.None, true);
                setTimeout(function (){ //Last Punch
                    this.game.add.tween(this.meek).to({ x: 320 }, 40, Phaser.Easing.Quadratic.None, true);
                }.bind(this), 900);
            }
        }.bind(this), this);

        this.meek.events.onAnimationComplete.add(function(){
            if (this.meek.animations.currentAnim.name === 'punch') {
                //Reset
                this.setMeekToIdle();
            }
        }.bind(this), this);
    }
});