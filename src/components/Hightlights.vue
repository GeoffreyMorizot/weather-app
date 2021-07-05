<template>
  <div class="hightlight">
    <h4>{{title}}</h4>
    <p class="hightlight__value">
      {{value}}
      <span>{{unity}}</span>
    </p>
    <div v-if="wind" class="hightlight__wind">
      <div class="direction"></div>
      <span>{{windDirection}}</span>
    </div>
    <div v-if="humidity">
      <PercentageBar :percentage="value.toString()" />
    </div>
  </div>
</template>

<script>
import PercentageBar from "../components/PercentageBar";
export default {
  components: {
    PercentageBar
  },
  props: ["title", "value", "unity", "wind", "humidity", "windDirection"],
};
</script>

<style scoped lang="scss">
.hightlight {
  height: fit-content;
  padding: 22px 49px 30px 49px;
  text-align: center;

  background: var(--color-blue);
  color: var(--color-white);

  h4 {
    margin: 0 0 6px 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  }
}

.hightlight__value {
  font-weight: 700;
  font-size: 64px;
  line-height: 75px;
  span {
    font-weight: 400;
    font-size: 36px;
    line-height: 43px;
  }
}
.hightlight__wind {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
}
.direction {
  margin-right: 6px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: url(../assets/images/ArrowWind.svg) center no-repeat,
    var(--color-grey);
}
</style>