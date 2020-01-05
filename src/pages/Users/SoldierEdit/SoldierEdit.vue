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
      <b-breadcrumb-item>
        <router-link :to="`/app/soldiers/view/${soldierId}`">
          Szczegóły żołnierza
        </router-link>
      </b-breadcrumb-item>
      <b-breadcrumb-item active>Edycja żołnierza</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Edycja <span class="fw-semi-bold">żołnierza</span>
    </h2>
    <b-row>
      <b-col md="12" v-if="currentSoldier">
        <Widget>
          <b-form @submit.prevent="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Nazwa:"
                label-for="input-1"
            >
              <b-form-input
                  id="input-1"
                  v-model="currentSoldier.soldierName"
                  type="text"
                  required
              />
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Poziom:"
                label-for="input-2"
            >
              <b-form-input
                  id="input-2"
                  v-model="currentSoldier.level"
                  type="text"
                  required
              />
            </b-form-group>

            <b-form-group
                id="input-group-3"
                label="Czy główny:"
                label-for="input-3"
            >
              <b-form-select v-model="currentSoldier.isMain" :options="tf" id="input-3" />
            </b-form-group>

            <b-button type="submit" variant="primary">Zapisz!</b-button>
          </b-form>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Widget from "@/components/Widget/Widget";

export default {
  name: "SoldierEdit",
  components: { Widget },
  computed: {
    ...mapState("users", ["currentUser"]),
    ...mapState("soldiers", ["currentSoldier"]),
    userId() {
      return this.currentUser && this.currentUser.id;
    },
    soldierId() {
      return this.$router.currentRoute.params.soldierId;
    }
  },
  data() {
    return {
      tf: [
        {
          value: true,
          text: "Tak"
        },
        {
          value: false,
          text: "Nie"
        }
      ]
    }
  },
  methods: {
    ...mapActions("soldiers", ["updateSoldier"]),
    async onSubmit() {
      try {
        await this.updateSoldier(this.currentSoldier);
        this.$toasted.info("Pomyślnie edytowano żołnierza", {
          duration: 5000,
          position: "top-center"
        });
        this.$router.push(`/app/soldiers/view/${this.soldierId}`);
      } catch (err) {
        this.$toasted.error(`Wystąpił błąd - ${err}`, {
          duration: 5000,
          position: "top-center"
        });
      }
    }
  }
};
</script>

