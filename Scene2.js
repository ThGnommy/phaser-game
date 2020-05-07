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
score_P1 = 0
score_P2 = 0

textWin1;
textWin2;

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

    this.score1 = this.add.text(200, 100, 'Score: ' + this.score_P1, { fontSize: 24}).setOrigin(.5);
    this.score2 = this.add.text(600, 100, 'Score: ' + this.score_P2, { fontSize: 24}).setOrigin(.5);

    this.walls = this.physics.add.staticGroup();
    this.walls.create(400, 20, 'wall_h');
    this.walls.create(20, 300, 'wall_v');
    this.walls.create(780, 300, 'wall_v');
    this.walls.create(400, 450, 'wall_m');

    this.floors = this.physics.add.staticGroup();

    this.floorL = this.floors.create(220, 580, 'floor_left');
    this.floorR = this.floors.create(580, 580, 'floor_right');
    
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

    this.physics.add.overlap(this.ball, this.floorR, this.SetPointToPlayer1, null, this);
    this.physics.add.overlap(this.ball, this.floorL, this.SetPointToPlayer2, null, this);
    
    
}

update ()
{
    let rn_x1 = Phaser.Math.Between(30, 400);
    let rn_x2 = Phaser.Math.Between(-400, -30)
    let rn_y = Phaser.Math.Between(-250, -500);

    this.Player1Input();
    this.Player2Input();

    this.BallAngleBounceP1(rn_x1, rn_y);
    this.BallAngleBounceP2(rn_x2, rn_y);
}

SetPointToPlayer1() {
    this.score_P1 += 10
    this.score1.setText('Score: ' + this.score_P1)
    console.log(this.score_P1)
    this.RestartGame();
}

SetPointToPlayer2() {
    this.score_P2 += 10
    this.score2.setText('Score: ' + this.score_P2)
    console.log(this.score_P2)
    this.RestartGame();
}

BallStart() {

    let rn_x = Phaser.Math.Between( Phaser.Math.Between(-800, -400) , Phaser.Math.Between(400, 800) );
    let rn_y = Phaser.Math.Between(-250, -500);

    this.ball.body.setAllowGravity(true);
    this.ball.setVelocity(rn_x, rn_y)
}

RestartGame() {

    if(this.score_P1 < 20 || this.score_P2 < 20)
    {
        this.ball.body.setAllowGravity(false);
        this.ball.setVelocity(0, 0)
        this.ball.setPosition(400, 300)
        this.ballStart = this.time.delayedCall(2000, this.BallStart, [], this)
    }

    if(this.score_P1 >= 20 || this.score_P2 >= 20) {
        this.ball.destroy();
        this.scene.pause();

        if(this.score_P1 >= 20) {
            this.textWin1 = this.add.text(400, 200, `PLAYER 1 WIN`).setOrigin(0.5);
        }
        else if(this.score_P2 >= 20) {
            this.textWin1 = this.add.text(400, 200, `PLAYER 2 WIN`).setOrigin(0.5);
        }


        this.textWin2 = this.add.text(400, 250, "ENTER TO PLAY AGAIN").setOrigin(0.5);
    }
}

Player1Input() {
    this.player.setVelocityX(0)

    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-200);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(200);
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