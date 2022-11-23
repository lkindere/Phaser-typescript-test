import 'phaser';
import { getOption } from '../options.js';
import { fwidth, fheight, rescaleobject, UIHeight, scaleX, scaleY, UIlessScaleY, baseX, baseY } from '../scale.js';

export class SceneHome extends Phaser.Scene
{
    shader: Phaser.GameObjects.Shader | undefined = undefined;
    background: Phaser.GameObjects.Image | undefined = undefined;
    constructor() {
        super({key: 'SceneHome'});
    }

    preload() {
        this.events.on('shutdown', this.clear, this);
    }
    
    create() {
        if (getOption('Home shader') == true) {
            this.shader = this.add.shader('acid', fwidth / 2, fheight / 2 + UIHeight / 2, fwidth, fheight - UIHeight)
            this.background = this.add.image(fwidth / 2, fheight / 2 + UIHeight / 2, 'pongtransparent').setDepth(1);
        }
        else 
            this.background = this.add.image(fwidth / 2, fheight / 2 + UIHeight / 2, 'pong');
        this.background.setDisplaySize(fwidth, fheight - UIHeight);
        this.background.setDepth(1);
    }
    
    update() {}

    clear() {
        this.shader = undefined;
        this.background = undefined;
    }
    
    rescale() {
        if (this.shader) {
            this.shader.destroy();
            this.shader = this.add.shader('acid', fwidth / 2, fheight / 2 + UIHeight / 2, fwidth, fheight - UIHeight);
        }
        rescaleobject(this.background, scaleX, UIlessScaleY, true);
    }
}
