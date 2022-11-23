import 'phaser';
import { style, getOption, options, config } from '../config.js';
import { scaleX, UIlessScaleY, UIHeight, rescaleobject } from '../scale.js';

class OptionBox
{
    private text: Phaser.GameObjects.Text;
    constructor (
        private option: { str: string, on: boolean },
        private scene: Phaser.Scene,
        private box: Phaser.GameObjects.Image,
        private tick: Phaser.GameObjects.Image
    ) {
        this.text = scene.add.text(box.x - (box.displayWidth / 2 + 5), box.y, option.str, style).setScale(scaleX, UIlessScaleY).setOrigin(1, 0.5);
        (this.option.on == true) ? this.tick.visible = true : this.tick.visible = false;
    }

    loop(pointer: Phaser.Input.Pointer) {
        if (pointer.x <= this.box.x + this.box.width / 2 && pointer.x >= this.box.x - this.box.width / 2
            && pointer.y <= this.box.y + this.box.height / 2 && pointer.y >= this.box.y - this.box.height / 2)
                this.option.on = !this.option.on;
        (this.option.on == true) ? this.tick.visible = true : this.tick.visible = false;
    }
    
    rescale() {
        rescaleobject(this.box, scaleX, UIlessScaleY, true);
        rescaleobject(this.tick, scaleX, UIlessScaleY, true);
        rescaleobject(this.text, scaleX, UIlessScaleY, true);
    }
}

export class SceneSettings extends Phaser.Scene
{
    clickreset: boolean;
    boxes: OptionBox[] = [];
    shader: Phaser.GameObjects.Shader | undefined;
    background: Phaser.GameObjects.Image | undefined;
    constructor() {
        super({key: 'SceneSettings'});
    }
    
    preload() {
        this.events.on('shutdown', this.clear, this);
    }
    
    create() {
        this.shader = this.add.shader('lava', config.width / 2, config.height / 2 + UIHeight / 2, config.width, config.height - UIHeight);
        let wfourth = config.width / 4;
        let htenth =  (config.height - UIHeight) / 10;
        let i = 0;
        for (let option of options) {
            let box = this.add.image(wfourth * (i % 3 + 1), UIHeight + htenth * (Math.floor(i / 3) + 1), 'box');
            let tick = this.add.image(wfourth * (i % 3 + 1), UIHeight + htenth * (Math.floor(i / 3) + 1), 'tick');
            box.setDepth(1);
            tick.setDepth(1);
            box.setScale(scaleX, UIlessScaleY);
            tick.setScale(scaleX, UIlessScaleY);
            this.boxes.push(new OptionBox(option, this, box, tick));
            ++i;
        }
        let shaderactive = getOption('Settings shader');
        this.shader?.setActive(shaderactive).setVisible(shaderactive);
        this.background?.setActive(!shaderactive).setVisible(!shaderactive);
    }

    update() {
        let pointer = this.input.activePointer;
        if (pointer.isDown == true && this.clickreset == true) {
            this.clickreset = false;
            for (let box of this.boxes)
                box.loop(pointer);
            let shaderactive = getOption('Settings shader');
            this.shader?.setActive(shaderactive).setVisible(shaderactive);
            this.background?.setActive(!shaderactive).setVisible(!shaderactive);
        }
        if (pointer.isDown == false)
            this.clickreset = true;
    }

    clear() {
        this.clickreset = false;
        this.boxes = [];
        this.shader = undefined;
        this.background = undefined;
    }

    rescale () {
        rescaleobject(this.shader, scaleX, UIlessScaleY, true);
        rescaleobject(this.background, scaleX, UIlessScaleY, true);
        for (let box of this.boxes) {
            box.rescale();
        }
    }
}
