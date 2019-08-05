// ./pages/auth/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
import { wxLogin } from "../../utils/asyncWx"
Page({


  async getUserInfo(e) {
    // console.log(e);
    const { signature, iv, rawData, encryptedData } = e.detail
    const {code} = await wxLogin()
    console.log(code);
    let postParams = { signature, iv, rawData, encryptedData,code}
    // debugger;
    const res = await request({ url: "/users/wxlogin", data: postParams, method: "post" })
    console.log(res);
    // 存入token
    // wx.setStorageSync("token", token);

  //  wx.navigateBack({
  //     // delta 上几个页面 
  //     delta: 1
  //   });
  }

})