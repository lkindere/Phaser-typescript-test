import 'phaser';
import { getOption, options } from '../options.js';
import { fwidth, fheight, scaleX, UIlessScaleY, UIHeight, rescaleobject, baseX, baseY, scaleY } from '../scale.js';
import { style12 } from '../styles.js';

class OptionBox
{
    private text: Phaser.GameObjects.Text;
    constructor (
        private option: { str: string, on: boolean },
        private scene: Phaser.Scene,
        private box: Phaser.GameObjects.Image,
        private tick: Phaser.GameObjects.Image
    ) {
        this.text = scene.add.text(box.x - (box.displayWidth / 2 + 5), box.y, option.str, style12).setScale(scaleX, UIlessScaleY).setOrigin(1, 0.5);
        (this.option.on == true) ? this.tick.visible = true : this.tick.visible = false;
        this.box.setDepth(1);
        this.tick.setDepth(2);
        this.text.setDepth(3);
    }

    loop(pointer: Phaser.Input.Pointer) {
        if (pointer.x <= this.box.x + this.box.displayWidth / 2 && pointer.x >= this.box.x - this.box.displayWidth / 2
            && pointer.y <= this.box.y + this.box.displayHeight / 2 && pointer.y >= this.box.y - this.box.displayHeight / 2)
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
        this.shader = this.add.shader('lava', fwidth / 2, fheight / 2 + UIHeight / 2, fwidth, fheight - UIHeight);
        let wfourth = fwidth / 4;
        let htenth =  (fheight - UIHeight) / 10;
        let i = 0;
        for (let option of options) {
            let box = this.add.image(wfourth * (i % 3 + 1), UIHeight + htenth * (Math.floor(i / 3) + 1), 'box').setScale(scaleX, UIlessScaleY);
            let tick = this.add.image(wfourth * (i % 3 + 1), UIHeight + htenth * (Math.floor(i / 3) + 1), 'tick').setScale(scaleX, UIlessScaleY);
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
        if (this.shader) {
            this.shader.destroy();
            this.shader = this.add.shader('lava', fwidth / 2, fheight / 2 + UIHeight / 2, fwidth, fheight - UIHeight);
        }
        rescaleobject(this.background, scaleX, UIlessScaleY, true);
        for (let box of this.boxes) {
            box.rescale();
        }
    }
}
