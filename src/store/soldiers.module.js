import { getSoldier } from "../api";

const initialState = () => ({
  currentSoldier: null
});

const state = initialState();

const actions = {
  async getSoldier({ commit }, soldierId) {
    try {
      const result = await getSoldier(soldierId);
      if (result && result.data) {
        commit("setSoldier", result.data);
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error("Error while loading single soldier data", err);
    }
  }
};

const mutations = {
  setSoldier(state, soldier) {
    state.currentSoldier = soldier;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};

