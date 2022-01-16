<template>
  <section>
    <h1>Encurtador de URL</h1><br/>
    <input class="inputUrl" type="text" v-model="inputUrl" placeholder="Digite aqui a URL"/><br/>
    <pfe-button size="large">
      <button @click="getShortUrl()" :disabled="!inputUrl">Encurtar</button>
    </pfe-button>
    <h3 class="outputUrl outputUrlValid" @click="getUrl(outputUrl)" v-if="outputUrl">http://localhost:3000/{{outputUrl}}</h3>
    <h3 class="outputUrl outputUrlInvalid" v-if="!outputUrl">http://localhost:3000/</h3>
    <pf-alert v-if="showToast" type="success">URL encurtada com sucesso!</pf-alert>
  </section>
</template>

<script>
import api from "../http/api";

import "@patternfly/pfe-button";

import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js";
import "patternfly/dist/css/patternfly.css";
import "patternfly/dist/css/patternfly-additions.css";
import "patternfly-webcomponents/dist/css/patternfly-webcomponents.css";
import "patternfly-webcomponents/dist/js/pf-alert.js";

export default {
  name: "ShortUrl",
  components: {
  },
  data() {
    return {
      inputUrl: 'https://',
      outputUrl: '',
      showToast: false,
    }
  },
  methods: {
    callToast(){
      this.showToast = true;
      setTimeout(() => this.showToast = false, 4500);
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
    getShortUrl() {
      const data = {
        "url": this.inputUrl,
        "login": localStorage.getItem('email')
      };
      const that = this;

      api.getShortUrl(data)
        .then(function (response) {
          that.inputUrl = 'https://';
          that.outputUrl = response.data.code;
          that.callToast();
          that.$emit('getAllUrls'); 
        })
        .catch(function (err) {
          that.outputUrl = '';
          console.log(err);
        });
    },
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
        pf-alert {
          position: fixed;
          top: 10px;
          left: 50%;
          right: 10px;
          z-index: 100;
        }
        section {
          margin: 10px;
        }
        h1 {
          font-size: 30px;
        }
        pfe-button {
          margin: 8px;
          --pfe-button--BorderRadius: 40px;
        }
        .inputUrl {
          width: 500px;
          height: 60px;
          border-radius: 30px;
          border: 1px solid #293141;
          font-size: 25px;
          padding: 5px 15px 0px 15px;
        }
        .outputUrl {
          border-radius: 60px;
          padding: 10px;
          width: 300px;
          margin: 0 auto;
        }
        .outputUrlValid {
          background-color: rgba(119,221,119,.2);
          cursor: pointer;
        }
        .outputUrlInvalid {
          background-color: rgba(200,200,200,.2);
        }
</style>