import 'phaser';
import { Button } from '../button.js';
import { style32, getOption, game, config } from '../config.js';
import { rescaleobject, scaleX, UIHeight } from '../scale.js';

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

let buttons = [
    { str: 'Home', fn: setHome },
    { str: 'Play', fn: setGame },
    { str: 'History', fn: setHistory },
    { str: 'Chat', fn: test },
    { str: 'Settings', fn: setSettings },
]

export class SceneUI extends Phaser.Scene
{
    buttons: Button[] = [];
    shader: Phaser.GameObjects.Shader | undefined = undefined;
    background: Phaser.GameObjects.Image | undefined = undefined;
    line: Phaser.GameObjects.Rectangle | undefined = undefined;
    constructor() {
        super({key: 'SceneUI'});
    }

    preload() {
        this.events.on('shutdown', this.clear, this);
    }
    
    create() {
        this.shader = this.add.shader('redwaves', config.width / 2, (UIHeight - 10) / 2, config.width, UIHeight - 10);
        this.background = this.add.image(config.width / 2, UIHeight / 2, 'backgroundui');
        this.background.setDisplaySize(config.width, UIHeight);
        this.line = this.add.rectangle(config.width / 2, UIHeight - 5, config.width, 10, 0x000000);
        this.generateButtons();
    }

    generateButtons() {
        let width = config.width / buttons.length;
        let height = UIHeight / 2;
        let i = 0;
        for (let button of buttons) {
            let img = this.add.image(width * (i + 0.5), height, 'button').setScale(scaleX, 1);
            let imgover = this.add.image(width * (i + 0.5), height, 'buttonover').setScale(scaleX, 1);
            let text = this.add.text(img.x, img.y, button.str, style32).setScale(scaleX, 1).setOrigin(0.5);
            this.buttons.push(new Button(text, img, imgover, button.fn));
            ++i;
        }
    }

    update() {
        let shaderactive = getOption('UI shader');
        this.shader?.setActive(shaderactive).setVisible(shaderactive);
        this.background?.setActive(!shaderactive).setVisible(!shaderactive);
        for (let button of this.buttons)
            button.loop(this.input.activePointer);
    }

    //Not currently called as UI is never shutdown
    clear () {
        this.buttons = [];
        this.shader = undefined;
        this.background = undefined;
        this.line = undefined;
    }

    rescale() {
        rescaleobject(this.shader, scaleX, 1, false, false, true);
        rescaleobject(this.background, scaleX, 1, false, false, true);
        rescaleobject(this.line, scaleX, 1, false, false, true);
        for (let button of this.buttons)
            button.rescale();
    }
}
