import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/accommodations");
  },
  getAllForUser(userId) {
    return apiClient.get(`/accommodations/user/${userId}`);
  }, 
  get(id) {
    return apiClient.get(`/accommodations/${id}`);
  },  
  create(data) {
    return apiClient.post('/accommodations', data);
  },  
  update(id, data) {
    return apiClient.put(`/accommodations/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/accommodations/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/accommodations`);
  },
  getByCategoryName(categoryName) {
    return apiClient.get(`/accommodations?categoryName=${categoryName}`);
  },
};