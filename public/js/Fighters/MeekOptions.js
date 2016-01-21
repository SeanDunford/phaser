var MeekOptions = {
    charName: 'Meek Milly',
    maxHealth: 250,
    origX: 600,
    origY: 200,
    bounceBack: 200,
    jumpForward: -210,
    idle: {
        name: 'idle',
        texture: 'meekIdle',
        frameRate: 8,
        loop: true,
        killOnComplete: false,
        physics: 'meek0'
    },
    attack: {
        name: 'attack',
        texture: 'meekPunch',
        frameRate: 8,
        loop: false,
        killOnComplete: false,
        physics: 'meek0'
    },
    defend: {
        name: 'defend',
        texture: 'meekDefend',
        frameRate: 8,
        loop: false,
        killOnComplete: false,
        physics: 'meek0'
    },
    defendIdle: {
        name: 'defendIdle',
        texture: 'meekDefendIdle',
        frameRate: 8,
        loop: false,
        killOnComplete: false,
        physics: 'meek0'
    },
    hurt: {
        name: 'hurt',
        texture: 'meekPunched',
        frameRate: 9,
        loop: false,
        killOnComplete: false,
        physics: 'meek1'
    },
    audio_punch: 'meek_punch',
    audio_last_punch: 'meek_kick'
};
