var height = 576;//800;
var width = 1024;//600;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var easing = Phaser.Easing.Exponential.Out;
var mouse;
var MIN_DISTANCE = 32;
var MAX_SPEED = 250;
var drake;
var meek;
var fighterCollisionGroup;
var boundsCollisonGroup;


function preload() { //First Method Called
    game.load.image('drake', '/assets/imgs/drake0.png');
    game.load.image('meek', '/assets/imgs/meek0.png');
    game.load.spritesheet('drakeIdle', '/assets/imgs/drake_idle_sheet.png', 192, 256, 4);
    game.load.spritesheet('meekIdle', '/assets/imgs/meek_idle_sheet.png', 192, 256, 4);

}

function create() { //Called After Preload()
    game.physics.startSystem(Phaser.Physics.P2JS);

    drake = game.add.sprite(200, 256, 'drakeIdle');
    meek = game.add.sprite(500, 256, 'meekIdle');
    game.physics.p2.enable([drake, meek], true);

    drake.loadTexture('drakeIdle', 0);
    drake.animations.add('DrakeIdle');
    drake.animations.play('DrakeIdle', 8, true);
    drake.bringToTop();
    drake.body.clearShapes();
    drake.body.loadPolygon('physicsData', 'drake0');

    meek.loadTexture('meekIdle', 0);
    meek.animations.add('MeekIdle');
    meek.animations.play('MeekIdle', 8, true);
    meek.bringToTop();
    meek.body.clearShapes();
    meek.body.loadPolygon('physicsData', 'meek0');
    meek.anchor.setTo(0.5, 0.5);

    game.add.tween(meek).to({ x: meek.x}, 100, easing, true);
    game.add.tween(drake).to({ x: drake.x}, 100, easing, true);

    mouse = game.input.mousePointer;

    fighterCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    drake.body.setCollisionGroup(fighterCollisionGroup);
    meek.body.setCollisionGroup(fighterCollisionGroup);

    drake.body.collides([]);
    meek.body.collides([]);

    drake.body.collides(fighterCollisionGroup, hit, this);

    game.physics.p2.setPostBroadphaseCallback(hit, this);
}

function hit(body1, body2){
    console.log('Touch da fishy!!!!!!', body1.sprite.key, ' ', body2.sprite.key);
    itHitB4 = true;
}


function update() {
    if(!drake || !meek)return;

    var distance = game.math.distance(meek.x, meek.y, mouse.x, mouse.y);

    if (distance > MIN_DISTANCE) {

        var rotation = game.math.angleBetween(meek.x, meek.y, mouse.x, mouse.y);
        meek.body.velocity.x = Math.cos(rotation) * MAX_SPEED;
        meek.body.velocity.y = Math.sin(rotation) * MAX_SPEED;
    } else {
        meek.body.velocity.x = 0;
        meek.body.velocity.y = 0;
    }

}