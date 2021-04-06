<template>
  <v-container>
    <v-row style="margin-top:3%;">
      <v-col cols="12" lg="4">
        <Filtros
        v-on:filtrar="filtrar" v-on:formatear="getOfertas"></Filtros>
      </v-col>
      <v-col cols="12" lg="8">
        <ListaOfertas
          :ofertas="listaOfertas"
          v-on:modificarOferta="modificarOferta"
          :contador="contador"
        ></ListaOfertas>
      </v-col>
    </v-row>

    <ModalCrearOferta
      :crearOferta="crearOferta"
      :modo="modo"
      :idOferta="idOferta"
      :idUsuario="idUsuario"
      :empresa="empresa"
      v-on:crearOferta="cerrarModal"
      v-on:cerrarModal="cerrarModalYRecargarOfertas"
    ></ModalCrearOferta>

    <v-card-text
      v-if="this.$route.name == 'home'"
      style="height: 100px; position: relative"
    >
      <v-btn
        v-if="isEmpresa"
        @click="
          crearOferta = !crearOferta;
          modo = 1;
        "
        v-show="!hidden"
        color="blue"
        dark
        absolute
        top
        right
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-text>
  </v-container>
</template>
<script>
import ModalCrearOferta from "./ModalCrearOferta.vue";
import ListaOfertas from "./ListaOfertas.vue";
import Filtros from "./Filtros.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    ListaOfertas,
    Filtros,
    ModalCrearOferta,
  },
  data() {
    return {
      crearOferta: false,
      buscador: false,
      modo: 0,
      listaOfertas: [],
      isEmpresa: false,
      empresa: null,
      idUsuario: 0,
      idOferta: 0,
      contador: 0
    };
  },
  methods: {
    async filtrar(buscador,categoria,ciudad,empresa,ordenarValue){
      if(empresa==0)empresa=null
      let res = await axios.get("http://localhost:8080/ofertes/filtros",{
        params:{
          categoria: categoria,
          ubicacio: ciudad,
          titol: buscador,
          empresa: empresa,
          order: ordenarValue
        }
      });
      this.listaOfertas=res.data;
      this.contador++;
    },
    cerrarModal() {
            console.log("me la suda soymanolo")

      this.crearOferta = false;
    },
    cerrarModalYRecargarOfertas(){
      this.crearOferta = false;
      this.getOfertas();
    },
    modificarOferta(idOferta) {
      this.crearOferta = true;
      this.modo = 2;
      this.idOferta = idOferta;
    },
    async getOfertas() {
      let res = await axios.get("http://localhost:8080/ofertes/");

      this.listaOfertas = res.data;
    },
    async getEmpresa() {
      let res = await axios.get(
        "http://localhost:8080/empreses/findByUser/" + this.idUsuario
      );

      this.empresa = res.data;
    },
    async checkUser() {
      let res = await axios.get("http://localhost:8080/users/getUser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });

      for (let i = 0; i < res.data.roles.length; i++) {
        if (res.data.roles[i].nombre == "ROLE_EMPRESA") {
          this.isEmpresa = true;
          this.idUsuario = res.data.id;
          this.getEmpresa();
        }
      }
    },
  },

  mounted() {
    this.checkUser();
    this.getOfertas();
  },
};
</script>
<style>
@import "../assets/css/home.css";
</style>