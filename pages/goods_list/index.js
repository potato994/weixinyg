// ./pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, title: "综合", isActive: true },
      { id: 1, title: "销量", isActive: false },
      { id: 2, title: "价格", isActive: false },
    ]
  },
  // 页面开始加载时，可以获取页面中的URL参数
  onLoad(options) {
    console.log(options);
  },

  handleTitleChange(e) {
    const { index } = e.detail;
    let {tabs} = this.data
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({tabs})
  }
})