<template>
  <div>
    <header class="portadaHeader"></header>
    <v-row>
      <v-col cols="6">
        <Grafico></Grafico>
      </v-col>
      <v-col cols="6">

      </v-col>
    </v-row>
  </div>
</template>
<script>
import Grafico from "./Grafico.vue";
export default {
  name: "portada",
  components: {
    Grafico,
  },
};
</script>
<style>
@import "../assets/css/portada.css";
</style>