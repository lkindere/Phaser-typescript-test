import 'phaser';
import { getOption } from '../options.js';
import { fwidth, fheight, rescaleobject, UIHeight, scaleX, scaleY, UIlessScaleY, baseX, baseY } from '../scale.js';
import { style32 } from '../styles.js';

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

        this.textmid = scene.add.text(image.x, image.y, ' : ', style32).setScale(scaleX, UIlessScaleY).setOrigin(0.5);
        this.textp1 = scene.add.text(image.x, image.y, data.p1 + ' ' + data.p1score, style32).setScale(scaleX, UIlessScaleY).setOrigin(0.5);
        this.textp2 = scene.add.text(image.x, image.y, data.p2score + ' ' + data.p2, style32).setScale(scaleX, UIlessScaleY).setOrigin(0.5);
        
        var imagethird = this.image.displayWidth / 3;
        this.textp1.setX(this.image.getLeftCenter().x + imagethird * 0.5).setDepth(10);
        this.textmid.setX(this.image.getLeftCenter().x + imagethird * 1.5).setDepth(10);
        this.textp2.setX(this.image.getLeftCenter().x + imagethird * 2.5).setDepth(10);

        this.image.setDepth(1);
        this.textmid.setDepth(2);
        this.textp1.setDepth(2);
        this.textp2.setDepth(2);
    }

    loop() {
        this.textp1.setY(this.image.y);
        this.textp2.setY(this.image.y);
        this.textmid.setY(this.image.y);
    }

    rescale() {
        rescaleobject(this.image, scaleX - 0.05, UIlessScaleY - 0.15, true);
        rescaleobject(this.textmid, scaleX, UIlessScaleY, true);
        rescaleobject(this.textp1, scaleX, UIlessScaleY, true);
        rescaleobject(this.textp2, scaleX, UIlessScaleY, true);
    }
}

export class SceneHistory extends Phaser.Scene
{
    reposition: boolean = false;
    matches: HistoryBar[] = [];
    shader: Phaser.GameObjects.Shader | undefined;
    constructor() {
        super({key: 'SceneHistory'});
    }

    preload() {
        this.events.on('shutdown', this.clear, this);
    }
    
    create() {
        if (getOption('History shader') == true)
            this.shader = this.add.shader('waves', fwidth / 2, fheight / 2 + UIHeight / 2, fwidth, fheight - UIHeight)
        //Placeholder until actual data can be acquired
        let hfifth = (fheight - UIHeight) / 5;
        for (let i = 0; i < nmatches; ++i) {
            var matchdata = new MatchData('some dude', 'another dude', 5, 10);
            var img = this.add.image(fwidth / 2, UIHeight + hfifth * i, 'bar').setScale(scaleX - 0.05, UIlessScaleY - 0.15);
            this.matches.push(new HistoryBar(this, matchdata, img));
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
        if (lastmatch && scrolloffset > lastmatch.initialY - fheight / 1.2)
            scrolloffset = lastmatch.initialY - fheight / 1.2;
        if (scrolloffset < 0)
            scrolloffset = 0;
        this.reposition = true;
    }

    clear() {
        this.reposition = false;
        this.matches = [];
        scrolloffset = 0;
    }

    rescale() {
        if (this.shader) {
            this.shader.destroy();
            this.shader = this.add.shader('waves', fwidth / 2, fheight / 2 + UIHeight / 2, fwidth, fheight - UIHeight);
        }
        for (let match of this.matches)
            match.rescale();
    }
}
