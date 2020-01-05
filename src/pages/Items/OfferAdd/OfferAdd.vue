<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>TU JESTEŚ</b-breadcrumb-item>
      <b-breadcrumb-item>
        <router-link to="/app/items">
          Lista przedmiotów
        </router-link>
      </b-breadcrumb-item>
      <b-breadcrumb-item>
        <router-link :to="`/app/items/view/${itemId}`">
          Szczegóły przedmiotu
        </router-link>
      </b-breadcrumb-item>
      <b-breadcrumb-item active>Dodawanie oferty</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Dodawanie <span class="fw-semi-bold">oferty</span>
    </h2>
    <b-row>
      <b-col md="12">
        <Widget>
          <b-form @submit.prevent="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Ilość:"
                label-for="input-1"
            >
              <b-form-input
                  id="input-1"
                  v-model="form.limit"
                  type="text"
                  required
              />
            </b-form-group>
            <b-form-group
                id="input-group-2"
                label="Waluta:"
                label-for="input-2"
            >
              <b-form-select v-model="form.currency" :options="currency" id="input-2" />
            </b-form-group>
            <b-form-group
                id="input-group-3"
                label="Cena:"
                label-for="input-3"
            >
              <b-form-input
                  id="input-3"
                  v-model="form.cost"
                  type="text"
              />
            </b-form-group>
            <b-form-group
                id="input-group-4"
                label="Czy oferta odblokowuje:"
                label-for="input-4"
            >
              <b-form-select v-model="form.isUnlockOffer" :options="tf" id="input-4" />
            </b-form-group>

            <b-form-group
                id="input-group-5"
                label="Czy oferta nielimitowana:"
                label-for="input-5"
            >
              <b-form-select v-model="form.isUnlimited" :options="tf" id="input-5" />
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
  name: "OfferAdd",
  data() {
    return {
      form: {
        limit: 1,
        currency: "_PF",
        cost: 0,
        isUnlockOffer: false,
        isUnlimited: false
      },
      currency: [
        {
          value: "_AC",
          text: "Credits"
        },
        {
          value: "_PF",
          text: "Funds"
        }
      ],
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
  components: { Widget },
  computed: {
    itemId() {
      return this.$router.currentRoute.params.itemId;
    }
  },
  methods: {
    ...mapActions("offers", ["addOffer"]),
    async onSubmit() {
      try {
        await this.addOffer({
          ...this.form,
          itemId: this.itemId
        });
        this.$toasted.info("Pomyślnie dodano ofertę", {
          duration: 5000,
          position: "top-center"
        });
        this.$router.push(`/app/items/view/${this.itemId}`);
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

