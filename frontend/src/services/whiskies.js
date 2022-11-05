import http from "../http-common.js";

// Contains all the API calls for whiskies

class WhiskeyDataService {
  getWhiskies(page = 0) {
    return http.get(`?page=${page}`);
  }

  getDistilleries() {
    return http.get(`distilleries`);
  }

  // get(id) {
  //     return http.get(`id/${id}`)
  // }

  find(query, by = "whiskeyTitle", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }

  addWhiskey(data) {
    return http.post("/action", data);
  }

  editWhiskey(id, data) {
    return http.put(`/action?id=${id}`, data);
  }

  deleteWhiskey(id) {
    return http.delete(`/action?id=${id}`);
  }
}

export default new WhiskeyDataService();
