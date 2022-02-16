class PlayGameScene extends Phaser.Scene{
    constructor(){
        super('Play')
        this.score = 0;
    }

/*var player;
var stars;
var platforms;
var cursors;
var score = 0;
var scoreText;*/

preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

 create() {
    this.sky = this.add.image(400, 300, 'sky');

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();



    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.cursors = this.input.keyboard.createCursorKeys();
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    this.stars = this.physics.add.group();

    
    let starGenLoop = this.time.addEvent({
        delay: 750,
        callback: this.starGen,
        callbackScope: this,
        loop: true,
    });
    
    this.physics.add.collider(this.stars, this.platforms, function (over) {
        this.over.destroy();
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    },this)

    this.physics.add.collider(this.player, this.stars, () => {
        this.starGenLoop.destroy();
        this.physics.pause();
        this.add.text(180, 250, 'Game Over', { fontSize: '15px', fill: '#000000' });
        this.add.text(152, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });
        
    });
    this.input.on('pointerup', () => {
        this.score = 0;
        this.scene.restart();
    });

    this.physics.add.collider(this.player, this.platforms);


}
starGen() {
    let xCoord = Math.random() * 700;
    this.stars.create(xCoord, 10, 'star');

}

update() {
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);

        this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);

        this.player.anims.play('right', true);
    }
    else {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
    }

}
}
