import baseImg from '../../../assets/img'

let loadprogress = 0 //资源加载的进度
let realyprogress = 0 //实际展示的进度
let truepropress = 0 //如果为两秒时加载的进度
// 进度条
let flag = document.getElementById('icon-flag')
let processBar = document.getElementById('process-bar')

const ticker = new PIXI.ticker.Ticker()
ticker.stop()
ticker.add((deltaTime) => {
  truepropress += 1
  realyprogress = (truepropress < loadprogress) ? truepropress : loadprogress
  if (realyprogress >= 100) {
    realyprogress = 100
    ticker.destroy()
    buttonshow()
  }
  processBar.style.width = realyprogress + '%'

})
ticker.start()

// loading data
export const pixiLoader =
  PIXI.loader
  .add(baseImg)
  .on('progress', (loader, resource) => {
    const {
      progress
    } = loader
    loadprogress = Math.round(progress)
  })
  .load()

function buttonshow() {

  document.querySelector('.xui-process').style.display = 'none'
  document.getElementById('begin_button').style.display = 'inline-block'
  console.log('load success')
}

export function getSprite(name) {
  const sprite = new PIXI.Sprite(PIXI.loader.resources[name].texture)
  return sprite
}
