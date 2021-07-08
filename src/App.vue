<template>
  <div id="app">
    <CurrentWeather />
    <DetailWeather />
  </div>
</template>

<script>
import CurrentWeather from "./components/CurrentWeather.vue";
import DetailWeather from "./components/DetailWeather.vue";

export default {
  name: "App",
  components: {
    CurrentWeather,
    DetailWeather,
  },
};
</script>

<style scoped lang="scss" >
#app {
  overflow: hidden;
  display: flex;
  min-height: 100vh;
  width: 100%;
  @include down(700px) {
    flex-direction: column;
  }
}
</style>
