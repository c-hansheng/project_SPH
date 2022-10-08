import {reqGetSearchInfo} from '@/api/index'
// search模块仓库
const state={
    searchList:{}
}
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions={
                            //当前上下文，载荷（默认为空对象）
    async getSearchList({commit},params = {}){
        //当前这个reqGetsearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data);
        }
    }
}
// 计算属性：在项目中为简化数据而生
// 项目当中的getters主要的作用是L简化仓库中的数据而生
const getters={
    // 当前形参state，当前仓库中state，而非大仓库中的state
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}