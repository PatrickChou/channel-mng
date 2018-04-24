<template>
    <div class="headerContainer">
        <section class="headerLogo left">
            <img src="../../images/keduoshou@2x.png" />
        </section>
        <section class="headerBanner left">
            <i-menu mode="horizontal" :theme="themeHeader" @on-select="changePath">
                <div v-for="(e, i) in bannerLists" :key="i" class="left">
                    <menu-item :name="e.hash" v-if="!e.menuNode">
                        <Icon type="ios-paper"></Icon>
                        {{e.name}}
                    </menu-item>
                    <submenu :name="1" v-else>
                        <template slot="title">
                            <icon type="stats-bars"></icon>
                            {{e.name}}
                        </template>
                        <menu-item :name="n.hash" v-for="(n, m) in e.menuNode" :key="m">
                            <Icon type="ios-paper"></Icon>
                            {{n.name}}
                        </menu-item>
                    </submenu>
                </div>
            </i-menu>
        </section>
        <section class="headerUser right">
            <p class="left">欢迎您 : <span> 北京操作员</span></p>
            <div class="signOut right">
                <i-button type="primary" @click="back">退出</i-button>
            </div>
        </section>
    </div>
</template>


<script>
    export default {
        data(){
                return {
                    themeHeader: 'dark', //下拉菜单的主题
                    bannerLists: [ //菜单的名称与路由
                        {
                            name: '首页', 
                            hash: '/home'  
                        }, 
                        {
                            name: '详情页', 
                            menuNode: [
                                {name: 'demo2',hash: '/home/demo2'}
                            ]
                        }
                    ]
            }
        },
        methods: { 
            changePath (hash) { //切换页面
                this.$router.push(hash)
                this.$Loading.finish()
                this.$emit('aaa', hash)
            },
            back(){
                this.$Message.success('退出成功!');
                this.$router.push('/login')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .headerContainer {
        height: 60px;
        background: #495060;
        z-index: 10;
        position: absolute;
        width: 100%;
        .headerLogo {
            width: 160px;
            height: 100%;
            padding: 15px;
            background: #3b77e3;
            img {
                width: 100%;
            }
        }
       .headerBanner {

       }
       .headerUser {
           height: 100%;
           width: 200px;
           p {
               color: #fff;
               line-height: 60px;
           }
           .signOut {
               width: 80px;
               height: 100%;
               button {
                    height: inherit;
                    width: 100%;
                    letter-spacing: 5px;
                    text-indent: 5px;
               }
           }
       }
    }
</style>


