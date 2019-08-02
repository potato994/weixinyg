// ./pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';

import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx.js"
Page({
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
      const res2 = await chooseAddress()
      console.log(res2);
    }


    // 获取用户对小程序的授权信息
    // wx.getSetting({
    //   success: (result1) => {
    //     console.log(result1);

    //     // 获取到了授权信息
    //     const scopeAddress = result1.authSetting['scope.address']
    //     // 用户授权过 或者 用户从来没有调用过收货地址
    //     if (scopeAddress === true || scopeAddress === undefined) {
    //       // 调用收货地址
    //       wx.chooseAddress({
    //         success: (result2) => {
    //           console.log(result2);
    //         },
    //       });
    //     } else {
    //       // 用户 点击 拒绝收货地址  诱导用户 打开授权页面 再调用获取收货地址
    //       wx.openSetting({
    //         success: () => {
    //           // 调用收货地址
    //           wx.chooseAddress({
    //             success: (result3) => {
    //               console.log(result3);
    //             },
    //           });
    //         },
    //         fail: () => { },
    //         complete: () => { }
    //       });

    //     }
    //   },
    //   fail: () => { },
    //   complete: () => { }
    // });
  },

})