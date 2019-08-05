// ./pages/user/index.js
import {getStorageUserInfo} from '../../utils/stotage'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    const userInfo = getStorageUserInfo()
    if(!userInfo){
      wx.navigateTo({
        url: '/pages/login/index',
       
      });
      return
    }
    // console.log("正常显示页面");
    this.setData({
      userInfo
    })
  },

  
})