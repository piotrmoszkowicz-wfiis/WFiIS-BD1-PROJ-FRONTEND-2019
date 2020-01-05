<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>TU JESTEŚ</b-breadcrumb-item>
      <b-breadcrumb-item>
        <router-link to="/app/servers">
          Lista serwerów
        </router-link>
      </b-breadcrumb-item>
      <b-breadcrumb-item active>Dodawanie serwera</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Dodawanie <span class="fw-semi-bold">serwera</span>
    </h2>
    <b-row>
      <b-col md="12">
        <Widget>
          <b-form @submit.prevent="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Nazwa:"
                label-for="input-1"
            >
              <b-form-input
                  id="input-1"
                  v-model="form.name"
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
                  v-model="form.password"
                  type="text"
              />
            </b-form-group>
            <b-form-group
                id="input-group-3"
                label="GUID:"
                label-for="input-3"
            >
              <b-form-input
                  id="input-3"
                  v-model="form.guid"
                  type="text"
              />
            </b-form-group>
            <b-form-group
                id="input-group-4"
                label="Region:"
                label-for="input-4"
            >
              <b-form-select v-model="form.region" :options="regions" id="input-4" />
            </b-form-group>

            <b-button type="submit" variant="primary">Zapisz!</b-button>
          </b-form>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Widget from "@/components/Widget/Widget";

export default {
  name: "ServerAdd",
  components: { Widget },
  data() {
    return {
      form: {
        name: "",
        password: "",
        guid: "",
        region: "gva"
      },
      regions: [
        {
          value: "nrt",
          text: "Azja"
        },
        {
          value: "syd",
          text: "Australia"
        },
        {
          value: "gva",
          text: "Europa"
        },
        {
          value: "sjc",
          text: "US - Zachód"
        },
        {
          value: "iad",
          text: "US - Wschód"
        }
      ]
    }
  },
  methods: {
    ...mapActions("servers", ["addServer"]),
    async onSubmit() {
      if (this.form.password.length === 0) {
        this.form.password = null;
      }
      try {
        await this.addServer(this.form);
        this.$toasted.info("Pomyślnie dodano serwer", {
          duration: 5000,
          position: "top-center"
        });
        this.$router.push("/app/servers");
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

