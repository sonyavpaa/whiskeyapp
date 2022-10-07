import http from "../http-common.js";

class WhiskeyDataService {
  getWhiskies(page = 0) {
    return http.get(`?page=${page}`);
  }

  getDistilleries(id) {
    return http.get(`distilleries`);
  }

  // get(id) {
  //     return http.get(`id/${id}`)
  // }

  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }

  addWhiskey(data) {
    return http.post("action", data);
  }

  editWhiskey(data) {
    return http.put("/action", data);
  }

  deleteWhiskey(id) {
    return http.delete(`/action?id=${id}`);
  }
}

export default new WhiskeyDataService();
