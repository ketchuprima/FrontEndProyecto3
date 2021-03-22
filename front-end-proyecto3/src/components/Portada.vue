<template>
  <div class="portada">
    <header class="portadaHeader">
    <v-btn color="blue" tile x-large @click="modalEmpresa = !modalEmpresa">Registra tu empresa</v-btn>
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
                <ModalEmpresa v-on:cerrarModal="cerrarModal" :dialog="modalEmpresa"></ModalEmpresa>

        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Grafico from "./Grafico.vue";
import Tabla from "./Tabla.vue"
import ModalEmpresa from "./AuthenticationEmpresaModal"
export default {
  name: "portada",
  components: {
    Grafico,
    Tabla,
    ModalEmpresa
      },
  data(){
    return{
      dialog:false,
      modalEmpresa:false
    }
  },
    created() {
    if (localStorage.getItem("accessToken") != null) {
      this.$router.push("/home");
    }
  },
  methods:{
    cerrarModal(){
      this.modalEmpresa=false
    }
  }
};
</script>
<style>
@import "../assets/css/portada.css";
</style>