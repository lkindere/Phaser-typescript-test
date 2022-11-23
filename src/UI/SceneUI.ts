import 'phaser';
import { Button } from './button.js';
import { game } from '../config.js';
import { getOption, scenes } from '../options.js';;
import { fwidth, rescaleobject, scaleX, UIHeight, baseX } from '../scale.js';
import { style32 } from '../styles.js';

function setScene(scn: string) {
    game.scene.start(scn);
    for (let scene of scenes) {
        if (scn != scene.str && scene.alwayson == false)
            game.scene.stop(scene.str);
    }
}

let buttondata = [
    { str: 'Home', fn: setScene, fnparam: 'SceneHome' },
    { str: 'Play', fn: setScene, fnparam: 'SceneGame' },
    { str: 'History', fn: setScene, fnparam: 'SceneHistory' },
    { str: 'Chat', fn: setScene, fnparam: 'SceneChat' },
    { str: 'Settings', fn: setScene, fnparam: 'SceneSettings' },
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
        this.shader = this.add.shader('redwaves', fwidth / 2, (UIHeight - 10) / 2, fwidth, UIHeight - 10);
        this.background = this.add.image(fwidth / 2, UIHeight / 2, 'backgroundui');
        this.background.setDisplaySize(fwidth, UIHeight);
        this.line = this.add.rectangle(fwidth / 2, UIHeight - 5, baseX, 10, 0x000000).setScale(scaleX, 1);
        this.generateButtons();
    }

    generateButtons() {
        let width = fwidth / buttondata.length;
        let height = UIHeight / 2;
        let i = 0;
        for (let button of buttondata) {
            let img = this.add.image(width * (i + 0.5), height, 'button').setScale(scaleX, 1);
            let imgover = this.add.image(width * (i + 0.5), height, 'buttonover').setScale(scaleX, 1);
            let text = this.add.text(img.x, img.y, button.str, style32).setScale(scaleX, 1).setOrigin(0.5);
            this.buttons.push(new Button(text, img, imgover, button.fn, button.fnparam));
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
        if (this.shader) {
            this.shader.destroy();
            this.shader = this.add.shader('redwaves', fwidth / 2, (UIHeight - 10) / 2, fwidth, UIHeight - 10);
        }
        rescaleobject(this.background, scaleX, 1, false, false, true);
        rescaleobject(this.line, scaleX, 1, false, false, true);
        for (let button of this.buttons)
            button.rescale();
    }
}
