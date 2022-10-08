import { v4 as uuidv4 } from 'uuid';

export const getUUID = ()=>{
    // 先从本地存储获取UUID （查看是否有UUID）
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有
    if(!uuid_token){
        // 生成游客身份
        uuid_token = uuidv4()
        // 本地存储存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    // 切记返回值 没有返回值undefined
    return uuid_token
}