
import { request } from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SwiperList: [],
    catitems: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getAllSwiperList()
    this.getAllcatitems()
    this.getAllFloorList()
  },
  getAllSwiperList() {
    request({
      url: "/home/swiperdata"
    }).then(res => {
      this.setData({
        SwiperList: res
      })
    })

  },
  getAllcatitems() {
    request({
      url: "/home/catitems"
    }).then(res => {
      this.setData({
        catitem: res
      })
    })

  },
  getAllFloorList() {
    request({
      url: "/home/floordata"
    }).then(res => {
      this.setData({
        floorList: res
      })
    })

  }

})