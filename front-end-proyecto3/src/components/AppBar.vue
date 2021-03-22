<template>
  <v-app-bar app>
    <v-img
      max-height="60"
      max-width="60"
      src="https://cdn.pixabay.com/photo/2017/02/15/00/48/logo-2067396_960_720.png"
    ></v-img>
    <v-spacer></v-spacer>
    <AuthenticationModal
      :dialog="dialogLogin"
      v-on:cerrarModal="cerrarModal"
    ></AuthenticationModal>
    <v-btn class="ma-1" @click="redirigirAdminPanel" plain>
      Panel de administrador</v-btn
    >
    <v-btn class="ma-1" @click="dialogLogin = true" plain v-if="loged == false">
      Log In / Sign Up</v-btn
    >
    <v-btn class="ma-1" @click="logOut()" plain v-if="loged == true">
      Log Out</v-btn
    >
  </v-app-bar>
</template>
<script>
import axios from 'axios';
import AuthenticationModal from "./AuthenticationModal.vue";
export default {
  name: "AppBar",
  components: {
    AuthenticationModal,
  },
  data() {
    return {
      dialogLogin: false,
      loged: false,
    };
  },
  methods: {
    cerrarModal() {
      this.dialogLogin = false;
    },
    redirigirAdminPanel() {
      this.$router.push("/adminPanel");
    },
    logOut() {
      localStorage.removeItem("accessToken");
      this.$router.push("/portada");
      this.loged=false;
    },
    async checkUser() {
      if (localStorage.getItem("accessToken") != null) {
        this.loged = true;
        let res = await axios.get("http://localhost:8080/user/getUser", {headers:{Authorization: "Bearer "+localStorage.getItem('accessToken')}})
        console.log(res.data)
      }
      else {
        this.loged = false;
        this.$router.push("/portada");
      }
    },
  },
  created() {
    this.checkUser();
  },
  updated() {
    this.checkUser();
  },
};
</script>