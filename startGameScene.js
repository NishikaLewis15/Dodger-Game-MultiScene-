class StartGameScene extends Phaser.Scene{
    constructor(){
        super()
    }
    preload()
    {
        this.load.image('sky','assets/sky.png')
        this.load.image('start','assets/start.png')
    }
    create(){
        this.add.image(400,300,'sky')
        this.startbtn = this.add.image(400,300,'start')
        this.startbtn.setInteractive();
        this.startbtn.on('pointerdown', this.startGame,this)
    }
    startGame(){
        this.scene.start('Play');
    }
}