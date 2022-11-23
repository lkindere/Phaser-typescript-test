import 'phaser';
import { SceneHome } from './Home/SceneHome.js';
// import { SceneRoom } from './Room/SceneRoom.js';
import { SceneGame } from './Game/SceneGame.js';
import { SceneHistory } from './History/SceneHistory.js';
import { SceneSettings } from './Settings/SceneSettings.js';
import { SceneUI } from './UI/SceneUI.js';
import { rescale, baseY } from './scale.js';

//Style
export let style = { font: "bold 12px Arial", fill: "#fff", bottom: 20};
export let style32 = { font: "bold 32px Arial", fill: "#fff", bottom: 20};

//Player defauls
export const Pspeed = baseY / 500;
export const Pheight = baseY / 10;

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
        game.canvas.setAttribute('willReadFrequently', 'true');
        game.scene.start('SceneUI');
        game.scene.start('SceneHome');
    }

    resize() {
        rescale();
    }

    update() {}
}

export const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE,
    },
    disableContextMenu: true,
    physics: {
        default: "arcade",
        arcade: {
            fps: 60 }
    },
    scene: [ Preload, SceneHome, SceneGame, SceneHistory, SceneSettings, SceneUI ]
};

export var options = [
    { str: 'UI shader', on: false },
    { str: 'Home shader', on: false },
    { str: 'Game shader', on: false },
    { str: 'History shader', on: false },
    { str: 'Settings shader', on: false },
]

export function getOption(opt: string): boolean {
    for (var option of options) {
        if (option.str == opt)
            return option.on;
    }
    return false;
}

export var game = new Phaser.Game(config);