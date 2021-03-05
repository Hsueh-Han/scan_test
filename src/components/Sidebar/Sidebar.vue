<template>
<!-- 引用 side-bar 的外層標籤請給予 position-relative 屬性 -->
  <div class="bg-dark sidebar-slide" style="width: 100px;" @click="sideBarToggle"
    :class="{'sidebar-slide-hide': !isSlide, 'sidebar-slide-show': isSlide}">
    <!-- outside-area 是提供外部區塊給sidebar，當點擊外部區域時可以關閉 sidebar 的功能 -->
    <div class="outside-area h-100 position-absolute" @click="isSlide = false" v-if="isSlide"
    style="right: 0;  transform: translateX(100%); width: calc(100vw - 100px);"></div>

    <button class="btn btn-sm bg-white my-2 position-absolute border rounded-right d-lg-none"
    style="right: 0; top: 52px; transform: translateX(100%); border-radius: 0;">
      <span v-if="!isSlide"><i class="fas fa-chevron-right"></i></span>
      <span v-if="isSlide"><i class="fas fa-chevron-left"></i></span>
    </button>
    <div class="side-control">
      <div class="logo text-center" style="padding-top: 13px;">
        <router-link to="/">
          <img src="../../assets/logo-white.svg" alt="">
        </router-link>
      </div>
      <div class="px-3 pt-4">
        <a class="text-white d-block text-center text-decoration-none px-2" href="#">
          <span class="h3 d-block mb-0"><i class="far fa-user"></i></span>
          <small>Guest</small>
          <hr class="border-secondary">
        </a>

        <router-link class="d-block text-center text-decoration-none px-2 mb-3"
        :class="{
        'text-white': $route.path === '/history',
        'text-secondary': $route.path !== '/history',
        }"
        to="/history">
          <span class="h3 d-block mb-0"><i class="el-icon-date"></i></span>
          <small>{{$t(`__history`)}}</small>
        </router-link>

        <router-link class="d-block text-center text-decoration-none px-2 mb-3"
        :class="{
        'text-white': $route.path === '/immediate',
        'text-secondary': $route.path !== '/immediate',
        }"
        to="/immediate">
          <span class="h3 d-block mb-0"><i class="el-icon-watch"></i></span>
          <small>{{$t(`__immediate`)}}</small>
        </router-link>

        <router-link class="d-block text-center text-decoration-none px-2 mb-3"
        :class="{
        'text-white': $route.path === '/flow',
        'text-secondary': $route.path !== '/flow',
        }"
        to="/flow">
          <span class="h3 d-block mb-0"><i class="el-icon-position"></i></span>
          <small>{{$t(`__flow`)}}</small>
        </router-link>

        <router-link class="d-block text-center text-decoration-none px-2 mb-3"
        :class="{
        'text-white': $route.path === '/position',
        'text-secondary': $route.path !== '/position',
        }"
        to="/position">
          <span class="h3 d-block mb-0"><i class="el-icon-location-outline"></i></span>
          <small>{{$t(`__position`)}}</small>
        </router-link>

        <router-link class="text-secondary d-block text-center text-decoration-none px-2 mb-3"
        to="/login">
          <span class="h3 d-block mb-0"><i class="fas fa-sign-out-alt"></i></span>
          <small>{{$t(`__logout`)}}</small>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSlide: false,
    };
  },
  methods: {
    sideBarToggle(event) {
      const key = event.path.some((item) => item.nodeName === 'A' || item.nodeName === 'BUTTON');
      if (key) {
        this.isSlide = !this.isSlide;
      }
    },
  },
};
</script>

<style lang="scss">
.logo{
  background: #8dc220;
  height: 60px;
}
.sidebar-slide{
  height: 100%;
  z-index: 1250;
}
.sidebar-slide-hide{
  position: fixed;
  left: -100px;
  transition: 0.3s all ease;
}
.sidebar-slide-show{
  position: fixed;
  left: 0px;
  transition: 0.3s all ease;
}
.outside-area{
    display: block;
  }
@media (min-width: 992px) {
  .sidebar-slide{
    height: auto;
    position: initial;
  }
  .outside-area{
    display: none;
  }
  .side-control{
    position: sticky;
    top: 0;
  }
  .d-lg-none{
    display: none;
  }
}
</style>
