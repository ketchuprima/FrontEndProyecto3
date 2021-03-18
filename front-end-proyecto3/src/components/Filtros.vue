<template>
  <v-card class="filtrosCard">
    <v-row class="rowFiltros">
      <v-col cols="6">
        <v-select :items="categorias" outlined label="Categoria"></v-select>
      </v-col>
      <v-col cols="6">
        <v-select
          :items="ordenar"
          outlined
          label="Ordenar por fecha"
        ></v-select>
      </v-col>
      <v-col cols="6">
        <v-text-field label="Ciudad"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field label="Empresa"></v-text-field>
      </v-col>
    </v-row>
    <div class="containerBotonesFiltro">
      <v-btn>Formatear</v-btn>
      <v-spacer></v-spacer>
      <v-btn>Filtrar</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Filtros",
  data() {
    return {
      categorias: ["DAM", "DAW", "ASIX", "SMX"],
      ordenar: ["Ascendente", "Descendente"],
    };
  },
};
</script>
<style>
@import "../assets/css/filtros.css";
</style>