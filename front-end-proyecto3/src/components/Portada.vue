<template>
  <div class="portada">
    <header class="portadaHeader">
    <v-btn color="blue" tile x-large>Eres empresa?</v-btn>
    </header>
    <v-row>
      <v-col class="column" sm="12" md="6" style="padding-right:0px;">
        <div class="containerGrafico">
            <h2 class="titleContainer">Grafico de las ofertas</h2>
            <Grafico></Grafico>
        </div>
      </v-col>
      <v-col class="column" sm="12" md="6" style="padding-left:0px;">
        <div class="containerGrafico">
            <h2 class="titleContainer">Numero de las ofertas</h2>
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
  data(){
    return{
      dialog:false
    }
  }
};
</script>
<style>
@import "../assets/css/portada.css";
</style>