<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>TU JESTEŚ</b-breadcrumb-item>
      <b-breadcrumb-item active>Lista userów</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Lista <span class="fw-semi-bold">userów</span>
    </h2>
    <b-row>
      <b-col>
        <Widget>
          <p>Znajdziesz tutaj listę wszystkich użytkowników w systemie.</p>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Data utworzenia</th>
                  <th>Prawa</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody v-if="this.usersList">
                <tr v-for="(user, index) in this.usersList" :key="`users_table_row_${index}`">
                  <td>{{ user.id }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.createdAt }}</td>
                  <td>{{ user.rights }}</td>
                  <td>
                    <router-link :to="`/app/users/view/${user.id}`" class="text-info">
                      <span class="icon">
                        <i class="fi flaticon-binoculars"/>
                      </span>
                      Podgląd
                    </router-link>
                    <a href="#" @click.prevent="showDeleteBox(user.id)" class="text-danger">
                      <span class="icon">
                        <i class="fi flaticon-trash"/>
                      </span>
                      Usuń
                    </a>
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

export default {
  name: "Users",
  components: { Widget },
  created() {
    this.getUsers();
  },
  computed: {
    ...mapState("users", ["usersList"])
  },
  methods: {
    ...mapActions("users", ["deleteUser", "getUsers"]),
    showDeleteBox(userId) {
      this.$bvModal.msgBoxConfirm("Na pewno chcesz usunąć użytkownika?", {
        title: "Usuń użytkownika",
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
            await this.deleteUser(userId);
            this.$toasted.info("Pomyślnie usunięto użytkownika", {
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

<style src="./Users.scss" lang="scss" scoped />

