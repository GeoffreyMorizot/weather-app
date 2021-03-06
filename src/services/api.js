import axios from "axios";

export const API = axios.create({
  baseURL: `${window.location.origin}/api`,
  method: "GET",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
