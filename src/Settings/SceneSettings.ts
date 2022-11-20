import 'phaser';
import { Button } from '../button.js';
import { game, config, UIHeight, UIlessScaleY, Pspeed } from '../config.js';

export class SceneSettings extends Phaser.Scene
{
    constructor() {
        super({key: 'SceneSettings'});
    }

    preload() {
        this.load.glsl('lava', 'assets/shaders/lava.frag');
    }
    
    create() {
        this.add.shader('lava', config.width / 2, config.height / 2 + UIHeight / 2, config.width, config.height - UIHeight);
    }

    update() {
    }
}
