<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <!-- 事件的委派 -->
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <!--  -->
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                                :class="{ cur: index === currentIndex }">
                                <!-- curr = current 当前的 -->
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                            c1.categoryName
                                    }}</a>
                                    <!-- <router-link to="/search">{{c1.categoryName}}</router-link> 会导致延迟 -->
                                </h3>
                                <!-- 二级、三级分类 -->
                                <div class="item-list clearfix"
                                    :style="{ display: currentIndex == index ? 'block' : 'none' }">
                                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                            </dt>
                                            <dd v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <em>
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
// 完全引入lodash   最好按需加载
//按需引入：只是引入节流函数，其他的函数没有引入（模块），这样做的好处是，当你打包项目的时候体积会小
import throttle from "lodash/throttle";

export default {
    name: "TypeNav",
    data() {
        return {
            // 储存用户鼠标移上哪一个一级分类
            currentIndex: -1,
            show: true,
        };
    },
    // 组件挂载完毕：可以向服务器发请求
    mounted() {
        // 通过vuex发请求，获取数据，储存于仓库中
        // 在这里发请求 会导致组件诞生销毁时会重复发请求 放在App组件上只派发一次

        // console.log("这里是TypeNav 挂载完毕！");
        // 当组件挂载完毕，让show属性变为false
        if (this.$route.path != "/home") {
            this.show = false;
        }
    },
    computed: {
        ...mapState({
            //右侧面要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            //注入一个参数state，其实即为大仓库中的数据
            categoryList: (state) => state.home.categoryList,
        }),
    },
    methods: {
        // 鼠标进入修改响应式数据currentIndex属性
        // 配备防抖函数
        // throttle回调函数别用箭头函数，可能出现上下文this
        changeIndex: throttle(function (index) {
            //index:鼠标移上某一个一级分类的元素的索引值
            //正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
            // 非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
            //就是由于用户行为过快，导致浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能出现卡顿现象。
            this.currentIndex = index;
        }, 50),
        // 一级分类鼠标移除
        leaveIndex() {
            this.currentIndex = -1;
            if (this.$route.path != "/home") {
                this.show = false;
            }
        },
        // 一级分类鼠标进入显示边栏
        enterShow() {
            this.show = true;
        },
        // 进行路由跳转的方法
        goSearch(event) {
            // 最好的解决方法：编程式导航 + 事件委派
            // 利用事件的委派存在一定问题： 1.点击的一定是a便签 2.如何获取参数[1、2、3级分类的产品名称、Id]
            //点击a标签的时候，才会进行路由跳转【怎么能确定点击的一定是a标签】
            //存在另外一个问题：即使你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签。

            //第一个问题:把子节点当中a标签，我加上自定义属性data-categoryName，其余的子节点是没有的
            let element = event.target;
            //获取到当前出发这个事件的节点【h3、a、dt、dl】，需要带有data-categoryname这样节点【一定是a标签】
            //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
            let { categoryname, category1id, category2id, category3id } =
                element.dataset;
            //如果标签身上拥有categoryname一定是a标签
            if (categoryname) {
                // 整理路由跳转的参数
                let location = { name: "search" };
                let query = { categoryName: categoryname };
                // 一级分类、二级分类、三级分类的a标签
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else {
                    query.category3Id = category3id;
                }
                if (this.$route.params) {
                    location.params = this.$route.params;
                    // 整理完参数
                    location.query = query;
                    // 路由跳转
                    this.$router.push(location);
                }
            }
        },
    },
};
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {

                    a {
                        cursor: pointer;
                    }

                    h3 {
                        line-height: 27px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;
                        cursor: pointer;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        // display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    // width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    /* &:hover {
                        .item-list {
                            display: block;
                        }
                    } */
                }

                .cur {
                    background: rgb(236, 120, 120);
                }
            }
        }

        // 进入过渡动画的样式
        .sort-enter {
            height: 0px;
            opacity: 0;
        }

        //
        .sort-enter-to {
            height: 461px;
            opacity: 1;
        }

        //
        .sort-enter-active {
            transition: 0.3s;
            overflow: hidden;
        }

        // 离开过渡动画的样式
        .sort-leave {
            opacity: 1;
        }

        //
        .sort-leave-to {
            height: 0px;
            opacity: 0;
        }

        //
        .sort-leave-active {
            // transition: 0.5s linear;
            overflow: hidden;
        }
    }
}
</style>
