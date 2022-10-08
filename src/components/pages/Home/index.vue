<template>
    <div>
        <!-- 三级联动全局组件：已注册为全局组件无需引入 -->
        <TypeNav />
        <ListContainer />
        <Recommend />
        <Rank />
        <Like />
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor" />
        <Brand />
    </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import { mapState } from 'vuex'

export default {
    name: 'Home',
    components: {
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    mounted() {
        console.log('ListContainer 挂载完毕！！')
        this.$store.dispatch('getFloorList')
        // 获取用户信息在首页
        // this.$store.dispatch('getUserInfo')
    },
    computed: {
        ...mapState({
            floorList: (state) => state.home.floorList
        })
    },
    methods: {

    },
}
</script>

<style>
</style>