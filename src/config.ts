import 'phaser';
import { SceneHome } from './Home/SceneHome.js';
import { SceneRoom } from './Room/SceneRoom.js';
import { SceneGame } from './Game/SceneGame.js';
import { SceneHistory } from './History/SceneHistory.js';
import { SceneSettings } from './Settings/SceneSettings.js';
import { SceneUI } from './UI/SceneUI.js';

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
    scene: [ SceneHome, SceneRoom, SceneGame, SceneHistory, SceneSettings, SceneUI ]
};

export var options = [
    { str: 'shaders', on: true },
    { str: 'something', on: false },
    { str: 'lol', on: false },
    { str: 'whatever', on: false },
    { str: 'very long option wtf is this', on: true },
    { str: '123', on: true },
]

export var game = new Phaser.Game(config);