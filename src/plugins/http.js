import axios from "axios";
import store from "../store/index";

const http = axios.create({
  baseURL: "http://interview.agileengine.com",
  headers: { Authorization: "" }
});

// Add a request interceptor
http.interceptors.request.use(async function (config) {
  console.log("interceptor request:", config);

  if (config.url !== "/auth" && !store.getters.isAuthenticated && store.state.status !== "pending") {
    await store.dispatch("authenticate");
    return config;
  } else {
    return config;
  }
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default http;
