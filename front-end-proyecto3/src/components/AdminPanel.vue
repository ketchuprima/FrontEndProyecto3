<template>
  <v-row>
    <v-col cols="12">
      <h1 class="titleAdmin">Panel de administrador</h1>
    </v-col>
    <v-col cols="12">
      <ListaOfertas
        v-if="listaOfertas!=null"
        :ofertas="listaOfertas"
        v-on:recargarPagina="getOfertas"
      ></ListaOfertas>
      <div v-else> Manolo</div>
    </v-col>
  </v-row>
</template>
<script>
import ListaOfertas from "./ListaOfertas";
import axios from "axios";

export default {
  name: "AdminPanel",
  components: {
    ListaOfertas,
  },
  data() {
    return {
      listaOfertas: null,
    };
  },
  methods: {
    async getOfertas() {
      let res = await axios.get("http://localhost:8080/ofertes/perValidar");

      this.listaOfertas = res.data;
      if(this.listaOfertas[0].descripcio==null)
        this.listaOfertas=null
    },
  },
  mounted() {
    this.getOfertas();
  },
};
</script>