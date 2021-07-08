
<template>
  <aside class="current">
    <Search ref="search" class="search-wrapper" />
    <!-- TOP BUTTON -->
    <div class="current__btn">
      <button class="btn" @click="toggleSearchBar">Search for places</button>
      <button
        @click="targetLocation"
        class="current__target btn--circle"
      ></button>
    </div>
    <!-- LOADING -->
    <div class="current__loading" v-if="isLoading">
      <img src="../assets/images/loader.svg" alt />
    </div>
    <!-- ERROR -->
    <div
      v-if="getError !== null && getError !== 0 && isOpen === false"
      class="current__error"
    >
      <Error :error="getError" />
    </div>
    <!-- WEATHER -->
    <transition name="fade">
      <div v-if="!isLoading && getError === null">
        <div class="current__icon">
          <img :src="getIcons" alt srcset />
        </div>
        <div class="current__temp">
          <p v-if="getWeather.consolidated_weather !== undefined" class="temp">
            {{
              getWeather.consolidated_weather[0].the_temp
                | scale(getScale)
                | round
            }}
            <span v-if="getScale === 'C'" class="temp__unity">°C</span>
            <span v-if="getScale === 'F'" class="temp__unity">°F</span>
          </p>
        </div>
        <div class="current__weather__state">
          <p v-if="getWeather.consolidated_weather !== undefined">
            {{ getWeather.consolidated_weather[0].weather_state_name }}
          </p>
        </div>
        <div class="current__date">
          <p>Today . {{ date }}</p>
        </div>
        <div class="current__location">
          <img src="../assets/images/LocationIcon.svg" alt srcset />
          <p>{{ getWeather.title }}</p>
        </div>
      </div>
    </transition>
  </aside>
</template>

<script>
import { filtersMixins } from "../mixins/filtersMixins.js";
import { getters, actions } from "../store";
import Search from "../components/Search.vue";
import Error from "../components/Error.vue";

export default {
  name: "CurrentWeather",
  components: {
    Search,
    Error,
  },
  mixins: [filtersMixins],
  data() {
    return {
      date: new Date().toLocaleString("en-us", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      position: { latitude: null, longitude: null },
    };
  },
  methods: {
    toggleSearchBar() {
      actions.SET_SEARCHISOPEN(true);
      this.$refs.search.$el.classList.toggle("open");
    },
    initWeather(latt, long) {
      actions.FETCH_CITY_COORD(latt, long);
    },
    targetLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.position = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          actions.SET_POSITION(this.position.latitude, this.position.longitude);
          this.initWeather(this.position.latitude, this.position.longitude); // envoie au store
          return this.position;
        }, error);
      }

      function error(error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            actions.SET_ERROR("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            actions.SET_ERROR("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            actions.SET_ERROR("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            actions.SET_ERROR("An unknown error occurred.");
        }
      }
    },
  },
  mounted() {
    this.targetLocation();
  },
  computed: {
    getWeather() {
      return getters.currentWeather;
    },
    getScale() {
      return getters.scale;
    },
    isLoading() {
      return getters.isLoading;
    },
    getIcons() {
      return require(`@/assets/images/${this.getWeather.consolidated_weather[0].weather_state_name}.png`);
    },
    getError() {
      return getters.error;
    },
    isOpen() {
      return getters.searchIsOpen;
    },
  },
};
</script>

<style scoped lang="scss">
.current {
  position: relative;
  min-width: 459px;
  min-height: 100vh;
  padding: 42px 46px 52px 46px;
  color: var(--color-grey);
  background: var(--color-blue);
  @include down(1024px) {
    min-width: 350px;
  }
  @include down(500px) {
    padding: 18px 12px 105px 12px;
    min-width: 100vw;
  }

  @include down(450px) {
    .current__error {
      left: 24px;
      right: 24px;
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    margin-top: 100px;
    background: url(../assets/images/Cloud-background.png) no-repeat top;
  }
}
.current__loading {
  @extend %flex-center;
  width: 100%;
  height: 100%;
  background: transparent;
  font-size: 20px;
  color: var(--color-white);
}
.current__error {
  position: absolute;
  top: 50%;
  left: 46px;
  right: 46px;
  z-index: 1000;
  text-align: center;
}
.current__btn {
  display: flex;
  justify-content: space-between;
}
.current__target {
  background: url(../assets/images/Target-icon.svg) center no-repeat,
    var(--color-grey);
}
.current__icon {
  position: relative;
  @extend %flex-center-horiz;
  margin-top: 109px;
  width: 100%;
  height: auto;
}
.current__temp {
  position: relative;
  @extend %flex-center-horiz;
  width: 100%;
  margin-top: 87px;
}
.temp {
  margin: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 144px;
  line-height: 169px;
  color: var(--color-white);
  & .temp__unity {
    margin-left: -35px;
    font-weight: 400;
    font-size: 48px;
    color: var(--color-grey);
  }
}
.current__weather__state {
  margin-top: 52px;
  text-align: center;
  font-weight: 600;
  font-size: 36px;
  line-height: 42px;

  text-transform: capitalize;
}
.current__date {
  position: relative;
  margin-top: 87px;
  @extend %flex-center-horiz;
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
}
.current__location {
  @extend %flex-center-horiz;
  margin-top: 32px;
  width: 100%;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  img {
    margin-right: 9px;
  }
}
.search-wrapper {
  transform: translateX(-100%);
  transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  &.open {
    transform: translateX(0%);
  }
}

//  ANIMATION ENTRÉE
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
