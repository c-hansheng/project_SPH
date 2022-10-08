import { reqGetTrade } from '@/api'

const state = {
    tradeList:{}
}
const mutations = {
    GETTRADE({commit},tradeList){
        state.tradeList = tradeList
    }
}
const actions = {
    // 获取订单交易信息
    async getTrade({ commit }) {
        let result = await reqGetTrade()
        if(result.code == 200){
            commit('GETTRADE',result.data)
        }
    }
}
const getters = {
    tradeList(state){
        return state.tradeList||{}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}