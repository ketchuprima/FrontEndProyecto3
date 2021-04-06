<template>
  <v-card class="filtrosCard" elevation="0" tile>
    <v-row class="rowFiltros rowGrey">
      <v-col cols="12">
        <v-text-field
          v-model="buscador"
          :append-icon="lupa"
          label="Buscador de ofertas"
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="6">
        <v-select
          v-model="categoria"
          :items="categorias"
          outlined
          label="Categoria"
        ></v-select>
      </v-col>
      <v-col sm="12" md="6">
        <v-select
          :items="ordenar"
          outlined
          v-model="ordenarValue"
          label="Ordenar por fecha"
        ></v-select>
      </v-col>
      <v-col sm="12" md="6">
        <v-text-field v-model="ciudad" label="Ciudad"></v-text-field>
      </v-col>
      <v-col sm="12" md="6">
        <v-text-field v-model="empresa" label="Empresa"></v-text-field>
      </v-col>
    </v-row>
    <v-row class="rowGrey">
      <v-col>
        <v-btn tile color="blue" @click="formatear()">
          <span class="textColorWhite">
          Formatear</span></v-btn>
      </v-col>
      <v-col>
        <v-btn tile color="blue" @click="filtrar()">
          <span class="textColorWhite">
          Filtrar
          </span></v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mdiMagnify } from '@mdi/js';
import axios from 'axios';
export default {
  name: "Filtros",
  mounted(){
    this.getCategorias();
  },
  data() {
    return {
      categorias: [],
      ordenar: ["Ascendente", "Descendente"],
      categoria: null,
      ordenarValue: null,
      ciudad: null,
      empresa: null,
      categoriasArray:null,
      buscador:null,
      idCategoria:null,
      idEmpresa:null,
      lupa:mdiMagnify
    };
  },
  methods: {
    formatear() {
      this.buscador = null;
      this.categoria = null;
      this.ciudad = null;
      this.empresa = null;
      this.ordenarValue = null;
      this.idCategoria =null;
      this.idEmpresa = null;
      this.$emit("formatear");
    },
    async filtrar(){
       for(let i=0;this.categoriasArray.length>i; i++){
        if(this.categoriasArray[i].nom==this.categoria)
          this.idCategoria=this.categoriasArray[i].id
      }
      let res = await axios.get("http://localhost:8080/empreses/"+this.empresa);
        
      if(this.ordenarValue!=null && this.ordenarValue=="Ascendente")
        this.ordenarValue="asc"
      else if(this.ordenarValue!=null && this.ordenarValue=="Descendente")
        this.ordenarValue="desc"

      if(res.data.message != null)
        this.$emit("filtrar",this.buscador,this.idCategoria, this.ciudad, 0, this.ordenarValue)
      else
        this.$emit("filtrar",this.buscador,this.idCategoria, this.ciudad, res.data.id, this.ordenarValue)
    },
    async getCategorias(){
      let res = await axios.get("http://localhost:8080/categories/");
      for(let i=0;res.data.length>i; i++){
        this.categorias.push(res.data[i].nom)
      }
      this.categoriasArray=res.data
    }
  },
};
</script>
<style>
@import "../assets/css/filtros.css";
</style>