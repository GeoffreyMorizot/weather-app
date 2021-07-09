/* eslint-disable no-debugger */
import Vue from "vue";
import AppServices from "./services/AppServices";

const store = Vue.observable({
  cities: [],
  currentWeather: [],
  position: { latitude: null, longitude: null },
  scale: "C",
  isLoading: true,
  error: null,
  searchIsOpen: false,
});

export const getters = {
  get cities() {
    return store.cities;
  },
  get currentWeather() {
    return store.currentWeather;
  },
  get position() {
    return store.position;
  },
  get scale() {
    return store.scale;
  },
  get isLoading() {
    return store.isLoading;
  },
  get error() {
    return store.error;
  },
  get searchIsOpen() {
    return store.searchIsOpen;
  },
};

export const mutations = {
  SET_CITIES(value) {
    store.cities = value;
  },
  SET_CURRENT_WEATHER(value) {
    store.currentWeather = value;
  },
  UPDATE_POSITION(latt, long) {
    store.position.latitude = latt;
    store.position.longitude = long;
  },
  UPDATE_SCALE(scale) {
    store.scale = scale;
  },
  UPDATE_IS_LOADING(boolean) {
    store.isLoading = boolean;
  },
  SET_ERROR(value) {
    store.error = value;
  },
  SET_SEARCHISOPEN(boolean) {
    store.searchIsOpen = boolean;
  },
};

export const actions = {
  FETCH_CITY(params) {
    mutations.UPDATE_IS_LOADING(true);
    return AppServices.getCity(params)
      .then((response) => {
        mutations.UPDATE_IS_LOADING(false);
        mutations.SET_ERROR(null);
        mutations.SET_CITIES(response.data);
      })
      .catch(function(error) {
        mutations.SET_ERROR(`${error}`);
        mutations.UPDATE_IS_LOADING(false);
        console.error(error);
      });
  },
  FETCH_CITY_COORD(latt, long) {
    mutations.UPDATE_IS_LOADING(true);
    return AppServices.getCityByCoord(latt, long)
      .then((response) => {
        mutations.UPDATE_IS_LOADING(false);
        mutations.SET_ERROR(null);
        mutations.SET_CITIES(response.data);
        this.FETCH_WEATHER(getters.cities[0].woeid); //Fetch la ville la plus prêt
      })
      .catch(function(error) {
        mutations.UPDATE_IS_LOADING(false);
        mutations.SET_ERROR(`${error}`);
      });
  },
  FETCH_WEATHER(id) {
    mutations.UPDATE_IS_LOADING(true);
    return AppServices.getCurrentWeather(id)
      .then((response) => {
        mutations.UPDATE_IS_LOADING(false);
        mutations.SET_ERROR(null);
        mutations.SET_CURRENT_WEATHER(response.data);
      })
      .catch(function(error) {
        mutations.UPDATE_IS_LOADING(false);
        mutations.SET_ERROR(`${error}`);
        console.error(error);
      });
  },
  SET_SCALE(scale) {
    mutations.UPDATE_SCALE(scale);
  },
  SET_POSITION(latt, long) {
    mutations.UPDATE_POSITION(latt, long);
  },
  SET_ERROR(msg) {
    mutations.UPDATE_IS_LOADING(false);
    mutations.SET_ERROR(msg);
  },

  SET_SEARCHISOPEN(boolean) {
    mutations.SET_SEARCHISOPEN(boolean);
  },
};

global.store = store;

export default store;
