<template>
  <div class="text-xs-center">
    <v-dialog persistent v-model="check" width="800">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Cafetero
        </v-card-title>

        <div class="contenerdorFormularioCrearOferta">
          <v-row>
            <v-col cols="12"
              ><v-img
                class="foto"
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="300"
                max-width="300"
                src="https://picsum.photos/id/11/500/300"
              ></v-img
            ></v-col>
            <v-col><div class="text--primary">gdshdfhfsahsfjgfj</div>
            </v-col>
          </v-row>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            class="white--text"
            color="#272727"
            tile
            x-large
            @click="clickCancelar()"
          >
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="#272727"
            tile
            x-large
            @click="clickCrear()"
          >
            Apuntarse
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      check: true,
    };
  },
};
</script>