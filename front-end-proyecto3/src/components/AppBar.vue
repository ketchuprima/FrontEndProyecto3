<template>
  <v-app-bar app>
    <v-img
      max-height="60"
      max-width="60"
      @click="redirigitHome()"
      src="../assets/logo.webp"
      style="cursor: pointer;"
    ></v-img>
    <v-spacer></v-spacer>
    <AuthenticationModal
      :dialog="dialogLogin"
      v-on:cerrarModal="cerrarModal"
    ></AuthenticationModal>
    <v-btn class="ma-1" v-if="admin == true" @click="redirigirAdminPanel" plain>
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
import axios from "axios";
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
      admin: false,
    };
  },
  methods: {
    redirigitHome() {
      if (localStorage.getItem("accessToken") != null)
        this.$router.push("/home");
      else this.$router.push("/portada");
    },
    cerrarModal() {
      this.dialogLogin = false;
    },
    redirigirAdminPanel() {
      this.$router.push("/adminPanel");
    },
    logOut() {
      localStorage.removeItem("accessToken");
      this.$router.push("/portada");
      this.loged = false;
      this.admin = false;
    },
    async checkUser() {
      if (localStorage.getItem("accessToken") != null) {
        this.loged = true;
        let res = await axios.get("http://localhost:8080/users/getUser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        for (let i = 0; i < res.data.roles.length; i++) {
          if (res.data.roles[i].nombre == "ROLE_ADMIN") this.admin = true;
        }
      } else {
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