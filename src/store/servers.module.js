import { getServer, getServers } from "../api";

const initialState = () => ({
  currentServer: null,
  serverList: null
});

const state = initialState();

const actions = {
  async getServer({ commit }, serverId) {
    try {
      const result = await getServer(serverId);
      if (result && result.data) {
        commit("setServer", result.data);
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error("Error while loading single server data", err);
    }
  },
  async getServers({ commit }) {
    try {
      const result = await getServers();
      if (result && result.data) {
        commit("setServers", result.data);
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error("Error while loading servers data...", err);
    }
  }
};

const mutations = {
  setServers(state, servers) {
    state.serverList = servers;
  },

  setUser(state, server) {
    state.currentServer = server;
  },

  updateServer(state, server) {
    state.serverList = state.serverList.filter(existingServer => existingServer.id === server.id).push(server);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};

