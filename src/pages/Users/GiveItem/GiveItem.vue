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
      <b-breadcrumb-item active>Daj przedmiot</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Daj <span class="fw-semi-bold">przedmiot</span>
    </h2>
    <b-row>
      <b-col md="12" v-if="items">
        <Widget>
          <b-form @submit.prevent="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Ilość:"
                label-for="input-1"
            >
              <b-form-input
                  id="input-1"
                  v-model="form.useCount"
                  type="text"
              />
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Przedmiot:"
                label-for="input-2"
                required
            >
              <b-form-select v-model="form.itemId" :options="items" id="input-2" />
            </b-form-group>

            <b-button type="submit" variant="primary">Daj!</b-button>
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
  name: "GiveItem",
  created() {
    this.getItems(this.currentSoldier.kit);
  },
  components: { Widget },
  computed: {
    ...mapState("users", ["currentUser"]),
    ...mapState("soldiers", ["currentSoldier"]),
    ...mapState("items", ["itemsList"]),
    items() {
      return this.itemsList && this.itemsList.map(item => ({
        value: item.id,
        text: item.name
      }));
    },
    userId() {
      return this.currentUser && this.currentUser.id;
    },
    soldierId() {
      return this.$router.currentRoute.params.soldierId;
    }
  },
  data() {
    return {
      form: {
        itemId: 1,
        useCount: null,
        ownerId: parseInt(this.$router.currentRoute.params.soldierId, 10)
      },
    }
  },
  methods: {
    ...mapActions("users", ["updateUser"]),
    ...mapActions("items", ["getItems", "giveItem"]),
    async onSubmit() {
      try {
        if (!this.form.useCount || this.form.useCount.length === 0) {
          delete this.form.useCount;
        }
        await this.giveItem(this.form);
        this.$toasted.info("Pomyślnie dodano przedmiot", {
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

