import axios from "axios";

export default axios.create({
  // the server for the backend
  baseURL: "http://localhost:5050/api/v1/whiskies",
  headers: {
    "Content-type": "application/json",
  },
});
