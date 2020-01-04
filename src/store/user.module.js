import jwtDecode from "jwt-decode";

import axiosWrapper from "@/api/axiosWrapper";
import { postLogin } from "../api";

const initialState = () => ({
  authToken: null,
  userData: null
});

const state = initialState();

const actions = {
  async logIn({ commit }, formData) {
    const result = await postLogin(formData.email, formData.password);

    if (result && result.data && result.data.token) {
      commit("loginSuccess", result.data);
      return true;
    }

    return false;
  },

  logOut({ commit }) {
    commit("setAuthToken", null);
    delete axiosWrapper.defaults.headers.Authorization;
  }
};

const mutations = {
  loginSuccess(state, loginData) {
    state.authToken = loginData.token;
    state.userData = jwtDecode(loginData.token);
  },

  setAuthToken(state, authToken) {
    state.authToken = authToken;
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

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

