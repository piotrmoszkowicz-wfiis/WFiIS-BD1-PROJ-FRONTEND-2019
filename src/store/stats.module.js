import { getStats } from "../api";

const initialState = () => ({
  stats: null
});

const state = initialState();

const actions = {
  async getStats({ commit }) {
    const result = await getStats();

    if (result && result.data) {
      commit("setStats", result.data);
    }
  }
};

const mutations = {
  setStats(state, stats) {
    state.stats = stats;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};

