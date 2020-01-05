<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>TU JESTEŚ</b-breadcrumb-item>
      <b-breadcrumb-item active>Lista przedmiotów</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Lista <span class="fw-semi-bold">przedmiotów</span>
    </h2>
    <b-row>
      <b-col>
        <Widget>
          <p>Znajdziesz tutaj listę wszystkich przedmiotów w systemie.</p>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nazwa</th>
                  <th>Typ</th>
                  <th>Kategoria</th>
                  <th>Klasa postaci</th>
                  <th>Kupowalny</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody v-if="this.itemsList">
                <tr v-for="(item, index) in this.itemsList" :key="`item_table_row_${index}`">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.type }}</td>
                  <td>{{ item.category }}</td>
                  <td>{{ kitIdToName(item.kit) }}</td>
                  <td>
                    <span class="icon">
                      <i class="fi flaticon-briefcase" :class="item.buyable ? 'text-success' : 'text-danger'" />
                    </span>
                  </td>
                  <td>
                    <router-link :to="`/app/items/view/${item.id}`" class="text-info">
                      <span class="icon">
                        <i class="fi flaticon-binoculars"/>
                      </span>
                      Podgląd
                    </router-link>
                    <router-link :to="`/app/items/delete/${item.id}`" class="text-danger">
                      <span class="icon">
                        <i class="fi flaticon-trash"/>
                      </span>
                      Usuń
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
  name: "Items",
  components: { Widget },
  created() {
    this.getItems();
  },
  computed: {
    ...mapState("items", ["itemsList"])
  },
  methods: {
    ...mapActions("items", ["getItems"]),
    kitIdToName
  }
};
</script>

<style src="./Items.scss" lang="scss" scoped />

