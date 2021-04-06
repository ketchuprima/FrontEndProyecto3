<template>
  <v-row class="flexible" v-if="ofertas.length != 0"
    ><v-col cols="12" v-for="oferta in ofertas" :key="oferta.id">
      <!--v-bind:class="{nuevo: oferta.antiguedad<15,
            antiguo: oferta.antiguedad>15}" -->
      <v-card class="mx-auto tarjeta" outlined @click="abrirOferta(oferta)">
        <v-list-item three-line>
          <v-list-item-content>
            <v-row>
              <v-col cols="2">
                <div>
                  <v-img
                    class="foto"
                    min-width="100%"
                    min-height="100%"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-width="100%"
                    max-height="100%"
                    src="https://picsum.photos/id/11/500/300"
                  ></v-img>
                </div>
                <div></div>
              </v-col>
              <v-col cols="10" class="margen">
                <v-card-text class="texto" style="height: 100%">
                  <v-list-item class="titulo"><span style="width: 100%">{{ oferta.titol }}</span> <v-icon class="icon" v-if="oferta.antiguedad < 15">{{ newIcon }}</v-icon></v-list-item>
                  <v-list-item class="ubicacio">
                    <div>
                      <p>
                        {{ oferta.empresa.nom }}, {{ oferta.ubicacio }} |
                        {{ oferta.data_de_publicacio.split(" ")[0] }} |
                        {{oferta.categoria.nom}}
                      </p>
                      <div v-if="admin == true">
                        {{ oferta.empresa.correu }}
                      </div>
                    </div></v-list-item
                  >
                  <v-list-item class="descripcion">{{
                     oferta.descripcio
                  }}</v-list-item>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" style="display: flex; align-items: flex-start">
                <v-btn v-if="oferta.participado" x-small disabled depressed> Inscrito </v-btn>
              </v-col>
              <v-col
                cols="9"
                style="
                  display: flex;
                  align-items: flex-end;
                  justify-content: flex-end;
                "
              >
                <v-btn
                  color="blue"
                  v-if="adminPanel == false && admin == true"
                  @click="clickCandidaturas(oferta)"
                  tile
                  medium
                  depressed
                >
                  <span class="textColorWhite">Candidaturas</span></v-btn
                >
                <div class="botones">
                  <v-btn
                    color="primary"
                    class="aceptar"
                    v-if="adminPanel == true"
                    @click="aceptar(oferta.id)"
                    dark
                    tile
                    >Aceptar
                    <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
                  </v-btn>
                  <v-divider vertical></v-divider>
                  <v-btn
                    color="red"
                    class="rechazar"
                    v-if="adminPanel == true"
                    @click="rechazar(oferta.id)"
                    dark
                    tile
                    >Rechazar
                    <v-icon dark right>mdi-cancel</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <h1 v-show="false">{{prueba}}</h1>
      </v-card>
    </v-col>
    <ModalVerOferta
      v-if="modalOferta"
      :check="modalOferta"
      :idOferta="idOferta"
      :admin="admin"
      :inscrito="inscrito"
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
  </v-row>
  <span v-else>No hay ofertas con estos filtros</span>
</template>
<script>
import ModalCandidatos from "./ModalCandidatos.vue";
import ModalVerOferta from "./ModalVerOferta.vue";
import { mdiNewBox } from "@mdi/js";
import axios from "axios";
export default {
  name: "listaOfertas",
  components: {
    ModalVerOferta,
    ModalCandidatos,
  },
  props: ["ofertas"],
  data() {
    return {
      modalOferta: false,
      modalCandidatura: false,
      idOferta: null,
      adminPanel: false,
      admin: false,
      inscrito: false,
      newIcon: mdiNewBox,
      prueba: 0
    };
  },
  updated() {
    this.checkUser();
    this.getAntiguedad();
    if (this.$route.name == "adminPanel") this.adminPanel = true;
  },
  mounted(){
    this.prueba++;
  },
  methods: {
    abrirOferta(oferta) {
      if(!this.modalCandidatura){
        this.modalOferta = true;
        this.idOferta = oferta.id;
        this.inscrito = !oferta.participado;
      }
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
      let res = await axios.put(
        "http://localhost:8080/ofertes/actualizarEstado/" + idOferta
      );

      if (res.data.message == "ok") this.$emit("recargarPagina");
    },
    async rechazar(idOferta) {
      let res = await axios.delete(
        "http://localhost:8080/ofertes/eliminar/" + idOferta
      );

      if (res.data.message == "ok") this.$emit("recargarPagina");
    },
    modificarOferta(idOferta) {
      this.modalOferta = false;
      this.$emit("modificarOferta", idOferta);
    },
    getAntiguedad() {
      var date = new Date();
      var date2 = new Date();
      for (let i = 0; i < this.ofertas.length; i++) {
        date2 = new Date(this.ofertas[i].data_de_publicacio);
        this.ofertas[i].antiguedad = date.getDate() - date2.getDate();
      }
    },
    async checkUser() {
      let res = await axios.get("http://localhost:8080/users/getUser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      for (let i = 0; i < res.data.roles.length; i++) {
        if (res.data.roles[i].nombre == "ROLE_ADMIN") {
          this.admin = true;
        }
      }

      this.getCandidato(res.data.id);
    },
    async getCandidato(idUser) {
      let res = await axios.get("http://localhost:8080/candidats/" + idUser);

      for (let i = 0; i < this.ofertas.length; i++) {
        for (let j = 0; j < this.ofertas[i].candidats.length; j++) {
          if (this.ofertas[i].candidats[j].id == res.data.id)
            this.ofertas[i].participado = true;
          else this.ofertas[i].participado = false;
        }
      }

      this.prueba++;
      
    },
  },
};
</script>
<style>
@import "../assets/css/home.css";
</style>