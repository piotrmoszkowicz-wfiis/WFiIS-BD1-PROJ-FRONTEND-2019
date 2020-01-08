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
          header="Lista itemów"
          link="/app/items"
          iconName="flaticon-notepad"
          index="items"
          isHeader
      />
    </ul>
  </nav>
  </b-collapse>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NavLink from "./NavLink/NavLink";

export default {
  name: "Sidebar",
  components: { NavLink },
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
