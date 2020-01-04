import axios from "axios";

const options = {
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
};

import app from "@/main";

const axiosWrapper = axios.create(options);

axiosWrapper.interceptors.request.use(config => {
  config.headers.Authorization = app.$store.getters["user/getAuthToken"];
  return config;
});

axiosWrapper.interceptors.response.use(
  response => response,
  error => {
    /* eslint-disable no-console */
    console.error("Error during request", error);

    if (error.response.status === 401) {
      delete axiosWrapper.defaults.headers.Authorization;
      app.$store.dispatch("user/logOut");
      app.$router.replace("/");
    }

    return false;
  }
);

export default axiosWrapper;
