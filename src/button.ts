import 'phaser';
import { rescaleobject, scaleX } from './scale.js';

export class Button
{
    private isover = false;
    private isclick = false;
    constructor(
        private text: Phaser.GameObjects.Text,
        private button: Phaser.GameObjects.Image,
        private buttonover: Phaser.GameObjects.Image | undefined,
        private onclick: () => any,
    ) {
        this.buttonover?.setActive(false).setVisible(false);
    }

    private display() {
        this.button.setActive(!this.isover).setVisible(!this.isover);
        this.buttonover?.setActive(this.isover).setVisible(this.isover);
    }

    private reset(pointer: Phaser.Input.Pointer) {
        this.isover = false;
        if (pointer.isDown == false)
            this.isclick = false;
    }
    
    loop(pointer: Phaser.Input.Pointer) {
        if (pointer.x <= this.button.x + this.button.displayWidth / 2 && pointer.x >= this.button.x - this.button.displayWidth / 2
            && pointer.y <= this.button.y + this.button.displayHeight / 2 && pointer.y >= this.button.y - this.button.displayHeight / 2) {
            this.isover = true;
            if (pointer.isDown == true && this.isclick == false){
                this.isclick = true;
                this.onclick();
            }
        }
        this.display();
        this.reset(pointer);
    }

    rescale () {
        rescaleobject(this.button, scaleX, 1, false, false, true);
        rescaleobject(this.buttonover, scaleX, 1, false, false, true);
        rescaleobject(this.text, scaleX, 1, false, false, true);
    }
}
