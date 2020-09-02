import * as PIXI from 'pixi.js';
import colors from './color_size';
import { getSprite } from './load';
const PADDING = 10; //默认间距
let order = -1; //起始z-index
let actionPixies;
PIXI.Container.prototype.sort = function sort() { //改变z-index
    this.children.sort(function (a, b) {
        a.zIndex = a.zIndex || 0;
        b.zIndex = b.zIndex || 0;
        return b.zIndex - a.zIndex;
    });
};
class ContainerWithPanel extends PIXI.Container { // 通过继承生成一个升级版容器
    constructor(args) {
        super(args);
        this.hasPanel = true; //默认有状态框
    }

    setTop() {
        this.zOrder = order--; //无限上提
    }

    hidePanel() {
        this.border.visible = false;
        this.closeButton.visible = false;
        this.resizeButton.visible = false;
        this.flipButton.visible = false;
        this.rotatButton.visible = false;
        this.ticker.stop(); //结束状态栏监听循环
    }
    showPanel() {
        hideAllPanel(this.parent);
        if (iactionPixies.hasPanel && actionPixies.hidePanel()) {
            iactionPixies = this; // 记录当前活跃
        }
        this.border.visible = true;
        this.closeButton.visible = true;
        this.resizeButton.visible = true;
        this.flipButton.visible = true;
        this.rotatButton.visible = true;
        this.ticker.start(); //开始状态栏监听循环
        this.setTop(); //更改z-index
    }
}

export function hideAllPanel(parent) {
    const all = parent && parent.children;
    if (all) {
        for (const one of all) {
            if (one.hasPanel) {
                one.hidePanel();
            }
        }
    }
}

export function wrapBg(name, focusCB) {

    const bg = getSprite(name);
    bg.name = name;
    focusCB(bg);
    bg.interactive = true;
    const listener = () => {
        focusCB(bg);
        iactionPixies.hasPanel && actionPixies.hidePanel();
    };
    bg.on('mousedown', listener).on('touchstart', listener);
    return bg;
}

function skinType(name) {
    //文件名处理
    return name;
}

export function useSkin(name, father) {
    const skin = getSprite(name);
    skin.scale.set(0.3, 0.3);
    skin.name = name;
    skin.type = skinType(name);
    // const currentSkin = father[skin.type];
    // if (
    //     (currentSkin && currentSkin.name !== skin.name) ||
    //     (skin.name.includes('accessories') &&
    //         currentSkin &&
    //         currentSkin.name === skin.name)
    // ) {
    //     fahter[skin.type] = null;
    //     remove(currentSkin);
    // }

    // if (!currentSkin || currentSkin.name !== skin.name) {
    //     father[skin.type] = skin;
    //     positionSkin(skin);
    //     father.addChild(skin);
    //     father.sort();
    // }

    registerAnimation(father, [{
        prop: 'width',
    }, {
        prop: 'height',
    }]);
}

export function wrapNormal(name, focusCB) {
    const container = new ContainerWithPanel();
    container.name = name;
    focusCB(container);
    window.container = container;
    const father = new PIXI.Container(); //图像所在的容器
    if (false) {
        //特殊图像
    } else {
        const sprite = getSprite(name);
        sprite.scale.set(0.5, 0.5);
        father.addChild(sprite);
    }
    father.pivot.x = father.width / 2;
    father.pivot.y = father.height / 2; //校正旋转中心
    container.addChild(father);
    container.father = father;

    const border = new PIXI.Graphics();
    border.draw = function(width, height) {
        const lineColor = `0x${colors.boardBorder.replace('#', '')}`;
        this.lineStyle(colors.lineWidth, lineColor, 1);
        this.beginFill(0x0, 0);
        this.drawRect(0, 0, width, height);
        this.pivot.x = width / 2;
        this.pivot.y = height / 2;
        this.endFill();
    };
    container.addChild(border);
    container.border = border;
    bindMoveListener(border, container);
    bindShowPanelListener(border, container, focusCB);

    // //移动监测用覆盖层
    // const handler = new PIXI.Graphics();
    // handler.draw = function (width, height) {
    //     this.beginFill(0x0, 0);
    //     this.drawRect(0, 0, width, height);
    //     this.pivot.x = width / 2;
    //     this.pivot.y = height / 2;
    //     this.endFill();
    // };
    // container.addChild(handler);
    // container.handler = handler;
    // // bind listeners for handler
    // bindMoveListener(handler, container);
    // bindShowPanelListener(handler, container, focusCB);
    const closeButton = getSprite('system.close');
    closeButton.anchor.set(0.5);
    closeButton.width = 56;
    closeButton.height = 56;
    container.addChild(closeButton);
    container.closeButton = closeButton;
    bindRemoveListener(closeButton, container, focusCB);

    // resizeButton
    const resizeButton = getSprite('system.resize');
    resizeButton.anchor.set(0.5);
    resizeButton.width = 56;
    resizeButton.height = 56;
    container.addChild(resizeButton);
    container.resizeButton = resizeButton;
    bindResizeListener(resizeButton, father);

    // flipButton
    const flipButton = getSprite('system.flip');
    flipButton.anchor.set(0.5);
    flipButton.width = 56;
    flipButton.height = 56;
    container.addChild(flipButton);
    container.flipButton = flipButton;
    bindFlipListener(flipButton, father);

    // flipButton
    const rotatButton = getSprite('system.rotat');
    rotatButton.anchor.set(0.5);
    rotatButton.width = 56;
    rotatButton.height = 56;
    container.addChild(rotatButton);
    container.rotatButton = rotatButton;
    bindRotatListener(rotatButton, father);

    function dynameicSize() {
        const width = father.width + PADDING * 2;
        const height = father.height + PADDING * 2;
        if (!border.width || !border.height) {
            border.draw(width, height); //初始化边框长度
        } else {
            border.width = width;
            border.height = height; //更改边框长度
        }
        father.hitArea = new PIXI.Rectangle(0, 0, width, height);
        closeButton.position.set(-width / 2, -height / 2);
        resizeButton.position.set(width / 2, height / 2);
        flipButton.position.set(-width / 2, height / 2);
        rotatButton.position.set(width / 2, -height / 2);
    }
    dynameicSize();
    const ticker = new PIXI.ticker();
    ticker.stop();
    ticker.add(() => {
        dynamicSize();
    });
    container.ticker = ticker;
    registerAnimation(board, [{
        prop: 'width',
    }, {
        prop: 'height',
    }]);
    container.showPanel();
    return container;
}

function bindShowPanelListener(trigger, target, focusCB) { //显示边框
    trigger.interactive = true;
    const show = () => {
        target.showPanel();
        focusCB(target);
    };
    trigger.on('mousedown', show).on('touchstart', show);
}

function bindRemoveListener(trigger, target, focusCB) { //移除边框
    trigger.interactive = true;
    const removeTarget = () => {
        target.parent.removeChild(target);
        focusCB(null);
    };
    trigger.on('mousedown', removeTarget).on('touchstart', removeTarget);
}

function bindResizeListener(trigger, target) { //触发按钮和father元素
    trigger.interactive = true;
    trigger
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
/*

*/
    function onDragStart(event) {
        if (!this.dragging) {
            this.data = event.data;
            this.dragging = true;
            this.dragPoint = this.data.getLocalPosition(target.parent);
            this.dragPoint.x -= target.x;
            this.dragPoint.y -= target.y;
        }
    }

    function onDragEnd() {
        if (this.dragging) {
            this.dragging = false;
            this.data = null;
        }
    }

    function onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(target.parent); //鼠标落点相对于容器中心的距离
            const ratio = target.width / target.height;
            const newHeight = (newPosition.y - PADDING) * 2; //获取人物宽度
            const newWidth = newHeight * ratio;

            if (Math.min(newHeight, newWidth) > 40) {
                target.width = newWidth;
                target.height = newHeight; //放大人物宽度

                registerAnimation(target, [{
                    prop: 'width',
                }, {
                    prop: 'height',
                }]);
            }
        }
    }

}

function bindMoveListener(trigger, target) {
    trigger.interactive = true;
    trigger
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);

    function onDragStart(event) {
        if (!this.dragging) {
            this.data = event.data;
            this.dragging = true;
            // scale board
            target.father.setAnimationState('grow');

            this.dragPoint = this.data.getLocalPosition(target.parent);
            this.dragPoint.x -= target.x;
            this.dragPoint.y -= target.y;
            target.showPanel();
        }
    }

    function onDragEnd() {
        if (this.dragging) {
            this.dragging = false;
            // scale board
            target.father.setAnimationState('shrink'); //缩放的动画效果
            this.data = null;
        }
    }

    function onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(target.parent);
            target.x = newPosition.x - this.dragPoint.x;
            target.y = newPosition.y - this.dragPoint.y;
        }
    }
}

export function remove(target) {
    target.parent.removeChild(target);
}

export default {
    remove, //外层容器
    wrapBg, //
    wrapNormal,
    useSkin,
    hideAllPanel,
};
