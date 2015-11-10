var easing = Phaser.Easing.Exponential.Out;

var Drake = function(game) {
    this.game = game;

    this.maxHealth = 250;
    this.currentHealth = this.maxHealth;
    this.lastHealth = 0;
};
Drake.prototype.constructor = Drake;

$.extend(Drake.prototype, {
    play: function () {
        this.drake = game.add.sprite(300, 200, 'drakeIdle');
        this.drake.animations.add('walk');
        this.drake.animations.play('walk', 8, true);
        this.origX = this.drake.x;

        this.drake.events.onAnimationStart.add(function(){
            console.log('animation started.');
            if (this.drake.animations.currentAnim.name === 'punch') {
                this.meek.punched();
                this.game.add.tween(this.drake).to({ x: 510 }, 100, easing, true);
                setTimeout(function (){ //Last Punch
                    this.game.add.tween(this.drake).to({ x: 580 }, 40, easing, true);
                }.bind(this), 900);
            }
        }.bind(this), this);

        this.drake.events.onAnimationComplete.add(function(){
            var name = this.drake.animations.currentAnim.name;
            if (name === 'punch' || name === 'punched') {
                //Reset
                this.setDrakeToIdle();
            }
        }.bind(this), this);
    },
    punch: function () {
        this.drake.bringToTop();
        this.drake.loadTexture('drakePunch', 0);
        this.drake.animations.add('punch');
        this.drake.animations.play('punch', 8, false, false);


    },
    setDrakeToIdle: function () {
        this.game.add.tween(this.drake).to({ x: this.origX }, 100, easing, true);
        this.drake.loadTexture('drakeIdle', 0);
        this.drake.animations.add('walk');
        this.drake.animations.play('walk', 8, true);
    },
    punched: function () {
        this.drake.loadTexture('drakePunched', 0);
        this.drake.animations.add('punched');
        this.drake.animations.play('punched', 8, false, false);

        setTimeout(function() {
            //Last punch impact
            this.game.add.tween(this.drake).to({ x: 100 }, 150, easing, true);
        }.bind(this), 950);
    },
    setMeek: function (meek) {
        this.meek = meek;
    }
});
