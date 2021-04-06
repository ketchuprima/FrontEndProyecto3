<template>
  <div class="text-xs-center">
    <v-dialog persistent v-model="modal" scrollable width="400">
      <v-card style="height: 100%">
        <v-card-title class="headline grey lighten-2" primary-title>
          Lista de candidatos
          <v-spacer></v-spacer>
          <v-btn
            icon
            style="background-color: #606060"
            color="white"
            @click="clickCerrar()"
          >
            <div>X</div>
          </v-btn>
        </v-card-title>

        <div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nombre</th>
                  <th class="text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="candidato in candidatos" :key="candidato.id">
                  <td>{{ candidato.user.nom }} {{candidato.user.cognoms}}</td>
                  <td>{{ candidato.user.email }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ModalCandidatos",
  props: ["modal", "idOferta"],
  data() {
    return {
      candidatos: []
    };
  },
  methods: {
    clickCerrar() {
      this.$emit("cerrarCandidatos");
    },
    async getCandidatos(){
      let res = await axios.get("http://localhost:8080/ofertes/" + this.idOferta);

      this.candidatos = res.data.candidats;
    }
  },

  mounted(){
    this.getCandidatos();
  }
};
</script>