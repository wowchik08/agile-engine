import axios from "axios";

const http = axios.create({
  baseURL: "http://interview.agileengine.com",
  headers: { Authorization: "" }
});

export default http;
