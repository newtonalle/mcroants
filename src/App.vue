<template>
  <div class="text-center bg-dark text-light liquid-container">
    <page-header />
    <router-view></router-view>
  </div>
</template>

<script>
import PageHeader from "./layout/PageHeader.vue";

export default {
  components: { PageHeader },

  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
