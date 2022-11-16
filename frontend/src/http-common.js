import axios from "axios";

export default axios.create({
  // the server for the backend
  baseURL: process.env.REACT_APP_WHISKEY_URL,
  headers: {
    "Content-type": "application/json",
  },
});
