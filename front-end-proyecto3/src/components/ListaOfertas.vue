<template>
  <div class="flexible">
    <v-row
      ><v-col cols="12" v-for="oferta in ofertas" :key="oferta.id" >
        <v-card class="mx-auto tarjeta" outlined v-bind:class="{nuevo: oferta.antiguedad<='15',
            antiguo: oferta.antiguedad>'15'}">
          <v-list-item three-line>
            <v-list-item-content>
              <div >
                <v-row  >
                  <v-col cols="2">
                    <div @click="abrirOferta(oferta)">
                      <v-img
                        class="foto"
                        lazy-src="https://picsum.photos/id/11/10/6"
                        min-height="150"
                        max-height="150"
                        min-width="150"
                        max-width="150"
                        src="https://picsum.photos/id/11/500/300"
                      ></v-img>
                    </div>
                  </v-col>
                  <v-col cols="10">
                    <div style="display: flex; height: 100%">
                      <div class="texto" @click="abrirOferta(oferta)">
                        <v-list-item-title class="titulo">{{
                          oferta.titol
                        }}</v-list-item-title>

                        <v-list-item class="ubicacio"
                          >
                          <div style="display:flex; flex-direction:column;">
                          <p>{{oferta.empresa.nom}}</p>
                          <p>
                            {{ oferta.ubicacio }} |
                            {{ oferta.data_de_publicacio.split(" ")[0] }}
                          </p>
                          
                          </div></v-list-item
                        >
                        <v-list-item class="descripcion">{{
                          oferta.descripcio
                        }}</v-list-item>
                      </div>
                      <div class="btnContainer">
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue"
                          v-if="adminPanel == false && admin == true"
                          @click="clickCandidaturas(oferta)"
                          tile
                          medium
                          depressed
                          > <z class="textColorWhite">Candidaturas</z></v-btn
                        >
                        <div style="display: flex">
                          <v-btn
                            color="primary"
                            style="margin-right: 2%"
                            v-if="adminPanel == true"
                            @click="aceptar(oferta.id)"
                            dark
                            tile
                            >Aceptar
                            <v-icon dark right>
                              mdi-checkbox-marked-circle
                            </v-icon>
                          </v-btn>
                          <v-divider vertical></v-divider>
                          <v-btn
                            color="red"
                            v-if="adminPanel == true"
                            @click="rechazar(oferta.id)"
                            dark
                            tile
                            >Rechazar
                            <v-icon dark right>mdi-cancel</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
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
  props: ["ofertas"],
  data() {
    return {
      modalOferta: false,
      modalCandidatura: false,
      idOferta: null,
      adminPanel: false,
      admin: false,
    };
  },
  mounted() {
    var date = new Date()
    var date2 = new Date()
    for(let i =0; i<this.ofertas.length;i++){
      date2 = new Date(this.ofertas[i].data_de_publicacio)
      this.ofertas[i].antiguedad=date.getDate()-date2.getDate()
    }
    console.log("ofertas")
    console.log(this.ofertas)
    this.checkUser();
  },
  updated() {
    if (this.$route.name == "adminPanel") this.adminPanel = true;
  },
  methods: {
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
      let res = await axios.put(
        "http://localhost:8080/ofertes/actualizarEstado/" + idOferta
      );

      if (res.data.message == "ok") this.$emit("recargarPagina");
      else alert(res.data.message);
    },
    async rechazar(idOferta) {
      let res = await axios.delete(
        "http://localhost:8080/ofertes/eliminar/" + idOferta
      );

      if (res.data.message == "ok") this.$emit("recargarPagina");
      else alert(res.data.message);
    },
    modificarOferta(idOferta) {
      this.modalOferta = false;
      this.$emit("modificarOferta", idOferta);
    },
    async checkUser() {
      let res = await axios.get("http://localhost:8080/users/getUser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      for (let i = 0; i < res.data.roles.length; i++) {
        if (res.data.roles[i].nombre == "ROLE_ADMIN") this.admin = true;
      }
    },
  },
};
</script>