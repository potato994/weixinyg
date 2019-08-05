import { getStorageToken } from "../utils/stotage";

let ajaxTime = 0


export const request = (params) => {
    // 定义请求头
    let header = { ...params.header }
    // 判断是否是私有路径
    if (params.url.includes('/my/')) {
        const token = getStorageToken()
        header["Authorization"] = token
    }
    wx.showLoading({
        title: "加载中...",
    });
    ajaxTime++;
    const baseURL = "https://api.zbztb.cn/api/public/v1"
    return new Promise((reslove, reject) => {
        wx.request({
            ...params,
            header: header,
            url: baseURL + params.url,
            success: (result) => {
                reslove(result.data.message)
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {
                ajaxTime--;
                if (ajaxTime === 0) {
                    wx.hideLoading()
                }
            }
        });

    })
}