<template>
  <div class="hightlight">
    <h4 class="card-title">{{ title }}</h4>
    <p class="hl-value">
      {{ value }}
      <span class="hl-unity">{{ unity }}</span>
    </p>
    <div v-if="wind" class="hightlight__wind">
      <div class="direction__arrow" :style="cssVars"></div>
      <span class="direction">{{ windDirection }}</span>
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
    PercentageBar,
  },
  props: [
    "title",
    "value",
    "unity",
    "wind",
    "humidity",
    "windDirection",
    "windDirectionDegrees",
  ],
  computed: {
    cssVars() {
      return {
        "--degrees": `${this.windDirectionDegrees - 180}deg`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.hightlight {
  height: fit-content;
  padding: 22px 49px 30px 49px;
  text-align: center;

  background: var(--color-blue);
  color: var(--color-white);

  @include down(365px) {
    padding: 24px 32px;
  }

  h4 {
    margin: 0 0 6px 0;
  }
}

.hightlight__wind {
  @extend %flex-center;
  margin-top: 24px;
}
.direction__arrow {
  margin-right: 6px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: url(../assets/images/ArrowWind.svg) center no-repeat,
    var(--color-grey);
  animation: smoothRotate 0.7s ease-out 0.1s forwards;
}
.direction {
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1rem;
}
@keyframes smoothRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(var(--degrees));
  }
}
</style>