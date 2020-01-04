import Vue from "vue";
import Router from "vue-router";

import store from "@/store";

import Layout from "@/components/Layout/Layout";
import Typography from "@/pages/Typography/Typography";
import Tables from "@/pages/Tables/Tables";
import Notifications from "@/pages/Notifications/Notifications";
import Icons from "@/pages/Icons/Icons";
import Maps from "@/pages/Maps/Maps";
import Charts from "@/pages/Charts/Charts";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Login from "@/pages/Login/Login";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/app",
      name: "Layout",
      component: Layout,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard,
        },
        {
          path: "items",
          name: "Items",
          component: () => import("@/pages/Items/Items")
        },
        {
          path: "servers",
          name: "Servers",
          component: () => import("@/pages/Servers/Servers")
        },
        {
          path: "users",
          name: "Users",
          component: () => import("@/pages/Users/Users")
        },
        {
          path: "typography",
          name: "Typography",
          component: Typography,
        },
        {
          path: "tables",
          name: "Typography",
          component: Tables,
        },
        {
          path: "notifications",
          name: "Notifications",
          component: Notifications,
        },
        {
          path: "components/icons",
          name: "Icons",
          component: Icons,
        },
        {
          path: "components/maps",
          name: "Maps",
          component: Maps,
        },
        {
          path: "components/charts",
          name: "Charts",
          component: Charts,
        },
      ],
    }
  ],
});

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters["user/getAuthToken"];

  if (!loggedIn && to.name !== "Login") {
    return window.location.replace("/login");
  }

  if (loggedIn && (to.name === "Login" || to.name === null)) {
    return window.location.replace("/app/dashboard");
  }

  next();
});
