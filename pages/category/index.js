import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    LeftMenuList:[],
    RightGoodsList:[],
    currentIndex:0
  },

  onLoad(){
    this.getAllLeftList()
  },

  getAllLeftList(){
    request({
      url:"/categories"
    }).then(res=>{
      console.log(res);
      let LeftMenuList = res.map((v,i)=>({ cat_name:v.cat_name,cat_id:v.cat_id }))

      let RightGoodsList = res[0].children
      this.setData({
        LeftMenuList,
        RightGoodsList
      })
    })
  }
 
})