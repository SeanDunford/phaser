var gameOver = false;
var height = 576;//800;
var width = 1024;//600;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var drake = null, meek = null;

function preload() { //First Method Called
    console.log('Preload') ;
    this.setup = new Setup(game);
}

function create() { //Called After Preload()
    //http://phaser.io/examples/v2/p2-physics/contact-events

    console.log('Create');

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.9;

    meek = MeekFighter(game);
    drake = DrakeFighter(game);

    game.physics.p2.enable([meek.sprite, drake.sprite], true);

    drake.oponent = meek;
    meek.oponent = drake;

    drake.sprite.body.clearShapes();

    this.setup.setPlayers(drake, meek);
    this.setup.beginCreate();

    drake.play();
    meek.play();

    playThemeSong();
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
}