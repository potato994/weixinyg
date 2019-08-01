
let ajaxTime = 0 

  
export const request = (params)=>{
    wx.showLoading({
        title: "加载中...",
    });
    ajaxTime++;
    console.log("发送出去的异步的格式"+ajaxTime);
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
                    console.log("请求都回来了");
                    wx.hideLoading()
                }
            }
        });
          
    })
}