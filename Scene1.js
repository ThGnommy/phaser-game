class Scene1 extends Phaser.Scene {
    constructor() {
        super("mainMenu");
    }
    
    cursors;

    create() {
        this.add.text(20, 20, "Loading game...");
        this.add.text(20, 40, "Press SPACE to load next scene...");
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
        if(this.cursors.space.isDown) {
            this.scene.start("game")
        }
    }
}
