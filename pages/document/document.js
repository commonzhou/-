// pages/document/document.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    errShow: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: "",
      errShow:false
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value,
      errShow:false
    });
  },
  search:function(e){
   this.setData({
     errShow:true
   })
  }
})