import 'phaser';
import { SceneUI } from './UI/SceneUI.js';
import { SceneGame } from './Game/SceneGame.js';
import { SceneHistory } from './History/SceneHistory.js';

//Positions and scales
export const UIHeight = 100;
export const baseX = 1280;
export const baseY = 720;
export const scaleX = window.innerWidth / baseX;
export const scaleY = window.innerHeight / baseY;
export const UIlessScaleY = (window.innerHeight - UIHeight) / baseY;

//Player defauls
export const Pspeed = baseX * scaleX / 500;

export const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: window.innerWidth,
    height: window.innerHeight,
    disableContextMenu: true,
    physics: {
        default: "arcade",
        arcade: {
            fps: 60 }
    },
    scene: [ SceneGame, SceneHistory, SceneUI ]
};

export var game = new Phaser.Game(config);