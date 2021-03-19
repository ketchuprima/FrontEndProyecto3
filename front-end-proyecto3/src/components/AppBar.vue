<template>
  <v-app-bar app>
    <v-img
      max-height="60"
      max-width="60"
      src="https://cdn.pixabay.com/photo/2017/02/15/00/48/logo-2067396_960_720.png"
    ></v-img>
    <v-spacer></v-spacer>
    <AuthenticationModal :dialog="dialogLogin" v-on:cerrarModal="cerrarModal"></AuthenticationModal>
    <v-btn class="ma-1" @click="redirigirAdminPanel" plain> Panel de administrador</v-btn>
    <v-btn class="ma-1" @click="dialogLogin = true" plain> Log In / Sign Up</v-btn>
  </v-app-bar>
</template>
<script>
import AuthenticationModal from "./AuthenticationModal.vue";
export default {
  name: "AppBar",
  components: {
    AuthenticationModal,
  },
  data() {
    return {
      dialogLogin:false
    };
  },
  methods:{
    cerrarModal(){
      this.dialogLogin=false;
    },
    redirigirAdminPanel(){
      this.$router.push("/adminPanel")
    }
  }
};
</script>