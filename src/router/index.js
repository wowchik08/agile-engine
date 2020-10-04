import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Photo from "../components/Photo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: ":photoId",
        name: "Photo",
        component: Photo
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
