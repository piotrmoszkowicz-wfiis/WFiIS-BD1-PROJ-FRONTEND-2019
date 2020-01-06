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
          path: "items/view/:itemId",
          name: "Item",
          component: () => import("@/pages/Items/Item/Item")
        },
        {
          path: "items/add",
          name: "ItemAdd",
          component: () => import("@/pages/Items/ItemAdd/ItemAdd")
        },
        {
          path: "offers/add/:itemId",
          name: "OfferAdd",
          component: () => import("@/pages/Items/OfferAdd/OfferAdd")
        },
        {
          path: "offers/edit/:offerId",
          name: "OfferEdit",
          component: () => import("@/pages/Items/OfferEdit/OfferEdit")
        },
        {
          path: "servers",
          name: "Servers",
          component: () => import("@/pages/Servers/Servers")
        },
        {
          path: "servers/view/:serverId",
          name: "Server",
          component: () => import("@/pages/Servers/ServerView/Server")
        },
        {
          path: "servers/add",
          name: "ServerAdd",
          component: () => import("@/pages/Servers/ServerAdd/ServerAdd")
        },
        {
          path: "soldiers/add/:userId",
          name: "SoldierAdd",
          component: () => import("@/pages/Users/SoldierAdd/SoldierAdd")
        },
        {
          path: "soldiers/edit/:soldierId",
          name: "SoldierEdit",
          component: () => import("@/pages/Users/SoldierEdit/SoldierEdit")
        },
        {
          path: "soldiers/giveItem/:soldierId",
          name: "SoldierGiveItem",
          component: () => import("@/pages/Users/GiveItem/GiveItem")
        },
        {
          path: "soldiers/view/:soldierId",
          name: "Soldier",
          component: () => import("@/pages/Users/Soldier/Soldier")
        },
        {
          path: "users",
          name: "Users",
          component: () => import("@/pages/Users/Users")
        },
        {
          path: "users/edit/:userId",
          name: "UserEdit",
          component: () => import("@/pages/Users/UserEdit/UserEdit")
        },
        {
          path: "users/view/:userId",
          name: "User",
          component: () => import("@/pages/Users/User/User")
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
