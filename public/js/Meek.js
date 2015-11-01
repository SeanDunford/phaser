var Meek = function(game) {
    this.game = game;

    this.maxHealth = 225;
    this.currentHealth = this.maxHealth;
    this.lastHealth = 0;

    this.meek = game.add.sprite(600, 200, 'meekIdle');
    this.meek.animations.add('walk');
    this.meek.animations.play('walk', 7, true);
};
Meek.prototype.constructor = Meek;

//Drake.prototype.setupConfiguration = function (providedConfig) {
//    this.config = this.mergeWithDefaultConfiguration(providedConfig);
//    this.flipped = this.config.flipped;
//};
