import 'phaser';
import { getOption } from '../options.js';
import { fwidth, fheight, Pspeed, UIHeight, UIlessScaleY, scaleX, scaleY, baseX, baseY } from '../scale.js';

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
    Lpaddle: Paddle;
    Rpaddle: Paddle;
    shader: Phaser.GameObjects.Shader | undefined;
    background: Phaser.GameObjects.Image;
    constructor() {
        super({key: 'SceneGame'});
    }

    preload() {
        this.events.on('shutdown', this.clear, this);
    }
    
    create() {
        if (getOption('Game shader') == true)
            this.shader = this.add.shader('liquidvoid', fwidth / 2, fheight / 2 + UIHeight / 2, fwidth, fheight - UIHeight)
        this.background = this.add.image(fwidth / 2, fheight / 2 + UIHeight / 2, 'gamebg').setScale(Math.min(UIlessScaleY, scaleX));
        this.generateObjects();
    }

    generateObjects() {
        let leftX = this.background.x - this.background.displayWidth / 2.2;
        let rightX = this.background.x + this.background.displayWidth / 2.2;
        this.Lpaddle = new Paddle(this.add.image(leftX, fheight / 2 + UIHeight / 2, 'paddle').setScale(Math.min(UIlessScaleY, scaleX)));
        this.Rpaddle = new Paddle(this.add.image(rightX, fheight / 2 + UIHeight / 2, 'paddle').setScale(Math.min(UIlessScaleY, scaleX)));
        this.timer = this.game.getTime();
    }

    update() {
        let elapsed = this.game.getTime() - this.timer;
        let multiplier = elapsed / 1000 * 60;
        var W = this.input.keyboard.addKey('W');
        var S = this.input.keyboard.addKey('S');
        if (W.isDown && !S.isDown)
            this.Lpaddle.y -= Pspeed * UIlessScaleY * multiplier;
        else if (S.isDown && ! W.isDown)
            this.Lpaddle.y += Pspeed * UIlessScaleY * multiplier;
        //Placeholder
        this.Rpaddle.y += Pspeed * UIlessScaleY * multiplier * server_says_lol_this_guy_moved();
        this.timer = this.game.getTime();
    }

    clear() {
        this.timer = 0;
        this.Lpaddle = undefined;
        this.Rpaddle = undefined;
        this.shader = undefined;
        this.background = undefined;
    }
}
