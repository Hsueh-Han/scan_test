<template>
  <div class="row">
    <Searchbar/>
    <div class="col-12 pt-3 pb-5"
    style="background-color: #F6F6F6F6; min-height: calc(100vh - 123px);">
      <WisideLocation/>
    </div>
  </div>
</template>

<script>
import Searchbar from '../components/SearchBar/SearchBar.vue';
import WisideLocation from '../components/TaiwanList/WisideLocation.vue';

export default {
  components: {
    Searchbar,
    WisideLocation,
  },
};
</script>
