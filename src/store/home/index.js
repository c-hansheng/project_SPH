import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api/index";
// home模块仓库
const state = {
    categoryList: [], //服务器返回的是数组
    bannerList: [],
    floorList:[],
};
const actions = {
    async categoryList({ commit }) {
        //解构赋值 = context.commit
        // 通过API里面的接口函数调用，向服务器发请求，获取服务器数据
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data);
        }
    },
    async getBannerList({ commit }) {
        console.log('在向服务器发起Banner|ajax请求，获取轮播图的的数据')
        //解构赋值 = context.commit
        // 通过API里面的接口函数调用，向服务器发请求，获取服务器数据
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data);
        }
    },
    async getFloorList({ commit }) {
        console.log('在向服务器发起Floor|ajax请求，获取轮播图的的数据')
        //解构赋值 = context.commit
        // 通过API里面的接口函数调用，向服务器发请求，获取服务器数据
        let result = await reqGetFloorList();
        if (result.code == 200) {
            commit("GETFLOORLIST", result.data);
        }
    },
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList) {
        console.log('修改仓库中的bannerList数据')
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList) {
        console.log('修改仓库中的floorList数据')
        state.floorList = floorList;
    },
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
};
