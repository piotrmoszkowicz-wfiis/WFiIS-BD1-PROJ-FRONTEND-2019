import { addOffer, updateOffer } from "../api";

const actions = {
  async addOffer({ commit }, offerData) {
    const result = await addOffer(offerData);
    if (result && result.data) {
      commit("items/addOffer", result.data, { root: true });
    }
  }
};

export default {
  namespaced: true,
  actions,
};

