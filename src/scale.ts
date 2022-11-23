import 'phaser';
import { SceneHome } from './Home/SceneHome.js';
import { SceneHistory } from './History/SceneHistory.js';
import { SceneSettings } from './Settings/SceneSettings.js';
import { SceneUI } from './UI/SceneUI.js';
import { config, game } from './config.js';

//Positions and scales
export const UIHeight = 100;
export const baseX = 1280;
export const baseY = 720;
export let fwidth = window.innerWidth;
export let fheight = window.innerHeight;
export let scaleX = fwidth / baseX;
export let scaleY = fheight / baseY;
export let UIlessScaleY = (fheight - UIHeight) / baseY;

//Player defauls, move somewhere else later when things are clearer
export const Pspeed = baseY / 500;
export const Pheight = baseY / 10;

//Last resolution + reset
export let lastWidth = window.innerWidth;
export let lastHeight = window.innerHeight;

function resetLast() {
    lastWidth = fwidth;
    lastHeight = fheight;
}

//Functions
export function rescaleobject(
    image: Phaser.GameObjects.Image
        | Phaser.GameObjects.Text
        | Phaser.GameObjects.Rectangle
        | undefined,
    sclX: number, sclY: number, UIless: boolean = false,
    anchorX: boolean = false, anchorY: boolean = false)
{
    if (image == undefined)
        return;
    if (!anchorX) {
        let posX = image.x / lastWidth;
        image.setX(fwidth * posX);
    }
    if (!anchorY) {
        if (UIless) {
            let posY = (image.y - UIHeight) / (lastHeight - UIHeight);
            image.setY(((fheight - UIHeight) * posY) + UIHeight);
        }
        else {
            let posY = image.y / lastHeight;
            image.setY(fheight * posY);
        }
    }
    image.setScale(sclX, sclY);
}

//Updates position and scale variables, calls each scene for rescale
export function rescale() {
    fwidth = window.innerWidth;
    fheight = window.innerHeight;
    scaleX = fwidth / baseX;
    scaleY = fheight/ baseY;
    UIlessScaleY = (fheight - UIHeight) / baseY;

    config.width = fwidth;
    config.height = fheight;

    if (game.scene.isActive('SceneUI'))
        (game.scene.getScene('SceneUI') as SceneUI).rescale();
    if (game.scene.isActive('SceneHome'))
        (game.scene.getScene('SceneHome') as SceneHome).rescale();
    if (game.scene.isActive('SceneHistory'))
        (game.scene.getScene('SceneHistory') as SceneHistory).rescale();
    if (game.scene.isActive('SceneSettings'))
        (game.scene.getScene('SceneSettings') as SceneSettings).rescale();
    resetLast();
}