


class Scene2 extends Phaser.Scene {
    constructor() {
        super("game");
    }
    
ballStart;
cursors;
key_A;
key_D;

floors;
collider;
walls;
ball;
player;
player_2;

preload() {
    this.load.image('wall_h', 'assets/wall_horizzontal.png')
    this.load.image('wall_v', 'assets/wall_vertical.png')
    this.load.image('wall_m', 'assets/wall_middle.png')
    this.load.image('player1', "assets/player_2.png");
    this.load.image('ball', "assets/ball.png")
    this.load.image('player2', "assets/player_2.png");

    this.load.image('floor_left', 'assets/floor_left.png')
    this.load.image('floor_right', 'assets/floor_right.png')

}


create() {

    this.cursors = this.input.keyboard.createCursorKeys();
    this.key_A = this.input.keyboard.addKey('A');
    this.key_D = this.input.keyboard.addKey('D');

    this.walls = this.physics.add.staticGroup();
    this.walls.create(400, 20, 'wall_h');
    this.walls.create(20, 300, 'wall_v');
    this.walls.create(780, 300, 'wall_v');
    this.walls.create(400, 450, 'wall_m');

    this.floors = this.physics.add.staticGroup();
    this.floors.create(220, 580, 'floor_left');
    this.floors.create(580, 580, 'floor_right');

    
    
    // Player 1
    this.player = this.physics.add.image(100, 450, 'player1');

    // Player 2
    this.player_2 = this.physics.add.image(700, 450, 'player2')

    // Ball

    this.ball = this.physics.add.image(400, 300, 'ball');
    this.ball.setBounce(1, 1.5);
    this.ball.body.setMaxVelocity(400, 500);
    this.ball.body.setAllowGravity(false);
    
    // Physics 1 Settings
    
    this.physics.add.collider(this.player, this.walls)
    this.physics.add.collider(this.ball, this.walls)
    this.physics.add.collider(this.player, this.ball)
    this.physics.add.collider(this.player, this.floors)

    // Physics 2 Settings

    this.physics.add.collider(this.player_2, this.walls)

    this.physics.add.collider(this.ball, this.walls)
    this.physics.add.collider(this.player_2, this.ball)
    this.physics.add.collider(this.player_2, this.floors)

    this.ballStart = this.time.delayedCall(2000, this.BallStart, [], this)
}

update ()
{
    let rn_x1 = Phaser.Math.Between(30, 200);
    let rn_x2 = Phaser.Math.Between(-200, -30)
    let rn_y = Phaser.Math.Between(-250, -500);

    this.Player1Input();
    this.Player2Input();

    this.BallAngleBounceP1(rn_x1, rn_y);
    this.BallAngleBounceP2(rn_x2, rn_y);

    this.physics.add.overlap(this.ball, this.floors, this.CheckCollision, [], this);
}

CheckCollision() {
    console.log("Collide")
}

BallStart() {
    let rn_x = Phaser.Math.Between(-160, 160);
    let rn_y = Phaser.Math.Between(-250, -500);

    this.ball.body.setAllowGravity(true);
    this.ball.setVelocity(rn_x, rn_y)
}

Player1Input() {
    this.player.setVelocityX(0)

    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);
    }
}

Player2Input() {
    this.player_2.setVelocityX(0)

    if (this.key_A.isDown)
    {
        this.player_2.setVelocityX(-160);
    }
    else if (this.key_D.isDown)
    {
        this.player_2.setVelocityX(160);
    }
}

BallAngleBounceP1(x, y) {
    if(this.player.body.touching.up) {
        this.ball.setVelocityX(x)
        this.ball.setVelocityY(y)
    }


}

BallAngleBounceP2(x, y) {
    if(this.player_2.body.touching.up) {
        this.ball.setVelocityX(x)
        this.ball.setVelocityY(y)
    }
}

}