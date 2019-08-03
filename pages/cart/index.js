// ./pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';

import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx.js"
Page({

  data:{
    address:{}
  },
  // 获取收货地址
  async handleChooseAddress() {
    const res1 = await getSetting()
    //  获取到了授权信息
    const scopeAddress = res1.authSetting['scope.address']
    // 对授权信息判断
    if(scopeAddress === true || scopeAddress === undefined){
      // 直接调用获取收货地址的api
    const res2 = await chooseAddress()
    console.log(res2);
    }else{
      // 诱导用户 打开授权页面
      await openSetting()
      // 获取收货地址
      // const res2 = await chooseAddress()
      // console.log(res2);
    }

    const address = await chooseAddress();
    console.log(address);
    // 拼接完整的地址

    address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
    // 把收货地址存到本地储存中
   wx.setStorageSync("address",address);
    
  },

  // 页面切换显示的时候触发 onShow
  onShow(){
    const address = wx.getStorageSync("address") || {};
    // 把address存入到data中
    this.setData({
      address
    })
      
  }

})