<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style lang="scss">
@import "./assets/all.scss";
#app {
  font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
}
</style>
