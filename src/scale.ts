import 'phaser';
import { SceneHome } from './Home/SceneHome.js';
import { SceneHistory } from './History/SceneHistory.js';
import { SceneSettings } from './Settings/SceneSettings.js';
import { SceneUI } from './UI/SceneUI.js';
import { game, config } from './config.js';

//Positions and scales
export const UIHeight = 100;
export const baseX = 1280;
export const baseY = 720;
export let scaleX = window.innerWidth / baseX;
export let scaleY = window.innerHeight / baseY;
export let UIlessScaleY = (window.innerHeight - UIHeight) / baseY;

//Last resolution + reset
export let lastWidth = window.innerWidth;
export let lastHeight = window.innerHeight;

function resetLast() {
    lastWidth = config.width;
    lastHeight = config.height;
}

//Functions
export function rescaleobject(
    image: Phaser.GameObjects.Image
        | Phaser.GameObjects.Shader
        | Phaser.GameObjects.Text
        | Phaser.GameObjects.Rectangle
        | undefined,
    sclX: number, sclY: number, UIless: boolean = false,
    anchorX: boolean = false, anchorY: boolean = false)
{
    console.log("UIless: ", UIless);
    if (image == undefined)
        return;
    if (!anchorX) {
        let posX = image.x / lastWidth;
        image.setX(config.width * posX);
    }
    if (!anchorY) {
        if (UIless) {
            let posY = (image.y - UIHeight) / (lastHeight - UIHeight);
            image.setY(((config.height - UIHeight) * posY) + UIHeight);
        }
        else {
            let posY = image.y / lastHeight;
            image.setY(config.height * posY);
        }
    }
    image.setScale(sclX, sclY);
}

export function rescale() {
    scaleX = window.innerWidth / baseX;
    scaleY = window.innerHeight / baseY;
    UIlessScaleY = (window.innerHeight - UIHeight) / baseY;

    config.width = window.innerWidth;
    config.height = window.innerHeight;

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