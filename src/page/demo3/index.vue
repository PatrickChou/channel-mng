<template>
  <div class="slider-demo">
    <transition name="transform">
      <div v-show="isShow" class="slider-wrap" >
      </div>
    </transition>
    <button @click="actionTransform">点击我</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    actionTransform () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider-wrap {
    width: 400px;
    height: 100vh;
    background: red;
    position: absolute;
    transition: all 500ms linear;
    right: 0;
  }

  .transform-enter-active, .transform-leave{
    opacity: 1;
    right: 0;
  }

  .transform-enter, .transform-leave-active{
    opacity: 0;
    right: -400px;
  }
</style>


