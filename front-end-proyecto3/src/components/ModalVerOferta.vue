<template>
  <div class="text-xs-center">
    <v-dialog persistent v-model="check" id="modalOferta" width="800">
      <AlertError v-if="showError == true" :message="error"></AlertError>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <div class="tituloContainer">
            {{ oferta.titol }}
            <v-spacer></v-spacer>

            <v-btn icon @click="clickCancelar()"
              ><v-icon>{{ close }}</v-icon></v-btn
            >
          </div>
        </v-card-title>

        <div class="flex">
          <v-row style="margin: 0px">
            <v-col cols="4">
              <div>
                <v-img
                  class="img"
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-height="340"
                  max-width="340"
                  src="https://picsum.photos/id/11/500/300"
                ></v-img>
                <div class="empresa">
                  <v-icon style="margin-right: 10px">{{ empresa }}</v-icon>
                  {{ oferta.empresa.nom }}
                </div>
                <div class="empresa" v-if="admin == true">
                  <v-icon style="margin-right: 10px">{{ email }}</v-icon>
                  {{ oferta.empresa.correu }}
                </div>
                <div class="ubi">
                  <v-icon style="margin-right: 10px; margin-botton: 10px">{{
                    mapa
                  }}</v-icon>
                  {{ oferta.ubicacio }}
                </div>
                <div class="data">
                  <v-icon style="margin-right: 10px">{{ calendario }}</v-icon>
                  {{ oferta.data_de_publicacio.split(" ")[0] }}
                </div>
              </div>
            </v-col>
            <v-col cols="8" class="flex">
              <div class="desc">
                <h3 class="title" style="margin-bottom: 10px">Descripción</h3>

                {{ oferta.descripcio }}
              </div>
            </v-col>
          </v-row>
        </div>

        <v-divider class="separacion"></v-divider>

        <v-card-actions>
          <v-row style="margin: -8px">
            <v-col cols="6">
              <v-file-input
                dense
                v-show="inscrito != false"
                placeholder="Cargar curriculum"
                v-model="curriculum"
              ></v-file-input>
            </v-col>
            <v-col cols="3">
              <v-btn
                v-if="admin == true"
                block
                class="white--text boton"
                color="warning"
                tile
                @click="clickModificar()"
              >
                <p class="textColorWhite">Modificar</p>
                <v-spacer></v-spacer>
                <v-icon>
                  {{ draw }}
                </v-icon></v-btn
              >
            </v-col>
            <v-col cols="3">
              <v-btn
                v-if="inscrito == false"
                block
                class="white--text boton"
                color="blue"
                tile
                disabled
              >
                <p class="textColorWhite">Inscrito</p></v-btn
              >
              <v-btn
                v-else
                block
                class="white--text boton"
                color="blue"
                tile
                @click="enviarCurriculum()"
              >
                <p class="textColorWhite">Inscribirse</p>
                <v-spacer></v-spacer>
                <v-icon>
                  {{ mdiDirections }}
                </v-icon></v-btn
              >
              <v-overlay :value="overlay" opacity="0.7">
                <v-progress-circular
                  indeterminate
                  size="64"
                ></v-progress-circular>
                <h1>Procesando petición</h1>
              </v-overlay>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import AlertError from "./AlertError.vue";
import axios from "axios";
import { mdiCalendar } from "@mdi/js";
import { mdiMapMarker } from "@mdi/js";
import { mdiClose } from "@mdi/js";
import { mdiDirections } from "@mdi/js";
import { mdiPencilBoxOutline } from "@mdi/js";
import { mdiAt } from "@mdi/js";
import { mdiOfficeBuilding } from "@mdi/js";
export default {
  props: ["check", "idOferta", "admin", "inscrito"],
  components: {
    AlertError,
  },
  data() {
    return {
      oferta: null,
      calendario: mdiCalendar,
      mapa: mdiMapMarker,
      close: mdiClose,
      curriculum: null,
      mdiDirections: mdiDirections,
      draw: mdiPencilBoxOutline,
      empresa: mdiOfficeBuilding,
      email: mdiAt,
      overlay: false,
      error: "error",
      showError: false,
    };
  },
  methods: {
    clickCancelar() {
      this.$emit("cerrarOferta");
    },
    clickModificar() {
      this.$emit("modificarOferta", this.oferta.id);
    },
    async getOfertaById() {
      let res = await axios.get(
        "http://localhost:8080/ofertes/" + this.idOferta
      );

      this.oferta = res.data;
    },
    async crearCandidatura() {
      let res = await axios.post(
        "http://localhost:8080/candidats/crearCandidatura/" + this.idOferta,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      if (res.data.message == "ok") location.reload();
    },
    async enviarCurriculum() {
      if (this.curriculum != null) {
        this.overlay = true;
        const file = this.curriculum;
        const formData = new FormData();
        formData.append("curriculum", file);
        let res = await axios.post(
          "http://localhost:8080/candidats/enviarCV/" + this.idOferta,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );
        if (res.data.message == "ok") this.getIP();
        else{
          this.error=res.data.message
          this.showError = true;
        }
      } else {
        this.error = "El envio del curriculum es obligatorio";
        this.showError = true;
      }
    },
    async getIP() {
      let res = await axios.get("https://api.ipify.org?format=json");

      this.createRegistroCV(res.data.ip);
    },
    async createRegistroCV(ip) {
      let res = await axios.post(
        "http://localhost:8080/registroCV/" + this.idOferta,
        { ip: ip },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );

      if (res.data.message == null) {
        this.crearCandidatura();
      }
    },
  },
  mounted() {
    this.getOfertaById();
  },
};
</script>