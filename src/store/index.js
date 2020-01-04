import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import layout from "./layout";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
  },
  plugins: [
    vuexLocal.plugin
  ]
});
