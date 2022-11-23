import 'phaser';
import { Preload } from './Preload.js';
import { SceneHome } from './Home/SceneHome.js';
import { SceneGame } from './Game/SceneGame.js';
import { SceneHistory } from './History/SceneHistory.js';
import { SceneSettings } from './Settings/SceneSettings.js';
import { SceneUI } from './UI/SceneUI.js';

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

export var game = new Phaser.Game(config);