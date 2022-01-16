<template>
  <section>
    <pfe-card color="darker" border>
      <p>
        {{url}}
        <pfe-badge state="info" :number="hits">{{hits}}</pfe-badge>
      </p>
      <p class="clickable" @click="getUrl()">http://localhost:3000/{{code}}</p>
      <pfe-button variant="tertiary" v-if="type == 'owner'">
        <button class="btnDel" @click="del()">Deletar</button>
      </pfe-button>
    </pfe-card>
  </section>
</template>

<script>

  // <pfe-badge :number="hits">{{hits}}</pfe-badge>
  
  //     <pfe-button variant="danger" v-if="type == 'owner'">
  //       <button class="btnDel" @click="del()">Deletar</button>
  //     </pfe-button>

  //     <template slot:pfe-card--footer>
  //       <pfe-cta>
  //         <p @click="getUrl()">http://localhost:3000/{{code}}</p>
  //       </pfe-cta>
  //     </template>
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
    text-align: center;
    font-size: 14px;
    border-radius: 8px;
  }
  pfe-badge {
    position: absolute;
    right: 3px;
    top: 3px;
  }
  pfe-button {
    --pfe-button--BackgroundColor: #fff;
    --pfe-button--BorderRadius: 8px;
    --pfe-button--BackgroundColor--hover: #ddd;
  }
  .clickable {
    cursor: pointer;
    font-weight: bolder;
  }
  .clickable:hover {
    color: #ddd;
  }
</style>