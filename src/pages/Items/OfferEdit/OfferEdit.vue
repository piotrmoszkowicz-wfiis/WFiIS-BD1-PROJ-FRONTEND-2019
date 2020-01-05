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
        <Widget v-if="offerData">
          <b-form @submit.prevent="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Ilość:"
                label-for="input-1"
            >
              <b-form-input
                  id="input-1"
                  v-model="offerData.limit"
                  type="text"
                  required
              />
            </b-form-group>
            <b-form-group
                id="input-group-2"
                label="Waluta:"
                label-for="input-2"
            >
              <b-form-select v-model="offerData.currency" :options="currency" id="input-2" />
            </b-form-group>
            <b-form-group
                id="input-group-3"
                label="Cena:"
                label-for="input-3"
            >
              <b-form-input
                  id="input-3"
                  v-model="offerData.cost"
                  type="text"
              />
            </b-form-group>
            <b-form-group
                id="input-group-4"
                label="Czy oferta odblokowuje:"
                label-for="input-4"
            >
              <b-form-select v-model="offerData.isUnlockOffer" :options="tf" id="input-4" />
            </b-form-group>

            <b-form-group
                id="input-group-5"
                label="Czy oferta nielimitowana:"
                label-for="input-5"
            >
              <b-form-select v-model="offerData.isUnlimited" :options="tf" id="input-5" />
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
  name: "OfferEdit",
  data() {
    return {
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
    ...mapState("items", ["currentItem"]),
    offerId() {
      return parseInt(this.$router.currentRoute.params.offerId, 10);
    },
    offerData() {
      return this.currentItem.offers.find(offer => offer.id === this.offerId);
    },
    itemId() {
      return this.currentItem && this.currentItem.id;
    }
  },
  methods: {
    ...mapActions("offers", ["updateOffer"]),
    async onSubmit() {
      try {
        await this.updateOffer(this.offerData);
        this.$toasted.info("Pomyślnie zaaktualizowano ofertę", {
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

