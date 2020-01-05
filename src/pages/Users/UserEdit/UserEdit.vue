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
      <b-breadcrumb-item active>Edycja użytkownika</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Edycja <span class="fw-semi-bold">użytkownika</span>
    </h2>
    <b-row>
      <b-col md="12" v-if="currentUser">
        <Widget>
          <b-form @submit.prevent="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Email:"
                label-for="input-1"
            >
              <b-form-input
                  id="input-1"
                  v-model="currentUser.email"
                  type="text"
                  required
              />
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Hasło:"
                label-for="input-2"
            >
              <b-form-input
                  id="input-2"
                  v-model="currentUser.password"
                  type="password"
              />
            </b-form-group>

            <b-form-group
                id="input-group-3"
                label="Prawa dostępu:"
                label-for="input-3"
            >
              <b-form-select v-model="currentUser.rights" :options="rights" id="input-3" />
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
  name: "UserEdit",
  components: { Widget },
  computed: {
    ...mapState("users", ["currentUser"]),
    userId() {
      return this.$router.currentRoute.params.userId;
    }
  },
  data() {
    return {
      rights: [
        {
          value: "Administrator",
          text: "Administrator"
        },
        {
          value: "User",
          text: "Użytkownik"
        }
      ]
    }
  },
  methods: {
    ...mapActions("users", ["updateUser"]),
    async onSubmit() {
      try {
        if (!this.currentUser.password || this.currentUser.password.length === 0) {
          delete this.currentUser.password;
        }
        await this.updateUser(this.currentUser);
        this.$toasted.info("Pomyślnie edytowano użytkownika", {
          duration: 5000,
          position: "top-center"
        });
        this.$router.push(`/app/users/view/${this.userId}`);
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

