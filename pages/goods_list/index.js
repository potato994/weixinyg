// ./pages/goods_list/index.js
import { request } from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, title: "综合", isActive: true },
      { id: 1, title: "销量", isActive: false },
      { id: 2, title: "价格", isActive: false },
    ],
    goodsList: []
  },
  // 全局接口参数
  QueryParams: {
    // 关键字
    query: "",
    // 分类id
    cid: "",
    // 页码
    pagenum: 1,
    // 页容量
    pagesize: 10,
  },
  TotalPage: 1,
  // 页面开始加载时，可以获取页面中的URL参数
  onLoad(options) {
    console.log(options);
    this.QueryParams.cid = options.cid
    this.getAllGoodsList()

  },

  // 获取所有商品信息  es7写法
 async getAllGoodsList() {
    // request({ url: "/goods/search", data: this.QueryParams }).then(res => {
    //   console.log(res);
    //   // 总页数 = Math.ceil( 总的条数 / 页容量)
    //   this.TotalPage = Math.ceil(res.total / this.QueryParams.pagesize)
    //   this.setData({
    //     // 为了做加载下一页，改成拼接
    //     // goodsList: res.goods
    //     goodsList: [...this.data.goodsList, ...res.goods]

    //   })
    //   wx.stopPullDownRefresh()
        
    // })
    const res = await request({ url: "/goods/search", data: this.QueryParams })
    // 总页数 = Math.ceil( 总的条数 / 页容量)
      this.TotalPage = Math.ceil(res.total / this.QueryParams.pagesize)
      this.setData({
        // 为了做加载下一页，改成拼接
        // goodsList: res.goods
        goodsList: [...this.data.goodsList, ...res.goods]

      })
      wx.stopPullDownRefresh()
  },

  handleTitleChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({ tabs })
  },
   //滚动条触底触发事件
   onReachBottom() {
    // 先判断有没有下一页数据
    if (this.QueryParams.pagenum >= this.TotalPage) {
      // 没有下一页数据
      wx.showToast({
        title: "已加载完成"
      })
    } else {
      // 还有下一页数据
      this.QueryParams.pagenum++
      this.getAllGoodsList()
    }
  },
  onPullDownRefresh() {
    // 重置页码
    // 重置data中的数据
    // 重新发送请求
    this.QueryParams.pagenum = 1;
    this.setData({
      goodsList:[]
    })
    this.getAllGoodsList()
  },
})