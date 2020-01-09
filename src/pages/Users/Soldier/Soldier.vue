<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>TU JESTEŚ</b-breadcrumb-item>
      <b-breadcrumb-item>
        <router-link to="/app/users">
          Lista użytkowników
        </router-link>
      </b-breadcrumb-item>
      <b-breadcrumb-item>
        <router-link :to="`/app/users/view/${userId}`">
          Szczegóły użytkownika
        </router-link>
      </b-breadcrumb-item>
      <b-breadcrumb-item active>Szczegóły żołnierza</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Szczegóły <span class="fw-semi-bold">żołnierza</span> -
      <router-link :to="`/app/soldiers/edit/${soldierId}`">
        Edytuj żołnierza
      </router-link>
    </h2>
    <b-row v-if="currentSoldier">
      <b-col md="4">
        <Widget>
          <p>Nazwa: {{ currentSoldier.soldierName }}</p>
          <p>Poziom: {{ currentSoldier.level }}</p>
          <p>Klasa: {{ kitIdToName(currentSoldier.kit) }}</p>
          <p>Online: {{ currentSoldier.online ? "Tak" : "Nie" }}</p>
          <p>Ostatni IP: {{ currentSoldier.ip }}</p>
          <p>Punkty XP: {{ currentSoldier.xp }}</p>
          <p>Czy główny? {{ currentSoldier.isMain ? "Tak" : "Nie" }}</p>
          <p>Data założenia żołnierza: {{ currentSoldier.createdAt }}</p>
        </Widget>
      </b-col>
     <b-col md="8">
        <Widget>
          <h4>Lista rund</h4>
          <table class="table table-hover">
            <thead>
            <tr>
              <th>#</th>
              <th>Zabójstwa</th>
              <th>Zgony</th>
              <th>Punkty XP</th>
              <th>Przejęte flagi</th>
              <th>Zneutralizowane flagi</th>
              <th>Data</th>
            </tr>
            </thead>
            <tbody v-if="this.currentSoldier.roundsStats">
            <tr v-for="(round, index) in this.currentSoldier.roundsStats" :key="`rounds_table_row_${index}`">
              <td>{{ round.id }}</td>
              <td>{{ round.kills }}</td>
              <td>{{ round.deaths }}</td>
              <td>{{ round.points }}</td>
              <td>{{ round.flagsCaptured}}</td>
              <td>{{ round.flagsNeutralized }}</td>
              <td>{{ round.createdAt }}</td>
            </tr>
            </tbody>
          </table>
        </Widget>
      </b-col>
    </b-row>
    <b-row v-if="currentSoldier">
      <b-col md="12">
        <Widget>
          <h4>Lista przedmiotów -
            <router-link :to="`/app/soldiers/giveItem/${soldierId}`">
              Daj przedmiot
            </router-link>
          </h4>
          <table class="table table-hover">
            <thead>
            <tr>
              <th>#</th>
              <th>Nazwa</th>
              <th>Ilość</th>
              <th>Pozycja na pasku</th>
              <th>Data kupienia</th>
              <th>Data ważności</th>
              <th>Akcje</th>
            </tr>
            </thead>
            <tbody v-if="this.currentSoldier.items">
            <tr v-for="(item, index) in this.currentSoldier.items" :key="`items_table_row_${index}`">
              <td>{{ item.itemData.id }}</td>
              <td>{{ item.itemData.name }}</td>
              <td>{{ item.useCount ? item.useCount : "bez limitu" }}</td>
              <td>{{ item.barPosition ? item.barPosition : "-" }}</td>
              <td>{{ item.createdAt}}</td>
              <td>{{ item.availableTill }}</td>
              <td>
                <a href="#" @click.prevent="showDeleteBox(item.id)" class="text-danger">
                      <span class="icon">
                        <i class="fi flaticon-trash"/>
                      </span>
                  Usuń
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Widget from "@/components/Widget/Widget";
import { kitIdToName } from "@/utils"

export default {
  name: "Soldier",
  components: { Widget },
  created() {
    this.getSoldier(this.soldierId);
  },
  computed: {
    ...mapState("soldiers", ["currentSoldier"]),
    ...mapState("users", ["currentUser"]),
    soldierId() {
      return this.$router.currentRoute.params.soldierId;
    },
    userId() {
      return this.currentUser && this.currentUser.id;
    }
  },
  methods: {
    ...mapActions("soldiers", ["getSoldier"]),
    ...mapActions("items", ["revokeItem"]),
    kitIdToName,
    showDeleteBox(itemId) {
      this.$bvModal.msgBoxConfirm("Na pewno chcesz zabrać przedmiot?", {
        title: "Zabierz przedmiot",
        size: "sm",
        buttonSize: "sm",
        okVariant: "danger",
        okTitle: "TAK",
        cancelTitle: "NIE",
        footerClass: "p-2",
        hideHeaderClose: false,
        centered: true
      })
          .then(async value => {
            if (value) {
              try {
                await this.revokeItem(itemId);
                this.$toasted.info("Pomyślnie zabrano przedmiot", {
                  duration: 5000,
                  position: "top-center"
                });
              } catch (err) {
                this.$toasted.error(`Wystąpił błąd - ${err}`, {
                  duration: 5000,
                  position: "top-center"
                });
              }
            }
          })
    }
  }
};
</script>

<style src="./Soldier.scss" lang="scss" scoped />

