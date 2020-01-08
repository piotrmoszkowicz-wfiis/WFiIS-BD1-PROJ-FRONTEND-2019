<template>
  <div class="dashboard-page">
    <h1 class="page-title">Panel główny</h1>
    <b-row>
      <b-col>
        <Widget class="bg-transparent">
          <Map :stats="this.stats.servers" v-if="this.stats" />
        </Widget>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="6" xs="12">
        <Widget
          title="<h6> STATYSTYKI ŻOŁNIERZY </h6>"
          close settings customHeader
        >
          <div class="stats-row">
            <div class="stat-item">
              <h6 class="name">Inżynierzy</h6>
              <p class="value">{{ numOfSoldiersPerKit[3] }}</p>
            </div>
            <div class="stat-item">
              <h6 class="name">Snajperzy</h6>
              <p class="value">{{ numOfSoldiersPerKit[0] }}</p>
            </div>
            <div class="stat-item">
              <h6 class="name">Szturmowcy</h6>
              <p class="value">{{ numOfSoldiersPerKit[1] }}</p>
            </div>
            <div class="stat-item">
              <h6 class="name">Medycy</h6>
              <p class="value">{{ numOfSoldiersPerKit[2] }}</p>
            </div>
          </div>
          Ilość żołnierzy bez rozegranej rundy: {{ stats.soldiersWithoutRounds.soldierCount }}
        </Widget>
      </b-col>
      <b-col lg="6" xs="12">
        <Widget
          title="<h6> STATYSTYKI UŻYTKOWNIKÓW </h6>"
          close settings customHeader
        >
          Ilość użytkowników: {{ stats.users.userCount }}
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import Widget from "@/components/Widget/Widget";
import Map from "./components/Map/Map";
import AnimatedNumber from "animated-number-vue";
import AreaChart from "./components/AreaChart/AreaChart";

export default {
  name: "Dashboard",
  components: {
    Widget,
    Map,
    AnimatedNumber,
    AreaChart
  },
  created() {
    this.getStats();
  },
  methods: {
    ...mapActions("stats", ["getStats"])
  },
  computed: {
    ...mapState("stats", ["stats"]),
    numOfSoldiersPerKit() {
      return this.stats && this.stats.soldiers.reduce((acc, val) => {
        acc[val.kit] = val.soldierCount;
        return acc;
      }, {
        0: 0,
        1: 0,
        2: 0,
        3: 0
      });
    }
  }
};
</script>

<style src="./Dashboard.scss" lang="scss" />
