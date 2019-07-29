// ./pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SwiperList: [],
    catitems:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getAllSwiperList()
    this.getAllcatitems()
  },
  getAllSwiperList() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: (result) => {
        console.log(result);
        this.setData({
          SwiperList: result.data.message
        })
      },

    });

  },
  getAllcatitems(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      
      success: (result) => {
        // console.log(result);
        this.setData({
          catitems:result.data.message
        })
      },
   
    });
      
  }

})