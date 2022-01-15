<template>
  <section>
    <pfe-card color="darker" border>
      <pfe-badge :number="hits">{{hits}}</pfe-badge>
      <p>
        {{url}}
      </p>
      <pfe-cta>
        <p @click="getUrl()">http://localhost:3000/{{code}}</p>
      </pfe-cta>

      <br>

      <pfe-cta v-if="type == 'owner'">
        <template slot:pfe-card--footer>
          <pfe-button variant="danger">
            <button class="btnDel" @click="del()">Deletar</button>
          </pfe-button>
        </template>
      </pfe-cta>
    </pfe-card>
  </section>
</template>

<script>
import "@patternfly/pfe-card";
import "@patternfly/pfe-badge";
import "@patternfly/pfe-cta";
import "@patternfly/pfe-button";

export default {
  name: "Card",
  props: {
    code: String,
    url: String,
    id: Number,
    hits: Number,
    type: String,
  },
  methods: {
    del(){
      this.$emit('deleteUrl');
    },
    getUrl(){
      this.$emit('getUrl');
    }
  },
}
</script>

<style scoped>
  pfe-card {
    padding: 10px;
  }
</style>