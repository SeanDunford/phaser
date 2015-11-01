var Drake = function(game) {
    this.game = game;

    this.maxHealth = 250;
    this.currentHealth = this.maxHealth;
    this.lastHealth = 0;
};
Drake.prototype.constructor = Drake;

//Drake.prototype.setupConfiguration = function (providedConfig) {
//    this.config = this.mergeWithDefaultConfiguration(providedConfig);
//    this.flipped = this.config.flipped;
//};
