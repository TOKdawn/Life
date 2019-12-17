import * as PIXI from 'pixi.js'
import { getSprite } from './load'

const PADDING = 10
let order = -1
PIXI.Container.prototype.sort = function sort() {
  this.children.sort(function (a, b) {
    a.zIndex = a.zIndex || 0
    b.zIndex = b.zIndex || 0
    return b.zIndex - a.zIndex
  })
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
    this.flipButton.visible = false
    this.rotatButton.visible = false
    this.ticker.stop()
  }
  showPanel() {
    hideAllPanel(this.parent)
    this.border.visible = true
    this.handler.visible = true
    this.closeButton.visible = true
    this.resizeButton.visible = true
    this.flipButton.visible = true
    this.rotatButton.visible = true
    this.ticker.start()
    this.setTop()
  }
}

export function hideAllPanel(parent) {
  const all = parent && parent.children
  if (all) {
    for (const one of all) {
      if (one.hasPanel) {
        one.hidePanel()
      }
    }
  }
}

export function wrapBg(name) {
  const bg = getSprite(name)
  bg.name = name
  bg.interactive = true
  const listener = () => {
    hideAllPanel(bg.parent)
  }
  bg.on('mousedown', listener).on('touchstart', listener)
  return bg
}

export function wrapNormal(name) {
  const container = new ContainerWithPanel()
  container.name = name
  window.container = container
  const father = new PIXI.Container()
  if (false) {
    //
  } else {
    const sprite = getSprite(name)
    sprite.scale.set(0.75, 0.75)
    father.addChild(sprite)
  }
  father.pivot.x = father.width / 2
  father.pivot.y = father.height / 2
  container.addChild(father)
  container.father = father


  const border = new PIXI.Graphics()
  border.draw = function (width, height) {
    const lineColor = '0x000000'
    this.lineStyle(1, lineColor, 1)
    this.beginFill(0x0, 0)
    this.drawRect(0, 0, width, height)
    this.pivot.x = width / 2
    this.pivot.y = height / 2
    this.endFill()
  }
  container.addChild(border)
  container.border = border

  const handler = new PIXI.Graphics()
  handler.draw = function (width, height) {
    this.beginFill(0x0, 0.3)
    this.drawRect(0, 0, width, height)
    this.pivot.x = width / 2
    this.pivot.y = height / 2
    this.endFill()
  }
  container.addChild(handler)
  container.handler = handler

  bindMoveListener(handler, container)
  bindShowPanelListener(handler, container)

  // closeButton
  const closeButton = getSprite('./close.png')
  closeButton.anchor.set(0.5)
  closeButton.width = 56
  closeButton.height = 56
  container.addChild(closeButton)
  container.closeButton = closeButton
  bindRemoveListener(closeButton, container)

  // resizeButton
  const resizeButton = getSprite('./resize.png')
  resizeButton.anchor.set(0.5)
  resizeButton.width = 56
  resizeButton.height = 56
  container.addChild(resizeButton)
  container.resizeButton = resizeButton
  bindResizeListener(resizeButton, father)

  // flipButton
  const flipButton = getSprite('./flip.png')
  flipButton.anchor.set(0.5)
  flipButton.width = 56
  flipButton.height = 56
  container.addChild(flipButton)
  container.flipButton = flipButton
  bindFlipListener(flipButton, father)

  // rotatButton
  const rotatButton = getSprite('./rotat.png')
  rotatButton.anchor.set(0.5)
  rotatButton.width = 56
  rotatButton.height = 56
  container.addChild(rotatButton)
  container.rotatButton = rotatButton
  bindRotatListener(rotatButton, father)

  function dynamicSize() {
    const width = father.width + PADDING * 2
    const height = father.height + PADDING * 2
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
    father.hitArea = new PIXI.Rectangle(0, 0, width, height)
    closeButton.position.set(-width / 2, -height / 2)
    resizeButton.position.set(width / 2, height / 2)
    flipButton.position.set(-width / 2, height / 2)
    rotatButton.position.set(width / 2, -height / 2)
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

function bindRotatListener(trigger, target) {
  trigger.interactive = true
  const rotatTarget = () => {
    target.parent.rotation += 1.571
  }
  trigger.on('mousedown', rotatTarget).on('touchstart', rotatTarget)
}

function bindFlipListener(trigger, target) {
  trigger.interactive = true
  const filpTarget = () => {
    target.parent.width *= -1
  }
  trigger.on('mousedown', filpTarget).on('touchstart', filpTarget)
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
      // scale board

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
      // scale board

      this.data = null
      target.width /= 1.1
      target.height /= 1.1
    }
  }

  function onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(target.parent)
      target.x = newPosition.x - this.dragPoint.x
      target.y = newPosition.y - this.dragPoint.y
    }
  }
}

export function remove(target) {
  target.parent.removeChild(target)
}

export default {
  remove,
  wrapBg,
  wrapNormal,
  hideAllPanel,
}
