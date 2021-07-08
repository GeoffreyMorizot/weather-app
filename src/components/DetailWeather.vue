<template>
  <section class="detail">
    <transition name="fade">
      <div v-if="!isLoading && getError === null">
        <!-- TOP BUTTON -->
        <div class="detail__btn-unity">
          <button
            ref="buttonC"
            @click="setScale('C')"
            class="btn--circle active"
          >
            °C
          </button>
          <button ref="buttonF" @click="setScale('F')" class="btn--circle">
            °F
          </button>
        </div>

        <!-- FIVE DAY FORECAST -->
        <div class="detail__forecast">
          <Forecast
            v-for="data in getWeather.consolidated_weather"
            :key="data.id"
            :date="data.applicable_date"
            :temp-max="data.max_temp"
            :temp-min="data.min_temp"
            :icon="data.weather_state_name"
          />
        </div>
        <!-- CURRENT WEATHER DETAIL -->
        <section class="hightlights">
          <h3 class="hightlights__title">Today’s Hightlights</h3>
          <div v-if="getWeather !== undefined" class="hightlights__wrapper">
            <Hightlights
              wind="true"
              title="Wind status"
              :value="getWeather.consolidated_weather[0].wind_speed | round"
              :wind-direction-degrees="
                getWeather.consolidated_weather[0].wind_direction
              "
              :wind-direction="
                getWeather.consolidated_weather[0].wind_direction_compass
              "
              unity="mph"
            />
            <Hightlights
              title="Humidity"
              :value="getWeather.consolidated_weather[0].humidity"
              unity="%"
              humidity="true"
            />
            <Hightlights
              title="Visibility"
              :value="getWeather.consolidated_weather[0].visibility | decimal"
              unity="miles"
            />
            <Hightlights
              title="Air pressure"
              :value="getWeather.consolidated_weather[0].air_pressure | round"
              unity="mb"
            />
          </div>
        </section>
      </div>
    </transition>
  </section>
</template>

<script>
import { getters, actions } from "../store";
import { filtersMixins } from "../mixins/filtersMixins.js";
import Forecast from "../components/Forecast.vue";
import Hightlights from "../components/Hightlights.vue";
export default {
  components: {
    Forecast,
    Hightlights,
  },
  mixins: [filtersMixins],
  methods: {
    setScale(scale) {
      this.toggleActive(event);
      actions.SET_SCALE(scale);
    },

    toggleActive(e) {
      e.target.classList.add("active");
      if (
        e.target.nextElementSibling === null &&
        e.target.previousElementSibling
      ) {
        e.target.previousElementSibling.classList.remove("active");
      } else {
        e.target.nextElementSibling.classList.remove("active");
      }
    },
  },
  computed: {
    getWeather() {
      return getters.currentWeather;
    },
    isLoading() {
      return getters.isLoading;
    },

    getScale() {
      return getters.scale;
    },
    getError() {
      return getters.error;
    },
  },
};
</script>

<style scoped lang="scss">
.detail {
  width: 100%;
  min-height: 100vh;
  padding: 42px 123px 154px 154px;
  background: var(--color-dark);
  @include down(1040px) {
    padding: 42px 64px;
  }
  @include down(550px) {
    padding: 42px 24px;
  }
  @include down(340px) {
    .hightlights__wrapper {
      display: flex;
      flex-direction: column;
    }
  }
}
.detail__btn-unity {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  @include gap("col", 12px);

  button {
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    z-index: 100;

    &.active {
      background: var(--color-white);
      color: var(--color-grey);
    }
    &:hover {
      background: var(--color-white);
      color: var(--color-grey);
    }
  }
}

.detail__forecast {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
  gap: 26px;
  margin-top: 66px;
}
.hightlights {
  margin-top: 72px;
}
.hightlights__title {
  margin: 0 0 32px 0;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: var(--color-white);
}
.hightlights__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 48px;
}

//  ANIMATION ENTRÉE
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>