import { addServer, getServer, getServers } from "../api";

const initialState = () => ({
  currentServer: null,
  serverList: null
});

const state = initialState();

const actions = {
  async addServer({ commit }, serverData) {
    const result = await addServer(serverData);
    if (result && result.data) {
      commit("addServer", result.data);
    }
  },
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
  addServer(state, server) {
    state.serverList.push(server);
  },

  setServers(state, servers) {
    state.serverList = servers;
  },

  setServer(state, server) {
    state.currentServer = server;
  },

  updateServer(state, server) {
    state.serverList = state.serverList.filter(existingServer => existingServer.id === server.id).push(server);
    state.currentServer = server;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};

