import { getItem, getItems } from "../api";

const initialState = () => ({
  currentItem: null,
  itemsList: null
});

const state = initialState();

const actions = {
  async getItem({ commit }, itemId) {
    try {
      const result = await getItem(itemId);
      if (result && result.data) {
        commit("setItem", result.data);
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error("Error while loading single item data", err);
    }
  },
  async getItems({ commit }) {
    try {
      const result = await getItems();
      if (result && result.data) {
        commit("setItems", result.data);
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error("Error while loading items data...", err);
    }
  }
};

const mutations = {
  setItems(state, items) {
    state.itemsList = items;
  },

  setItem(state, item) {
    state.currentItem = item;
  },

  updateItem(state, item) {
    state.itemsList = state.itemsList.filter(existingItem => existingItem.id === item.id).push(item);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};

