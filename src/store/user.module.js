import jwtDecode from "jwt-decode";

import axiosWrapper from "@/api/axiosWrapper";
import router from "@/Routes";

const initialState = () => ({
  authToken: null,
  userData: null
});

const state = initialState();

const actions = {
  login({ dispatch, commit }, formData) {

  }
};

const mutations = {
  loginSuccess(state, loginData) {
    state.authToken = loginData.token;
    state.userData = jwtDecode(loginData.token);
  }
};

const getters = {
  getAuthToken(state) {
    return state.authToken;
  },

  getUserData(state) {
    return state.userData;
  }
};

export const user = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

