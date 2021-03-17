<template>
  <div>
    <v-card v-for="oferta in ofertas" :key="oferta.id" class="mx-auto tarjeta" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="flex">
            <div class="img">
              <v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="190" max-width="190" src="https://picsum.photos/id/11/500/300"></v-img>
            </div>
            <div>
              <v-list-item-title class="titulo">{{oferta.titol}}</v-list-item-title>
              <v-list-item class="subtitulo">{{oferta.descripcio}}</v-list-item>
              <v-list-item class="ubicacio">{{oferta.ubicacio}}</v-list-item>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
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
          id: 3,
          titol: "Pargu",
          descripcio: "pedazo de xdd",
          ubicacio: "Barcelona",
          estat: "publicada",
        },
        {
          id: 4,
          titol: "No me trolees",
          descripcio: "pedazo de troll",
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