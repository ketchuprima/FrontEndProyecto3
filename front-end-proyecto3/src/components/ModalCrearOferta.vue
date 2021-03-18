<template>
  <div class="text-xs-center">
    <v-dialog v-model="crearOferta" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Crear una oferta
        </v-card-title>

        <div class="contenerdorFormularioCrearOferta">
          <v-row>
            <v-col cols="12"
              ><v-text-field label="Titulo de la oferta"></v-text-field
            ></v-col>
            <v-col cols="6"></v-col>
          </v-row>
          <v-text-field></v-text-field>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="#272727"
            tile
            x-large
            block
            @click="clickCrear()"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "ModalCrearOferta",
  props: ["crearOferta"],
  methods: {
    clickCrear() {
      console.log("manolo");
      this.$emit("crearOferta", false);
    },
  },
};
</script>