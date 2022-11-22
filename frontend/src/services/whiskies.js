import http from "../http-common.js";

// Contains all the API calls for whiskies

class WhiskeyDataService {
  getWhiskies(page = 0) {
    return http.get(`?page=${page}`);
  }

  getDistilleries() {
    return http.get(`distilleries`);
  }

  find(query, by = "whiskeyTitle", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }

  deleteWhiskey(id) {
    return http.delete(`/action?id=${id}`);
  }
}

export default new WhiskeyDataService();
