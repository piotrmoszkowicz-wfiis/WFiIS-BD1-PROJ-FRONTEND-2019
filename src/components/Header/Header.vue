<template>
  <b-navbar toggleable="md" class="header d-print-none">
    <b-navbar-nav class="navbar-nav-mobile ml-auto">
      <b-nav-item>
        <span class="d-md-down-none d-lg-inline">{{ this.userData.email }}</span>
      </b-nav-item>
      <b-nav-item class="divider"/>
      <b-nav-item class="d-md-down-none" @click="logout">
        <i class="la la-power-off px-2" />
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState("user", ["userData"])
  },
  methods: {
    ...mapActions("user", ["logOut"]),
    logout() {
      this.logOut();
      this.$router.push("/login");
    },
  },
  data() {
    return {
      showNavbarAlert: true
    }
  }
};
</script>

<style src="./Header.scss" lang="scss" scoped />
