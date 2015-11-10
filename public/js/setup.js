var spacingButtons = 100, buttonWidth = 72, buttonY = 480;

var Setup = function(game) {
    this.game = game;
    this.beginSetup();
};
Setup.prototype.constructor = Setup;

$.extend(Setup.prototype, {
    beginSetup: function () {
        this.setupCanvas();
        this.loadImages();
    },
    setupCanvas: function () {
        var canvas = $('canvas');
        var gameDiv = $('.game').addClass('contentCentered');
        var emptyDiv = $('<div>', {});
        emptyDiv.append(canvas);
        gameDiv.append(emptyDiv);
    },
    loadImages: function() {
        this.game.load.image('attackBtn', 'assets/attack_button.png');
        this.game.load.image('defendBtn', 'assets/defend_button.png');
        this.game.load.image('specialBtn', 'assets/special_button.png');
        this.game.load.image('background', 'assets/querico_bg.png');

        //(key, url, frameWidth, frameHeight, frameMax, margin, spacing)
        this.game.load.spritesheet('drakeIdle', 'assets/drake_idle_sheet.png', 192, 256, 4);
        this.game.load.spritesheet('meekIdle', 'assets/meek_idle_sheet.png', 192, 256, 4);
        this.game.load.spritesheet('drakePunch', 'assets/drake_punch_sheet.png', 192, 256, 12);
        this.game.load.spritesheet('meekPunch', 'assets/meek_punch_sheet.png', 192, 256, 12);

        this.game.load.spritesheet('drakePunched', 'assets/drake_punched_sheet.png', 192, 256, 12);
        this.game.load.spritesheet('meekPunched', 'assets/meek_punched_sheet.png', 192, 256, 12);
    },
    setPlayers: function(drake, meek) {
        this.drake = drake;
        this.meek = meek;
    },
    beginCreate: function () {
        this.setupBackground();
        this.setupButtons();
        this.setupHealthBars();
    },
    setupBackground: function(){
        var background = this.game.add.sprite(0, 0, 'background');
        var bHeight = background.height;
        var bWidth = background.width;

        var scale = height / bHeight;

        background.height = height;
        background.width = bWidth * scale;
    },
    setupButtons: function(){
        var spacingContainer = (width - spacingButtons * 2 - buttonWidth * 3) / 2;

        this.attackBtn  = this.game.add.button(spacingContainer, buttonY, 'attackBtn', this.attackClk, this, 2, 1, 0);
        this.defendBtn  = this.game.add.button(spacingContainer + spacingButtons + buttonWidth, buttonY, 'defendBtn', this.defendClk, this, 2, 1, 0);
        this.specialBtn = this.game.add.button(width - spacingContainer - buttonWidth, buttonY, 'specialBtn', this.specialClk, this, 2, 1, 0);
    },
    attackClk: function() {
        console.log('Attack Pressed');
        this.drake.punch();
    },
    defendClk: function() {
        console.log('Defend Pressed');
        this.meek.punch();
    },
    specialClk: function() {
        console.log('Special Pressed');
    },
    setupHealthBars: function(){
        var barConfig = {
            x: (100) * 1.5,
            y: buttonY + (buttonWidth / 2),
            width: 200,
            height: 40,
            bar:{color: '#348090'},
            bg:{color: '#F6CD6A'},
            animationDuration: 200,
            flipped: false
        };
        this.drake.healthBar = new HealthBar(this.game, barConfig);
        this.drake.healthBar.setPercent(0);

        barConfig.x = width - (300/2);
        barConfig.flipped = true;
        this.meek.healthBar = new HealthBar(this.game, barConfig);
        this.meek.healthBar.setPercent(0);
    }
});