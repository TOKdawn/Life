import 'pixi-layers'

let order = -1
const PADDING = 10;

export function background(res) {

  PIXI.Container.prototype.sort = function sort() {
    this.children.sort(function (a, b) {
      a.zIndex = a.zIndex || 0
      b.zIndex = b.zIndex || 0
      return b.zIndex - a.zIndex
    })
  }

  // 初始化
  const app = new PIXI.Application(window.innerWidth, window.innerHeight / 1.33333, {
    antialias: true,
    backgroundColor: 0xEEEEE
  })

  document.body.appendChild(app.view)


  app.stage = new PIXI.display.Stage()
  app.stage.group.enableSort = true

  const bgGroup = new PIXI.display.Group(-1, false)
  const bgLayer = new PIXI.display.Layer(bgGroup)
  const normalGroup = new PIXI.display.Group(0, true)
  const normalLayer = new PIXI.display.Layer(normalGroup)
  app.stage.addChild(bgLayer)
  app.stage.addChild(normalLayer)
  if (!app.layers) app.layers = {}
  app.layers.bg = bgLayer
  app.layers.normal = normalLayer
  window.app = app

  const { app: { view, layers, stage } } = window

  // 设置背景图
  const bg = PIXI.Sprite.fromImage(res['./bg1.jpg'].url)

  // 点击背景图触发隐藏事件
  bg.on('tap', bg_listener)

  function bg_listener() {
    container.hideAllPanel(bg.parent)
    console.log('click bg')
  }

  bg.origWidth = bg.width
  bg.origHeight = bg.height

  bg.parentLayer = layers.bg
  const scale = view.height / bg.height
  bg.scale.set(scale, scale)
  bg.anchor.set(0.5, 0)
  bg.position.set(view.width / 2, 0)
  bg.interactive = true
  stage.interactive = true

  // 添加背景图片
  stage.addChild(bg)

  // 引入图片
  const texture = PIXI.Texture.fromImage(res['./male.png'].url)
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST

  addNormal()
  // addNormal()
  // addNormal()

  // add normal
  function addNormal() {
    const container = wrapNormal(res['./male.png'].url);

    container.parentLayer = layers.normal;
    const randomOffset = Math.random() * 40;
    const randomX = view.width * 0.5 + randomOffset;
    const randomY = view.height * 0.5 + randomOffset;
    container.position.set(randomX, randomY);
    stage.addChild(container);
    container.showPanel();
  }

  // normal
  function wrapNormal() {
    const container = new ContainerWithPanel()
    window.container = container

    // board - contains images and border
    const board = new PIXI.Container()

    const sprite = new PIXI.Sprite(texture)
    sprite.scale.set(0.5, 0.5)
    board.addChild(sprite)
    board.pivot.x = board.width / 2
    board.pivot.y = board.height / 2
    container.addChild(board)
    container.board = board

    // border
    const border = new PIXI.Graphics()
    // create draw method first, draw it later
    border.draw = function (width, height) {
      const lineColor = '0x000000'
      this.lineStyle(1.5, lineColor, 1)
      this.beginFill(0x0, 0)
      this.drawRect(0, 0, width, height)
      this.pivot.x = width / 2
      this.pivot.y = height / 2
      this.endFill()
    }
    container.addChild(border)
    container.border = border

    // interactive handler
    const handler = new PIXI.Graphics()
    handler.draw = function (width, height) {
      this.beginFill(0xffFF00, 0.3)
      this.drawRect(0, 0, width, height)
      this.pivot.x = width / 2
      this.pivot.y = height / 2
      this.endFill()
    }
    container.addChild(handler)
    container.handler = handler
    // bind listeners for handler
    bindMoveListener(handler, container)
    bindShowPanelListener(handler, container)

    // closeButton
    const closeButtonTexture = PIXI.Texture.fromImage(require('./../../../assets/close.png'))
    closeButtonTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST

    const closeButton = new PIXI.Sprite(closeButtonTexture)

    closeButton.anchor.set(0.5)
    closeButton.width = 56
    closeButton.height = 56
    container.addChild(closeButton)
    container.closeButton = closeButton
    bindRemoveListener(closeButton, container)

    // resizeButton
    const resizeButtonTexture = PIXI.Texture.fromImage(require('./../../../assets/resize.png'))
    resizeButtonTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST

    const resizeButton = new PIXI.Sprite(resizeButtonTexture)

    resizeButton.anchor.set(0.5)
    resizeButton.width = 56
    resizeButton.height = 56
    container.addChild(resizeButton)
    container.resizeButton = resizeButton
    bindResizeListener(resizeButton, board)

    // adjust according board's size
    function dynamicSize() {
      const width = board.width
      const height = board.height
      if (!border.width || !border.height) {
        border.draw(width, height)
      } else {
        border.width = width
        border.height = height
      }

      if (!handler.width || !border.height) {
        handler.draw(width, height)
      } else {
        handler.width = width
        handler.height = height
      }

      board.hitArea = new PIXI.Rectangle(0, 0, width, height)
      closeButton.position.set(-width / 2, -height / 2)
      resizeButton.position.set(width / 2, height / 2)
    }

    dynamicSize()
    const ticker = new PIXI.ticker.Ticker()
    ticker.stop()
    ticker.add(() => {
      dynamicSize()
    })
    container.ticker = ticker

    container.showPanel()
    return container
  }

}

class ContainerWithPanel extends PIXI.Container {
  constructor(args) {
    super(args)
    this.hasPanel = true
  }

  setTop() {
    this.zOrder = order--
  }

  hidePanel() {
    this.border.visible = false
    this.closeButton.visible = false
    this.resizeButton.visible = false
    this.ticker.stop()
  }

  showPanel() {
    this.hideAllPanel(this.parent)

    // show target
    this.border.visible = true
    this.closeButton.visible = true
    this.resizeButton.visible = true
    this.ticker.start()

    // put target on the top
    this.setTop()
  }

  hideAllPanel(parent) {
    const all = parent && parent.children
    if (all) {
      for (const one of all) {
        if (one.hasPanel) {
          one.hidePanel()
        }
      }
    }
  }
}




function bindShowPanelListener(trigger, target) {
  trigger.interactive = true
  const show = () => {
    target.showPanel()
  }
  trigger.on('mousedown', show).on('touchstart', show)
}

function bindRemoveListener(trigger, target) {
  trigger.interactive = true
  const removeTarget = () => {
    target.parent.removeChild(target)
  }
  trigger.on('mousedown', removeTarget).on('touchstart', removeTarget)
}

function bindResizeListener(trigger, target) {
  trigger.interactive = true
  trigger
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove)

  function onDragStart(event) {
    if (!this.dragging) {
      this.data = event.data
      this.dragging = true

      this.dragPoint = this.data.getLocalPosition(target.parent)
      this.dragPoint.x -= target.x
      this.dragPoint.y -= target.y
    }
  }

  function onDragEnd() {
    if (this.dragging) {
      this.dragging = false
      this.data = null
    }
  }

  function onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(target.parent)

      const ratio = target.width / target.height
      const newHeight = (newPosition.y - PADDING) * 2
      const newWidth = newHeight * ratio

      if (Math.min(newHeight, newWidth) > 40) {
        target.width = newWidth
        target.height = newHeight
      }
    }
  }
}

function bindMoveListener(trigger, target) {
  trigger.interactive = true
  trigger
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove)

  function onDragStart(event) {
    if (!this.dragging) {
      this.data = event.data
      this.dragging = true

      this.dragPoint = this.data.getLocalPosition(target.parent)
      this.dragPoint.x -= target.x
      this.dragPoint.y -= target.y
      target.showPanel()
      target.width *= 1.1
      target.height *= 1.1
    }
  }

  function onDragEnd() {
    if (this.dragging) {
      this.dragging = false
      target.width /= 1.1
      target.height /= 1.1
      this.data = null
    }
  }

  function onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(target.parent)
      target.x = newPosition.x - this.dragPoint.x
      target.y = newPosition.y - this.dragPoint.y
    }
  }

  function remove(target) {
    target.parent.removeChild(target)
  }
}
