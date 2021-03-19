<template>
  <div class="flexible">
    <v-row
      ><v-col cols="12" v-for="oferta in ofertas" :key="oferta.id">
        <v-card class="mx-auto tarjeta" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="flexcard">
                <div @click="abrirOferta(oferta)">
                  <v-img
                    class="foto"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="220"
                    max-width="220"
                    src="https://picsum.photos/id/11/500/300"
                  ></v-img>
                </div>
                <div class="texto" @click="abrirOferta(oferta)">
                  <v-list-item-title class="titulo">{{
                    oferta.titol
                  }}</v-list-item-title>
                  <v-list-item class="ubicacio"
                    ><p>
                      {{ oferta.ubicacio }} | {{ oferta.data }}
                    </p></v-list-item
                  >
                  <v-list-item class="descripcion">{{
                    oferta.descripcio
                  }}</v-list-item>
                </div>
                <v-btn color="blue" @click="clickCandidaturas(oferta)" x-small
                  >Candidaturas</v-btn
                >
                <div style="display: flex">
                  <v-btn color="success" @click="aceptar(oferta)" x-small
                    >Aceptar</v-btn
                  >
                  <v-btn color="error" @click="rechazar(oferta)" x-small
                    >Rechazar</v-btn
                  >
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <ModalVerOferta
      :check="modalOferta"
      :idOferta="idOferta"
      v-on:cerrarOferta="cerrarOferta"
      v-on:modificarOferta="modificarOferta"
    ></ModalVerOferta>
    <ModalCandidatos
      :modal="modalCandidatura"
      :idOferta="idOferta"
      v-on:cerrarCandidatos="cerrarCandidatos"
    >
    </ModalCandidatos>
  </div>
</template>
<script>
import ModalCandidatos from "./ModalCandidatos.vue";
import ModalVerOferta from "./ModalVerOferta.vue";
export default {
  name: "listaOfertas",
  components: {
    ModalVerOferta,
    ModalCandidatos,
  },
  data() {
    return {
      ofertas: [
        {
          id: 1,
          titol: "Cafetero",
          descripcio: "pedazo de trabajo jamau",
          ubicacio: "Barcelona",
          estat: "publicada",
          data: "5 Enero 2015",
        },
        {
          id: 2,
          titol: "Barredor",
          descripcio: "pedazo de trabajo premo",
          ubicacio: "Barcelona",
          estat: "publicada",
          data: "5 Enero 2015",
        },
        {
          id: 3,
          titol: "Pargu",
          descripcio:
            "pedazo de xdd idjbhogsdbghbdohbgdsbgosdb hfogbsdhgb bodhbgosdhog odsbohbodshgodsfghidbsiohbdisoboidsbh",
          ubicacio: "Barcelona",
          estat: "publicada",
          data: "5 Enero 2015",
        },
        {
          id: 4,
          titol: "No me trolees",
          descripcio:
            "pedazo de xdd idjbhogsdbghbdohbgdsbgosdb hfogbsdhgb bodhbgosdhog odsbohbodshgodsfghidbsiohbdisoboidsbh",
          ubicacio: "Madrid",
          estat: "publicada",
          data: "5 Enero 2015",
        },
      ],
      modalOferta: false,
      modalCandidatura: false,
      idOferta: null,
    };
  },
  mounted() {
    this.metodo();
  },
  methods: {
    metodo() {
      console.log(this.ofertas);
    },
    abrirOferta(oferta) {
      this.modalOferta = true;
      this.idOferta = oferta.id;
    },
    cerrarOferta() {
      this.modalOferta = false;
    },
    cerrarCandidatos() {
      this.modalCandidatura = false;
    },
    clickCandidaturas(oferta) {
      this.modalCandidatura = true;
      this.idOferta = oferta.id;
    },
    aceptar(oferta) {
      console.log("aceptar" + oferta);
    },
    rechazar(oferta) {
      console.log("rechazar" + oferta);
    },
    modificarOferta(idOferta) {
      this.modalOferta=false;
      this.$emit("modificarOferta", idOferta)
    },
  },
};
</script>