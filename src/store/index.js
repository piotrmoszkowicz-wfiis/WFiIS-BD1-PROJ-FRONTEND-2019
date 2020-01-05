import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import items from "./items.module";
import layout from "./layout.module";
import offers from "./offers.module";
import servers from "./servers.module";
import user from "./user.module";
import users from "./users.module";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    items,
    layout,
    offers,
    servers,
    user,
    users
  },
  plugins: [
    vuexLocal.plugin
  ]
});
