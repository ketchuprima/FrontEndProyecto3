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
                      {{ oferta.ubicacio }} | {{ oferta.data_de_publicacio.split(" ")[0] }}
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
                  <v-btn color="success" @click="aceptar(oferta.id)" x-small
                    >Aceptar</v-btn
                  >
                  <v-btn color="error" @click="rechazar(oferta.id)" x-small
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
      v-if="modalOferta"
      :check="modalOferta"
      :idOferta="idOferta"
      v-on:cerrarOferta="cerrarOferta"
      v-on:modificarOferta="modificarOferta"
    ></ModalVerOferta>
    <ModalCandidatos
      v-if="modalCandidatura"
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
import axios from "axios";
export default {
  name: "listaOfertas",
  components: {
    ModalVerOferta,
    ModalCandidatos,
  },
  props:["ofertas"],
  data() {
    return {
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
    async aceptar(idOferta) {
      let res = await axios.put("http://localhost:8080/ofertes/actualizarEstado/" + idOferta);
      
      if(res.data.message == "ok")
        this.$emit("recargarPagina");
      else
        alert(res.data.message);
        
    },
    async rechazar(idOferta) {
      let res = await axios.delete("http://localhost:8080/ofertes/eliminar/" + idOferta);
      
      if(res.data.message == "ok")
        this.$emit("recargarPagina");
      else
        alert(res.data.message);
    },
    modificarOferta(idOferta) {
      this.modalOferta=false;
      this.$emit("modificarOferta", idOferta)
    },
  },
};
</script>