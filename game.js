let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {

        default: 'arcade',

        arcade: {
            gravity: { y: 200 },
            debug: false
        },

    },
    dom: {
        createContainer: true
    },
    scene: [Scene1, Scene2, Win]
};

let game = new Phaser.Game(config)
