// ./pages/cart/index.js
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';

import { getSetting, chooseAddress, openSetting, showModal } from "../../utils/asyncWx.js"

Page({

  data: {
    address: {},
    cart: {},
    totalNum: 0,
    totalPrice: 0,
  },

  // 页面切换显示的时候触发 onShow
  onShow() {
    const address = wx.getStorageSync("address") || {};
    // 获取购物车数据
    const cart = wx.getStorageSync("cart") || {};

    // 把address存入到data中
    this.setData({ address })
    this.setCart(cart)

  },
  // 设置购物车数据和计算总价格
  setCart(cart) {
    // 把购物车对象 转成数据
    let cartArr = Object.values(cart)
    // 计算是否都选中了  
    // every 会接收一个回调函数，当没有循环项都返回true的时候，cartArr.every的返回值才会是 true
    let isAllChecked = cartArr.length ? cartArr.every(v => v.checked) : false;
    // 计算总价格   只计算勾选了的价格
    let totalPrice = 0;
    let totalNum = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      }
    })
    // 购物车是否有数据
    let hascart = cartArr.length > 0 ? true : false;
    this.setData({ cart, totalPrice, totalNum, isAllChecked,hascart })
    // 防止数据改变了 刷新之后没有效果 所有也顺便存入缓存中
    wx.setStorageSync("cart", cart);

  },
  handleOederPay(){
    const token = wx.getStorageSync("token")
    // 判断是否存在
    if(!token){
      // 跳转到授权页面
      wx.navigateTo({
        url: '/pages/auth/index',
       
      });
    }else{
      // 有token值，直接写逻辑
      console.log("有token值");
    }
  }
})