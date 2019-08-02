import { request } from "../../request/index"
import {getStorageCart,setStorageCart} from "../../utils/stotage.js"
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    GoodsObj: {}
  },
  GoodInfo:{},

  onLoad: function (options) {
    console.log(options);
    this.getGoodsDetail(options.goods_id)
  },

  async getGoodsDetail(goods_id) {
    const res = await request({ url: "/goods/detail", data:{ goods_id}})
    console.log(res);
    this.GoodInfo = res
    this.setData({
      // 只存需要用到的数据
      GoodsObj: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: res.pics
      }
    })
  },

  // 点击图片放大
  handlePreviewImage(e){
    const {index} = e.currentTarget.dataset
    const urls = this.data.GoodsObj.pics.map(v=> v.pics_big )
    const current = urls[index];
    wx.previewImage({
      current,
      urls
    })
  },

  // 加入购物车
  handleCartAdd(){
    console.count("用户点击的次数");
    // 该变量 要么是一个完整的对象 要么是一个空对象
    let cart = getStorageCart() || {}

    // 判断要添加的商品  是否已经存在于 购物车对象中
    if(cart[this.GoodInfo.goods_id]){
      // 已经有旧数据了
      cart[this.GoodInfo.goods_id].num++
    }else{
      // 第一次新增数据
      cart[this.GoodInfo.goods_id] = this.GoodInfo
      cart[this.GoodInfo.goods_id].num = 1
    }
    setStorageCart(cart)
    wx.showToast({
      title: '添加成功',
      icon: 'none',
      mask:true
    });
      
  }

})