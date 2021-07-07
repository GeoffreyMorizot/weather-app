import axios from "axios";

export const API = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api",
  method: "GET",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
