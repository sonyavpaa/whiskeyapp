import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5050/api/v1/whiskies",
  headers: {
    "Content-type": "application/json",
  },
});
