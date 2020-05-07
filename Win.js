class Win extends Phaser.Scene {

    constructor() {
        super("win");
    }

    create() {
        this.add.text(400, 400, "PRESS ENTER TO START").setOrigin(0.5);
    }

    update() {}

}