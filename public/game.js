var height = 800;
var width = 600;
var game = new Phaser.Game(height, width, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('attackBtn', 'assets/attack_button.png');
    game.load.image('defendBtn', 'assets/defend_button.png');
    game.load.image('specialBtn', 'assets/special_button.png');
    game.load.image('background', 'assets/querico_bg.png');

    //(key, url, frameWidth, frameHeight, frameMax, margin, spacing)
    game.load.spritesheet('drakeIdle', 'assets/drake_idle_sheet.png', 160, 256, 4);
    game.load.spritesheet('meekIdle', 'assets/meek_idle_sheet.png', 160, 256, 4);
}

function create() {
    var background = game.add.sprite(0, 0, 'background');
    var bHeight = background.height;
    var bWidth = background.width;

    var scale = height / bHeight;

    background.height = height;
    background.width = bWidth * scale;

    var drake = game.add.sprite(300, 200, 'drakeIdle');
    drake.animations.add('walk');
    drake.animations.play('walk', 7, true);

    var drake = game.add.sprite(200, 100, 'meekIdle');
    drake.animations.add('walk');
    drake.animations.play('walk', 5, true);


}

function update() {

}