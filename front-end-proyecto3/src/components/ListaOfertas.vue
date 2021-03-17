<template>
  <div>
    <v-card v-for="oferta in ofertas" :key="oferta.id" class="mx-auto" max-width="344" outlined>
     
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{oferta.titol}}</div>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text> Button </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "listaOfertas",
  data() {
    return {
      ofertas: [
        {
          id: 1,
          titol: "Cafetero",
          descripcio: "pedazo de trabajo jamau",
          ubicacio: "Barcelona",
          estat: "publicada",
        },
        {
          id: 2,
          titol: "Barredor",
          descripcio: "pedazo de trabajo premo",
          ubicacio: "Barcelona",
          estat: "publicada",
        },
        {
          id: 1,
          titol: "parguelillas",
          descripcio: "pedazo de xdd",
          ubicacio: "Madrid",
          estat: "publicada",
        },
      ],
    };
  },
  mounted() {
    this.metodo();
  },
  methods: {
    metodo() {
      console.log(this.ofertas);
    },
  },
};
</script>