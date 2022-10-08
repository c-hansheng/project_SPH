import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
// 封装游客身份模块uuid--->生成一个随机字符串（不能再变了）
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token:getUUID()
};
const actions = {
    // 获取产品信息的action 派发时需要向服务器传递产品id
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODINFO", result.data);
        }
    },
    // 将产品添加到购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //加入购物车返回的解构
        //加入购物车以后（发请求），前台将参数带给服务器
        //服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
        //因为服务器没有返回其余数据，因此咱们不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // 当前函数如果执行返回promise
        // return Promise.reject(new Error('fail')) //返回失败

        // 判断成功与失败
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error("请求失败"))
        }
    },
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    },
};
// 简化数据
const getters = {
    // 路径导航简化
    categoryView(state) {
        // goodInfo初始状态为空对象，categoryView为undefined
        return state.goodInfo.categoryView || {}
    },
    // 产品信息简化
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品属性简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    },
};

export default {
    state,
    actions,
    mutations,
    getters
}
