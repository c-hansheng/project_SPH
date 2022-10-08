// 登录注册模块
import { reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo,reqUserLogout } from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'

const state = {
    code: '',
    token: getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    USERLOGOUT(){
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户登录业务
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        //服务器下发token，用户唯一标识符(uuid)
        //将来经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            // 持久化
            // localStorage.setItem('TOKEN',result.data.token)
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if(result.code == 200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 退出登录
    async userLogout({commit}){
        let result = await reqUserLogout()
        if(result.code ==200){
            commit('USERLOGOUT')
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {
    
}

export default {
    state,
    actions,
    mutations,
    getters
}