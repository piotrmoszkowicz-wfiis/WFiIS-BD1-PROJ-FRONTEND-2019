<template>
  <b-collapse class="sidebar-collapse" id="sidebar-collapse" :visible="sidebarOpened">
  <nav
    :class="{sidebar: true}"
  >
    <header class="logo">
      <router-link to="/app/dashboard">Battlefield Play4Free <span class="fw-semi-bold">ACP</span></router-link>
    </header>
    <ul class="nav">
      <NavLink
              :activeItem="activeItem"
              header="Panel Główny"
              link="/app/dashboard"
              iconName="flaticon-home"
              index="dashboard"
              isHeader
      />
      <NavLink
          header="Lista userów"
          link="/app/users"
          iconName="flaticon-user"
          index="users"
          isHeader
      />
      <NavLink
          header="Lista serwerów"
          link="/app/servers"
          iconName="flaticon-network"
          index="servers"
          isHeader
      />
      <NavLink
          header="Lista przedmiotów"
          link="/app/items"
          iconName="flaticon-notepad"
          index="items"
          isHeader
      />
      <NavLink
              header="Typography"
              link="/app/typography"
              iconName="flaticon-list"
              index="typography"
              isHeader
      />
      <NavLink
              header="Tables Basic"
              link="/app/tables"
              iconName="flaticon-equal-1"
              index="tables"
              isHeader
      />
      <NavLink
              header="Notifications"
              link="/app/notifications"
              iconName="flaticon-star"
              index="notifications"
              isHeader
      />
      <NavLink
              :activeItem="activeItem"
              header="Components"
              link="/app/components"
              iconName="flaticon-network"
              index="components"
              :childrenLinks="[
          { header: 'Charts', link: '/app/components/charts' },
          { header: 'Icons', link: '/app/components/icons' },
          { header: 'Maps', link: '/app/components/maps' },
        ]"
      />
    </ul>
    <div class="sidebarAlerts d-sm-down-none">
      <b-alert
        v-for="alert in alerts"
        :key="alert.id"
        class="sidebarAlert" variant="transparent"
        show dismissible
      >
        <span>{{alert.title}}</span><br />
        <b-progress class="sidebarProgress progress-xs mt-1"
          :variant="alert.color" :value="alert.value" :max="100" />
        <small>{{alert.footer}}</small>
      </b-alert>
    </div>
  </nav>
  </b-collapse>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NavLink from "./NavLink/NavLink";

export default {
  name: "Sidebar",
  components: { NavLink },
  data() {
    return {
      alerts: [
        /* {
          id: 0,
          title: "Sales Report",
          value: 15,
          footer: "Calculating x-axis bias... 65%",
          color: "info",
        },
        {
          id: 1,
          title: "Personal Responsibility",
          value: 20,
          footer: "Provide required notes",
          color: "danger",
        }, */
      ],
    };
  },
  methods: {
    ...mapActions("layout", ["changeSidebarActive", "switchSidebar"]),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split("/");
      paths.pop();
      this.changeSidebarActive(paths.join("/"));
    },
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState("layout", {
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
