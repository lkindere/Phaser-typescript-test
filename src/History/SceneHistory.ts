import 'phaser';
// import { Button } from '../button.js';
import { game, config, UIHeight, scaleX } from '../config.js';

let nmatches = 10;
let scrolloffset = 0;

//Placeholder or smth
class MatchData
{
    constructor(
        public p1: string,
        public p2: string,
        public p1score: number,
        public p2score: number,
    ) {}
}

class HistoryBar
{
    initialY: number;
    private textmid: Phaser.GameObjects.Text;
    private textp1: Phaser.GameObjects.Text;
    private textp2: Phaser.GameObjects.Text;
    constructor (
        private scene: Phaser.Scene,
        private data: MatchData,
        private image: Phaser.GameObjects.Image
    ) {
        this.initialY = image.y;
        var style = { font: "bold 32px Arial", fill: "#fff", bottom: 20};
        //Create text + get vertical align
        this.textmid = scene.add.text(image.x, image.y, ' : ', style);
        var imagevertical = this.image.y * this.image.scaleY - (this.textmid.getCenter().y - this.textmid.getTopLeft().y);
        this.textp1 = scene.add.text(image.x, imagevertical, data.p1 + ' ' + data.p1score, style);
        this.textp2 = scene.add.text(image.x, imagevertical, data.p2score + ' ' + data.p2, style);
        this.textmid.setY(imagevertical);
        //Center horizontally
        var imagethird = this.image.x * this.image.scaleX / 3;
        this.textmid.setX(imagethird * 1.5 - (this.textmid.getCenter().x - this.textmid.getTopLeft().x));
        this.textp1.setX(imagethird * 0.5 - (this.textp1.getCenter().x - this.textp1.getTopLeft().x));
        this.textp2.setX(imagethird * 2.5 - (this.textp2.getCenter().x - this.textp2.getTopLeft().x));
    }

    loop() {
        //Reposition on scroll
        this.image.setY(this.initialY - scrolloffset);
        var imagevertical = this.image.y * this.image.scaleY - (this.textmid.getCenter().y - this.textmid.getTopLeft().y);
        this.textp1.setY(imagevertical);
        this.textp2.setY(imagevertical);
        this.textmid.setY(imagevertical);
    }
}

export class SceneHistory extends Phaser.Scene
{
    reposition: boolean = false;
    matches: HistoryBar[] = [];
    constructor() {
        super({key: 'SceneHistory'});
    }

    preload() {
        var bar = this.load.image('bar', 'assets/bigbar.png');
        this.load.glsl('waves', 'assets/shaders/waves.frag');
    }
    
    create() {
        this.add.shader('waves', config.width / 2, config.height / 2 + UIHeight / 2, config.width, config.height - UIHeight);
        //Placeholder until actual data can be acquired
        for (let i = 0; i < nmatches; ++i) {
            var matchdata = new MatchData('bob', 'peter', 5, 10);
            var img = this.add.image(config.width / 2, config.height / 2 - UIHeight / 2, 'bar');
            img.setScale(scaleX - 0.01, 1 - 0.01);
            img.setY(UIHeight + img.height / 2 + img.height * i);
            var bar = new HistoryBar(this, matchdata, img);
            this.matches.push(bar);
        }
    }

    update() {
        this.input.on('wheel', this.scroll, this);
        if (this.reposition)
            for (var match of this.matches)
                match.loop();
        this.reposition = false;
    }

    scroll(pointer: Phaser.Input.Pointer, dx: number, dy: number, dz: number) {
        scrolloffset += dz * 0.1;
        let lastmatch = this.matches[this.matches.length - 1];
        if (lastmatch && scrolloffset > lastmatch.initialY - config.height / 1.2)
            scrolloffset = lastmatch.initialY - config.height / 1.2;
        if (scrolloffset < 0)
            scrolloffset = 0;
        this.reposition = true;
    }
}
