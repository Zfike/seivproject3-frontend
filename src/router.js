import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";
import AccommodationsList from "./views/AccommodationsList.vue";
import AccommodationsRequest from "./views/AccommodationsRequest.vue";
import AccommodationsView from "./views/AccommodationsView.vue";
import AdminDashboard from "./views/AdminDashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/accommodations",
      name: "accommodations",
      component: AccommodationsList,
    },
    {
      path: "/request",
      name: "request",
      component: AccommodationsRequest,
    },
    {
      path: "/view/:id",
      name: "view",
      component: AccommodationsView,
      props: true,
    },
    {
    path: "/adminDashboard",
    name: "adminDashboard",
    component: AdminDashboard,
    },
  ],
});

export default router;
