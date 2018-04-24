<template>
  <div class="homeContainer">
      <my-header></my-header>
      <div class="routerDiv">
          <router-view></router-view>
      </div>
      <!-- <my-footer></my-footer> -->
  </div>
</template>

<script>
    import myHeader from '@/components/header/header.vue'
//import myFooter from '@/components/footer/footer.vue'
    export default {
        components: {
            myHeader, //引入头部组件
            //breakCrumb, //引入面包屑组件
            //myFooter,
        },
        data () {
            return {
                hash: ''
            }
        },
        methods: {
            aaa(hash) {
                this.hash = hash
            }
        }
    }
</script>

<style lang="scss" scoped>
    .homeContainer { //当前模块最外层容器
        height: 100%;
        width: 100%;
        position: absolute;
        .routerDiv { //router容器
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            padding: 70px 20px 20px 20px;
        }
    }
</style>

