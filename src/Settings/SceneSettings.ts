import 'phaser';
import { options, config, scaleX, scaleY, UIHeight } from '../config.js';

class OptionBox
{
    private isclick: boolean = false;
    private text: Phaser.GameObjects.Text;
    constructor (
        private option: { str: string, on: boolean },
        private scene: Phaser.Scene,
        private box: Phaser.GameObjects.Image,
        private tick: Phaser.GameObjects.Image
    ) {
        var style = { font: "bold 32px Arial", fill: "#fff", bottom: 20};
        this.text = scene.add.text(box.x, box.y, option.str, style);
        this.text.setY(this.box.y - (this.text.getCenter().y - this.text.getTopLeft().y));
        this.text.setX(this.box.x - this.box.width - (this.text.getRightCenter().x - this.text.getLeftCenter().x) - 10);
    }

    loop(pointer: Phaser.Input.Pointer) {
        (this.option.on == true) ? this.tick.visible = true : this.tick.visible = false;
        if (pointer.isDown == true && this.isclick == false)
            if (pointer.x <= this.box.x + this.box.width / 2 && pointer.x >= this.box.x - this.box.width / 2
                && pointer.y <= this.box.y + this.box.height / 2 && pointer.y >= this.box.y - this.box.height / 2) {
                if (pointer.isDown == true && this.isclick == false){
                    this.option.on = !this.option.on;
                    this.isclick = true;
                }
            }
        if (pointer.isDown == false)
            this.isclick = false;
    }
}

export class SceneSettings extends Phaser.Scene
{
    boxes: OptionBox[] = [];
    wfourth: number = config.width / 4;
    htenth: number = config.height / 10;
    constructor() {
        super({key: 'SceneSettings'});
    }
    
    preload() {
        this.load.glsl('lava', 'assets/shaders/lava.frag');
        this.load.image('box', 'assets/box.png');
        this.load.image('tick', 'assets/tick.png');
    }
    
    create() {
        this.add.shader('lava', config.width / 2, config.height / 2 + UIHeight / 2, config.width, config.height - UIHeight);
        let i = 0;
        for (let option of options) {
            let box = this.add.image(this.wfourth * (i % 3 + 1), UIHeight / 2 + this.htenth * (Math.floor(i / 3) + 1), 'box');
            let tick = this.add.image(this.wfourth * (i % 3 + 1), UIHeight / 2 + this.htenth * (Math.floor(i / 3) + 1), 'tick');
            box.setScale(scaleX, scaleY);
            tick.setScale(scaleX, scaleY);
            this.boxes.push(new OptionBox(option, this, box, tick));
            ++i;
        }
    }

    update() {
        let pointer = this.input.activePointer;
        for (let box of this.boxes)
            box.loop(pointer);
    }
}
