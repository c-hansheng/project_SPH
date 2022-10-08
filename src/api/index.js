// 当前这个模块：API进行统一管理
import requests from "./request";
import mockAjax from "./mockAjax";

// 三级联动接口
// /api/product/getBaseCategoryList  get  无参数
//发请求:axios发请求返回结果Promise对象
//对外暴露一个幽数，只要外部调用这个函数，就想服务器发起ajax请求、获取咱们的三级菜单数据。当前咱们这个两数只需要把服务器返回结果返回即可。
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'})
/* export const reqCategoryList = ()=>{
   return requests({url:'/product/getBaseCategoryList',method:'get'}) //baseURL添加了 /api
} */

// export const reqGetBannerList = ()=>mockAjax({url:'/banner',method:'get'})
export const reqGetBannerList = ()=>mockAjax.get('/banner')

export const reqGetFloorList = ()=>mockAjax.get('/floor')

//获取搜索模块数据 地址：/api/list 请求方式:post 参数：需要带参数
/* 
   {
      "category3Id":"61",
      "categoryName":“手机”，
      "keyword":"小米"。
      "order": "1:desc",
      "pageNo": 1,
      "pagesize": 10,
      "props":["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
      "trademark":“4:小米" 
   }
*/
//当前这个函数需不需要接受外部传递参数
//当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params})

// 获取产品详情信息接口 URL:/api/item/{skuId} 请求方式：get
// export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'GET'})

// 将产品添加到购物车中（获取更新某一产品的数量）
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'POST'})

// 购物车列表
// URL: /api/cart/cartList method: get
export const reqShopCart = ()=>requests({url:`/cart/cartList`,method:'GET'})

// 8.删除购物车商品
// /cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'DELETE'})

// 7.切换商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedById = (skuID,isChecked)=>requests({url:`/cart/checkCart/${skuID}/${isChecked}`,method:'GET'})

// 获取注册验证码地址
// /api/user/passport/sendCode/phone
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'GET'})

// 注册用户
// /api/user/passport/register
export const reqUserRegister = (data)=>requests({url:`/user/passport/register`,data,method:'POST'})

// 登录
// /api/user/passport/login
export const reqUserLogin = (data)=>requests({url:`/user/passport/login`,data,method:'POST'})

// 自动登录
// /api/user/passport/auth/getUserInfo
export const reqUserInfo = ()=>requests({url:`/user/passport/auth/getUserInfo`,method:'GET'})

// 退出登录
// /api/user/passport/logout
export const reqUserLogout = ()=>requests({url:`/user/passport/logout`,method:'GET'})

// 14.获取订单交易页信息
// /api/order/auth/trade
export const reqGetTrade = ()=>requests({url:`/order/auth/trade`,method:'GET'})

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'POST'})

// 查询支付订单状态
// /api/payment/weixin/createNative/{orderId}
export const reqCreateNative = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'GET'})

// 查询支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqQueryPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'GET'})
