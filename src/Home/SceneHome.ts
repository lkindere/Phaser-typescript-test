import 'phaser';
import { getOption, config, } from '../config.js';
import { rescaleobject, UIHeight, scaleX, UIlessScaleY } from '../scale.js';

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
            console.log("Creating shader");
            this.shader = this.add.shader('acid', config.width / 2, config.height / 2 + UIHeight / 2, config.width, config.height - UIHeight);
            this.background = this.add.image(config.width / 2, config.height / 2 + UIHeight / 2, 'pongtransparent');
        }
        else 
            this.background = this.add.image(config.width / 2, config.height / 2 + UIHeight / 2, 'pong');
        this.background.setDisplaySize(config.width, config.height - UIHeight);
        this.background.setDepth(1);
    }
    
    update() {}

    clear() {
        this.shader = undefined;
        this.background = undefined;
    }
    
    rescale() {
        rescaleobject(this.shader, scaleX, UIlessScaleY, true);
        rescaleobject(this.background, scaleX, UIlessScaleY, true);
    }

}
