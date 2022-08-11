import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import demo from "./demo";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    demo,
  },
});
