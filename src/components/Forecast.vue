<template>
  <div class="forecast">
    <p class="forecast__day">{{ date | day }}</p>
    <div class="forecast__img">
      <img :src="getIcons" alt="" srcset="" />
    </div>
    <div class="forecast__min-max">
      <p>
        {{ tempMax | scale(getScale) | round }}
        <span v-if="getScale === 'C'">°C</span>
        <span v-if="getScale === 'F'">°F</span>
      </p>
      <p class="min">
        {{ tempMin | scale(getScale) | round }}
        <span v-if="getScale === 'C'">°C</span>
        <span v-if="getScale === 'F'">°F</span>
      </p>
    </div>
  </div>
</template>

<script>
import { getters } from "../store.js";
import { filtersMixins } from "../mixins/filtersMixins";

export default {
  props: {
    icon: String,
    tempMax: Number,
    tempMin: Number,
    date: String,
  },
  mixins: [filtersMixins],
  filters: {
    day: function (value) {
      if (!value) return "";

      const currentDay = new Date().toISOString().split("T")[0]; // retourne le jour actuel dans le même format que l'api
      if (value === currentDay) {
        value = "Tomorrow";
        return value;
      }
      value = new Date(value).toLocaleString("en-us", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      return value;
    },
  },
  computed: {
    getScale() {
      return getters.scale;
    },
    getIcons() {
      return require(`@/assets/images/${this.icon}.png`);
    },
  },
};
</script>

<style scoped lang="scss">
.forecast {
  @extend %flex-column;
  justify-content: space-between;
  padding: 18px;
  text-align: center;

  min-height: 217px;

  background: var(--color-blue);
  color: var(--color-white);

  @include down(365px) {
    padding: 35px;
  }
}
.forecast__img {
  position: relative;
  padding: 0 10px;
  width: 100%;
  img {
    width: 100%;
  }
}
.forecast__min-max {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  .min {
    color: var(--color-grey);
  }
  & p > span {
    margin-left: -3px; //stick the unit to the temperature
  }
}
</style>