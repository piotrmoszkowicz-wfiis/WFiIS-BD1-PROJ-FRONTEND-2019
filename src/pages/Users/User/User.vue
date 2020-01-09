<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>TU JESTEŚ</b-breadcrumb-item>
      <b-breadcrumb-item>
        <router-link to="/app/users">
          Lista użytkowników
        </router-link>
      </b-breadcrumb-item>
      <b-breadcrumb-item active>Szczegóły użytkownika</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Szczegóły <span class="fw-semi-bold">użytkownika</span> -
      <router-link :to="`/app/users/edit/${userId}`">
        Edytuj użytkownika
      </router-link>
    </h2>
    <b-row v-if="currentUser">
      <b-col md="4">
        <Widget>
          <p>Email: {{ currentUser.email }}</p>
          <p>Prawa: {{ currentUser.rights }}</p>
          <p>Data założenia konta: {{ currentUser.createdAt }}</p>
        </Widget>
      </b-col>
      <b-col md="8">
        <Widget>
          <h4>Lista żołnierzy -
            <router-link :to="`/app/soldiers/add/${userId}`">
              Dodaj żołnierza
            </router-link>
          </h4>
          <table class="table table-hover">
            <thead>
            <tr>
              <th>#</th>
              <th>Nazwa</th>
              <th>Poziom</th>
              <th>Klasa postaci</th>
              <th>Punkty XP</th>
              <th>Czy główny?</th>
              <th>Akcje</th>
            </tr>
            </thead>
            <tbody v-if="this.currentUser.soldiers">
            <tr v-for="(soldier, index) in this.currentUser.soldiers" :key="`soldier_table_row_${index}`">
              <td>{{ soldier.id }}</td>
              <td>{{ soldier.soldierName }}</td>
              <td>{{ soldier.level }}</td>
              <td>{{ kitIdToName(soldier.kit) }}</td>
              <td>{{ soldier.xp}}</td>
              <td>{{ soldier.isMain ? "Tak" : "Nie" }}</td>
              <td>
                <router-link :to="`/app/soldiers/view/${soldier.id}`" class="text-info">
                      <span class="icon">
                        <i class="fi flaticon-binoculars"/>
                      </span>
                  Podgląd
                </router-link>
                <a href="#" @click.prevent="showDeleteBox(soldier.id)" class="text-danger">
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
import { currencyIdToName, kitIdToName } from "@/utils"

export default {
  name: "User",
  components: { Widget },
  created() {
    this.getUser(this.userId);
  },
  computed: {
    ...mapState("users", ["currentUser"]),
    userId() {
      return this.$router.currentRoute.params.userId;
    }
  },
  methods: {
    ...mapActions("users", ["getUser"]),
    ...mapActions("soldiers", ["deleteSoldier"]),
    currencyIdToName,
    kitIdToName,
    showDeleteBox(soldierId) {
      this.$bvModal.msgBoxConfirm("Na pewno chcesz usunąć żołnierza?", {
        title: "Usuń żołnierza",
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
                await this.deleteSoldier(soldierId);
                this.$toasted.info("Pomyślnie usunięto żołnierza", {
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

<style src="./User.scss" lang="scss" scoped />

