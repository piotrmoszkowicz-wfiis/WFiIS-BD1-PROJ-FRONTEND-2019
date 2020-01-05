<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>TU JESTEŚ</b-breadcrumb-item>
      <b-breadcrumb-item>
        <router-link to="/app/items">
          Lista przedmiotów
        </router-link>
      </b-breadcrumb-item>
      <b-breadcrumb-item active>Dodawanie przedmiotu</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Dodawanie <span class="fw-semi-bold">przedmiotu</span>
    </h2>
    <b-row>
      <b-col md="12">
        <Widget>
          <b-form @submit.prevent="onSubmit">
            <b-form-group
                id="input-group-9"
                label="ID:"
                label-for="input-9"
            >
              <b-form-input
                  id="input-9"
                  v-model="form.id"
                  type="text"
                  required
              />
            </b-form-group>
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
                label="Opis:"
                label-for="input-2"
            >
              <b-form-input
                  id="input-2"
                  v-model="form.description"
                  type="text"
              />
            </b-form-group>
            <b-form-group
                id="input-group-3"
                label="Minimalny poziom:"
                label-for="input-3"
            >
              <b-form-input
                  id="input-3"
                  v-model="form.lockCriteria"
                  type="text"
              />
            </b-form-group>
            <b-form-group
                id="input-group-4"
                label="Kupowalny:"
                label-for="input-4"
            >
              <b-form-select v-model="form.buyable" :options="buyable" id="input-4" />
            </b-form-group>

            <b-form-group
                id="input-group-5"
                label="Typ:"
                label-for="input-5"
            >
              <b-form-select v-model="form.type" :options="type" id="input-5" />
            </b-form-group>

            <b-form-group
                id="input-group-6"
                label="Kategoria:"
                label-for="input-6"
            >
              <b-form-select v-model="form.category" :options="category" id="input-6" />
            </b-form-group>

            <b-form-group
                id="input-group-7"
                label="Grupa walidacji:"
                label-for="input-7"
            >
              <b-form-select v-model="form.validationGroup" :options="validationGroup" id="input-7" />
            </b-form-group>

            <b-form-group
                id="input-group-8"
                label="Klasa postaci:"
                label-for="input-8"
            >
              <b-form-select v-model="form.kit" :options="kit" id="input-8" />
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
  name: "ItemAdd",
  components: { Widget },
  data() {
    return {
      buyable: [
        {
          value: true,
          text: "Tak"
        },
        {
          value: false,
          text: "Nie"
        }
      ],
      type: [
        {
          value: "boosters",
          text: "Booster"
        },
        {
          value: "weapons",
          text: "Broń"
        },
        {
          value: "gadget",
          text: "Gadżet"
        },
        {
          value: "appearance",
          text: "Ubranie"
        },
        {
          value: "abilities",
          text: "Umiejętność"
        }
      ],
      category: [
        {
          value: "accessory1",
          text: "Akcesorium 1"
        },
        {
          value: "accessory2",
          text: "Akcesorium 2"
        },
        {
          value: "booster_9000",
          text: "Booster Credits"
        },
        {
          value: "booster_9005",
          text: "Booster XP"
        },
        {
          value: "head",
          text: "Czapka"
        },
        {
          value: "gadget",
          text: "Gadżet"
        },
        {
          value: "assault_rifle",
          text: "Karabin szturmowy"
        },
        {
          value: "smg",
          text: "Karabinek"
        },
        {
          value: "sniper_rifle",
          text: "Karabin snajperski"
        },
        {
          value: "lmg",
          text: "Lekki karabin maszynowy"
        },
        {
          value: "face",
          text: "Maska"
        },
        {
          value: "uniform",
          text: "Mundur"
        },
        {
          value: "melee",
          text: "Noże"
        },
        {
          value: "pistol",
          text: "Pistolet"
        },
        {
          value: "shotgun",
          text: "Shotgun"
        }
      ],
      validationGroup: [
        {
          value: null,
          text: "Brak"
        },
        {
          value: "primary",
          text: "Broń główna"
        },
        {
          value: "secondary",
          text: "Broń poboczna"
        },
        {
          value: "gadget",
          text: "Gadżet"
        },
        {
          value: "melee",
          text: "Nóż"
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
        },
        {
          value: -1,
          text: "Wszystkie"
        }
      ],
      form: {
        id: "",
        name: "",
        description: "",
        lockCriteria: "0",
        buyable: true,
        type: "weapons",
        category: "assault_rifle",
        validationGroup: null,
        kit: -1
      }
    }
  },
  methods: {
    ...mapActions("items", ["addItem"]),
    async onSubmit() {
      try {
        await this.addItem(this.form);
        this.$toasted.info("Pomyślnie dodano przedmiot", {
          duration: 5000,
          position: "top-center"
        });
        this.$router.push("/app/items");
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

