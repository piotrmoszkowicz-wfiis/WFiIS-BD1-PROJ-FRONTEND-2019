<template>
<div :class="{root: true}">
  <Header />
  <Sidebar />
  <div class="content animated fadeInUp">
    <transition name="router-animation">
      <router-view />
    </transition>
  </div>
  <footer class="contentFooter">
    Battlefield Play4Free Admin Panel - Made by <a href="https://github.com/piotrmoszkowicz" target="_blank">Piotr Moszkowicz</a>
  </footer>
</div>
</template>

<script>
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";

import "./Layout.scss";

export default {
  name: "Layout",
  components: { Sidebar, Header },
  created() {
  },
};
</script>

<style src="./Layout.scss" lang="scss" />
