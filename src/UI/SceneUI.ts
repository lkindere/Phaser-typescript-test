import 'phaser';
import { Button } from '../button.js';
import { game, config, scaleX, scaleY, UIHeight } from '../config.js';

function test() {
    console.log('test successful');
}

function setGame() {
    game.scene.start('SceneGame');
    game.scene.stop('SceneHistory');
}

function setHistory() {
    game.scene.start('SceneHistory');
    game.scene.stop('SceneGame');
}

export class SceneUI extends Phaser.Scene
{
    play: Button;
    history: Button;
    chat: Button;
    settings: Button;
    constructor() {
        super({key: 'SceneUI', active: true});
        this.play = new Button(this, config.width / 4 * 0.5, UIHeight / 2, 'button', 'buttonover', 'Play', setGame);
        this.history = new Button(this, config.width / 4 * 1.5, UIHeight / 2, 'button', 'buttonover', 'History', setHistory);
        this.chat = new Button(this, config.width / 4 * 2.5, UIHeight / 2, 'button', 'buttonover', 'Chat', test);
        this.settings = new Button(this, config.width / 4 * 3.5, UIHeight / 2, 'button', 'buttonover', 'Settings', test);
    }

    preload() {
        this.load.image('button', 'assets/button.png');
        this.load.image('buttonover', 'assets/buttonover.png');
        this.load.image('backgroundui', 'assets/backgroundui.png');
    }
    
    create() {
        var background = this.add.image(config.width / 2, UIHeight / 2, 'backgroundui');
        background.setScale(scaleX, UIHeight / background.height);
    }

    update() {
        let pointer = this.input.activePointer;
        this.play.loop(pointer);
        this.history.loop(pointer);
        this.chat.loop(pointer);
        this.settings.loop(pointer);
    }
}
