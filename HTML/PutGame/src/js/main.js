import * as PIXI from 'pixi.js'
import hp from './helper'
import 'pixi-layers'

export function background() {
  const app = new PIXI.Application(window.innerWidth, window.innerHeight / 1.33333, {
    // antialias: true,
    backgroundColor: 0xEEEEE,
  })


  document.body.appendChild(app.view)

  app.stage = new PIXI.display.Stage()
  app.stage.group.enableSort = true
  const bgGroup = new PIXI.display.Group(-1, false) //背景层位于最下 不排序
  const bgLayer = new PIXI.display.Layer(bgGroup)
  const contextGroup = new PIXI.display.Group(0, true) //内容层
  const contextLayer = new PIXI.display.Layer(contextGroup)
  app.stage.addChild(bgLayer)
  app.stage.addChild(contextLayer)
  window.app = app

  if (!app.layers) { //封装进app
    app.layers = {}
    app.layers.bg = bgLayer
    app.layers.context = contextLayer
    // app.stop() //等待渲染
  }
  let addBg = (name) => {
    const {
      app: {
        view,
        layers,
        stage
      }
    } = window
    const bg = hp.wrapBg(name)
    bg.origWidth = bg.width
    bg.origHeight = bg.height
    bg.parentLayer = layers.bg //添加到背景层
    const scale = view.height / bg.height
    bg.scale.set(scale, scale)
    bg.anchor.set(0.5, 0)
    bg.position.set(view.width / 2, 0)
    stage.addChild(bg)
  }

  let addNormal = (name) => {
    const {
      app: {
        view,
        layers,
        stage
      }
    } = window
    const container = hp.wrapNormal(name)
    container.parentLayer = layers.context //添加到内容层
    const randomOffset = Math.random() * 40 //位置小随机
    const randomX = view.width * 0.5 + randomOffset
    const randomY = view.height * 0.5 + randomOffset
    container.position.set(randomX, randomY)
    stage.addChild(container)
    container.showPanel()
  }
  addBg('./bg1.jpg')
  addNormal('./male.png')
  addNormal('./female.png')
}
