<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>TU JESTEŚ</b-breadcrumb-item>
      <b-breadcrumb-item active>Lista serwerów</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">
      Lista <span class="fw-semi-bold">serwerów</span> -
      <router-link to="/app/servers/add">
        Dodaj nowy serwer
      </router-link>
    </h2>
    <b-row>
      <b-col>
        <Widget>
          <p>Znajdziesz tutaj listę wszystkich serwerów w systemie.</p>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nazwa</th>
                  <th>GUID</th>
                  <th>Hasło</th>
                  <th>Region</th>
                  <th>Gracze</th>
                  <th>IP</th>
                  <th>Rankingowy</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody v-if="this.serverList">
                <tr v-for="(server, index) in this.serverList" :key="`server_table_row_${index}`">
                  <td>{{ server.id }}</td>
                  <td>{{ server.name }}</td>
                  <td>{{ server.guid }}</td>
                  <td>{{ server.password ? server.password : "brak" }}</td>
                  <td>{{ regionCodeToName(server.region) }}</td>
                  <td>{{ server.numberOfCurrentPlayers }} / {{ server.capacity }}</td>
                  <td>{{ server.ip }}</td>
                  <td>
                    <span class="icon">
                      <i class="fi flaticon-database" :class="server.ranked ? 'text-success' : 'text-danger'" />
                    </span>
                  </td>
                  <td>
                    <router-link :to="`/app/servers/view/${server.id}`" class="text-info">
                      <span class="icon">
                        <i class="fi flaticon-binoculars"/>
                      </span>
                      Podgląd
                    </router-link>
                    <a href="#" @click.prevent="showDeleteBox(server.id)" class="text-danger">
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
import { regionCodeToName } from "@/utils";

export default {
  name: "Servers",
  components: { Widget },
  created() {
    this.getServers();
  },
  computed: {
    ...mapState("servers", ["serverList"])
  },
  methods: {
    ...mapActions("servers", ["deleteServer", "getServers"]),
    regionCodeToName,
    showDeleteBox(serverId) {
      this.$bvModal.msgBoxConfirm("Na pewno chcesz usunąć server?", {
        title: "Usuń server",
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
                await this.deleteServer(serverId);
                this.$toasted.info("Pomyślnie usunięto server", {
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

<style src="./Servers.scss" lang="scss" scoped />

