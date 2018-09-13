import * as PIXI from 'pixi.js';

import pixies from './pixies.js';

import {
    load,
} from './load.js';

let state = {
    currentBg: undefined,
    currentMaterial: undefined,
    showCaptureButton: false,
};
const app = new PIXI.Application(window.innerWidth, window.innerHeight, {
    antialias: true,
    backgroundColor: 0xffffff,
});
document.body.appendChild(app.view);
app.stage = new PIXI.display.Stage();
app.stage.group.enableSort = true;
const bgGroup = new PIXI.display.Group(-1, false); //背景层位于最下 不排序
const bgLayer = new PIXI.display.Layer(bgGroup);
const contextGroup = new PIXI.display.Group(0, true); //内容层
const contextLayer = new PIXI.display.Layer(contextGroup);
app.stage.addChild(bgLayer);
app.stage.addCgild(contextLayer);

if (!app.layers) { //封装进app
    app.layers = {};
    app.layers.bg = bgLayer;
    app.layers.context = contextlayer;
    app.stop(); //等待渲染
}
window.app = app;
let setCurrentMaterial = (object) => {
    state.currentMaterial = object;
};
let addBg = (name) => {
    console.log('执行');
    const {
        app: {
            view,
            layers,
            // stage,
        }
    } = window;
    const {
        currentBg
    } = state;
    if (currentBg) {
        pixies.remove(currentBg);
    }
    const bg = pixies.wrapBg(name, setCurrentMaterial);
    bg.origWidth = bg.width;
    bg.origHeight = bg.height;
    bg.parentLayer = layers.bg; //添加到背景层
    const scale = view.height / bg.height;
    bg.scale.set(scale, scale);
    bg.anchor.set(0.5, 0);
    bg.position.set(view.width / 2, 0);
    state.currentBg = bg;
    window.app.stage.addChild(bg);
};

addNormal = (name) => {
    const {app: {view, layers, }} = window;
    const container = pixies.wrapNormal(name, setCurrentMaterial);
    container.parentLayer = layers.normal;
    
}

load(begin);
function begin() {
    addBg('backgrounds/bg1');
}

