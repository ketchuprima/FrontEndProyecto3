<template>
  <v-row>
    <v-col cols="12">
      <h1 class="titleAdmin">Panel de administrador</h1>
    </v-col>
    <v-col cols="12">
      <ListaOfertas
        v-if="listaOfertas.length != 0"
        :ofertas="listaOfertas"
        v-on:recargarPagina="getOfertas"
        v-on:modificarOferta="modificarOferta"
      ></ListaOfertas>
      <div v-else>
        <span>No hay ofertas para validar</span>
      </div>
    </v-col>
    <ModalCrearOferta
      :modo="modo"
      :idOferta="idOferta"
      v-on:crearOferta="cerrarModal()"
    ></ModalCrearOferta>
  </v-row>
</template>
<script>
import ListaOfertas from "./ListaOfertas";
import axios from "axios";
import ModalCrearOferta from "./ModalCrearOferta";

export default {
  name: "AdminPanel",
  components: {
    ListaOfertas,
    ModalCrearOferta
  },
  data() {
    return {
      listaOfertas: null,
      idOferta:null,
      modo:null,
    };
  },
  methods: {
        cerrarModal() {
      this.crearOferta = false;
    },
    async getOfertas() {
      let res = await axios.get("http://localhost:8080/ofertes/perValidar");

      this.listaOfertas = res.data;
      if(this.listaOfertas ==null)
        this.listaOfertas=null
    },
    modificarOferta(idOferta) {
      this.crearOferta = true;
      this.modo = 2;
      this.idOferta = idOferta;
      console.log(idOferta + "modo" + this.modo);
    }
  },
  mounted() {
    this.getOfertas();
  },
};
</script>