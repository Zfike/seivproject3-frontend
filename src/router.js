import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";
import AccommodationsList from "./views/AccommodationsList.vue";
import AccommodationsRequest from "./views/AccommodationsRequest.vue";
import AccommodationsView from "./views/AccommodationsView.vue";
import FacultyDashboard from "./views/FacultyDashboard.vue";

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
    path: "/facultyDashboard",
    name: "facultyDashboard",
    component: FacultyDashboard,
    },
  ],
});

export default router;
