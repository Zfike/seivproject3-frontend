import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/accommodationCategories");
  },
};
