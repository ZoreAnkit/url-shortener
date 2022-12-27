import axios from "axios";

import { defineStore } from "pinia";

export const useAuthStore = defineStore("AuthStore", {
  state() {
    return {
      currentUser: getSavedState("auth.currentUser"),
      baseURL: "http://localhost",
    };
  },
  getters: {
    loggedIn() {
      return !!this.currentUser;
    },
  },
  actions: {
    // Validates the current user's token and refreshes it
    // with new data from the API.
    validate() {
      if (!this.currentUser) return Promise.resolve(null);
      setDefaultAuthHeaders(this.baseURL);
      return axios
        .get("/api/user")
        .then((response) => {
          const user = response.data;
          this.currentUser = user;
          saveState("auth.currentUser", user);
          return user;
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.currentUser = null;
            saveState("auth.currentUser", null);
          }
          return null;
        });
    },
    // Logs in the current user.
    logIn(loginData = {}) {
      setDefaultAuthHeaders(this.baseURL);
      if (this.loggedIn) return this.validate();
      return axios.get("/sanctum/csrf-cookie").then(async () => {
        await axios.post("/login", loginData).then(async () => {
          await axios.get("/api/user").then((response) => {
            const user = response.data;
            this.currentUser = user;
            saveState("auth.currentUser", user);
            setDefaultAuthHeaders(this.baseURL);
            return user;
          });
        });
      });
    },

    // Logs out the current user.
    logout() {
      axios.post("/logout");
      this.currentUser = null;
      removeState("auth.currentUser");
    },
  },
});

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}

function removeState(key) {
  window.localStorage.removeItem(key);
}

function setDefaultAuthHeaders(baseURL) {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = baseURL;
}
