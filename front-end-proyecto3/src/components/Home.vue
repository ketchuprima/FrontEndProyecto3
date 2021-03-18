<template>
  <v-container>
    <v-text-field
      v-model="buscador"
      :append-icon="'search'"
      label="Buscador de ofertas"
      @click="buscar()"
    ></v-text-field>
    <v-row>
      <v-icon>fas fa-search</v-icon>
    </v-row>

    <v-row>
      <v-col cols="3">
        <Filtros></Filtros>
      </v-col>
      <v-col>
        <ListaOfertas></ListaOfertas>
      </v-col>
    </v-row>

    <ModalCrearOferta
    :crearOferta="crearOferta"
    v-on:crearOferta="cerrarModal()"
    ></ModalCrearOferta>
    
    <v-card-text
      v-if="this.$route.name == 'home'"
      style="height: 100px; position: relative"
    >
      <v-btn @click="crearOferta = !crearOferta" v-show="!hidden" color="blue" dark absolute top right fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-text>
  </v-container>
</template>
<script>
import ModalCrearOferta from './ModalCrearOferta.vue'
import ListaOfertas from "./ListaOfertas.vue";
import Filtros from "./Filtros.vue";
export default {
  name: "Home",
  components: {
    ListaOfertas,
    Filtros,
    ModalCrearOferta
  },
  data() {
    return {
      crearOferta: false,
    };
  },
  methods:{
      cerrarModal(){
          this.crearOferta=false
      }
  }
};
</script>
<style>
@import "../assets/css/home.css";
</style>