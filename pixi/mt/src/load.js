import * as PIXI from 'pixi.js';
function transferToLoaderObject(path) { // 包装文件索引
    let url;
    try {
        console.log('true', path);
        url = require(`./assets/images/materials/${path}.png`);
    } catch (e) {
        console.log('false', path);
        url = require(`./assets/images/materials/${path}.jpg`);
    }
    return {
        name: path,
        url,
    };
}
let paths = [];
function pushImg() {
    for (let i = 1;i < 13;i++) {
        paths.push('babies/baby' + i);
    }
    for (let i = 1;i < 3;i++) {
        paths.push('backgrounds/bg' + i);
    }
    for (let i = 1; i < 19; i++) {
        paths.push('goods/good' + i);
    }
    for (let i = 1; i < 31; i++) {
        paths.push('pasters/paster' + i);
    }
    paths.push('system/close');
    paths.push('system/flip');
    paths.push('system/resize');
    paths.push('system/rotat');
}
pushImg();

const loaderObjects = paths.map(transferToLoaderObject);

export let loaded = false;

export function load(finish) {
    const loader = PIXI.loader.add(loaderObjects);
    loader.on('progress', (loader) => {
        // const {
        //     progress,
        // } = loader;
        // loadprogress = Math.round(progress);
        // console.log('load', progress);
    });
    loader.load(() => {
        loaded = true;
        console.log('加载完成');
        finish();
    });
}
export function getSprite(name) {
    console.log(PIXI.loader.resources, name);
    const sprite = new PIXI.Sprite(PIXI.loader.resources[name].texture);
    return sprite;
}
