<template>
  <div class="auth-page">
    <b-container>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Battlefield Play4Free ACP</h3>" customHeader>
        <p class="widget-auth-info">
            Użyj adresu email w celu zalogowania się.
        </p>
        <form class="mt" @submit.prevent="handleLoginForm">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <b-form-group label="Email" label-for="email">
            <b-input-group class="input-group-no-border">
              <b-input-group-text slot="prepend"><i class="la la-user text-white"/></b-input-group-text>
              <input id="email"
                     ref="email"
                     class="form-control input-transparent pl-3"
                     type="email"
                     required
                     placeholder="Email"/>
            </b-input-group>
          </b-form-group>
          <b-form-group label="Hasło" label-for="password">
            <b-input-group class="input-group-no-border">
              <b-input-group-text slot="prepend"><i class="la la-lock text-white"/></b-input-group-text>
              <input id="password"
                     ref="password"
                     class="form-control input-transparent pl-3"
                     type="password"
                     required
                     placeholder="Hasło"/>
            </b-input-group>
          </b-form-group>
          <div class="bg-widget auth-widget-footer">
            <b-button type="submit" variant="danger" class="auth-btn mb-3" size="sm">
              <span class="auth-btn-circle">
                <i class="la la-caret-right"/>
              </span>
              Zaloguj
            </b-button>
          </div>
        </form>
      </Widget>
    </b-container>
    <footer class="auth-footer">
      Battlefield Play4Free Admin Panel - Made by <a href="https://github.com/piotrmoszkowicz" target="_blank">Piotr Moszkowicz</a>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Widget from "@/components/Widget/Widget";

export default {
  name: "LoginPage",
  components: { Widget },
  data() {
    return {
      errorMessage: null,
    };
  },
  computed: {
    ...mapState("user", ["authToken"])
  },
  methods: {
    ...mapActions("user", ["logIn"]),
    async handleLoginForm() {
      const email = this.$refs.email.value;
      const password = this.$refs.password.value;

      if (email.length !== 0 && password.length !== 0) {
        const loginResult = await this.logIn({ email, password });
        if (loginResult) {
          await this.$router.push("/app/dashboard");
        } else {
         this.errorMessage = "Błąd podczas logowania...";
        }
      }
    },
  },
  created() {
    if (this.authToken) {
      this.$router.push("/app/dashboard");
    }
  },
};
</script>
