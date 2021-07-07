<template>
  <div ref="search" class="search">
    <button @click="closeSearch" class="search__close"></button>
    <div class="input__wrapper">
      <img
        class="input__icon"
        src="../assets/images/Search-icon.svg"
        alt
        srcset
      />
      <input
        ref="input"
        class="input"
        type="search"
        id="search"
        name="search"
        placeholder="Search location"
      />
      <input @click="searchCity" class="input__submit" type="submit" />
    </div>
    <div>
      <ul class="search__response" v-if="!getData.length == 0">
        <li
          :data-id="city.woeid"
          @click="getCityID"
          v-for="city in getData"
          :key="city.woeid"
        >
          {{ city.title }}
        </li>
      </ul>
      <div class="search__no-result" v-if="getData.length === 0">No result</div>
    </div>
  </div>
</template>

<script>
import store, { actions } from "../store";
export default {
  computed: {
    getData() {
      return store.cities;
    },
  },
  data() {
    return {
      value: "",
      cityID: null,
    };
  },
  methods: {
    searchCity() {
      this.value = this.$refs.input.value;
      actions.FETCH_CITY(this.value);
    },
    getCityID(e) {
      this.cityID = e.target.getAttribute("data-id");
      this.getWeather(this.cityID);
      this.closeSearch();
    },
    getWeather(id) {
      actions.FETCH_WEATHER(id);
    },
    closeSearch() {
      this.$refs.search.classList.remove("open");
    },
  },
};
</script>

<style scoped lang="scss">
.search {
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 459px;
  min-height: 100vh;
  height: 100%;
  padding: 17px 47px 47px 47px;
  background: var(--color-blue);
  transform: translate3d(-8 0%, 0, 0);
  @include down(450px) {
    width: 100vw;
    height: fit-content;
  }
}

.search__close {
  display: block;
  float: right;
  padding: 2px;
  background: url(../assets/images/Close-icon.svg) no-repeat center, transparent;
  height: 18px;
  width: 18px;
  margin-bottom: 45px;
  box-shadow: none;
}

.search__response {
  overflow: scroll;
  height: 100vh;
  margin-top: 58px;
  padding: 0;
  li {
    box-sizing: border-box;
    padding: 22px 12px;
    list-style: none;
    color: var(--color-white);
    border: 1px solid var(--color-dark);
    transition: border 0.3s ease-in;
    &:hover {
      border: 1px solid var(--color-grey);
      cursor: pointer;
    }
  }
}
.search__no-result {
  padding: 16px;
  margin: 40px 0;
  text-align: center;
  background: var(--color-grey);
  color: var(--color-white);
}

.input__wrapper {
  position: relative;
  display: flex;
  width: 100%;
}
.input {
  width: 268px;
  background: transparent;
  border: 1px solid var(--color-white);
  border-radius: none;

  color: var(--color-white);

  padding: 15px 0 15px 49px;
  &::placeholder {
    color: var(--color-grey);
    font-family: var(--font);
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  }
}
.input__icon {
  position: absolute;
  width: 23px;
  height: auto;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  svg path {
    fill: #000;
  }
}
.input__submit {
  flex-grow: 1;
  border-radius: none;
  height: 48px;
  margin-left: 12px;
}
</style>