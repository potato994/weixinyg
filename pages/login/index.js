// ./pages/login/index.js
import {setStorageUserInfo} from '../../utils/stotage'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleGetUserInfo(e) {
    console.log(e);
    const userInfo = e.detail.userInfo
    setStorageUserInfo(userInfo)
    wx.navigateBack({
      delta: 1
    });
      
  }
})