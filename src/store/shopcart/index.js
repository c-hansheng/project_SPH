import { reqShopCart, reqDeleteCartById, reqUpdateCheckedById } from '@/api'

const state = {
    cartList: []
}
const mutations = {
    GETSHOPCART(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表
    async getShopCart({ commit }) {
        let result = await reqShopCart()
        if (result.code == 200) {
            commit('GETSHOPCART', result.data)
        }
    },
    // 商品删除
    async getDeleteCart({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 修改购物车产品选中状态
    async UpdateCheckedById({ commit }, { skuId, isChecked }) {
        console.log(isChecked)
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 删除选中商品
    deleteAllCheckedCart({ dispatch, getters }) { //context就是仓库
        //context:小仓库，commit【提交mutations修改state】getter【计算属性】 dispatch【派发actionstate【当前仓库数据】
        // console.log(context)

        let PromiseAll = [] //如果有一个Promise失败，都失败，如果都成功，返回成功。
        // 获取购物车中全部商品(是一个数组)
        getters.cartList.cartInfoList.forEach(item => {
            let Promise = item.isChecked == 1 ? dispatch('getDeleteCart', item.skuId) : ''
            // 将每次返回的promise添加到 promiseAll 中
            PromiseAll.push(Promise)
        });
        return Promise.all(PromiseAll)
    },
    // 全选修改所有产品选中状态
    changeAllChecked({ dispatch, getters }, isChecked) {
        let PromiseAll = []

        getters.cartList.cartInfoList.forEach(item => {
            let Promise = dispatch('UpdateCheckedById', { skuId: item.skuId, isChecked })

            PromiseAll.push(Promise)
        });
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}