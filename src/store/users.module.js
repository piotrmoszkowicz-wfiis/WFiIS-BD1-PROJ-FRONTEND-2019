import { getUser, getUsers, updateUser } from "../api";

const initialState = () => ({
  currentUser: null,
  usersList: null
});

const state = initialState();

const actions = {
  async getUser({ commit }, userId) {
    try {
      const result = await getUser(userId);
      if (result && result.data) {
        commit("setUser", result.data);
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error("Error while loading single user data", err);
    }
  },
  async getUsers({ commit }) {
    try {
      const result = await getUsers();
      if (result && result.data) {
        commit("setUsers", result.data);
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error("Error while loading users data...", err);
    }
  },
  async updateUser({ commit }, { id, ...payload }) {
    const result = await updateUser(id, payload);
    if (result && result.data && result.updated) {
      commit("updateUser", { id, ...payload });
    }
  }
};

const mutations = {
  addSoldier(state, soldier) {
    state.currentUser.soldiers.push(soldier);
  },

  setUsers(state, users) {
    state.usersList = users;
  },

  setUser(state, user) {
    state.currentUser = user;
  },

  removeSoldier(state, soldierId) {
    state.currentUser.soldiers = state.currentUser.soldiers.filter(existingSoldier => existingSoldier.id !== soldierId);
  },

  updateUser(state, user) {
    state.usersList = state.usersList.filter(existingUser => existingUser.id === user.id);
    state.usersList.push(user);
    state.currentUser = user;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};

