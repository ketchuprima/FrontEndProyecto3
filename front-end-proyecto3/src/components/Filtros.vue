<template>
  <v-card class="filtrosCard" elevation="0" tile>
    <v-row class="rowFiltros rowGrey">
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
        <v-btn color="blue" @click="formatear()">Formatear</v-btn>
      </v-col>
      <v-col>
        <v-btn color="blue">Filtrar</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Filtros",
  data() {
    return {
      categorias: ["DAM", "DAW", "ASIX", "SMX"],
      ordenar: ["Ascendente", "Descendente"],
      categoria: null,
      ordenarValue: null,
      ciudad: null,
      empresa: null,
    };
  },
  methods: {
    formatear() {
      this.categoria = null;
      this.ordenar = null;
      this.ciudad = null;
      this.empresa = null;
    },
  },
};
</script>
<style>
@import "../assets/css/filtros.css";
</style>