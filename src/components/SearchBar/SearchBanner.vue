<template>
  <div class="row banner-bg">
    <div class="pt-3 px-5">
      <small class="text-white">{{ title }}</small>
      <br>
      <small class="text-white">{{dateComputed}}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: ['searchValue', 'pickDate1', 'pickDate2'],
  data() {
    return {
      title: this.searchValue,
      date1: this.pickDate1,
      date2: this.pickDate2,
    };
  },
  computed: {
    dateComputed() {
      const yy = this.date1.getFullYear();
      const mm = this.date1.getMonth() + 1;
      const dd = this.date1.getDate();
      const yy2 = this.date2.getFullYear();
      const mm2 = this.date2.getMonth() + 1;
      const dd2 = this.date2.getDate();
      return `${yy}-${mm}-${dd} ~ ${yy2}-${mm2}-${dd2}`;
    },
  },
};
</script>

<style lang="scss">
.banner-bg{
  background-color: #31496e;
  height: 132px;
}
</style>
