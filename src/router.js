import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";

import AccommodationsList from "./views/AccommodationsList.vue";
import AccommodationsRequest from "./views/AccommodationsRequest.vue";
import FacultyDashboard from "./views/FacultyDashboard.vue";
// import EditTutorial from "./views/EditTutorial.vue";
// import AddTutorial from "./views/AddTutorial.vue";
// import ViewTutorial from "./views/ViewTutorial.vue";
// import AddLesson from "./views/AddLesson.vue";
// import EditLesson from "./views/EditLesson.vue";

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
    path: "/facultyDashboard",
    name: "facultyDashboard",
    component: FacultyDashboard,
    },
    // {
    //   path: "/edit/:id",
    //   name: "edit",
    //   component: EditTutorial,
    //   props: true,
    // },
    // {
    //   path: "/add",
    //   name: "add",
    //   component: AddTutorial,
    // },
    // {
    //   path: "/view/:id",
    //   name: "view",
    //   component: ViewTutorial,
    //   props: true,
    // },
    // {
    //   path: "/addLesson/:tutorialId",
    //   name: "addLesson",
    //   component: AddLesson,
    //   props: true,
    // },
    // {
    //   path: "/editLesson/:tutorialId/:lessonId",
    //   name: "editLesson",
    //   component: EditLesson,
    //   props: true,
    // },
  ],
});

export default router;
