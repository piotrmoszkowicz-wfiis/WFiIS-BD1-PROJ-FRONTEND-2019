import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import layout from "./layout.module";
import user from "./user.module";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    user
  },
  plugins: [
    vuexLocal.plugin
  ]
});
