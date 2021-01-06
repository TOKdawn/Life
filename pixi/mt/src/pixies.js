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
/*

*故事要从哪里讲起呢  —*
*从石器时代古猿们在岩洞中刻下一幅幅壁画*
*到古典时代诗人们传颂着的一段段传奇故事*
*再到近代文人们写下的一篇篇小说,现代电影人留下的一幕幕光影.*
*表达与创作一直是我们这个物种与生俱来的原始冲动…*
生而为人,在满足了吃饱喝好的基本生理安全需求后
马洛斯需求层次模型自然的会向上推进,去寻找社交尊重和自我表达.
在一个个归家路上的思索中,
在一次次疑问和求索的对照后,
终于我在这里,以这样的方式,与你们相见.
这里是曙光,小镇青年,西二旗搬砖码农,真空下的理性人,才开始做第一个视频的up主.


人生中第一个视频应该以什么为主题,
以后这个频道要更新什么样的内容.
自己能坚持做up主多久,
这些问题也许没人在意也不需要在意,
但我确实是一个构建好一套自洽的逻辑链条后才会去做事的人.
做什么不重要,如何做不重要,但是为什么要做,对我来说很重要.

J 那么为何要做呢?
G 这开头不都说了么,自我表达啊.这人吃饱喝足,就找自己的存在感呗.

J 那也不太对啊,你这视频做了他有人看么?而且自我表达,你大可以去写文章做音乐啊
*/
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

/* 为何要做  --> 自我表达 
            --> 

*/
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
