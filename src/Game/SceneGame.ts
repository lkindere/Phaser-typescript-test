import 'phaser';
import { Button } from '../button.js';
import { game, config, UIHeight, UIlessScaleY, Pspeed } from '../config.js';

function placeholder() {
    console.log("lol");
}

class Paddle
{
    constructor(
        private image: Phaser.GameObjects.Image,
    ) {}
    
    set y(_y: number) {
        this.image.y = _y;
    }

    get y() {
        return this.image.y;
    }
}

//Placeholder
var rdir = 1;
function server_says_lol_this_guy_moved(): number {
    if (Math.random() < 0.1)
        rdir = -rdir;
    return rdir;
}

export class SceneGame extends Phaser.Scene
{
    timer: number;
    play: Button;
    Lpaddle: Paddle;
    Rpaddle: Paddle;
    constructor() {
        super({key: 'SceneGame'});
        this.play = new Button(this, config.width / 4 * 0.5, UIHeight / 2, 'button', 'buttonover', 'Play', placeholder);
    }

    preload() {
        this.load.image('paddle', 'assets/paddle.png');
        this.load.image('gamebg', 'assets/gamebackground.png');
        this.load.glsl('liquidvoid', 'assets/shaders/liquidvoid.frag');
    }
    
    create() {
        this.add.shader('liquidvoid', config.width / 2, config.height / 2 + UIHeight / 2, config.width, config.height - UIHeight);
        let gamebg = this.add.image(config.width / 2, config.height / 2 + UIHeight / 2, 'gamebg');
        gamebg.setScale(UIlessScaleY, UIlessScaleY);
        let scaledwidth = gamebg.width * gamebg.scale;
        let leftX = gamebg.x - scaledwidth / 2.2;
        let rightX = gamebg.x + scaledwidth / 2.2;
        this.Lpaddle = new Paddle(this.add.image(leftX, config.height / 2 + UIHeight / 2, 'paddle'));
        this.Rpaddle = new Paddle(this.add.image(rightX, config.height / 2 + UIHeight / 2, 'paddle'));
        this.timer = game.getTime();
    }

    update() {
        let elapsed = game.getTime() - this.timer;
        let multiplier = elapsed / 1000 * 60;
        var W = this.input.keyboard.addKey('W');
        var S = this.input.keyboard.addKey('S');
        if (W.isDown && !S.isDown)
            this.Lpaddle.y -= Pspeed * multiplier;
        else if (S.isDown && ! W.isDown)
            this.Lpaddle.y += Pspeed * multiplier;
        //Placeholder
        this.Rpaddle.y += Pspeed * multiplier * server_says_lol_this_guy_moved();
        this.timer = game.getTime();
    }
}
