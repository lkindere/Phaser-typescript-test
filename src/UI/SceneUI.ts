import 'phaser';
import { Button } from '../button.js';
import { game, config, scaleX, scaleY, UIHeight } from '../config.js';

function test() {
    console.log('test successful');
}

function scenePlay() {
    game.scene.start('play');
}

export class SceneUI extends Phaser.Scene
{
    play: Button;
    history: Button;
    chat: Button;
    settings: Button;
    constructor() {
        super({key: 'start', active: true});
        this.play = new Button(this, config.width / 4 * 0.5, UIHeight / 2, 'button', 'buttonover', 'Play', scenePlay);
        this.history = new Button(this, config.width / 4 * 1.5, UIHeight / 2, 'button', 'buttonover', 'History', test);
        this.chat = new Button(this, config.width / 4 * 2.5, UIHeight / 2, 'button', 'buttonover', 'Chat', test);
        this.settings = new Button(this, config.width / 4 * 3.5, UIHeight / 2, 'button', 'buttonover', 'Settings', test);
    }

    preload() {
        this.load.image('button', 'assets/button.png');
        this.load.image('buttonover', 'assets/buttonover.png');
        this.load.image('background', 'assets/background.png');
    }
    
    create() {
        var background = this.add.image(config.width / 2, config.height / 2, 'background');
        background.setScale(scaleX, scaleY);
    }

    update() {
        let pointer = this.input.activePointer;
        this.play.loop(pointer);
        this.history.loop(pointer);
        this.chat.loop(pointer);
        this.settings.loop(pointer);
    }
}
