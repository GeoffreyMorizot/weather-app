import { API } from "@/services/api";

export default {
  getCity(params) {
    return API.get(`/location/search/?query=${params}`);
  },
  getCityByCoord(latt, long) {
    return API.get(`/location/search/?lattlong=${latt},${long}`);
  },
  getCurrentWeather(id) {
    return API.get(`/location/${id}`);
  },
};
