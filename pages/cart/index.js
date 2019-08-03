// ./pages/cart/index.js
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';

import { getSetting, chooseAddress, openSetting, showModal } from "../../utils/asyncWx.js"

Page({

  data: {
    address: {},
    cart: {},
    isAllChecked: false,
    totalNum: 0,
    totalPrice: 0,
  },
  // 获取收货地址
  async handleChooseAddress() {
    const res1 = await getSetting()
    //  获取到了授权信息
    const scopeAddress = res1.authSetting['scope.address']
    // 对授权信息判断
    if (scopeAddress === true || scopeAddress === undefined) {
      // 直接调用获取收货地址的api
      const res2 = await chooseAddress()
      console.log(res2);
    } else {
      // 诱导用户 打开授权页面
      await openSetting()
      // 获取收货地址
      // const res2 = await chooseAddress()
      // console.log(res2);
    }

    const address = await chooseAddress();
    console.log(address);
    // 拼接完整的地址

    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    // 把收货地址存到本地储存中
    wx.setStorageSync("address", address);

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
    let isAllChecked = cartArr.every(v => v.checked)
    // 计算总价格   只计算勾选了的价格
    let totalPrice = 0;
    let totalNum = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      }
    })

    this.setData({ cart, totalPrice, totalNum, isAllChecked })
    // 防止数据改变了 刷新之后没有效果 所有也顺便存入缓存中
    wx.setStorageSync("cart", cart);

  },
  // 购物车选中切换
  handleCartCheck(e) {
    // console.log(e);
    // 获取要操作数据的id
    const { id } = e.currentTarget.dataset;
    const { cart } = this.data
    // 把购物车商品的选中状态进行取反
    cart[id].checked = !cart[id].checked;
    // 重新把cart的值填充到data缓存中
    this.setCart(cart)

  },
  // 购物车全选框
  handleAllCheck(e) {
    // console.log(e);
    let { cart, isAllChecked } = this.data;
    isAllChecked = !isAllChecked;
    for (const key in cart) {
      // 对象有些属性是自己 有些是原型链上的
      // 当属性是自身的  就可以继续执行
      if (cart.hasOwnProperty(key)) {
        cart[key].checked = isAllChecked;
      }
    }
    this.setCart(cart)
  },
  // 购物车数量的编辑功能
  async  handleCartNumEdit(e) {
    console.log(e);
    const {id,opration} = e.currentTarget.dataset;
    // 获取data中的购物车对象
    const {cart} = this.data;
    if(opration===-1 && cart[id].num===1){
      const res = await showModal({content:"您确定是要删除吗？"})
      if(res.confirm){
        delete cart[id]
        this.setCart(cart)
      }
    }else{
      cart[id].num += opration
      this.setCart(cart)
    }
  }
})