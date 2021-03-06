<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>TU JESTEŚ</b-breadcrumb-item>
      <b-breadcrumb-item>
        <router-link to="/app/items">
          Lista itemów
        </router-link>
      </b-breadcrumb-item>
      <b-breadcrumb-item active>Szczegóły przedmiotu</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Szczegóły <span class="fw-semi-bold">przedmiotu</span>
    </h2>
    <b-row v-if="this.currentItem">
      <b-col md="4">
        <Widget>
          <p>Nazwa: {{ this.currentItem.name }}</p>
          <p>Typ: {{ this.currentItem.type }}</p>
          <p>Kategoria: {{ this.currentItem.category }}</p>
          <p>Opis: {{ this.currentItem.description }}</p>
          <p>Klasa postaci: {{ kitIdToName(this.currentItem.kit) }}</p>
          <p>Kupowalny: {{ this.currentItem.buyable ? "Tak" : "Nie" }}</p>
          <p>Grupa walidacji: {{ this.currentItem.validationGroup ? this.currentItem.validationGroup : "-" }}</p>
          <p>Minimalnym poziom: {{ this.currentItem.lockCriteria }}</p>
        </Widget>
      </b-col>
      <b-col md="8">
        <Widget>
          <h4>Lista ofert -
            <router-link :to="`/app/offers/add/${itemId}`">
              Dodaj ofertę
            </router-link>
          </h4>
          <table class="table table-hover">
            <thead>
            <tr>
              <th>#</th>
              <th>Ilość</th>
              <th>Koszt</th>
              <th>Czy oferta odblokowuje</th>
              <th>Czy nielimitowana</th>
              <th>Data dodania</th>
              <th>Akcje</th>
            </tr>
            </thead>
            <tbody v-if="this.currentItem.offers">
            <tr v-for="(offer, index) in this.currentItem.offers" :key="`offer_table_row_${index}`">
              <td>{{ offer.id }}</td>
              <td>{{ offer.limit }}</td>
              <td>{{ offer.cost }} {{ currencyIdToName(offer.currency) }}</td>
              <td>{{ offer.isUnlockOffer ? "Tak" : "Nie" }}</td>
              <td>{{ offer.isUnlimited ? "Tak" : "Nie" }}</td>
              <td>{{ offer.createdAt }}</td>
              <td>
                <router-link :to="`/app/offers/edit/${offer.id}`" class="text-info">
                      <span class="icon">
                        <i class="fi flaticon-edit-1"/>
                      </span>
                  Edytuj
                </router-link>
                <a href="#" @click.prevent="showDeleteBox(offer.id)" class="text-danger">
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
  name: "Item",
  components: { Widget },
  created() {
    this.getItem(this.itemId);
  },
  computed: {
    ...mapState("items", ["currentItem"]),
    itemId() {
      return this.$router.currentRoute.params.itemId;
    }
  },
  methods: {
    ...mapActions("items", ["getItem"]),
    ...mapActions("offers", ["deleteOffer"]),
    currencyIdToName,
    kitIdToName,
    showDeleteBox(offerId) {
      this.$bvModal.msgBoxConfirm("Na pewno chcesz usunąć ofertę?", {
        title: "Usuń ofertę",
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
                await this.deleteOffer(offerId);
                this.$toasted.info("Pomyślnie usunięto ofertę", {
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

<style src="./Item.scss" lang="scss" scoped />

