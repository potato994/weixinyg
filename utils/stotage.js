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


// 设置到地址

export const setStorageAddress = (obj)=>{
    wx.setStorageSync("address",obj)
}

// 获取地址数据
export const getStorageAddress = ()=>{
  return  wx.setStorageSync("address")
}

// 设置到token

export const setStorageToken = (obj)=>{
    wx.setStorageSync("token",obj)
}

// 获取token数据
export const getStorageToken = ()=>{
  return  wx.setStorageSync("token")
}


/**
 * 设置 用户信息
 * @param {object} obj 用户信息
 */
export const setStorageUserInfo = (obj) => {
  wx.setStorageSync("userinfo", obj);
}
/**
 * 获取用户信息 
 */
export const getStorageUserInfo = () => {
  return wx.getStorageSync("userinfo");
}