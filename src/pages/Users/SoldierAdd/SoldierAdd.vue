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
      <b-breadcrumb-item active>Dodawanie żołnierza</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Dodawanie <span class="fw-semi-bold">żołnierza</span>
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
                  v-model="form.soldierName"
                  type="text"
                  required
              />
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Klasa:"
                label-for="input-2"
            >
              <b-form-select v-model="form.kit" :options="kit" id="input-2" />
            </b-form-group>

            <b-form-group
                id="input-group-3"
                label="Czy główny:"
                label-for="input-3"
            >
              <b-form-select v-model="form.isMain" :options="tf" id="input-3" />
            </b-form-group>

            <b-button type="submit" variant="primary">Dodaj!</b-button>
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
  name: "SoldierAdd",
  components: { Widget },
  computed: {
    userId() {
      return this.$router.currentRoute.params.userId;
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
      ],
      kit: [
        {
          value: 3,
          text: "Inżynier"
        },
        {
          value: 2,
          text: "Medyk"
        },
        {
          value: 0,
          text: "Snajper"
        },
        {
          value: 1,
          text: "Szturmowiec"
        }
      ],
      form: {
        soldierName: "",
        isMain: false,
        kit: 0
      }
    }
  },
  methods: {
    ...mapActions("soldiers", ["addSoldier"]),
    async onSubmit() {
      try {
        await this.addSoldier({
          ...this.form,
          userId: this.userId
        });
        this.$toasted.info("Pomyślnie dodano żołnierza", {
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

