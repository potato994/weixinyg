// 获取商品分类数据
export const getStorageCates = ()=>{
    return wx.getStorageSync("cates");
      
}


// 把商品分类数据存入本地储存

export const setStorageCates = (obj)=>{
    wx.setStorageSync("cates", obj);
      
}