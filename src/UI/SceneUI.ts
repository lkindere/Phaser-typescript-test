import 'phaser';
import { Button } from '../button.js';
import { game, config, scaleX, scaleY, UIHeight } from '../config.js';

function test() {
    console.log('test successful');
}

function setHome() {
    game.scene.start('SceneHome');
    game.scene.stop('SceneGame');
    game.scene.stop('SceneHistory');
    game.scene.stop('SceneSettings');
}

function setGame() {
    game.scene.start('SceneGame');
    game.scene.stop('SceneHome');
    game.scene.stop('SceneHistory');
    game.scene.stop('SceneSettings');
}

function setHistory() {
    game.scene.start('SceneHistory');
    game.scene.stop('SceneHome');
    game.scene.stop('SceneGame');
    game.scene.stop('SceneSettings');
}

function setSettings() {
    game.scene.start('SceneSettings');
    game.scene.stop('SceneHome');
    game.scene.stop('SceneGame');
    game.scene.stop('SceneHistory');
}

export class SceneUI extends Phaser.Scene
{
    home: Button;
    play: Button;
    history: Button;
    chat: Button;
    settings: Button;
    constructor() {
        super({key: 'SceneUI', active: true});
        this.home = new Button(this, config.width / 5 * 0.5, UIHeight / 2, 'button', 'buttonover', 'Home', setHome);
        this.play = new Button(this, config.width / 5 * 1.5, UIHeight / 2, 'button', 'buttonover', 'Play', setGame);
        this.history = new Button(this, config.width / 5 * 2.5, UIHeight / 2, 'button', 'buttonover', 'History', setHistory);
        this.chat = new Button(this, config.width / 5 * 3.5, UIHeight / 2, 'button', 'buttonover', 'Chat', test);
        this.settings = new Button(this, config.width / 5 * 4.5, UIHeight / 2, 'button', 'buttonover', 'Settings', setSettings);
    }

    preload() {
        this.load.image('button', 'assets/button.png');
        this.load.image('buttonover', 'assets/buttonover.png');
        this.load.image('backgroundui', 'assets/backgroundui.png');
        this.load.glsl('redwaves', 'assets/shaders/redwaves.frag');
    }
    
    create() {
        this.add.shader('redwaves', config.width / 2, (UIHeight - 10) / 2, config.width, UIHeight - 10);
        this.add.rectangle(config.width / 2, UIHeight - 5, config.width, 10, 0x000000);
        // var background = this.add.image(config.width / 2, UIHeight / 2, 'backgroundui');
        // background.setScale(scaleX, UIHeight / background.height);
    }

    update() {
        let pointer = this.input.activePointer;
        this.home.loop(pointer);
        this.play.loop(pointer);
        this.history.loop(pointer);
        this.chat.loop(pointer);
        this.settings.loop(pointer);
    }
}
