import { createStore } from "vuex";
import Utils from "../config/utils";

// Vue.use(Vuex);

const user = Utils.getStore("user");
const isFaculty = user && user.email && user.email.endsWith('@oc.edu') && !user.email.endsWith('@eagles.oc.edu');
const testFacultyEmail = "jaxen.mcray@eagles.oc.edu";

const store = createStore({
  state: {
    loginUser: user,
    isFaculty: isFaculty,
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user;
      Utils.setStore("user", user);
      // Whenever the loginUser is set, update the isFaculty state as well
      state.isFaculty = (user.email && user.email.endsWith('@oc.edu') && !user.email.endsWith('@eagles.oc.edu')) || user.email === testFacultyEmail;
    },
  },
  actions: {
    login({ commit }, user) {
      // This action can be dispatched when a user logs in
      // Replace this with your actual login logic
      // After login, commit the user to setLoginUser mutation
      commit('setLoginUser', user);
    },
  },
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser;
    },
    isFaculty(state) {
      // This getter can be used to access the isFaculty state in your Vue components
      return state.isFaculty;
    },
  },
});

export default store;
