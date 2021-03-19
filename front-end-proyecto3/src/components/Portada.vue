<template>
  <div>
    <header class="portadaHeader">
    <v-btn color="blue" tile x-large>Eres empresa?</v-btn>
    </header>
    <v-row>
      <v-col class="column" cols="6">
        <div class="containerGrafico">
            <h3 class="titleContainer">Grafico de las ofertas</h3>
            <Grafico></Grafico>
        </div>
      </v-col>
      <v-col class="column" cols="5">
        <div class="containerGrafico">
            <h3 class="titleContainer">Numero de las ofertas</h3>
            <Tabla></Tabla>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Grafico from "./Grafico.vue";
import Tabla from "./Tabla.vue"
export default {
  name: "portada",
  components: {
    Grafico,
    Tabla
  },
};
</script>
<style>
@import "../assets/css/portada.css";
</style>