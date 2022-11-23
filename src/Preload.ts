import 'phaser';
import { rescale } from './scale.js';


export class Preload extends Phaser.Scene
{
    constructor() {
        super({key: 'Preload', active: true})
    }

    preload() {
        //UI
        this.load.image('button', 'assets/button.png');
        this.load.image('buttonover', 'assets/buttonover.png');
        this.load.image('backgroundui', 'assets/backgroundui.png');
        //Game
        this.load.image('paddle', 'assets/paddle.png');
        this.load.image('gamebg', 'assets/gamebackground.png');
        //History
        this.load.image('bar', 'assets/bigbar.png');
        //Home
        this.load.image('pong', 'assets/pong.png');
        this.load.image('pongtransparent', 'assets/pongtransparent.png');
        //Settings
        this.load.image('box', 'assets/box.png');
        this.load.image('tick', 'assets/tick.png');
        //Shaders
        this.load.glsl('redwaves', 'assets/shaders/redwaves.frag');
        this.load.glsl('liquidvoid', 'assets/shaders/liquidvoid.frag');
        this.load.glsl('waves', 'assets/shaders/waves.frag');
        this.load.glsl('acid', 'assets/shaders/acid.frag');
        this.load.glsl('lava', 'assets/shaders/lava.frag');

        //Events
        this.scale.on('resize', this.resize, this)
    }

    create() {
        this.game.canvas.setAttribute('willReadFrequently', 'true');
        this.game.scene.start('SceneUI');
        this.game.scene.start('SceneHome');
    }

    resize() {
        rescale();
    }

    update() {}
}