<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>TU JESTEŚ</b-breadcrumb-item>
      <b-breadcrumb-item>
        <router-link to="/app/servers">
          Lista serwerów
        </router-link>
      </b-breadcrumb-item>
      <b-breadcrumb-item active>Szczegóły serwera</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Szczegóły <span class="fw-semi-bold">serwera</span> -
      <router-link :to="`/app/servers/edit/${this.serverId}`">
        Edytuj
      </router-link>
    </h2>
    <b-row v-if="this.currentServer">
      <b-col md="3">
        <Widget>
          <p>Nazwa: {{ this.currentServer.name }}</p>
          <p>GUID: {{ this.currentServer.guid }}</p>
          <p>Hasło: {{ this.currentServer.password ? this.currentServer.password : "Brak" }}</p>
        </Widget>
      </b-col>
      <b-col md="3">
        <Widget>
          <p>Ilość graczy: {{ this.currentServer.numberOfCurrentPlayers }} / {{ this.currentServer.capacity }}</p>
          <p>Aktualna mapa: {{ this.currentMap }}</p>
          <p>Aktualna runda: {{ this.currentServer.currentRound }} / {{ this.currentServer.roundsPerMap }}</p>
        </Widget>
      </b-col>
      <b-col md="3">
        <Widget>
          <p>IP: {{ this.currentServer.ip }}</p>
          <p>Region: {{ this.currentServer.region }}</p>
          <p>Online: {{ this.currentServer.online ? "Tak" : "Nie" }}</p>
        </Widget>
      </b-col>
      <b-col md="3">
        <Widget>
          <p>Rankingowy: {{ this.currentServer.ranked ? "Tak" : "Nie" }}</p>
          <p>Data dodania: {{ this.currentServer.createdAt }}</p>
          <p>Data aktualizacji: {{ this.currentServer.updatedAt }}</p>
        </Widget>
      </b-col>
    </b-row>
    <b-row v-if="this.currentServer">
      <b-col md="12">
        <Widget>
          <h3>Lista żołnierzy na serwerze</h3>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
              <tr>
                <th>#</th>
                <th>Nick</th>
                <th>Klasa</th>
                <th>Poziom</th>
              </tr>
              </thead>
              <tbody v-if="this.soldierList">
              <tr v-for="(soldier, index) in this.soldierList" :key="`soldier_table_row_${index}`">
                  <td>{{ index }}</td>
                  <td>{{ soldier.name }}</td>
                  <td>{{ kitIdToName(soldier.kit) }}</td>
                  <td>{{ soldier.level }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Widget from "@/components/Widget/Widget";
import { gameModeIdToName, mapIdToName, kitIdToName } from "@/utils"

export default {
  name: "Server",
  components: { Widget },
  created() {
    this.getServer(this.serverId);
  },
  computed: {
    ...mapState("servers", ["currentServer"]),
    currentMap() {
      const mapList = JSON.parse(this.currentServer.mapList);
      const mapDetails = mapList[this.currentServer.currentMap].split(":");
      return `${mapIdToName(mapDetails[0])} - ${gameModeIdToName(mapDetails[1])}`;
    },
    soldierList() {
      return Object.values(JSON.parse(this.currentServer.currentPlayers));
    },
    serverId() {
      return this.$router.currentRoute.params.serverId;
    }
  },
  methods: {
    ...mapActions("servers", ["getServer"]),
    kitIdToName
  }
};
</script>

<style src="./Server.scss" lang="scss" scoped />

