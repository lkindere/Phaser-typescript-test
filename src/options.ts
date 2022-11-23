export var scenes = [
    { str: 'Preload', alwayson: true},
    { str: 'SceneHome', alwayson: false},
    { str: 'SceneGame', alwayson: false},
    { str: 'SceneHistory', alwayson: false},
    { str: 'SceneSettings', alwayson: false},
    { str: 'SceneUI', alwayson: true},
]

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