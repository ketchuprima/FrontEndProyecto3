<template>
  <div class="flexible">
    <v-row><v-col cols="12" v-for="oferta in ofertas" :key="oferta.id">
      <v-card class="mx-auto tarjeta" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="flexcard">
            <div>
              <v-img class="foto" lazy-src="https://picsum.photos/id/11/10/6" max-height="220" max-width="220" src="https://picsum.photos/id/11/500/300"></v-img>
            </div>
            <div class="texto">
              <v-list-item-title class="titulo">{{oferta.titol}}</v-list-item-title>
              <v-list-item class="ubicacio"><p>{{oferta.ubicacio}} | {{oferta.data}}</p></v-list-item>
              <v-list-item class="descripcion">{{oferta.descripcio}}</v-list-item>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-col>
  </v-row>  
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
          data: "5 Enero 2015"
        },
        {
          id: 2,
          titol: "Barredor",
          descripcio: "pedazo de trabajo premo",
          ubicacio: "Barcelona",
          estat: "publicada",
          data: "5 Enero 2015"
        },
        {
          id: 3,
          titol: "Pargu",
          descripcio: "pedazo de xdd idjbhogsdbghbdohbgdsbgosdb hfogbsdhgb bodhbgosdhog odsbohbodshgodsfghidbsiohbdisoboidsbh",
          ubicacio: "Barcelona",
          estat: "publicada",
          data: "5 Enero 2015"
        },
        {
          id: 4,
          titol: "No me trolees",
          descripcio: "pedazo de xdd idjbhogsdbghbdohbgdsbgosdb hfogbsdhgb bodhbgosdhog odsbohbodshgodsfghidbsiohbdisoboidsbh",
          ubicacio: "Madrid",
          estat: "publicada",
          data: "5 Enero 2015"
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