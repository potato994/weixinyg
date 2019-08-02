
let ajaxTime = 0 

  
export const request = (params)=>{
    wx.showLoading({
        title: "加载中...",
    });
    ajaxTime++;
    const baseURL = "https://api.zbztb.cn/api/public/v1"
    return new Promise((reslove,reject)=>{
        wx.request({
            ...params,
            url: baseURL+params.url,
            success: (result) => {
                reslove(result.data.message)
            },
            fail: (error) => {
                reject(error)
            },
            complete:()=>{
                ajaxTime--;
                if(ajaxTime===0){
                    wx.hideLoading()
                }
            }
        });
          
    })
}