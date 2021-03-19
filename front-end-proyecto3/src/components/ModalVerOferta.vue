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
export default {
  props: ["check"],
  data() {
    return {
      oferta: {
        id: 1,
        titol: "Cafetero",
        descripcio:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        ubicacio: "Barcelona",
        estat: "publicada",
        data: "22 Mayo 2020",
      },
    };
  },
  methods: {
    clickCancelar() {
      this.$emit("cerrarOferta");
    },
    clickModificar(){
      this.$emit("modificarOferta", this.oferta.id)
    }
  },
};
</script>