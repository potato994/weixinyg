// 获取商品分类数据
export const getStorageCates = ()=>{
    return wx.getStorageSync("cates");
      
}


// 把商品分类数据存入本地储存

export const setStorageCates = (obj)=>{
    wx.setStorageSync("cates", obj);
      
}


// 设置到购物车

export const setStorageCart = (obj)=>{
    wx.setStorageSync("cart",obj)
}

// 获取购物车数据
export const getStorageCart = ()=>{
  return  wx.setStorageSync("cart")
}