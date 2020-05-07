class Scene1 extends Phaser.Scene {
    constructor() {
        super("mainMenu");
    }
    
    enter;
    text1;
    timedEvent;

    preload() {
    }

    create() {
        this.add.text(400, 200, "THE GAME", { fontSize: 32 }).setOrigin(0.5);
        this.text1 = this.add.text(400, 400, "PRESS ENTER TO START").setOrigin(0.5);
        this.enter = this.input.keyboard.addKey('ENTER');
        this.timedEvent = this.time.addEvent({ delay: 500, callback: () => this.text1.visible = !this.text1.visible, callbackScope: this, loop: true });
    }

    update () {
        if(this.enter.isDown) {
            this.scene.start("game")
        }
    }
}
