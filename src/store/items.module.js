import { addItem, getItem, getItems, giveItem } from "../api";

const initialState = () => ({
  currentItem: null,
  itemsList: null
});

const state = initialState();

const actions = {
  async addItem({ commit }, itemData) {
    const result = await addItem(itemData);
    if (result && result.data) {
      commit("addItem", result.data);
    }
  },
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
  async getItems({ commit }, kitId = "") {
    try {
      const result = await getItems(kitId);
      if (result && result.data) {
        commit("setItems", result.data);
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error("Error while loading items data...", err);
    }
  },
  async giveItem({ dispatch }, payload) {
    const result = await giveItem(payload);
    if (result && result.data) {
      dispatch("soldiers/getSoldier", { root: true }, payload.ownerId);
    }
  }
};

const mutations = {
  addItem(state, item) {
    state.itemsList.push(item);
  },

  addOffer(state, offer) {
    state.currentItem.offers.push(offer);
  },

  setItems(state, items) {
    state.itemsList = items;
  },

  setItem(state, item) {
    state.currentItem = item;
  },

  updateItem(state, item) {
    state.itemsList = state.itemsList.filter(existingItem => existingItem.id === item.id);
    state.itemsList.push(item);
  },

  updateOffer(state, offer) {
    state.currentItem.offers = state.currentItem.offers.filter(exisitingOffer => exisitingOffer.id === offer.id);
    state.currentItem.offers.push(offer);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};

