var gameOver = false;
var height = 576;//800;
var width = 1024;//600;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var drake = null, meek = null;

function preload() {
    this.setup = new Setup(game);
}

function create() {
    meek = new Meek(game);  drake = new Drake(game);
    drake.setMeek(meek);    meek.setDrake(drake);

    this.setup.setPlayers(drake, meek);
    this.setup.beginCreate();
    drake.play();
    meek.play();
}

//var interval = setInterval(function() {
//    console.log('Depleting Health');
//    drake.currentHealth -= (.10 * Math.random()) * drake.maxHealth;
//    meek.currentHealth  -= (.10 * Math.random()) * meek.maxHealth;
//}, 400);

function update() {
    if(gameOver){
        return;
    }

    if(drake.lastHealth !== drake.currentHealth) {
        drake.lastHealth = drake.currentHealth;
        drake.poop = 'foo';
        drake.healthBar.setPercent(100 * (drake.currentHealth / drake.maxHealth));
        console.log('Updating drakes health bar last: ', drake.lastHealth, 'current:', drake.currentHealth);
    }
    if(meek.lastHealth !== meek.currentHealth) {
        meek.lastHealth = meek.currentHealth;
        meek.poop = 'foo';
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