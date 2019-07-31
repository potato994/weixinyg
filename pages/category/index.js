import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   *  
   */
  data: {
    LeftMenuList: [],
    RightGoodsList: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],

  onLoad() {
    // this.getAllLeftList()
    let cates = wx.getStorageSync("cates");
    if (!cates) {
      // 没有数据
      this.getAllLeftList()
    } else {
      // 有数据再判断时间是否过期
      if (Date.now() - cates.time > 1000 * 20) {
        // 获取过去  重新发送哦请求来获取
        this.getAllLeftList()
      }else{
        // 数据没有过期，可以直接使用
        this.Cates = cates.data
        let LeftMenuList = this.Cates.map((v, i) => ({ cat_name: v.cat_name, cat_id: v.cat_id }))

        let RightGoodsList = this.Cates[0].children
        this.setData({
          LeftMenuList,
          RightGoodsList
        })
      }
    }

},

  // 获取所有分类数据
  getAllLeftList(){
    request({
      url:"/categories"
    }).then(res => {
        this.Cates = res
        wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
          
        let LeftMenuList = this.Cates.map((v, i) => ({ cat_name: v.cat_name, cat_id: v.cat_id }))

        let RightGoodsList = this.Cates[0].children
        this.setData({
          LeftMenuList,
          RightGoodsList
        })
      })
  },

  // 左侧菜单点击事件
  handleChangeMenu(e){
    // console.log(e);
    const { index } = e.currentTarget.dataset
    this.setData({
      currentIndex: index,
      RightGoodsList: this.Cates[index].children,
      scrollTop: 0
    })
  },
 
})