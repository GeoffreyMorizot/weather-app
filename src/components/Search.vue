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
      actions.SET_SEARCHISOPEN(false);
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
  padding: 17px 47px 47px 47px;
  background: var(--color-blue);
  transform: translate3d(-8 0%, 0, 0);
  @include down(1024px) {
    width: 100%;
  }

  @include down(450px) {
    width: 100vw;
    height: fit-content;
    padding: 17px 24px 47px 24px;
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
  display: flex;
  flex-direction: column;
  @include gap("row", 5px);
  padding: 0;
  margin-bottom: 40px;
  margin-top: 58px;
  overflow: scroll;
  height: 100vh;
  li {
    padding: 16px 12px;

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
  @extend %flex-center-vert;
  width: 100%;
}
.input {
  flex-grow: 1;
  background: transparent;
  border: 1px solid var(--color-white);
  border-radius: 0;
  -webkit-appearance: none;
  color: var(--color-white);
  padding: 15px 0 15px 49px;
  font-size: 16px;
  &::placeholder {
    color: var(--color-grey);
    font-family: var(--font);
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
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
  flex-grow: 0.5;
  height: 51px;
  margin-left: 12px;
  border-radius: 0;
  border: 0;
  background: var(--color-purple);
  color: var(--color-white);
  cursor: pointer;
  -webkit-appearance: none;
  -webkit-border-radius: none;
}
</style>