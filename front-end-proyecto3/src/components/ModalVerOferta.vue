<template>
  <div class="text-xs-center">
    <v-dialog persistent v-model="check" width="800">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <div class="tituloContainer">
            Cafetero
            <v-spacer></v-spacer>

            <v-btn icon @click="clickCancelar()"
              ><v-icon>{{ close }}</v-icon></v-btn
            >
          </div>
        </v-card-title>

        <div class="flex">
          <v-row>
            <v-col cols="4">
              <div>
                <v-img
                  class="img"
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-height="340"
                  max-width="340"
                  src="https://picsum.photos/id/11/500/300"
                ></v-img>
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
          <v-row>
            <v-col cols="6"></v-col>
            <v-col cols="3">
              <v-btn
                block
                class="white--text boton"
                color="warning"
                tile
                @click="clickModificar()"
                >
                <p class="textColorWhite">
                Modificar
                </p>
                <v-spacer></v-spacer>
                <v-icon>
                  {{ draw }}
                </v-icon></v-btn
              >
            </v-col>
            <v-col cols="3">
              <v-btn
                block
                class="white--text boton"
                color="blue"
                tile
                @click="clickCrear()"
                >
                <p class="textColorWhite">
                  Apuntarse
                </p>
                <v-spacer></v-spacer>
                <v-icon>
                  {{ mdiDirections }}
                </v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { mdiCalendar } from "@mdi/js";
import { mdiMapMarker } from "@mdi/js";
import { mdiClose } from "@mdi/js";
import { mdiDirections } from "@mdi/js";
import { mdiPencilBoxOutline } from '@mdi/js';
export default {
  props: ["check", "idOferta"],
  data() {
    return {
      oferta: null,
      calendario: mdiCalendar,
      mapa: mdiMapMarker,
      close: mdiClose,
      mdiDirections: mdiDirections,
      draw: mdiPencilBoxOutline,
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
  },
  mounted() {
    this.getOfertaById();
  },
};
</script>