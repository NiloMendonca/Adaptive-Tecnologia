<template>
  <section>
    <pfe-card color="darker" border>
      <img
        alt="From https://picsum.photos/"
        overflow="left right top"
        src="https://picsum.photos/id/1019/300/200">
      <p>
        This is the light pfe-card and
        <a href="#">a link</a>.
        <pfe-badge aria-label="2 unread messages" number="6">6</pfe-badge>
      </p>
      
      <p>
                      Leverage agile frameworks to provide a robust synopsis for high
                      level overviews. Iterative approaches to corporate strategy
                      foster collaborative thinking to further the overall value
                      proposition.
      </p>
      <p>
                      Organically grow the holistic world view of disruptive
                      innovation via workplace diversity and empowerment.
      </p>
      <pfe-cta>
        <template slot:pfe-card--footer>
          <a href="#">Learn more</a>
        </template>
      </pfe-cta>
    </pfe-card>
  </section>
</template>

<script>
import "@patternfly/pfe-card";

export default {
  name: "Card",
  data() {
    return {
      email: '',
    }
  },
  mounted(){
  },
  methods: {
    logout(){
      this.token = '';
      this.email = '';
    }
  },
}
</script>

<style scoped>
</style>