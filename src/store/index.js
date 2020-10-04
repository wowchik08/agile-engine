import Vue from "vue";
import Vuex from "vuex";
import $http from "../plugins/http";

Vue.use(Vuex);

const STATUSES = {
  SUCCESS: "success",
  PENDING: "pending"
};

export default new Vuex.Store({
  state: {
    apiKey: "23567b218376f79d9415",
    token: localStorage.getItem("token") || "",
    status: "",
    images: [],
    details: {}
  },
  getters: {
    isAuthenticated: (state) => {
      return state.status === STATUSES.SUCCESS && !!state.token;
    }
  },
  mutations: {
    renewToken: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token);
      $http.defaults.headers.common.Authorization = `Bearer ${state.token}`;
    },
    deleteToken: (state) => {
      localStorage.removeItem("token");
      $http.defaults.headers.common.Authorization = "";
    },
    setImages: (state, images) => {
      state.images = images;
    },
    setAuthStatus: (state, status) => {
      state.status = status;
    },
    setImageDetails: (state, data) => {
      state.details = data;
    }
  },
  actions: {
    authenticate: ({ commit, state }) => {
      if (state.status === STATUSES.PENDING) { return; }
      commit("setAuthStatus", STATUSES.PENDING);

      return $http.post("/auth", { apiKey: state.apiKey }).then(response => {
        commit("renewToken", response.data.token);
        commit("setAuthStatus", STATUSES.SUCCESS);
      }).catch(err => {
        console.error(err);
        commit("deleteToken");
        commit("setAuthStatus", "");
      });
    },
    fetchImages: ({ commit }, page) => {
      return $http.get("/images", { query: { page } }).then(response => {
        commit("setImages", response.data);
      }).error(err => {
        console.info(err);
        commit("setImages", []);
      });
    },
    getImageDetails: ({ commit }, id) => {
      return $http.get(`/images/${id}`).then(response => {
        commit("setImageDetails", response.data);
      }).catch(err => {
        console.error(err);
        commit("setImageDetails", {});
      });
    }
  },
  modules: {}
});
