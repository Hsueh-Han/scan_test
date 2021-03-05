<template>
  <div class="container-fluid">
    <div class="row">
      <Sidebar/>
      <div class="main-area">
        <router-view></router-view>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar/Sidebar.vue';
import Footer from '../components/Footer/Footer.vue';

export default {
  components: {
    Sidebar,
    Footer,
  },
};
</script>

<style lang="scss">
.main-area{
    width: 100%;
    padding: 0 15px;
  }
@media (min-width: 992px) {
  .main-area{
    width: calc(100% - 100px);
  }
}
</style>
