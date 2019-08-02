import { request } from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    GoodsObj: {}
  },

  onLoad: function (options) {
    console.log(options);
    this.getGoodsDetail(options.goods_id)
  },

  async getGoodsDetail(goods_id) {
    const res = await request({ url: "/goods/detail", data:{ goods_id}})
    console.log(res);
    this.setData({
      // 只存需要用到的数据
      GoodsObj: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: res.pics
      }
    })
  }

})