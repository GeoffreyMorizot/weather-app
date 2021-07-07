import { API } from "@/services/api";

export default {
  getCity(params) {
    return API.get(`/location?params=${params}`);
  },
  getCityByCoord(latt, long) {
    return API.get(`/locationByCoord?latitude=${latt}&longitude=${long}`);
  },
  getCurrentWeather(id) {
    return API.get(`/weather?id=${id}`);
  },
};
