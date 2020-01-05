import { addOffer, updateOffer } from "../api";

const actions = {
  async addOffer({ commit }, offerData) {
    const result = await addOffer(offerData);
    if (result && result.data) {
      commit("items/addOffer", result.data, { root: true });
    }
  },

  async updateOffer({ commit }, { id, ...offerData }) {
    const result = await updateOffer(id, offerData);
    if (result && result.data && result.data.updated) {
      commit("items/updateOffer", { id, ...offerData }, { root: true });
    }
  }
};

export default {
  namespaced: true,
  actions,
};

