import 'phaser';

/**
 * Phaser doesn't support on click behavior, isclick is required for getting only a single click out of isdown
 * crnt holds the last created phaser image and uses it's width/height for dimension checking
 */
export class Button
{
    private crnt: Phaser.GameObjects.Image | undefined;
    private isover: boolean = false;
    private isclick: boolean = false;
    constructor(
        private scene: Phaser.Scene,
        private x: number,
        private y: number,
        private image: string,
        private imageover: string,
        private text: string,
        private onclick: () => any,
    ) {}

    private display() {
        if (this.crnt)
            this.crnt.destroy();
        if (this.isover)
            this.crnt = this.scene.add.image(this.x, this.y, this.imageover);
        else
            this.crnt = this.scene.add.image(this.x, this.y, this.image);
        var style = { font: "bold 32px Arial", fill: "#fff", bottom: 20};
        var text = this.scene.add.text(this.x, this.y, this.text, style);
        text.setX(this.x - (text.getCenter().x - text.getTopLeft().x));
        text.setY(this.y - (text.getCenter().y - text.getTopLeft().y));
    }
    private reset(pointer: Phaser.Input.Pointer) {
        this.isover = false;
        if (pointer.isDown == false)
            this.isclick = false;
    }
    
    loop(pointer: Phaser.Input.Pointer) {
        if (this.crnt) {
            if (pointer.x <= this.x + this.crnt.width / 2 && pointer.x >= this.x - this.crnt.width / 2
                && pointer.y <= this.y + this.crnt.height / 2 && pointer.y >= this.y - this.crnt.height / 2) {
                this.isover = true;
                if (pointer.isDown == true && this.isclick == false){
                    this.isclick = true;
                    this.onclick();
                }
            }
        }
        this.display();
        this.reset(pointer);
    }
}
