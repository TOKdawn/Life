import 'pixi.js'
// import 'pixi-display'
// import 'pixi-layers'

import 'style-loader!css-loader!normalize.css'
import './css/index.scss'

import { pixiLoader } from './js/load'
import { background } from './js/main'
// import {
//   background
// } from './js/background'


// tab 切换
const oli = document.querySelectorAll('.oli')
const ocontent = document.querySelector('.content')
const obox = document.querySelector('.box')
const iconList = [require('./../assets/packup.png'), require('./../assets/pulldown.png')]
const oicon = document.querySelector('.oicon')

const odiv = ocontent.querySelectorAll('div')

// icon 初始化
oicon.querySelector('img').src = require('./../assets/packup.png')
let iconNum = 0

// 渐入渐出
function alphaPlay(obj, method) { //method有两个值show或hidden
  let n = (method === "show") ? 0 : 100

  const ticker = new PIXI.ticker.Ticker()
  ticker.stop()
  ticker.add((deltaTime) => {
    if (method === "show") {
      if (n < 100) {
        n += 10
        if (n === 100) {
          obj.style.opacity = 1
        } else {
          obj.style.opacity = "0." + n
        }
      } else {
        ticker.destroy()
      }
    } else {
      if (n > 0) {
        n -= 5
        obj.style.opacity = "0." + n
      } else {
        ticker.destroy()
      }
    }
  });
  ticker.start()
}


const play = (loader, res) => {
  background(res)
}

// 开始
document.querySelector('#begin_button').addEventListener('click', () => {
  alphaPlay(document.querySelector('#begin'), "hidden")
  obox.style.display = 'block'
  document.querySelector('#begin_button').style.display = "none"
  setTimeout(() => {
    document.querySelector('#begin').style.zIndex = -1
  }, 500)
  pixiLoader.load(play)
  window.onresize = () => {
    document.body.removeChild(document.querySelector('canvas'))
    pixiLoader.load(play)
  };
})

// 重新开始
document.querySelector('#replay').addEventListener('click', () => {
  window.location.reload()
})

// tab 切换
for (let i = 0; i < oli.length; i++) {
  oli[i].index = i
  oli[i].addEventListener('click', function() {
    ocontent.style.display = 'block'
    obox.style.height = '1000px'
    iconNum = 1;
    oicon.querySelector('img').src = iconList[iconNum]

    for (let i = 0; i < oli.length; i++) {
      oli[i].className = ""
      odiv[i].style.display = "none"
    }
    this.className = "active"
    odiv[this.index].style.display = "block"
  })
}

// icon 点击切换
oicon.addEventListener('click', () => {
  iconNum = iconNum < iconList.length - 1 ? iconNum + 1 : iconNum = 0
  oicon.querySelector('img').src = iconList[iconNum]
  // 收起菜单
  ocontent.style.display = iconNum === 0 ? 'none' : 'block'
  obox.style.height = iconNum === 0 ? '200px' : '1000px'
})
