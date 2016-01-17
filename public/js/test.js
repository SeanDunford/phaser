var height = 576;//800;
var width = 1024;//600;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() { //First Method Called
    game.load.image('drake', '../assets/imgs/drake0.png');
    game.load.physics('physicsData', '/js/Hitboxes/physicsData.json');
}

function create() { //Called After Preload()
    game.physics.startSystem(Phaser.Physics.P2JS);
    var drake = game.add.sprite(200, 256, 'drake');
    game.physics.p2.enable([drake], true);
    drake.body.clearShapes();
    drake.body.loadPolygon('physicsData', 'drake0');
}

function update() {
}