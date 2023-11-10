import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/accommodationCategories");
  },
  // Fetch the accommodationCategoryId from the accommodationCategory by categoryName
  getByCategoryName(categoryName) {
    return apiClient.get(`/accommodationCategories?categoryName=${categoryName}`);
  },
};
