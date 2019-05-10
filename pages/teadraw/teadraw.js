//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pen: 3, //  画笔默认粗细值
    color: '#FCFAF2' // 画笔颜色默认值
  },
  startX: 0, // 记录茶画的坐标轴变量
  startY: 0,
  isFinePen:true, // 是否使用细笔
  iswhiteColor:true, // 黑白互换
  isRedColor:true, // 红黄互换
  isClear: false, // 是否使用消除
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function() {},
  // 手指触摸开始
  touchStart: function(e) {
    // 获取触摸点的坐标
    this.startX = e.changedTouches[0].x;
    this.startY = e.changedTouches[0].y;
    this.context = wx.createCanvasContext('teaSoup');
    if (this.isClear) {
      this.context.setStrokeStyle('#90b44b');
      this.context.setLineCap('round');
      this.context.setLineJoin('round');
      this.context.setLineWidth(20);
      this.context.save();
      this.context.beginPath();
      this.context.arc(this.startX, this.startY, 5, 0, 2 * Math.PI, true);
      this.context.fill();
      this.context.restore();
    } else {
      this.context.setStrokeStyle(this.data.color);
      this.context.setLineWidth(this.data.pen);
      this.context.setLineCap('round'); // 圆润线条
      this.context.beginPath();
    }
  },
  // 手指触摸后移动
  touchMove: function(e) {
    let startXMove = e.changedTouches[0].x;
    let startYMove = e.changedTouches[0].y;
    if (this.isClear) {
      this.context.save();
      this.context.moveTo(this.startX, this.startY);
      this.context.lineTo(startXMove, startYMove);
      this.context.stroke();
      this.context.restore();
      this.startX = startXMove;
      this.startY = startYMove;
    } else {
      this.context.moveTo(this.startX, this.startY);
      this.context.lineTo(startXMove, startYMove);
      this.context.stroke();
      this.startX = startXMove;
      this.startY = startYMove;
    }
    wx.drawCanvas({ //在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制,若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面。
      canvasId: 'teaSoup',
      reserve: true,
      actions: this.context.getActions() //  获取绘图动作数组
    })
  },
  touchEnd: function() {

  },
  clearTea: function() {
    this.isClear = !this.isClear;
  },
  penSelect: function(e) { // 换笔
    //console.log(e.currentTarget);
    this.isFinePen = !this.isFinePen;
    if(this.isFinePen){
       this.setData({
         pen:3
       });
    }
    else{
      this.setData({
        pen: parseInt(e.currentTarget.dataset.param)
      });
    }
    this.isClear = false;
  },
  whiteColorSelect:function(e){   // 黑白换色
    this.iswhiteColor=!this.iswhiteColor;
    if(this.iswhiteColor){
      this.setData({
        color: '#FCFAF2'
      })
    }
    else{
      this.setData({
        color:e.currentTarget.dataset.param
      })
    }
    this.isClear = false;
  },
  redColorSelect: function(e) {   // 红黄换色
    // console.log(e.currentTarget);
    this.isRedColor=!this.isRedColor;
    if(this.isRedColor){
      this.setData({
        color:'#cc0033'
      })
    }
    else{
      this.setData({
        color:e.currentTarget.dataset.param
      })
    }
    this.isClear = false;
  }
})