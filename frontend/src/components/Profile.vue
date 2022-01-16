<template>
  <section>
    <span v-if="!token">
      <input class="inputUser inputEmail" type="text" v-model="email" placeholder="Email"/><br/>
      <input class="inputUser inputPassword" type="password" v-model="password" placeholder="Senha"/><br/>
      <pfe-button>
        <button @click="login()">Login</button>
      </pfe-button>
      <pfe-button variant="secondary">
        <button @click="signup()">Cadastro</button>
      </pfe-button>

      <pf-alert v-if="showToast" type="warning">Erro na requisição!</pf-alert>
    </span>
    <span v-if="token">
      <pfe-avatar name="Eleanore Stillwagon"></pfe-avatar>
      <p class="center email">{{email}}</p>
      <pfe-button variant="tertiary">
        <button @click="logout()">Sair</button>
      </pfe-button>
    </span>
  </section>
</template>

<script>
import api from "../http/api";

import "@patternfly/pfe-avatar";

import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js";
import "patternfly/dist/css/patternfly.css";
import "patternfly/dist/css/patternfly-additions.css";
import "patternfly-webcomponents/dist/css/patternfly-webcomponents.css";
import "patternfly-webcomponents/dist/js/pf-alert.js";

export default {
  name: "Profile",
  data() {
    return {
      email: '',
      password: '',
      token: '',
      showToast: false,
    }
  },
  mounted(){
    this.getUser();
  },
  methods: {
    callToast(){
      this.showToast = true;
      setTimeout(() => this.showToast = false, 4500);
    },
    logout(){
      localStorage.setItem('accessToken', '');
      localStorage.setItem('email', '');
      this.token = '';
      this.email = '';
      this.$emit('logout');
    },
    getUser() {
      const that = this;
      const data = {
        "login": localStorage.getItem('email')
      };
      api.getUser(data)
        .then(function (response) {
          that.email = response.data;
          that.token = localStorage.getItem('accessToken');
        })
        .catch(function (err) {
          that.token = '';
          console.log(err);
        });
    },
    login() {
      if(!this.email || !this.password){
        this.callToast();
        return;
      }
      const data = {
        "login": this.email,
        "password": this.password
      };
      const that = this;

      api.login(data)
        .then(function (response) {
          that.token = response.data.token;
          that.changeContext(that);
        })
        .catch(function (err) {
          console.log(err);
          that.callToast();
        });
    },
    signup() {
      if(!this.email || !this.password){
        this.callToast();
        return;
      }
      const data = {
        "login": this.email,
        "password": this.password
      };
      const that = this;

      api.signup(data)
        .then(function (response) {
          that.token = response.data.token;
          that.changeContext(that);
        })
        .catch(function (err) {
          console.log(err);
          that.callToast();
        });
    },
    changeContext(that){
      that.password = '';
      localStorage.setItem('accessToken', that.token);
      localStorage.setItem('email', that.email);
      that.$emit('login');      
    }
  },
}
</script>

<style scoped>
body {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
  -moz-text-size-adjust: none;
  color: #293141;
}
    .center {
      text-align: center !important;
    }
        pf-alert {
          position: fixed;
          top: 10px;
          left: 50%;
          right: 10px;
          z-index: 100;
        }
        section {
          min-width: 230px;
          margin: 10px;
        }
        pfe-avatar {
          width: 80px;
          height: 80px;
          left: 50%;
          margin-left: -40px;
          position: relative;
          margin-bottom: 15px;
        }
        .inputUser {
          border-radius: 3px;
          border: 1px solid #293141;
          margin: 5px;
          padding: 4px;
        }
        pfe-button {
          margin: 5px !important;
        }
</style>