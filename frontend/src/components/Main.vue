<template>
  <section>
    <v-container class="my-5">
      <v-layout row wrap justify-center>
        <v-flex xs12 md3 class="center">
          <Profile @login="getUser()" @logout="logout()"/>
        </v-flex>

        <v-flex xs12 md9 class="center">
          <ShortUrl @getAllUrls="getAllUrls()"/>
          
          <div class="left">
            <pfe-accordion v-if="token != ''">
              <pfe-accordion-header>
                <h3>Minhas URLs</h3>
              </pfe-accordion-header>
              <pfe-accordion-panel>
                <span v-for="(item, i) of listUrls" :key="item.id" v-bind:value="i">
                  <Card />
                </span>
              </pfe-accordion-panel>
            </pfe-accordion>

            <pfe-accordion>
              <pfe-accordion-header>
                <h3>URLs cadastradas</h3>
              </pfe-accordion-header>
              <pfe-accordion-panel>
                <span v-for="(item, i) of listUrls" :key="item.id" v-bind:value="i">
                  <Card />
                </span>
              </pfe-accordion-panel>
            </pfe-accordion>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import api from "../http/api";
import Profile from "./Profile";
import ShortUrl from "./ShortUrl";
import Card from "./Card";

import "@patternfly/pfe-accordion";

export default {
  name: "Main",
  components: {
    Profile,
    ShortUrl,
    Card,
  },
  data() {
    return {
      email: '',
      token: '',
      listUrls: [],
    }
  },
  mounted(){
    this.getAllUrls();
    this.getUser();
  },
  methods: {
    logout(){
      this.token = '';
      this.email = '';
    },
    deleteUrl(item) {
      const that = this;
      const data = {
        "id": item.id,
        "login": this.email
      };

      api.deleteUrl(data)
        .then(function () {
          that.getAllUrls();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getUrl(code) {
      const that = this;
      api.getUrl(code)
        .then(function (response) {
          window.open(response.data, '_blank');
          that.getAllUrls();
        })
        .catch(function (err) {
          console.log(err);
        });
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
    getAllUrls() {
      const that = this;
      api.getAllUrls()
        .then(function (response) {
          that.listUrls = response.data;
          that.sortUrl();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    sortUrl(){
      this.listUrls.sort(function(a,b) {
        if (a.hits > b.hits) return -1;
        if (a.hits < b.hits) return 1;
        return 0;
      });
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
    .left {
      text-align: left !important;
    }
</style>