import 'phaser';
import { config, UIHeight, scaleX, UIlessScaleY } from '../config.js';

export class SceneHome extends Phaser.Scene
{
    constructor() {
        super({key: 'SceneHome', active: true});
    }

    preload() {
        this.load.image('pong', 'assets/pong.png');
        this.load.image('pongtransparent', 'assets/pongtransparent.png');
        this.load.glsl('acid', 'assets/shaders/acid.frag');
    }
    
    create() {
        // let bg = this.add.image(config.width / 2, config.height / 2 + UIHeight / 2, 'pong');
        // bg.setScale(scaleX, UIlessScaleY);
        var shader = this.add.shader('acid', config.width / 2, config.height / 2 + UIHeight / 2, config.width, config.height - UIHeight);
        let bg = this.add.image(config.width / 2, config.height / 2 + UIHeight / 2, 'pongtransparent');
        bg.setScale(scaleX, UIlessScaleY);
    }

    update() {
    }
}
