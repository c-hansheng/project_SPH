<template>
    <div>
        <!-- 商品分类三级标签 -->
        <TypeNav />
        <div class="main">
            <div class="py-container">
                <!--bread：面包屑，带有x结构的组件-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <!-- 分类的面包屑 -->
                        <li v-if="searchParams.categoryName" class="with-x">{{ searchParams.categoryName }}<i
                                @click="removeCategoryName">×</i></li>
                        <!-- 关键字的面包屑 -->
                        <li v-if="searchParams.keyword" class="with-x">{{ searchParams.keyword }}<i
                                @click="removeKeyword">×</i></li>
                        <!-- 品牌面包屑 split(':')切割数组-以':'为界限 -->
                        <li v-if="searchParams.trademark" class="with-x">{{ searchParams.trademark.split(':')[1] }}<i
                                @click="removeTrademark">×</i></li>
                        <!-- 属性面包屑 -->
                        <li v-for="(attrValue, index) in searchParams.props" :key="index" class="with-x">
                            {{ attrValue.split(':')[1] }}<i @click="removeAttrs(index)">×</i></li>
                    </ul>
                </div>

                <!--selector-->
                <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

                <!--details-->
                <div class="details clearfix">
                    <!-- 综合排行 -->
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li :class="{ active: isOne }" @click="changeOrder('1',)">
                                    <a>综合 <i v-show="isOne" class="fa "
                                            :class="{ 'fa-arrow-down': isDesc, 'fa-arrow-up': isAsc }"
                                            aria-hidden="true"></i></a>
                                </li>
                                <li :class="{ active: isTwo }" @click="changeOrder('2',)">
                                    <a>价格 <i v-show="isTwo" class="fa "
                                            :class="{ 'fa-arrow-up': isAsc, 'fa-arrow-down': isDesc }"
                                            aria-hidden="true"></i></a>

                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 产品列表 -->
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li v-for="(good) in goodsList" :key="good.id" class="yui3-u-1-5">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <router-link :to="`/detail/${good.id}`">
                                            <img v-lazy="good.defaultImg" />
                                        </router-link>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>&nbsp;
                                            <i>{{ good.price }}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a target="_blank" href="item.html" :title="good.title">{{ good.title }}</a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a href="success-cart.html" target="_blank"
                                            class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 分页器 -->
                    <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total"
                        :continues="5" @getPageNo="getPageNo" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'

export default {
    name: 'Search',
    data() {
        return {
            searchParams: {
                category1Id: "",//一级id
                category2Id: "",//二级id
                category3Id: "",//三级id
                categoryName: "",//分类名称
                keyword: "",//关键字
                order: "1:desc",//排序
                pageNo: 1,//分页器：代表第几页
                pageSize: 10,//每页展示数量
                props: [],//通过参数查询商品的参数
                trademark: ""//品牌
            }
        }
    },
    components: {
        SearchSelector
    },
    // 当组件挂载完毕之前执行一次【先与mounted之前】
    beforeMount() {
        // 给当前data数据赋值
        Object.assign(this.searchParams, this.$route.query, this.$route.params)
    },
    // 组件挂载完毕执行一次【仅仅执行一次】
    mounted() {
        // 先测试数据范围的格式
        // this.$store.dispatch('getSearchList',{})
        console.log('searchList挂载完毕！！！')

        //在发请求之前带给服务器参数 【 searchParams参数发生变化有数值带给服务器】
        this.getData()
    },
    computed: {
        ...mapGetters(['goodsList']),
        // 获取search模块展示页面一共的数据
        ...mapState({
            total: state => state.search.searchList.total
        }),

        isOne() {
            return this.searchParams.order.indexOf('1') != -1
        },
        isTwo() {
            return this.searchParams.order.indexOf('2') != -1
        },
        isDesc() {
            return this.searchParams.order.indexOf("desc") != -1
        },
        isAsc() {
            return this.searchParams.order.indexOf("asc") != -1
        }
    },
    methods: {
        //向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示）
        //把这次请求封装为一个函数：当你需要在调用的时候调用即可
        getData() {
            this.searchParams.pageNo = 1
            this.$store.dispatch('getSearchList', this.searchParams)
        },
        getData2() {
            this.$store.dispatch('getSearchList', this.searchParams)
        },
        // x
        removeCategoryName() {
            //把带给服务器的参数置空了，还需要向服务器发请求
            //带给服务器参数说明可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器
            //但是你把相应的字段变为undefined，当前这个字段不会带给服务器
            this.searchParams.category1Id = undefined
            this.searchParams.category2Id = undefined
            this.searchParams.category3Id = undefined
            this.searchParams.categoryName = undefined
            this.getData()
            //地址栏也需要需改：进行路由跳转(现在的路由跳转只是跳转到自己这里）
            //严谨：本意是删除query，如果路径当中出现params不应该删除，路由跳转的时候应该带着
            if (this.$route.params) {
                this.$router.push({ name: 'search', params: this.$router.params })
            }
        },
        removeKeyword() {
            // 删除关键字
            this.searchParams.keyword = undefined
            // 全局事件总线 通知Header组件清除关键字
            this.$bus.$emit('hello', this.keyword)

            this.getData()

            if (this.$route.query) {
                this.$router.push({ name: 'search', query: this.$route.query })
            }
        },
        // 删除品牌信息
        removeTrademark() {
            this.searchParams.trademark = undefined
            this.getData()
        },
        removeAttrs(index) {
            this.searchParams.props.splice(index, 1)
            this.getData()
        },
        // 自定义事件
        trademarkInfo(trademark) {
            this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
            this.getData()
        },
        // 收集平台属性地方回调函数（自定义事件）
        attrInfo(attrs, attrValue) {
            let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`
            if (this.searchParams.props.indexOf(props) == -1) {
                this.searchParams.props.push(props)
            }
            this.getData()
        },
        // 排序操作
        changeOrder(flag) {
            //flag形参：它是一个标记，代表用户点击的是综合（1）价格（2）[用户点击的时候传递进来的]
            let originOrder = this.searchParams.order
            // 这里获取到的是最开始的状态
            let originFlag = originOrder.split(":")[0]
            let originSort = originOrder.split(":")[1]
            // 这里准备一个新的order属性值
            let newOrder = ''
            // 点击的综合
            if (flag == originFlag) {
                newOrder = `${originFlag}:${originSort == 'desc' ? 'asc' : 'desc'}`
            } else {
                // 点击的价格
                newOrder = `${flag}:${'desc'}`
            }
            this.searchParams.order = newOrder
            this.getData()
        },
        // 自定义事件
        getPageNo(pageNo) {
            this.searchParams.pageNo = pageNo
            this.getData2()
        }
    },
    // 数据监听：监听组件实例身上的属性的属性值变化
    watch: {
        // 监听路由的信息是否发生变化，如果发生变化，再次发起请求
        $route(newValue, oldValue) {
            // 再次发请求之前整理带给服务器参数
            Object.assign(this.searchParams, this.$route.query, this.$route.params)
            // 再次发起ajax请求
            this.getData()
            //每一次请求完毕，应该把相应的1、2、3级分类的id置空的，让他接受下一次的相应1、2、3id
            this.searchParams.category1Id = undefined
            this.searchParams.category2Id = undefined
            this.searchParams.category3Id = undefined
        }
    },
}
</script>

<style lang="less" scoped>
.main {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
            margin-bottom: 5px;
            overflow: hidden;

            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;

                li {
                    display: inline-block;
                    line-height: 18px;

                    a {
                        color: #666;
                        text-decoration: none;

                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }

            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;

                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }

        .details {
            margin-bottom: 5px;

            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;

                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }

                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .goods-list {
                margin: 20px 0;

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;

                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;

                                a {
                                    color: #666;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }

                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }

                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;

                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }

                            .operate {
                                padding: 12px 15px;

                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }

                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;

                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }

                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;

                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
}
</style>