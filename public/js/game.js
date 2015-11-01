var height = 576;//800;
var width = 1024;//600;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var drake = null;
var meek = null;
var attackBtn = null;
var defendBtn = null;
var specialBtn = null;
var spacingButtons = 100, buttonWidth = 72, buttonY = 480;
var gameOver = false;

function preload() {
    setupCanvas();
    loadImages();
}

function setupCanvas() {
    var canvas = $('canvas');
    var gameDiv = $('.game').addClass('contentCentered');
    var emptyDiv = $('<div>', {});
    emptyDiv.append(canvas);
    gameDiv.append(emptyDiv);
}

function loadImages() {
    game.load.image('attackBtn', 'assets/attack_button.png');
    game.load.image('defendBtn', 'assets/defend_button.png');
    game.load.image('specialBtn', 'assets/special_button.png');
    game.load.image('background', 'assets/querico_bg.png');

    //(key, url, frameWidth, frameHeight, frameMax, margin, spacing)
    game.load.spritesheet('drakeIdle', 'assets/drake_idle_sheet.png', 192, 256, 4);
    game.load.spritesheet('meekIdle', 'assets/meek_idle_sheet.png', 192, 256, 4);
    game.load.spritesheet('drakePunch', 'assets/drake_punch_sheet.png', 192, 256, 12);
}

function attackClk() {
    console.log('Attack Pressed');
    addPunchDrake();
}
function defendClk() {
    console.log('Defend Pressed');
}
function specialClk() {
    console.log('Special Pressed');
}

function create() {
    setupBackground();
    setupDrake();
    setupMeek();
    setupButtons();
    setupHealthBars();
}

function setupBackground(){
    var background = game.add.sprite(0, 0, 'background');
    var bHeight = background.height;
    var bWidth = background.width;

    var scale = height / bHeight;

    background.height = height;
    background.width = bWidth * scale;
}

function setupDrake() {
    console.log('Setting up drake');
    addIdleDrake();

    drake.maxHealth = 250;
    drake.currentHealth = drake.maxHealth;
    drake.lastHealth = 0;
}

function addIdleDrake() {
    drake = game.add.sprite(300, 200, 'drakeIdle');
    drake.animations.add('walk');
    drake.animations.play('walk', 8, true);
}

function addPunchDrake() {
    drake.loadTexture('drakePunch', 0);
    drake.animations.add('punch');
    drake.animations.play('punch', 8, false, false);
    drake.events.onAnimationComplete.add(function(){
        drake.loadTexture('drakeIdle', 0);
        drake.animations.add('walk');
        drake.animations.play('walk', 8, true);
    }, this);
}

function setupMeek(){
    meek = game.add.sprite(600, 200, 'meekIdle');
    meek.animations.add('walk');
    meek.animations.play('walk', 7, true);
    meek.maxHealth = 225;
    meek.currentHealth = meek.maxHealth;
    meek.lastHealth = 0;
}

function setupButtons(){
    var spacingContainer = (width - spacingButtons * 2 - buttonWidth * 3) / 2;

    attackBtn  = game.add.button(spacingContainer, buttonY, 'attackBtn', attackClk, this, 2, 1, 0);
    defendBtn  = game.add.button(spacingContainer + spacingButtons + buttonWidth, buttonY, 'defendBtn', defendClk, this, 2, 1, 0);
    specialBtn = game.add.button(width - spacingContainer - buttonWidth, buttonY, 'specialBtn', specialClk, this, 2, 1, 0);
}

function setupHealthBars(){
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
    drake.healthBar = new HealthBar(game, barConfig);
    drake.healthBar.setPercent(0);

    barConfig.x = width - (300/2);
    barConfig.flipped = true;
    meek.healthBar = new HealthBar(game, barConfig);
    meek.healthBar.setPercent(0);
}

var interval = setInterval(function() {
    console.log('Depleting Health');
    drake.currentHealth -= (.10 * Math.random()) * drake.maxHealth;
    meek.currentHealth  -= (.10 * Math.random()) * meek.maxHealth;
}, 400);

function update() {
    //if(gameOver){
    //    return;
    //}
    //if(drake.lastHealth !== drake.currentHealth) {
    //    drake.lastHealth = drake.currentHealth;
    //    drake.poop = 'foo';
    //    drake.healthBar.setPercent(100 * (drake.currentHealth / drake.maxHealth));
    //    console.log('Updating drakes health bar last: ', drake.lastHealth, 'current:', drake.currentHealth);
    //}
    //if(meek.lastHealth !== meek.currentHealth) {
    //    meek.lastHealth = meek.currentHealth;
    //    meek.poop = 'foo';
    //    meek.healthBar.setPercent(100 * (meek.currentHealth / meek.maxHealth));
    //    console.log('Updating drakes health bar last: ', meek.lastHealth, 'current:', meek.currentHealth);
    //}
    //if(drake.currentHealth < 0 || meek.currentHealth < 0){
    //    gameOver = true;
    //    clearInterval(interval);
    //    var winStr = (drake.currentHealth > meek.currentHealth) ? 'drake' : 'meek';
    //    winStr += ' is the winner!!!!1!!!1!!!'
    //    console.log('GAME OVER');
    //    console.log(winStr);
    //}
}