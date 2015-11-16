var defaultOptions = DrakeOptions;
var easing = Phaser.Easing.Exponential.Out;

function Fighter(game, options) {
    if(!options){
        options = this.options || defaultOptions;
    }
    var self = this;
    this.game = game;
    this.maxHealth = options.maxHealth;
    this.currentHealth = this.maxHealth;
    this.lastHealth = 0;
    this.origX = options.origX;
    this.origY = options.origY;
    this.idle = options.idle;
    this.attack = options.attack;
    this.defend = options.defend;
    this.defendIdle = options.defendIdle;
    this.hurt = options.hurt;
    this.charName = options.charName;
    this.sprite = game.add.sprite(this.origX, this.origY, this.idle.texture);
    this.bounceBack = options.bounceBack;
    this.jumpForward = options.jumpForward;
    this.audio_punch = game.add.audio(options.audio_punch);
    this.audio_last_punch = game.add.audio(options.audio_last_punch);

    this.vulnerable = true;
    this.attacking = false;
    this.defending = false;

    this.sprite.events.onAnimationStart.add(function(){
        var animationName = this.sprite.animations.currentAnim.name;
        console.log('Animation: ', animationName, 'started for', this.charName);
        if (animationName === this.attack.name) {
            this.oponent.setHurt();
            this.game.add.tween(this.sprite).to({ x:  this.sprite.x + this.jumpForward }, 100, easing, true);
            setTimeout(function (){ //Last Punch
                this.game.add.tween(this.sprite).to({ x: this.sprite.x + 70 }, 40, easing, true);
            }.bind(this), 900);

            setTimeout(function (){ //First Punch
                this.audio_punch.play();
            }.bind(this), 350);
            setTimeout(function (){ //Second Punch
                this.audio_punch.play();
            }.bind(this), 580);
            setTimeout(function (){ //Last Punch
                this.audio_last_punch.play();
            }.bind(this), 940);
        }
    }.bind(this), this);

    self.sprite.events.onAnimationComplete.add(function(){
        var animationName = this.sprite.animations.currentAnim.name;
        console.log('Animation: ', animationName, 'ended for', this.charName);
        var name = this.sprite.animations.currentAnim.name;
        if (name === this.attack.name || name === this.hurt.name || name === this.defend.name || name === this.defendIdle.name) {
            self.oponent.setIdle(); //Reset
            self.setIdle();
        }
    }.bind(this), this);

    this.setIdle = function(){
        this.sprite.bringToTop();
        this.game.add.tween(this.sprite).to({ x: this.origX }, 100, easing, true);
        this.sprite.loadTexture(this.idle.texture, 0);
        this.sprite.animations.add(this.idle.name);
        this.sprite.animations.play(this.idle.name, this.idle.frameRate, this.idle.loop);
    };

    this.setAttack = function(){
        this.sprite.bringToTop();
        this.sprite.loadTexture(this.attack.texture);
        this.sprite.animations.add(this.attack.name);
        this.sprite.animations.play(this.attack.name, this.attack.frameRate, this.attack.loop);
    };

    this.setDefend = function(){
        //this.sprite.bringToTop();
        this.sprite.loadTexture(this.defend.texture);
        this.sprite.animations.add(this.defend.name);
        this.sprite.animations.play(this.defend.name, this.defend.frameRate, this.defend.loop);
    };

    this.setDefendIdle = function(){
        //this.sprite.bringToTop();
        this.sprite.loadTexture(this.defendIdle.texture);
        this.sprite.animations.add(this.defendIdle.name);
        this.sprite.animations.play(this.defendIdle.name, this.defendIdle.frameRate, this.defendIdle.loop);
    };

    this.setHurt = function(){
        this.sprite.bringToTop();
        this.sprite.loadTexture(this.hurt.texture);
        this.sprite.animations.add(this.hurt.name);
        this.sprite.animations.play(this.hurt.name, this.hurt.frameRate, this.hurt.loop);
        setTimeout(function() {
            //Last punch impact
            this.game.add.tween(this.sprite).to({ x: this.sprite.x + this.bounceBack}, 150, easing, true);
        }.bind(this), 950);
    };


    this.play = function(){
        this.setIdle();
    };

    this.oponent = null;
}


function DrakeFighter (game){
    return new Fighter(game, DrakeOptions);
}

function MeekFighter (game){
    return new Fighter(game, MeekOptions);
}

