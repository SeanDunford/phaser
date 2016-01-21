var gameOver = false;
var height = 576;//800;
var width = 1024;//600;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var drake = null, meek = null;
var mouse;
var MIN_DISTANCE = 32;
var MAX_SPEED = 250;

function preload() { //First Method Called
    console.log('Preload');
    this.setup = new Setup(game);
}

function create() { //Called After Preload()
    console.log('Create');
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.9;

    meek = MeekFighter(game);
    drake = DrakeFighter(game);

    drake.oponent = meek;
    meek.oponent = drake;

    this.setup.setPlayers(drake, meek);
    this.setup.beginCreate();

    drake.play();
    meek.play();

    playThemeSong();
    game.physics.p2.setPostBroadphaseCallback(hit, this);

    mouse = game.input.mousePointer;
}

function hit(body1, body2){
    console.log('Touch da fishy!!!!!!', body1.sprite.key, ' ', body2.sprite.key);
}

function playThemeSong(){
    var music = game.add.audio('theme_song');
    music.loopFull(1);
}

var randomlyDoDamage = false;
if(randomlyDoDamage) {
    var interval = setInterval(function () {
        console.log('Depleting Health');
        drake.currentHealth -= (.10 * Math.random()) * drake.maxHealth;
        meek.currentHealth -= (.10 * Math.random()) * meek.maxHealth;
    }, 400);
}

function update() {
    if(gameOver){
        return;
    }

    if(drake.lastHealth !== drake.currentHealth) {
        drake.lastHealth = drake.currentHealth;
        drake.healthBar.setPercent(100 * (drake.currentHealth / drake.maxHealth));
        console.log('Updating drakes health bar last: ', drake.lastHealth, 'current:', drake.currentHealth);
    }

    if(meek.lastHealth !== meek.currentHealth) {
        meek.lastHealth = meek.currentHealth;
        meek.healthBar.setPercent(100 * (meek.currentHealth / meek.maxHealth));
        console.log('Updating drakes health bar last: ', meek.lastHealth, 'current:', meek.currentHealth);
    }

    if(drake.currentHealth < 0 || meek.currentHealth < 0){
        gameOver = true;
        clearInterval(interval);
        var winStr = (drake.currentHealth > meek.currentHealth) ? 'drake' : 'meek';
        winStr += ' is the winner!!!!1!!!1!!!';
        console.log('GAME OVER');
        console.log(winStr);
    }

    var distance = game.math.distance(meek.sprite.body.x, meek.sprite.body.y, mouse.x, mouse.y);

    if (distance > MIN_DISTANCE) {

        var rotation = game.math.angleBetween(meek.sprite.body.x, meek.sprite.body.y, mouse.x, mouse.y);
        meek.sprite.body.velocity.x = Math.cos(rotation) * MAX_SPEED;
        meek.sprite.body.velocity.y = Math.sin(rotation) * MAX_SPEED;
    } else {
        meek.sprite.body.velocity.x = 0;
        meek.sprite.body.velocity.y = 0;
    }
}