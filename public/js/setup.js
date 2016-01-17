var spacingButtons = 100, buttonWidth = 72, buttonY = 480;

var Setup = function(game) {
    this.game = game;
    this.attackCooldown = false;
    this.defendCooldown = false;
    this.specialCooldown = false;
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
        this.game.load.image('attackBtn', 'assets/imgs/attack_button.png');
        this.game.load.image('defendBtn', 'assets/imgs/defend_button.png');
        this.game.load.image('specialBtn', 'assets/imgs/special_button.png');
        this.game.load.image('background', 'assets/imgs/querico_bg.png');

        //(key, url, frameWidth, frameHeight, frameMax, margin, spacing)
        this.game.load.spritesheet('drakeIdle', 'assets/imgs/drake_idle_sheet.png', 192, 256, 4);
        this.game.load.spritesheet('meekIdle', 'assets/imgs/meek_idle_sheet.png', 192, 256, 4);

        this.game.load.spritesheet('drakePunch', 'assets/imgs/drake_punch_sheet.png', 192, 256, 12);
        this.game.load.spritesheet('meekPunch', 'assets/imgs/meek_punch_sheet.png', 192, 256, 12);

        this.game.load.spritesheet('drakePunched', 'assets/imgs/drake_punched_sheet.png', 192, 256, 12);
        this.game.load.spritesheet('meekPunched', 'assets/imgs/meek_punched_sheet.png', 192, 256, 12);

        this.game.load.spritesheet('drakeDefend', 'assets/imgs/drake_defend_sheet.png', 192, 256, 12);
        this.game.load.spritesheet('meekDefend', 'assets/imgs/meek_defend_sheet.png', 192, 256, 12);
        this.game.load.spritesheet('drakeDefendIdle', 'assets/imgs/drake_defend_idle_sheet.png', 192, 256, 12);
        this.game.load.spritesheet('meekDefendIdle', 'assets/imgs/meek_defend_idle_sheet.png', 192, 256, 12);

        this.game.load.spritesheet('attackCooldown', 'assets/imgs/attack_cooldown_sheet.png', 76, 76, 18);
        this.game.load.spritesheet('defendCooldown', 'assets/imgs/defend_cooldown_sheet.png', 76, 76, 18);
        this.game.load.spritesheet('specialCooldown', 'assets/imgs/special_cooldown_sheet.png', 76, 76, 18);

        this.game.load.audio('theme_song', ['assets/sounds/querico.ogg', 'assets/sounds/querico.mp3']);
        this.game.load.audio('drake_punch', ['assets/sounds/drake_punch.ogg', 'assets/sounds/drake_punch.mp3']);
        this.game.load.audio('drake_punch_hard', ['assets/sounds/drake_punch_hard.ogg', 'assets/sounds/drake_punch_hard.mp3']);
        this.game.load.audio('meek_punch', ['assets/sounds/meek_punch.ogg', 'assets/sounds/meek_punch.mp3']);
        this.game.load.audio('meek_kick', ['assets/sounds/meek_kick.ogg', 'assets/sounds/meek_kick.mp3']);

        this.game.load.physics('physicsData', 'js/Hitboxes/physicsData.json');

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
        if (!this.attackCooldown) {
            this.attackCooldown = true;

            console.log('Attack Pressed');
            this.drake.setAttack();

            this.attackBtn = game.add.sprite(this.attackBtn.x, this.attackBtn.y, 'attackCooldown');
            this.attackBtn.animations.add('attackCooldown');
            this.attackBtn.animations.play('attackCooldown', 6, false);

            this.attackBtn.events.onAnimationComplete.add(function(){
                var name = this.attackBtn.animations.currentAnim.name;
                if (name === 'attackCooldown') {
                    //Reset
                    this.attackBtn.loadTexture('attackBtn', 0);
                    this.attackCooldown = false;
                }
            }.bind(this), this);
        }
        else {
            console.log('NOT YET - ATTACK');
        }
    },
    defendClk: function() {
        if (!this.defendCooldown) {
            this.defendCooldown = true;

            console.log('Defend Pressed');
            this.drake.setDefendIdle();

            this.defendBtn = game.add.sprite(this.defendBtn.x, this.defendBtn.y, 'defendCooldown');
            this.defendBtn.animations.add('defendCooldown');
            this.defendBtn.animations.play('defendCooldown', 8, false);

            this.defendBtn.events.onAnimationComplete.add(function(){
                var name = this.defendBtn.animations.currentAnim.name;
                if (name === 'defendCooldown') {
                    //Reset
                    this.defendBtn.loadTexture('defendBtn', 0);
                    this.defendCooldown = false;
                }
            }.bind(this), this);
        }
    },
    specialClk: function() {
        if (!this.specialCooldown) {
            this.specialCooldown = true;
            this.meek.setAttack();

            this.specialBtn = game.add.sprite(this.specialBtn.x, this.specialBtn.y, 'specialCooldown');
            this.specialBtn.animations.add('specialCooldown');
            this.specialBtn.animations.play('specialCooldown', 4, false);

            this.specialBtn.events.onAnimationComplete.add(function(){
                var name = this.specialBtn.animations.currentAnim.name;
                if (name === 'specialCooldown') {
                    //Reset
                    this.specialBtn.loadTexture('specialBtn', 0);
                    this.specialCooldown = false;
                }
            }.bind(this), this);
        }
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

