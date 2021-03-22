<template>
  <div class="text-xs-center">
    <v-dialog persistent v-model="check" width="800">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Cafetero
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
                  <li>{{ oferta.ubicacio }}</li>
                </div>
                <div class="data">
                  <li>{{ oferta.data }}</li>
                </div>
              </div>
            </v-col>
            <v-col cols="8" class="flex">
              <div class="desc">{{ oferta.descripcio }}</div>
            </v-col>
          </v-row>
        </div>

        <v-divider class="separacion"></v-divider>

        <v-card-actions>
          <v-row>
            <v-col>
              <v-btn
                class="white--text boton"
                color="blue"
                tile
                x-large
                block
                @click="clickCancelar()"
                >Cancelar</v-btn
              > </v-col
            ><v-col>
              <v-btn
                class="white--text boton"
                color="warning"
                tile
                x-large
                block
                @click="clickModificar()"
                >Modificar</v-btn
              > </v-col
            ><v-col>
              <v-btn
                class="white--text boton"
                color="blue"
                tile
                x-large
                block
                @click="clickCrear()"
                >Apuntarse</v-btn
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

export default {
  props: ["check", "idOferta"],
  data() {
    return {
      oferta: null
    };
  },
  methods: {
    clickCancelar() {
      this.$emit("cerrarOferta");
    },
    clickModificar(){
      this.$emit("modificarOferta", this.oferta.id);
    },
    async getOfertaById(){
      let res = await axios.get("http://localhost:8080/ofertes/" + this.idOferta);

      this.oferta = res.data;
    }
  },
  mounted(){
    this.getOfertaById();
  },
};
</script>