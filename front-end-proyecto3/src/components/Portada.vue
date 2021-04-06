<template>
  <div class="portada">
    <header class="portadaHeader">
      <v-btn color="blue" tile x-large @click="modalEmpresa = !modalEmpresa"
        ><span class="textColorWhite"> Registra tu empresa</span></v-btn
      >
    </header>
    <v-row>
      <v-col class="column" sm="12" md="6" style="padding-right: 0px">
        <div class="containerGrafico">
          <h2 class="titleContainer textColorWhite">Gráfico de ofertas por categoría</h2>
          <Grafico
          :value="value"></Grafico>
        </div>
      </v-col>
      <v-col class="column" sm="12" md="6" style="padding-left: 0px">
        <div class="containerGrafico">
          <h2 class="titleContainer textColorWhite">Número de ofertas por categoría</h2>
          <Tabla
          :categorias="categorias"></Tabla>
          <ModalEmpresa
            v-on:cerrarModal="cerrarModal"
            :dialog="modalEmpresa"
          ></ModalEmpresa>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Grafico from "./Grafico.vue";
import Tabla from "./Tabla.vue";
import ModalEmpresa from "./AuthenticationEmpresaModal";
import axios from 'axios';
export default {
  name: "portada",
  components: {
    Grafico,
    Tabla,
    ModalEmpresa,
    
  },
  data() {
    return {
      dialog: false,
      modalEmpresa: false,
      value:[],
      categorias:null
    };
  },
  created() {
    if (localStorage.getItem("accessToken") != null) {
      this.$router.push("/home");
    }
          this.getStats();

  },
  methods: {
    cerrarModal() {
      this.modalEmpresa = false;
    },
    async getStats() {
      let res = await axios.get(
        "http://localhost:8080/ofertes/estadisticas/categorias"
      );

      this.value = [res.data.daw, res.data.dam, res.data.asix, res.data.smix];
      this.categorias=[{nombre:"DAW", cantidad: res.data.daw}, {nombre:"DAM", cantidad: res.data.dam}, {nombre:"ASIX", cantidad: res.data.asix}, {nombre:"SMX", cantidad: res.data.smix}]
    },
  },
};
</script>
<style>
@import "../assets/css/portada.css";
</style>