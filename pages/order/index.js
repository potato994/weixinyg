// ./pages/order/index.js

import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getStorageToken } from "../../utils/stotage.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, title: "全部", isActive: true },
      { id: 1, title: "待付款", isActive: false },
      { id: 2, title: "待发货", isActive: false },
      { id: 3, title: "退款/退货", isActive: false }
    ],
    orderList: []
  },
  // onShow() {

  // },
  // 改变tabs标签的选中结果
  handleTitleChange(e) {
    console.log(e);
    // 先获取子组件传递过来的数据
    const { index } = e.detail;
    // 获取源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs });
  },

  // // 获取订单列表
  // async getOrderList() {
  //   const res = await request({url:"/my/orders/all"})
  // }

})