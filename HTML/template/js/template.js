var template = {
  navList : [{
    name: '管理',
    type: 'aa',
    children:[
      {
        name: '审计流程',
        type:1
      },
      {
        name:'鱼骨图',
        type: 2
      },{
        name: '关系图',
        type: 3
      },{
        name: '质量管理',
        type: 4
      }
    ]
  },{
    name: '软件',
    type: 'bb',
    children:[
      {
        name: '时序图',
        type:1
      },
      {
        name:'数据流',
        type: 2
      },{
        name: '架构图',
        type: 3
      }
    ]
  }],

  renderNav: function (){
    for(var i = 0;i<template.navList.length;i++){
      var html = '<span>'+ template.navList[i].name+'</span>';
      
    }
  }
}