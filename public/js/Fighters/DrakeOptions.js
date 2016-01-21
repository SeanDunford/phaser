var DrakeOptions = {
    charName: 'Drizzy Drake',
    maxHealth: 250,
    origX: 300,
    origY: 200,
    bounceBack: -200,
    jumpForward: 210,
    idle: {
        name: 'idle',
        texture: 'drakeIdle',
        frameRate: 8,
        loop: true,
        killOnComplete: false,
        physics: 'drake0'
    },
    attack: {
        name: 'attack',
        texture: 'drakePunch',
        frameRate: 8,
        loop: false,
        killOnComplete: false,
        physics: 'drake0'
    },
    defend: {
        name: 'defend',
        texture: 'drakeDefend',
        frameRate: 8,
        loop: false,
        killOnComplete: false,
        physics: 'drake0'
    },
    defendIdle: {
        name: 'defendIdle',
        texture: 'drakeDefendIdle',
        frameRate: 8,
        loop: false,
        killOnComplete: false,
        physics: 'drake0'
    },
    hurt: {
        name: 'hurt',
        texture: 'drakePunched',
        frameRate: 9,
        loop: false,
        killOnComplete: false,
        physics: 'drake1'
    },
    audio_punch: 'drake_punch',
    audio_last_punch: 'drake_punch_hard'
};
