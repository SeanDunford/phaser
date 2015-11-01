var Meek = function(game) {
    this.game = game;

    this.maxHealth = 225;
    this.currentHealth = this.maxHealth;
    this.lastHealth = 0;
};
Meek.prototype.constructor = Meek;

//Drake.prototype.setupConfiguration = function (providedConfig) {
//    this.config = this.mergeWithDefaultConfiguration(providedConfig);
//    this.flipped = this.config.flipped;
//};
